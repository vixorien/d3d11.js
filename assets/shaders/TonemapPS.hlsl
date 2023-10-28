struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD0;
};

cbuffer psData : register(b0)
{
	float tonemapType;
	float exposure;
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

// http://frictionalgames.blogspot.com/2012/09/tech-feature-hdr-lightning.html
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

// http://learnopengl.com/#!Advanced-Lighting/HDR
float3 ExposureTonemap(float3 color)
{
	return 1.0f - exp(-color);
}

float4 main(VertexToPixel input) : SV_TARGET
{
	// Tonemap types
	float TONEMAP_LINEAR = 0.0f;
	float TONEMAP_REINHARD = 1.0f
	float TONEMAP_EXPOSURE = 2.0f;
	float TONEMAP_UNCHARTED = 3.0f;
	float TONEMAP_ACES = 4.0f;

	// Grab the color and apply exposure before tonemapping
	float3 color = pixels.Sample(samp, input.uv).rgb;
	color *= exposure;

	// Choose the tonemap type
	switch (tonemapType)
	{
	default:
	case TONEMAP_LINEAR: break; // Just return color as-is
	case TONEMAP_REINHARD: color = ReinhardTonemap(color); break;
	case TONEMAP_EXPOSURE: color = ExposureTonemap(color); break;
	case TONEMAP_UNCHARTED: color = Uncharted2Tonemap(color); break;
	case TONEMAP_ACES: color = AcesTonemap(color); break;
	}

	return float4(color, 1);
}