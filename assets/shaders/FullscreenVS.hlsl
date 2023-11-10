struct VertexToPixel
{
	float4 position		: SV_POSITION;
	float2 uv           : TEXCOORD;
};

// The entry point for our vertex shader
VertexToPixel main(uint id : SV_VertexID)
{
	// Set up output
	VertexToPixel output;

	// Calculate the UV (0,0) to (2,2) via the ID
	output.uv = float2(
		(id << 1) & 2u,  // id % 2 * 2
		id & 2u);

	// Adjust the position based on the UV
	output.position = float4(output.uv, 0.0, 1.0);
	output.position.x = output.position.x * 2.0 - 1.0;
	output.position.y = output.position.y * -2.0 + 1.0;

	return output;
}