
struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD0;
};

// Specular G
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
float G1_Schlick(float Roughness, float NdotV)
{
	float k = Roughness * Roughness;
	k /= 2.0f; // Schlick-GGX version of k - Used in UE4

	// Staying the same
	return NdotV / (NdotV * (1.0f - k) + k);
}

// Specular G
// http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
float G_Smith(float Roughness, float NdotV, float NdotL)
{
	return G1_Schlick(Roughness, NdotV) * G1_Schlick(Roughness, NdotL);
}

// === UTILITY FUNCTIONS for Indirect PBR Pre-Calculations ====================


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


// Convolves the texture cube for a particular roughness and vector
float2 IntegrateBRDF(float roughnessValue, float nDotV)
{
	float3 V;
	V.x = sqrt(1.0f - nDotV * nDotV);
	V.y = 0.0;
	V.z = nDotV;

	float3 N = float3(0, 0, 1);

	float A = 0.0;
	float B = 0.0;

	// Run the calculation MANY times
	//  - 4096 would be an ideal number of times 
	//  - Fewer is faster, but is less accurate
	uint MAX_IBL_SAMPLES = 1024u;
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
			A += (1.0 - Fc) * G_Vis;
			B += Fc * G_Vis;
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
	float2 brdf = IntegrateBRDF(roughness, nDotV);
	return float4(brdf, 0, 1);
}