struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

cbuffer psData : register(b0)
{
	float tonemapType;
	float exposure;
	float whitePoint;
}

Texture2D pixels : register(t0);
SamplerState samp : register(s0);

// https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
float3 AcesTonemap(float3 color)
{
	float a = 2.51f;
	float b = 0.03f;
	float c = 2.43f;
	float d = 0.59f;
	float e = 0.14f;
	return saturate((color * (a * color + b)) / (color * (c * color + d) + e));
}

// http://filmicworlds.com/blog/filmic-tonemapping-operators/
float3 Uncharted2Tonemap(float3 color)
{
	float A = 0.15f;
	float B = 0.50f;
	float C = 0.10f;
	float D = 0.20f;
	float E = 0.02f;
	float F = 0.30f;

	return ((color * (A * color + C * B) + D * E) / (color * (A * color + B) + D * F)) - E / F;
}

// Tonemap HDR down to LDR (Reinhard)
float3 ReinhardTonemap(float3 color)
{
	return color / (color + 1.0f);
}

// https://64.github.io/tonemapping/
float3 ReinhardWhitePoint(float3 color, float wp)
{
	float3 num = color * (1.0f + (color / float3(wp * wp)));
	return num / (1.0f + color);
}

float4 main(VertexToPixel input) : SV_TARGET
{
	// Tonemap types
	const int TONEMAP_LINEAR = 0;
	const int TONEMAP_REINHARD = 1;
	const int TONEMAP_REINHARD_WHITE_POINT = 2;
	const int TONEMAP_UNCHARTED = 3;
	const int TONEMAP_ACES = 4;

	// Grab the color and apply exposure before tonemapping
	float3 color = pixels.Sample(samp, input.uv).rgb; // Assuming we're in linear space here
	color *= pow(2.0f, exposure);

	// Choose the tonemap type
	switch (int(tonemapType))
	{
	default:
	case TONEMAP_LINEAR: break; // Just return color as-is
	case TONEMAP_REINHARD: color = ReinhardTonemap(color); break;
	case TONEMAP_REINHARD_WHITE_POINT: color = ReinhardWhitePoint(color, whitePoint); break;
	case TONEMAP_UNCHARTED: color = Uncharted2Tonemap(color) / Uncharted2Tonemap((float3)whitePoint); break;
	case TONEMAP_ACES: color = AcesTonemap(color); break;
	}

	return float4(pow(color, 1.0f / 2.2f), 1);
}