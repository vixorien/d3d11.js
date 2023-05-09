// Errors and such
// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

// Random webgl notes:
//
// Drawing
//  - glDrawElements() --> DrawIndexed()
//  - glDrawArrays() --> Draw()
//



// Need global functions to init API

function D3D11CreateDevice(canvas) // Canvas acts as the adapter here
{
	// Verify and turn on WebGL
	const gl = canvas.getContext("webgl2");
	if (gl === null) {
		return false; // TODO: Throw exception?
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
//class ComPtr
//{
//	#object = {};

//	Get() { return this.object; }
//	Set(obj) { this.object = obj; }
//}

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

	// TODO: Add description
	CreateRenderTargetView(resource)
	{
		return new ID3D11RenderTargetView(this, resource);
	}

	// TODO: Create ID3D11Buffer object to hold GL buffer
	// TODO: Respect buffer desc, use SubresourceData struct for initial data to match d3d spec
	// TODO: Ensure array types for initial data? 
	CreateBuffer(bufferDesc, initialData)
	{
		// Grab previous buffer
		var prevBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);

		// Create and bind new buffer
		var buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		
		// Any initial data?
		if (initialData == null)
			this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferDesc.ByteWidth, this.gl.STATIC_DRAW); // TODO: Static vs. dynamic?  Check usage in desc?
		else
			this.gl.bufferData(this.gl.ARRAY_BUFFER, initialData, this.gl.STATIC_DRAW); // TODO: Verify size vs. description?

		// Restore previous buffer and return new one
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, prevBuffer);
		return buffer;
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
		var prevRT = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
		var rtvResource = rtv.GetResource();

		// Bind the RTV if necessary
		if (prevRT != rtvResource)
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rtvResource);
		
		// Clear
		this.gl.clearColor(color[0], color[1], color[2], color[3]);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		// Reset old framebuffer if necessary
		if (prevRT != rtvResource)
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, prevRT);
	}

	// TODO: Actually use params
	IASetVertexBuffers(startSlot, numBuffers, buffers, strides, offsets)
	{
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers[0]);
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
// ------------------- Descriptions --------------------
// -----------------------------------------------------

const D3D11_USAGE = {
	D3D11_USAGE_DEFAULT: 0,
	D3D11_USAGE_IMMUTABLE: 1,
	D3D11_USAGE_DYNAMIC: 2,
	D3D11_USAGE_STAGING: 3
}

class D3D11_BUFFER_DESC
{
	ByteWidth;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;
	StructureByteStride;

	constructor(
		byteWidth,
		usage,
		bindFlags,
		cpuAccessFlags = 0,
		miscFlags = 0,
		structureByteStride = 0
	)
	{
		this.ByteWidth = byteWidth;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
		this.StructureByteStride = structureByteStride;
	}
}



// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{
	#desc;

	constructor(device, description)
	{
		super(device);
		this.desc = description;
	}

	GetDesc()
	{
		return desc;
	}
}

class ID3D11Buffer extends ID3D11Resource
{
	constructor(device, description)
	{
		super(device, description);
	}
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