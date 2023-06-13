struct VSInput
{
	float3 position;
	float2 uv;
	float3 normal;
	float3 tangent;
};

struct VertexToPixel
{
	float4 position : SV_POSITION;
	float2 uv		: TEXCOORD;
	float3 normal	: NORMAL;
	float3 tangent	: TANGENT;
	float3 worldPos	: POSITION;
};

cbuffer vsData : register(b0)
{
	matrix world;
	matrix view;
	matrix proj;
}

VertexToPixel main(VSInput input)
{
	VertexToPixel output;

	matrix wvp = mul(mul(proj, view), world);
	output.position = mul(wvp, float4(input.position, 1));

	output.worldPos = mul(world, float4(input.position, 1)).xyz;
	output.normal = mul(float3x3(world), input.normal);
	output.tangent = mul(float3x3(world), input.tangent);
	output.uv = input.uv;
	return output;
}