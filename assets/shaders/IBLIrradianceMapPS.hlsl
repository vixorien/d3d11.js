

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



// Part of the Hammersley 2D sampling function.  More info here:
// http://holger.dammertz.org/stuff/notes_HammersleyOnHemisphere.html
// This function is useful for computing numbers in the Van der Corput sequence
//
// Ok, so this looks like voodoo magic, and sort of is (at the bit level).
// 
// The entire point of this function is to Very Quickly, using bit math, 
// mirror the binary version of an integer across the decimal point.
//
// Or, to put it another way: turn 0101.0 (the int) into 0.1010 (the float)
//
// Here is a quick list of example inputs & outputs:
//
// Input (int)	Binary (before)		Binary (after)		Output (as a float)
//  0			 0000.0				 0.0000				 0.0
//  1			 0001.0				 0.1000				 0.5
//  2			 0010.0				 0.0100				 0.25
//  3			 0011.0				 0.1100				 0.75
//  4			 0100.0				 0.0010				 0.125
//  5			 0101.0				 0.1010				 0.625
//
// Cool!  So...why?  Given any integer, we get a float in the range [0,1), 
// and the resulting float values are fairly well distributed (rather than
// all being "bunched" up near each other).  This is GREAT if we want to sample
// some regular pixels across a large area of a texture to get an average/blur.
//
// bits - an unsigned integer value to "mirror" at the bit level
//
float radicalInverse_VdC(uint bits) {
	bits = (bits << 16u) | (bits >> 16u);
	bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
	bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
	bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
	bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
	return float(bits) * 2.3283064365386963e-10; // / 0x100000000
}

// Hammersley sampling
// Useful to get some fairly-well-distributed (spread out) points on a 2D grid
// http://holger.dammertz.org/stuff/notes_HammersleyOnHemisphere.html
//  - The X value of the float2 is simply i/N (current value/total values),
//     which will be evenly distributed between 0 to 1 as i goes from 0 to N
//  - The Y value will "jump around" a bit using the radicalInverse trick,
//     but still end up being fairly evenly distributed between 0 and 1
//
// i - The current value (between 0 and N)
// N - The total number of samples you'll be taking
//
float2 Hammersley2d(uint i, uint N) {
	return float2(float(i) / float(N), radicalInverse_VdC(i));
}

// Important sampling with GGX
// 
// http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
//
// Calculates a direction in space offset from a starting direction (N), based on
// a roughness value and a point on a 2d grid.  The 2d grid value is essentially an
// offset from the starting direction in 2d, so it needs to be translated to 3d first.
//
// Xi			- a point on a 2d grid, later converted to a 3d offset
// roughness	- the roughness of the surface, which tells us how "blurry" reflections are
// N			- The normal around which we generate this new direction
//
float3 ImportanceSampleGGX(float2 Xi, float roughness, float3 N)
{
	float a = roughness * roughness;
	float PI = 3.14159265359f;

	float Phi = 2.0 * PI * Xi.x;
	float CosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a * a - 1.0) * Xi.y));
	float SinTheta = sqrt(1.0 - CosTheta * CosTheta);

	float3 H;
	H.x = SinTheta * cos(Phi);
	H.y = SinTheta * sin(Phi);
	H.z = CosTheta;

	float3 UpVector = abs(N.z) < 0.999f ? float3(0, 0, 1) : float3(1, 0, 0);
	float3 TangentX = normalize(cross(UpVector, N));
	float3 TangentY = cross(N, TangentX);

	// Tangent to world space
	return TangentX * H.x + TangentY * H.y + N * H.z;
}


