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
	matrix world; // Unused, but keeping for offset
	matrix view;
	matrix projection;
}

VertexToPixel_Sky main(VSInput input)
{
	VertexToPixel_Sky output;

	// Zero out the translation
	matrix viewNoTranslation = view;
	viewNoTranslation._14 = 0.0;
	viewNoTranslation._24 = 0.0;
	viewNoTranslation._34 = 0.0;

	matrix vp = mul(projection, viewNoTranslation);
	output.screenPosition = mul(vp, float4(input.localPosition, 1.0f));

	// Z = W for a max depth of 1
	output.screenPosition.z = output.screenPosition.w;

	// Use local pos as sample direction since we're (presumably) a cube
	output.sampleDir = input.localPosition;
	return output;
}