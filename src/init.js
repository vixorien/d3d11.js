
// -----------------------------------------------------
// ----------------- API Initialization ----------------
// -----------------------------------------------------

/**
 * Creates a new ID3D11Device for using the D3D11 API
 * 
 * @param {HTMLCanvasElement} canvas The canvas HTML element that will act as the graphics adapter
 * @param {Number} flags D3D11_JS_CREATE flags to signify canvas features
 * 
 * @returns The new ID3D11Device object
 */
function D3D11CreateDevice(canvas, flags)
{
	// Check flags
	var flagAlpha = (flags & D3D11_JS_CREATE_DEVICE_ALPHA_CANVAS) == D3D11_JS_CREATE_DEVICE_ALPHA_CANVAS;
	var flagPremult = (flags & D3D11_JS_CREATE_DEVICE_PREMULTIPLIED_ALPHA) == D3D11_JS_CREATE_DEVICE_PREMULTIPLIED_ALPHA;
	
	// Verify and turn on WebGL
	// Note: Attempting to match D3D defaults in the options (no depth buffer, etc.)
	// Full list: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
	const gl = canvas.getContext("webgl2",
		{
			alpha: flagAlpha,
			premultipliedAlpha: flagPremult,
			antialias: false,
			depth: false,
			preserveDrawingBuffer: true
		});
	if (gl === null)
	{
		throw new Error("Unable to create internal WebGL2 rendering context for d3d11.js");
	}

	return new class extends ID3D11Device { }(gl);
}


/**
 * Creates the three objects necessary to control D3D11:
 * - ID3D11Device
 * - ID3D11DeviceContext
 * - IDXGISwapChain
 * 
 * @param {HTMLCanvasElement} canvas The canvas HTML element that will act as the graphics adapter
 * @param {Number} flags D3D11_JS_CREATE flags to signify canvas features
 * @param {DXGI_SWAP_CHAIN_DESC} desc A description of the swap chain
 * 
 * @returns An array containing the three objects: ID3D11Device, ID3D11DeviceContext, IDXGISwapChain
 */
function D3D11CreateDeviceAndSwapChain(canvas, flags, swapChainDesc)
{
	// Create the device, grab its context and then create the swap chain
	let device = D3D11CreateDevice(canvas, flags);
	let context = device.GetImmediateContext();
	let swapChain = DXGICreateSwapChain(device, swapChainDesc);

	// Return all three as an array
	return [device, context, swapChain];
}


/**
 * Creates a new DXGI Swap Chain for presenting the final frame to the user
 * 
 * @param {ID3D11Device} device The ID3D11Device for the swap chain
 * @param {DXGI_SWAP_CHAIN_DESC} desc A description of the swap chain
 * 
 * @returns The new IDXGISwapChain object
 */
function DXGICreateSwapChain(device, desc)
{
	return new class extends IDXGISwapChain { }(device, desc);
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