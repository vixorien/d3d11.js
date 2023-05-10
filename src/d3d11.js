// Errors and such
// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

// WebGL2 state diagram: https://webgl2fundamentals.org/webgl/lessons/resources/webgl-state-diagram.html

// Random webgl notes:
//
// Drawing
//  - glDrawElements() --> DrawIndexed()
//  - glDrawArrays() --> Draw()
//


// General javascript thoughts:
// - Description objects should always be copied (as if it were passed by value)


// -----------------------------------------------------
// ------------- "Enums" & Other Constants -------------
// -----------------------------------------------------

// Appending elements to an input layout
const D3D11_APPEND_ALIGNED_ELEMENT = 4294967295; // Highest unsigned int32

// Identifies how to bind a resource to the pipeline
const D3D11_BIND_VERTEX_BUFFER = 0x1;
const D3D11_BIND_INDEX_BUFFER = 0x2;
const D3D11_BIND_CONSTANT_BUFFER = 0x4;
const D3D11_BIND_SHADER_RESOURCE = 0x8;
const D3D11_BIND_STREAM_OUTPUT = 0x10;
const D3D11_BIND_RENDER_TARGET = 0x20;
const D3D11_BIND_DEPTH_STENCIL = 0x40;
const D3D11_BIND_UNORDERED_ACCESS = 0x80;
const D3D11_BIND_DECODER = 0x200;
const D3D11_BIND_VIDEO_ENCODER = 0x400;

// Type of data contained in an input slot
const D3D11_INPUT_PER_VERTEX_DATA = 0;
const D3D11_INPUT_PER_INSTANCE_DATA = 1;

// Identifies the type of resource being used
const D3D11_RESOURCE_DIMENSION_UNKNOWN = 0;
const D3D11_RESOURCE_DIMENSION_BUFFER = 1;
const D3D11_RESOURCE_DIMENSION_TEXTURE1D = 2;
const D3D11_RESOURCE_DIMENSION_TEXTURE2D = 3;
const D3D11_RESOURCE_DIMENSION_TEXTURE3D = 4;

// Identifies expected resource use during rendering
const D3D11_USAGE_DEFAULT = 0;
const D3D11_USAGE_IMMUTABLE = 1;
const D3D11_USAGE_DYNAMIC = 2;
const D3D11_USAGE_STAGING = 3;

