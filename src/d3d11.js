// Errors and such
// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

// WebGL2 state diagram: https://webgl2fundamentals.org/webgl/lessons/resources/webgl-state-diagram.html

// WebGL2 reference: https://www.khronos.org/files/webgl20-reference-guide.pdf

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

// Specifies the types of CPU access allowed for a resource
const D3D11_CPU_ACCESS_WRITE = 0x10000;
const D3D11_CPU_ACCESS_READ = 0x20000;

// Type of data contained in an input slot
const D3D11_INPUT_PER_VERTEX_DATA = 0;
const D3D11_INPUT_PER_INSTANCE_DATA = 1;

// Values that indicate how the pipeline interprets
// vertex data that is bound to the input assembler stage
const D3D11_PRIMITIVE_TOPOLOGY_UNDEFINED = 0;
const D3D11_PRIMITIVE_TOPOLOGY_POINTLIST = 1;
const D3D11_PRIMITIVE_TOPOLOGY_LINELIST = 2;
const D3D11_PRIMITIVE_TOPOLOGY_LINESTRIP = 3;
const D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST = 4;
const D3D11_PRIMITIVE_TOPOLOGY_TRIANGLESTRIP = 5;

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
// ------------------ Other Structures -----------------
// -----------------------------------------------------

class D3D11_VIEWPORT
{
	TopLeftX;
	TopLeftY;
	Width;
	Height;
	MinDepth;
	MaxDepth;

	constructor(topLeftX, topLeftY, width, height, minDepth, maxDepth)
	{
		this.TopLeftX = topLeftX;
		this.TopLeftY = topLeftY;
		this.Width = width;
		this.Height = height;
		this.MinDepth = minDepth;
		this.MaxDepth = maxDepth;
	}
}

