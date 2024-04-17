
#include "../assets/shaders/IBL.hlsli"

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};


// Convolves the texture cube for a particular roughness and vector
float2 IntegrateBRDF(float roughnessValue, float nDotV, bool multiscatterComp)
{
	float3 V;
	V.x = sqrt(1.0f - nDotV * nDotV);
	V.y = 0.0;
	V.z = nDotV;

	float3 N = float3(0, 0, 1);

	float A = 0.0;
	float B = 0.0;

	uint MAX_IBL_SAMPLES = 4096u;
	for (uint i = 0u; i < MAX_IBL_SAMPLES; i++)
	{
		// Grab this sample
		float2 Xi = Hammersley2d(i, MAX_IBL_SAMPLES);
		float3 H = ImportanceSampleGGX(Xi, roughnessValue, N);
		float3 L = 2.0 * dot(V, H) * H - V;

		float nDotL = saturate(L.z);
		float nDotH = saturate(H.z);
		float vDotH = saturate(dot(V, H));

		// Check N dot L result
		if (nDotL > 0.0)
		{
			float G = G_Smith(roughnessValue, nDotV, nDotL);
			float G_Vis = G * vDotH / (nDotH * nDotV);
			float Fc = pow(1.0 - vDotH, 5.0);

			// Which version?
			if (multiscatterComp)
			{
				// Multiscattering compensation version
				// See https://google.github.io/filament/Filament.md.html#toc5.3.4.7
				A += Fc * G_Vis;
				B += G_Vis;
			}
			else
			{
				// No multiscattering compensation
				A += (1.0 - Fc) * G_Vis;
				B += Fc * G_Vis;
			}
		}
	}

	// Divide and return result
	return float2(A, B) / float(MAX_IBL_SAMPLES);
}

// All from http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
float4 main(VertexToPixel input) : SV_TARGET
{
	// Treat the uv range (0-1) as a grid of 
	// roughness and nDotV permutations
	// Note: ROUGHNESS is Y
	//       nDotV is X
	float roughness = input.uv.y;
	float nDotV = input.uv.x;
	
	// Handle this pixel and save
	float2 brdf = IntegrateBRDF(roughness, nDotV, true);
	return float4(brdf, 0, 1);
}