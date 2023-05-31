
// -----------------------------------------------------
// ----------------- API Initialization ----------------
// -----------------------------------------------------

// TODO: Determine if any actual d3d parameters are useful here
function D3D11CreateDevice(canvas) // Canvas acts as the adapter here
{
	// Verify and turn on WebGL
	// Note: Attempting to match D3D defaults
	//       in the options (no depth buffer, etc.)
	// Full list: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
	const gl = canvas.getContext("webgl2",
		{
			antialias: false,
			depth: false,
			preserveDrawingBuffer: true
		});
	if (gl === null)
	{
		return false; // TODO: Throw exception?
	}

	return new ID3D11Device(gl);
}

// TODO: Determine if any params of the actual swap chain desc are useful
function DXGICreateSwapChain(device)
{
	return new IDXGISwapChain(device);
}