// -----------------------------------------------------
// ----------------- API Initialization ----------------
// -----------------------------------------------------

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
	if (gl === null) {
		return false; // TODO: Throw exception?
	}

	return new ID3D11Device(gl);
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
	#immediateContext;

	constructor(gl)
	{
		super();
		this.#gl = gl;
		this.#immediateContext = new ID3D11DeviceContext(this);
	}

	GetAdapter()
	{
		return this.#gl;
	}

	GetImmediateContext()
	{
		return this.#immediateContext;
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
			case D3D11_USAGE_STAGING: usage = this.#gl.DYNAMIC_COPY; break; // ???
			case D3D11_USAGE_DEFAULT:
			default:
				usage = this.#gl.STATIC_DRAW; // ???
				// NOTE: Constant buffers with default usage should probably still be dyanmic draw
				// TODO: Test this and handle here
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
		else if (bufferDesc.BindFlags == D3D11_BIND_CONSTANT_BUFFER)
		{
			bufferType = this.#gl.UNIFORM_BUFFER;
			prevBuffer = this.#gl.getParameter(this.#gl.UNIFORM_BUFFER_BINDING);
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

	// Note: Not using bytecode, just a big string, so only one parameter
	CreateVertexShader(hlslCode)
	{
		// Take the shader code, convert it and pass to GL functions
		var vs = new HLSL(hlslCode, ShaderTypeVertex);
		var glShader = this.#CompileGLShader(vs.GetGLSL(), this.#gl.VERTEX_SHADER);

		return new ID3D11VertexShader(this, glShader, vs.GetCBuffers());
	}

	CreatePixelShader(hlslCode)
	{
		// Take the shader code, convert it and pass to GL functions
		var ps = new HLSL(hlslCode, ShaderTypePixel);
		var glShader = this.#CompileGLShader(ps.GetGLSL(), this.#gl.FRAGMENT_SHADER);

		return new ID3D11PixelShader(this, glShader, ps.GetCBuffers());
	}

	#CompileGLShader(glslCode, glShaderType)
	{
		// Make the shader and attempt to compile
		var shader = this.#gl.createShader(glShaderType);
		this.#gl.shaderSource(shader, glslCode);
		this.#gl.compileShader(shader);

		// Capture any errors and throw
		var success = this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS);
		if (!success)
		{
			throw new Error("Error compiling shader: " + this.#gl.getShaderInfoLog(shader));
		}

		return shader;
	}
}


class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	// General pipeline ---
	#shaderProgramMap;
	#currentShaderProgram;
	#currentCBufferMap;
	#shadersDirty;

	// Input Assembler ---
	#inputAssemblerDirty;
	#inputLayout;
	#primitiveTopology

	#vertexBuffers;
	#vertexBufferStrides;
	#vertexBufferOffsets;

	#indexBuffer;
	#indexBufferFormat;
	#indexBufferOffset;

	// Vertex Shader ---
	#vertexShader;
	#maxVSConstantBuffers;
	#vsConstantBuffers;
	#vsConstantBuffersDirty;

	// Rasterizer ---
	#viewport;

	// Pixel Shader ---
	#pixelShader;
	#maxPSConstantBuffers;
	#psConstantBuffers;
	#psConstantBuffersDirty;

	// Output Merger ---


	constructor(device)
	{
		super(device);
		this.#gl = device.GetAdapter();

		// General
		this.#shaderProgramMap = new Map();
		this.#currentShaderProgram = null;
		this.#currentCBufferMap = null;
		this.#shadersDirty = true;

		// Input Assembler
		{
			this.#inputAssemblerDirty = true;
			this.#inputLayout = null;
			this.#primitiveTopology = D3D11_PRIMITIVE_TOPOLOGY_UNDEFINED;

			this.#vertexBuffers = [];
			this.#vertexBufferStrides = [];
			this.#vertexBufferOffsets = [];

			this.#indexBuffer = null;
			this.#indexBufferFormat = DXGI_FORMAT_R16_FLOAT;
			this.#indexBufferOffset = 0;

		}

		// Vertex Shader
		{
			this.#vertexShader = null;
			this.#maxVSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_VERTEX_UNIFORM_BLOCKS);
			this.#vsConstantBuffers = Array(this.#maxVSConstantBuffers).fill(null);
			this.#vsConstantBuffersDirty = true;
		}

		// Rasterizer
		{
			this.#viewport = null;
		}

		// Pixel Shader
		{
			this.#pixelShader = null;
			this.#maxPSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_FRAGMENT_UNIFORM_BLOCKS);
			this.#psConstantBuffers = Array(this.#maxPSConstantBuffers).fill(null);
			this.#psConstantBuffersDirty = true;
		}

		// Output Merger

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

		// Determine if we're binding or unbinding
		if (indexBuffer == null)
			this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, null);
		else
			this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, this.#indexBuffer.GetGLResource());
	}

	IASetPrimitiveTopology(topology)
	{
		// Note: All vertex shaders have "gl_PointSize = 1.0"
		// to account for D3D points always being exactly 1 pixel
		this.#primitiveTopology = topology;
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

	VSSetShader(vertexShader)
	{
		this.#vertexShader = vertexShader;
		this.#shadersDirty = true;
	}

	VSSetConstantBuffers(startSlot, constantBuffers)
	{
		// Validate overall slots
		if (startSlot + constantBuffers.length < 0 ||
			startSlot + constantBuffers.length >= this.#maxVSConstantBuffers)
			throw new Error("Attempting to set VS constant buffers outside valid range");

		// Place buffers in contiguous slots, offset by starting index
		for (var c = 0; c < constantBuffers.length; c++)
		{
			this.#vsConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#vsConstantBuffersDirty = true;
	}

	// Note: Just taking a single viewport, though
	// the name suggests otherwise, as WebGL only handles
	// a single viewport
	RSSetViewports(viewport)
	{
		// Copy the first element
		this.#viewport = Object.assign({}, viewports);

		// Set the relevant details
		var invertY = this.#gl.canvas.height - this.#viewport.Height;
		this.#gl.viewport(
			this.#viewport.TopLeftX,
			invertY - this.#viewport.TopLeftY,
			this.#viewport.Width,
			this.#viewport.Height);

		this.#gl.depthRange(
			this.#viewport.MinDepth,
			this.#viewport.MaxDepth);
	}

	PSSetShader(pixelShader)
	{
		this.#pixelShader = pixelShader;
		this.#shadersDirty = true;
	}

	PSSetConstantBuffers(startSlot, constantBuffers)
	{
		// Validate overall slots
		if (startSlot + constantBuffers.length < 0 ||
			startSlot + constantBuffers.length >= this.#maxPSConstantBuffers)
			throw new Error("Attempting to set PS constant buffers outside valid range");

		// Place buffers in contiguous slots, offset by starting index
		for (var c = 0; c < constantBuffers.length; c++)
		{
			this.#psConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#psConstantBuffersDirty = true;
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

		this.#inputAssemblerDirty = false;
	}

	#PrepareShaders()
	{
		// Any work to do?
		if (!this.#shadersDirty)
			return;

		// Do we have proper shaders?
		// NOTE: WebGL appears to require both a vertex and pixel shader!
		// TODO: Determine if we can simply provide an "empty"/"basic" PS when PS is null?
		if (this.#vertexShader == null) throw new Error("No vertex shader bound!");
		if (this.#pixelShader == null) throw new Error("No pixel shader bound!");

		// Determine if we've seen this vertex shader before
		if (!this.#shaderProgramMap.has(this.#vertexShader))
		{
			this.#shaderProgramMap.set(this.#vertexShader, new Map());
		}

		// Determine if we've seen this pixel shader before
		var vsMap = this.#shaderProgramMap.get(this.#vertexShader);
		if (!vsMap.has(this.#pixelShader))
		{
			// We now have a combined VS+PS set
			vsMap.set(this.#pixelShader, {
				GLProgram: null,
				CBufferMap: Array(this.#maxVSConstantBuffers + this.#maxPSConstantBuffers).fill(-1)
			}); // Note: May want to store more stuff?
		}

		// Does this program exist?
		var vspsMap = vsMap.get(this.#pixelShader);
		var prog = vspsMap.GLProgram;
		if (prog == null)
		{
			// Create the program and cache for later
			prog = this.#CreateShaderProgram(this.#vertexShader, this.#pixelShader);
			vspsMap.GLProgram = prog;

			// Now that we have a program, cache cbuffer (uniform buffer) indices

			// Start with vertex shader cbuffers
			var vsCBs = this.#vertexShader.GetCBuffers();
			for (var v = 0; v < vsCBs.length; v++)
			{
				var cb = vsCBs[v];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxVSConstantBuffers)
					throw new Error("Invalid register index for vertex shader constant buffer");

				// Get the uniform block index
				// TODO: Check translated names!
				var ubIndex = this.#gl.getUniformBlockIndex(prog, cb.Name);

				// Store in the map
				vspsMap.CBufferMap[cb.RegisterIndex] = ubIndex;
			}

			// Next, pixel shader cbuffers
			var psCBs = this.#pixelShader.GetCBuffers();
			for (var p = 0; p < psCBs.length; p++)
			{
				var cb = psCBs[p];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxPSConstantBuffers)
					throw new Error("Invalid register index for pixel shader constant buffer");

				// Get the uniform block index
				// TODO: Check translated names!
				var ubIndex = this.#gl.getUniformBlockIndex(prog, cb.Name);

				// Store in the map - Note the offset for uniform block indices, since
				// we need PS indices to start after all possible VS indices
				var offsetPSIndex = cb.RegisterIndex + this.#maxVSConstantBuffers;
				vspsMap.CBufferMap[offsetPSIndex] = ubIndex;
			}
		}

		// Activate this program and we're clean
		this.#gl.useProgram(prog);
		this.#currentShaderProgram = prog;
		this.#currentCBufferMap = vspsMap.CBufferMap;
		this.#shadersDirty = false;

		// After shader program swap, we need to double check cbuffers
		this.#vsConstantBuffersDirty = true;
		this.#psConstantBuffersDirty = true;
	}

	#CreateShaderProgram(vs, ps)
	{
		// Create the new program and attach shaders
		var program = this.#gl.createProgram();
		this.#gl.attachShader(program, vs.GetShader());
		this.#gl.attachShader(program, ps.GetShader());

		// Link and check status
		this.#gl.linkProgram(program);
		var linkSuccess = this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS);
		if (!linkSuccess)
		{
			throw new Error("Error linking shaders: " + this.#gl.getProgramInfoLog(program));
		}

		// Validate and check status
		this.#gl.validateProgram(program);
		var validSuccess = this.#gl.getProgramParameter(program, this.#gl.VALIDATE_STATUS);
		if (!validSuccess)
		{
			throw new Error("Error validating shaders: " + this.#gl.getProgramInfoLog(program));
		}

		return program;
	}

	#PrepareConstantBuffers()
	{
		// Bind all VS cbuffers to the proper registers, then map them to uniform block indices
		for (var v = 0; this.#vsConstantBuffersDirty && v < this.#vsConstantBuffers.length; v++)
		{
			var cb = this.#vsConstantBuffers[v];
			if (cb == null)
				continue;

			// Check to see if the shader program expects a buffer
			var ubIndex = this.#currentCBufferMap[v];
			if (ubIndex == -1)
			{
				// Doesn't want this buffer, so unbind
				this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, v, null);
			}
			else
			{
				// Bind to correct "register slot"
				this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, v, cb.GetGLResource());

				// Map the "register slot" to the uniform block index in the program
				this.#gl.uniformBlockBinding(this.#currentShaderProgram, ubIndex, v);
			}
		}

		// Bind all PS cbuffers, too - taking into account an offset to put them after all VS cbuffers
		for (var p = 0; this.#psConstantBuffersDirty && p < this.#psConstantBuffers.length; p++)
		{
			var cb = this.#psConstantBuffers[p];
			if (cb == null)
				continue;

			// Expecting a buffer? (Use PS offset index)
			var psIndex = p + this.#maxVSConstantBuffers;
			var ubIndex = this.#currentCBufferMap[psIndex];
			if (ubIndex == -1)
			{
				// Doesn't want this buffer, so unbind
				this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, psIndex, null);
			}
			else
			{
				// Bind to correct "register slot", taking into account VS register offset
				this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, psIndex, cb.GetGLResource());

				// Map the "register slot" to the uniform block index in the program
				this.#gl.uniformBlockBinding(this.#currentShaderProgram, ubIndex, psIndex);
			}
		}

		// All clean
		this.#vsConstantBuffersDirty = false;
		this.#psConstantBuffersDirty = false;
	}

	// TODO: Prepare rest of pipeline
	// TODO: Handle primitive topology
	Draw(vertexCount, startVertexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();

		this.#gl.drawArrays(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			startVertexLocation,
			vertexCount);
	}

	DrawIndexed(indexCount, startIndexLocation, baseVertexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		

		//console.log("Max vs cbuffers: " + this.#gl.getParameter(this.#gl.MAX_VERTEX_UNIFORM_BLOCKS));
		//console.log("Max ps cbuffers: " + this.#gl.getParameter(this.#gl.MAX_FRAGMENT_UNIFORM_BLOCKS));
		//console.log("Max total cbuffers: " + this.#gl.getParameter(this.#gl.MAX_COMBINED_UNIFORM_BLOCKS));
		//console.log("Max bindings: " + this.#gl.getParameter(this.#gl.MAX_UNIFORM_BUFFER_BINDINGS));
		//console.log("Max cbuffer size: " + this.#gl.getParameter(this.#gl.MAX_UNIFORM_BLOCK_SIZE));

		//// TESTING UNIFORM BLOCK
		//var vsIndex = this.#gl.getUniformBlockIndex(this.#currentShaderProgram, "vsData");
		////console.log(vsIndex);

		//var data = new Float32Array(1);
		//data[0] = 0.25;
		//var cbuffer = this.#gl.createBuffer();
		//this.#gl.bindBuffer(this.#gl.UNIFORM_BUFFER, cbuffer);
		//this.#gl.bufferData(this.#gl.UNIFORM_BUFFER, data, this.#gl.DYNAMIC_DRAW);

		//// Place uniform buffer in a specific "spot" (index ZERO here)
		//// This just gives us a spot to map to
		//var reg = 0;
		//this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, reg, cbuffer);

		//// Map buffer[reg] to uniformBlockInShaderProgram[vsIndex]
		//this.#gl.uniformBlockBinding(this.#currentShaderProgram, vsIndex, reg);

		// Get proper format
		var format = this.#gl.UNSIGNED_SHORT;
		switch (this.#indexBufferFormat)
		{
			case DXGI_FORMAT_R16_UINT: format = this.#gl.UNSIGNED_SHORT; break;
			case DXGI_FORMAT_R32_UINT: format = this.#gl.UNSIGNED_INT; break;
		}

		// TODO: Vertify offset + startIndex thing
		this.#gl.drawElements(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			indexCount,
			format,
			this.#indexBufferOffset + startIndexLocation);
	}

	// NOTE: Not using all of the params just yet
	// TODO: Support texture updates once textures are working
	UpdateSubresource(dstResource, dstSubresource, dstBox, srcData, srcRowPitch, srcDepthPitch)
	{
		// If this is a standard buffer, we ignore most params and just set the data
		if (dstResource instanceof ID3D11Buffer)
		{
			// Check for immutable
			// Note: Some D3D docs say this shouldn't work on dynamic usage, others say it's fine
			if (dstResource.GetDesc().Usage == D3D11_USAGE_IMMUTABLE)
				throw new Error("Cannot update immutable resource");

			// Subresource must be zero here
			if (dstSubresource != 0)
				throw new Error("Invalid subresource (" + dstSubresource + ") used for buffer update");

			// No box update on buffers
			if (dstBox != null)
				throw new Error("Cannot update a box within a buffer resource");

			// Safe to update!  Save any previously bound buffer
			var prevBuffer = this.#gl.getParameter(this.#gl.UNIFORM_BUFFER_BINDING);

			// Bind and update
			this.#gl.bindBuffer(this.#gl.UNIFORM_BUFFER, dstResource.GetGLResource());
			this.#gl.bufferSubData(
				this.#gl.UNIFORM_BUFFER,
				0,
				srcData);

			// Restore the previous buffer
			this.#gl.bindBuffer(this.#gl.UNIFORM_BUFFER, prevBuffer);
		}
		else
		{
			throw new Error("Updating non-buffer resource not yet implemented!");
		}
	}

	// NOTE: Assuming floats only for now!
	// TODO: Make this actually check!
	#GetDXGIFormatDataType(format)
	{
		return this.#gl.FLOAT;
	}

	// NOTE: Assuming only floats and only 1-4 for now!
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

	#GetGLPrimitiveType(d3dPrimType)
	{
		switch (d3dPrimType)
		{
			case D3D11_PRIMITIVE_TOPOLOGY_POINTLIST: return this.#gl.POINTS;
			case D3D11_PRIMITIVE_TOPOLOGY_LINELIST: return this.#gl.LINES;
			case D3D11_PRIMITIVE_TOPOLOGY_LINESTRIP: return this.#gl.LINE_STRIP;
			case D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST: return this.#gl.TRIANGLES;
			case D3D11_PRIMITIVE_TOPOLOGY_TRIANGLESTRIP: return this.#gl.TRIANGLE_STRIP;

			// Default to triangles
			case D3D11_PRIMITIVE_TOPOLOGY_UNDEFINED: 
			default: return this.#gl.TRIANGLES;
		}
	}
}


class IDXGISwapChain extends IUnknown
{
	#device;
	#gl;

	constructor(device)
	{
		super();
		this.#device = device;
		this.#gl = device.GetAdapter();
	}

	GetBuffer()
	{
		// Note: null corresponds to the default back buffer in WebGL (I think?)
		// Since we'll mostly be using this to create an RTV for the back buffer,
		// this value will suffice (for now)
		return null;
	}

	Present()
	{
		this.#gl.flush();
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

class ID3D11VertexShader extends ID3D11DeviceChild
{
	#shader;
	#cbuffers;

	constructor(device, glShader, cbuffers)
	{
		super(device);

		this.#shader = glShader;
		this.#cbuffers = cbuffers;
	}

	GetShader()
	{
		return this.#shader;
	}

	GetCBuffers()
	{
		return this.#cbuffers;
	}
}

class ID3D11PixelShader extends ID3D11DeviceChild
{
	#shader;
	#cbuffers;

	constructor(device, glShader, cbuffers)
	{
		super(device);

		this.#shader = glShader;
		this.#cbuffers = cbuffers;
	}

	GetShader()
	{
		return this.#shader;
	}

	GetCBuffers()
	{
		return this.#cbuffers;
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







// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// ----------------------- HLSL ------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------


const TokenUnknown = 0;
const TokenWhiteSpace = 1;
const TokenCommentMultiline = 2;
const TokenCommentSingle = 3;
const TokenOperator = 4;
const TokenIdentifier = 5;
const TokenNumericLiteral = 6;
const TokenComma = 7;
const TokenColon = 8;
const TokenSemicolon = 9;
const TokenScopeLeft = 10;
const TokenScopeRight = 11;
const TokenParenLeft = 12;
const TokenParenRight = 13;
const TokenBracketLeft = 14;
const TokenBracketRight = 15;

const ShaderTypeVertex = 0;
const ShaderTypePixel = 1;

const PrefixAttribute = "_attrib_";
const PrefixVarying = "_vary_";
const PrefixVSInput = "_vs_input_";
const PrefixVSOutput = "_vs_output_";
const PrefixPSInput = "_ps_input_";
const PrefixPSOutput = "_ps_output_";
const PSOutputVariable = "_sv_target_";

class TokenIterator
{
	#tokens;
	#position;

	constructor(tokens)
	{
		this.#tokens = tokens;
		this.#position = -1;
	}

	MoveNext()
	{
		this.#position++;
		return this.#position < this.#tokens.length;
	}

	Current()
	{
		if (this.#position >= this.#tokens.length)
			return null;

		return this.#tokens[this.#position];
	}

	More()
	{
		return this.#position < this.#tokens.length - 1;
	}

	PeekNext() { return this.#Peek(1); }
	PeekPrev() { return this.#Peek(-1); }

	#Peek(offset)
	{
		var peekPos = this.#position + offset;
		if (peekPos < 0 || peekPos >= this.#tokens.length)
			return null;

		return this.#tokens[peekPos];
	}
}


class HLSL
{
	// Initial data
	#hlsl;
	#shaderType;

	// Tokens
	#tokens;

	// Shader elements
	#structs;
	#cbuffers;
	#textures;
	#samplers;
	#functions;
	#main;

	// Define lexical rules
	Rules = [
		{
			Type: TokenWhiteSpace,
			Pattern: /^\s+/
		},
		{
			Type: TokenCommentMultiline,
			Pattern: /^\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//
		},
		{
			Type: TokenCommentSingle,
			Pattern: /^\/\/.*/
		},
		{
			Type: TokenOperator, // Triples
			Pattern: /^((<<=)|(>>=))/
		},
		{
			Type: TokenOperator, // Doubles
			Pattern: /^((\+=)|(-=)|(\*=)|(\/=)|(%=)|(<<)|(>>)|(&=)|(\|=)|(^=)|(&&)|(\|\|)|(==)|(!=)|(<=)|(>=)|(\+\+)|(--))/
		},
		{
			Type: TokenOperator, // Singles
			Pattern: /^[\+\-\*\/\%\=\~\&\|\^\?\<\>\.\!]/
		},
		{
			Type: TokenIdentifier,
			Pattern: /^[_A-Za-z][_A-Za-z0-9]*/
		},
		{
			Type: TokenNumericLiteral,
			//Pattern: /^[+-]?([0-9]*[.])?[0-9]+[f]?/	// Note: this didn't handle "1.f"
			Pattern: /^[+-]?[0-9]+([.]?[0-9]?[f]?)?/	// Might be overkill, but seems to work
		},
		{
			Type: TokenScopeLeft,
			Pattern: /^[{]/
		},
		{
			Type: TokenScopeRight,
			Pattern: /^[}]/
		},
		{
			Type: TokenParenLeft,
			Pattern: /^[(]/
		},
		{
			Type: TokenParenRight,
			Pattern: /^[)]/
		},
		{
			Type: TokenBracketLeft,
			Pattern: /^[\[]/
		},
		{
			Type: TokenBracketRight,
			Pattern: /^[\]]/
		},
		{
			Type: TokenSemicolon,
			Pattern: /^[;]/
		},
		{
			Type: TokenColon,
			Pattern: /^[:]/
		},
		{
			Type: TokenComma,
			Pattern: /^[,]/
		},
		{
			Type: TokenUnknown,
			Pattern: /^./
		}
	];

	// Note: possibly missing a few matrix permutations (1xN, Nx1)?
	DataTypes = [
		"void",

		"bool", "bool2", "bool3", "bool4",
		"int", "int2", "int3", "int4",
		"uint", "uint2", "uint3", "uint4",
		"dword", "dword2", "dword3", "dword4",
		"half", "half2", "half3", "half4",
		"float", "float2", "float3", "float4",
		"double", "double2", "double3", "double4",

		"float2x2", "float2x3", "float2x4",
		"float3x2", "float3x3", "float3x4",
		"float4x2", "float4x3", "float4x4",
		"matrix"
	];

	InterpolationModifiers = [
		"linear",
		"centroid",
		"nointerpolation",
		"noperspective",
		"sample"
	];

	DataTypeConversion = {
		"void": "void",

		"bool": "bool",
		"bool2": "bvec2",
		"bool3": "bvec3",
		"bool4": "bvec4",

		"int": "int",
		"int2": "ivec2",
		"int3": "ivec3",
		"int4": "ivec4",

		"uint": "uint",
		"uint2": "uvec2",
		"uint3": "uvec3",
		"uint4": "uvec4",

		"dword": "uint",
		"dword2": "uvec2",
		"dword3": "uvec3",
		"dword4": "uvec4",

		"half": "float",
		"half2": "vec2",
		"half3": "vec3",
		"half4": "vec4",

		"float": "float",
		"float2": "vec2",
		"float3": "vec3",
		"float4": "vec4",

		"double": "float",
		"double2": "vec2",
		"double3": "vec3",
		"double4": "vec4",

		"float2x2": "mat2x2",
		"float2x3": "mat2x3",
		"float2x4": "mat2x4",

		"float3x2": "mat3x2",
		"float3x3": "mat3x3",
		"float3x4": "mat3x4",

		"float4x2": "mat4x2",
		"float4x3": "mat4x3",
		"float4x4": "mat4x4",

		"matrix": "mat4x4"
	};

	// Words that may cause problems when used as identifiers
	ReservedWords = [
		"$Global", // "Global" constant buffer name
		"input",
		"output"
	];

	ReservedWordConversion = {
		"input": "_input",
		"output": "_output",
		"$Global": "_global_cbuffer"
	};

	constructor(hlslCode, shaderType)
	{
		// Validate shader type
		if (shaderType != ShaderTypeVertex &&
			shaderType != ShaderTypePixel)
			throw new Error("Invalid shader type specified");

		// Save and prepare
		this.#hlsl = hlslCode.repeat(1); // Copy
		this.#shaderType = shaderType;

		// Tokenize & parse
		this.#Tokenize();
		this.#Parse();
	}

	GetCBuffers()
	{
		// Return a copy so we don't have any refs
		return this.#cbuffers.slice();
	}

	#DataTypeIsStruct(type)
	{
		// Check each struct's name
		for (var s = 0; s < this.#structs.length; s++)
		{
			if (this.#structs[s].Name == type)
			{
				return true;
			}
		}

		return false;
	}

	// Read the code and tokenize
	#Tokenize()
	{
		// Reset
		this.#tokens = [];
		var lineNum = 1;

		// Make a copy of the code as we'll be substringing it
		var code = this.#hlsl.repeat(1); // Copy

		// Loop through entire string
		while (code.length > 0)
		{
			// Check each rule
			var anyMatch = false;
			for (var r = 0; r < this.Rules.length; r++)
			{
				// Run the regex
				const re = new RegExp(this.Rules[r].Pattern, "g");
				const matches = re.exec(code);

				// Match found, add result and break
				if (matches != null)
				{
					anyMatch = true;

					// How many line breaks, if any
					lineNum += (matches[0].match(/\n/g) || []).length;

					// Worth keeping?
					if (this.Rules[r].Type != TokenCommentMultiline &&
						this.Rules[r].Type != TokenCommentSingle &&
						this.Rules[r].Type != TokenWhiteSpace)
					{
						// Build the token and push to list
						var t = {
							Type: this.Rules[r].Type,
							Text: matches[0],
							Line: lineNum
						};
						this.#tokens.push(t);
					}

					// Update string
					code = code.substring(re.lastIndex);
					break;
				}
			}

			// Any matches?
			if (!anyMatch)
			{
				// None, which means we're probably missing a necessary rule
				alert("problem");
				break;
			}
		}
	}

	#Parse()
	{
		// Reset data
		this.#structs = [];
		this.#cbuffers = [];
		this.#textures = [];
		this.#samplers = [];
		this.#functions = [];
		this.#main = null;

		// Create the iterator
		var it = new TokenIterator(this.#tokens);

		// Possible global cbuffer
		var globalCB = {
			Name: "$Global",
			RegisterIndex: -1,
			ExplicitRegister: false,
			Variables: []
		};

		// Work through tokens
		it.MoveNext();
		while (it.More())
		{
			var current = it.Current();

			// Farm out processing of each type
			switch (current.Text)
			{
				case "struct":
					this.#structs.push(this.#ParseStruct(it));
					break;

				case "cbuffer":
					this.#cbuffers.push(this.#ParseCBuffer(it));
					break;

				case "SamplerState":
				case "SamplerComparisonState":
					this.#samplers.push(this.#ParseSampler(it));
					break;

				case "Texture1D": case "Texture1DArray":
				case "Texture2D": case "Texture2DArray":
				case "TextureCube": case "TextureCubeArray":
				case "Texture3D":
					this.#textures.push(this.#ParseTexture(it));
					break;

				case "Texture2DMS":
				case "Texture2DMSArray":
					console.log("Not currently handling multisampled textures");
					break;

				default:
					// Should be a data type and the next should be an identifier
					if (!this.#IsDataType(current.Text) ||
						it.PeekNext().Type != TokenIdentifier)
						break;

					// Check for global variable or function
					this.#GlobalVarOrFunction(it, globalCB);
					break;
			}
		}

		// Must have a main
		if (this.#main == null)
		{
			throw new Error("No main function found");
		}

		// Add global cbuffer if necessary
		if (globalCB.Variables.length > 0)
		{
			this.#cbuffers.push(globalCB);
		}

		// Resolve any implicit register indices
		// TODO: Actually find and use maximums for each register type!
		this.#ResolveImplicitRegisters(this.#cbuffers, 999);
		this.#ResolveImplicitRegisters(this.#samplers, 999);
		this.#ResolveImplicitRegisters(this.#textures, 999);
	}

	#Allow(it, tokenType)
	{
		if (it.Current().Type == tokenType)
		{
			it.MoveNext();
			return true;
		}

		return false;
	}

	#AllowIdentifier(it, ident)
	{
		if (it.Current().Type == TokenIdentifier &&
			it.Current().Text == ident)
		{
			it.MoveNext();
			return true;
		}

		return false;
	}

	#Require(it, tokenType)
	{
		if (this.#Allow(it, tokenType))
			return true;

		throw new Error("Error parsing HLSL on line " + it.Current().Line);
	}

	#RequireIdentifier(it, ident)
	{
		if (this.#AllowIdentifier(it, ident))
			return true;

		throw new Error("Error parsing HLSL on line " + it.Current().Line);
	}

	#IsDataType(text)
	{
		var isStructType = this.#DataTypeIsStruct(text);
		var isDataType = this.DataTypes.indexOf(text) >= 0;
		return isStructType || isDataType;
	}

	#IsReservedWord(text)
	{
		return this.ReservedWords.indexOf(text) >= 0;
	}


	#ParseVariable(it, interpModAllowed, semanticAllowed)
	{
		var variable = {
			InterpMod: null,
			DataType: null,
			Name: null,
			Semantic: null
		};

		// Check for interpolation modifiers
		if (this.InterpolationModifiers.indexOf(it.Current().Text) != -1)
		{
			// Interpolation modifiers allowed?
			if (!interpModAllowed)
				throw new Error("Error parsing HLSL on line " + it.Current().Line + ": interpolation modifier not allowed here.");

			// This is an interpolation modifier
			this.#Require(it, TokenIdentifier);
			variable.InterpMod = it.PeekPrev().Text;
		}

		// If this isn't actually a variable, we should exit early
		if (it.Current().Type != TokenIdentifier)
			return null;

		// It's a data type, so presumably a variable
		this.#Require(it, TokenIdentifier);
		variable.DataType = it.PeekPrev().Text;

		if (!this.#IsDataType(variable.DataType))
			throw new Error("Error parsing HLSL on line " + it.Current().Line + ": unknown data type found.");

		// Identifier
		this.#Require(it, TokenIdentifier);
		variable.Name = it.PeekPrev().Text;

		// Check for semantic
		if (this.#Allow(it, TokenColon))
		{
			// Presumably a semantic - allowed?
			if (!semanticAllowed)
				throw new Error("Error parsing HLSL on line " + it.Current().Line + ": semantic not allowed here.");

			this.#Require(it, TokenIdentifier);
			variable.Semantic = it.PeekPrev().Text;
		}

		return variable;
	}


	#ParseStruct(it)
	{
		// Make the struct
		var s = {
			Name: null,
			Variables: []
		};

		// Ensure we start with "struct", followed by another identifier
		this.#RequireIdentifier(it, "struct");
		this.#Require(it, TokenIdentifier);

		// We have the identifiers, so grab the name
		s.Name = it.PeekPrev().Text;

		// Scope
		this.#Require(it, TokenScopeLeft);

		// Some number of variables
		do
		{
			var v = this.#ParseVariable(it, true, true);
			if (v != null)
			{
				s.Variables.push(v);
			}
		}
		while (this.#Allow(it, TokenSemicolon));

		// End scope and semicolon
		this.#Require(it, TokenScopeRight);
		this.#Require(it, TokenSemicolon);

		return s;
	}

	#ParseRegisterIndex(it, registerLabel) // "b", "s" or "t"
	{
		// Should be on ":" character
		if (it.Current().Text == ":" &&
			it.MoveNext() && it.Current().Text == "register" &&
			it.MoveNext() && it.Current().Type == TokenParenLeft &&
			it.MoveNext() && // current is now register index
			it.PeekNext().Type == TokenParenRight) // Next is end parens
		{
			// Validate register
			var regText = it.Current().Text;
			if (!regText.startsWith(registerLabel))
				return -1;

			// Get index
			var index = parseInt(regText.substring(1));
			if (isNaN(index))
				return -1;

			// Skip the register index and end parens
			it.MoveNext();
			it.MoveNext();
			return index;
		}

		// No register, or malformed syntax
		return -1;
	}


	#ParseCBuffer(it)
	{
		// Make the cbuffer
		var cb = {
			Name: null,
			RegisterIndex: -1,
			ExplicitRegister: false,
			Variables: []
		};

		// Verify identifiers
		this.#RequireIdentifier(it, "cbuffer");
		this.#Require(it, TokenIdentifier);

		// Success, save the name
		cb.Name = it.PeekPrev().Text;

		// Scan for register
		cb.RegisterIndex = this.#ParseRegisterIndex(it, "b");
		if (cb.RegisterIndex >= 0)
			cb.ExplicitRegister = true;

		// Should be scope at this point
		this.#Require(it, TokenScopeLeft);

		// Process any variables
		do
		{
			var v = this.#ParseVariable(it, false, false);
			if (v != null)
			{
				cb.Variables.push(v);
			}
		}
		while (this.#Allow(it, TokenSemicolon));

		// End scope
		this.#Require(it, TokenScopeRight);
		return cb;
	}

	#ParseTexture(it)
	{
		var t = {
			Type: null,
			Name: null,
			RegisterIndex: -1,
			ExplicitRegister: false,
		};

		// Texture type
		// TODO: Handle typed textures?
		this.#Require(it, TokenIdentifier);
		t.Type = it.PeekPrev().Text;

		// Identifier
		this.#Require(it, TokenIdentifier);
		t.name = it.PeekPrev().Text;

		// Scan for register
		t.RegisterIndex = this.#ParseRegisterIndex(it, "t");
		if (t.RegisterIndex >= 0)
			t.ExplicitRegister = true;

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return t;
	}

	#ParseSampler(it)
	{
		var s = {
			Type: null,
			Name: null,
			RegisterIndex: -1,
			ExplicitRegister: false,
		};

		// Sampler type
		this.#Require(it, TokenIdentifier);
		s.Type = it.PeekPrev().Text;

		// Name
		this.#Require(it, TokenIdentifier);
		s.Name = it.PeekPrev().Text;

		// Scan for register
		s.RegisterIndex = this.#ParseRegisterIndex(it, "s");
		if (s.RegisterIndex >= 0)
			s.ExplicitRegister = true;

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return s;
	}

	// TODO: Skip const globals in the global CB
	#GlobalVarOrFunction(it, globalCB)
	{
		// Data type
		this.#Require(it, TokenIdentifier);
		var type = it.PeekPrev().Text;

		// Name
		this.#Require(it, TokenIdentifier);
		var name = it.PeekPrev().Text;

		// Check for parens, which means function
		if (this.#Allow(it, TokenParenLeft))
		{
			var f = {
				ReturnType: type,
				Name: name,
				Semantic: null,
				Parameters: [],
				BodyTokens: []
			};

			// It's a function, so it may have parameters
			do
			{
				var v = this.#ParseVariable(it, true, true);
				if (v != null)
				{
					f.Parameters.push(v);
				}
			}
			while (this.#Allow(it, TokenComma));

			// Done with variables
			this.#Require(it, TokenParenRight);

			// Might have a semantic!
			if (this.#Allow(it, TokenColon))
			{
				// Verify identifier and save
				this.#Require(it, TokenIdentifier);
				f.Semantic = it.PeekPrev().Text;
			}

			// Add this to the token body
			f.BodyTokens.push(it.Current());

			// Next should be open scope
			var scopeLevel = 1;
			this.#Require(it, TokenScopeLeft);
			do
			{
				// Add everything to the list of body tokens
				f.BodyTokens.push(it.Current());

				// Check for scope change and skip everything else
				if (this.#Allow(it, TokenScopeLeft))
					scopeLevel++;
				else if (this.#Allow(it, TokenScopeRight))
					scopeLevel--;
				else
					it.MoveNext();
			}
			while (scopeLevel >= 1);

			// Is this main?
			if (f.Name == "main")
			{
				// Too many mains?
				if (this.#main != null)
					throw new Error("Multiple main functions detected");

				// Save main specially
				this.#main = f;
			}
			else
			{
				// Just a helper function
				this.#functions.push(f);
			}
		}
		else if (this.#Allow(it, TokenSemicolon))
		{
			// Should be end of a variable, so add to the global cbuffer
			var v = {
				InterpMod: null,
				DataType: type,
				Name: name,
				Semantic: null
			};
			globalCB.Variables.push(v); // Note: main loop will do MoveNext
		}
	}

	#RegisterExists(elements, registerIndex)
	{
		for (var e = 0; e < elements.length; e++)
		{
			if (elements[e].RegisterIndex == registerIndex)
				return true;
		}

		return false;
	}

	#ResolveImplicitRegisters(elements, maxRegisters)
	{
		// The current index for an implicit register
		var currentIndex = 0;

		for (var e = 0; e < elements.length; e++)
		{
			// Does this element need a register?
			if (elements[e].RegisterIndex == -1)
			{
				// If the current index is taken, check the next
				while (this.#RegisterExists(elements, currentIndex))
					currentIndex++;

				// TODO: Validate register indices - ensure they don't go above MAX for this type
				if (currentIndex >= maxRegisters)
					throw new Error("Too many registers in use for shader");

				// Current index is open
				elements[e].RegisterIndex = currentIndex;
				currentIndex++;
			}
		}
	}

	// Converting hlsl to glsl
	//
	// - Handle reserved words as identifiers!
	//   - "input"
	//   - "output"
	//
	// - VS input --> attributes
	//   - scan all main() params, including structs
	//   - list of all variables, in order
	//   - each becomes an attribute
	//
	// - keep struct(s)
	//   - strip semantics
	//
	// - HLSL's main --> rename to hlslMain()
	//   - keep params, but strip all semantics
	//
	// - VS output & PS input
	//   - turn everything into varyings?
	//   - or maybe an "interface block"?
	//
	// - main()
	//   - create blank main (void, no params)
	//   - create varaible for each param to hlslMain(), including structs
	//   - "hook up" attributes into these new variables
	//   - pass them to hlslMain()
	//   - capture return value
	//   - determine which value (whole thing, or struct member) is SV_POSITION
	//   - set SV_POSITION member to gl_Position
	//   - varyings (or interface block) for the rest

	GetGLSL()
	{
		switch (this.#shaderType)
		{
			case ShaderTypeVertex: return this.#ConvertVertexShader();
			case ShaderTypePixel: return this.#ConvertPixelShader();
			default: throw new Error("Invalid shader type");
		}
	}

	#GetStructByName(name)
	{
		for (var s = 0; s < this.#structs.length; s++)
			if (this.#structs[s].Name == name)
				return this.#structs[s];

		return null;
	}

	#Translate(identifier)
	{
		if (this.#IsDataType(identifier) && !this.#DataTypeIsStruct(identifier))
			return this.DataTypeConversion[identifier];
		else if (this.#IsReservedWord(identifier))
			return this.ReservedWordConversion[identifier];
		else
			return identifier;
	}

	#TranslateToken(token)
	{
		// Check for numbers - need to remove the "f"
		if (token.Type == TokenNumericLiteral &&
			token.Text.charAt(token.Text.length - 1) == "f")
		{
			// Might be left with a "." at the end, in the case of "1.f"
			var stripSize = 1;
			if (token.Text.charAt(token.Text.length - 2) == ".")
				stripSize = 2;

			return token.Text.substring(0, token.Text.length - stripSize);
		}
		else
		{
			return this.#Translate(token.Text);
		}
	}

	#ConvertVertexShader()
	{
		var glsl = "#version 300 es\n\n";
		var vsInputs = this.#GetVSInputs();

		// Append each type of shader element
		glsl += this.#GetAttributesString(vsInputs);
		glsl += this.#GetVSVaryings();
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHelperFunctionsString();
		glsl += this.#GetFunctionString(this.#main, "hlsl_");
		glsl += this.#BuildVertexShaderMain(vsInputs);

		return glsl;
	}

	#GetVSInputs()
	{
		// Validate main
		if (this.#main == null)
			throw new Error("Missing main() function in shader");

		// Get all of the VS input
		var vsInputs = [];
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];

			// If this is a data type, we have to scan the whole thing
			if (this.#DataTypeIsStruct(param.DataType))
			{
				var struct = this.#GetStructByName(param.DataType);
				if (struct == null)
					throw new Error("Invalid data type in vertex shader input");

				// Add each struct member to the VS input
				for (var v = 0; v < struct.Variables.length; v++)
				{
					vsInputs.push(struct.Variables[v]);
				}
			}
			else
			{
				vsInputs.push(param);
			}
		}

		return vsInputs;
	}

	#GetAttributesString(vsInputs)
	{
		// Turn each vs input into an attribute
		var attribs = "";

		for (var i = 0; i < vsInputs.length; i++)
		{
			attribs +=
				"in " + // Note: Changes from "attribute" to "in" for GLSL 3
				this.#Translate(vsInputs[i].DataType) + " " +
				PrefixAttribute + vsInputs[i].Name + ";\n";
		}

		attribs += "\n";

		return attribs;
	}

	#GetVSVaryings()
	{
		// Does main actually return a struct?
		if (!this.#DataTypeIsStruct(this.#main.ReturnType))
			return "";

		// Grab the struct and put together varyings
		var struct = this.#GetStructByName(this.#main.ReturnType);
		var vary = "";

		for (var v = 0; v < struct.Variables.length; v++)
		{
			var member = struct.Variables[v];

			// Skip SV_POSITION
			if (member.Semantic != null &&
				member.Semantic.toUpperCase() == "SV_POSITION")
				continue;

			vary += "out " + this.#Translate(member.DataType);	// Data type - Note: "varying" to "out" for GLSL 3
			vary += " " + PrefixVarying + member.Semantic + ";\n";	// Identifier is semantic!
		}

		vary += "\n";
		return vary;
	}

	#GetStructsString()
	{
		var str = "";

		for (var s = 0; s < this.#structs.length; s++)
		{
			// Start the struct
			var struct = this.#structs[s];
			str += "struct " + this.#Translate(struct.Name) + "\n";
			str += "{\n";

			// Handle each variable (no semantics)
			for (var v = 0; v < struct.Variables.length; v++)
			{
				var variable = struct.Variables[v];
				str += "\t" + this.#Translate(variable.DataType); // Datatype
				str += " " + this.#Translate(variable.Name) + ";\n"; // Identifier
			}

			// End the struct
			str += "};\n\n";
		}

		return str;
	}

	// Note: Using the same variable name in uniform blocks in VS/PS seems to throw a webgl error
	// TODO: Handle this by prepending ALL cbuffer variables with "vs_" or "ps_" perhaps?
	#GetCBuffersString()
	{
		var cbStr = "";

		for (var c = 0; c < this.#cbuffers.length; c++)
		{
			// Start the uniform block
			var cb = this.#cbuffers[c];
			cbStr += "layout(std140) uniform " + this.#Translate(cb.Name) + "\n";
			cbStr += "{\n";

			// Handle each variable (no semantics)
			for (var v = 0; v < cb.Variables.length; v++)
			{
				var variable = cb.Variables[v];
				cbStr += "\t" + this.#Translate(variable.DataType); // Datatype
				cbStr += " " + this.#Translate(variable.Name) + ";\n"; // Identifier
			}

			// End the block
			cbStr += "};\n\n";
		}

		return cbStr;
	}


	#GetFunctionString(func, prependName = "")
	{
		var newFuncName = prependName + func.Name;
		var funcStr = "";

		// Start the function
		funcStr += this.#Translate(func.ReturnType); // Data type
		funcStr += " " + this.#Translate(newFuncName) + "("; // Identifier

		// Parameters
		for (var p = 0; p < func.Parameters.length; p++)
		{
			var param = func.Parameters[p];
			funcStr += this.#Translate(param.DataType); // Data type
			funcStr += " " + this.#Translate(param.Name); // Identifier

			if (p < func.Parameters.length - 1)
				funcStr += ", ";
		}

		// End header
		funcStr += ")";

		// Body (including scope!)
		var it = new TokenIterator(func.BodyTokens);
		var indent = 0;
		var parenDepth = 0;
		while (it.MoveNext())
		{
			var t = it.Current();

			// Track parens (due to for loops)
			switch (t.Type)
			{
				case TokenParenLeft: parenDepth++; break;
				case TokenParenRight: parenDepth--; break;
			}

			// End scope needs to "unindent" BEFORE
			if (t.Type == TokenScopeRight)
				indent--;

			// Beginning of line - indent?
			if (funcStr.charAt(funcStr.length - 1) == "\n")
			{
				funcStr += "\t".repeat(Math.max(indent, 0));
			}

			// Start scope adds indentation AFTER
			if (t.Type == TokenScopeLeft)
				indent++;

			// Add the token
			funcStr += this.#TranslateToken(t);

			// Is a space necessary?  Yes for 2 idents in a row
			if (t.Type == TokenIdentifier && it.PeekNext().Type == TokenIdentifier)
				funcStr += " ";

			// New line?
			if ((t.Type == TokenSemicolon && parenDepth == 0) ||	// End of line, but not for loops
				t.Type == TokenScopeLeft ||
				t.Type == TokenScopeRight)
				funcStr += "\n";
		}

		// End body
		funcStr += "\n";
		return funcStr;
	}

	#GetHelperFunctionsString()
	{
		var functions = "";
		for (var f = 0; f < this.#functions.length; f++)
			functions += this.#GetFunctionString(this.#functions[f]);
		return functions;
	}

	#BuildVertexShaderMain(vsInputs)
	{
		var main = "void main()\n";
		main += "{\n";

		// Create a variable for each vs input
		// NOTE: This could be skipped and the attributes could be 
		//       directly set to the variables/structs below
		for (var v = 0; v < vsInputs.length; v++)
		{
			main += "\t" + this.#Translate(vsInputs[v].DataType) + " " + vsInputs[v].Name + " = ";
			main += PrefixAttribute + vsInputs[v].Name + ";\n";
		}

		// Are any of the actual function inputs structs?
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];
			if (this.#DataTypeIsStruct(param.DataType))
			{
				// Yes, so build a struct object and "hook up" vsInputs
				var newParamName = this.#Translate(param.Name);
				main += "\n\t" + param.DataType;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				var struct = this.#GetStructByName(param.DataType);
				for (var v = 0; v < struct.Variables.length; v++)
				{
					var member = struct.Variables[v];
					main += "\t" + newParamName + "." + this.#Translate(member.Name) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       vsInput identifier used throughout the rest of the function
					main += this.#Translate(member.Name) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + this.#Translate(this.#main.ReturnType) + " " + PrefixVSOutput + " = hlsl_main(";
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			main += this.#Translate(this.#main.Parameters[p].Name);
			if (p < this.#main.Parameters.length - 1)
				main += ", ";
		}
		main += ");\n\n";

		// Handle output - might be return value directly or part of struct
		if (this.#main.Semantic != null &&
			this.#main.Semantic.toUpperCase() == "SV_POSITION")
		{
			// This is the only output
			main += "\tgl_Position = " + PrefixVSOutput + ";\n";
		}
		else
		{
			// SV_POSITION is part of a struct - handle all that data
			var posName = null;
			var struct = this.#GetStructByName(this.#main.ReturnType);
			for (var v = 0; v < struct.Variables.length; v++)
			{
				var member = struct.Variables[v];

				// Is this our SV_Position?
				if (member.Semantic != null &&
					member.Semantic.toUpperCase() == "SV_POSITION")
				{
					// Remember for later
					posName = member.Name;
				}
				else
				{
					// This is other VS->PS data (varying identifier is semantic!)
					main += "\t" + PrefixVarying + member.Semantic + " = " + PrefixVSOutput + "." + member.Name + ";\n";
				}
			}

			main += "\tgl_Position = " + PrefixVSOutput + "." + posName + ";\n";
		}

		main += "\tgl_PointSize = 1.0;\n"; // Just in case we need to draw points!
		main += "}\n";
		return main;
	}



	#GetPSInputs()
	{
		// Validate main
		if (this.#main == null)
			throw new Error("Missing main() function in shader");

		// Get all of the PS inputs
		var psInputs = [];
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];

			// If this is a data type, we have to scan the whole thing
			if (this.#DataTypeIsStruct(param.DataType))
			{
				var struct = this.#GetStructByName(param.DataType);
				if (struct == null)
					throw new Error("Invalid data type in pixel shader input");

				// Add each struct member to the VS input
				for (var v = 0; v < struct.Variables.length; v++)
				{
					psInputs.push(struct.Variables[v]);
				}
			}
			else
			{
				psInputs.push(param);
			}
		}

		return psInputs;
	}

	#GetPSVaryings(psInputs)
	{
		// Any inputs?
		if (psInputs.length == 0)
			return "";

		var vary = "";

		// Loop through all main parameters
		var needFragCoord = false;
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];
			if (this.#DataTypeIsStruct(param.DataType))
			{
				// This param is an entire struct, so make a varying for each member
				// Note: Using semantic as varying identifiers!
				var struct = this.#GetStructByName(param.DataType);
				for (var v = 0; v < struct.Variables.length; v++)
				{
					var member = struct.Variables[v];

					// Skip SV_POSITION
					if (member.Semantic != null &&
						member.Semantic.toUpperCase() == "SV_POSITION")
					{
						needFragCoord = true;
						continue;
					}

					vary += "in " + this.#Translate(member.DataType); // Data type - Note: "varying" to "in" for GLSL 3
					vary += " " + PrefixVarying + member.Semantic + ";\n"; // Identifier is semantic!
				}

			}
			else if (param.Semantic != null && param.Semantic.toUpperCase() == "SV_POSITION")
			{
				needFragCoord = true;
			}
			else
			{
				// This is a normal variable, so just one varying
				vary += "in " + this.#Translate(param.DataType); // Data type
				vary += " " + PrefixVarying + param.Semantic + ";\n"; // Identifier is semantic!
			}
		}

		// Do we need gl_FragCoord due to an expected SV_POSITION input?
		if (needFragCoord)
		{
			// Nothing to do here yet...
			// TODO: handle upside down Y coord!!!
			// How? Automatically add data so we can flip ourselves, maybe?
		}

		// Extra line break just for readability when debugging
		vary += "\n";

		return vary;
	}

	#BuildPixelShaderMain(psInputs)
	{
		var main = "void main()\n";
		main += "{\n";

		// Create a variable for each ps input (which comes from a varying)
		// NOTE: This could be skipped and the varyings could be
		//       directly set to the variables/structs below
		for (var v = 0; v < psInputs.length; v++)
		{
			main += "\t" + this.#Translate(psInputs[v].DataType) + " " + psInputs[v].Name + " = ";

			// SV_POSITION is really just gl_FragCoord
			if (psInputs[v].Semantic.toUpperCase() == "SV_POSITION")
				main += "gl_FragCoord;\n";
			else
				main += PrefixVarying + psInputs[v].Semantic + ";\n"; // Identifier is semantic!
		}

		// Are any of the actual function inputs structs?
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];
			if (this.#DataTypeIsStruct(param.DataType))
			{
				// Yes, so build a struct object and "hook up" psInputs
				var newParamName = this.#Translate(param.Name);
				main += "\n\t" + param.DataType;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				var struct = this.#GetStructByName(param.DataType);
				for (var v = 0; v < struct.Variables.length; v++)
				{
					var member = struct.Variables[v];
					main += "\t" + newParamName + "." + this.#Translate(member.Name) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       psInput identifier used throughout the rest of the function
					main += this.#Translate(member.Name) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + this.#Translate(this.#main.ReturnType) + " " + PrefixPSOutput + " = hlsl_main(";
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			main += this.#Translate(this.#main.Parameters[p].Name);
			if (p < this.#main.Parameters.length - 1)
				main += ", ";
		}
		main += ");\n\n";

		// Handle output - NOTE: Currently, only handling a single render target!
		if (this.#main.Semantic != null &&
			(this.#main.Semantic.toUpperCase() == "SV_TARGET" ||
				this.#main.Semantic.toUpperCase() == "SV_TARGET0"))
		{
			main += "\t" + PSOutputVariable + " = " + PrefixPSOutput + ";\n";
		}
		else
		{
			// Presumably part of a struct - figure out which member
			// NOTE: Still only handling a single render target!
			// TODO: Figure out multiple render targets in webgl

			var targetName = null;
			var struct = this.#GetStructByName(this.#main.ReturnType);
			for (var v = 0; v < struct.Variables.length; v++)
			{
				var member = struct.Variables[v];

				// Is this our SV_Position?
				if (member.Semantic != null &&
					(member.toUpperCase() == "SV_TARGET" ||
						member.toUpperCase() == "SV_TARGET0"))
				{
					// Remember for later
					targetName = member.Name;
				}
				else
				{
					// This is a semantic other than SV_TARGET or SV_TARGET0
					throw new Error("Error converting pixel shader: Only 1 render target currently supported");
				}
			}

			main += "\t" + PSOutputVariable+ " = " + PrefixPSOutput + "." + targetName + ";\n";
		}


		main += "}\n";
		return main;
	}


	#ConvertPixelShader()
	{
		var glsl = "#version 300 es\n\n";
		var psInputs = this.#GetPSInputs();

		// Append each element
		glsl += "precision mediump float;\n\n";
		glsl += "out vec4 " + PSOutputVariable + ";\n\n";
		glsl += this.#GetPSVaryings(psInputs);
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHelperFunctionsString();
		glsl += this.#GetFunctionString(this.#main, "hlsl_");
		glsl += this.#BuildPixelShaderMain(psInputs);

		return glsl;
	}
}