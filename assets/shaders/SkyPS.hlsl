struct VertexToPixel_Sky
{
	float4 screenPosition	: SV_POSITION;
	float3 sampleDir		: DIRECTION;
};

cbuffer data : register(b0)
{
	float mipLevel;
	float envIsHDR;
}

TextureCube SkyTexture		: register(t0);
SamplerState BasicSampler	: register(s0);

float4 main(VertexToPixel_Sky input) : SV_TARGET
{
	float4 color = SkyTexture.SampleLevel(BasicSampler, input.sampleDir, mipLevel);

	return color; // envIsHDR == 1.0 ? pow(color, 1.0f / 2.2f) : color;
}