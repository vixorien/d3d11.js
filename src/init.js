
// -----------------------------------------------------
// ----------------- API Initialization ----------------
// -----------------------------------------------------

/**
 * Creates a new ID3D11Device for using the D3D11 API
 * 
 * @param {any} canvas The canvas HTML element that will act as the graphics adapter
 */
function D3D11CreateDevice(canvas)
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
		throw new Error("Unable to create internal WebGL2 rendering context for d3d11.js");
	}

	return new ID3D11Device(gl);
}

/**
 * Creates a new DXGI Swap Chain for presenting the final frame to the user
 * 
 * @param {ID3D11Device} device The ID3D11Device for the swap chain
 * @param {DXGI_SWAP_CHAIN_DESC} desc A description of the swap chain
 */
function DXGICreateSwapChain(device, desc)
{
	return new IDXGISwapChain(device, desc);
}

/**
 * Calculates a subresource index for a texture
 * 
 * @param {Number} mipSlice A zero-based index for the mipmap level to address; 0 indicates the first, most detailed mipmap level
 * @param {Number} arraySlice The zero-based index for the array level to address; always use 0 for volume (3D) textures
 * @param {Number} mipLevels Number of mipmap levels in the resource
 * 
 * @returns The index which equals MipSlice + (ArraySlice * MipLevels)
 */
function D3D11CalcSubresource(mipSlice, arraySlice, mipLevels)
{
	return mipSlice + (arraySlice * mipLevels);
}