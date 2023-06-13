struct VertexToPixel
{
	float4 position : SV_POSITION;
	float2 uv		: TEXCOORD;
	float3 normal	: NORMAL;
	float3 worldPos	: POSITION;
};

cbuffer psData : register(b0)
{
	float3 color;
}

float4 main(VertexToPixel input) : SV_TARGET
{
	return float4(color, 1);
}