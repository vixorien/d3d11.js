// Errors and such
// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

// WebGL2 state diagram: https://webgl2fundamentals.org/webgl/lessons/resources/webgl-state-diagram.html

// WebGL2 reference: https://www.khronos.org/files/webgl20-reference-guide.pdf

// WebGL2 Report: https://webglreport.com/?v=2

// Random webgl notes:
//
// Drawing
//  - glDrawElements() --> DrawIndexed()
//  - glDrawArrays() --> Draw()
//
// Uniform buffers
//  - vec3 ALWAYS pads out to a vec4!!!


// General javascript thoughts:
// - Description objects should always be copied (as if it were passed by value)
// - Could enforce abstract base classes by checking constructors: https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
//   - Could we even prevent instantiation of higher level
//     interfaces by using anonymous classes when instantiating?
//     Probably a javascript no-no, but might test it.
// - On the topic of arrays vs. single element params:
//   - In C++, sometimes you want to send in an array and sometimes a single element (one-element array, essentially)
//   - Might be nice to just support both here, rather than requiring an array wrapper for single elements
//   - Could check using Array.isArray() pretty easily!


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
//const D3D11_BIND_STREAM_OUTPUT = 0x10;
const D3D11_BIND_RENDER_TARGET = 0x20;
const D3D11_BIND_DEPTH_STENCIL = 0x40;
//const D3D11_BIND_UNORDERED_ACCESS = 0x80;
//const D3D11_BIND_DECODER = 0x200;
//const D3D11_BIND_VIDEO_ENCODER = 0x400;

// Comparison options
const D3D11_COMPARISON_NEVER = 1;
const D3D11_COMPARISON_LESS = 2;
const D3D11_COMPARISON_EQUAL = 3;
const D3D11_COMPARISON_LESS_EQUAL = 4;
const D3D11_COMPARISON_GREATER = 5;
const D3D11_COMPARISON_NOT_EQUAL = 6;
const D3D11_COMPARISON_GREATER_EQUAL = 7;
const D3D11_COMPARISON_ALWAYS = 8;

// Specifies the types of CPU access allowed for a resource
const D3D11_CPU_ACCESS_WRITE = 0x10000;
const D3D11_CPU_ACCESS_READ = 0x20000;

// Device creation flags, which are custom for d3d11.js
const D3D11_JS_CREATE_DEVICE_ALPHA_CANVAS = 0x1;
const D3D11_JS_CREATE_DEVICE_PREMULTIPLIED_ALPHA = 0x2;

// Indicates triangles facing a particular direction are not drawn.
const D3D11_CULL_NONE = 1;
const D3D11_CULL_FRONT = 2;
const D3D11_CULL_BACK = 3;

// Defaults for stencil read and write operations
const D3D11_DEFAULT_STENCIL_READ_MASK = 0xff;
const D3D11_DEFAULT_STENCIL_WRITE_MASK = 0xff;

// Identify the portion of a depth-stencil buffer for writing depth data.
const D3D11_DEPTH_WRITE_MASK_ZERO = 0;
const D3D11_DEPTH_WRITE_MASK_ALL = 1;

// Specifies how to access a resource used in a depth-stencil view
// Note: The "unknown" dimension is not valid, as per documentation
//const D3D11_DSV_DIMENSION_UNKNOWN = 0;
const D3D11_DSV_DIMENSION_TEXTURE1D = 1;
const D3D11_DSV_DIMENSION_TEXTURE1DARRAY = 2;
const D3D11_DSV_DIMENSION_TEXTURE2D = 3;
const D3D11_DSV_DIMENSION_TEXTURE2DARRAY = 4;
//const D3D11_DSV_DIMENSION_TEXTURE2DMS = 5;
//const D3D11_DSV_DIMENSION_TEXTURE2DMSARRAY = 6;

// Depth stenvil view options related to the DSV being read only
const D3D11_DSV_READ_ONLY_DEPTH = 0x1;
const D3D11_DSV_READ_ONLY_STENCIL = 0x2;


// Feature options (specifically for d3d11.js)
const D3D11_JS_FEATURE_ANISOTROPIC_FILTER_SUPPORT = 0;
const D3D11_JS_FEATURE_FLOAT_TEXTURE_SUPPORT = 1;
const D3D11_JS_FEATURE_FLOAT_TEXTURE_FILTER_SUPPORT = 2;


// Determines the fill mode to use when rendering triangles
const D3D11_FILL_WIREFRAME = 2; // TODO: Need to somehow emulate this?  Swap to line drawing?
const D3D11_FILL_SOLID = 3;


// Filtering options during texture sampling
// Notes on filter bits:
//   1 bit: Mip filter --> 0 = point, 1 = linear
//   2 bit: unused
//   4 bit: Mag filter --> 0 = point, 1 = linear
//   8 bit: unused
//   16 bit: Min filter --> 0 = point, 1 = linear
//   32 bit: unused
//   64 bit: Anisotropic --> 0 = no, 1 = yes
//   128 bit: Comparison --> 0 = no, 1 = yes							// Hex -> Binary
const D3D11_FILTER_MIN_MAG_MIP_POINT = 0;								// 00000000
const D3D11_FILTER_MIN_MAG_POINT_MIP_LINEAR = 0x1;						// 00000001
const D3D11_FILTER_MIN_POINT_MAG_LINEAR_MIP_POINT = 0x4;				// 00000100
const D3D11_FILTER_MIN_POINT_MAG_MIP_LINEAR = 0x5;						// 00000101
const D3D11_FILTER_MIN_LINEAR_MAG_MIP_POINT = 0x10;						// 00010000
const D3D11_FILTER_MIN_LINEAR_MAG_POINT_MIP_LINEAR = 0x11;				// 00010001
const D3D11_FILTER_MIN_MAG_LINEAR_MIP_POINT = 0x14;						// 00010100
const D3D11_FILTER_MIN_MAG_MIP_LINEAR = 0x15;							// 00010101
const D3D11_FILTER_ANISOTROPIC = 0x55;									// 01010101
const D3D11_FILTER_COMPARISON_MIN_MAG_MIP_POINT = 0x80;					// 10000000
const D3D11_FILTER_COMPARISON_MIN_MAG_POINT_MIP_LINEAR = 0x81;			// 10000001
const D3D11_FILTER_COMPARISON_MIN_POINT_MAG_LINEAR_MIP_POINT = 0x84;	// 10000100
const D3D11_FILTER_COMPARISON_MIN_POINT_MAG_MIP_LINEAR = 0x85;			// 10000101
const D3D11_FILTER_COMPARISON_MIN_LINEAR_MAG_MIP_POINT = 0x90;			// 10010000
const D3D11_FILTER_COMPARISON_MIN_LINEAR_MAG_POINT_MIP_LINEAR = 0x91;	// 10010001
const D3D11_FILTER_COMPARISON_MIN_MAG_LINEAR_MIP_POINT = 0x94;			// 10010100
const D3D11_FILTER_COMPARISON_MIN_MAG_MIP_LINEAR = 0x95;				// 10010101
const D3D11_FILTER_COMPARISON_ANISOTROPIC = 0xd5;						// 11010101

// Maximum float32 value
const D3D11_FLOAT32_MAX = 3.402823466e+38;

// Specifies the parts of the depth stencil to clear
const D3D11_CLEAR_DEPTH = 0x1;
const D3D11_CLEAR_STENCIL = 0x2;

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

// Identifies options for resources
const D3D11_RESOURCE_MISC_GENERATE_MIPS = 0x1;
const D3D11_RESOURCE_MISC_TEXTURECUBE = 0x4;

// Identify the type of resource that will be viewed as a shader resource
//const D3D11_SRV_DIMENSION_UNKNOWN = 0;
//const D3D11_SRV_DIMENSION_BUFFER = 1;
const D3D11_SRV_DIMENSION_TEXTURE1D = 2;
const D3D11_SRV_DIMENSION_TEXTURE1DARRAY = 3;
const D3D11_SRV_DIMENSION_TEXTURE2D = 4;
const D3D11_SRV_DIMENSION_TEXTURE2DARRAY = 5;
//const D3D11_SRV_DIMENSION_TEXTURE2DMS = 6;
//const D3D11_SRV_DIMENSION_TEXTURE2DMSARRAY = 7;
const D3D11_SRV_DIMENSION_TEXTURE3D = 8;
const D3D11_SRV_DIMENSION_TEXTURECUBE = 9;
//const D3D11_SRV_DIMENSION_TEXTURECUBEARRAY = 10; // Unsupported in WebGL
//const D3D11_SRV_DIMENSION_BUFFEREX = 11;

// The stencil operations that can be performed during depth-stencil testing.
const D3D11_STENCIL_OP_KEEP = 1;
const D3D11_STENCIL_OP_ZERO = 2;
const D3D11_STENCIL_OP_REPLACE = 3;
const D3D11_STENCIL_OP_INCR_SAT = 4;
const D3D11_STENCIL_OP_DECR_SAT = 5;
const D3D11_STENCIL_OP_INVERT = 6;
const D3D11_STENCIL_OP_INCR = 7;
const D3D11_STENCIL_OP_DECR = 8;

// Identify the type of resource that will be viewed as a render target.
//const D3D11_RTV_DIMENSION_UNKNOWN = 0;
//const D3D11_RTV_DIMENSION_BUFFER = 1;
const D3D11_RTV_DIMENSION_TEXTURE1D = 2;
const D3D11_RTV_DIMENSION_TEXTURE1DARRAY = 3;
const D3D11_RTV_DIMENSION_TEXTURE2D = 4;
const D3D11_RTV_DIMENSION_TEXTURE2DARRAY = 5;
//const D3D11_RTV_DIMENSION_TEXTURE2DMS = 6;
//const D3D11_RTV_DIMENSION_TEXTURE2DMSARRAY = 7;
const D3D11_RTV_DIMENSION_TEXTURE3D = 8;


// Identify a technique for resolving texture coordinates that are outside of the boundaries of a texture.
const D3D11_TEXTURE_ADDRESS_WRAP = 1;
const D3D11_TEXTURE_ADDRESS_MIRROR = 2;
const D3D11_TEXTURE_ADDRESS_CLAMP = 3;
const D3D11_TEXTURE_ADDRESS_BORDER = 4;			// Unsupported in WebGL!
const D3D11_TEXTURE_ADDRESS_MIRROR_ONCE = 5;	// Unsupported in WebGL!

// Identifies expected resource use during rendering
//
// Usage details:
//
// USAGE       Default   Dynamic   Immutable   Staging
// ------------------------------------------------------
// GPU-Read     yes        yes      yes         yes*
// GPU-Write    yes                             yes*
// CPU-Read                                     yes*
// CPU-Write               yes                  yes*
//
// * Staging GPU read/write limited to COPY operations
// * No depth/stencil or multisampled as staging!
//
// Binding Details
//
//
// BOUND AS    Default   Dynamic   Immutable   Staging
// ------------------------------------------------------
//  Input       yes+      yes^      yes
//  Output      yes+
//
// + One resource bound as both input and output must be different subresoruces
// ^ Dynamic resources can only have a single subresource (no array/mips)
//
const D3D11_USAGE_DEFAULT = 0;
const D3D11_USAGE_IMMUTABLE = 1;
const D3D11_USAGE_DYNAMIC = 2;
const D3D11_USAGE_STAGING = 3;

// Resource data formats
// NOTE: This is a direct copy/paste from docs; most are probably unnecessary
// Format details in depth:
// - https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/format-support-for-direct3d-11-0-feature-level-hardware
// - https://learn.microsoft.com/en-us/previous-versions//ff471325(v=vs.85)?redirectedfrom=MSDN
const DXGI_FORMAT_UNKNOWN = 0;
//const DXGI_FORMAT_R32G32B32A32_TYPELESS = 1;
const DXGI_FORMAT_R32G32B32A32_FLOAT = 2;	// 128-bit, four channel float (for input layouts or textures)
//const DXGI_FORMAT_R32G32B32A32_UINT = 3;
//const DXGI_FORMAT_R32G32B32A32_SINT = 4;
//const DXGI_FORMAT_R32G32B32_TYPELESS = 5;
const DXGI_FORMAT_R32G32B32_FLOAT = 6;		// 96-bit, three channel float (for input layouts)
//const DXGI_FORMAT_R32G32B32_UINT = 7;
//const DXGI_FORMAT_R32G32B32_SINT = 8;
//const DXGI_FORMAT_R16G16B16A16_TYPELESS = 9;
const DXGI_FORMAT_R16G16B16A16_FLOAT = 10;	// 64-bit, four channel, 16-per-channel float (for textures)
//const DXGI_FORMAT_R16G16B16A16_UNORM = 11;
//const DXGI_FORMAT_R16G16B16A16_UINT = 12;
//const DXGI_FORMAT_R16G16B16A16_SNORM = 13;
//const DXGI_FORMAT_R16G16B16A16_SINT = 14;
//const DXGI_FORMAT_R32G32_TYPELESS = 15;
const DXGI_FORMAT_R32G32_FLOAT = 16;		// 64-bit, two channel float (for input layouts)
//const DXGI_FORMAT_R32G32_UINT = 17;
//const DXGI_FORMAT_R32G32_SINT = 18;
//const DXGI_FORMAT_R32G8X24_TYPELESS = 19;
//const DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20;
//const DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21;
//const DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22;
//const DXGI_FORMAT_R10G10B10A2_TYPELESS = 23;
//const DXGI_FORMAT_R10G10B10A2_UNORM = 24;
//const DXGI_FORMAT_R10G10B10A2_UINT = 25;
//const DXGI_FORMAT_R11G11B10_FLOAT = 26;
//const DXGI_FORMAT_R8G8B8A8_TYPELESS = 27;
const DXGI_FORMAT_R8G8B8A8_UNORM = 28;		// Default 32-bit, 8-per-channel color format
const DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29; // 32-bit, 8-per-channel format, using sRGB for gamma conversion
//const DXGI_FORMAT_R8G8B8A8_UINT = 30;
//const DXGI_FORMAT_R8G8B8A8_SNORM = 31;
//const DXGI_FORMAT_R8G8B8A8_SINT = 32;
//const DXGI_FORMAT_R16G16_TYPELESS = 33;
const DXGI_FORMAT_R16G16_FLOAT = 34;		// 32-bit, two channel, 16-per-channel float
//const DXGI_FORMAT_R16G16_UNORM = 35;
//const DXGI_FORMAT_R16G16_UINT = 36;
//const DXGI_FORMAT_R16G16_SNORM = 37;
//const DXGI_FORMAT_R16G16_SINT = 38;
//const DXGI_FORMAT_R32_TYPELESS = 39;
const DXGI_FORMAT_D32_FLOAT = 40;			// 32-bit depth buffers
const DXGI_FORMAT_R32_FLOAT = 41;			// 32-bit single channel float (for input layouts)
const DXGI_FORMAT_R32_UINT = 42;			// 32-bit index buffers
//const DXGI_FORMAT_R32_SINT = 43;
//const DXGI_FORMAT_R24G8_TYPELESS = 44;
const DXGI_FORMAT_D24_UNORM_S8_UINT = 45;	// 24-bit depth + 8-bit stencil
//const DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46;
//const DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47;
//const DXGI_FORMAT_R8G8_TYPELESS = 48;
//const DXGI_FORMAT_R8G8_UNORM = 49;
//const DXGI_FORMAT_R8G8_UINT = 50;
//const DXGI_FORMAT_R8G8_SNORM = 51;
//const DXGI_FORMAT_R8G8_SINT = 52;
//const DXGI_FORMAT_R16_TYPELESS = 53;
//const DXGI_FORMAT_R16_FLOAT = 54;
const DXGI_FORMAT_D16_UNORM = 55;			// 16-bit depth buffers
//const DXGI_FORMAT_R16_UNORM = 56;
const DXGI_FORMAT_R16_UINT = 57;			// 16-bit index buffers
//const DXGI_FORMAT_R16_SNORM = 58;
//const DXGI_FORMAT_R16_SINT = 59;
//const DXGI_FORMAT_R8_TYPELESS = 60;
//const DXGI_FORMAT_R8_UNORM = 61;
//const DXGI_FORMAT_R8_UINT = 62;
//const DXGI_FORMAT_R8_SNORM = 63;
//const DXGI_FORMAT_R8_SINT = 64;
//const DXGI_FORMAT_A8_UNORM = 65;
//const DXGI_FORMAT_R1_UNORM = 66;
//const DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67;
//const DXGI_FORMAT_R8G8_B8G8_UNORM = 68;
//const DXGI_FORMAT_G8R8_G8B8_UNORM = 69;
//const DXGI_FORMAT_BC1_TYPELESS = 70;
//const DXGI_FORMAT_BC1_UNORM = 71;
//const DXGI_FORMAT_BC1_UNORM_SRGB = 72;
//const DXGI_FORMAT_BC2_TYPELESS = 73;
//const DXGI_FORMAT_BC2_UNORM = 74;
//const DXGI_FORMAT_BC2_UNORM_SRGB = 75;
//const DXGI_FORMAT_BC3_TYPELESS = 76;
//const DXGI_FORMAT_BC3_UNORM = 77;
//const DXGI_FORMAT_BC3_UNORM_SRGB = 78;
//const DXGI_FORMAT_BC4_TYPELESS = 79;
//const DXGI_FORMAT_BC4_UNORM = 80;
//const DXGI_FORMAT_BC4_SNORM = 81;
//const DXGI_FORMAT_BC5_TYPELESS = 82;
//const DXGI_FORMAT_BC5_UNORM = 83;
//const DXGI_FORMAT_BC5_SNORM = 84;
//const DXGI_FORMAT_B5G6R5_UNORM = 85;
//const DXGI_FORMAT_B5G5R5A1_UNORM = 86;
//const DXGI_FORMAT_B8G8R8A8_UNORM = 87;
//const DXGI_FORMAT_B8G8R8X8_UNORM = 88;
//const DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89;
//const DXGI_FORMAT_B8G8R8A8_TYPELESS = 90;
//const DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91;
//const DXGI_FORMAT_B8G8R8X8_TYPELESS = 92;
//const DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93;
//const DXGI_FORMAT_BC6H_TYPELESS = 94;
//const DXGI_FORMAT_BC6H_UF16 = 95;
//const DXGI_FORMAT_BC6H_SF16 = 96;
//const DXGI_FORMAT_BC7_TYPELESS = 97;
//const DXGI_FORMAT_BC7_UNORM = 98;
//const DXGI_FORMAT_BC7_UNORM_SRGB = 99;
//const DXGI_FORMAT_AYUV = 100;
//const DXGI_FORMAT_Y410 = 101;
//const DXGI_FORMAT_Y416 = 102;
//const DXGI_FORMAT_NV12 = 103;
//const DXGI_FORMAT_P010 = 104;
//const DXGI_FORMAT_P016 = 105;
//const DXGI_FORMAT_420_OPAQUE = 106;
//const DXGI_FORMAT_YUY2 = 107;
//const DXGI_FORMAT_Y210 = 108;
//const DXGI_FORMAT_Y216 = 109;
//const DXGI_FORMAT_NV11 = 110;
//const DXGI_FORMAT_AI44 = 111;
//const DXGI_FORMAT_IA44 = 112;
//const DXGI_FORMAT_P8 = 113;
//const DXGI_FORMAT_A8P8 = 114;
//const DXGI_FORMAT_B4G4R4A4_UNORM = 115;
//const DXGI_FORMAT_P208 = 130;
//const DXGI_FORMAT_V208 = 131;
//const DXGI_FORMAT_V408 = 132;




// -----------------------------------------------------
// -------------- D3D11 & d3d11.js Errors --------------
// -----------------------------------------------------

// --- Example Errors ---
//
// 1. Invalid array size on texture2d creation:
//
// D3D11 ERROR: ID3D11Device::CreateTexture2D: The Dimensions are invalid. For feature level D3D_FEATURE_LEVEL_11_0, the Width (value = 256) must be between 1 and 16384, inclusively. The Height (value = 256) must be between 1 and 16384, inclusively. And, the ArraySize (value = 0) must be between 1 and 2048, inclusively. [ STATE_CREATION ERROR #101: CREATETEXTURE2D_INVALIDDIMENSIONS]
//
// 2. Invalid mip levels on tex2d creation:
//
// D3D11 ERROR: ID3D11Device::CreateTexture2D: MipLevels invalid. With the dimensions of Width = 256, Height = 256, and ArraySize = 1, MipLevels (value = 999) must be between 1 and 9, inclusively. [ STATE_CREATION ERROR #102: CREATETEXTURE2D_INVALIDMIPLEVELS]
//



// -----------------------------------------------------
// ------------------- Descriptions --------------------
// -----------------------------------------------------

/**
 * Describes a buffer resource
 */
class D3D11_BUFFER_DESC
{
	ByteWidth;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;
	StructureByteStride;

	/**
	 * Creates a new Buffer description
	 * 
	 * @param {number} byteWidth Size of the buffer in bytes
	 * @param {any} usage Identify how the buffer is expected to be read from and written to
	 * @param {any} bindFlags Identify how the buffer will be bound to the pipeline
	 * @param {any} cpuAccessFlags CPU access flags or 0 if no CPU access is necessary
	 * @param {any} miscFlags Miscellaneous flags or 0 if unused
	 * @param {number} structureByteStride The size of each element in the buffer structure (in bytes) when the buffer represents a structured buffer
	 */
	constructor(
		byteWidth,
		usage,
		bindFlags,
		cpuAccessFlags = 0,
		miscFlags = 0,
		structureByteStride = 0)
	{
		this.ByteWidth = byteWidth;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
		this.StructureByteStride = structureByteStride;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_BUFFER_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_BUFFER_DESC(
			this.ByteWidth,
			this.Usage,
			this.BindFlags,
			this.CPUAccessFlags,
			this.MiscFlags,
			this.StructureByteStride);
	}
}


/**
 * Describes depth-stencil state
 */
class D3D11_DEPTH_STENCIL_DESC
{
	DepthEnable;
	DepthWriteMask;
	DepthFunc;
	StencilEnable;
	StencilReadMask;
	StencilWriteMask;
	FrontFace;
	BackFace;

	/**
	 * Creates a new Depth-Stencil State description
	 * 
	 * @param {boolean} depthEnable Enable depth testing
	 * @param {any} depthWriteMask Identify a portion of the depth-stencil buffer that can be modified by depth data
	 * @param {any} depthFunc A function that compares depth data against existing depth data
	 * @param {boolean} stencilEnable Enable stencil testing
	 * @param {any} stencilReadMask Identify a portion of the depth-stencil buffer for reading stencil data
	 * @param {any} stencilWriteMask Identify a portion of the depth-stencil buffer for writing stencil data
	 * @param {D3D11_DEPTH_STENCILOP_DESC} frontFace Identify how to use the results of the depth test and the stencil test for pixels whose surface normal is facing towards the camera
	 * @param {D3D11_DEPTH_STENCILOP_DESC} backFace Identify how to use the results of the depth test and the stencil test for pixels whose surface normal is facing away from the camera
	 */
	constructor(
		depthEnable = true,
		depthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL,
		depthFunc = D3D11_COMPARISON_LESS,
		stencilEnable = false,
		stencilReadMask = D3D11_DEFAULT_STENCIL_READ_MASK,
		stencilWriteMask = D3D11_DEFAULT_STENCIL_READ_MASK,
		frontFace = new D3D11_DEPTH_STENCILOP_DESC(),
		backFace = new D3D11_DEPTH_STENCILOP_DESC())
	{
		this.DepthEnable = depthEnable;
		this.DepthWriteMask = depthWriteMask;
		this.DepthFunc = depthFunc;
		this.StencilEnable = stencilEnable;
		this.StencilReadMask = stencilReadMask;
		this.StencilWriteMask = stencilWriteMask;
		this.FrontFace = frontFace.Copy();
		this.BackFace = backFace.Copy();
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_DEPTH_STENCIL_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_DEPTH_STENCIL_DESC(
			this.DepthEnable,
			this.DepthWriteMask,
			this.DepthFunc,
			this.StencilEnable,
			this.StencilReadMask,
			this.StencilWriteMask,
			this.FrontFace.Copy(),
			this.BackFace.Copy());
	}
}


/**
 * Stencil operations that can be performed based on the results of stencil test
 */
class D3D11_DEPTH_STENCILOP_DESC
{
	StencilFailOp;
	StencilDepthFailOp;
	StencilPassOp;
	StencilFunc;

	/**
	 * Creates a new Depth-Stencil Operation description
	 * 
	 * @param {any} stencilFailOp The stencil operation to perform when stencil testing fails
	 * @param {any} stencilDepthFailOp The stencil operation to perform when stencil testing passes and depth testing fails
	 * @param {any} stencilPassOp The stencil operation to perform when stencil testing and depth testing both pass
	 * @param {any} stencilFunc A function that compares stencil data against existing stencil data
	 */
	constructor(
		stencilFailOp = D3D11_STENCIL_OP_KEEP,
		stencilDepthFailOp = D3D11_STENCIL_OP_KEEP,
		stencilPassOp = D3D11_STENCIL_OP_KEEP,
		stencilFunc = D3D11_COMPARISON_ALWAYS)
	{
		this.StencilFailOp = stencilFailOp;
		this.StencilDepthFailOp = stencilDepthFailOp;
		this.StencilPassOp = stencilPassOp;
		this.StencilFunc = stencilFunc;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_DEPTH_STENCILOP_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_DEPTH_STENCILOP_DESC(
			this.StencilFailOp,
			this.StencilDepthFailOp,
			this.StencilPassOp,
			this.StencilFunc);
	}
}


/**
 * Specifies the subresources of a texture that are accessible from a depth-stencil view
 */
class D3D11_DEPTH_STENCIL_VIEW_DESC
{
	Format;
	ViewDimension;
	Flags;

	MipSlice;
	FirstArraySlice;
	ArraySize;
	// The actual description has these union'd
	// together, but I've opted to simply include
	// their common members above
	// Texture1D;
	// Texture1DArray;
	// Texture2D;
	// Texture2DArray;
	// Texture2DMS;
	// Texture2DMSArray;

	/**
	 * Creates a new Depth-Stencil View description
	 * 
	 * @param {any} format Resource data format
	 * @param {any} viewDimension Type of resource
	 * @param {any} flags A value that describes whether the texture is read only
	 * @param {number} mipSlice The index of the first mipmap level to use
	 * @param {number} firstArraySlice The index of the first texture to use in an array of textures
	 * @param {number} arraySize Number of textures to use
	 */
	constructor(
		format,
		viewDimension,
		flags = 0,
		mipSlice = 0,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.Flags = flags;
		this.MipSlice = mipSlice;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_DEPTH_STENCIL_VIEW_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_DEPTH_STENCIL_VIEW_DESC(
			this.Format,
			this.ViewDimension,
			this.Flags,
			this.MipSlice,
			this.FirstArraySlice,
			this.ArraySize);
	}
}


/**
 * A description of a single element for the input-assembler stage
 */
class D3D11_INPUT_ELEMENT_DESC 
{
	SemanticName;
	SemanticIndex;
	Format;
	InputSlot;
	AlignedByteOffset;
	InputSlotClass;
	InstanceDataStepRate;

	/**
	 * Creates a new Input Element description
	 * 
	 * @param {string} semanticName The HLSL semantic associated with this element in a shader input-signature
	 * @param {number} semanticIndex The semantic index for the element. A semantic index modifies a semantic, with an integer index number.
	 * @param {any} format The data type of the element data
	 * @param {number} inputSlot An integer value that identifies the input-assembler slot
	 * @param {number} alignedByteOffset Offset (in bytes) from the start of the vertex. Use D3D11_APPEND_ALIGNED_ELEMENT for convenience to define the current element directly after the previous one, including any packing if necessary.
	 * @param {any} inputSlotClass Identifies the input data class (per vertex or per instance) for a single input slot
	 * @param {number} instanceDataStepRate The number of instances to draw using the same per-instance data before advancing in the buffer by one element. This value must be 0 for an element that contains per-vertex data.
	 */
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

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_INPUT_ELEMENT_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_INPUT_ELEMENT_DESC(
			this.SemanticName,
			this.SemanticIndex,
			this.Format,
			this.InputSlot,
			this.AlignedByteOffset,
			this.InputSlotClass,
			this.InstanceDataStepRate);
	}
}


/**
 * Describes rasterizer state
 */
class D3D11_RASTERIZER_DESC
{
	FillMode;
	CullMode;
	FrontCounterClockwise;
	DepthBias;
	DepthBiasClamp;
	SlopeScaledDepthBias;
	DepthClipEnable;
	ScissorEnable;
	MultisampleEnable;
	AntiasliasedLineEnable;

