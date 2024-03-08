struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

//cbuffer psData : register(b0)
//{
//
//}

Texture2D pixels : register(t0);
SamplerState samp : register(s0);

float4 main(VertexToPixel input) : SV_TARGET
{
	return pixels.SampleLevel(samp, input.uv, 9.0);
}