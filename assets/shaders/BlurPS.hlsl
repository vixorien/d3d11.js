struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD0;
};

cbuffer psData : register(b0)
{
	float3 color;
}

Texture2D pixels : register(t0);
SamplerState samp : register(s0);

float4 main(VertexToPixel input) : SV_TARGET
{
	float blurRadius = 10.0;
	float totalSamples = 0.0;

	float4 thisColor = pixels.Sample(samp, input.uv);

	float3 totalColor = float3(0.0, 0.0, 0.0);
	for (float y = -blurRadius; y <= blurRadius; y++)
	{
		for (float x = -blurRadius; x <= blurRadius; x++)
		{
			totalColor += pixels.Sample(samp, input.uv + 0.001f * float2(x, y)).rgb;
			totalSamples++;
		}
	}

	if (input.uv.y > 0.5)
		return float4(totalColor / totalSamples, 1.0);
	else
		return thisColor;
}