	/**
	 * Creates a new Rasterizer State description
	 * 
	 * @param {any} fillMode Determines the fill mode to use when rendering
	 * @param {any} cullMode Indicates triangles facing the specified direction are not drawn
	 * @param {boolean} frontCounterClockwise Determines if a triangle is front- or back-facing. If this parameter is TRUE, a triangle will be considered front-facing if its vertices are counter-clockwise on the render target and considered back-facing if they are clockwise. If this parameter is FALSE, the opposite is true.
	 * @param {number} depthBias Depth value added to a given pixel
	 * @param {number} depthBiasClamp Maximum depth bias of a pixel
	 * @param {number} slopeScaledDepthBias Scalar on a given pixel's slope
	 * @param {boolean} depthClipEnable Enable clipping based on distance
	 * @param {boolean} scissorEnable Enable scissor-rectangle culling. All pixels outside an active scissor rectangle are culled.
	 * @param {boolean} multisampleEnable Enable multi-sampling
	 * @param {boolean} antialiasedLineEnable Specifies whether to enable line antialiasing
	 */
	constructor(
		fillMode,
		cullMode,
		frontCounterClockwise = false,
		depthBias = 0,
		depthBiasClamp = 0,
		slopeScaledDepthBias = 0,
		depthClipEnable = true,
		scissorEnable = false,
		multisampleEnable = false,
		antialiasedLineEnable = false)
	{
		this.FillMode = fillMode;
		this.CullMode = cullMode;
		this.FrontCounterClockwise = frontCounterClockwise;
		this.DepthBias = depthBias;
		this.DepthBiasClamp = depthBiasClamp;
		this.SlopeScaledDepthBias = slopeScaledDepthBias;
		this.DepthClipEnable = depthClipEnable;
		this.ScissorEnable = scissorEnable;
		this.MultisampleEnable = multisampleEnable;
		this.AntiasliasedLineEnable = antialiasedLineEnable;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_RASTERIZER_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_RASTERIZER_DESC(
			this.FillMode,
			this.CullMode,
			this.FrontCounterClockwise,
			this.DepthBias,
			this.DepthBiasClamp,
			this.SlopeScaledDepthBias,
			this.DepthClipEnable,
			this.ScissorEnable,
			this.MultisampleEnable,
			this.AntiasliasedLineEnable);
	}
}

/**
 * Specifies the subresources from a resource that are accessible using a render-target view
 */
class D3D11_RENDER_TARGET_VIEW_DESC
{
	Format; // NO typeless, if DXGI_FORMAT_UNKNOWN then resource type is used
	ViewDimension;

	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_RTV)
	MipSlice;
	FirstArraySlice;	// Or FirstWSlice for 3D textures
	ArraySize;			// Or WSize for 3D textures

	/**
	 * Creates a new Render Target View description
	 * 
	 * @param {any} format The data format
	 * @param {any} viewDimension The resource type which specifies how the render-target resource will be accessed
	 * @param {number} mipSlice The index of the mipmap level to use
	 * @param {number} firstArraySlice The index of the first texture to use in an array of textures
	 * @param {number} arraySize Number of textures in the array to use in the render target view, starting with FirstArraySlice
	 */
	constructor(
		format,
		viewDimension,
		mipSlice = 0,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.MipSlice = mipSlice;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_RENDER_TARGET_VIEW_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_RENDER_TARGET_VIEW_DESC(
			this.Format,
			this.ViewDimension,
			this.MipSlice,
			this.FirstArraySlice,
			this.ArraySize);
	}
}

/**
 * Describes a sampler state
 */
class D3D11_SAMPLER_DESC
{
	Filter;
	AddressU;
	AddressV;
	AddressW;
	MipLODBias;
	MaxAnisotropy;
	ComparisonFunc;
	BorderColor;
	MinLOD;
	MaxLOD;

	/**
	 * Creates a new Sampler State description 
	 * 
	 * @param {any} filter Filtering method to use when sampling a texture
	 * @param {any} addressU Method to use for resolving a u texture coordinate that is outside the 0 to 1 range
	 * @param {any} addressV Method to use for resolving a v texture coordinate that is outside the 0 to 1 range
	 * @param {any} addressW Method to use for resolving a w texture coordinate that is outside the 0 to 1 range
	 * @param {number} mipLODBias Offset from the calculated mipmap level
	 * @param {number} maxAnisotropy Clamping value used if filter is anisotropic. Valid values are between 1 and 16.
	 * @param {any} comparisonFunc A function that compares sampled data against existing sampled data
	 * @param {Array<number>} borderColor Border color to use if D3D11_TEXTURE_ADDRESS_BORDER is specified for AddressU, AddressV, or AddressW (unsupported in WebGL?)
	 * @param {number} minLOD Lower end of the mipmap range to clamp access to
	 * @param {number} maxLOD Upper end of the mipmap range to clamp access to. To have no upper limit on LOD set this to a large value such as D3D11_FLOAT32_MAX.
	 */
	constructor(
		filter,
		addressU,
		addressV,
		addressW,
		mipLODBias,
		maxAnisotropy,
		comparisonFunc,
		borderColor,
		minLOD,
		maxLOD)
	{
		this.Filter = filter;
		this.AddressU = addressU;
		this.AddressV = addressV;
		this.AddressW = addressW;
		this.MipLODBias = mipLODBias;
		this.MaxAnisotropy = maxAnisotropy;
		this.ComparisonFunc = comparisonFunc;
		this.BorderColor = borderColor;
		this.MinLOD = minLOD;
		this.MaxLOD = maxLOD;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_SAMPLER_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_SAMPLER_DESC(
			this.Filter,
			this.AddressU,
			this.AddressV,
			this.AddressW,
			this.MipLODBias,
			this.MaxAnisotropy,
			this.ComparisonFunc,
			this.BorderColor,
			this.MinLOD,
			this.MaxLOD);
	}
}


/**
 * Describes a shader-resource view
 */
class D3D11_SHADER_RESOURCE_VIEW_DESC 
{
	Format;
	ViewDimension;

	// The actual description has these union'd
	// together, but I've opted to simply include
	// their common members above
	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_SRV)

	MostDetailedMip;
	MipLevels;
	FirstArraySlice;	// Or First2DArrayFace for tex cube arrays
	ArraySize;			// Or NumCubes for tex cube arrays

	/**
	 * Creates a new Shader Resource View description
	 * 
	 * @param {any} format The viewing format
	 * @param {any} viewDimension The resource type of the view
	 * @param {any} mostDetailedMip Index of the most detailed mipmap level to use
	 * @param {any} mipLevels The maximum number of mipmap levels for the view of the texture
	 * @param {any} firstArraySlice The index of the first texture to use in an array of textures
	 * @param {any} arraySize Number of textures in the array
	 */
	constructor(
		format,
		viewDimension,
		mostDetailedMip = 0,
		mipLevels = 1,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.MostDetailedMip = mostDetailedMip;
		this.MipLevels = mipLevels;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_SHADER_RESOURCE_VIEW_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_SHADER_RESOURCE_VIEW_DESC(
			this.Format,
			this.ViewDimension,
			this.MostDetailedMip,
			this.MipLevels,
			this.FirstArraySlice,
			this.ArraySize);
	}
}


/**
 * Describes a 1D texture
 */
class D3D11_TEXTURE1D_DESC
{
	Width;
	MipLevels;
	ArraySize;
	Format;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture1D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {number} arraySize Number of textures in the texture array (use 1 is no array is desired)
	 * @param {any} format Texture format
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		mipLevels,
		arraySize,
		format,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.MipLevels = mipLevels;
		this.ArraySize = arraySize;
		this.Format = format;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_TEXTURE1D_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_TEXTURE1D_DESC(
			this.Width,
			this.MipLevels,
			this.ArraySize,
			this.Format,
			this.Usage,
			this.BindFlags,
			this.CPUAccessFlags,
			this.MiscFlags);
	}
}


/**
 * Describes a 2D texture
 */
class D3D11_TEXTURE2D_DESC
{
	Width;
	Height;
	MipLevels;
	ArraySize;
	Format;
	SampleDesc;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture2D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} height Texture height (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {number} arraySize Number of textures in the texture array (use 1 is no array is desired)
	 * @param {any} format Texture format
	 * @param {DXGI_SAMPLE_DESC} sampleDesc Specifies multisampling parameters for the texture
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		height,
		mipLevels,
		arraySize,
		format,
		sampleDesc,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.Height = height;
		this.MipLevels = mipLevels;
		this.ArraySize = arraySize;
		this.Format = format;
		this.SampleDesc = sampleDesc.Copy();
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_TEXTURE2D_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_TEXTURE2D_DESC(
			this.Width,
			this.Height,
			this.MipLevels,
			this.ArraySize,
			this.Format,
			this.SampleDesc.Copy(),
			this.Usage,
			this.BindFlags,
			this.CPUAccessFlags,
			this.MiscFlags);
	}
}

/**
 * Describes a 3D texture
 */
class D3D11_TEXTURE3D_DESC
{
	Width;
	Height;
	Depth;
	MipLevels;
	Format;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture3D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} height Texture height (in texels)
	 * @param {number} depth Texture depth (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {any} format Texture format
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		height,
		depth,
		mipLevels,
		format,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.Height = height;
		this.Depth = depth;
		this.MipLevels = mipLevels;
		this.Format = format;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {D3D11_TEXTURE3D_DESC} A copy of this description
	 * */
	Copy()
	{
		return new D3D11_TEXTURE3D_DESC(
			this.Width,
			this.Height,
			this.Depth,
			this.MipLevels,
			this.Format,
			this.Usage,
			this.BindFlags,
			this.CPUAccessFlags,
			this.MiscFlags);
	}
}

/**
 * Describes multi-sampling parameters for a resource
 */
class DXGI_SAMPLE_DESC
{
	Count;
	Quality;

	/**
	 * Creates a new DXGI Sample description of multi-sampling parameters
	 * @param {number} count The number of multisamples per pixel
	 * @param {number} quality The image quality level (unused in WebGL?)
	 */
	constructor(count = 1, quality = 0)
	{
		this.Count = count;
		this.Quality = quality;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {DXGI_SAMPLE_DESC} A copy of this description
	 * */
	Copy()
	{
		return new DXGI_SAMPLE_DESC(
			this.Count,
			this.Quality);
	}
}

/**
 * Simplified swap chain description, removing a majority of
 * DXGI/D3D11 parameters that aren't applicable in WebGL
 */
class DXGI_SWAP_CHAIN_DESC
{
	Width;
	Height;
	Format;

	/**
	 * Creates a new DXGI Swap Chain description
	 * 
	 * @param {Number} width The width of the back buffer
	 * @param {Number} height The height of the back buffer
	 * @param {any} format The back buffer format, either DXGI_FORMAT_R8G8B8A8_UNORM or DXGI_FORMAT_R8G8B8A8_UNORM_SRGB
	 */
	constructor(width, height, format = DXGI_FORMAT_R8G8B8A8_UNORM)
	{
		this.Width = width;
		this.Height = height;
		this.Format = format;
	}

	/**
	 * Creates a copy of this description
	 * 
	 * @returns {DXGI_SWAP_CHAIN_DESC} A copy of this description
	 * */
	Copy()
	{
		return new DXGI_SWAP_CHAIN_DESC(
			this.Width,
			this.Height,
			this.Format);
	}
}


// -----------------------------------------------------
// ------------------ Other Structures -----------------
// -----------------------------------------------------

/**
 * Defines the dimensions of a viewport
 */
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


/**
 * Defines a 2D rectangle
 */
class D3D11_RECT
{
	Left;
	Top;
	Right;
	Bottom;

	/**
	 * Creates a new 2D rectangle
	 * 
	 * @param {Number} left The x position of the left hand side of the box
	 * @param {Number} top The y position of the top of the box
	 * @param {Number} right The x position of the right hand side of the box
	 * @param {Number} bottom The y position of the bottom of the box
	 */
	constructor(left, top, right, bottom)
	{
		this.Left = left;
		this.Top = top;
		this.Right = right;
		this.Bottom = bottom;
	}
}


/**
 * Defines a 3D box
 */
class D3D11_BOX
{
	Left;
	Top;
	Front;
	Right;
	Bottom;
	Back;

	/**
	 * Creates a new 3D box.  Coordinates are interpreted as bytes for buffers
	 * and as texels for textures.
	 * 
	 * @param {Number} left The x position of the left hand side of the box
	 * @param {Number} top The y position of the top of the box
	 * @param {Number} right The x position of the right hand side of the box
	 * @param {Number} bottom The y position of the bottom of the box
	 * @param {Number} front The z position of the front of the box
	 * @param {Number} back The z position of the back of the box
	 */
	constructor(left, top, right, bottom, front = 0, back = 1)
	{
		this.Left = left;
		this.Top = top;
		this.Right = right;
		this.Bottom = bottom;
		this.Front = front;
		this.Back = back;
	}

	/**
	 * Determines if the box is empty (one or more dimensions have a size of zero)
	 */
	IsEmpty()
	{
		return
			this.Right <= this.Left ||
			this.Bottom <= this.Top ||
			this.Back <= this.Front;
	}
}


// -----------------------------------------------------
// -------------- API Object Base Classes --------------
// -----------------------------------------------------

/** 
 *  The base class for all D3D11 API objects.
 *  @abstract
 */
class IUnknown
{
	#refCount;

	/** 
	 *  Creates a new IUnknown object.  
	 *  
	 *  @throws {Error} If this class is instantiated directly.
	 */
	constructor()
	{
		// Abstract check
		if (new.target === IUnknown)
		{
			throw new Error("Cannot instantiate IUnknown objects directly.");
		}

		this.#refCount = 0;
		this.AddRef();
	}



	/**
	 * Get the current reference count of the object.  Note that this is not
	 * to spec but is necessary due to the lack of protected access in javascript.
	 * 
	 * @returns {number} The current reference count
	 */
	GetRef()
	{
		return this.#refCount;
	}

	/** 
	 *  Increments the reference count by 1
	 *  
	 *  @returns {number} The new reference count
	 */
	AddRef()
	{
		this.#refCount++;
		return this.#refCount;
	}

	/**
	 * Decrements the reference count by 1
	 * 
	 * @throws {Error} Cannot release an object with a ref count of zero
	 * @returns {number} The new reference count
	 */
	Release()
	{
		this.#refCount--;
		this.#CheckRef();

		return this.#refCount;
	}

	/**
	 * Helper for checking for an invalid ref count
	 * 
	 * @throws {Error} If the ref count is less than zero
	 */
	#CheckRef()
	{
		if (this.#refCount < 0)
			throw new Error("Object has been released and is no longer available");
	}
}

/** 
 *  Base class for objects created by an {@link ID3D11Device} object.
 *  @abstract
 */
class ID3D11DeviceChild extends IUnknown
{
	#device;

	/**
	 *  Creates a new ID3D11DeviceChild object.
	 *  
	 *  @throws {Error} If this class is instantiated directly.
	 */
	constructor(device)
	{
		super();

		// Abstract check
		if (new.target === ID3D11DeviceChild)
		{
			throw new Error("Cannot instantiate ID3D11DeviceChild objects directly.");
		}

		// Add another ref to the device, too
		this.#device = device;
		this.#device.AddRef();
	}

	/**
	 * Releases one reference.  If the ref count is now zero, this
	 * object releases its reference to the underlying device, too.
	 * 
	 * @returns {number} The new reference count
	 */
	Release()
	{
		super.Release();
		
		// If we're done, release the device
		if (this.GetRef() <= 0)
			this.#device.Release();

		return this.GetRef();
	}

	/**
	 * Gets a reference to the {@link ID3D11Device} that created
	 * this object.  Note that this adds a reference to the
	 * device that must be released by the caller.
	 * 
	 * @returns {ID3D11Device} The device that created this object.
	 */
	GetDevice()
	{
		this.#device.AddRef();
		return this.#device;
	}
}


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


// -----------------------------------------------------
// ---------------------- Device -----------------------
// -----------------------------------------------------

class ID3D11Device extends IUnknown
{
	#gl;
	#immediateContext;
	#anisoExt;
	#floatTextureExt;
	#floatTextureFilterExt;
	#readbackFramebuffer;
	#backBufferFramebuffer;

	constructor(gl)
	{
		super();

		// Abstract check
		if (new.target === ID3D11Device)
		{
			throw new Error("Cannot instantiate ID3D11Device objects directly.  Use D3D11CreateDevice() or D3D11CreateDeviceAndSwapChain() instead.");
		}

		this.#gl = gl;
		this.#immediateContext = null;

		// Will be deleted on release
		this.#readbackFramebuffer = this.#gl.createFramebuffer();
		this.#backBufferFramebuffer = this.#gl.createFramebuffer();

		// Attempt to load the anisotropic extension
		this.#anisoExt =
			this.#gl.getExtension("EXT_texture_filter_anisotropic") ||
			this.#gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
			this.#gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");

		// Attempt to load the floating point texture extension and the ability to linearly filter them
		this.#floatTextureExt = this.#gl.getExtension("EXT_color_buffer_float");
		this.#floatTextureFilterExt = this.#gl.getExtension("OES_texture_float_linear");

		// Flip textures when unpacking
		// NOTE: Does not effect ImageBitmap objects, which need to be flipped
		//       via their own options.  See here: https://registry.khronos.org/webgl/specs/latest/1.0/#PIXEL_STORAGE_PARAMETERS
		this.#gl.pixelStorei(this.#gl.UNPACK_FLIP_Y_WEBGL, false);
	}

	Release()
	{
		super.Release();

		if (this.GetRef() <= 0)
		{
			// Release our context ref
			this.#immediateContext.Release();

			// Clean up our GL resources
			this.#gl.deleteFramebuffer(this.#readbackFramebuffer);
			this.#gl.deleteFramebuffer(this.#backBufferFramebuffer);
		}
	}

	/**
	 * Gets the graphics adapter (WebGL2 Rendering Context) used by this device
	 * 
	 * @return The WebGL2 Rendering Context used by this device
	 */
	GetAdapter()
	{
		return this.#gl;
	}

	/**
	 * Gets information about the features that are supported by D3D11.js
	 * 
	 * @param {any} feature Which feature to query for support
	 * 
	 * @returns The feature details (WebGL extension usually) if available, or null otherwise
	 */
	CheckFeatureSupport(feature)
	{
		switch (feature)
		{
			case D3D11_JS_FEATURE_ANISOTROPIC_FILTER_SUPPORT: return this.#anisoExt;
			case D3D11_JS_FEATURE_FLOAT_TEXTURE_SUPPORT: return this.#floatTextureExt;
			case D3D11_JS_FEATURE_FLOAT_TEXTURE_FILTER_SUPPORT: return this.#floatTextureFilterExt;
			default: return null;
		}
	}


	// Not to spec, but I want ONE of these that both the context and the swapchain can use
	GetBackBufferFramebuffer()
	{
		return this.#backBufferFramebuffer;
	}

	/**
	 * Gets the immediate context, which is used for issuing rendering commands.
	 * Note that this method will increment the reference count of the context by
	 * one each time, so that reference should be released when you are done with it.
	 * 
	 * @returns {ID3D11DeviceContext} The rendering context
	 */
	GetImmediateContext()
	{
		if (this.#immediateContext == null)
			this.#immediateContext = new class extends ID3D11DeviceContext { }(this);
		else
			this.#immediateContext.AddRef();

		return this.#immediateContext;
	}


	// TODO: Respect buffer desc
	// TODO: Use SubresourceData struct for initial data to match d3d spec?
	// TODO: Ensure array types for initial data? 
	// TODO: Full validation of description
	CreateBuffer(bufferDesc, initialData)
	{
		// Validate description
		this.#ValidateBufferDesc(bufferDesc, initialData);

		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Create the gl buffer and final D3D buffer
		let glBuffer = this.#gl.createBuffer();

		// Determine usage flag
		// TODO: Analyze CPUAccessFlag to further refine these options
		// See "usage" at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
		let glUsage = this.#gl.STATIC_DRAW;
		switch (bufferDesc.Usage)
		{
			case D3D11_USAGE_IMMUTABLE: glUsage = this.#gl.STATIC_DRAW; break;
			case D3D11_USAGE_DYNAMIC: glUsage = this.#gl.DYNAMIC_DRAW; break;
			case D3D11_USAGE_STAGING: glUsage = this.#gl.DYNAMIC_READ; break; // ???
			case D3D11_USAGE_DEFAULT:
			default:
				glUsage = this.#gl.DYNAMIC_DRAW; // ???
				// NOTE: Constant buffers with default usage should probably still be dynamic draw
				// TODO: Test this and handle here
				break;
		}

		// TODO: Handle combinations of flags...
		// - Maybe just disallow mixing index buffers with others?

		// Determine the buffer type and store the previous buffer to restore
		let bufferType;
		let prevBuffer;
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
			this.#gl.bufferData(bufferType, bufferDesc.ByteWidth, glUsage);
		else
			this.#gl.bufferData(bufferType, initialData, glUsage); // TODO: Verify size vs. description?

		// Restore previous buffer and return new one
		this.#gl.bindBuffer(bufferType, prevBuffer);
		return new class extends ID3D11Buffer { }(this, bufferDesc, bufferType, glBuffer);
	}


	/**
	 * Creates a new depth-stencil state from a given description
	 * 
	 * @param {D3D11_DEPTH_STENCIL_DESC} depthStencilDesc The description of the new state
	 * 
	 * @throws {Error} If the description is null or it contains invalid values
	 */
	CreateDepthStencilState(depthStencilDesc)
	{
		// Description is not optional
		if (depthStencilDesc == null)
			throw new Error("Depth-Stencil description cannot be null");

		// Validate the description and create the state
		this.#ValidateDepthStencilDesc(depthStencilDesc);
		return new class extends ID3D11DepthStencilState { }(this, depthStencilDesc);
	}


	/**
	 * Creates a depth stencil view for the specified resource.  Pass in a null description
	 * to create a default DSV for this specific resource, which allows mip 0 access for
	 * the entire resource.
	 * 
	 * @param {ID3D11Resource} resource A resource derived from ID3D11Resource, such as a texture
	 * @param {D3D11_RENDER_TARGET_VIEW_DESC} desc The description of the DSV to create.  Pass in null to create a default DSV for this resource.
	 * 
	 * @returns {ID3D11DepthStencilView} A new DSV for this resource
	 * 
	 * @throws {Error} If the DSV description is invalid, or the resource cannot be bound as an DSV
	 */
	CreateDepthStencilView(resource, desc)
	{
		// Is the description null?  If so, build a default!
		if (desc == null)
		{
			// What's the resource type for the view dimension?
			let viewDim = null;
			if (resource instanceof ID3D11Texture1D)
				viewDim = D3D11_DSV_DIMENSION_TEXTURE1D;
			else if (resource instanceof ID3D11Texture2D)
				viewDim = D3D11_DSV_DIMENSION_TEXTURE2D;
			else
				throw new Error("Invalid resource type for DSV");

			let resDesc = resource.GetDesc();
			desc = new D3D11_DEPTH_STENCIL_VIEW_DESC(
				resDesc.Format,
				viewDim,
				0,
				0,
				0,
				resDesc.ArraySize);
		}

		// Validate the DSV and resource combo
		this.#ValidateDSVDesc(resource, desc);
		return new class extends ID3D11DepthStencilView { }(this, resource, desc);
	}


	// TODO: Verification of parameters?  Validate data as d3d11 does
	// TODO: Any reason to actually compare against shader?
	// NOTE: gl.MAX_VERTEX_ATTRIBS - maybe max descs?
	CreateInputLayout(inputElementDescs)
	{
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		return new class extends ID3D11InputLayout { }(this, inputElementDescs);
	}


	// Note: Not using bytecode, just a big string, so only one parameter
	CreatePixelShader(hlslCode)
	{
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Take the shader code, convert it and pass to GL functions
		let ps = new HLSL(hlslCode, ShaderTypePixel);
		let glShader = this.#CompileGLShader(ps.GetGLSL(), this.#gl.FRAGMENT_SHADER);
		return new class extends ID3D11PixelShader { }(this, glShader, ps);
	}

	/**
	 * Creates a new rasterizer state from a given description
	 * 
	 * @param {D3D11_RASTERIZER_DESC} rasterizerDesc The description of the new state
	 * 
	 * @throws {Error} If the description is null or it contains invalid values
	 */
	CreateRasterizerState(rasterizerDesc)
	{
		// Description is not optional
		if (rasterizerDesc == null)
			throw new Error("Rasterizer description cannot be null");

		// Validate the description and create the state
		this.#ValidateRasterizerDesc(rasterizerDesc);
		return new class extends ID3D11RasterizerState { }(this, rasterizerDesc);
	}

	/**
	 * Creates a render target view for the specified resource.  Pass in a null description
	 * to create a default RTV for this resource, which accesses all subresources at mip 0.
	 * 
	 * @param {ID3D11Resource} resource A resource derived from ID3D11Resource, such as a texture
	 * @param {D3D11_RENDER_TARGET_VIEW_DESC} desc The description of the RTV to create.  Pass in null to create a default RTV for this resource.
	 * 
	 * @returns {ID3D11RenderTargetView} A new RTV for this resource
	 * 
	 * @throws {Error} If the RTV description is invalid, or the resource cannot be bound as an RTV
	 */
	CreateRenderTargetView(resource, desc)
	{
		// Is the description null?  If so, build a default!
		if (desc == null)
		{
			// What's the resource type for the view dimension?
			let viewDim = null;
			if (resource instanceof ID3D11Texture1D)
				viewDim = D3D11_RTV_DIMENSION_TEXTURE1D;
			else if (resource instanceof ID3D11Texture2D)
				viewDim = D3D11_RTV_DIMENSION_TEXTURE2D;
			else if (resource instanceof ID3D11Texture3D)
				viewDim = D3D11_RTV_DIMENSION_TEXTURE3D;
			else
				throw new Error("Invalid resource type for RTV");

			let resDesc = resource.GetDesc();
			desc = new D3D11_RENDER_TARGET_VIEW_DESC(
				resDesc.Format,
				viewDim,
				0,
				0,
				resDesc.ArraySize);
		}

		// Validate the RTV and resource combo
		this.#ValidateRTVDesc(resource, desc);

		// Now that everything's valid, swap cube map +Y and -Y if necessary
		// TOOD: More testing, as this feels SUUUPER dirty
		let finalDesc = desc.Copy();
		if ((resource.GetDesc().MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE)
		{
			// Which face?
			if (finalDesc.FirstArraySlice == 2) // Positive Y
			{
				finalDesc.FirstArraySlice = 3; // +Y becomes -Y
			}
			else if (finalDesc.FirstArraySlice == 3) // Negative Y
			{
				finalDesc.FirstArraySlice = 2; // -Y becomes +Y
			}
		}

		return new class extends ID3D11RenderTargetView { }(this, resource, finalDesc);
	}


	/**
	 * Creates a new sampler state from a given description
	 * 
	 * @param {D3D11_SAMPLER_DESC} samplerDesc The description of the new sampler
	 * 
	 * @throws {Error} If the description is null or it contains invalid values
	 */
	CreateSamplerState(samplerDesc)
	{
		// Description is not optional
		if (samplerDesc == null)
			throw new Error("Sampler description cannot be null");

		// Validate description, which will throw
		// an exception if the description is invalid
		this.#ValidateSamplerDesc(samplerDesc);

		// Note: This just creates an object with a description, so
		// the pipeline shouldn't be dirty after this

		// Create a parent class around the interface
		return new class extends ID3D11SamplerState { } (this, samplerDesc);
	}

	/**
	 * Creates a shader resource view for the specified resource.  Pass in a null description
	 * to create a default SRV for this specific resource, which allows the entire resource
	 * to be viewed from a shader.
	 * 
	 * @param {ID3D11Resource} resource A resource derived from ID3D11Resource, such as a texture
	 * @param {D3D11_SHADER_RESOURCE_VIEW_DESC} desc The description of the SRV to create.  Pass in null to create a default SRV for this resource.
	 * 
	 * @returns {ID3D11ShaderResourceView} A new SRV for this resource
	 * 
	 * @throws {Error} If the SRV description is invalid, or the resource cannot be bound as an SRV
	 */
	CreateShaderResourceView(resource, desc)
	{
		// Is the description null?  If so, build a default!
		if (desc == null)
		{
			// What's the resource type for the view dimension?
			let resDesc = resource.GetDesc();
			let viewDim = null;
			if (resource instanceof ID3D11Texture1D)
			{
				// Array or not?
				viewDim = resDesc.ArraySize > 1 ? D3D11_SRV_DIMENSION_TEXTURE1DARRAY : D3D11_SRV_DIMENSION_TEXTURE1D;
			}
			else if (resource instanceof ID3D11Texture2D)
			{
				// What kind of 2D resource?
				// TODO: Test these in real D3D11 to see what we get back
				if (resDesc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE != 0 &&
					resDesc.ArraySize == 6)
				{
					viewDim = D3D11_SRV_DIMENSION_TEXTURECUBE;
				}
				else if (resDesc.ArraySize > 1)
				{
					viewDim = D3D11_SRV_DIMENSION_TEXTURE2DARRAY;
				}
				else
				{
					viewDim = D3D11_SRV_DIMENSION_TEXTURE2D;
				}
			}
			else if (resource instanceof ID3D11Texture3D)
			{
				// Only 1 option for 3D textures
				viewDim = D3D11_SRV_DIMENSION_TEXTURE3D;
			}
			else
			{
				throw new Error("Invalid resource type for SRV");
			}

			desc = new D3D11_SHADER_RESOURCE_VIEW_DESC(
				resDesc.Format,
				viewDim,
				0,
				resDesc.MipLevels,
				0,
				resDesc.ArraySize);
		}

		// Validate the SRV and resource combo
		this.#ValidateSRVDesc(resource, desc);

		return new class extends ID3D11ShaderResourceView { }(this, resource, desc);
	}


	CreateTexture1D(desc, initialData)
	{
		return this.#CreateTexture(1, desc, initialData);
	}

	CreateTexture2D(desc, initialData)
	{
		return this.#CreateTexture(2, desc, initialData);
	}

	CreateTexture3D(desc, initialData)
	{
		return this.#CreateTexture(3, desc, initialData);
	}

	/**
	 * Helper for creating a 1D, 2D or 3D texture given a description and optional data
	 * 
	 * @param {Number} dim The dimensions of the texture: 1, 2 or 3
	 * @param {any} desc Description of the texture to create. One of D3D11_TEXTURE1D_DESC, D3D11_TEXTURE2D_DESC or D3D11_TEXTURE3D_DESC
	 * @param {Array} initialData An array of one or more sets (typed arrays) of data
	 * 
	 * @returns The newly created texture
	 */
	#CreateTexture(dim, desc, initialData)
	{
		// This may change pipeline state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Validate the description/initial data combo
		this.#ValidateTextureDesc(dim, desc, initialData);

		// Create the gl texture and bind it so we can work on it
		const glTexture = this.#gl.createTexture();

		// TODO: Determine usage and how this will affect the texture (if at all)
		// - Seems like webgl just uses texImage2D() to basically "rebuild" the texture?
		// - Note: Look into "pixel buffer objects" and "pixel unpack buffers" for staging resources!
		// Skipping usage for now (see above)

		// TODO: Use the usage and/or bind flags to determine if this should
		//       be a texture or renderbuffer
		//       Texture: Can be read from later on
		//        - BIND_SHADER_RESOURCE
		//       RenderBuffer: Cannot be read from
		//        - BIND_RENDER_TARGET, BIND_DEPTH_STENCIL

		// Grab GL details
		const glFormatDetails = this.#GetFormatDetails(desc.Format);
		const internalFormat = glFormatDetails.InternalFormat;
		const format = glFormatDetails.Format;
		const type = glFormatDetails.Type;
		const isDepth = glFormatDetails.IsDepth;
		const hasStencil = glFormatDetails.HasStencil;
		const hasMipmaps = desc.MipLevels > 1;

		// Grab the texture type and bind so we can reserve the resource
		const glTextureType = this.#GetGLTextureType(dim, desc);
		this.#gl.bindTexture(glTextureType, glTexture);

		// Get the proper sizes based on dimension
		let w = 1;
		let h = 1;
		let d = 1;
		switch (dim) // Explicit fallthrough!
		{
			case 3: d = desc.Depth;
			case 2: h = desc.Height;
			case 1: w = desc.Width;
		}

		// Which kind of texture are we creating?
		//  - Using texStorage2D/3D as it initializes the entire texture
		//    and all subresources at once.
		//  - See here for details on formats/types/etc: https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexStorage2D.xhtml
		switch (glTextureType)
		{
			case this.#gl.TEXTURE_2D:
			case this.#gl.TEXTURE_CUBE_MAP:

				// TexStorage2D() is for 2D's and Cubes
				this.#gl.texStorage2D(
					glTextureType,
					desc.MipLevels,
					internalFormat,
					w,
					h);
				break;

			case this.#gl.TEXTURE_2D_ARRAY:

				// For 2D arrays and 3D's
				this.#gl.texStorage3D(
					glTextureType,
					desc.MipLevels,
					internalFormat,
					w,
					h,
					desc.ArraySize); // ArraySize desc member
				break;

			case this.#gl.TEXTURE_3D:

				// For 2D arrays and 3D's
				this.#gl.texStorage3D(
					glTextureType,
					desc.MipLevels,
					internalFormat,
					w,
					h,
					d); // Depth desc member
				break;
		}

