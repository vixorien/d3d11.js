struct VSInput
{
	float3 localPosition;
	float2 uv;
	float3 normal;
	float3 tangent;
};

struct VertexToPixel_Sky
{
	float4 screenPosition	: SV_POSITION;
	float3 sampleDir		: DIRECTION;
};

cbuffer ExternalData : register(b0)
{
	matrix view;
	matrix projection;
}

VertexToPixel_Sky main(VSInput input)
{
	VertexToPixel_Sky output;

	matrix vp = mul(projection, view);
	output.screenPosition = mul(vp, float4(input.localPosition, 1.0f));

	// Use local pos as sample direction since we're (presumably) a cube
	output.sampleDir = input.localPosition;
	return output;
}