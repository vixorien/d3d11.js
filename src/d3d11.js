// Errors and such
// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error
const S_OK = 0;
const E_FAIL = 0x80004005;


// Need global functions to init API

function D3D11CreateDevice(canvas) // Canvas acts as the adapter here
{
	// Verify and turn on WebGL
	const gl = canvas.getContext("webgl2");
	if (gl === null) {
		return E_FAIL;
	}

	return new ID3D11Device(gl);
}

function D3D11CreateDeviceContext(device)
{
	return new ID3D11DeviceContext(device);
}

function DXGICreateSwapChain(device)
{
	return new IDXGISwapChain(device);
}

// Currently UNUSED
class ComPtr
{
	#object = {};

	Get() { return this.object; }
	Set(obj) { this.object = obj; }
}

class IUnknown
{
	#refCount = 0;
	
	AddRef()
	{
		this.refCount++;
		return this.refCount;
	}
	
	Release()
	{
		this.refCount--;
		return this.refCount;
	}
}

class ID3D11Device extends IUnknown
{
	#gl;

	constructor(gl)
	{
		super();
		this.gl = gl;
	}

	GetAdapter()
	{
		return this.gl;
	}


	CreateRenderTargetView(resource)
	{
		return new ID3D11RenderTargetView(this, resource);
	}
}

class ID3D11DeviceChild extends IUnknown
{
	#device;

	constructor(device)
	{
		super();
		this.device = device;
	}

	GetDevice()
	{
		return this.device;
	}
}

class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	constructor(device)
	{
		super(device);
		this.gl = device.GetAdapter();
	}


	ClearRenderTargetView(rtv, color)
	{
		// Grab existing target and RTV
		var framebuffer = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
		var rtvResource = rtv.GetResource();

		// Bind the RTV if necessary
		if (framebuffer != rtvResource)
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rtvResource);
		
		// Clear
		this.gl.clearColor(color[0], color[1], color[2], color[3]);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Reset old framebuffer if necessary
		if (framebuffer != rtvResource)
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
	}
}


class IDXGISwapChain extends IUnknown
{
	#device;

	constructor(device)
	{
		super();
		this.device = device;
	}

	GetBuffer()
	{
		// Note: null corresponds to the default back buffer in WebGL (I think?)
		// Since we'll mostly be using this to create an RTV for the back buffer,
		// this value will suffice (for now)
		return null;
	}
}

// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{

}

class ID3D11Texture2D extends ID3D11Resource
{

}

// -----------------------------------------------------
// ----------------------- Views -----------------------
// -----------------------------------------------------

class ID3D11View extends ID3D11DeviceChild
{
	#resource;

	constructor(device, resource)
	{
		super(device);
		this.resource = resource;
	}

	GetResource()
	{
		return this.resource;
	}
}

class ID3D11RenderTargetView extends ID3D11View
{
	constructor(device, resource)
	{
		super(device, resource);
	}
}