		// Do we have any initial data?
		if (initialData != null && initialData.length > 0)
		{
			// Which type of texture and how many elements?
			switch (glTextureType)
			{
				case this.#gl.TEXTURE_2D:

					// Copy the data one mip at a time
					for (let mip = 0; mip < desc.MipLevels && mip < initialData.length; mip++)
					{
						// Skip nulls
						if (initialData[mip] == null)
							continue;

						// Calculate size of the mip
						const div = Math.pow(2, mip);
						const mipWidth = Math.max(1, Math.floor(w / div));
						const mipHeight = Math.max(1, Math.floor(h / div));

						// Save this data
						this.#gl.texSubImage2D(
							glTextureType,
							mip,
							0,
							0,
							mipWidth,
							mipHeight,
							format,
							type,
							initialData[mip]);
					}
					break;

				case this.#gl.TEXTURE_CUBE_MAP:

					const cubeFaces = [
						this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X,
						this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
						this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, // Flipped 
						this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y, // Flipped
						this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
						this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
					];

					for (let face = 0; face < 6; face++)
					{
						for (let mip = 0; mip < desc.MipLevels && mip < initialData.length / 6; mip++)
						{
							// Skip nulls
							if (initialData[mip + face * desc.MipLevels] == null)
								continue;

							// Calculate size of the mip
							const div = Math.pow(2, mip);
							const mipWidth = Math.max(1, Math.floor(w / div));
							const mipHeight = Math.max(1, Math.floor(h / div));

							// Save this data
							this.#gl.texSubImage2D(
								cubeFaces[face],
								mip,
								0,
								0,
								mipWidth,
								mipHeight,
								format,
								type,
								initialData[mip + face * desc.MipLevels]);
						}
					}
					break;

				case this.#gl.TEXTURE_2D_ARRAY:

					// Handle all mips of a single array slice at a time
					for (let arraySlice = 0; arraySlice < desc.ArraySize; arraySlice++)
					{
						for (let mip = 0; mip < desc.MipLevels && mip < initialData.length / desc.ArraySize; mip++)
						{
							// Skip nulls
							if (initialData[mip + arraySlice * desc.MipLevels] == null)
								continue;

							// Calculate size of the mip
							const div = Math.pow(2, mip);
							const mipWidth = Math.max(1, Math.floor(w / div));
							const mipHeight = Math.max(1, Math.floor(h / div));

							// Save this data
							// TODO: Test this!
							this.#gl.texSubImage3D(
								glTextureType,
								mip,
								0,		// X offset
								0,		// Y offset
								arraySlice,	// Z offset (array index here)
								mipWidth,	// X size
								mipHeight,	// Y size
								1,			// Z size (or a single slice here)
								format,
								type,
								initialData[mip + arraySlice * desc.MipLevels]);
						}
					}
					break;

				case this.#gl.TEXTURE_3D:

