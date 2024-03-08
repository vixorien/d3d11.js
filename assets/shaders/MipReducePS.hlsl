

// External data
cbuffer data : register(b0)
{
	float sourceWidth;
	float sourceHeight;
	float isHDR;
}

struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

// Textures and samplers
Texture2D Pixels			: register(t0);
SamplerState ClampSampler	: register(s0);


float4 main(VertexToPixel input) : SV_TARGET
{
	// We're rendering to size N, but sampling from a mip with size 2N
	// Need to convert input UV to pixels from the sample size
	float2 halfPixelSizeInUV = float2(0.5 / sourceWidth, 0.5 / sourceHeight);
	float2 thisPixelUV = input.uv;

	// Calculate UVs for the source texture read
	float2 tl_uv = thisPixelUV + halfPixelSizeInUV * float2(-1, -1);
	float2 tr_uv = thisPixelUV + halfPixelSizeInUV * float2(+1, -1);
	float2 br_uv = thisPixelUV + halfPixelSizeInUV * float2(+1, +1);
	float2 bl_uv = thisPixelUV + halfPixelSizeInUV * float2(-1, +1);

	// Sample 4 pixels from the texture
	float4 tl_c = Pixels.Sample(ClampSampler, tl_uv);
	float4 tr_c = Pixels.Sample(ClampSampler, tr_uv);
	float4 br_c = Pixels.Sample(ClampSampler, br_uv);
	float4 bl_c = Pixels.Sample(ClampSampler, bl_uv);

	// Not HDR?  Gamma correct!
	if (isHDR == 0.0)
	{
		tl_c = pow(tl_c, 2.2);
		tr_c = pow(tr_c, 2.2);
		br_c = pow(br_c, 2.2);
		bl_c = pow(bl_c, 2.2);
	}

	// Average now that the colors are linear
	float4 total = (tl_c + tr_c + br_c + bl_c) / 4.0;

	// Gamma if necessary on the way out
	return isHDR == 0.0 ? pow(total, 1.0 / 2.2) : total;
}