// Resource data formats
// NOTE: This is a direct copy/paste from docs; most are probably unnecessary
const DXGI_FORMAT_UNKNOWN = 0;
const DXGI_FORMAT_R32G32B32A32_TYPELESS = 1;
const DXGI_FORMAT_R32G32B32A32_FLOAT = 2;
const DXGI_FORMAT_R32G32B32A32_UINT = 3;
const DXGI_FORMAT_R32G32B32A32_SINT = 4;
const DXGI_FORMAT_R32G32B32_TYPELESS = 5;
const DXGI_FORMAT_R32G32B32_FLOAT = 6;
const DXGI_FORMAT_R32G32B32_UINT = 7;
const DXGI_FORMAT_R32G32B32_SINT = 8;
const DXGI_FORMAT_R16G16B16A16_TYPELESS = 9;
const DXGI_FORMAT_R16G16B16A16_FLOAT = 10;
const DXGI_FORMAT_R16G16B16A16_UNORM = 11;
const DXGI_FORMAT_R16G16B16A16_UINT = 12;
const DXGI_FORMAT_R16G16B16A16_SNORM = 13;
const DXGI_FORMAT_R16G16B16A16_SINT = 14;
const DXGI_FORMAT_R32G32_TYPELESS = 15;
const DXGI_FORMAT_R32G32_FLOAT = 16;
const DXGI_FORMAT_R32G32_UINT = 17;
const DXGI_FORMAT_R32G32_SINT = 18;
const DXGI_FORMAT_R32G8X24_TYPELESS = 19;
const DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20;
const DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21;
const DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22;
const DXGI_FORMAT_R10G10B10A2_TYPELESS = 23;
const DXGI_FORMAT_R10G10B10A2_UNORM = 24;
const DXGI_FORMAT_R10G10B10A2_UINT = 25;
const DXGI_FORMAT_R11G11B10_FLOAT = 26;
const DXGI_FORMAT_R8G8B8A8_TYPELESS = 27;
const DXGI_FORMAT_R8G8B8A8_UNORM = 28;
const DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29;
const DXGI_FORMAT_R8G8B8A8_UINT = 30;
const DXGI_FORMAT_R8G8B8A8_SNORM = 31;
const DXGI_FORMAT_R8G8B8A8_SINT = 32;
const DXGI_FORMAT_R16G16_TYPELESS = 33;
const DXGI_FORMAT_R16G16_FLOAT = 34;
const DXGI_FORMAT_R16G16_UNORM = 35;
const DXGI_FORMAT_R16G16_UINT = 36;
const DXGI_FORMAT_R16G16_SNORM = 37;
const DXGI_FORMAT_R16G16_SINT = 38;
const DXGI_FORMAT_R32_TYPELESS = 39;
const DXGI_FORMAT_D32_FLOAT = 40;
const DXGI_FORMAT_R32_FLOAT = 41;
const DXGI_FORMAT_R32_UINT = 42;
const DXGI_FORMAT_R32_SINT = 43;
const DXGI_FORMAT_R24G8_TYPELESS = 44;
const DXGI_FORMAT_D24_UNORM_S8_UINT = 45;
const DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46;
const DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47;
const DXGI_FORMAT_R8G8_TYPELESS = 48;
const DXGI_FORMAT_R8G8_UNORM = 49;
const DXGI_FORMAT_R8G8_UINT = 50;
const DXGI_FORMAT_R8G8_SNORM = 51;
const DXGI_FORMAT_R8G8_SINT = 52;
const DXGI_FORMAT_R16_TYPELESS = 53;
const DXGI_FORMAT_R16_FLOAT = 54;
const DXGI_FORMAT_D16_UNORM = 55;
const DXGI_FORMAT_R16_UNORM = 56;
const DXGI_FORMAT_R16_UINT = 57;
const DXGI_FORMAT_R16_SNORM = 58;
const DXGI_FORMAT_R16_SINT = 59;
const DXGI_FORMAT_R8_TYPELESS = 60;
const DXGI_FORMAT_R8_UNORM = 61;
const DXGI_FORMAT_R8_UINT = 62;
const DXGI_FORMAT_R8_SNORM = 63;
const DXGI_FORMAT_R8_SINT = 64;
const DXGI_FORMAT_A8_UNORM = 65;
const DXGI_FORMAT_R1_UNORM = 66;
const DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67;
const DXGI_FORMAT_R8G8_B8G8_UNORM = 68;
const DXGI_FORMAT_G8R8_G8B8_UNORM = 69;
const DXGI_FORMAT_BC1_TYPELESS = 70;
const DXGI_FORMAT_BC1_UNORM = 71;
const DXGI_FORMAT_BC1_UNORM_SRGB = 72;
const DXGI_FORMAT_BC2_TYPELESS = 73;
const DXGI_FORMAT_BC2_UNORM = 74;
const DXGI_FORMAT_BC2_UNORM_SRGB = 75;
const DXGI_FORMAT_BC3_TYPELESS = 76;
const DXGI_FORMAT_BC3_UNORM = 77;
const DXGI_FORMAT_BC3_UNORM_SRGB = 78;
const DXGI_FORMAT_BC4_TYPELESS = 79;
const DXGI_FORMAT_BC4_UNORM = 80;
const DXGI_FORMAT_BC4_SNORM = 81;
const DXGI_FORMAT_BC5_TYPELESS = 82;
const DXGI_FORMAT_BC5_UNORM = 83;
const DXGI_FORMAT_BC5_SNORM = 84;
const DXGI_FORMAT_B5G6R5_UNORM = 85;
const DXGI_FORMAT_B5G5R5A1_UNORM = 86;
const DXGI_FORMAT_B8G8R8A8_UNORM = 87;
const DXGI_FORMAT_B8G8R8X8_UNORM = 88;
const DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89;
const DXGI_FORMAT_B8G8R8A8_TYPELESS = 90;
const DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91;
const DXGI_FORMAT_B8G8R8X8_TYPELESS = 92;
const DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93;
const DXGI_FORMAT_BC6H_TYPELESS = 94;
const DXGI_FORMAT_BC6H_UF16 = 95;
const DXGI_FORMAT_BC6H_SF16 = 96;
const DXGI_FORMAT_BC7_TYPELESS = 97;
const DXGI_FORMAT_BC7_UNORM = 98;
const DXGI_FORMAT_BC7_UNORM_SRGB = 99;
const DXGI_FORMAT_AYUV = 100;
const DXGI_FORMAT_Y410 = 101;
const DXGI_FORMAT_Y416 = 102;
const DXGI_FORMAT_NV12 = 103;
const DXGI_FORMAT_P010 = 104;
const DXGI_FORMAT_P016 = 105;
const DXGI_FORMAT_420_OPAQUE = 106;
const DXGI_FORMAT_YUY2 = 107;
const DXGI_FORMAT_Y210 = 108;
const DXGI_FORMAT_Y216 = 109;
const DXGI_FORMAT_NV11 = 110;
const DXGI_FORMAT_AI44 = 111;
const DXGI_FORMAT_IA44 = 112;
const DXGI_FORMAT_P8 = 113;
const DXGI_FORMAT_A8P8 = 114;
const DXGI_FORMAT_B4G4R4A4_UNORM = 115;
const DXGI_FORMAT_P208 = 130;
const DXGI_FORMAT_V208 = 131;
const DXGI_FORMAT_V408 = 132;

