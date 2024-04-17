
#include "../assets/shaders/IBL.hlsli"

cbuffer externalData : register(b0)
{
	float faceIndex;
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



// Convolution method (similar to specular IBL)
float3 Convolution(float3 zDir)
{
	// Perfectly diffuse!
	float roughness = 1.0;

	// Assume N == V == R, a common assumption to simplify the approximation quite a bit
	float3 R = zDir;
	float3 N = R;
	float3 V = R;

	// Final color
	float3 finalColor = float3(0, 0, 0);
	float totalWeight = 0.0;

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
			float mip = 5.0f; // Anything lower leads to speckling
			float3 thisColor = EnvironmentMap.SampleLevel(BasicSampler, L, mip).rgb;
			finalColor += nDotL * (envIsHDR == 1.0 ? thisColor : pow(thisColor, 2.2));
			totalWeight += nDotL;
		}
	}

	// Divide and return result
	return finalColor / totalWeight;
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

	return float4(Convolution(zDir), 1);
}