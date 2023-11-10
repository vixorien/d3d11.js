struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

cbuffer data : register(b0)
{
	float2 pos;
	float2 size;
	float2 windowDimensions;
}

// This assumes 6 vertices, laid out like so:
//
//   0---1 4
//   |  / /|
//   | / / |
//   |/ /  |
//   2 3---5
// 
VertexToPixel main(uint id : SV_VertexID)
{
	// Set up output
	VertexToPixel corners[6];

	// Top left
	corners[0].uv       = float2(0, 0);
	corners[0].position = float4(-1, 1, 0, 1);

	// Top right
	corners[1].uv       = corners[4].uv       = float2(1, 0);
	corners[1].position = corners[4].position = float4(1, 1, 0, 1);

	// Bottom left
	corners[2].uv       = corners[3].uv       = float2(0, 1);
	corners[2].position = corners[3].position = float4(-1, -1, 0, 1);

	// Bottom right
	corners[5].uv       = float2(1, 1);
	corners[5].position = float4(1, -1, 0, 1);

	// Grab this corner and adjust
	VertexToPixel output = corners[id];

	// Convert corners to pixels
	float2 pixelPos = (output.position.xy + 1.0) * 0.5; // Range [0,1]
	pixelPos.y = 1.0 - pixelPos.y; // Flip Y so top left is [0,0]

	// To pixel range and adjust
	pixelPos *= windowDimensions;
	pixelPos = pixelPos * (size / windowDimensions) + pos;

	// Back to NDC
	pixelPos /= windowDimensions;
	pixelPos.y = 1.0 - pixelPos.y;
	output.position.xy = pixelPos * 2.0 - 1.0;

	return output;
}