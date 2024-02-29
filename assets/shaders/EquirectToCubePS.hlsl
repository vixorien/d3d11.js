

// External data
cbuffer data : register(b0)
{
	float faceIndex;
	float exposure;
	float envIsHDR;
}

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

// Textures and samplers
Texture2D EquirectMap		: register(t0);
SamplerState BasicSampler	: register(s0);


float2 DirectionToUV(float3 dir)
{
	float PI = 3.14159265f;
	float TWO_PI = PI * 2.0f;

	// Calculate polar coords
	float theta = acos(dir.y);
	float phi = atan2(dir.z, dir.x);

	// Normalize
	return float2(
		(PI + phi) / TWO_PI,
		theta / PI);
}


float4 main(VertexToPixel input) : SV_TARGET
{
	// Get a -1 to 1 range on x/y
	float2 o = input.uv * 2.0 - 1.0;
	
	// Calculate the direction of this pixel on the face
	// of the cubemap that we're making
	float3 dir;
	switch (int(faceIndex))
	{
	default:
	case 0: dir = float3(+1, -o.y, -o.x); break;
	case 1: dir = float3(-1, -o.y, +o.x); break;
	case 2: dir = float3(+o.x, +1, +o.y); break;
	case 3: dir = float3(+o.x, -1, -o.y); break;
	case 4: dir = float3(+o.x, -o.y, +1); break;
	case 5: dir = float3(-o.x, -o.y, -1); break;
	}
	dir = normalize(dir);

	// Turn the direction into a UV and sample
	float2 uv = DirectionToUV(dir);

	// Sample and convert to linear if necessary
	float4 color = pow(EquirectMap.Sample(BasicSampler, uv), 2.2f);
	color = envIsHDR == 1.0 ? color : pow(color, 2.2f);

	// Apply exposure and convert back to gamma if necessary
	color *= pow(2.0f, exposure);
	color = envIsHDR == 1.0 ? color : pow(color, 1.0f / 2.2f);

	return color;
}