// Normal Distribution Function: GGX (Trowbridge-Reitz)
//
// a - Roughness
// h - Half vector
// n - Normal
// 
// D(h, n, a) = a^2 / pi * ((n dot h)^2 * (a^2 - 1) + 1)^2
float D_GGX(float3 n, float3 h, float roughness)
{
	// Pre-calculations
	float NdotH = saturate(dot(n, h));
	float NdotH2 = NdotH * NdotH;
	float a = roughness * roughness;
	float a2 = max(a * a, 0.000001); // Applied after remap!

	// ((n dot h)^2 * (a^2 - 1) + 1)
	// Can go to zero if roughness is 0 and NdotH is 1
	float denomToSquare = NdotH2 * (a2 - 1.0) + 1.0;

	// Final value
	return a2 / (3.14159 * denomToSquare * denomToSquare);
}






// Convolution method (similar to specular IBL)
float3 Convolution(float3 zDir)
{
	// Total color (to be averaged at the end)
	float3 totalColor = float3(0, 0, 0);
	float sampleCount = 0.0;

	// Perfectly diffuse!
	float roughness = 1.0;

	// Assume N == V == R, a common assumption to simplify the approximation quite a bit
	float3 R = zDir;
	float3 N = R;
	float3 V = R;

	// Final color
	float3 finalColor = float3(0, 0, 0);
	float totalWeight = 0.0;

	// Pre-calc for mip level selection
	// Note the scaled cube size, which helps
	// immensely with HDR convolution "speckles"
	float PI = 3.14159265359f;
	float scaledCubeSize = cubeSize * 4.0;
	float solidAngleTexel = 4.0f * PI / (6.0f * scaledCubeSize * scaledCubeSize);

	// Sample the texture cube MANY times
	//  - 4096 would be an ideal number of samples 
	//  - Fewer is faster, but looks worse overall
	uint MAX_IBL_SAMPLES = 4096u;
	for (uint i = 0u; i < MAX_IBL_SAMPLES; i++)
	{
		// Grab this sample
		float2 Xi = Hammersley2d(i, MAX_IBL_SAMPLES);
		float3 H = ImportanceSampleGGX(Xi, roughness, N);
		float3 L = 2.0 * dot(V, H) * H - V;

		// Check N dot L result
		float nDotL = saturate(dot(N, L));
		if (nDotL > 0.0)
		{
			// V and N are the same!
			float nDotH_and_hDotV = saturate(dot(N, H));

			// Select the proper mip level, as done here: https://chetanjags.wordpress.com/2015/08/26/image-based-lighting/
			float D = D_GGX(N, H, roughness);
			float pdf = (D * nDotH_and_hDotV / (4.0f * nDotH_and_hDotV)) + 0.0001f;
			float solidAngleSample = 1.0f / (float(MAX_IBL_SAMPLES) * pdf);
			float mipToSample = roughness == 0.0f ? 0.0f : 0.5f * log2(solidAngleSample / solidAngleTexel);

			float3 thisColor = EnvironmentMap.SampleLevel(BasicSampler, L, mipToSample).rgb;
			finalColor += nDotL * (envIsHDR == 1.0 ? thisColor : pow(thisColor, 2.2));
			totalWeight += nDotL;
		}
	}

	// Divide and return result
	return finalColor / totalWeight;
}

// Nested loop around the hemisphere
// From: http://www.codinglabs.net/article_physically_based_rendering.aspx
float3 IrradianceHemisphereSamples(float3 zDir)
{
	// Calculate the tangent and bitangent
	float3 xDir = normalize(cross(float3(0, 1, 0), zDir));
	float3 yDir = normalize(cross(zDir, xDir));

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
			totalColor += cosT * sinT * (envIsHDR == 1.0f ? samp : pow(samp, 2.2f));
			sampleCount++;
		}
	}

	return PI * totalColor / sampleCount;
}


float4 main(VertexToPixel input) : SV_TARGET
{
	// Get a -1 to 1 range on x/y
	float2 o = input.uv * 2.0 - 1.0;

	// Figure out the z ("normal" of this pixel)
	float3 zDir;
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

	//return float4(IrradianceHemisphereSamples(zDir), 1); // Has some strange "reflection" artifacts
	return float4(Convolution(zDir), 1); // MUCH smoother
}