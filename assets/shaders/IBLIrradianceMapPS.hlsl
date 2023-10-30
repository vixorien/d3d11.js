

cbuffer externalData : register(b0)
{
	float faceIndex;
	float envIsHDR;
}

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD0;
};

// Textures and samplers
TextureCube EnvironmentMap	: register(t0);
SamplerState BasicSampler	: register(s0);

// http://www.codinglabs.net/article_physically_based_rendering.aspx
float4 main(VertexToPixel input) : SV_TARGET
{
	// Get a -1 to 1 range on x/y
	float2 o = input.uv * 2.0 - 1.0;

	// Tangent basis
	float3 xDir, yDir, zDir;

	// Figure out the z ("normal" of this pixel)
	switch (int(faceIndex))
	{
	default:
	case 0: zDir = float3(+1, -o.y, -o.x); break;
	case 1: zDir = float3(-1, -o.y, +o.x); break;
	case 2: zDir = float3(+o.x, +1, +o.y); break;
	case 3: zDir = float3(+o.x, -1, -o.y); break;
	case 4: zDir = float3(+o.x, -o.y, +1); break;
	case 5: zDir = float3(-o.x, -o.y, -1); break;
	}
	zDir = normalize(zDir);

	// Calculate the tangent and bitangent
	xDir = normalize(cross(float3(0, 1, 0), zDir));
	yDir = normalize(cross(zDir, xDir));

	// Total color (to be averaged at the end)
	float3 totalColor = float3(0, 0, 0);
	float sampleCount = 0.0;

	// Variables for various sin/cos values
	float sinT, cosT, sinP, cosP;

	float PI = 3.14159265359f;
	float TWO_PI = PI * 2.0f;
	float PI_OVER_2 = PI * 0.5f;
	float IRRADIANCE_SAMPLE_STEP_PHI = 0.025f;
	float IRRADIANCE_SAMPLE_STEP_THETA = 0.1f;

	// Loop around the hemisphere (360 degrees)
	for (float phi = 0.0f; phi < TWO_PI; phi += IRRADIANCE_SAMPLE_STEP_PHI)
	{
		// Grab the sin and cos of phi
		sincos(phi, sinP, cosP);

		// Loop down the hemisphere (90 degrees)
		for (float theta = 0.0f; theta < PI_OVER_2; theta += IRRADIANCE_SAMPLE_STEP_THETA)
		{
			// Get the sin and cos of theta
			sincos(theta, sinT, cosT);

			// Get an X/Y/Z direction from the polar coords
			float3 hemisphereDir = float3(sinT * cosP, sinT * sinP, cosT);

			// Change to world space based on this pixel's direction
			hemisphereDir =
				hemisphereDir.x * xDir +
				hemisphereDir.y * yDir +
				hemisphereDir.z * zDir;

			// TODO: Adjust sample based on PDF
			// Cosine PDF(x) = 1/(2 * pi) * (1 + cos(x)) // From: https://www.statisticshowto.com/cosine-distribution
			// Also here:  https://learnopengl.com/PBR/IBL/Specular-IBL

			// Sample in that direction
			float3 samp = EnvironmentMap.Sample(BasicSampler, hemisphereDir).rgb;
			totalColor += cosT * sinT * (envIsHDR == 0.0f ? pow(samp, 2.2f) : samp);
			sampleCount++;
		}
	}

	float3 finalColor = PI * totalColor / sampleCount;
	return float4(pow(abs(finalColor), 1.0f / 2.2f), 1);
	//return float4(finalColor, 1);
}