// -----------------------------------------------------
// ------------------- Descriptions --------------------
// -----------------------------------------------------


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
		cpuAccessFlags,
		miscFlags,
		structureByteStride)
	{
		this.ByteWidth = byteWidth;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
		this.StructureByteStride = structureByteStride;
	}
}

class D3D11_INPUT_ELEMENT_DESC 
{
	SemanticName;
	SemanticIndex;
	Format;
	InputSlot;
	AlignedByteOffset;
	InputSlotClass;
	InstanceDataStepRate;

	constructor(
		semanticName,
		semanticIndex,
		format,
		inputSlot,
		alignedByteOffset,
		inputSlotClass,
		instanceDataStepRate)
	{
		this.SemanticName = semanticName;
		this.SemanticIndex = semanticIndex;
		this.Format = format;
		this.InputSlot = inputSlot;
		this.AlignedByteOffset = alignedByteOffset;
		this.InputSlotClass = inputSlotClass;
		this.InstanceDataStepRate = instanceDataStepRate;
	}
}


// -----------------------------------------------------
// ----------------- API Initialization ----------------
// -----------------------------------------------------

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

// -----------------------------------------------------
// -------------- API Object Base Classes --------------
// -----------------------------------------------------


class IUnknown
{
	#refCount = 0;
	
	AddRef()
	{
		this.#refCount++;
		return this.#refCount;
	}
	
	Release()
	{
		this.#refCount--;
		return this.#refCount;
	}
}


class ID3D11DeviceChild extends IUnknown
{
	#device;

	constructor(device)
	{
		super();
		this.#device = device;
	}

	GetDevice()
	{
		return this.#device;
	}
}

// -----------------------------------------------------
// ----------------- Main API Objects ------------------
// -----------------------------------------------------

class ID3D11Device extends IUnknown
{
	#gl;

	constructor(gl)
	{
		super();
		this.#gl = gl;
	}

	GetAdapter()
	{
		return this.#gl;
	}

	// TODO: Add description
	CreateRenderTargetView(resource)
	{
		return new ID3D11RenderTargetView(this, resource);
	}


	// TODO: Respect buffer desc
	// TODO: Use SubresourceData struct for initial data to match d3d spec?
	// TODO: Ensure array types for initial data? 
	CreateBuffer(bufferDesc, initialData)
	{
		// Create the gl buffer and final D3D buffer
		var glBuffer = this.#gl.createBuffer();
		var d3dBuffer = new ID3D11Buffer(this, bufferDesc, glBuffer);

		// Determine usage flag
		// TODO: Analyze CPUAccessFlag to further refine these options
		// See "usage" at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
		var usage = this.#gl.STATIC_DRAW;
		switch (bufferDesc.Usage)
		{
			case D3D11_USAGE_IMMUTABLE: usage = this.#gl.STATIC_DRAW; break;
			case D3D11_USAGE_DYNAMIC: usage = this.#gl.DYNAMIC_DRAW; break;
			case D3D11D3D11_USAGE_STAGING: usage = this.#gl.DYNAMIC_COPY; break; // ???
			case D3D11_USAGE_DEFAULT:
			default:
				usage = this.#gl.STATIC_DRAW; // ???
				break;
		}

		// TODO: Handle combinations of flags...
		// - Maybe just disallow mixing index buffers with others?

		// Determine the buffer type and store the previous buffer to restore
		var bufferType;
		var prevBuffer;
		if (bufferDesc.BindFlags == D3D11_BIND_INDEX_BUFFER)
		{
			bufferType = this.#gl.ELEMENT_ARRAY_BUFFER;
			prevBuffer = this.#gl.getParameter(this.#gl.ELEMENT_ARRAY_BUFFER_BINDING);
		}
		else
		{
			bufferType = this.#gl.ARRAY_BUFFER;
			prevBuffer = this.#gl.getParameter(this.#gl.ARRAY_BUFFER_BINDING);
		}

		// Set this new buffer
		this.#gl.bindBuffer(bufferType, glBuffer);
		
		// Any initial data?
		if (initialData == null)
			this.#gl.bufferData(bufferType, bufferDesc.ByteWidth, usage);
		else
			this.#gl.bufferData(bufferType, initialData, usage); // TODO: Verify size vs. description?

		// Restore previous buffer and return new one
		this.#gl.bindBuffer(bufferType, prevBuffer);
		return d3dBuffer;
	}

