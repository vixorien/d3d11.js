
// === UTILITY FUNCTIONS for Cube Maps ====================

float3 UVtoCubeDirection(float2 uv, int faceIndex)
{
	// Get a -1 to 1 range on x/y
	float2 o = uv * 2.0 - 1.0;

	// Figure out the direction based on the cube face
	switch (faceIndex)
	{
	default:
	case 0: return float3(+1, -o.y, -o.x);
	case 1: return float3(-1, -o.y, +o.x);
	case 2: return float3(+o.x, +1, +o.y);
	case 3: return float3(+o.x, -1, -o.y);
	case 4: return float3(+o.x, -o.y, +1);
	case 5: return float3(-o.x, -o.y, -1);
	}
}