					// Assuming each element of the incoming data is an entire 3D mip
					for (let mip = 0; mip < desc.MipLevels && mip < initialData.length; mip++)
					{
						// Skip nulls
						if (initialData[mip] == null)
							continue;

						// Calculate size of the mip
						const div = Math.pow(2, mip);
						const mipWidth = Math.max(1, Math.floor(w / div));
						const mipHeight = Math.max(1, Math.floor(h / div));
						const mipDepth = Math.max(1, Math.floor(d / div));
						console.log(mipWidth + " " + mipHeight + " " + mipDepth);
						// Save this data
						// TODO: Test this!
						this.#gl.texSubImage3D(
							glTextureType,
							mip,
							0,	// X offset
							0,	// Y offset
							0,	// Z offset
							mipWidth,	// X size
							mipHeight,	// Y size
							mipDepth,	// Z size
							format,
							type,
							initialData[mip]);
					}
					break;
			}
		}

		// Set the default sampler state in the event
		// we don't bind a sampler when drawing
		this.#SetDefaultSamplerStateForBoundTexture(glTextureType, hasMipmaps);

		// Create and return the new object
		switch (dim)
		{
			case 1: return new class extends ID3D11Texture1D { }(this, desc, glTextureType, glTexture);
			case 2: return new class extends ID3D11Texture2D { }(this, desc, glTextureType, glTexture);
			case 3: return new class extends ID3D11Texture3D { }(this, desc, glTextureType, glTexture);
			default: throw new Error("Invalid texture dimension");
		}
	}


	// Note: Not using bytecode, just a big string, so only one parameter
	CreateVertexShader(hlslCode)
	{
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Take the shader code, convert it and pass to GL functions
		let vs = new HLSL(hlslCode, ShaderTypeVertex);
		let glShader = this.#CompileGLShader(vs.GetGLSL(), this.#gl.VERTEX_SHADER);

		return new class extends ID3D11VertexShader { }(this, glShader, vs);
	}


	/**
	 * Copies data from a single subresource of a texture or buffer into the provided
	 * destination data array.  This method causes a pipeline stall to ensure all 
	 * existing GPU work has been completed!  Note that, while actual D3D11 has very 
	 * specific restrictions on the use of this method, here it can be used on any 
	 * resource denoted as USAGE_STAGING with the CPU_ACCESS_READ flag
	 * 
	 * @param {TypedArray} dstData The array to fill with data from the subresource.  Note that it must already have enough room for the data being read.
	 * @param {ID3D11Resource} srcResource The resource from which to read
	 * @param {Number} srcSubresource The zero-based index of the specific subresource.  Use {@see D3D11CalcSubresource} to calculate.
	 * @param {D3D11_BOX} srcBox A box that defines a portion of the subresource to read, or null for the entire subresource.  An empty box results in no data being read.
	 */
	ReadFromSubresource(dstData, srcResource, srcSubresource, srcBox = null)
	{
		// WebGL:
		// - readPixels() for textures: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
		// - getBufferSubData() for buffers: https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/getBufferSubData
		//
		// D3D11:
		// - Match ReadFromSubresource(): https://learn.microsoft.com/en-us/windows/win32/api/d3d11_3/nf-d3d11_3-id3d11device3-readfromsubresource
		// - D3D11_BOX: https://learn.microsoft.com/en-us/windows/win32/api/d3d11/ns-d3d11-d3d11_box
		// - CalcSubresource: https://learn.microsoft.com/en-us/windows/win32/api/d3d11/nf-d3d11-d3d11calcsubresource

		// Is the box empty?  If so, nothing to do.
		if (srcBox != null && srcBox.IsEmpty())
			return;

		// Determine the type of resource we're dealing with
		if (srcResource instanceof ID3D11Texture2D) // readPixels()
		{
			let desc = srcResource.GetDesc();

			// Validate resource details
			if (desc.Usage != D3D11_USAGE_STAGING)
				throw new Error("Invalid usage on resource - can only read from staging resources");
			
			if ((desc.CPUAccessFlags & D3D11_CPU_ACCESS_READ) == 0)
				throw new Error("Invalid CPU Access flag on resource - must be set for reading");

			// Validate the subresource index
			let maxSubresource = D3D11CalcSubresource(
				desc.MipLevels - 1,
				desc.ArraySize - 1,
				desc.MipLevels);
			if (srcSubresource < 0 || srcSubresource > maxSubresource)
				throw new Error("Invalid subresource index for reading");

			// Calculate subresource details from index
			let arraySlice = Math.floor(srcSubresource / desc.MipLevels);
			let mipSlice = srcSubresource - (arraySlice * desc.MipLevels);

			// Calculate size of the mip
			let div = Math.pow(2, mipSlice);
			let mipWidth = Math.max(1, Math.floor(desc.Width / div));
			let mipHeight = Math.max(1, Math.floor(desc.Height / div));

			// Actual offsets
			let x = 0;
			let y = 0;
			let width = mipWidth;
			let height = mipHeight;
			if (srcBox != null)
			{
				x = srcBox.Left;
				y = mipHeight - srcBox.Bottom; // Flip the Y
				width = srcBox.Right - srcBox.Left;
				height = srcBox.Bottom - srcBox.Top;
			}

			// Mark the overall pipeline as dirty, since we need to
			// make some changes to the framebuffer
			// TODO: Determine if this is necessary, since we're only changing
			//       the READ framebuffer and not the whole thing
			// TODO: Optimize this to only mark Output Merger dirty?
			this.#immediateContext.DirtyPipeline();

			// Bind the readback framebuffer
			this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#readbackFramebuffer);

			// If this is a texture array (and not a cube map), we
			// need to use a different function for binding
			let isCubemap = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);
			let isArray = desc.ArraySize > 1;

			// Which function?
			if (!isArray || isCubemap)
			{
				// Which GL texture target?
				let target = this.#gl.TEXTURE_2D;
				if (isCubemap)
				{
					switch (arraySlice)
					{
						case 0: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
						case 1: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
						case 2: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break; // FLIP Y!
						case 3: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break; // FLIP Y!
						case 4: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
						case 5: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
						default: throw new Error("Invalid subresource for cube map reading");
					}
				}

				// Bind for reading
				this.#gl.framebufferTexture2D(
					this.#gl.READ_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					target,
					srcResource.GetGLResource(),
					mipSlice);
			}
			else
			{
				// Is an array and NOT a cube map, so we
				// need to use the specific function that
				// allows us to specify the array slice
				this.#gl.framebufferTextureLayer(
					this.#gl.READ_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					srcResource.GetGLResource(),
					mipSlice,
					arraySlice);
			}

			// Determine the format and types for GL
			let formatDetails = this.#GetFormatDetails(desc.Format);

			// Perform the read (which should stall the pipeline to
			// complete all work automatically?  Or do we flush?)
			this.#gl.readPixels(
				x,
				y,
				width,
				height,
				formatDetails.Format,
				formatDetails.Type,
				dstData);
		}
		else if (srcResource instanceof ID3D11Buffer)
		{
			// Buffer, which uses getBufferSubData()
			throw new Error("Reading from a buffer is not yet implemented!");

		}
		else 
		{
			throw new Error("Given source resource is invalid or not yet implemented!");
		}
	}


	#CompileGLShader(glslCode, glShaderType)
	{
		// Make the shader and attempt to compile
		let shader = this.#gl.createShader(glShaderType);
		this.#gl.shaderSource(shader, glslCode);
		this.#gl.compileShader(shader);

		// Capture any errors and throw
		let success = this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS);
		if (!success)
		{
			throw new Error("Error compiling shader: " + this.#gl.getShaderInfoLog(shader));
		}

		return shader;
	}

	/**
	 * Returns a GL Texture type enum value for the given description
	 * 
	 * @param {Number} dim The dimensions of the texture: 1, 2 or 3
	 * @param {any} desc A texture description
	 * 
	 * @returns {GLenum} The WebGL texture type enum value
	 * 
	 * @throws {Error} If the given description does not match any texture types
	 */
	#GetGLTextureType(dim, desc)
	{
		let glType;

		// Grab necessary data
		const isArray = desc.ArraySize > 1;
		const isCube = (desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE;
		
		// Easy ones
		if (dim == 3) return this.#gl.TEXTURE_3D;
		if (dim == 2 && isCube) return this.#gl.TEXTURE_CUBE_MAP;

		// Both 1D and 2D are just 2D textures under the hood
		if ((dim == 1 || dim == 2) && !isCube)
		{
			return isArray ? this.#gl.TEXTURE_2D_ARRAY : this.#gl.TEXTURE_2D;
		}

		throw new Error("Description does not match any known WebGL texture types");
	}

	// Gets the GL format details based on a DXGI Format
	// See table here: https://registry.khronos.org/OpenGL/specs/es/3.0/es_spec_3.0.pdf#page=124
	#GetFormatDetails(dxgiFormat)
	{
		let glFormatDetails = {
			Type: null,
			Format: null,
			InternalFormat: null,
			IsDepth: false,
			HasStencil: false
		};

		switch (dxgiFormat)
		{
			// --- DEPTH/Stencil ------------------------
			case DXGI_FORMAT_D16_UNORM:
				glFormatDetails.Type = this.#gl.UNSIGNED_SHORT;
				glFormatDetails.Format = this.#gl.DEPTH_COMPONENT;
				glFormatDetails.InternalFormat = this.#gl.DEPTH_COMPONENT16;
				glFormatDetails.IsDepth = true;
				glFormatDetails.HasStencil = false;
				break;

			case DXGI_FORMAT_D24_UNORM_S8_UINT:
				glFormatDetails.Type = this.#gl.UNSIGNED_INT_24_8;
				glFormatDetails.Format = this.#gl.DEPTH_STENCIL;
				glFormatDetails.InternalFormat = this.#gl.DEPTH24_STENCIL8;
				glFormatDetails.IsDepth = true;
				glFormatDetails.HasStencil = true;
				break;

			case DXGI_FORMAT_D32_FLOAT:
				glFormatDetails.Type = this.#gl.FLOAT;
				glFormatDetails.Format = this.#gl.DEPTH_COMPONENT;
				glFormatDetails.InternalFormat = this.#gl.DEPTH_COMPONENT32F;
				glFormatDetails.IsDepth = true;
				glFormatDetails.HasStencil = false;
				break;

			// --- COLOR ---------------------------
			case DXGI_FORMAT_R8G8B8A8_UNORM:
				glFormatDetails.Type = this.#gl.UNSIGNED_BYTE;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.RGBA8;
				break;

			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
				glFormatDetails.Type = this.#gl.UNSIGNED_BYTE;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.SRGB8_ALPHA8;
				break;

			case DXGI_FORMAT_R16G16_FLOAT:
				glFormatDetails.Type = this.#gl.FLOAT;
				glFormatDetails.Format = this.#gl.RG;
				glFormatDetails.InternalFormat = this.#gl.RG16F;
				break;

			case DXGI_FORMAT_R16G16B16A16_FLOAT:
				glFormatDetails.Type = this.#gl.FLOAT;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.RGBA16F;

			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				glFormatDetails.Type = this.#gl.FLOAT;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.RGBA32F;
				break;

			default:
				throw new Error("Format specified is not implemented yet!");
		}

		return glFormatDetails;
	}

	/**
	 * Sets the default sampler state for texture bound at the specified texture type.
	 * State details related to mip levels will be handled by the view.
	 * Note: WebGL does not support border colors
	 * TODO: MipLODBias?  Is that a thing in WebGL?  Maybe adjust min/max mip levels by this as a work around?  Not ideal
	 * 
	 * @param {GLenum} textureType Type of GL texture for sampler defaults
	 * @param {bool} hasMipmaps Whether or not the texture has mip maps (which changes the min filter mode)
	 */
	#SetDefaultSamplerStateForBoundTexture(textureType, hasMipmaps)
	{
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_MAG_FILTER, this.#gl.LINEAR);
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_MIN_FILTER, hasMipmaps ? this.#gl.LINEAR_MIPMAP_LINEAR : this.#gl.LINEAR); // Can't use the mipmap one if no mipmaps!  Results in black texture sample
							   
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_WRAP_S, this.#gl.CLAMP_TO_EDGE);
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_WRAP_T, this.#gl.CLAMP_TO_EDGE);
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_WRAP_R, this.#gl.CLAMP_TO_EDGE);
							   
		this.#gl.texParameterf(textureType, this.#gl.TEXTURE_MIN_LOD, -D3D11_FLOAT32_MAX);
		this.#gl.texParameterf(textureType, this.#gl.TEXTURE_MAX_LOD, D3D11_FLOAT32_MAX);
							   
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_COMPARE_MODE, this.#gl.NONE);
		this.#gl.texParameteri(textureType, this.#gl.TEXTURE_COMPARE_FUNC, this.#gl.NEVER);

		if (this.#anisoExt != null)
		{
			this.#gl.texParameterf(textureType, this.#anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, 1);
		}
	}


	#ValidateBufferDesc(desc, initialData)
	{
		let isVB = ((desc.BindFlags & D3D11_BIND_VERTEX_BUFFER) == D3D11_BIND_VERTEX_BUFFER);
		let isIB = ((desc.BindFlags & D3D11_BIND_INDEX_BUFFER) == D3D11_BIND_INDEX_BUFFER);
		let isCB = ((desc.BindFlags & D3D11_BIND_CONSTANT_BUFFER) == D3D11_BIND_CONSTANT_BUFFER);
		let isSR = ((desc.BindFlags & D3D11_BIND_SHADER_RESOURCE) == D3D11_BIND_SHADER_RESOURCE);
		//let isSO = ((desc.BindFlags & D3D11_BIND_STREAM_OUTPUT) == D3D11_BIND_STREAM_OUTPUT);
		let isRT = ((desc.BindFlags & D3D11_BIND_RENDER_TARGET) == D3D11_BIND_RENDER_TARGET);
		let isDS = ((desc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == D3D11_BIND_DEPTH_STENCIL);
		
		// Byte width
		if (desc.ByteWidth <= 0)
			throw new Error("Invalid byte width for buffer description.  Must be greater than zero.");
		else if (isCB && desc.ByteWidth % 16 != 0)
			throw new Error("Invalid byte width for buffer description.  Constant buffer byte width must be a multiple of 16");

		// Validate usage
		this.#ValidateUsage(desc, initialData);

		// Bind flags
		// Note: D3D spec says constant buffer cannot be combined with other flags
		// Note: WebGL needs to treat index buffers differently, so we've got to isolate that flag, too
		if (!isVB && !isIB && !isCB && !isSR && !isRT && !isDS) // !isSO 
			throw new Error("Invalid bind flag for buffer description.");
		else if (isCB && (desc.BindFlags != D3D11_BIND_CONSTANT_BUFFER))
			throw new Error("Constant Buffer bind flag cannot be combined with any other flags.");
		else if (isIB && (desc.BindFlags != D3D11_BIND_INDEX_BUFFER))
			throw new Error("Index Buffer bind flag cannot be combined with any other flags.");

		// CPU Access
		if (desc.CPUAccessFlags != 0 &&
			desc.CPUAccessFlags != D3D11_CPU_ACCESS_READ &&
			desc.CPUAccessFlags != D3D11_CPU_ACCESS_WRITE)
			throw new Error("Invalid CPU Access Flags for buffer description.");

		// Read access is with staging usage only
		if (desc.CPUAccessFlags == D3D11_CPU_ACCESS_READ &&
			desc.Usage != D3D11_USAGE_STAGING)
			throw new Error("Invalid CPU Access in buffer description.  CPU Access Read can only be used with Staging usage.");

		// Write access only works with dynamic and staging
		if (desc.CPUAccessFlags == D3D11_CPU_ACCESS_WRITE &&
			(desc.Usage == D3D11_USAGE_DEFAULT || desc.Usage == D3D11_USAGE_IMMUTABLE))
			throw new Error("Invalid CPU Access in buffer description.  CPU Access Write can only be used with Dynamic or Staging usage.");

		// Misc Flags
		// NOTE: None of these are relevant here
		if (desc.MiscFlags != 0)
			throw new Error("Invalid Misc Flags for buffer description.");

		// Structure byte stride
		// NOTE: No structured buffers in WebGL :(
		if (desc.StructureByteStride != 0)
			throw new Error("Invalid Structured Byte Stride for buffer description.");
	}

	#ValidateDepthStencilDesc(desc)
	{
		// Depth enable is a bool - nothing to really check

		// Depth write mask
		if (desc.DepthWriteMask != D3D11_DEPTH_WRITE_MASK_ALL &&
			desc.DepthWriteMask != D3D11_DEPTH_WRITE_MASK_ZERO)
			throw new Error("Invalid Depth Write Mask for depth stencil description");

		// Depth function
		if (desc.DepthFunc < D3D11_COMPARISON_NEVER ||
			desc.DepthFunc > D3D11_COMPARISON_ALWAYS)
			throw new Error("Invalid Depth Function for depth stencil description");

		// Stencil
		// TODO: Implement stencil stuff!
		if (desc.StencilEnable)
			throw new Error("Stencil support not yet implemented!");

		// TODO: Check all the stencil stuff, too!
	}


	#ValidateDSVDesc(resource, dsvDesc)
	{
		// Resource is not optional
		if (resource == null)
			throw new Error("Resource cannot be null when creating a DSV");

		// Resource must have proper bind flag
		let resDesc = resource.GetDesc();
		if ((resDesc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == 0)
			throw new Error("Cannot create DSV: resource is not marked for depth/stencil binding");

		// Check for unknown format first, which means we match the resource's format
		// Otherwise verify they match exactly
		// TODO: Are there any "compatible" formats here?
		if (dsvDesc.Format == DXGI_FORMAT_UNKNOWN)
			dsvDesc.Format = resDesc.Format;
		else if (dsvDesc.Format != resDesc.Format)
			throw new Error("Specified DSV Format does not match resource");

		// Format
		// - DSV w/ unknown format uses the format of the resource (handled above)
		// - Must be one of D16_UNORM, D24_UNORM_S8_UINT, D32_FLOAT or D32_FLOAT_S8X24_UINT (not available in WebGL, I think)
		switch (dsvDesc.Format)
		{
			// Check for valid formats
			case DXGI_FORMAT_D16_UNORM:
			case DXGI_FORMAT_D32_FLOAT:
			case DXGI_FORMAT_D24_UNORM_S8_UINT:
				break;

			default:
				throw new Error("Specified DSV Format is invalid or not yet implemented!");
		}

		// View dimension
		// - Must match that of the resource type
		// - TODO: Check how to handle arrays vs. single elements
		switch (dsvDesc.ViewDimension)
		{
			case D3D11_DSV_DIMENSION_TEXTURE2D:
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Specified DSV View Dimension does not match resource");
				break;

			case D3D11_DSV_DIMENSION_TEXTURE1D:
				if (!(resource instanceof ID3D11Texture1D))
					throw new Error("Specified DSV View Dimension does not match resource");
				break;

			case D3D11_DSV_DIMENSION_TEXTURE1DARRAY:
			case D3D11_DSV_DIMENSION_TEXTURE2DARRAY:
				throw new Error("Specified DSV View Dimension is not yet implemented!");

			default:
				throw new Error("Specified DSV View Dimension is invalid");
		}

		// Flags
		switch (dsvDesc.Flags)
		{
			case 0: // Probably the only one we'll end up supporting
				break;

			case D3D11_DSV_READ_ONLY_DEPTH:
			case D3D11_DSV_READ_ONLY_STENCIL:
				throw new Error("Specified DSV Flags not yet implemented!");
				break;

			default:
				throw new Error("Specified DSV Flags are invalid");
		}

		// Mip slice
		// - Must actually exist in resource
		if (dsvDesc.MipSlice < 0 ||
			dsvDesc.MipSlice >= resDesc.MipLevels)
			throw new Error("Specified DSV Mip Slice is invalid");

		// First array slice (or first 2d array face for tex cube arrays)
		// - Must actually exist in resource
		if (dsvDesc.FirstArraySlice < 0 ||
			dsvDesc.FirstArraySlice >= resDesc.ArraySize)
			throw new Error("Specified DSV First Array Slice is invalid");

		// Array size (or num cubes for tex cube arrays)
		// - FirstSlice + ArraySize < total array elements
		// - TODO: Verify this check matters
		let lastSlice = dsvDesc.FirstArraySlice + dsvDesc.ArraySize - 1;
		if (dsvDesc.ArraySize == 0 ||
			lastSlice < 0 ||
			lastSlice >= resDesc.ArraySize)
			throw new Error("Specified DSV Array Size is invalid");
	}

	#ValidateRasterizerDesc(desc)
	{
		// Fill mode
		switch (desc.FillMode)
		{
			case D3D11_FILL_SOLID: break; // Fine

			case D3D11_FILL_WIREFRAME:
				throw new Error("Wireframe fill mode not yet implemented!");

			default:
				throw new Error("Invalid Fill Mode for rasterizer description");
		}

		// Cull mode
		if (desc.CullMode != D3D11_CULL_NONE &&
			desc.CullMode != D3D11_CULL_FRONT &&
			desc.CullMode != D3D11_CULL_BACK)
			throw new Error("Invalid Cull Mode for rasterizer description");

		// Depth bias clamp - unsupported in webgl :(
		if (desc.DepthBiasClamp != 0)
			throw new Error("Depth Bias Clamp unsupported in WebGL");

		// Depth clip enable - unsupported in webgl :(
		if (!desc.DepthClipEnable)
			throw new Error("Disabling Depth Clip unsupported in WebGL");

		// No multisampling/AA (yet?)
		if (desc.MultisampleEnable)
			throw new Error("Multisampling not yet implemented");

		if (desc.AntiasliasedLineEnable)
			throw new Error("Antialiased Lines not yet implemented");

		// Front count clockwise - either true or false are fine
		// Depth bias - any number
		// Slope scale depth bias - any number
		// Scissor enable - true or false
		
	}

	#ValidateSamplerDesc(desc)
	{
		// Check filter mode
		const filter = desc.Filter;
		if (filter < 0 || filter > D3D11_FILTER_COMPARISON_ANISOTROPIC ||
			(filter & 2) == 2 || // The 2 bit should be unused
			(filter & 8) == 8 || // The 8 bit should be unused
			(filter & 32) == 32) // The 32 bit should be unused
		{
			// Invalid range, or an invalid bit is set
			throw new Error("Invalid filter mode for sampler state");
		}

		// Check address modes
		const u = desc.AddressU;
		const v = desc.AddressV;
		const w = desc.AddressW;
		if (u < D3D11_TEXTURE_ADDRESS_WRAP || u > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address U mode for sampler state");
		if (v < D3D11_TEXTURE_ADDRESS_WRAP || v > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address V mode for sampler state");
		if (w < D3D11_TEXTURE_ADDRESS_WRAP || w > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address W mode for sampler state");

		// Check for unsupported address modes
		const bord = D3D11_TEXTURE_ADDRESS_BORDER;
		const mo = D3D11_TEXTURE_ADDRESS_MIRROR_ONCE;
		if (u == bord || v == bord || w == bord) // Vhere is my bord?!
			throw new Error("Border address mode unsupported in WebGL");
		if (u == mo || v == mo || w == mo)
			throw new Error("MirrorOnce address mode unsupported in WebGL");

		// Max anisotropy should be between 1 and 16
		const anisoOn = ((filter & 64) == 64); // 64's bit is aniso on/off
		if (this.#anisoExt && anisoOn)
		{
			// Is available and this sampler wants anisotropic, so validate maxAniso range
			const maxAni = this.#gl.getParameter(this.#anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
			if (desc.MaxAnisotropy < 1 || desc.MaxAnisotropy > maxAni)
				throw new Error(`Invalid MaxAnisotropy value for sampler state - range is [${1}, ${maxAni}]`);
		}
		else if(anisoOn)
		{
			// No anisotropic at all, so that filter mode is invalid
			throw new Error("Anisotropic filtering not available on this device");
		}

		// Check comparison, but only if filter requires it
		const comp = desc.ComparisonFunc;
		if ((filter & 128) == 128 &&
			(comp < D3D11_COMPARISON_NEVER || comp > D3D11_COMPARISON_ALWAYS))
			throw new Error("Invalid comparison function for sampler state");

		// Verify border color elements, but only if address mode requires it
		const border = desc.BorderColor;
		if ((u == D3D11_TEXTURE_ADDRESS_BORDER ||
			v == D3D11_TEXTURE_ADDRESS_BORDER ||
			w == D3D11_TEXTURE_ADDRESS_BORDER) &&
			border[0] < 0 || border[0] > 1 ||
			border[1] < 0 || border[1] > 1 ||
			border[2] < 0 || border[2] > 1 ||
			border[3] < 0 || border[3] > 1)
		{
			throw new Error("Invalid border color for sampler state");
		}
	}


	/**
	 * Validates an RTV description and ensures it matches
	 * with the specified resource.
	 * 
	 * @param {ID3D11Resource} resource - The resource for the RTV
	 * @param {D3D11_RENDER_TARGET_VIEW_DESC} rtvDesc - Description of the RTV
	 * 
	 * @throws {Error} If any part of the RTV is invalid
	 */
	#ValidateRTVDesc(resource, rtvDesc)
	{
		// Resource is not optional
		if (resource == null)
			throw new Error("Resource cannot be null when creating an RTV");

		// Resource must have proper bind flag
		let resDesc = resource.GetDesc();
		if ((resDesc.BindFlags & D3D11_BIND_RENDER_TARGET) == 0)
			throw new Error("Cannot create RTV: resource is not marked for render target binding");

		// Check for unknown format first, which means we match the resource's format
		// Otherwise verify they match exactly
		// TODO: Are there any "compatible" formats here?
		if (rtvDesc.Format == DXGI_FORMAT_UNKNOWN)
			rtvDesc.Format = resDesc.Format;
		else if (rtvDesc.Format != resDesc.Format)
			throw new Error("Specified RTV Format does not match resource");

		// Format
		// - RTV w/ unknown format uses the format of the resource (handled above)
		// - Cannot be typeless (which we're not supporting anyway)
		// - Cannot be R32G32B32 if the view is bindable as vertex, index, constant or stream-out
		switch (rtvDesc.Format)
		{
			// Basic color format is fine
			case DXGI_FORMAT_R8G8B8A8_UNORM:
			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
			case DXGI_FORMAT_R16G16_FLOAT:
			case DXGI_FORMAT_R16G16B16A16_FLOAT:
			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				break;

			default:
				throw new Error("Specified RTV Format is invalid or not yet implemented!");
		}

		// View dimension
		// - Must match that of the resource type
		// - TODO: Check how to handle arrays vs. single elements
		switch (rtvDesc.ViewDimension)
		{
			case D3D11_RTV_DIMENSION_TEXTURE2D:
			case D3D11_RTV_DIMENSION_TEXTURE2DARRAY:
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Specified RTV View Dimension does not match resource");
				break;

			case D3D11_RTV_DIMENSION_TEXTURE1D:
			case D3D11_RTV_DIMENSION_TEXTURE1DARRAY:
				if (!(resource instanceof ID3D11Texture1D))
					throw new Error("Specified RTV View Dimension does not match resource");
				break;

			case D3D11_RTV_DIMENSION_TEXTURE3D:
				if (!(resource instanceof ID3D11Texture3D))
					throw new Error("Specified RTV View Dimension does not match resource");
				break;

			default:
				throw new Error("Specified RTV View Dimension is invalid");
		}

		// Mip slice
		// - Must actually exist in resource
		if (rtvDesc.MipSlice < 0 ||
			rtvDesc.MipSlice >= resDesc.MipLevels)
			throw new Error("Specified RTV Mip Slice is invalid");

		// First array slice (or first 2d array face for tex cube arrays)
		// - Must actually exist in resource
		if (rtvDesc.FirstArraySlice < 0 ||
			rtvDesc.FirstArraySlice >= resDesc.ArraySize)
			throw new Error("Specified RTV First Array Slice is invalid");

		// Array size (or num cubes for tex cube arrays)
		// - FirstSlice + ArraySize < total array elements
		// - TODO: Verify this check matters
		let lastSlice = rtvDesc.FirstArraySlice + rtvDesc.ArraySize - 1;
		if (rtvDesc.ArraySize == 0 ||
			lastSlice < 0 ||
			lastSlice >= resDesc.ArraySize)
			throw new Error("Specified RTV Array Size is invalid");

		// TODO: Handle 3D texture FirstWSlice param
	}


	/**
	 * Validates an SRV description and ensures it matches
	 * with the specified resource.
	 * 
	 * @param {ID3D11Resource} resource - The resource for the SRV
	 * @param {D3D11_SHADER_RESOURCE_VIEW_DESC} srvDesc - Description of the SRV
	 * 
	 * @throws {Error} If any part of the SRV is invalid, or the resource is not marked for SRV binding
	 */
	#ValidateSRVDesc(resource, srvDesc)
	{
		// Resource is not optional
		if (resource == null)
			throw new Error("Resource cannot be null when creating an SRV");

		// Resource must have proper bind flag
		let resDesc = resource.GetDesc();
		if ((resDesc.BindFlags & D3D11_BIND_SHADER_RESOURCE) == 0)
			throw new Error("Cannot create SRV: resource is not marked for shader resource binding");

		// Format
		// - Cannot be typeless (which we're not supporting anyway)
		// - CAN view a typeless resource, as long as types are compatible
		//   - MUST have D3D11_RESOURCE_MISC_BUFFER_ALLOW_RAW_VIEWS flag on resource
		switch (srvDesc.Format)
		{
			case DXGI_FORMAT_R8G8B8A8_UNORM:
			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
			case DXGI_FORMAT_R16G16_FLOAT:
			case DXGI_FORMAT_R16G16B16A16_FLOAT:
			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				break;

			default:
				throw new Error("Specified SRV Format is invalid or not yet implemented!");
		}

		// Format must match resource (or be "compatible")
		// TODO: Determine "compatibility" - mostly for typeless, right?  And we're not using those?
		if (srvDesc.Format != resDesc.Format)
			throw new Error("Specified SRV Format does not match resource");

		// View dimension
		// - Must match that of the resource type
		// - TODO: Check array vs. non-array? (SRV to a single element of an array, etc.)
		switch (srvDesc.ViewDimension)
		{
			case D3D11_SRV_DIMENSION_TEXTURE2D:
			case D3D11_SRV_DIMENSION_TEXTURE2DARRAY:
			case D3D11_SRV_DIMENSION_TEXTURECUBE:
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Specified SRV View Dimension does not match resource");
				break;

			case D3D11_SRV_DIMENSION_TEXTURE1D:
			case D3D11_SRV_DIMENSION_TEXTURE1DARRAY:
				if (!(resource instanceof ID3D11Texture1D))
					throw new Error("Specified SRV View Dimension does not match resource");
				break;

			case D3D11_SRV_DIMENSION_TEXTURE3D:
				if (!(resource instanceof ID3D11Texture3D))
					throw new Error("Specified SRV View Dimension does not match resource");
				break;

			default:
				throw new Error("Specified SRV View Dimension is invalid");
		}

		// Most detailed mip
		// - Must actually exist in resource
		if (srvDesc.MostDetailedMip < 0 ||
			srvDesc.MostDetailedMip >= resDesc.MipLevels)
			throw new Error("Specified SRV Most Detailed Mip is invalid");

		// Mip levels
		// - MostDetailed + Levels < total in resource
		// - TODO: Verify this check matters!
		let leastDetailedMip = srvDesc.MostDetailedMip + srvDesc.MipLevels - 1;
		if (srvDesc.MipLevels == 0 ||
			leastDetailedMip < 0 ||
			leastDetailedMip >= resDesc.MipLevels)
			throw new Error("Specified SRV Mip Levels value is invalid");

		// First array slice (or first 2d array face for tex cube arrays)
		// - Must actually exist in resource
		if (srvDesc.FirstArraySlice < 0 ||
			srvDesc.FirstArraySlice >= resDesc.ArraySize)
			throw new Error("Specified SRV First Array Slice is invalid");
		
		// Array size (or num cubes for tex cube arrays)
		// - FirstSlice + ArraySize < total array elements
		// - TODO: Verify this check matters
		let lastSlice = srvDesc.FirstArraySlice + srvDesc.ArraySize - 1;
		if (srvDesc.ArraySize == 0 ||
			lastSlice < 0 ||
			lastSlice >= resDesc.ArraySize)
			throw new Error("Specified SRV Array Size is invalid");
	}


	/**
	 * Validates the description for a texture
	 * 
	 * @param {Number} dim The dimensions of the texture: 1, 2 or 3
	 * @param {any} desc The description of the texture
	 * @param {any} initialData The initial data, or null
	 * 
	 * @throws {Error} If any part of the description is invalid
	 */
	#ValidateTextureDesc(dim, desc, initialData)
	{
		// Description cannot be null
		if (desc == null)
			throw new Error("Description cannot be null when creating a texture");

		// Validate dimension
		if (dim < 1 || dim > 3)
			throw new Error("Invalid texture dimension");

		// Get system maximums
		const max2DSize = this.#gl.getParameter(this.#gl.MAX_TEXTURE_SIZE);
		const max3DSize = this.#gl.getParameter(this.#gl.MAX_3D_TEXTURE_SIZE);
		const maxCubeSize = this.#gl.getParameter(this.#gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		const maxArraySize = this.#gl.getParameter(this.#gl.MAX_ARRAY_TEXTURE_LAYERS);

		// Details on the texture
		const isCube = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);
		const genMips = ((desc.MiscFlags & D3D11_RESOURCE_MISC_GENERATE_MIPS) == D3D11_RESOURCE_MISC_GENERATE_MIPS);

		// Cubes must be 2D
		if (isCube && dim != 2)
			throw new Error("Only 2D textures may be used as cube maps");

		// Validate size, for both cubes and non-cubes
		if (isCube)
		{
			if (desc.Width <= 0 || desc.Width > maxCubeSize ||
				desc.Height <= 0 || desc.Height > maxCubeSize)
				throw new Error(`Texture Cube dimensions must be between 1 and ${maxCubeSize}, inclusive`);
		}
		else 
		{
			// Which size is the actual limit for this resource?
			let maxSize = dim == 3 ? max3DSize : max2DSize;

			// Allowing explicit fallthrough to handle different dimensions!
			switch (dim)
			{
				case 3: // Check all three dimensions
					if (desc.Depth <= 0 || desc.Height > maxSize)
						throw new Error(`Texture depth must be between 1 and ${maxSize}, inclusive`);

				case 2: // Just height & width
					if (desc.Height <= 0 || desc.Height > maxSize)
						throw new Error(`Texture height must be between 1 and ${maxSize}, inclusive`);

				case 1: // Just width
					if (desc.Width <= 0 || desc.Width > maxSize)
						throw new Error(`Texture width must be between 1 and ${maxSize}, inclusive`);
			}
		}

		// No arrays for 3D textures.  This combo shouldn't be possible, but it's javascript so double checking!
		if (dim == 3 && Object.hasOwn(desc, "ArraySize"))
			throw new Error("3D textures cannot have an array size");

		// Validate cube array size
		if (isCube && desc.ArraySize != 6)
			throw new Error("Invalid array size for texture cube - must be exactly 6");

		// Validate array size
		if (desc.ArraySize <= 0 || desc.ArraySize > maxArraySize)
			throw new Error(`Array size must be greater than zero and less than or equal to ${maxArraySize}`);

		// Determine how many mip levels we'll need (0 in the desc means 'full mip chain')
		const maxMips = Math.log2(Math.max(desc.Width, desc.Height)) + 1;
		if (desc.MipLevels == 0)
			desc.MipLevels = maxMips; // Update description!

		// Validate overall mip levels
		if (desc.MipLevels <= 0 || desc.MipLevels > maxMips)
			throw new Error("Invalid mip levels specified for texture");

		// Validate format
		switch (desc.Format)
		{
			// Depth buffers
			case DXGI_FORMAT_D16_UNORM:
			case DXGI_FORMAT_D32_FLOAT:
			case DXGI_FORMAT_D24_UNORM_S8_UINT:
				break;

			// Non-float color buffers
			case DXGI_FORMAT_R8G8B8A8_UNORM:
			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
				break;

			// Float color buffers
			case DXGI_FORMAT_R16G16_FLOAT:
			case DXGI_FORMAT_R16G16B16A16_FLOAT:
			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				if (this.#floatTextureExt == null)
					throw new Error("Floating point texture formats are unsupported on your device");
				break;

			default:
				throw new Error("Specified texture format is invalid or not yet implemented!");
		}

		// Validate usage
		this.#ValidateUsage(desc, initialData);

		// TODO: Verify these bind flag combinations are fine (SRV + Depth in WebGL?)
		switch (desc.BindFlags)
		{
			// These are fine for textures
			case 0: // Mostly for staging resources
			case D3D11_BIND_SHADER_RESOURCE:
			case D3D11_BIND_RENDER_TARGET:
			case D3D11_BIND_DEPTH_STENCIL:
			case D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_RENDER_TARGET:
			case D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_DEPTH_STENCIL:
				break;

			// No other combinations (mostly a WebGL limitation)
			default:
				throw new Error("Invalid bind flags specified");
		}
		
		// Note: this matches spec but is not strictly necessary for WebGL
		if (genMips && (
			(desc.BindFlags & D3D11_BIND_SHADER_RESOURCE) == 0 ||
			(desc.BindFlags & D3D11_BIND_RENDER_TARGET) == 0))
			throw new Error("Resource must have SHADER_RESOURCE and RENDER_TARGET bind flags to generate mip maps");
	}


	/**
	 * Validates the usage portion of a resource description
	 * 
	 * @param {any} desc The resource description to validate
	 * @param {any} initialData The initial data for the resource, which may be null
	 * 
	 * @throws {Error} If the usage doesn't match the rest of the description
	 */
	#ValidateUsage(desc, initialData)
	{
		switch (desc.Usage)
		{
			case D3D11_USAGE_DEFAULT:
				// Can be either input or output (or no bind flags).  
				// Any CPU Access technically works (tested in C++)
				// TOOD: Determine if there are any other specific requirements?
				break;

			case D3D11_USAGE_DYNAMIC:
				// Can ONLY be input to a shader stage
				if ((desc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == D3D11_BIND_DEPTH_STENCIL ||
					(desc.BindFlags & D3D11_BIND_RENDER_TARGET) == D3D11_BIND_RENDER_TARGET)
					throw new Error("Dynamic resources cannot be bound for output");

				// Must have at least one bind flag
				if (desc.BindFlags == 0)
					throw new Error("Dynamic resources must have at least one Bind Flag");

				// MUST have CPU Access Write set
				if (desc.CPUAccessFlags != D3D11_CPU_ACCESS_WRITE)
					throw new Error("Dynamic resources must have CPU Access Write");

				// If we're not a buffer description, check for subresources
				if (!(desc instanceof D3D11_BUFFER_DESC))
				{
					if (desc.MipLevels != 1)
						throw new Error("Invalid mip levels - dynamic resources can only have a single subresource");
					else if (desc.ArraySize != 1)
						throw new Error("Invalid array size - dynamic resources can only have a single subresource");
				}
				break;

			case D3D11_USAGE_STAGING:
				// Cannot have any bind flags!
				if (desc.BindFlags != 0)
					throw new Error("Staging resources cannot be bound to the pipeline and cannot have any bind flags set");

				// Must have CPU read or write access!
				if (desc.CPUAccessFlags == 0)
					throw new Error("Staging resources must have a CPU Access of either Read or Write.");
				break;

			case D3D11_USAGE_IMMUTABLE:
				// Must have initial data
				if ((initialData == null || initialData.length == 0))
					throw new Error("Immutable textures must have initial data");

				// Can ONLY be input to a shader stage
				if ((desc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == D3D11_BIND_DEPTH_STENCIL ||
					(desc.BindFlags & D3D11_BIND_RENDER_TARGET) == D3D11_BIND_RENDER_TARGET)
					throw new Error("Immutable resources cannot be bound for output");

				break;

			default:
				throw new Error("Invalid usage specified");
		}
	}
}


// -----------------------------------------------------
// ------------------ Device Context -------------------
// -----------------------------------------------------

class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	// General pipeline ---
	#backBufferFramebuffer;
	#readbackFrameBuffer;

	// General shaders ---
	#maxCombinedTextures;
	#shaderProgramMap;
	#currentShaderProgram;
	#currentCBufferMap;
	#currentTextureSamplerMap;
	#textureMipStatus;
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
	#maxVSTextures;
	#maxVSConstantBuffers;
	#vsConstantBuffers;
	#vsConstantBuffersDirty;

	// Rasterizer ---
	#viewport;
	#scissorRect;
	#rasterizerState;
	#defaultRasterizerDesc;
	#rasterizerDirty;
	#viewportDirty;
	#scissorRectDirty

	// Pixel Shader ---
	#pixelShader;
	#maxPSTextures;
	#maxPSConstantBuffers;
	#psConstantBuffers;
	#psConstantBuffersDirty;
	#psShaderResources;
	#psShaderResourcesDirty;
	#psSamplers;
	#psSamplersDirty;

	// Output Merger ---
	#renderTargetViews;
	#depthStencilView;
	#depthStencilState;
	#stencilRef;
	#defaultDepthStencilDesc;
	#outputMergerDirty;

	constructor(device)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11DeviceContext)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11DeviceContext objects - use device.GetImmediateContext() or D3D11CreateDeviceAndSwapChain() instead");
		}

		this.#gl = device.GetAdapter();

		// Set some defaults
		// TODO: Extrapolate this into proper states
		this.#gl.enable(this.#gl.CULL_FACE); // Turns on culling (default is backs)
		this.#gl.frontFace(this.#gl.CW);	 // Clockwise fronts to match D3D
		this.#gl.enable(this.#gl.DEPTH_TEST);

		// General
		this.#backBufferFramebuffer = device.GetBackBufferFramebuffer();
		this.#readbackFrameBuffer = this.#gl.createFramebuffer();

		// General shaders
		this.#shaderProgramMap = new Map();
		this.#maxCombinedTextures = this.#gl.getParameter(this.#gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
		this.#textureMipStatus = Array(this.#maxCombinedTextures).fill(false);
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
			this.#indexBufferFormat = DXGI_FORMAT_R16_UINT;
			this.#indexBufferOffset = 0;
		}

		// Vertex Shader
		{
			this.#vertexShader = null;
			this.#maxVSTextures = this.#gl.getParameter(this.#gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
			this.#maxVSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_VERTEX_UNIFORM_BLOCKS);

			this.#vsConstantBuffers = Array(this.#maxVSConstantBuffers).fill(null);

			this.#vsConstantBuffersDirty = true;
		}

		// Rasterizer
		{
			this.#viewport = null;
			this.#viewportDirty = true;
			this.#scissorRect = new D3D11_RECT(0, 0, 0, 0); // D3D11 default is empty box
			this.#scissorRectDirty = true;
			this.#rasterizerState = null;
			this.#rasterizerDirty = true;

			this.#defaultRasterizerDesc = new D3D11_RASTERIZER_DESC(
				D3D11_FILL_SOLID,
				D3D11_CULL_BACK);
		}

		// Pixel Shader
		{
			this.#pixelShader = null;
			this.#maxPSTextures = this.#gl.getParameter(this.#gl.MAX_TEXTURE_IMAGE_UNITS);
			this.#maxPSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_FRAGMENT_UNIFORM_BLOCKS);

			this.#psConstantBuffers = Array(this.#maxPSConstantBuffers).fill(null);
			this.#psShaderResources = Array(this.#maxPSTextures).fill(null);
			this.#psSamplers = Array(this.#maxPSTextures).fill(null);

			this.#psConstantBuffersDirty = true;
			this.#psShaderResourcesDirty = true;
			this.#psSamplersDirty = true;
		}

		// Output Merger
		{
			this.#renderTargetViews = [];
			this.#depthStencilView = null;
			this.#depthStencilState = null;
			this.#stencilRef = 0;
			this.#outputMergerDirty = true;

			this.#defaultDepthStencilDesc = new D3D11_DEPTH_STENCIL_DESC();
		}
	}

	// Not to spec, but used by the device to dirty the entire pipeline when
	// the device has altered the GL state in some way
	DirtyPipeline()
	{
		this.#inputAssemblerDirty = true;
		this.#shadersDirty = true;
		this.#vsConstantBuffersDirty = true;
		this.#rasterizerDirty = true;
		this.#psConstantBuffersDirty = true;
		this.#psShaderResourcesDirty = true;
		this.#psSamplersDirty = true;
		this.#outputMergerDirty = true;
	}

	// TODO: Handle texture vs. renderbuffer once
	//       that distinction is implemented elsewhere
	// NOTE: No longer restoring bindings after clear!
	// TODO: Clear the entire resource (all mips, array slices and cube faces)
	ClearRenderTargetView(renderTargetView, color)
	{
		// Validate RTV
		if (renderTargetView == null)
			throw new Error("Invalid RenderTargetView for clear");

		// Bind the RTV
		this.#BindBackBufferFramebuffer();
		this.#BindRenderTargets([renderTargetView]);

		// TODO: Turn off scissor and buffer write masks, as
		//       D3D does not take those into account when clearing

		// Clear
		this.#gl.clearColor(color[0], color[1], color[2], color[3]);
		this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
	}


	ClearDepthStencilView(depthStencilView, clearFlags, depth, stencil)
	{
		// Validate DSV
		if (depthStencilView == null)
			throw new Error("Invalid DepthStencilView for clear");

		// Any clear flags?
		let clearingDepth = (clearFlags & D3D11_CLEAR_DEPTH == D3D11_CLEAR_DEPTH);
		let clearingStencil = (clearFlags & D3D11_CLEAR_STENCIL == D3D11_CLEAR_STENCIL);
		if (!clearingDepth && !clearingStencil)
			return;

		// Bind the depth stencil
		this.#BindBackBufferFramebuffer();
		this.#BindDepthStencil(depthStencilView);

		// TODO: Turn off scissor and buffer write masks, as
		//       D3D does not take those into account when clearing

		// Set values for clears
		let mask = 0;

		if (clearingDepth)
		{
			this.#gl.clearDepth(depth);
			mask |= this.#gl.DEPTH_BUFFER_BIT;
		}

		if (clearingStencil)
		{
			this.#gl.clearStencil(stencil);
			mask |= this.#gl.STENCIL_BUFFER_BIT;
		}

		// Actual clear
		this.#gl.clear(mask);
	}

	/**
	 * Copies the entirety of a resource to another one, including all subresources.
	 * 
	 * @param {ID3D11Resource} dstResource The destination resource
	 * @param {ID3D11Resource} srcResource The source resource
	 * 
	 * @throws {Error}
	 */
	CopyResource(dstResource, srcResource)
	{
		if (dstResource == srcResource)
			throw new Error("Cannot copy resource when destination and source are the same resource");

		// Check types
		if (dstResource instanceof ID3D11Buffer &&
			srcResource instanceof ID3D11Buffer)
		{
			// Do a buffer-to-buffer copy
			throw new Error("Buffer resource copying not yet implemented!");
		}
		else if (
			dstResource instanceof ID3D11Texture2D &&
			srcResource instanceof ID3D11Texture2D)
		{
			// Validate descriptions match
			let srcDesc = srcResource.GetDesc();
			let dstDesc = dstResource.GetDesc();

			if (dstResource.Usage == D3D11_USAGE_IMMUTABLE)
				throw new Error("Cannot use an immutable resource as a copy destination");

			if (srcDesc.Width != dstDesc.Width ||
				srcDesc.Height != dstDesc.Height ||
				srcDesc.ArraySize != dstDesc.ArraySize ||
				srcDesc.MipLevels != dstDesc.MipLevels)
				throw new Error("Source and destination resources do not match in size or subresource count");

			if (srcDesc.Format != dstDesc.Format)
				throw new Error("Source and destination resources have different formats");

			// Loop through all mips of each array slice
			for (let arrSlice = 0; arrSlice < srcDesc.ArraySize; arrSlice++)
			{
				for (let mip = 0; mip < srcDesc.MipLevels; mip++)
				{
					// Calculate this subresource index and copy
					let subresIndex = D3D11CalcSubresource(mip, arrSlice, srcDesc.MipLevels);
					this.CopySubresourceRegion(dstResource, subresIndex, 0, 0, 0, srcResource, subresIndex, null);
				}
			}
		}
		else
		{
			throw new Error("Resources being copied do not match or are not yet implemented!");
		}
	}

	/**
	 * Copy a region from a source resource to a destination resource
	 * 
	 * @param {ID3D11Resource} dstResource The destination resource.
	 * @param {Number} dstSubresource Zero-based destination subresource index.  Use {@see D3D11CalcSubresource} to calculate.
	 * @param {Number} dstX The x-coordinate of the upper left corner of the destination region.
	 * @param {Number} dstY The y-coordinate of the upper left corner of the destination region. For a 1D subresource, this must be zero.
	 * @param {Number} dstZ The z-coordinate of the upper left corner of the destination region. For a 1D or 2D subresource, this must be zero.
	 * @param {ID3D11Resource} srcResource The source resource.
	 * @param {Number} srcSubresource Zero-based source subresource index.  Use {@see D3D11CalcSubresource} to calculate.
	 * @param {D3D11_BOX} srcBox A box that defines a portion of the subresource to read, or null for the entire subresource.  An empty box results in no data being copied.
	 *
	 * @throws {Error}
	 */
	CopySubresourceRegion(dstResource, dstSubresource, dstX, dstY, dstZ, srcResource, srcSubresource, srcBox = null)
	{
		// Is the box empty?  If so, nothing to do.
		if (srcBox != null && srcBox.IsEmpty())
			return;

		// Grab descriptions and validate
		let srcDesc = srcResource.GetDesc();
		let dstDesc = dstResource.GetDesc();

		// Validate resource details
		if (dstDesc.Usage == D3D11_USAGE_IMMUTABLE)
			throw new Error("Cannot copy into an immutable resource");

		// Validate subresource indices
		this.#ValidateSubresourceIndex(srcDesc, srcSubresource);
		this.#ValidateSubresourceIndex(dstDesc, dstSubresource);

		// Same exact subresource?
		if (srcResource == dstResource &&
			srcSubresource == dstSubresource)
			throw new Error("Cannot use the same subresource as both the source and destination of a copy");

		// Must have the same format
		if (srcDesc.Format != dstDesc.Format)
			throw new Error("Source and destination must have same format when copying");

		// If one is a buffer, they both must be buffers
		let srcIsBuffer = srcResource instanceof ID3D11Buffer;
		let dstIsBuffer = dstResource instanceof ID3D11Buffer;
		if ((srcIsBuffer && !dstIsBuffer) ||
			(dstIsBuffer && !srcIsBuffer))
			throw new Error("Source and destination must be the same type (buffer or texture) when copying");

		// SOURCE resource first ---------------------
		if (srcResource instanceof ID3D11Texture2D)
		{
			// dstZ must be zero for 1D and 2D textures
			if (dstZ != 0)
				throw new Error("Invalid destination Z value for 2D textures - must be zero");

			// Validate the source box
			if (srcBox != null)
			{
				let srcArraySlice = Math.floor(srcSubresource / srcDesc.MipLevels);
				let srcMipSlice = srcSubresource - (srcArraySlice * srcDesc.MipLevels);
				let div = Math.pow(2, srcMipSlice);
				let srcMipWidth = Math.max(1, Math.floor(dstDesc.Width / div));
				let srcMipHeight = Math.max(1, Math.floor(dstDesc.Height / div));

				if (srcBox.Left < 0 || srcBox.Right > srcMipWidth ||
					srcBox.Top < 0 || srcBox.Bottom > srcMipHeight)
					throw new Error("Source box extends outside source resource dimensions for mip level " + srcMipSlice);
			}
		}
		else
		{
			throw new Error("Given source resource is invalid or not yet implemented!");
		}

		// DESTINATION resource and copy -------------
		if (dstResource instanceof ID3D11Texture2D)
		{
			// Calculate destination subresource details
			let dstArraySlice = Math.floor(dstSubresource / dstDesc.MipLevels);
			let dstMipSlice = dstSubresource - (dstArraySlice * dstDesc.MipLevels);
			let dstIsArray = dstDesc.ArraySize > 1;
			let dstIsCubemap = (dstDesc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE;

			// Calculate size of the mip
			let div = Math.pow(2, dstMipSlice);
			let dstMipWidth = Math.max(1, Math.floor(dstDesc.Width / div));
			let dstMipHeight = Math.max(1, Math.floor(dstDesc.Height / div));

			// Actual offsets
			let x = 0;
			let y = 0;
			let width = dstMipWidth;
			let height = dstMipHeight;
			if (srcBox != null)
			{
				x = srcBox.Left;
				y = dstMipHeight - srcBox.Bottom; // Flip the Y
				width = srcBox.Right - srcBox.Left;
				height = srcBox.Bottom - srcBox.Top;

				// Update the destination location Y, too
				let dstBottom = dstY + height;
				dstY = dstMipHeight - dstBottom;
			}

			// Validate the desintation offsets, too
			if (dstX < 0 ||
				dstY < 0 ||
				dstX + width > dstMipWidth ||
				dstY + height > dstMipHeight)
				throw new Error("Destination offset extends outside destination resource dimensions for mip level " + dstMipSlice);

			// Validate cube map array slice
			if (dstIsCubemap && (dstArraySlice < 0 || dstArraySlice >= 6))
				throw new Error("Invalid subresource for cube map copying");

			// Should be all good, so actually bind the framebuffer
			this.#BindSubresourceAsReadFramebuffer(srcResource, srcDesc, srcSubresource);

			// Assume the output merger is dirty due to the framebuffer change
			// TODO: Determine if this is necessary, since it's only changing the read buffer?
			this.#outputMergerDirty = true;

			// Which function for copying
			if (!dstIsArray || dstIsCubemap)
			{
				// Which GL texture target?
				let target = this.#gl.TEXTURE_2D;
				if (dstIsCubemap)
				{
					switch (dstArraySlice)
					{
						case 0: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
						case 1: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
						case 2: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break; // FLIP Y!
						case 3: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break; // FLIP Y!
						case 4: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
						case 5: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					}

					// Also bind as a cube map target
					this.#gl.bindTexture(this.#gl.TEXTURE_CUBE_MAP, dstResource.GetGLResource());
				}
				else
				{
					// Regular texture2d binding for the target
					this.#gl.bindTexture(this.#gl.TEXTURE_2D, dstResource.GetGLResource());
				}

				// Use the basic copy function
				this.#gl.copyTexSubImage2D(
					target,
					dstMipSlice,
					dstX,
					dstY,
					x, y, width, height);
			}
			else
			{
				// Bind the target before copy
				this.#gl.bindTexture(this.#gl.TEXTURE_2D_ARRAY, dstResource.GetGLResource());

				// Is an array and NOT a cube map, so we
				// need to use the specific function that
				// allows us to specify the array slice
				this.#gl.copyTexSubImage3D(
					this.#gl.TEXTURE_2D_ARRAY,
					dstMipSlice,
					dstX,
					dstY,
					dstArraySlice,
					x, y, width, height);
			}
		}
		else
		{
			throw new Error("Given destination resource is invalid or not yet implemented!");
		}
	}

	#ValidateSubresourceIndex(resourceDesc, subresourceIndex)
	{
		let maxSubresource = D3D11CalcSubresource(
			resourceDesc.MipLevels - 1,
			resourceDesc.ArraySize - 1,
			resourceDesc.MipLevels);
		if (subresourceIndex < 0 || subresourceIndex > maxSubresource)
			throw new Error("Invalid subresource index");
	}

	#BindSubresourceAsReadFramebuffer(resource, desc, subresource)
	{
		// Set up the read framebuffer
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#readbackFrameBuffer);

		// Calculate subresource details from indices
		let arraySlice = Math.floor(subresource / desc.MipLevels);
		let mipSlice = subresource - (arraySlice * desc.MipLevels);

		// If this is a texture array (and not a cube map), we
		// need to use a different function for binding
		let isCubemap = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);
		let isArray = desc.ArraySize > 1;

		// Which function?
		if (!isArray || isCubemap)
		{
			// Which GL texture target?
			let target = this.#gl.TEXTURE_2D;
			if (isCubemap)
			{
				switch (arraySlice)
				{
					case 0: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
					case 1: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
					case 2: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break; // FLIP Y!
					case 3: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break; // FLIP Y!
					case 4: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
					case 5: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					default: throw new Error("Invalid subresource for cube map reading");
				}
			}

			// Bind for reading
			this.#gl.framebufferTexture2D(
				this.#gl.READ_FRAMEBUFFER,
				this.#gl.COLOR_ATTACHMENT0,
				target,
				resource.GetGLResource(),
				mipSlice);
		}
		else
		{
			// Is an array and NOT a cube map, so we
			// need to use the specific function that
			// allows us to specify the array slice
			this.#gl.framebufferTextureLayer(
				this.#gl.READ_FRAMEBUFFER,
				this.#gl.COLOR_ATTACHMENT0,
				resource.GetGLResource(),
				mipSlice,
				arraySlice);
		}
	}


	GenerateMips(shaderResourceView)
	{
		// Get the base resource of the view to check bind flags
		let res = shaderResourceView.GetResource();
		let desc = res.GetDesc();

		// If the resource isn't set up for generating mip maps,
		// this method has no effect (according to the spec).
		// TODO: Also check for SRV and RTV, as per spec?
		if ((desc.MiscFlags & D3D11_RESOURCE_MISC_GENERATE_MIPS) == 0)
		{
			res.Release();
			return;
		}
		
		// Perform the generation
		let glTarget = res.GetGLTarget();
		this.#gl.bindTexture(glTarget, res.GetGLResource());
		this.#gl.generateMipmap(glTarget);

		// Pipeline might be dirty
		this.DirtyPipeline();

		// Done with resource
		res.Release();
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

		this.#inputAssemblerDirty = true;
	}

	IASetPrimitiveTopology(topology)
	{
		// Note: All vertex shaders have "gl_PointSize = 1.0"
		// to account for D3D points always being exactly 1 pixel
		this.#primitiveTopology = topology;
	}

	// TODO: Actually use params
	// TODO: Limit num buffers to actual WebGL max
	// TODO: Don't reset buffer array entirely - just update various elements
	IASetVertexBuffers(startSlot, buffers, strides, offsets)
	{
		// Reset existing vb data
		this.#vertexBuffers = [];
		this.#vertexBufferStrides = [];
		this.#vertexBufferOffsets = [];

		// Save buffers in correct slots
		for (let i = 0; i < buffers.length; i++)
		{
			this.#vertexBuffers[startSlot + i] = buffers[i];
			this.#vertexBufferStrides[startSlot + i] = strides[i];
			this.#vertexBufferOffsets[startSlot + i] = offsets[i];
		}

		this.#inputAssemblerDirty = true;
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
		for (let c = 0; c < constantBuffers.length; c++)
		{
			this.#vsConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#vsConstantBuffersDirty = true;
	}

	RSGetState()
	{
		if (this.#rasterizerState == null)
			return null;

		this.#rasterizerState.AddRef();
		return this.#rasterizerState;
	}


	RSSetState(rasterizerState)
	{
		// TODO: Type check the state?
		this.#rasterizerState = rasterizerState;
		this.#rasterizerDirty = true;
	}

	/**
	 * Gets the scissor rectangle currently bound to the rasterizer stage
	 * 
	 * @returns {Array<D3D11_RECT>} An array containing the current scissor rect
	 */
	RSGetScissorRects()
	{
		return [structuredClone(this.#scissorRect)];
	}

	/**
	 * Sets the scissor rectangle for the rasterizer.
	 * Note that even though the function takes an array of
	 * rectangles, only the first is used in d3d11.js.  
	 * 
	 * @param {Array<D3D11_RECT>} rects Array of scissor rects.  Note that only the first viewport is used in d3d11.js.
	 */
	RSSetScissorRects(rects)
	{
		// Copy the first element
		this.#scissorRect = structuredClone(rects[0]);
		this.#scissorRectDirty = true;
	}

	/**
	 * Gets the viewport currently bound to the rasterizer stage
	 * 
	 * @returns {Array<D3D11_VIEWPORT>} An array containing the current viewport
	 */
	RSGetViewports()
	{
		return [structuredClone(this.#viewport)];
	}

	/**
	 * Sets the viewport for the rasterizer.  
	 * Note that even though the function takes an array of
	 * viewports, only the first is used in d3d11.js.  
	 * 
	 * @param {Array<D3D11_VIEWPORT>} viewports Array of viewports.  Note that only the first viewport is used in d3d11.js.
	 */
	RSSetViewports(viewports)
	{
		// Copy the first element
		this.#viewport = structuredClone(viewports[0]);
		this.#viewportDirty = true;
	}

	PSSetShader(pixelShader)
	{
		this.#pixelShader = pixelShader;
		this.#shadersDirty = true;
	}

	PSSetConstantBuffers(startSlot, constantBuffers)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + constantBuffers.length >= this.#maxPSConstantBuffers)
			throw new Error("Attempting to set PS constant buffers outside valid range");

		// Place buffers in contiguous slots, offset by starting index
		for (let c = 0; c < constantBuffers.length; c++)
		{
			this.#psConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#psConstantBuffersDirty = true;
	}

	// TODO: Handle null samplers simply holding the default sampler
	PSSetSamplers(startSlot, samplers)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + samplers.length >= this.#maxPSTextures)
			throw new Error("Attempting to set PS samplers outside valid range");

		// Place samplers in contiguos slots, offset by starting index
		for (let i = 0; i < samplers.length; i++)
		{
			this.#psSamplers[i + startSlot] = samplers[i];
		}

		this.#psSamplersDirty = true;
	}

	// TODO: Handle resources already bound as output?
	PSSetShaderResources(startSlot, shaderResourceViews)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + shaderResourceViews.length >= this.#maxPSTextures)
			throw new Error("Attempting to set PS shader resources outside valid range");

		// Place resource views in contiguos slots, offset by starting index
		for (let i = 0; i < shaderResourceViews.length; i++)
		{
			this.#psShaderResources[i + startSlot] = shaderResourceViews[i];
		}
		
		this.#psShaderResourcesDirty = true;
	}


	OMSetDepthStencilState(depthStencilState, stencilRef)
	{
		this.#depthStencilState = depthStencilState;
		this.#stencilRef = stencilRef;
		this.#outputMergerDirty = true;
	}

	// TODO: Handle multiple render targets
	// TODO: Unbind when rtv parameter is empty/null
	// TODO: Validate render target details?
	// TODO: Check input/output bindings?  (UGH)
	OMSetRenderTargets(renderTargetViews, depthStencilView)
	{
		if (renderTargetViews == null || renderTargetViews.length == 0)
			throw new Error("Unbinding render targets not yet implemented!");

		if (renderTargetViews.length > 1)
			throw new Error("Multiple render targets not yet implemented!");

		// Save and dirty
		this.#renderTargetViews = renderTargetViews.slice(); // Copy
		this.#depthStencilView = depthStencilView;
		this.#outputMergerDirty = true;
		this.#viewportDirty = true; // Need to "re-flip" the viewport!
	}

	// TODO: Finalize the way we return multiple pieces of data
	OMGetRenderTargets()
	{
		return [this.#renderTargetViews.slice(), this.#depthStencilView];
	}

	// TODO: Handle instancing
	// TODO: Error reporting if state isn't set
	#PrepareInputAssembler()
	{
		if (!this.#inputAssemblerDirty)
			return;

		// Handle each input element
		let inputElementDescs = this.#inputLayout.GetInputElementDescs();
		let currentBufferIndex = -1;

		for (let i = 0; i < inputElementDescs.length; i++)
		{
			// Grab this element and associated data
			// TODO: bake format details into the input layout to save time here?
			let ie = inputElementDescs[i];
			let dataType = this.#GetDXGIFormatDataType(ie.Format);
			let compCount = this.#GetDXGIFormatComponentCount(ie.Format);

			// Do we have this buffer?
			let bufferIndex = ie.InputSlot;
			if (bufferIndex >= this.#vertexBuffers.length)
				continue;

			// Bind the correct buffer for this element
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
		let vsMap = this.#shaderProgramMap.get(this.#vertexShader);
		if (!vsMap.has(this.#pixelShader))
		{
			// Create texture/sampler arrays
			let vsTextureArray = Array(this.#maxVSTextures);
			let vsSamplerArray = Array(this.#maxVSTextures);
			let psTextureArray = Array(this.#maxPSTextures);
			let psSamplerArray = Array(this.#maxPSTextures);
			for (let i = 0; i < this.#maxVSTextures; i++)
			{
				vsTextureArray[i] = [];
				vsSamplerArray[i] = [];
			}
			for (let i = 0; i < this.#maxPSTextures; i++)
			{
				psTextureArray[i] = [];
				psSamplerArray[i] = [];
			}

			// We now have a combined VS+PS set
			vsMap.set(this.#pixelShader, {
				GLProgram: null,

				// This maps a D3D register index to a GL uniform block index
				// Note that the CB indices are laid out [vsCBs][psCBs+maxVSCBs]
				CBufferMap: Array(this.#maxVSConstantBuffers + this.#maxPSConstantBuffers).fill(-1),

				// Mapping D3D register indices to uniform locations
				// Note that a single texture or register may map to multiple locations
				// due to the texture/sampler combinations (t0 + s0 != t0 + s1)
				// TODO: Determine if these array sizes make sense - any register could
				//       really map to any uniform block.  Might be able to align with D3D
				//       register limits instead, though is that necessary?
				TextureSamplerMap:
				{
					VSTextures: vsTextureArray,
					VSSamplers: vsSamplerArray,
					PSTextures: psTextureArray,
					PSSamplers: psSamplerArray
				}
			}); // Note: May want to store more stuff?
		}

		// Does this program exist?
		let vspsMap = vsMap.get(this.#pixelShader);
		let prog = vspsMap.GLProgram;
		if (prog == null)
		{
			// Create the program and cache for later
			prog = this.#CreateShaderProgram(this.#vertexShader, this.#pixelShader);
			vspsMap.GLProgram = prog;

			// Now that we have a program, cache cbuffer (uniform buffer) indices

			// Start with vertex shader cbuffers
			let vsCBs = this.#vertexShader.GetCBuffers();
			for (let v = 0; v < vsCBs.length; v++)
			{
				let cb = vsCBs[v];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxVSConstantBuffers)
					throw new Error("Invalid register index for vertex shader constant buffer");

				// Get the uniform block index
				// TODO: Check translated names!
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.Name);

				// Store in the map
				vspsMap.CBufferMap[cb.RegisterIndex] = ubIndex;
			}

			// Next, pixel shader cbuffers
			let psCBs = this.#pixelShader.GetCBuffers();
			for (let p = 0; p < psCBs.length; p++)
			{
				let cb = psCBs[p];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxPSConstantBuffers)
					throw new Error("Invalid register index for pixel shader constant buffer");

				// Get the uniform block index
				// TODO: Check translated names!
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.Name);

				// Store in the map - Note the offset for uniform block indices, since
				// we need PS indices to start after all possible VS indices
				let offsetPSIndex = cb.RegisterIndex + this.#maxVSConstantBuffers;
				vspsMap.CBufferMap[offsetPSIndex] = ubIndex;
			}

			// Next, cache texture/sampler combinations
			let currentTextureUnit = 0;

			// Start with vertex shader t/s combos
			let vsTexSampCombos = this.#vertexShader.GetTextureSamplerCombinations();
			for (let i = 0; i < vsTexSampCombos.length; i++)
			{
				let tsc = vsTexSampCombos[i];

				// Have we run out of VS texture units?
				if (currentTextureUnit >= this.#maxVSTextures)
					throw new Error("Too many vertex shader texture/sampler combinations in use!");

				// Which D3D registers?
				let tReg = tsc.Texture.RegisterIndex;
				let sReg = tsc.Sampler.RegisterIndex;

				// Which GL uniform location for the combined name?
				let uniformLoc = this.#gl.getUniformLocation(prog, tsc.CombinedName);

				// Add this data to maps at the proper indices (registers)
				vspsMap.TextureSamplerMap.VSTextures[tReg].push({ TextureUnit: currentTextureUnit, UniformLocation: uniformLoc });
				vspsMap.TextureSamplerMap.VSSamplers[sReg].push(currentTextureUnit);

				// Move on to the next unit
				currentTextureUnit++;
			}

			// Then the PS combos
			let psTexSampCombos = this.#pixelShader.GetTextureSamplerCombinations();
			for (let i = 0; i < psTexSampCombos.length; i++)
			{
				let tsc = psTexSampCombos[i];
				
				// Have we run out of PS texture units?
				if (currentTextureUnit >= this.#maxPSTextures)
					throw new Error("Too many pixel shader texture/sampler combinations in use!");

				// Have we run out of TOTAL texture units?
				if (currentTextureUnit >= this.#maxCombinedTextures)
					throw new Error("Too many total texture/sampler combinations in use!");

				// Which D3D registers?
				let tReg = tsc.Texture.RegisterIndex;
				let sReg = tsc.Sampler.RegisterIndex;

				// Which GL uniform location for the combined name?
				let uniformLoc = this.#gl.getUniformLocation(prog, tsc.CombinedName);

				// Add this data to maps at the proper indices (registers)
				vspsMap.TextureSamplerMap.PSTextures[tReg].push({ TextureUnit: currentTextureUnit, UniformLocation: uniformLoc });
				vspsMap.TextureSamplerMap.PSSamplers[sReg].push(currentTextureUnit);

				// Move on to the next unit
				currentTextureUnit++;
			}
		}

		// Activate this program and we're clean
		this.#gl.useProgram(prog);
		this.#currentShaderProgram = prog;
		this.#currentCBufferMap = vspsMap.CBufferMap;
		this.#currentTextureSamplerMap = vspsMap.TextureSamplerMap;
		this.#shadersDirty = false;

		// TODO: See if we can cut down on the following for performance reasons...

		// After shader program swap, we need to double check cbuffers
		this.#vsConstantBuffersDirty = true;
		this.#psConstantBuffersDirty = true;

		// Also check textures/samplers
		this.#psSamplersDirty = true;
		this.#psShaderResourcesDirty = true;
	}

	#CreateShaderProgram(vs, ps)
	{
		// Create the new program and attach shaders
		let program = this.#gl.createProgram();
		this.#gl.attachShader(program, vs.GetGLShader());
		this.#gl.attachShader(program, ps.GetGLShader());

		// Link and check status
		this.#gl.linkProgram(program);
		let linkSuccess = this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS);
		if (!linkSuccess)
		{
			throw new Error("Error linking shaders: " + this.#gl.getProgramInfoLog(program));
		}

		// Validate and check status
		this.#gl.validateProgram(program);
		let validSuccess = this.#gl.getProgramParameter(program, this.#gl.VALIDATE_STATUS);
		if (!validSuccess)
		{
			throw new Error("Error validating shaders: " + this.#gl.getProgramInfoLog(program));
		}

		return program;
	}

	#PrepareConstantBuffers()
	{
		// Bind all VS cbuffers to the proper registers, then map them to uniform block indices
		if (this.#vsConstantBuffersDirty)
		{
			for (let v = 0; v < this.#vsConstantBuffers.length; v++)
			{
				let cb = this.#vsConstantBuffers[v];
	
				// Check to see if the shader program expects a buffer
				let ubIndex = this.#currentCBufferMap[v];
				if (ubIndex == -1 || cb == null)
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
		}

		// Bind all PS cbuffers, too - taking into account an offset to put them after all VS cbuffers
		if (this.#psConstantBuffersDirty)
		{
			for (let p = 0; p < this.#psConstantBuffers.length; p++)
			{
				let cb = this.#psConstantBuffers[p];

				// Expecting a buffer? (Use PS offset index)
				let psIndex = p + this.#maxVSConstantBuffers;
				let ubIndex = this.#currentCBufferMap[psIndex];
				if (ubIndex == -1 || cb == null)
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
		}

		// All clean
		this.#vsConstantBuffersDirty = false;
		this.#psConstantBuffersDirty = false;
	}

	#PrepareTexturesAndSamplers()
	{
		// Reset mip status
		this.#textureMipStatus.fill(false);

		// TODO: Handle vertex textures

		if (this.#psShaderResourcesDirty)
		{
			// Go through each resource slot
			for (let i = 0; i < this.#psShaderResources.length; i++)
			{
				let srv = this.#psShaderResources[i];
				if (srv == null)
					continue;

				// Grab the associated data from the map and loop through all possible gl binds
				let texMap = this.#currentTextureSamplerMap.PSTextures[i];
				for (let t = 0; t < texMap.length; t++)
				{
					// Grab this resource and first check its mip status
					let res = srv.GetResource();
					let glTarget = res.GetGLTarget();
					this.#textureMipStatus[texMap[t].TextureUnit] = (res.GetDesc().MipLevels != 1);

					// Activate the proper texture unit, bind this resource and set the uniform location
					this.#gl.activeTexture(this.#GetGLTextureUnit(texMap[t].TextureUnit));
					this.#gl.bindTexture(glTarget, res.GetGLResource());
					this.#gl.uniform1i(texMap[t].UniformLocation, texMap[t].TextureUnit);

					// Set SRV-specific texture properties
					let srvDesc = srv.GetDesc();
					let baseMip = srvDesc.MostDetailedMip;
					let maxMip = srvDesc.MostDetailedMip + srvDesc.MipLevels - 1;
					this.#gl.texParameteri(glTarget, this.#gl.TEXTURE_BASE_LEVEL, baseMip);
					this.#gl.texParameteri(glTarget, this.#gl.TEXTURE_MAX_LEVEL, maxMip);

					// TODO: Set sampler-specific texture properties (aniso level)

					// Release the resource ref
					res.Release();
				}
			}

			// TODO: Unbind leftover slots?  How do we know which ones aren't in use?

		}

		if (this.#psSamplersDirty)
		{
			// Go through each resource slot
			for (let i = 0; i < this.#psSamplers.length; i++)
			{
				let sampState = this.#psSamplers[i];
				if (sampState == null)
					continue;

				// Grab the data from this spot in the map
				let sampMap = this.#currentTextureSamplerMap.PSSamplers[i];
				for (let s = 0; s < sampMap.length; s++)
				{
					// Get the proper sampler version (with or without mips)
					const mips = this.#textureMipStatus[sampMap[s]];
					this.#gl.bindSampler(sampMap[s], sampState.GetGLSampler(mips));
				}
			}
		}


		// All clean
		this.#psSamplersDirty = false;
		this.#psShaderResourcesDirty = false;
	}

	#GetGLTextureUnit(index)
	{
		return this.#gl.TEXTURE0 + index;
	}


	/**
	 * Gets the height of the current render target and/or depth buffer
	 * (if there is no render target currently bound)
	 * 
	 * @returns {number} The height of the current RTV/DSV, or zero if there are none bound
	 */
	#GetActiveRenderTargetHeight()
	{
		let rtHeight = 0;

		// Any RTVs?
		if (this.#renderTargetViews != null)
		{
			// Get the first render target in the RTV list (might not be zero)
			for (let i = 0; i < this.#renderTargetViews.length; i++)
			{
				// Found an RTV; grab details
				if (this.#renderTargetViews[i] != null)
				{
					// Height of actual target
					let rtRes = this.#renderTargetViews[i].GetResource();
					rtHeight = rtRes.GetDesc().Height;
					rtRes.Release();

					// Use mip level to calculate height
					let mip = this.#renderTargetViews[i].GetDesc().MipSlice;
					let div = Math.pow(2, mip);
					rtHeight = Math.max(1, Math.floor(rtHeight / div));
					break;
				}
			}
		}

		// If we're still zero, check depth stencil instead
		if (rtHeight == 0 && this.#depthStencilView != null)
		{
			// Height of actual resource
			let dsvRes = this.#depthStencilView.GetResource();
			rtHeight = dsvRes.GetDesc().Height;
			dsvRes.Release();

			// Use mip level to calculate height
			let mip = this.#depthStencilView.GetDesc().MipSlice;
			let div = Math.pow(2, mip);
			rtHeight = Math.max(1, Math.floor(rtHeight / div));
		}

		return rtHeight;
	}

	
	#PrepareRasterizer()
	{
		// We need to flip the Y on viewports & scissor rects, so
		// what's the actual render target height?
		let rtHeight = 0;
		if (this.#viewportDirty || this.#scissorRectDirty)
		{
			rtHeight = this.#GetActiveRenderTargetHeight();
		}
		
		// Need to update viewport (and we have a real height)?
		if (this.#viewportDirty && this.#viewport != null && rtHeight > 0)
		{
			// Perform the invert
			let invertY = rtHeight - this.#viewport.Height;

			// Set up the GL viewport first, flipping Y
			this.#gl.viewport(
				this.#viewport.TopLeftX,
				invertY - this.#viewport.TopLeftY,
				this.#viewport.Width,
				this.#viewport.Height);

			// Next the depth range
			this.#gl.depthRange(
				this.#viewport.MinDepth,
				this.#viewport.MaxDepth);

			this.#viewportDirty = false;
		}

		// Need to update scissor rect (and we have a real height)?
		if (this.#scissorRectDirty && this.#scissorRect != null && rtHeight > 0)
		{
			// Invert
			let scissorWidth = this.#scissorRect.Right - this.#scissorRect.Left;
			let scissorHeight = this.#scissorRect.Bottom - this.#scissorRect.Top;
			let invertY = rtHeight - scissorHeight;

			// Set up the GL scissor rect
			this.#gl.scissor(
				this.#scissorRect.Left,
				invertY - this.#scissorRect.Top,
				scissorWidth,
				scissorHeight);

			this.#scissorRectDirty = false;
		}

		// Check for overall rasterizer state
		if (!this.#rasterizerDirty)
			return;

		// Which description are we using?
		let desc;
		if (this.#rasterizerState == null)
			desc = this.#defaultRasterizerDesc;
		else
			desc = this.#rasterizerState.GetDesc();

		// Fill mode - Solid only for now! (Wireframe isn't an option in WebGL)

		// Cull mode
		switch (desc.CullMode)
		{
			case D3D11_CULL_BACK:
				this.#gl.enable(this.#gl.CULL_FACE);
				this.#gl.cullFace(this.#gl.BACK);
				break;

			case D3D11_CULL_FRONT:
				this.#gl.enable(this.#gl.CULL_FACE);
				this.#gl.cullFace(this.#gl.FRONT);
				break;

			case D3D11_CULL_NONE:
			default:
				this.#gl.disable(this.#gl.CULL_FACE);
				break;
		}

		// Front Counter Clockwise for flipping the default winding order
		this.#gl.frontFace(desc.FrontCounterClockwise ? this.#gl.CCW : this.#gl.CW);

		// Depth bias
		if (desc.DepthBias == 0 && desc.SlopeScaleDepthBias == 0)
		{
			// Turn off biasing ("polygon offset")
			this.#gl.disable(this.#gl.POLYGON_OFFSET_FILL);
		}
		else
		{
			// Biasing is on with at least one of the params
			this.#gl.enable(this.#gl.POLYGON_OFFSET_FILL);
			this.#gl.polygonOffset(
				desc.SlopeScaleDepthBias,	// Assuming slope scale is "factor"
				desc.DepthBias);			// And depth bias is "units"
		}

		// No depth bias clamp in WebGL?

		// Depth clip enable - not present in webgl?

		// Scissor
		if (desc.ScissorEnable)
			this.#gl.enable(this.#gl.SCISSOR_TEST);
		else
			this.#gl.disable(this.#gl.SCISSOR_TEST);

		// Multisample - not currently implemented!
		this.#rasterizerDirty = false;
	}

	// TODO: Split Render Target and DS state dirty flags?
	// TODO: Move framebuffer binding above dirty flag so it's ALWAYS set each draw?
	#PrepareOutputMerger()
	{
		if (!this.#outputMergerDirty)
			return;

		// Handle depth-stencil state
		{
			let desc;
			if (this.#depthStencilState == null)
				desc = this.#defaultDepthStencilDesc;
			else
				desc = this.#depthStencilState.GetDesc();

			// Depth enable
			if (desc.DepthEnable)
				this.#gl.enable(this.#gl.DEPTH_TEST);
			else
				this.#gl.disable(this.#gl.DEPTH_TEST);

			// Depth write mask
			if (desc.DepthWriteMask == D3D11_DEPTH_WRITE_MASK_ZERO)
				this.#gl.depthMask(false);
			else if (desc.DepthWriteMask == D3D11_DEPTH_WRITE_MASK_ALL)
				this.#gl.depthMask(true);

			// Depth function
			this.#gl.depthFunc(this.#GetGLComparisonFunc(desc.DepthFunc));

			// TODO: Implement stencil!

		}

		// Ensure the framebuffer is bound first
		this.#BindBackBufferFramebuffer();

		// Bind the render target and depth buffer as necessary
		this.#BindRenderTargets(this.#renderTargetViews);
		this.#BindDepthStencil(this.#depthStencilView);

		// All done
		this.#outputMergerDirty = false;
	}

	#BindBackBufferFramebuffer()
	{
		// Remove from the read framebuffer just in case
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, null);
		this.#gl.bindFramebuffer(this.#gl.DRAW_FRAMEBUFFER, this.#backBufferFramebuffer);
	}

	// TODO: Handle texture vs. render buffer
	// TODO: Test out RTV/Resource combinations:
	//       - 2D RTV, 2D Resource
	//       - 2D Array RTV, 2D Resource
	//       - 2D RTV, 2D Array Resource
	//       - 2D Array RTV, 2D Array Resource
	#BindRenderTargets(rtvs)
	{
		// Any RTVs?
		if (rtvs.length > 0)
		{
			// TODO: Multiple render targets
			let rtvResource = rtvs[0].GetResource();
			let resDesc = rtvResource.GetDesc();
			let viewDesc = rtvs[0].GetDesc();

			// Which texture type?
			if (!(rtvResource instanceof ID3D11Texture2D))
				throw new Error("RTV texture type OM binding not yet implemented");

			// Is this RTV a single texture, an array or a cube map?
			if ((resDesc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE)
			{
				// It's (presumably) a cube map, so bind the proper target
				let glTarget;
				switch (viewDesc.FirstArraySlice)
				{
					case 0: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
					case 1: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
					case 2: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break;
					case 3: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break;
					case 4: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
					case 5: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					default:
						throw new Error("Only array slices 0-5 are valid for texture cube RTVs");
				}

				// Bind the proper cube face
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					glTarget,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice);
			}
			else if (resDesc.ArraySize > 1)
			{
				// Texture2D Array resource, so we need a different GL function
				this.#gl.framebufferTextureLayer(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice,
					viewDesc.FirstArraySlice);
			}
			else
			{
				// Just a standard (non-array) Texture2D
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					this.#gl.TEXTURE_2D,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice);
			}

			// Done with ref
			rtvResource.Release();
		}
	}

	#BindDepthStencil(dsv)
	{
		// Any depth?
		if (dsv == null)
		{
			// Unbind depth/stencil
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				this.#gl.DEPTH_STENCIL_ATTACHMENT,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				null,
				0);

			// Unbind just depth, too (just in case)
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				this.#gl.DEPTH_ATTACHMENT,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				null,
				0);
		}
		else
		{
			let dsvResource = dsv.GetResource();
			let viewDesc = dsv.GetDesc();

			// Does this have a stencil buffer?
			let hasStencil = (viewDesc.Format == DXGI_FORMAT_D24_UNORM_S8_UINT);
			let attach = hasStencil ? this.#gl.DEPTH_STENCIL_ATTACHMENT : this.#gl.DEPTH_ATTACHMENT;

			if (!hasStencil)
			{
				// Unbind the combined depth/stencil just in case
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.DEPTH_STENCIL_ATTACHMENT,
					this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
					null,
					0);
			}

			// Bind the depth texture
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				attach,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				dsvResource.GetGLResource(),
				viewDesc.MipSlice); // TODO: Verify this actually works?  Docs say ZERO only!
			
			// Done with ref
			dsvResource.Release();
		}
	}

	// TODO: Prepare rest of pipeline
	Draw(vertexCount, startVertexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		this.#PrepareTexturesAndSamplers();
		this.#PrepareRasterizer();
		this.#PrepareOutputMerger()

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
		this.#PrepareTexturesAndSamplers();
		this.#PrepareRasterizer();
		this.#PrepareOutputMerger()

		// Get proper format
		let format = this.#gl.UNSIGNED_SHORT;
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

	/**
	 * Sends queued up commands to the GPU to be processed
	 */
	Flush()
	{
		// TODO: Experiement with flush() vs. finish()
		this.#gl.flush();
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

			// Bind and update
			this.#gl.bindBuffer(this.#gl.UNIFORM_BUFFER, dstResource.GetGLResource());
			this.#gl.bufferSubData(
				this.#gl.UNIFORM_BUFFER,
				0,
				srcData);
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

	#GetGLComparisonFunc(func)
	{
		switch (func)
		{
			case D3D11_COMPARISON_NEVER: return this.#gl.NEVER;
			case D3D11_COMPARISON_LESS: return this.#gl.LESS;
			case D3D11_COMPARISON_EQUAL: return this.#gl.EQUAL;
			case D3D11_COMPARISON_LESS_EQUAL: return this.#gl.LEQUAL;
			case D3D11_COMPARISON_GREATER: return this.#gl.GREATER;
			case D3D11_COMPARISON_NOT_EQUAL: return this.#gl.NOTEQUAL;
			case D3D11_COMPARISON_GREATER_EQUAL: return this.#gl.GEQUAL;
			case D3D11_COMPARISON_ALWAYS: return this.#gl.ALWAYS;
			default: throw new Error("Invalid comparison function");
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


// -----------------------------------------------------
// -------------------- Swap Chain ---------------------
// -----------------------------------------------------

class IDXGISwapChain extends IUnknown
{
	#desc;
	#device;
	#gl;
	#backBuffer;
	#backBufferFramebuffer;

	
	constructor(device, desc)
	{
		super();

		// Abstract check
		if (new.target === IDXGISwapChain)
		{
			throw new Error("Cannot instantiate IDXGISwapChain objects directly.  Use DXGICreateSwapChain() or D3D11CreateDeviceAndSwapChain() instead.");
		}

		this.#desc = desc.Copy();
		this.#device = device;
		this.#gl = device.GetAdapter();

		// Validate the description
		if (this.#desc.Width <= 0) throw new Error("Swap Chain width must be greater than zero");
		if (this.#desc.Height <= 0) throw new Error("Swap Chain height must be greater than zero");
		if (this.#desc.Format != DXGI_FORMAT_R8G8B8A8_UNORM && 
			this.#desc.Format != DXGI_FORMAT_R8G8B8A8_UNORM_SRGB)
			throw new Error("Invalid Swap Chain format");

		// Resize GL's canvas to match the client size
		this.#gl.canvas.width = this.#gl.canvas.clientWidth;
		this.#gl.canvas.height = this.#gl.canvas.clientHeight;

		// Create the back buffer from the description
		this.#CreateBackBuffer();

		// Grab the singular back buffer frame buffer from the device,
		// so we can clean it up properly (detach depth/stencil) on
		// a resize
		this.#backBufferFramebuffer = device.GetBackBufferFramebuffer();
		
	}

	/**
	 * Gets the description of this swap chain
	 * 
	 * @returns {DXGI_SWAP_CHAIN_DESC} A copy of the description
	 */
	GetDesc()
	{
		return structuredClone(this.#desc);
	}

	/**
	 * Gets the swap chain's back buffer.  Note that a reference
	 * will be added to the back buffer object each time this is called.
	 * 
	 * @returns {ID3D11Texture2D} The swap chain's back buffer 
	 */
	GetBuffer()
	{
		this.#backBuffer.AddRef();
		return this.#backBuffer;
	}


	// Blit from the back buffer to the default frame buffer
	Present()
	{
		// Set the "real" back buffer as the draw framebuffer
		this.#gl.bindFramebuffer(this.#gl.FRAMEBUFFER, null);
		
		// Bind the "fake" back buffer to the read framebuffer for a blit
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#backBufferFramebuffer);
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.TEXTURE_2D,
			this.#backBuffer.GetGLResource(),
			0);

		// Perform the blit
		let w = this.#desc.Width;
		let h = this.#desc.Height;
		this.#gl.blitFramebuffer(
			0, 0, w, h, // Source L,T,R,B
			0, 0, w, h, // Dest L,T,R,B
			this.#gl.COLOR_BUFFER_BIT, // Colors only
			this.#gl.NEAREST); // No interpolation

		// Flush (not strictly necessary)
		this.#gl.flush();
	}


	Release()
	{
		super.Release();

		if (this.GetRef() <= 0)
		{
			this.#backBuffer.Release();
		}
	}

	/**
	 * Resizes the swap chain back buffer if the parameters differ
	 * from the existing back buffer
	 * 
	 * @param {Number} width The new width
	 * @param {Number} height The new height
	 * @param {any} newFormat The new format.  Use DXGI_FORMAT_UNKNOWN to preserve the existing format.
	 */
	ResizeBuffers(width, height, newFormat = DXGI_FORMAT_UNKNOWN)
	{
		// Preserve format?
		if (newFormat == DXGI_FORMAT_UNKNOWN)
			newFormat = this.#desc.Format;

		// Anything to do?
		if (this.#desc.Width == width &&
			this.#desc.Height == height &&
			this.#desc.Format == newFormat)
			return;

		// Validate the parameters
		if (width <= 0) throw new Error("Swap Chain width must be greater than zero");
		if (height <= 0) throw new Error("Swap Chain height must be greater than zero");
		if (newFormat != DXGI_FORMAT_R8G8B8A8_UNORM &&
			newFormat != DXGI_FORMAT_R8G8B8A8_UNORM_SRGB)
			throw new Error("Invalid Swap Chain format");

		// Resize GL's canvas to match the client size
		this.#gl.canvas.width = this.#gl.canvas.clientWidth;
		this.#gl.canvas.height = this.#gl.canvas.clientHeight;

		// All set, update the description and perform the resize
		this.#desc.Width = width;
		this.#desc.Height = height;
		this.#desc.Format = newFormat;

		// Release the back buffer reference
		this.#backBuffer.Release();
		if (this.#backBuffer.GetRef() != 0)
			throw new Error("One or more outstanding back buffer references exist; cannot resize");

		// We're good, so unbind ALL textures from the back buffer framebuffer
		// since (presumably) the depth/stencil sizes will eventually change, too
		this.#DetachBackBufferFramebuffer();

		// Everything checks out, so create the new back buffer
		this.#CreateBackBuffer();
	}


	#CreateBackBuffer()
	{
		// Create the "back buffer" description and texture
		let bbDesc = new D3D11_TEXTURE2D_DESC(
			this.#desc.Width,
			this.#desc.Height,
			1,
			1,
			this.#desc.Format,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_RENDER_TARGET,
			0, 0);
		this.#backBuffer = this.#device.CreateTexture2D(bbDesc, null);
	}

	/**
	 * Detaches color and depth/stencil attachments
	 * from our "fake back buffer" framebuffer, usually
	 * after a resize given that the other buffers will
	 * presumably be resized at some point, too.
	 */
	#DetachBackBufferFramebuffer()
	{
		this.#gl.bindFramebuffer(this.#gl.DRAW_FRAMEBUFFER, this.#backBufferFramebuffer);
		this.#gl.framebufferTexture2D(
			this.#gl.DRAW_FRAMEBUFFER,
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.TEXTURE_2D,
			null,
			0);
		this.#gl.framebufferTexture2D(
			this.#gl.DRAW_FRAMEBUFFER,
			this.#gl.DEPTH_ATTACHMENT,
			this.#gl.TEXTURE_2D,
			null,
			0);
		this.#gl.framebufferTexture2D(
			this.#gl.DRAW_FRAMEBUFFER,
			this.#gl.DEPTH_STENCIL_ATTACHMENT,
			this.#gl.TEXTURE_2D,
			null,
			0);

	}

	// JUST FOR TESTING - WILL REMOVE
	#EnumerateFramebufferAttachments()
	{
		let attachNames = ["Color", "Depth", "DepthStencil"];
		let attachments = [
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.DEPTH_ATTACHMENT,
			this.#gl.DEPTH_STENCIL_ATTACHMENT
		];

		let targetNames = ["Read", "Draw"];
		let targets = [this.#gl.READ_FRAMEBUFFER, this.#gl.DRAW_FRAMEBUFFER];
		let targetBindings = [this.#gl.READ_FRAMEBUFFER_BINDING, this.#gl.DRAW_FRAMEBUFFER_BINDING];

		for (let t = 0; t < targets.length; t++)
		{
			// Get the current binding to check for validity (default backbuffer == null)
			let binding = this.#gl.getParameter(targetBindings[t]);

			for (let a = 0; a < attachments.length; a++)
			{
				let param = "NULL";
				if (binding != null)
				{
					param = this.#gl.getFramebufferAttachmentParameter(
						targets[t],
						attachments[a],
						this.#gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);
				}

				console.log("Target: " + targetNames[t] + " | Attachment: " + attachNames[a]);
				console.log(param);
				console.log(" ");
			}
		}

		console.log("---");
	}
}


// -----------------------------------------------------
// ---------------- Pipeline Interfaces ----------------
// -----------------------------------------------------

/**
 * Holds a description for a depth-stencil state that you can bind to the output merger stage.
 */
class ID3D11DepthStencilState extends ID3D11DeviceChild
{
	#desc;

	/**
	 * Creates a new depth-stencil state.  Note that this should not be invoked directly.
	 * 
	 * @param {ID3D11Device} device The device that created this state
	 * @param {D3D11_DEPTH_STENCIL_DESC} desc The description of this state
	 * 
	 * @throws {Error} If this object is instantiated directly
	 */
	constructor(device, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11DepthStencilState)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11DepthStencilState objects - use device.CreateDepthStencilState() instead");
		}

		this.#desc = desc.Copy();
	}

	/**
	 * Gets the description of this depth-stencil state
	 * 
	 * @returns {D3D11_DEPTH_STENCIL_DESC} The depth-stencil description for this state
	 */
	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return this.#desc.Copy();
	}
}


class ID3D11InputLayout extends ID3D11DeviceChild
{
	#inputElementDescs;

	constructor(device, inputElementDescs)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11InputLayout)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11InputLayout objects - use device.CreateInputLayout() instead");
		}

		// Copy array of element descs and save
		// TODO: Throw exception if param is not an array?
		this.#inputElementDescs = this.#CopyDescriptions(inputElementDescs);
	}

	#CopyDescriptions(descriptionArray)
	{
		let descs = [];
		for (let i = 0; i < descriptionArray.length; i++)
			descs[i] = descriptionArray[i].Copy();
		return descs;
	}

	GetInputElementDescs()
	{
		return this.#CopyDescriptions(this.#inputElementDescs);
	}
}


class ID3D11PixelShader extends ID3D11DeviceChild
{
	#glShader;
	#hlsl;

	constructor(device, glShader, hlsl)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11PixelShader)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11PixelShader objects - use device.CreatePixelShader() instead");
		}

		this.#glShader = glShader;
		this.#hlsl = hlsl;
	}

	GetGLShader()
	{
		return this.#glShader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#hlsl.GetCBuffers();
	}

	GetTextureSamplerCombinations()
	{
		return this.#hlsl.GetTextureSamplerCombinations();
	}

	// TODO: Do we need to scan the context for any
	// outstanding programs and delete if necessary?
	Release()
	{
		super.Release();

		// Actually remove shader if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteShader(this.#glShader);
			dev.Release();
		}
	}
}

/**
 * Holds a description for rasterizer state that you can bind to the rasterizer stage.
 */
class ID3D11RasterizerState extends ID3D11DeviceChild
{
	#desc;

	/**
	 * Creates a new rasterizer state.  Note that this should not be invoked directly.
	 * 
	 * @param {ID3D11Device} device The device that created this state
	 * @param {D3D11_RASTERIZER_DESC} desc The description of this state
	 * 
	 * @throws {Error} If this object is instantiated directly
	 */
	constructor(device, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11RasterizerState)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11RasterizerState objects - use device.CreateRasterizerState() instead");
		}

		this.#desc = desc.Copy();
	}

	/**
	 * Gets the description of this rasterizer state
	 * 
	 * @returns {D3D11_RASTERIZER_DESC} The rasterizer description for this state
	 */
	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return this.#desc.Copy();
	}
}


class ID3D11SamplerState extends ID3D11DeviceChild
{
	#desc;
	#glSamplerNoMips;
	#glSamplerWithMips;

	constructor(device, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11SamplerState)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11SamplerState objects - use device.CreateSamplerState() instead");
		}

		this.#desc = desc.Copy();

		// Create two GL samplers - with and without mips
		let gl = device.GetAdapter();
		this.#glSamplerNoMips = gl.createSampler();
		this.#glSamplerWithMips = gl.createSampler();

		// Initialize both samplers
		this.#InitializeGLSampler(device, this.#glSamplerNoMips, desc, false);
		this.#InitializeGLSampler(device, this.#glSamplerWithMips, desc, true);
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return this.#desc.Copy();
	}

	GetGLSampler(withMips)
	{
		return withMips ? this.#glSamplerWithMips : this.#glSamplerNoMips;
	}

	Release()
	{
		super.Release();

		// Actually remove sampler
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteSampler(this.#glSamplerNoMips);
			dev.GetAdapter().deleteSampler(this.#glSamplerWithMips);
			dev.Release();
		}
	}

	// Populate with description options
	// TODO: Decide how to handle MipLODBias, if at all
	#InitializeGLSampler(device, glSampler, desc, withMips)
	{
		const gl = device.GetAdapter();

		// Filtering
		gl.samplerParameteri(glSampler, gl.TEXTURE_MAG_FILTER, this.#GetGLMagFilter(gl, desc.Filter));
		gl.samplerParameteri(glSampler, gl.TEXTURE_MIN_FILTER, this.#GetGLMinFilter(gl, desc.Filter, withMips));

		// Address mode
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_S, this.#GetGLAddressMode(gl, desc.AddressU));
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_T, this.#GetGLAddressMode(gl, desc.AddressV));
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_R, this.#GetGLAddressMode(gl, desc.AddressW));

		// LOD control
		gl.samplerParameterf(glSampler, gl.TEXTURE_MIN_LOD, desc.MinLOD);
		gl.samplerParameterf(glSampler, gl.TEXTURE_MAX_LOD, desc.MaxLOD);

		// Comparison
		if (this.#IsCompareFilter(desc.Filter))
		{
			gl.samplerParameteri(glSampler, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
			gl.samplerParameteri(glSampler, gl.TEXTURE_COMPARE_FUNC,
				this.#GetGLComparisonFunc(gl, desc.ComparisonFunc));
		}

		// Anisotropy
		const anisoExt = device.CheckFeatureSupport(D3D11_JS_FEATURE_ANISOTROPIC_FILTER_SUPPORT);
		if (this.#IsAnisoFilter(desc.Filter) && anisoExt != null)
		{
			gl.samplerParameteri(glSampler, anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, desc.MaxAnisotropy);
		}
	}

	#GetGLMagFilter(gl, filter)
	{
		// 4's bit controls mag filter: 1 = linear, 0 = point
		return ((filter & 4) == 4) ? gl.LINEAR : gl.NEAREST;
	}

	#GetGLMinFilter(gl, filter, withMips)
	{
		const min = ((filter & 16) == 16) ? gl.LINEAR : gl.NEAREST;	// 1 = linear, 0 = point
		const mip = ((filter & 1) == 1) ? gl.LINEAR : gl.NEAREST;	// 1 = linear, 0 = point

		// If no mips, just use the basic min filter
		if (!withMips) return min;

		// We have mips
		if (min == gl.LINEAR && mip == gl.LINEAR) return gl.LINEAR_MIPMAP_LINEAR;
		if (min == gl.LINEAR && mip == gl.NEAREST) return gl.LINEAR_MIPMAP_NEAREST;
		if (min == gl.NEAREST && mip == gl.LINEAR) return gl.NEAREST_MIPMAP_LINEAR;
		if (min == gl.NEAREST && mip == gl.NEAREST) return gl.NEAREST_MIPMAP_NEAREST;

		throw new Error("Invalid filter");
	}

	#IsAnisoFilter(filter)
	{
		return ((filter & 64) == 64); // 64's bit is aniso on/off
	}

	#IsCompareFilter(filter)
	{
		return ((filter & 128) == 128); // 128's bit is comparison on/off
	}


	#GetGLAddressMode(gl, addr)
	{
		switch (addr)
		{
			case D3D11_TEXTURE_ADDRESS_WRAP: return gl.REPEAT;
			case D3D11_TEXTURE_ADDRESS_MIRROR: return gl.MIRRORED_REPEAT;
			case D3D11_TEXTURE_ADDRESS_CLAMP: return gl.CLAMP_TO_EDGE;
			default: throw new Error("Invalid address mode");
		}
	}

	#GetGLComparisonFunc(gl, func)
	{
		switch (func)
		{
			case D3D11_COMPARISON_NEVER: return gl.NEVER;
			case D3D11_COMPARISON_LESS: return gl.LESS;
			case D3D11_COMPARISON_EQUAL: return gl.EQUAL;
			case D3D11_COMPARISON_LESS_EQUAL: return gl.LEQUAL;
			case D3D11_COMPARISON_GREATER: return gl.GREATER;
			case D3D11_COMPARISON_NOT_EQUAL: return gl.NOTEQUAL;
			case D3D11_COMPARISON_GREATER_EQUAL: return gl.GEQUAL;
			case D3D11_COMPARISON_ALWAYS: return gl.ALWAYS;
			default: throw new Error("Invalid comparison function");
		}
	}
}


class ID3D11VertexShader extends ID3D11DeviceChild
{
	#glShader;
	#hlsl

	constructor(device, glShader, hlsl)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11VertexShader)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11VertexShader objects - use device.CreateVertexShader() instead");
		}

		this.#glShader = glShader;
		this.#hlsl = hlsl;
	}

	GetGLShader()
	{
		return this.#glShader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#hlsl.GetCBuffers();
	}

	GetTextureSamplerCombinations()
	{
		return this.#hlsl.GetTextureSamplerCombinations();
	}

	// TODO: Do we need to scan the context for any
	// outstanding programs and delete if necessary?
	Release()
	{
		super.Release();

		// Actually remove shader if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteShader(this.#glShader);
			dev.Release();
		}
	}
}


// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{
	#desc;
	#glTarget;
	#glResource;

	constructor(device, desc, glTarget, glResource)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11Buffer)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Resource objects - use corresponding Create() functions of an ID3D11Device object instead");
		}

		this.#desc = desc.Copy();
		this.#glTarget = glTarget;
		this.#glResource = glResource;
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return this.#desc.Copy();
	}

	GetGLTarget()
	{
		return this.#glTarget;
	}

	GetGLResource()
	{
		return this.#glResource;
	}
}


class ID3D11Buffer extends ID3D11Resource
{
	constructor(device, desc, glTarget, glBuffer)
	{
		super(device, desc, glTarget, glBuffer);

		// Abstract check
		if (new.target === ID3D11Buffer)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Buffer objects - use device.CreateBuffer() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteBuffer(this.GetGLResource());
			dev.Release();
		}
	}
}


class ID3D11Texture1D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture1D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture1D objects - use device.CreateTexture1D() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		// TODO: Handle distinction between texture & render buffer
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteTexture(this.GetGLResource());
			dev.Release();
		}
	}
}


class ID3D11Texture2D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture2D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture2D objects - use device.CreateTexture2D() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		// TODO: Handle distinction between texture & render buffer
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteTexture(this.GetGLResource());
			dev.Release();
		}
	}
}


class ID3D11Texture3D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture3D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture3D objects - use device.CreateTexture3D() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		// TODO: Handle distinction between texture & render buffer
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteTexture(this.GetGLResource());
			dev.Release();
		}
	}
}


// -----------------------------------------------------
// ----------------------- Views -----------------------
// -----------------------------------------------------

class ID3D11View extends ID3D11DeviceChild
{
	#resource;
	#desc;

	constructor(device, resource, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11View)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11View objects - use corresponding Create___View() functions of an ID3D11Device object instead");
		}

		this.#resource = resource;
		this.#desc = desc.Copy();

		// Add a reference to the resource
		// so the view keeps it alive
		// NOTE: This might not exactly match D3D ref count, but the
		//       overall effect should be the same!
		this.#resource.AddRef();
	}

	GetDesc()
	{
		return this.#desc.Copy();
	}

	GetResource()
	{
		this.#resource.AddRef();
		return this.#resource;
	}

	Release()
	{
		super.Release();

		// If we're done, release the resource ref, too
		if (this.GetRef() <= 0)
		{
			this.#resource.Release();
		}
	}
}


class ID3D11DepthStencilView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11DepthStencilView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11DepthStencilView objects - use device.CreateDepthStencilView() instead");
		}
	}
}


// still a work in progress until we get actual textures
class ID3D11RenderTargetView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11RenderTargetView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11RenderTargetView objects - use device.CreateRenderTargetView() instead");
		}
	}
}

// Work in progress!
class ID3D11ShaderResourceView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11ShaderResourceView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11ShaderResourceView objects - use device.CreateShaderResourceView() instead");
		}
	}
}


