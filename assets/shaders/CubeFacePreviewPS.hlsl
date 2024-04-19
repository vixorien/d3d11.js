
#include "../assets/shaders/CubeMaps.hlsli"

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

cbuffer data : register(b0)
{
	float mipLevel;
	float faceIndex;
}

TextureCube SkyTexture		: register(t0);
SamplerState BasicSampler	: register(s0);

float4 main(VertexToPixel input) : SV_TARGET
{
	// Get the cube map sample direction based on UVs
	float3 zDir = UVtoCubeDirection(input.uv, (int)faceIndex);
	return SkyTexture.SampleLevel(BasicSampler, zDir, mipLevel);
}