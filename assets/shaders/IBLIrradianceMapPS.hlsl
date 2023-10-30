

cbuffer externalData : register(b0)
{
	float faceIndex;
	float envIsHDR;
	float cubeSize;
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
	float IRRADIANCE_SAMPLE_STEP_THETA = 0.01f;

	// Pre-calculate values necessary for mip selection
	float totalSamples = 
		(PI_OVER_2 / IRRADIANCE_SAMPLE_STEP_THETA) *
		(TWO_PI / IRRADIANCE_SAMPLE_STEP_PHI);
	float solidAngleTexel = 4.0f * PI / (6.0f * cubeSize * cubeSize);
	float distr = 1.0f / PI; // I think?

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

			// Select the proper mip level, as done here: https://chetanjags.wordpress.com/2015/08/26/image-based-lighting/
			// Note: We're using a cosine distribution
			float pdf = (distr * cosT / 4.0f) + 0.0001f;
			float solidAngleSample = 1.0f / (totalSamples * pdf + 0.0001f);
			float mipLevel = 0.5f * log2(solidAngleSample / solidAngleTexel);

			// Sample in that direction
			float3 samp = EnvironmentMap.SampleLevel(BasicSampler, hemisphereDir, mipLevel).rgb;
			totalColor += cosT * sinT * (envIsHDR == 0.0f ? pow(samp, 2.2f) : samp);
			sampleCount++;
		}
	}

	float3 finalColor = PI * totalColor / sampleCount;
	return float4(pow(finalColor, 1.0f / 2.2f), 1);
	//return float4(finalColor, 1);
}