// -----------------------------------------------------
// ----------------------- HLSL ------------------------
// -----------------------------------------------------

const TokenUnknown = 0;
const TokenWhiteSpace = 1;
const TokenCommentMultiline = 2;
const TokenCommentSingle = 3;
const TokenOperator = 4;
const TokenIdentifier = 5;
const TokenNumericLiteral = 6;
const TokenPeriod = 7;
const TokenComma = 8;
const TokenColon = 9;
const TokenSemicolon = 10;
const TokenScopeLeft = 11;
const TokenScopeRight = 12;
const TokenParenLeft = 13;
const TokenParenRight = 14;
const TokenBracketLeft = 15;
const TokenBracketRight = 16;

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

	Position()
	{
		return this.#position;
	}

	GetRange(startInclusive, endExclusive)
	{
		if (startInclusive < 0 ||
			endExclusive >= this.#tokens.length + 1 ||
			endExclusive <= startInclusive)
			throw new Error("Invalid range for token iterator");

		return this.#tokens.slice(startInclusive, endExclusive);
	}

	PeekNext() { return this.#Peek(1); }
	PeekPrev() { return this.#Peek(-1); }

	#Peek(offset)
	{
		let peekPos = this.#position + offset;
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
	#textureSamplerCombinations;
	#functions;
	#main;

	// Statement classification
	#StatementTypeNone = 0;
	#StatementTypeExpression = 1;
	#StatementTypeIf = 2;
	#StatementTypeWhile = 3;
	#StatementTypeForA = 4;
	#StatementTypeForB = 5;
	#StatementTypeForC = 6;
	#StatementTypeReturn = 7;
	#StatementTypeDo = 8;
	#StatementTypeVarDec = 9;

	#IsControlStatement(statementType)
	{
		// Note: MUST have character after return BEFORE new line!
		return (
			statementType == this.#StatementTypeIf ||
			statementType == this.#StatementTypeWhile ||
			statementType == this.#StatementTypeForA ||
			statementType == this.#StatementTypeForB ||
			statementType == this.#StatementTypeForC
		);
	}

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
			Pattern: /^((\+=)|(-=)|(\*=)|(\/=)|(%=)|(<<)|(>>)|(&=)|(\|=)|(\^=)|(&&)|(\|\|)|(==)|(!=)|(<=)|(>=)|(\+\+)|(--))/
		},
		{
			Type: TokenOperator, // Singles
			Pattern: /^[\+\-\*\/\%\=\~\&\|\^\?\<\>\!]/
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
			Type: TokenPeriod,
			Pattern: /^[\.]/
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

	// Words that may cause problems when used as identifiers / intrinsic functions
	ReservedWords = [
		"$Global", // "Global" constant buffer name
		"input",
		"output",
		"pow"
	];

	ReservedWordConversion = {
		"$Global": "_global_cbuffer",
		"input": "_input",
		"output": "_output",
		"pow": "pow_hlsl"
	};

	// Matrix element access
	MatrixElements = [
		"_m00", "_m01", "_m02", "_m03",
		"_m10", "_m11", "_m12", "_m13",
		"_m20", "_m21", "_m22", "_m23",
		"_m30", "_m31", "_m32", "_m33",

		"_11", "_12", "_13", "_14",
		"_21", "_22", "_23", "_24",
		"_31", "_32", "_33", "_34",
		"_41", "_42", "_43", "_44"
	];

	// Conversions for matrix elements
	// - Note that HLSL is row-col and GLSL is col-row
	MatrixElementConversion = {
		"_m00": "[0][0]",
		"_m01": "[1][0]",
		"_m02": "[2][0]",
		"_m03": "[3][0]",
		"_m10": "[0][1]",
		"_m11": "[1][1]",
		"_m12": "[2][1]",
		"_m13": "[3][1]",
		"_m20": "[0][2]",
		"_m21": "[1][2]",
		"_m22": "[2][2]",
		"_m23": "[3][2]",
		"_m30": "[0][3]",
		"_m31": "[1][3]",
		"_m32": "[2][3]",
		"_m33": "[3][3]",

		"_11": "[0][0]",
		"_12": "[1][0]",
		"_13": "[2][0]",
		"_14": "[3][0]",
		"_21": "[0][1]",
		"_22": "[1][1]",
		"_23": "[2][1]",
		"_24": "[3][1]",
		"_31": "[0][2]",
		"_32": "[1][2]",
		"_33": "[2][2]",
		"_34": "[3][2]",
		"_41": "[0][3]",
		"_42": "[1][3]",
		"_43": "[2][3]",
		"_44": "[3][3]"
	}

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

	GetTextureSamplerCombinations()
	{
		// Copy!
		return this.#textureSamplerCombinations.slice();
	}

	// Read the code and tokenize
	#Tokenize()
	{
		// Reset
		this.#tokens = [];
		let lineNum = 1;

		// Make a copy of the code as we'll be substringing it
		let code = this.#hlsl.repeat(1); // Copy

		// Loop through entire string
		while (code.length > 0)
		{
			// Check each rule
			let anyMatch = false;
			for (let r = 0; r < this.Rules.length; r++)
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
						let t = {
							Type: this.Rules[r].Type,
							Text: matches[0],
							Line: lineNum,
							IsExpression: false,
							StatementType: this.#StatementTypeNone
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
		this.#textureSamplerCombinations = [];
		this.#functions = [];
		this.#main = null;

		// Create the iterator
		let it = new TokenIterator(this.#tokens);

		// Possible global cbuffer
		let globalCB = {
			Name: "$Global",
			RegisterIndex: -1,
			ExplicitRegister: false,
			Variables: []
		};

		// Work through tokens
		it.MoveNext();
		while (it.More())
		{
			let current = it.Current();

			// Farm out processing of each type
			switch (current.Text)
			{
				// TODO: Handle global constants here
				case "const":
					throw new Error("Global constants not yet implemented");

				// Skip extra end statements
				case ";":
					it.MoveNext();
					break;

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
					throw new Error("Not currently handling multisampled textures");

				default:
					// Should be a data type and the next should be an identifier
					if (!this.#IsDataType(current.Text) ||
						it.PeekNext().Type != TokenIdentifier)
						throw new Error("Invalid token in HLSL file on line " + current.Line + ": " + current.Text);

					// Check for global variable or function
					if (!this.#ParseGlobalVarOrFunction(it, globalCB))
						throw new Error("Error parsing global variable or function");

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

	#Allow(it, ...tokenTypes)
	{
		// Check each type
		for(const t of tokenTypes)
			if (it.Current().Type == t)
			{
				it.MoveNext();
				return true;
			}

		return false;
	}

	#AllowIdentifier(it, ...idents)
	{
		for (const i of idents)
			if (it.Current().Type == TokenIdentifier &&
				it.Current().Text == i)
			{
				it.MoveNext();
				return true;
			}

		return false;
	}

	#AllowOperator(it, ...operators)
	{
		for (const o of operators)
			if (it.Current().Type == TokenOperator &&
				it.Current().Text == o)
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

	#RequireOperator(it, op)
	{
		if (this.#AllowOperator(it, op))
			return true;

		throw new Error("Error parsing HLSL on line " + it.Current().Line);
	}

	#RequireIdentifier(it, ident)
	{
		if (this.#AllowIdentifier(it, ident))
			return true;

		throw new Error("Error parsing HLSL on line " + it.Current().Line);
	}

	#IsStruct(type)
	{
		// Check each struct's name
		for (let s = 0; s < this.#structs.length; s++)
			if (this.#structs[s].Name == type)
				return true;

		return false;
	}

	#IsTexture(type)
	{
		for (let t = 0; t < this.#textures.length; t++)
			if (this.#textures[t].Name == type)
				return true;

		return false;
	}

	#GetTexture(name)
	{
		for (let t = 0; t < this.#textures.length; t++)
			if (this.#textures[t].Name == name)
				return this.#textures[t];

		return null;
	}

	#IsSampler(type)
	{
		for (let s = 0; s < this.#samplers.length; s++)
			if (this.#samplers[s].Name == type)
				return true;

		return false;
	}

	#GetSampler(name)
	{
		for (let s = 0; s < this.#samplers.length; s++)
			if (this.#samplers[s].Name == name)
				return this.#samplers[s];

		return null;
	}

	#IsDataType(text)
	{
		let isStructType = this.#IsStruct(text);
		let isDataType = this.DataTypes.indexOf(text) >= 0;
		return isStructType || isDataType;
	}

	#IsReservedWord(text)
	{
		return this.ReservedWords.indexOf(text) >= 0;
	}


	#ParseVariable(it, interpModAllowed, semanticAllowed, inoutAllowed)
	{
		let variable = {
			InterpMod: null,
			DataType: null,
			ArraySize: null,
			Name: null,
			Semantic: null,
			InOut: null
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

		// Check for in/out status
		if (it.Current().Text == "in" ||
			it.Current().Text == "out" ||
			it.Current().Text == "inout")
		{
			if (!inoutAllowed)
				throw new Error("Error parsing HLSL on line " + it.Current().Line + ": in/out/inout modifier not allowed here.");

			// This is an in/out modifier
			this.#Require(it, TokenIdentifier);
			variable.InOut = it.PeekPrev().Text;
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

		// Check for array
		if (this.#Allow(it, TokenBracketLeft))
		{
			// TODO: Handle a whole expression?
			if (!this.#Allow(it, TokenNumericLiteral) &&
				!this.#Allow(it, TokenIdentifier))
				throw new Error("Error parsing HLSL on line " + it.Current().Line + ": invalid array size.");

			// Grab the array details
			variable.ArraySize = it.PeekPrev().Text;
			this.#Require(it, TokenBracketRight);
		}

		return variable;
	}


	#ParseStruct(it)
	{
		// Make the struct
		let s = {
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
			let v = this.#ParseVariable(it, true, true, false);
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
			let regText = it.Current().Text;
			if (!regText.startsWith(registerLabel))
				return -1;

			// Get index
			let index = parseInt(regText.substring(1));
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
		let cb = {
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
			let v = this.#ParseVariable(it, false, false, false);
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
		let t = {
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
		t.Name = it.PeekPrev().Text;

		// Scan for register
		t.RegisterIndex = this.#ParseRegisterIndex(it, "t");
		if (t.RegisterIndex >= 0)
		{
			// Have we found this register already?
			for (let i = 0; i < this.#textures.length; i++)
				if (this.#textures[i].RegisterIndex == t.RegisterIndex)
					throw new Error("Duplicate texture register: t" + t.RegisterIndex);

			t.ExplicitRegister = true;
		}

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return t;
	}


	#ParseSampler(it)
	{
		let s = {
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
		{
			// Have we found this register already?
			for (let i = 0; i < this.#samplers.length; i++)
				if (this.#samplers[i].RegisterIndex == s.RegisterIndex)
					throw new Error("Duplicate sampler register: s" + s.RegisterIndex);

			s.ExplicitRegister = true;
		}

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return s;
	}

	#DoesIdentifierExistInScope(ident, scopeStack)
	{
		// Go through stack
		for (let i = 0; i < scopeStack.length; i++)
		{
			// Check this scope's variables
			let currScope = scopeStack[i];
			for (let v = 0; v < currScope.Vars.length; v++)
			{
				// Found it?
				if (ident == currScope.Vars[v].Name)
					return true;
			}
		}

		// Nothing!
		return false;
	}

	#ProcessVarDecIdentifier(token, varDecType, scopeStack)
	{
		// Is it really an identifier?
		if (token.Type != TokenIdentifier)
		{
			// ERROR!
			// TODO: Throw
			console.log("ERROR - Expected identifier for variable declaration.  Found: " + token.Text);
			return false;
		}

		if (this.#DoesIdentifierExistInScope(token.Text, scopeStack))
		{
			// ERROR!
			// TODO: Throw
			console.log("ERROR - Identifier redeclaration: " + token.Text);
			return false;
		}

		// Identifier is valid, add to scope stack
		scopeStack[scopeStack.length - 1].Vars.push({
			Name: token.Text,
			DataType: varDecType
		});
		return true;
	}

	// TODO: Skip const globals in the global CB - will now handle in main parse loop
	// TODO: Handle casting differences between hlsl and glsl
	//       (float3x3)thing --> float3x3(thing)
	// TODO: Handle swizzling of non-vector types (variable.xxx)
	// TODO: auto "casting" ints to floats - maybe just make "int" versions of all functions?  UGH
	#ParseGlobalVarOrFunction(it, globalCB)
	{
		// Data type
		this.#Require(it, TokenIdentifier);
		let type = it.PeekPrev().Text;

		// Name
		this.#Require(it, TokenIdentifier);
		let name = it.PeekPrev().Text;

		// Check for parens, which means function
		if (this.#Allow(it, TokenParenLeft))
		{
			let f = {
				ReturnType: type,
				Name: name,
				Semantic: null,
				Parameters: [],
				BodyTokens: [],
				TextureFunctions: []
			};

			// It's a function, so it may have parameters
			do
			{
				let v = this.#ParseVariable(it, true, true, true);
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

			// Where are we in the iterator?
			let funcStartPos = it.Position();

			// Next should be open scope
			let scopeLevel = 1;
			this.#Require(it, TokenScopeLeft);

			// Grab the basic data of the parameters
			let params = [];
			for (let i = 0; i < f.Parameters.length; i++)
			{
				params.push({
					Name: f.Parameters[i].Name,
					DataType: f.Parameters[i].DataType
				});
			}

			// Add to the stack of variables in the current scope
			let scopeStack = [];
			scopeStack.push({
				Type: "function",
				Vars: params
			});

			// Statement classification
			let statementBlockDepth = 0;
			let statementParenDepth = 0;
			let statementType = this.#StatementTypeNone;
			let currentVarDecType = null;

			do
			{
				// Tracking data for this token
				let isControl = this.#IsControlStatement(statementType);
				let isEndOfControl = false;
				let isExpression = false;

				switch (it.Current().Text)
				{
					case "{":
						statementType = this.#StatementTypeNone;
						statementBlockDepth++;

						// Also push a new scope stack for variables
						scopeStack.push({
							Type: "{",
							Vars: []
						});
						break;

					case "}":
						statementType = this.#StatementTypeNone;
						statementBlockDepth--;

						// Verify that we're within the right scope
						if (scopeStack[scopeStack.length - 1].Type == "{")
						{
							// Yup, so end this scope
							scopeStack.pop();

							// Also end any relevant (non-do) control scope
							// to handle nested control statements with mixed {}'s
							let t = scopeStack[scopeStack.length - 1].Type;
							while (t == "if" || t == "while"  || t == "for")
							{
								scopeStack.pop();
								t = scopeStack[scopeStack.length - 1].Type;
							}
						}
						else
						{
							// TODO: Error due to imbalanced scope?
						}
						break;

					case "if":
						statementType = this.#StatementTypeIf;
						scopeStack.push({ Type: "if", Vars: [] });
						break;

					case "do":
						statementType = this.#StatementTypeDo;
						scopeStack.push({ Type: "do", Vars: [] });
						break;

					case "while":
						statementType = this.#StatementTypeWhile;
						scopeStack.push({ Type: "while", Vars: [] });
						// TODO: Handle do/while vs. while differently?  Needs some testing
						break;

					case "for":
						statementType = this.#StatementTypeForA;
						scopeStack.push({ Type: "for", Vars: [] });
						break;

					case "return":
						statementType = this.#StatementTypeReturn;
						break;

					case ";":
						// Potentially pop any control scope we run into
						// to handled nested control blocks without {}'s
						let t = scopeStack[scopeStack.length - 1].Type;
						while (t == "if" || t == "do" || t == "while" || t == "for")
						{
							scopeStack.pop();
							t = scopeStack[scopeStack.length - 1].Type;
						}

						// No more var type regardless of anything else
						// TODO: Verify this
						currentVarDecType = null;
						break;

					case ",":
						// If we're not in a function call, this should be between var declarations with a single type
						if (statementParenDepth == 0 && statementType == this.#StatementTypeVarDec)
						{
							// Validate the actual identifier associated with this variable decl
							if (!this.#ProcessVarDecIdentifier(it.PeekNext(), currentVarDecType, scopeStack))
							{
								// ERROR!
							}
						}

						break;

					case "(":
						// Are we starting a control expression?
						if (!isControl || (isControl && statementParenDepth > 0))
						{
							isExpression = true;
						}

						// Depth increment either way
						statementParenDepth++;

						break;

					case ")":
						// Depth decrement either way
						statementParenDepth--;

						// Ending a control statement
						if (isControl && statementParenDepth == 0)
						{
							// We're done with this expression and this control statement
							isEndOfControl = true;
						}
						else if (!isControl || (isControl && statementParenDepth > 0))
						{
							// Not a control statement, or it is but we're within the expression
							isExpression = true;
						}

						break;

					default:
						// If we're current set as none (presumably by a previously ended control
						// statement or scope change), then assume we're a statement
						if (statementType == this.#StatementTypeNone)
						{
							statementType = this.#StatementTypeExpression;
						}

						// Is this the start of a variable delcaration?
						// - Must be a data type
						// - Cannot be followed by start parens, which is for init: float4(1,2,3,4)
						// - Cannot be followed by end parens, as that is for casting: (type)
						if (this.#IsDataType(it.Current().Text) && it.PeekNext().Type != TokenParenLeft && it.PeekNext().Type != TokenParenRight)
						{
							// This IS an expression, it's a var dec and this is its type
							isExpression = true;
							statementType = this.#StatementTypeVarDec;
							currentVarDecType = it.Current().Text;

							// Validate the actual identifier associated with this variable decl
							if (!this.#ProcessVarDecIdentifier(it.PeekNext(), currentVarDecType, scopeStack))
							{
								// ERROR!
							}

							// Possible syntax to look for:
							// int x;
							// int x, y;
							// int x = 1;
							// int x = 1, y;
							// int x = 1, y = 2;
							// int x, y = 1;
							// int x = func();
							// int x = func(), y = func();
							// Etc.
							// Also: int x = 1, y = x; // Should work!

							//console.log("DATA TYPE: " + it.Current().Text);
						}

						// Everything else is an expression
						isExpression = true;
						break;
				}

				// Afterwards, record the statement type
				it.Current().StatementType = statementType;

				// If we've ended a control statement, reset type AFTER recording
				if (isEndOfControl)
				{
					statementType = this.#StatementTypeNone;
				}
				else if (it.Current().Type == TokenSemicolon)
				{
					// If we're a semicolon in a for loop, move ahead AFTER classification
					if (statementType == this.#StatementTypeForA ||
						statementType == this.#StatementTypeForB)
						statementType++; // Move to the next "for" type
				}

				// Record the expression status
				it.Current().IsExpression = isExpression;

				// Check for texture object function call, which occurs
				// when a texture identifier is followed immediately by a period
				let startPos = it.Position();
				this.#CheckAndParseTextureObjectFunction(it, f, funcStartPos);
				let endPos = it.Position();

				// Did we find a texture
				if (startPos < endPos)
				{
					// Need to update all
					let range = it.GetRange(startPos, endPos);
					for (let i = 0; i < range.length; i++)
					{
						range[i].IsExpression = true;
						range[i].StatementType = this.#StatementTypeExpression;
					}
				}

				// Check for scope change and skip everything else
				if (this.#Allow(it, TokenScopeLeft))
					scopeLevel++;
				else if (this.#Allow(it, TokenScopeRight))
					scopeLevel--;
				else
					it.MoveNext();
			}
			while (scopeLevel >= 1);

			// Function is over, where did we end up?
			// Add all of the tokens to the function body
			let funcEndPos = it.Position();
			f.BodyTokens = it.GetRange(funcStartPos, funcEndPos);

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

			// Now that we're done, go back and build all expression trees
			// for the expressions within this function
			this.#BuildAllExpressionTrees(f.BodyTokens);

			// Found something useful
			return true;
		}
		else if (this.#Allow(it, TokenSemicolon))
		{
			// Should be end of a variable, so add to the global cbuffer
			let v = {
				InterpMod: null,
				DataType: type,
				Name: name,
				Semantic: null
			};
			globalCB.Variables.push(v); // Note: main loop will do MoveNext

			// Found a global variable
			return true;
		}

		// Unsuccessful parse
		return false;
	}



	// EXPRESSION PARSING IDEAS
	// - Resources:
	//   - https://craftinginterpreters.com/parsing-expressions.html
	//   - https://www.engr.mun.ca/~theo/Misc/exp_parsing.htm
	//
	// - Need to denote all expressions so we can convert ints to floats where necessary
	// - ALMOST all ints can be changed into floats, except...
	//   - When a function requires an int (SampleLevel? Custom helpers (UGH))
	//   - Integer division
	//   - Bitwise operations on ints
	// - Expression locations:
	//   - Full lines (without control flow or loop)
	//   - Inside ()'s: funcCall(EXPRESSION), etc.
	//   - Between commas: funcCall(EXPRESSION, EXPRESSION, etc.)
	//   - For loop statements: for(EXPRESSION; EXPRESSION; EXPRESSION) - Note: also supports commas!
	//   - If: if(EXPRESSION)
	//   - While: while(EXPRESSION), do { } while(EXPRESSION)
	//   - return statement: return EXPRESSION;

	// Expression object details
	// {
	//   Type --> One of:
	//     - Assignment
	//     - Binary
	//     - FunctionCall
	//     - Grouping
	//     - Literal
	//     - Logical
	//     - Unary
	//     - Variable
	//
	//   Data --> Depends on Type:
	//     - Assignment
	//       - Var: Token of variable being assigned
	//       - Exp: Expression on right side of assignment
	//     - Binary
	//       - Left: Expression
	//       - Operator: The token itself
	//       - Right: Expression
	//     - FunctionCall
	//       - Func: Expression
	//       - Args: Array of expressions
	//     - Grouping
	//       - Exp: Expression inside grouping
	//     - Literal
	//       - Token: The token itself
	//     - Logical
	//       - Left: Expression
	//       - Operator: The token itself
	//       - Right: Expression
	//     - Unary
	//       - Operator: The token itself
	//       - Right: Expression
	//     - Variable
	//       - Var: Token of variable being assigned
	// }
	//
	// Statement object details
	// {
	//   Type --> One of:
	//     - Block
	//     - DoWhile
	//     - Expression
	//     - For
	//     - If
	//     - Return
	//     - VariableDeclaration
	//     - While
	//
	//   Data --> Depends on Type:
	//     - Block
	//       - Statements: Array of statements
	//     - DoWhile
	//       - Body: Statement
	//       - Condition: Expression
	//     - Expression
	//       - Exp: Expression
	//     - For
	//       - Init: Expression (or array?)
	//       - Condition: Expression
	//       - Iterator: Expression (or array?)
	//       - Body: Statement
	//     - If
	//       - Condition: Expression
	//       - If: Statement
	//       - Else: Statement
	//     - Return
	//       - Return: Token of return keyword
	//       - Exp: Expression for return
	//     - VariableDeclaration
	//       - DataType: Token
	//       - Var: Token
	//       - Exp: Expression on right side of assignment (if any)
	//     - While
	//       - Condition: Expression
	//       - Body: Statement
	// }


	// Expression precedence (reverse order)
	//  15: Comma (between function params)
	//  14: Assignments (are these all the same?)
	//       =
	//       += -=
	//       *= /= %=
	//       <<= >>=
	//       &= ^= |=
	//     - Note: Right-to-left associativity
	//  13: ?: (ternary)
	//     - Note: Right-to-left associativity
	//  12: ||
	//  11: &&
	//  10: |
	//  9: ^
	//  8: &
	//  7: == !=
	//  6: < <= > >=
	//  5: << >>
	//  4: + - (regular add/subtract)
	//  3: * / %
	//  2: prefix: ++ --, unary: + -, not: ! ~, cast: (type)
	//     - Note: Right-to-left associativity
	//  1: postfix: ++ --, function call: ( ), array: [ ], member access: .
	//  0: literals/variables/grouping

	#ParseExpression(it)
	{
		return this.#ParseAssignment(it);
	}

	#ParseAssignment(it)
	{
		// Look for next expression precedence first (OR)
		let exp = this.#ParseTernary(it);

		// Now look for assignment
		if (this.#AllowOperator(it, "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", "&=", "^=", "|="))
		{
			// Was the expression above a variable?
			if (!(exp instanceof ExpVariable))
			{
				throw new Error("Expected variable for assignment");
			}

			// Previous token is a variable, so parse the assignment
			return new ExpAssignment(
				exp.VarToken, // Grab token from variable expression
				this.#ParseAssignment(it));
		}

		// No assignment operator found
		return exp;
	}

	#ParseTernary(it)
	{
		// Grab the expression first
		let exp = this.#ParseLogicalOr(it);

		// Check for "?" operator
		if (this.#AllowOperator(it, "?"))
		{
			// The next piece should be the "if" expression
			let expIf = this.#ParseTernary(it);

			// Now we must have a ":"
			if (this.#RequireOperator(it, ":"))
			{
				// Last is the "else" expression
				let expElse = this.#ParseTernary(it);

				return new ExpTernary(
					exp,
					expIf,
					expElse);
			}
			else
			{
				throw new Error("Expected ':' ternary operator");
			}
		}

		// No ternary
		return exp;
	}

	#ParseLogicalOr(it)
	{
		// Grab starting expression
		let exp = this.#ParseLogicalAnd(it);

		// Keep going while we have ORs
		while (this.#AllowOperator(it, "||"))
		{
			exp = new ExpLogical(
				exp,
				it.PeekPrev(),
				this.#ParseLogicalAnd(it));
		}

		return exp;
	}

	#ParseLogicalAnd(it)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseOr(it);

		// Keep going while we have ANDs
		while (this.#AllowOperator(it, "&&"))
		{
			exp = new ExpLogical(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseOr(it));
		}

		return exp;
	}

	#ParseBitwiseOr(it)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseXor(it);

		// Keep going while we have ORs
		while (this.#AllowOperator(it, "|"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseXor(it));
		}

		return exp;
	}

	#ParseBitwiseXor(it)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseAnd(it);

		// Keep going while we have XORs
		while (this.#AllowOperator(it, "^"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseAnd(it));
		}

		return exp;
	}

	#ParseBitwiseAnd(it)
	{
		// Grab starting expression
		let exp = this.#ParseEquality(it);

		// Keep going while we have ANDs
		while (this.#AllowOperator(it, "&"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseEquality(it));
		}

		return exp;
	}

	#ParseEquality(it)
	{
		// Grab starting expression
		let exp = this.#ParseComparison(it);

		// Keep going while we have comparisons
		while (this.#AllowOperator(it, "==", "!="))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseComparison(it));
		}

		return exp;
	}

	#ParseComparison(it)
	{
		// Grab starting expression
		let exp = this.#ParseShift(it);

		// Keep going while we have comparisons
		while (this.#AllowOperator(it, "<", "<=", ">", ">="))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseShift(it));
		}

		return exp;
	}

	#ParseShift(it)
	{
		// Grab starting expression
		let exp = this.#ParseAddSubtract(it);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "<<", ">>"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseAddSubtract(it));
		}

		return exp;
	}

	#ParseAddSubtract(it)
	{
		// Grab starting expression
		let exp = this.#ParseMulDivMod(it);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "+", "-"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseMulDivMod(it));
		}

		return exp;
	}

	#ParseMulDivMod(it)
	{

	}

	// TODO: Handle postfix, prefix, etc.

	#ParseUnary(it)
	{
		// Check for possible unary operators
		if (this.#AllowOperator(it, "+", "-", "!", "~"))
		{
			return new ExpUnary(
				it.PeekPrev(), // Token we just allowed
				this.#ParseUnary(it)); // Next parse, which could be another unary or, operand, or grouping
		}

		// Not a unary, so check operand or grouping
		return this.#ParseOperandOrGrouping(it);
	}


	#ParseOperandOrGrouping(it)
	{
		let t = it.Current();

		// Check for true, false or numbers
		if (this.#AllowIdentifier(it, "true", "false") ||
			this.#Allow(it, TokenNumericLiteral))
		{
			return new ExpLiteral(it.PeekPrev());
		}

		// Check for variables
		if (this.#Allow(it, TokenIdentifier))
		{
			return new ExpVariable(it.PeekPrev());
		}

		// Check for grouping symbols
		if (this.#Allow(it, TokenParenLeft))
		{
			// Grab expression
			let exp = this.#ParseExpression(it);

			// Must be followed by a right parens
			this.#Require(TokenParenRight);

			// Create a grouping expression
			return new ExpGroup(exp);
		}

		// Problem! TODO: Better error details
		throw new Error("Invalid token detected");
	}














	#BuildAllExpressionTrees(tokens)
	{
		// Loop through all the given tokens and build expression trees
		let expStart = -1;
		for (let i = 0; i < tokens.length; i++)
		{
			// If we're not in an expression and one begins, save the start position
			if (expStart == -1 && tokens[i].IsExpression)
				expStart = i;

			// If we have an expression but this token is NOT one, we found the end
			if (expStart >= 0 && !tokens[i].IsExpression)
			{
				this.#BuildExpressionTree(tokens, expStart, i - 1);
				expStart = -1; // Reset expression
			}
		}

	}

	#BuildExpressionTree(tokens, start, end)
	{
		// TOOD: Set up operator priority (should match C)
		// 1: postfix: ++ --, function call: ( ), array: [ ], member access: .
		// 2: prefix: ++ --, unary: + -, not: ! ~, cast: (type)
		//    - Note: Right-to-left associativity
		// 3: * / %
		// 4: + - (regular add/subtract)
		// 5: << >>
		// 6: < <= > >=
		// 7: == !=
		// 8: &
		// 9: ^
		// 10: |
		// 11: &&
		// 12: ||
		// 13: ?: (ternary)
		//    - Note: Right-to-left associativity
		// 14: Assignments (are these all the same?)
		//      =
		//      += -=
		//      *= /= %=
		//      <<= >>=
		//      &= ^= |=
		//    - Note: Right-to-left associativity
		// 15: Comma (between function params)


		// https://leetcode.ca/2020-04-14-1597-Build-Binary-Expression-Tree-From-Infix-Expression/

		// Stacks for shunting
		let symbolStack = [];
		let nodeStack = [];

		for (let i = start; i <= end; i++)
		{
			// Grab the current token
			let t = tokens[i];

			// Check type
			if (t.Type == TokenParenLeft)
			{
				symbolStack.push(t);
			}
			else if (t.Type == TokenNumericLiteral || t.Type == TokenIdentifier)
			{
				
			}
			else if (t.Type == TokenParenRight)
			{

			}
			else if (t.Type == TokenOperator)
			{

			}

		}
	}

	// Levels:
	// - ParseBlock()
	//   - Could be { }'s
	//   - Could be a single statement
	//
	// - ParseStatement()
	//   - Could be single line of code ending with ;
	//   - Could be if/elseif/else, do, while, for, switch
	//   - Could be a single ; (as a typo probably?)
	//
	// - ParseExpression()
	//   - Optional prefix operator (+, -, ++, --, !, ~, etc.)
	//   - Optional grouping: ( )
	//   - At least one operand: literal, variable, function call
	//   - Optionally followed by an operator
	//     - If so, more of grouping/prefix/operand
	//   - Optionally more operators, etc.


	// Check the current token to see if we're at the beginning of a texture
	// object function call, and if so, store that info
	//
	// Texture Sampling Function Details:
	//
	// Sample(sampler, uv, [offset])
	// SampleLevel(sampler, uv, LOD, [offset])
	// SampleCmp(sampler, uv, compare, [offset], [clamp])
	// SampleCmpLevelZero(sampler, uv, compare, [offset])
	// SampleBias(sampler, uv, bias, [offset], [clamp])
	// SampleGrad(sampler, uv, ddx, ddy, [offset], [clamp])
	//
	// GLSL Equivalent
	//  - Note: Offset param is handled through ___Offset() functions, like textureLodOffset()
	// Sample(samp, uv) -> texture(samp, uv)
	// SampleLevel(samp, uv, lod) -> textureLod(samp, uv, lod)
	// SampleCmp() -> texture(samp, vec3(uv, compare)) // UGH
	// SampleCmpLevelZero() -> textureLod(samp, vec3(uv, compare), 0)
	// SampleGrad() -> textureGrad(samp, uv, ddx, ddy)
	// SampleBias() -> texture(samp, uv, bias)
	// Etc.

	#CheckAndParseTextureObjectFunction(it, baseFunc, relativePosOffset)
	{
		// Record start position in the event this is a texture object function
		// Note that all positions here are relative to the function body
		let overallStartPos = it.Position() - relativePosOffset;

		// Must start with a texture identifier
		if (it.Current().Type != TokenIdentifier ||
			!this.#IsTexture(it.Current().Text))
			return;

		// This is a valid texture, cache and move past
		let textureName = it.Current().Text;
		it.MoveNext();

		// It's a texture, so we need a period next
		if (!this.#Allow(it, TokenPeriod))
			return;

		// We have the pattern [textureName][.], so next must be an identifier
		this.#Require(it, TokenIdentifier);
		let textureFuncName = it.PeekPrev().Text;
		
		// Which kind of function?
		// TODO: Handle all the permutations (SO MANY)
		//       See list of objects & functions here: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/d3d11-graphics-reference-sm5-objects
		switch (textureFuncName)
		{
			case "Sample":
				// Pixel shader only!!!
				if (this.#shaderType != ShaderTypePixel)
					throw new Error("'Sample' function only valid in pixel shaders");
				break;

			case "SampleLevel": break; // Valid in either shader, just skip

			default:
				throw new Error("Texture function '" + textureFuncName + "' not yet implemented!");
		}

		// Need left parens, then sampler
		// TODO: Handle expression that evaluations to a sampler, like a function call?
		// NOTE: Just checked - HLSL requires sampler param to come from a literal expression!
		//       Could be a function call that returns a literal, but we'll just disallow for now.
		this.#Require(it, TokenParenLeft);
		this.#Require(it, TokenIdentifier)
		let samplerName = it.PeekPrev().Text;

		// Verify sampler
		if (!this.#IsSampler(samplerName))
			throw new Error("Invalid sampler state '" + samplerName + "' in texture function");

		// Next is comma
		this.#Require(it, TokenComma);

		// At this point, there should be at least one more, but potentially 
		// several more, arguments to the function call.  The first is always 
		// UV coords, but the rest depend on the exact texture function called.
		let paramExpressions = [];
		let paramIndex = 1; // Skip first, since that's the sampler
		let currentParamStartPos = it.Position() - relativePosOffset;
		let currentParamEndPos = currentParamStartPos; // Will be changed below

		// An entire expression that (theoretically) evaluates to texture
		// coords, including another texture sample!
		//let uvExpressionStartPos = it.Position() - relativePosOffset;
		let parenDepth = 1;

		do
		{
			// Check for a sub-texture function
			this.#CheckAndParseTextureObjectFunction(it, baseFunc, relativePosOffset);

			// Check for paren depth changes
			if (this.#Allow(it, TokenParenLeft))
			{
				parenDepth++;
			}
			else if (this.#Allow(it, TokenParenRight))
			{
				parenDepth--;
			}
			else if (parenDepth == 1 && this.#Allow(it, TokenComma))
			{
				// We've moved to the next parameter, so calculate the proper end pos
				currentParamEndPos = it.Position() - relativePosOffset - 1;
				paramExpressions[paramIndex] = { StartPos: currentParamStartPos, EndPos: currentParamEndPos };
				paramIndex++;

				// New start pos (will include commas!)
				currentParamStartPos = it.Position() - relativePosOffset;
			}
			else
			{
				it.MoveNext();
			}
		} while (parenDepth >= 1);

		// Finalize last parameter
		currentParamEndPos = it.Position() - relativePosOffset - 1;
		paramExpressions[paramIndex] = { StartPos: currentParamStartPos, EndPos: currentParamEndPos };

		// We've ended the overall function with a right paren
		// so store the end location and finalize this data
		let overallEndPos = it.Position() - relativePosOffset; // Should include the end parens

		// Set up the texture/sampler combination
		let combination = this.#GetOrCreateTextureSamplerCombination(textureName, samplerName);

		// Grab the texture type, too
		let textureType = "";
		for (let i = 0; i < this.#textures.length; i++)
			if (this.#textures[i].Name == textureName)
				textureType = this.#textures[i].Type;
		
		// Set up the overall texture function details and add to the base function
		let texFunc = {
			TextureSamplerCombination: combination,
			FunctionName: textureFuncName,
			TextureType: textureType,
			StartPosition: overallStartPos,
			EndPosition: overallEndPos,
			ParamExpressions: paramExpressions
		};
		baseFunc.TextureFunctions.push(texFunc);
	}

	#GetOrCreateTextureSamplerCombination(textureName, samplerName)
	{
		// Check for this combination first
		let combinedName = "combined_" + textureName + "_" + samplerName;
		for (let i = 0; i < this.#textureSamplerCombinations.length; i++)
			if (this.#textureSamplerCombinations[i].CombinedName == combinedName)
				return this.#textureSamplerCombinations[i];

		// Not present yet, so create and save
		let combination = {
			TextureName: textureName,
			SamplerName: samplerName,
			CombinedName: combinedName,
			Texture: this.#GetTexture(textureName),
			Sampler: this.#GetSampler(samplerName)
		};
		this.#textureSamplerCombinations.push(combination);
		return combination;
	}


	#RegisterExists(elements, registerIndex)
	{
		for (let e = 0; e < elements.length; e++)
		{
			if (elements[e].RegisterIndex == registerIndex)
				return true;
		}

		return false;
	}

	#ResolveImplicitRegisters(elements, maxRegisters)
	{
		// The current index for an implicit register
		let currentIndex = 0;

		for (let e = 0; e < elements.length; e++)
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
		for (let s = 0; s < this.#structs.length; s++)
			if (this.#structs[s].Name == name)
				return this.#structs[s];

		return null;
	}

	#Translate(identifier)
	{
		if (this.#IsDataType(identifier) && !this.#IsStruct(identifier))
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
			let stripSize = 1;
			if (token.Text.charAt(token.Text.length - 2) == ".")
				stripSize = 2;

			return token.Text.substring(0, token.Text.length - stripSize);
		}
		else
		{
			return this.#Translate(token.Text);
		}
	}

	#GetHLSLOnlyFunctions()
	{
		let glsl = "";

		glsl += "mat4 mul(mat4 m1, mat4 m2){ return m1 * m2; }\n";
		glsl += "vec4 mul(vec4 v, mat4 m){ return v * m; }\n";
		glsl += "vec4 mul(mat4 m, vec4 v){ return m * v; }\n\n";

		glsl += "mat3 mul(mat3 m1, mat3 m2){ return m1 * m2; }\n";
		glsl += "vec3 mul(vec3 v, mat3 m){ return v * m; }\n";
		glsl += "vec3 mul(mat3 m, vec3 v){ return m * v; }\n\n";

		glsl += "mat2 mul(mat2 m1, mat2 m2){ return m1 * m2; }\n";
		glsl += "vec2 mul(vec2 v, mat2 m){ return v * m; }\n";
		glsl += "vec2 mul(mat2 m, vec2 v){ return m * v; }\n\n";

		glsl += "float saturate(float x) { return clamp(x, 0.0, 1.0); }\n";
		glsl += "vec2 saturate(vec2 x) { return clamp(x, 0.0, 1.0); }\n";
		glsl += "vec3 saturate(vec3 x) { return clamp(x, 0.0, 1.0); }\n";
		glsl += "int saturate(int x) { return clamp(x, 0, 1); }\n\n";

		glsl += "float lerp(float a, float b, float t) { return mix(a, b, t); }\n";
		glsl += "vec2 lerp(vec2 a, vec2 b, float t) { return mix(a, b, t); }\n";
		glsl += "vec2 lerp(vec2 a, vec2 b, vec2 t) { return mix(a, b, t); }\n";
		glsl += "vec3 lerp(vec3 a, vec3 b, float t) { return mix(a, b, t); }\n";
		glsl += "vec3 lerp(vec3 a, vec3 b, vec3 t) { return mix(a, b, t); }\n\n";

		glsl += "void sincos(float a, out float s, out float c) { s = sin(a); c = cos(a); }\n\n";

		glsl += "float atan2(float a, float b) { return atan(b, a); }\n\n";

		glsl += "float pow_hlsl(float a, float b) { return pow(a, b); }\n";
		glsl += "vec2 pow_hlsl(vec2 v, float f) { return pow(v, vec2(f)); }\n";
		glsl += "vec3 pow_hlsl(vec3 v, float f) { return pow(v, vec3(f)); }\n";
		glsl += "vec4 pow_hlsl(vec4 v, float f) { return pow(v, vec4(f)); }\n";

		glsl += "\n";
		return glsl;
	}

	#GetMatrixConstructors()
	{
		let glsl = "";

		// Simple casting 2x2
		glsl += "mat2 float2x2_tr(mat2 m) { return mat2(m); }\n";
		glsl += "mat2 float2x2_tr(mat3 m) { return mat2(m); }\n";
		glsl += "mat2 float2x2_tr(mat4 m) { return mat2(m); }\n";

		// Simple casting 3x3
		glsl += "mat3 float3x3_tr(mat2 m) { return mat3(m); }\n";
		glsl += "mat3 float3x3_tr(mat3 m) { return mat3(m); }\n";
		glsl += "mat3 float3x3_tr(mat4 m) { return mat3(m); }\n";

		// Simple casting 3x3
		glsl += "mat4 float4x4_tr(mat2 m) { return mat4(m); }\n";
		glsl += "mat4 float4x4_tr(mat3 m) { return mat4(m); }\n";
		glsl += "mat4 float4x4_tr(mat4 m) { return mat4(m); }\n";

		// Transpose vector-stacking versions
		glsl += "mat2 float2x2_tr(vec2 a, vec2 b) { return transpose(mat2(a,b)); }\n";
		glsl += "mat3 float3x3_tr(vec3 a, vec3 b, vec3 c) { return transpose(mat3(a,b,c)); }\n";
		glsl += "mat4 float4x4_tr(vec4 a, vec4 b, vec4 c, vec4 d) { return transpose(mat4(a,b,c,d)); }\n\n";

		glsl += "\n";
		return glsl;
	}

	#ConvertVertexShader()
	{
		let glsl = "#version 300 es\n\n";
		let vsInputs = this.#GetVSInputs();

		// Append each type of shader element
		glsl += this.#GetAttributesString(vsInputs);
		glsl += this.#GetVSVaryings();
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHLSLOnlyFunctions();
		glsl += this.#GetMatrixConstructors();
		glsl += this.#GetTextureSamplerString();
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
		let vsInputs = [];
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];

			// If this is a data type, we have to scan the whole thing
			if (this.#IsStruct(param.DataType))
			{
				let struct = this.#GetStructByName(param.DataType);
				if (struct == null)
					throw new Error("Invalid data type in vertex shader input");

				// Add each struct member to the VS input
				for (let v = 0; v < struct.Variables.length; v++)
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
		let attribs = "";

		for (let i = 0; i < vsInputs.length; i++)
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
		if (!this.#IsStruct(this.#main.ReturnType))
			return "";

		// Grab the struct and put together varyings
		let struct = this.#GetStructByName(this.#main.ReturnType);
		let vary = "";

		for (let v = 0; v < struct.Variables.length; v++)
		{
			let member = struct.Variables[v];

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
		let str = "";

		for (let s = 0; s < this.#structs.length; s++)
		{
			// Start the struct
			let struct = this.#structs[s];
			str += "struct " + this.#Translate(struct.Name) + "\n";
			str += "{\n";

			// Handle each variable (no semantics)
			for (let v = 0; v < struct.Variables.length; v++)
			{
				let variable = struct.Variables[v];
				str += "\t" + this.#Translate(variable.DataType); // Datatype
				str += " " + this.#Translate(variable.Name); // Identifier

				// Array?
				if (variable.ArraySize != null)
				{
					str += "[" + variable.ArraySize + "]";
				}
				str += ";\n"; // Finished
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
		let cbStr = "";

		for (let c = 0; c < this.#cbuffers.length; c++)
		{
			// Start the uniform block
			let cb = this.#cbuffers[c];
			cbStr += "layout(std140) uniform " + this.#Translate(cb.Name) + "\n";
			cbStr += "{\n";

			// Handle each variable (no semantics)
			for (let v = 0; v < cb.Variables.length; v++)
			{
				let variable = cb.Variables[v];
				cbStr += "\t" + this.#Translate(variable.DataType); // Datatype
				cbStr += " " + this.#Translate(variable.Name); // Identifier

				// Array?
				if (variable.ArraySize != null)
				{
					cbStr += "[" + variable.ArraySize + "]";
				}
				cbStr += ";\n"; // Finished
			}

			// End the block
			cbStr += "};\n\n";
		}

		return cbStr;
	}

	// TODO: Handle all different types of samplers
	#GetTextureSamplerString()
	{
		if (this.#textureSamplerCombinations.length == 0)
			return "";

		let glsl = "";

		// Loop through all combinations of textures & samplers
		for (let i = 0; i < this.#textureSamplerCombinations.length; i++)
		{
			let comb = this.#textureSamplerCombinations[i];

			// TODO: Handle more types
			let samplerType;
			switch (comb.Texture.Type)
			{
				case "Texture1D":
				case "Texture2D":
					samplerType = "sampler2D";
					break;

				case "Texture3D":
					samplerType = "sampler3D";
					break;

				case "TextureCube":
					samplerType = "samplerCube";
					break;

				default:
					throw new Error("Texture type '" + comb.Texture.Type + "' not implemented yet!");
			}

			// Set up the uniform
			glsl += "uniform " + samplerType + " " + comb.CombinedName + ";\n";
		}

		glsl += "\n";
		return glsl;
	}


	#GetFunctionString(func, prependName = "")
	{
		let newFuncName = prependName + func.Name;
		let funcStr = "";

		// Start the function
		funcStr += this.#Translate(func.ReturnType); // Data type
		funcStr += " " + this.#Translate(newFuncName) + "("; // Identifier

		// Parameters
		for (let p = 0; p < func.Parameters.length; p++)
		{
			let param = func.Parameters[p];

			// Any in/out?
			if (param.InOut != null)
				funcStr += param.InOut + " ";

			funcStr += this.#Translate(param.DataType); // Data type
			funcStr += " " + this.#Translate(param.Name); // Identifier

			if (p < func.Parameters.length - 1)
				funcStr += ", ";
		}

		// End header
		funcStr += ")";

		// Body (including scope!)
		let it = new TokenIterator(func.BodyTokens);
		let indent = 0;
		let parenDepth = 0;
		while (it.MoveNext())
		{
			// Get current
			let t = it.Current();

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

			// Look for matrix constructors
			funcStr += this.#GetMatrixConstructorString(it);

			// Determine if the current token is a texture function
			// TODO: Optimize this so we're not doing linear searches on every token
			funcStr += this.#GetTextureFunctionString(it, func);
			t = it.Current(); // Update current in the event we've moved! (this feels dirty)

			// Track parens (due to for loops)
			// NOTE: Moved this below texture function - really just need it before newline check below
			switch (t.Type)
			{
				case TokenParenLeft: parenDepth++; break;
				case TokenParenRight: parenDepth--; break;
			}

			// Is this a matrix element?
			const matElementReplacement = this.#GetMatrixElementConversion(it);
			if (matElementReplacement.length > 0)
			{
				// Replacing the period and matrix element (like "._m00")
				// with the GLSL-style array access (like "[0][0]")
				funcStr += matElementReplacement;

				// Skip the period, but not the identifier part
				// as that'll get skipped by the loop
				it.MoveNext();
			}
			else
			{
				// Add the token
				funcStr += this.#TranslateToken(t);
			}

			// Extra spaces?
			if (t.Type == TokenIdentifier)
			{
				if (t.Text == "return" ||
					t.Text == "case" ||
					it.PeekNext().Type == TokenIdentifier) // Always put a space between double identifier
					funcStr += " ";
			}

			// New line?
			if ((t.Type == TokenSemicolon && parenDepth == 0) ||	// End of line, but not within "for loops"
				t.Type == TokenScopeLeft ||
				t.Type == TokenScopeRight)
				funcStr += "\n";
		}

		// End body
		funcStr += "\n";
		return funcStr;
	}

	// TODO: Make constants/arrays for these translations
	#GetMatrixConstructorString(it)
	{
		// Is this an identifier with a left paren?  If not, skip
		if (it.Current().Type != TokenIdentifier ||
			it.PeekNext().Type != TokenParenLeft)
			return "";

		// We have the "ident(" pattern, check for matrix constructors
		let ident = it.Current().Text;
		let replace = "";
		switch (ident)
		{
			case "float2x2": replace = "float2x2_tr"; break;
			case "float3x3": replace = "float3x3_tr"; break;
			case "float4x4":
			case "matrix": replace = "float4x4_tr"; break;
			default: return "";
		}

		// We definitely have the proper pattern, skip the identifier
		this.#Require(it, TokenIdentifier);
		return replace;
	}

	#GetMatrixElementConversion(it)
	{
		// If we're not a period followed by an identifier, skip
		if (it.Current().Type != TokenPeriod ||
			it.PeekNext().Type != TokenIdentifier)
			return "";

		// We have the ".ident" pattern, check for matrix elements
		const elementText = it.PeekNext().Text;
		const elementIndex = this.MatrixElements.indexOf(elementText);
		if (elementIndex == -1)
			return ""; // Not a matrix element

		// It definitely is a matrix element, so return the replacement
		return this.MatrixElementConversion[elementText];
	}

	#GetTextureFunctionString(it, baseFunc)
	{
		// Any functions, and is this an identifier?
		if (baseFunc.TextureFunctions.length == 0 ||
			it.Current().Type != TokenIdentifier)
			return "";

		// Do any of the texture functions start here?
		let currentPos = it.Position();
		let whichTexFunc = null;
		for (let i = 0; i < baseFunc.TextureFunctions.length; i++)
		{
			if (baseFunc.TextureFunctions[i].StartPosition == currentPos)
			{
				whichTexFunc = baseFunc.TextureFunctions[i];
				break;
			}
		}

		// Anything?
		if (whichTexFunc == null)
			return "";

		let glslTextureFunc = "";
		switch (whichTexFunc.FunctionName)
		{
			case "Sample": glslTextureFunc = "texture"; break;
			case "SampleLevel": glslTextureFunc = "textureLod"; break;
			default:
				throw new Error("Sample function type not yet implemented!");
		}

		// We have at least one function and we're at the right position
		let texFuncStr = glslTextureFunc + "(" + whichTexFunc.TextureSamplerCombination.CombinedName + ", ";

		// What type of texture?
		// TODO: Handle other, similar texture types
		if (whichTexFunc.TextureType == "Texture1D")
		{
			// 1D textures are really just 2D textures with a height of 1, so we need
			// to wrap the single (float) value in a vec2(v, 0)
			texFuncStr += "vec2(";
		}
		else if (whichTexFunc.TextureType == "Texture2D")
		{
			// Add in extra UV work to flip Y
			// - What we want is: uv.y = 1 - uv.y
			// - For that, we'll do: (0,1) + (1,-1) * uvExpression
			texFuncStr += "vec2(0.0, 1.0) + vec2(1.0, -1.0) * (";
		}
		else if (whichTexFunc.TextureType == "Texture3D")
		{
			// Add in extra UV work to flip Y
			// - What we want is: uv.y = 1 - uv.y
			// - For that, we'll do: (0,1,0) + (1,-1,0) * uvExpression
			texFuncStr += "vec3(0.0, 1.0, 0.0) + vec3(1.0, -1.0, 1.0) * (";
		}
		else if (whichTexFunc.TextureType == "TextureCube")
		{
			// Just flip the Y for the cube direction
			texFuncStr += "vec3(1.0, -1.0, 1.0) * (";
		}

		// Skip ahead to the first post-Sampler expression (UV location)
		while (it.Position() < whichTexFunc.ParamExpressions[1].StartPos)
			it.MoveNext();

		// Handle all expressions
		let expressionIndex = 1;
		while (expressionIndex < whichTexFunc.ParamExpressions.length)
		{
			// Handle current expression, which may require a recursive call
			while (it.Position() < whichTexFunc.ParamExpressions[expressionIndex].EndPos)
			{
				// Determine if we've got a sub-texture-function
				texFuncStr += this.#GetTextureFunctionString(it, baseFunc);

				// Handle the remaining tokens
				texFuncStr += this.#TranslateToken(it.Current());

				// Skip ahead
				it.MoveNext();
			}

			// Is this the UV expression (index 1)?  If so, we're flipping Y, so end the () wrapper
			if (expressionIndex == 1)
			{ 
				// Are we ending a wrapper on coords for a particular type?
				if (whichTexFunc.TextureType == "Texture1D")
				{
					// 1D textures need an extra coord since they're really just 2D textures
					// Finish the uCoord --> vec2(uCoord, 0.5) wrapper
					texFuncStr += ", 0.5)";
				}
				else if (
					whichTexFunc.TextureType == "Texture2D" ||
					whichTexFunc.TextureType == "Texture3D" ||
					whichTexFunc.TextureType == "TextureCube")
				{
					// Finish the wrapper to flip the Y
					texFuncStr += ")";
				}
			}

			// Move to the next
			expressionIndex++;
		}

		// End the function by moving past the end parens and adding it
		it.MoveNext();
		texFuncStr += ")";
		
		return texFuncStr;
	}

	#GetHelperFunctionsString()
	{
		let functions = "";
		for (let f = 0; f < this.#functions.length; f++)
			functions += this.#GetFunctionString(this.#functions[f]);
		return functions;
	}

	#BuildVertexShaderMain(vsInputs)
	{
		let main = "void main()\n";
		main += "{\n";

		// Create a variable for each vs input
		// NOTE: This could be skipped and the attributes could be 
		//       directly set to the variables/structs below
		for (let v = 0; v < vsInputs.length; v++)
		{
			// Handle SV_VertexID separately
			// Note that in OpenGL, this is an INT, not a UINT, so we need to cast
			// TODO: Maybe keep as int and change other instances of the variable to int, too?
			//       This would help with the "cannot use & w/ int and uint" issue
			if (vsInputs[v].Semantic != null && vsInputs[v].Semantic.toUpperCase() == "SV_VERTEXID")
			{
				main += "\t" + "uint " + vsInputs[v].Name + " = ";
				main += "uint(gl_VertexID);\n";
			}
			else
			{
				main += "\t" + this.#Translate(vsInputs[v].DataType) + " " + vsInputs[v].Name + " = ";
				main += PrefixAttribute + vsInputs[v].Name + ";\n";
			}
		}

		// Are any of the actual function inputs structs?
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];
			if (this.#IsStruct(param.DataType))
			{
				// Yes, so build a struct object and "hook up" vsInputs
				let newParamName = this.#Translate(param.Name);
				main += "\n\t" + param.DataType;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				let struct = this.#GetStructByName(param.DataType);
				for (let v = 0; v < struct.Variables.length; v++)
				{
					let member = struct.Variables[v];
					main += "\t" + newParamName + "." + this.#Translate(member.Name) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       vsInput identifier used throughout the rest of the function
					main += this.#Translate(member.Name) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + this.#Translate(this.#main.ReturnType) + " " + PrefixVSOutput + " = hlsl_main(";
		for (let p = 0; p < this.#main.Parameters.length; p++)
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
			let posName = null;
			let struct = this.#GetStructByName(this.#main.ReturnType);
			for (let v = 0; v < struct.Variables.length; v++)
			{
				let member = struct.Variables[v];

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
		let psInputs = [];
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];

			// If this is a data type, we have to scan the whole thing
			if (this.#IsStruct(param.DataType))
			{
				let struct = this.#GetStructByName(param.DataType);
				if (struct == null)
					throw new Error("Invalid data type in pixel shader input");

				// Add each struct member to the VS input
				for (let v = 0; v < struct.Variables.length; v++)
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

		let vary = "";

		// Loop through all main parameters
		let needFragCoord = false;
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];
			if (this.#IsStruct(param.DataType))
			{
				// This param is an entire struct, so make a varying for each member
				// Note: Using semantic as varying identifiers!
				let struct = this.#GetStructByName(param.DataType);
				for (let v = 0; v < struct.Variables.length; v++)
				{
					let member = struct.Variables[v];

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
		let main = "void main()\n";
		main += "{\n";

		// Create a variable for each ps input (which comes from a varying)
		// NOTE: This could be skipped and the varyings could be
		//       directly set to the variables/structs below
		for (let v = 0; v < psInputs.length; v++)
		{
			main += "\t" + this.#Translate(psInputs[v].DataType) + " " + psInputs[v].Name + " = ";

			// SV_POSITION is really just gl_FragCoord
			if (psInputs[v].Semantic.toUpperCase() == "SV_POSITION")
				main += "gl_FragCoord;\n";
			else
				main += PrefixVarying + psInputs[v].Semantic + ";\n"; // Identifier is semantic!
		}

		// Are any of the actual function inputs structs?
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];
			if (this.#IsStruct(param.DataType))
			{
				// Yes, so build a struct object and "hook up" psInputs
				let newParamName = this.#Translate(param.Name);
				main += "\n\t" + param.DataType;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				let struct = this.#GetStructByName(param.DataType);
				for (let v = 0; v < struct.Variables.length; v++)
				{
					let member = struct.Variables[v];
					main += "\t" + newParamName + "." + this.#Translate(member.Name) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       psInput identifier used throughout the rest of the function
					main += this.#Translate(member.Name) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + this.#Translate(this.#main.ReturnType) + " " + PrefixPSOutput + " = hlsl_main(";
		for (let p = 0; p < this.#main.Parameters.length; p++)
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

			let targetName = null;
			let struct = this.#GetStructByName(this.#main.ReturnType);
			for (let v = 0; v < struct.Variables.length; v++)
			{
				let member = struct.Variables[v];

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

			main += "\t" + PSOutputVariable + " = " + PrefixPSOutput + "." + targetName + ";\n";
		}


		main += "}\n";
		return main;
	}


	#ConvertPixelShader()
	{
		let glsl = "#version 300 es\n\n";
		let psInputs = this.#GetPSInputs();

		// Append each element
		glsl += "precision mediump float;\n\n";
		glsl += "precision mediump sampler3D;\n\n";
		glsl += "out vec4 " + PSOutputVariable + ";\n\n";
		glsl += this.#GetPSVaryings(psInputs);
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHLSLOnlyFunctions();
		glsl += this.#GetMatrixConstructors();
		glsl += this.#GetTextureSamplerString();
		glsl += this.#GetHelperFunctionsString();
		glsl += this.#GetFunctionString(this.#main, "hlsl_");
		glsl += this.#BuildPixelShaderMain(psInputs);

		return glsl;
	}

}


class Expression { }

class ExpAssignment extends Expression
{
	VarToken;
	Exp;

	constructor(varToken, exp)
	{
		this.VarToken = varToken;
		this.Exp = exp;
	}
}

class ExpBinary extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;
	}
}

class ExpBitwise extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;
	}
}

class ExpLiteral extends Expression
{
	LiteralToken;

	constructor(litToken)
	{
		this.LiteralToken = litToken;
	}
}

class ExpLogical extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;
	}
}

class ExpGroup extends Expression
{
	Exp;

	constructor(exp)
	{
		this.Exp = exp;
	}
}

class ExpTernary extends Expression
{
	ExpCondition
	ExpIf;
	ExpElse;

	constructor(expCondition, expIf, expElse)
	{
		this.ExpCondition = expCondition;
		this.ExpIf = expIf;
		this.ExpElse = expElse;
	}
}

class ExpUnary extends Expression
{
	OperatorToken;
	ExpRight;

	constructor(opToken, expRight)
	{
		this.OperatorToken = opToken;
		this.ExpRight = expRight;
	}
}

class ExpVariable extends Expression
{
	VarToken;

	constructor(varToken)
	{
		this.VarToken = varToken;
	}
}