	// TODO: Verification of parameters?  Validate data as d3d11 does
	// TODO: Any reason to actually compare against shader?
	// NOTE: gl.MAX_VERTEX_ATTRIBS - maybe max descs?
	CreateInputLayout(inputElementDescs)
	{
		return new ID3D11InputLayout(this, inputElementDescs);
	}
}


class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	#inputAssemblerDirty;
	#inputLayout;

	#vertexBuffers;
	#vertexBufferStrides;
	#vertexBufferOffsets;

	#indexBuffer;
	#indexBufferFormat;
	#indexBufferOffset;



	constructor(device)
	{
		super(device);
		this.#gl = device.GetAdapter();

		this.#vertexBuffers = [];
		this.#vertexBufferStrides = [];
		this.#vertexBufferOffsets = [];
		this.#inputAssemblerDirty = true;

		this.#indexBuffer = null;
		this.#indexBufferFormat = DXGI_FORMAT_R16_FLOAT;
		this.#indexBufferOffset = 0;
	}


	ClearRenderTargetView(rtv, color)
	{
		// Grab existing target and RTV
		var prevRT = this.#gl.getParameter(this.#gl.FRAMEBUFFER_BINDING);
		var rtvResource = rtv.GetResource();

		// Bind the RTV if necessary
		if (prevRT != rtvResource)
			this.#gl.bindFramebuffer(this.#gl.FRAMEBUFFER, rtvResource);
		
		// Clear
		this.#gl.clearColor(color[0], color[1], color[2], color[3]);
		this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);

		// Reset old framebuffer if necessary
		if (prevRT != rtvResource)
			this.#gl.bindFramebuffer(this.#gl.FRAMEBUFFER, prevRT);
	}


	IASetInputLayout(inputLayout)
	{
		this.#inputLayout = inputLayout;
		this.#inputAssemblerDirty = true;
	}

	// TODO: Validate format! (and offset?)
	IASetIndexBuffer(indexBuffer, format, offset)
	{
		this.#indexBuffer = indexBuffer;
		this.#indexBufferFormat = format;
		this.#indexBufferOffset = offset;
	}

	// TODO: Actually use params
	// TODO: Limit num buffers to actual WebGL max
	IASetVertexBuffers(startSlot, buffers, strides, offsets)
	{
		// Reset existing vb data (see: https://stackoverflow.com/a/1232046)
		this.#vertexBuffers.length = 0;
		this.#vertexBufferStrides.length = 0;
		this.#vertexBufferOffsets.length = 0;

		// Save buffers in correct slots
		for (var i = 0; i < buffers.length; i++)
		{
			this.#vertexBuffers[startSlot + i] = buffers[i];
			this.#vertexBufferStrides[startSlot + i] = strides[i];
			this.#vertexBufferOffsets[startSlot + i] = offsets[i];
		}
	}

	// TODO: Handle instancing
	// TODO: Error reporting if state isn't set
	#PrepareInputAssembler()
	{
		if (!this.#inputAssemblerDirty)
			return;
		
		// Handle each input element
		var inputElementDescs = this.#inputLayout.GetInputElementDescs();
		var currentBufferIndex = -1;
		
		for (var i = 0; i < inputElementDescs.length; i++)
		{
			// Grab this element and associated data
			// TODO: bake format details into the input layout to save time here?
			var ie = inputElementDescs[i];
			var dataType = this.#GetDXGIFormatDataType(ie.Format);
			var compCount = this.#GetDXGIFormatComponentCount(ie.Format);
			
			// Bind the correct buffer for this element
			var bufferIndex = ie.InputSlot;
			if (bufferIndex != currentBufferIndex) // TODO: Performance worry?  Or skip
			{
				this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#vertexBuffers[bufferIndex].GetGLResource());
				currentBufferIndex = bufferIndex;
			}

			// Enable this attribute and then set up the details
			this.#gl.enableVertexAttribArray(i);
			this.#gl.vertexAttribPointer(
				i, // Index
				compCount, // Component count (1 - 4)
				dataType, // gl.FLOAT, gl.INT, etc.
				false, // Normalized - only for non-float types
				this.#vertexBufferStrides[bufferIndex],
				this.#vertexBufferOffsets[bufferIndex] + ie.AlignedByteOffset); // TOOD: Verify this is correct
		}

		// Set index buffer
		if (this.#indexBuffer != null)
		{
			this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, this.#indexBuffer.GetGLResource());
		}

		this.#inputAssemblerDirty = false;
	}

	// TODO: Prepare rest of pipeline
	// TODO: Handle primitive topology
	Draw(vertexCount, startVertexLocation)
	{
		this.#PrepareInputAssembler();
		
		this.#gl.drawArrays(gl.TRIANGLES, startVertexLocation, vertexCount);
	}

	DrawIndexed(indexCount, startIndexLocation, baseVertexLocation)
	{
		this.#PrepareInputAssembler();

		// Get proper format
		var format = this.#gl.UNSIGNED_SHORT;
		switch (this.#indexBufferFormat)
		{
			case DXGI_FORMAT_R16_UINT: format = this.#gl.UNSIGNED_SHORT; break;
			case DXGI_FORMAT_R32_UINT: format = this.#gl.UNSIGNED_INT; break;
		}

		// TODO: Vertify offset + startIndex thing
		this.#gl.drawElements(gl.TRIANGLES, indexCount, format, this.#indexBufferOffset + startIndexLocation);
	}

	// NOTE: Assuming floats only for now!
	// TODO: Make this actually check!
	#GetDXGIFormatDataType(format)
	{
		return this.#gl.FLOAT;
	}

	// NOTE: Assming only floats and only 1-4 for now!
	#GetDXGIFormatComponentCount(format)
	{
		switch (format)
		{
			case DXGI_FORMAT_R32_FLOAT: return 1;
			case DXGI_FORMAT_R32G32_FLOAT: return 2;
			case DXGI_FORMAT_R32G32B32_FLOAT: return 3;
			case DXGI_FORMAT_R32G32B32A32_FLOAT: return 4;
			default: return 0;
		}
	}
}


class IDXGISwapChain extends IUnknown
{
	#device;

	constructor(device)
	{
		super();
		this.#device = device;
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
// -------------------- API Objects --------------------
// -----------------------------------------------------

class ID3D11InputLayout extends ID3D11DeviceChild
{
	#inputElementDescs;

	constructor(device, inputElementDescs)
	{
		super(device);

		// Copy array of element descs and save
		// TODO: Throw exception if param is not an array?
		this.#inputElementDescs = this.#CopyDescriptions(inputElementDescs);
	}

	#CopyDescriptions(descriptionArray)
	{
		var descs = [];
		for (var i = 0; i < descriptionArray.length; i++)
			descs[i] = Object.assign({}, descriptionArray[i]);
		return descs;
	}

	GetInputElementDescs()
	{
		return this.#CopyDescriptions(this.#inputElementDescs);
	}
}




// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{
	#desc;
	#dimension;
	#glResource;

	constructor(device, description, dimension, glResource)
	{
		super(device);
		this.#desc = Object.assign({}, description); // Copy
		this.#dimension = dimension;
		this.#glResource = glResource;

		// TODO: Enforce abstract
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}

	GetType()
	{
		return this.#dimension;
	}

	GetGLResource()
	{
		return this.#glResource;
	}
}

class ID3D11Buffer extends ID3D11Resource
{
	constructor(device, description, glBuffer)
	{
		super(device, description, D3D11_RESOURCE_DIMENSION_BUFFER, glBuffer);
	}

}

class ID3D11Texture2D extends ID3D11Resource
{
	constructor(device, description)
	{
		super(device, description, D3D11_RESOURCE_DIMENSION_TEXTURE2D);
	}
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
		this.#resource = resource;
	}

	GetResource()
	{
		return this.#resource;
	}
}

class ID3D11RenderTargetView extends ID3D11View
{
	constructor(device, resource)
	{
		super(device, resource);
	}
}