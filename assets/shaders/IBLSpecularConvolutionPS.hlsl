
#include "../assets/shaders/IBL.hlsli"
#include "../assets/shaders/CubeMaps.hlsli"

// External data
cbuffer data : register(b0)
{
	float roughness;
	float faceIndex;
	float mipLevel;
	float envIsHDR;
	float cubeSize;
}

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

// Textures and samplers
TextureCube EnvironmentMap	: register(t0);
SamplerState BasicSampler	: register(s0);


// Convolves (blurs) the texture cube for a particular roughness and reflection vector.
// This requires taking a huge number of samples for the result to look acceptable, which
// is why this is done as a pre-process rather than doing it "live".
// 
// roughness	- the roughness of the surface (rougher = blurrier)
// R			- The direction of this reflection (which is also used for the normal and view dir)
float3 ConvolveTextureCube(float roughness, float3 R)
{
	// Assume N == V == R, a common assumption to simplify the approximation quite a bit
	float3 N = R;
	float3 V = R;

	// Final color
	float3 finalColor = float3(0, 0, 0);
	float totalWeight = 0.0;

	// Pre-calc for mip level selection
	// Note the scaled cube size, which helps
	// immensely with HDR convolution "speckles"
	float PI = 3.14159265359f;
	float scaledCubeSize = cubeSize * 1.0f;
	float solidAngleTexel = 4.0f * PI / (6.0f * scaledCubeSize * scaledCubeSize);

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
			float pdf = (D * nDotH_and_hDotV / (4.0f * nDotH_and_hDotV)) + 0.0001f; // Note: NoH and HoV cancel out here
			float solidAngleSample = 1.0f / (float(MAX_IBL_SAMPLES) * pdf + 0.00001f);
			float mipToSample = roughness == 0.0f ? 0.0f : 0.5f * log2(solidAngleSample / solidAngleTexel);

			float3 thisColor = EnvironmentMap.SampleLevel(BasicSampler, L, mipToSample).rgb;
			finalColor += nDotL * (envIsHDR == 1.0 ? thisColor : pow(thisColor, 2.2));
			totalWeight += nDotL;
		}
	}

	// Divide and return result
	return finalColor / totalWeight;
}



float4 main(VertexToPixel input) : SV_TARGET
{
	// Get the cube map sample direction
	float3 zDir = UVtoCubeDirection(input.uv, (int)faceIndex);
	zDir = normalize(zDir);

	// Process the convolution for the direction of this pixel
	float3 c = ConvolveTextureCube(roughness, zDir);
	return float4(c, 1);
}