
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
const D3D11_JS_FEATURE_COMPRESSED_TEXTURE_S3TC_SUPPORT = 3;
const D3D11_JS_FEATURE_COLOR_BUFFER_HALF_FLOAT_SUPPORT = 4;


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
const DXGI_FORMAT_BC1_UNORM = 71;           // Block-compressed format (DXT1)
//const DXGI_FORMAT_BC1_UNORM_SRGB = 72;
//const DXGI_FORMAT_BC2_TYPELESS = 73;
const DXGI_FORMAT_BC2_UNORM = 74;           // Block-compressed format (DXT2 or DXT3)
//const DXGI_FORMAT_BC2_UNORM_SRGB = 75;
//const DXGI_FORMAT_BC3_TYPELESS = 76;
const DXGI_FORMAT_BC3_UNORM = 77;           // Block-compressed format (DXT4 or DXT5)
//const DXGI_FORMAT_BC3_UNORM_SRGB = 78;
//const DXGI_FORMAT_BC4_TYPELESS = 79;
//const DXGI_FORMAT_BC4_UNORM = 80;
//const DXGI_FORMAT_BC4_SNORM = 81;
//const DXGI_FORMAT_BC5_TYPELESS = 82;
//const DXGI_FORMAT_BC5_UNORM = 83;
//const DXGI_FORMAT_BC5_SNORM = 84;
//const DXGI_FORMAT_B5G6R5_UNORM = 85;
//const DXGI_FORMAT_B5G5R5A1_UNORM = 86;
const DXGI_FORMAT_B8G8R8A8_UNORM = 87;      // 32-bit, 8-per-channel color format with reversed BGR channels
const DXGI_FORMAT_B8G8R8X8_UNORM = 88;      // 32-bit, 8-per-channel reversed BGR with 8 unused
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

// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

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
		return ( // Need something on the "return" line for javascript :/
			this.Right <= this.Left ||
			this.Bottom <= this.Top ||
			this.Back <= this.Front
		);
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
	#compressedTextureExt;
	#colorBufferHalfFloatExt;
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

		// Attempt to load basic DXT texture compression extension
		this.#compressedTextureExt = this.#gl.getExtension("WEBGL_compressed_texture_s3tc");

		// Attempt to load the color buffer half float extension (iOS doesn't like 32-bit float formats)
		this.#colorBufferHalfFloatExt = this.#gl.getExtension("EXT_color_buffer_half_float");

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
			case D3D11_JS_FEATURE_COMPRESSED_TEXTURE_S3TC_SUPPORT: return this.#compressedTextureExt;
			case D3D11_JS_FEATURE_COLOR_BUFFER_HALF_FLOAT_SUPPORT: return this.#colorBufferHalfFloatExt;
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


	// TODO: Use SubresourceData struct for initial data to match d3d spec?
	// TODO: Ensure array types for initial data? 
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
		const isCompressed = glFormatDetails.IsCompressed;
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
							if (isCompressed)
							{
								this.#gl.compressedTexSubImage2D(
									cubeFaces[face],
									mip,
									0,
									0,
									mipWidth,
									mipHeight,
									format,
									initialData[mip + face * desc.MipLevels]);
							}
							else
							{
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
							if (isCompressed)
							{
								this.#gl.compressedTexSubImage3D(
									glTextureType,
									mip,
									0,
									0,
									arraySlice,
									mipWidth,
									mipHeight,
									1,
									format,
									initialData[mip + arraySlice * desc.MipLevels]);
							}
							else
							{
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
					
						// Save this data
						// TODO: Test this!
						if (isCompressed)
						{
							this.#gl.compressedTexSubImage3D(
								glTextureType,
								mip,
								0,
								0,
								0,
								mipWidth,
								mipHeight,
								mipDepth,
								format,
								initialData[mip + arraySlice * desc.MipLevels]);
						}
						else
						{
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
					}
					break;
			}
		}

		// Set the default sampler state in the event
		// we don't bind a sampler when drawing
		this.#SetDefaultSamplerStateForBoundTexture(glTextureType, hasMipmaps);

		// Unbind the texture to ensure we don't have any feedback loop later on
		this.#gl.bindTexture(glTextureType, null);

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
			HasStencil: false,
			IsCompressed: false
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
				glFormatDetails.Type = this.#gl.HALF_FLOAT;
				glFormatDetails.Format = this.#gl.RG;
				glFormatDetails.InternalFormat = this.#gl.RG16F;
				break;

			case DXGI_FORMAT_R16G16B16A16_FLOAT:
				glFormatDetails.Type = this.#gl.HALF_FLOAT;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.RGBA16F;
				break;

			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				glFormatDetails.Type = this.#gl.FLOAT;
				glFormatDetails.Format = this.#gl.RGBA;
				glFormatDetails.InternalFormat = this.#gl.RGBA32F;
				break;

			// --- COMPRESSED ---------------------
			case DXGI_FORMAT_BC1_UNORM:
				if (this.#compressedTextureExt == null)
					throw new Error("DXT compressed texture formats not supported by your device");

				glFormatDetails.Format = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				glFormatDetails.InternalFormat = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				glFormatDetails.IsCompressed = true;
				break;

			case DXGI_FORMAT_BC2_UNORM:
				if (this.#compressedTextureExt == null)
					throw new Error("DXT compressed texture formats not supported by your device");

				glFormatDetails.Format = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				glFormatDetails.InternalFormat = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				glFormatDetails.IsCompressed = true;
				break;

			case DXGI_FORMAT_BC3_UNORM:
				if (this.#compressedTextureExt == null)
					throw new Error("DXT compressed texture formats not supported by your device");

				glFormatDetails.Format = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT5_EXT;
				glFormatDetails.InternalFormat = this.#compressedTextureExt.COMPRESSED_RGBA_S3TC_DXT5_EXT;
				glFormatDetails.IsCompressed = true;
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
			case DXGI_FORMAT_BC1_UNORM:
			case DXGI_FORMAT_BC2_UNORM:
			case DXGI_FORMAT_BC3_UNORM:
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

			// Compressed color formats
			case DXGI_FORMAT_BC1_UNORM:
			case DXGI_FORMAT_BC2_UNORM:
			case DXGI_FORMAT_BC3_UNORM:
				if (this.#compressedTextureExt == null)
					throw new Error("DXT compressed texture formats not supported by your device");
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

		// TODO: Turn off buffer write masks, as
		//       D3D does not take those into account when clearing

		let [width, height] = this.#GetActiveRenderTargetSize();
		this.#gl.scissor(0, 0, width, height);

		// Clear
		this.#gl.clearColor(color[0], color[1], color[2], color[3]);
		this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);

		// Need to update rasterizer due to scissor change
		this.#scissorRectDirty = true;
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

		// TODO: Turn off buffer write masks, as
		//       D3D does not take those into account when clearing

		let [width, height] = this.#GetActiveRenderTargetSize();
		this.#gl.scissor(0, 0, width, height);

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

		// Need to update rasterizer due to scissor change
		this.#scissorRectDirty = true;
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


	// TODO: Validate format!
	// Note: The D3D11 version takes a third param - offset - which is 
	//       a byte offset into the buffer.  WebGL has no such param.
	IASetIndexBuffer(indexBuffer, format)
	{
		this.#indexBuffer = indexBuffer;
		this.#indexBufferFormat = format;

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
	 * @param {Array<D3D11_RECT>} rects Array of scissor rects.  Note that only the first scissor rect is used in d3d11.js.
	 */
	RSSetScissorRects(rects)
	{
		// Copy the first element
		this.#scissorRect = structuredClone(rects[0]);
		this.#scissorRectDirty = true;
		this.#rasterizerDirty = true; // TODO: See if we can optimize this so we don't need to update the entire stage
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

	OMGetRenderTargets()
	{
		return [this.#renderTargetViews.slice(), this.#depthStencilView];
	}

	// TODO: Handle instancing
	// TODO: Error reporting if state isn't set
	#PrepareInputAssembler()
	{
		if (!this.#inputAssemblerDirty || this.#inputLayout == null)
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

				// Get the uniform block index using the GL-translated name
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.NameGL);

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

				// Get the uniform block index using the GL-translated name
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.NameGL);

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
	#GetActiveRenderTargetSize()
	{
		let rtWidth = 0;
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
					rtWidth = rtRes.GetDesc().Width;
					rtHeight = rtRes.GetDesc().Height;
					rtRes.Release();

					// Use mip level to calculate height
					let mip = this.#renderTargetViews[i].GetDesc().MipSlice;
					let div = Math.pow(2, mip);
					rtWidth = Math.max(1, Math.floor(rtWidth / div));
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
			rtWidth = dsvRes.GetDesc().Width;
			rtHeight = dsvRes.GetDesc().Height;
			dsvRes.Release();

			// Use mip level to calculate height
			let mip = this.#depthStencilView.GetDesc().MipSlice;
			let div = Math.pow(2, mip);
			rtWidth = Math.max(1, Math.floor(rtWidth / div));
			rtHeight = Math.max(1, Math.floor(rtHeight / div));
		}

		return [rtWidth, rtHeight];
	}

	
	#PrepareRasterizer()
	{
		// We need to flip the Y on viewports & scissor rects, so
		// what's the actual render target height?
		let rtWidth = 0;
		let rtHeight = 0;
		if (this.#viewportDirty || this.#scissorRectDirty)
		{
			[rtWidth, rtHeight] = this.#GetActiveRenderTargetSize();
		}
		
		// Need to update viewport (and we have a real height)?
		if (this.#viewportDirty && this.#viewport != null && rtHeight > 0 && rtWidth > 0)
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
		if (this.#scissorRectDirty && rtHeight > 0 && rtWidth > 0)
		{
			// Invert the Y
			let scissorWidth = this.#scissorRect.Right - this.#scissorRect.Left;
			let scissorHeight = this.#scissorRect.Bottom - this.#scissorRect.Top;
			let invertY = rtHeight - scissorHeight;

			// Set up the GL scissor rect
			this.#gl.scissor(
				this.#scissorRect.Left,
				invertY - this.#scissorRect.Top,
				scissorWidth,
				scissorHeight);
			
			// All clean
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

	Draw(vertexCount, startVertexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		this.#PrepareTexturesAndSamplers();
		this.#PrepareOutputMerger();
		this.#PrepareRasterizer(); // Rasterizer AFTER output merger due to scissor needing up-to-date render target details!

		this.#gl.drawArrays(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			startVertexLocation,
			vertexCount);
	}

	// Note: D3D11 has a third param - baseVertexLocation - that is added to
	//       each index.  WebGL has no such param (there is an extension that
	//       was proposed but hasn't been implemented yet)
	DrawIndexed(indexCount, startIndexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		this.#PrepareTexturesAndSamplers();
		this.#PrepareOutputMerger();
		this.#PrepareRasterizer(); // Rasterizer AFTER output merger due to scissor needing up-to-date render target details!

		// Get proper format
		let format = this.#gl.UNSIGNED_SHORT;
		switch (this.#indexBufferFormat)
		{
			case DXGI_FORMAT_R16_UINT: format = this.#gl.UNSIGNED_SHORT; break;
			case DXGI_FORMAT_R32_UINT: format = this.#gl.UNSIGNED_INT; break;
		}

		// Perform draw
		this.#gl.drawElements(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			indexCount,
			format,
			startIndexLocation);
	}

	/**
	 * Sends queued up commands to the GPU to be processed
	 */
	Flush()
	{
		// TODO: Experiement with flush() vs. finish()
		this.#gl.finish();
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

/**
 * A view interface specifies the parts of a resource the pipeline can access during rendering
 */
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

/**
 * View of a texture resource for depth-stencil testing
 */
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


/**
 * View of a texture resource for render output
 */
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

/**
 * View of a set of subresources available to a shader during rendering
 */
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
const PrefixVSCBuffer = "_vs_";
const PrefixPSCBuffer = "_ps_";
const PSOutputVariable = "_sv_target_";

const ShaderLanguageHLSL = 0;
const ShaderLanguageGLSL = 1;

const RegexSwizzleX = /^[x]{1,4}$/;
const RegexSwizzleXY = /^[xy]{1,4}$/;
const RegexSwizzleXYZ = /^[xyz]{1,4}$/;
const RegexSwizzleXYZW = /^[xyzw]{1,4}$/;
const RegexSwizzleR = /^[r]{1,4}$/;
const RegexSwizzleRG = /^[rg]{1,4}$/;
const RegexSwizzleRGB = /^[rgb]{1,4}$/;
const RegexSwizzleRGBA = /^[rgba]{1,4}$/;


const HLSLDataTypeDetails = {
	"void": { "RootType": "void", "Family": "void", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "void" },

	"bool":  { "RootType": "bool", "Family": "bool", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "bool" },
	"bool1": { "RootType": "bool", "Family": "bool", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "bool" },
	"bool2": { "RootType": "bool", "Family": "bool", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "bvec2" },
	"bool3": { "RootType": "bool", "Family": "bool", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "bvec3" },
	"bool4": { "RootType": "bool", "Family": "bool", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "bvec4" },

	"bool2x2": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": null },
	"bool2x3": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": null },
	"bool2x4": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": null },

	"bool3x2": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": null },
	"bool3x3": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": null },
	"bool3x4": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": null },

	"bool4x2": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": null },
	"bool4x3": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": null },
	"bool4x4": { "RootType": "bool", "Family": "bool", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": null },

	"int":  { "RootType": "int", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "int" },
	"int1": { "RootType": "int", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "int" },
	"int2": { "RootType": "int", "Family": "int", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "ivec2" },
	"int3": { "RootType": "int", "Family": "int", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "ivec3" },
	"int4": { "RootType": "int", "Family": "int", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "ivec4" },

	"int2x2": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": null },
	"int2x3": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": null },
	"int2x4": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": null },

	"int3x2": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": null },
	"int3x3": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": null },
	"int3x4": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": null },

	"int4x2": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": null },
	"int4x3": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": null },
	"int4x4": { "RootType": "int", "Family": "int", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": null },

	"uint":  { "RootType": "uint", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" }, 
	"uint1": { "RootType": "uint", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"uint2": { "RootType": "uint", "Family": "int", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "uvec2" },
	"uint3": { "RootType": "uint", "Family": "int", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "uvec3" },
	"uint4": { "RootType": "uint", "Family": "int", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "uvec4" },

	"uint2x2": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": null },
	"uint2x3": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": null },
	"uint2x4": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": null },

	"uint3x2": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": null },
	"uint3x3": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": null },
	"uint3x4": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": null },

	"uint4x2": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": null },
	"uint4x3": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": null },
	"uint4x4": { "RootType": "uint", "Family": "int", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": null },

	"dword":  { "RootType": "dword", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"dword1": { "RootType": "dword", "Family": "int", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"dword2": { "RootType": "dword", "Family": "int", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "uvec2" },
	"dword3": { "RootType": "dword", "Family": "int", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "uvec3" },
	"dword4": { "RootType": "dword", "Family": "int", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "uvec4" },

	"dword2x2": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": null },
	"dword2x3": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": null },
	"dword2x4": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": null },

	"dword3x2": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": null },
	"dword3x3": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": null },
	"dword3x4": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": null },

	"dword4x2": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": null },
	"dword4x3": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": null },
	"dword4x4": { "RootType": "dword", "Family": "int", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": null },

	"half":  { "RootType": "half", "Family": "float", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"half1": { "RootType": "half", "Family": "float", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"half2": { "RootType": "half", "Family": "float", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" }, 
	"half3": { "RootType": "half", "Family": "float", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" }, 
	"half4": { "RootType": "half", "Family": "float", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" }, 

	"half2x2": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": "mat2" }, // TODO: Just assume standard float?
	"half2x3": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": "mat2x3" },
	"half2x4": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": "mat2x4" },

	"half3x2": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": "mat3x2" },
	"half3x3": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": "mat3" },
	"half3x4": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": "mat3x4" },

	"half4x2": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": "mat4x2" },
	"half4x3": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": "mat4x3" },
	"half4x4": { "RootType": "half", "Family": "float", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" },

	"float":  { "RootType": "float", "Family": "float", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"float1": { "RootType": "float", "Family": "float", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"float2": { "RootType": "float", "Family": "float", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" }, 
	"float3": { "RootType": "float", "Family": "float", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" }, 
	"float4": { "RootType": "float", "Family": "float", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" }, 

	"float2x2": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": "mat2" },
	"float2x3": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": "mat2x3" },
	"float2x4": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": "mat2x4" },

	"float3x2": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": "mat3x2" },
	"float3x3": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": "mat3" },
	"float3x4": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": "mat3x4" },

	"float4x2": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": "mat4x2" },
	"float4x3": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": "mat4x3" },
	"float4x4": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" },

	"double":  { "RootType": "double", "Family": "double", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"double1": { "RootType": "double", "Family": "double", "SVM": "S", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"double2": { "RootType": "double", "Family": "double", "SVM": "V", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" },
	"double3": { "RootType": "double", "Family": "double", "SVM": "V", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" },
	"double4": { "RootType": "double", "Family": "double", "SVM": "V", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" },

	"double2x2": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": "mat2" },
	"double2x3": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": "mat2x3" },
	"double2x4": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": "mat2x4" },

	"double3x2": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": "mat3x2" },
	"double3x3": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": "mat3" },
	"double3x4": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": "mat3x4" },

	"double4x2": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": "mat4x2" },
	"double4x3": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": "mat4x3" },
	"double4x4": { "RootType": "double", "Family": "double", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" },

	"matrix": { "RootType": "float", "Family": "float", "SVM": "M", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" }
};

const HLSLMatrixElementConversion = {
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
};

const HLSLMatrixConstructorConversion = {
	"float2x2": "float2x2_tr",
	"float3x3": "float3x3_tr",
	"float4x4": "float4x4_tr",
	"matrix": "float4x4_tr",
};

const HLSLReservedWordConversion = {
	"$Global": "_global_cbuffer",
	"input": "_input",
	"output": "_output",
	"pow": "pow_hlsl",
	"frac": "fract"
};

// TODO: Update GetFunctionReturnType() once comparison sampling is in
const HLSLTextureSampleConversion = {
	"Sample": { "Name": "texture", "DataType": "float4" },
	"SampleLevel": { "Name": "textureLod", "DataType": "float4" }
};

const HLSLImplicitCastRank = {
	"bool": 0,
	"int": 1,
	"dword": 2, // Really just an alias for uint?
	"uint": 3,
	"half": 4,
	"float": 5,
	"double": 6
};

// Same type --> 0
// Same family --> 1
// Next family --> 2
// bool<->float --> 3
// Double is its own family?
// Half is the "most expensive" due to 16-bit truncation
const HLSLScalarImplicitCastWeights = {
	bool:	{ bool: 0, int: 2, dword: 2, uint: 2, half: 5, float: 3, double: 4 },
	int:	{ bool: 2, int: 0, dword: 1, uint: 1, half: 4, float: 2, double: 3 },
	dword:	{ bool: 2, int: 1, dword: 0, uint: 1, half: 4, float: 2, double: 3 },
	uint:	{ bool: 2, int: 1, dword: 1, uint: 0, half: 4, float: 2, double: 3 },
	half:	{ bool: 3, int: 2, dword: 2, uint: 2, half: 0, float: 1, double: 2 },
	float:	{ bool: 3, int: 2, dword: 2, uint: 2, half: 3, float: 0, double: 2 },
	double: { bool: 4, int: 3, dword: 3, uint: 3, half: 5, float: 2, double: 0 }
};


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

	PeekPrev() { return this.#Peek(-1); }
	PeekNext() { return this.#Peek(1); }
	PeekNextNext() { return this.#Peek(2); }

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
	#globalConstants;
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
			// Basic integers, floats, doubles and halfs, including exponent notation, hex and octal
			// See here for full grammar: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-grammar
			Type: TokenNumericLiteral,
			Pattern: /^[+-]?(([0][x][a-fA-F0-9]+([uU][lL])?([lL][uU])?[uU]?[lL]?)|(([0-9]*[.][0-9]+([eE][+-]?[0-9]+)?[fFlLhH]?)|([0-9]+[.]([eE][+-]?[0-9]+)?[fFlLhH])|([0-9]+[.])|([0-9]+([uU][lL])?([lL][uU])?[uU]?[lL]?)))/
			// What in the good god damn is this monstrosity? Testing in out live here: https://regex101.com/r/DmHHRu/1
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

	static TranslateToGLSL(identifier)
	{
		if (HLSLDataTypeDetails.hasOwnProperty(identifier))
			return HLSLDataTypeDetails[identifier].GLSL;
		else if (HLSLReservedWordConversion.hasOwnProperty(identifier))
			return HLSLReservedWordConversion[identifier];
		else
			return identifier;
	}
	
	#GetStructMemberType(structType, memberName)
	{
		for (let s = 0; s < this.#structs.length; s++)
		{
			let st = this.#structs[s];
			if (st.Name == structType)
			{
				for (let v = 0; v < st.Members.length; v++)
				{
					let mem = st.Members[v];
					if (mem.NameToken.Text == memberName)
					{
						return mem.DataTypeToken.Text;
					}
				}
			}
		}

		return null;
	}

	static async LoadTextFromURL(url, allowIncludes = true)
	{
		// Grab the URL
		let resp = await fetch(url);
		let text = await resp.text();

		// Should we also load includes?
		if (!allowIncludes)
			return text;

		// Track the included paths
		let includedURLs = {};

		// Check for an initial "#include"
		let includeToken = "#include";
		while(true)
		{
			// Check for include token
			let includePos = text.indexOf(includeToken);
			if (includePos == -1)
				break;

			let q1 = -1;
			let q2 = -1;

			// First quote
			q1 = text.indexOf("\"", includePos + includeToken.length);
			if (q1 == -1)
				throw new Error("Error with #include; expected start quote");

			// Second quote
			q2 = text.indexOf("\"", q1 + 1);
			if (q2 == -1)
				throw new Error("Error with #include; expected end quote");

			// Grab the path and verify we haven't seen it before
			let url = text.substring(q1 + 1, q2);
			let newText = "";
			if (!includedURLs.hasOwnProperty(url))
			{
				// Haven't seen this one, so record and fetch
				includedURLs[url] = true;
				resp = await fetch(url);
				newText = await resp.text();
			}

			// Replace the include with the new text (or blank if we've seen it)
			text =
				text.substring(0, includePos) +
				newText +
				text.substring(q2 + 1);
		}

		return text;
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

		// Process the code
		this.#Tokenize();
		this.#Parse();
		this.#Validate();
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
			if (anyMatch == false)
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
		this.#globalConstants = [];
		this.#main = null;

		// Create the iterator
		let it = new TokenIterator(this.#tokens);

		// Possible global cbuffer
		let prefix = "";
		switch (this.#shaderType)
		{
			case ShaderTypePixel: prefix = PrefixPSCBuffer; break;
			case ShaderTypeVertex: prefix = PrefixVSCBuffer; break;
		}
		let globalCB = new ShaderElementCBuffer("$Global", prefix + "global_cbuffer", -1);

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
					let globalConst = this.#ParseVarDecStatement(it);
					this.#globalConstants.push(globalConst);
					break;

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
					throw new ParseError(it.Current(), "Not currently handling multisampled textures");

				default:
					// Should be a data type and the next should be an identifier
					if (!this.#IsDataType(current.Text) ||
						it.PeekNext().Type != TokenIdentifier)
						throw new ParseError(current, "Invalid token");

					// Check for global variable or function
					if (!this.#ParseGlobalVarOrFunction(it, globalCB))
						throw new Error("Error parsing global variable or function"); // TODO: Is this handled internally?  What results in the function returning false?

					break;
			}
		}

		// Must have a main
		if (this.#main == null)
		{
			throw new ParseError(null, "'main': entry point not found"); // Matches HLSL
		}

		// Add global cbuffer if necessary
		if (globalCB.Members.length > 0)
		{
			this.#cbuffers.push(globalCB);
		}

		// Resolve any implicit register indices
		// TODO: Actually find and use maximums for each register type!
		this.#ResolveImplicitRegisters(this.#cbuffers, 999);
		this.#ResolveImplicitRegisters(this.#samplers, 999);
		this.#ResolveImplicitRegisters(this.#textures, 999);
	}

	#Validate()
	{
		// Scope stack with an initial scope for globals (cbuffer vars)
		let scope = new ScopeStack();
		scope.PushScope(ScopeTypeGlobal);

		// Add all structs
		for (let s = 0; s < this.#structs.length; s++)
			scope.AddStruct(this.#structs[s]);

		// Add all cbuffer vars
		for (let b = 0; b < this.#cbuffers.length; b++)
			for (let m = 0; m < this.#cbuffers[b].Members.length; m++)
				scope.AddVar(this.#cbuffers[b].Members[m]);

		// Add all global constants
		for (let c = 0; c < this.#globalConstants.length; c++)
			scope.AddVarStatement(this.#globalConstants[c]);

		// Add all textures & samplers
		for (let t = 0; t < this.#textures.length; t++) scope.AddTexture(this.#textures[t]);
		for (let s = 0; s < this.#samplers.length; s++) scope.AddTexture(this.#samplers[s]);
		
		// Validate each statement in each function
		for (let f = 0; f < this.#functions.length; f++)
		{
			this.#ValidateFunction(scope, this.#functions[f]);
		}

		// Also validate main
		this.#ValidateFunction(scope, this.#main);

		// All done - this pop is probably unnecessary but
		// just for completeness
		scope.PopScope();
	}

	#ValidateFunction(scope, func)
	{
		// Add to the function table (verifying 
		scope.AddFunctionToTable(func);

		// New scope for this function
		scope.PushScope(ScopeTypeFunction, func.ReturnType);

		// Add all parameters to scope
		for (let p = 0; p < func.Parameters.length; p++)
			scope.AddVar(func.Parameters[p]);

		// Now validate all statements
		for (let s = 0; s < func.Statements.length; s++)
		{
			// Validate each statement
			func.Statements[s].Validate(scope);

			//// Add any "variable statements" to the current scope
			//if (func.Statements[s] instanceof StatementVar)
			//{
			//	scope.AddVarStatement(func.Statements[s]);
			//	console.log("ADD VAR: " + func.Statements[s]);
			//}
		}

		// End function
		scope.PopScope();
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

	#AllowDataType(it)
	{
		let t = it.Current();
		if (this.#IsDataType(t.Text))
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

	#RequireDataType(it)
	{
		let t = it.Current();
		if (this.#IsDataType(t.Text))
		{
			it.MoveNext();
			return true;
		}

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
		let isDataType = HLSLDataTypeDetails.hasOwnProperty(text);
		return isStructType || isDataType;
	}

	static GetRootType(text)
	{
		// Are we a built-in type?
		let dims = "";
		let rootType = "";
		if (text.startsWith("bool")) { rootType = "bool"; dims = text.substring(4); }
		else if (text.startsWith("int")) { rootType = "int"; dims = text.substring(3); }
		else if (text.startsWith("dword")) { rootType = "dword"; dims = text.substring(5); }
		else if (text.startsWith("uint")) { rootType = "uint"; dims = text.substring(4); }
		else if (text.startsWith("half")) { rootType = "half"; dims = text.substring(4); }
		else if (text.startsWith("float")) { rootType = "float"; dims = text.substring(5); }
		else if (text.startsWith("double")) { rootType = "double"; dims = text.substring(6); }

		if (dims.length == 0)
			return rootType;

		// Validate vector dimensions
		if (dims == "1" || dims == "2" || dims == "3" || dims == "4")
			return rootType;

		// Validate matrix dimensions
		if (dims.length == 3)
		{
			let c = dims[0];
			let x = dims[1];
			let r = dims[2];

			if (x == "x" &&
				(c == "1" || c == "2" || c == "3" || c == "4") &&
				(r == "1" || r == "2" || r == "3" || r == "4"))
				return rootType;
		}

		// No match
		return null;
	}

	static IsBoolType(text)
	{
		return HLSL.GetRootType(text) == "bool";
	}

	static IsIntType(text)
	{
		let rootType = HLSL.GetRootType(text);

		switch (rootType)
		{
			case "int":
			case "uint":
			case "dword":
				return true;
		}

		return false;
	}

	static IsFloatType(text)
	{
		let rootType = HLSL.GetRootType(text);

		switch (rootType)
		{
			case "half":
			case "float":
			case "double":
				return true;
		}

		return false;
	}


	static IsScalarType(text)
	{
		switch (text)
		{
			case "bool": case "bool1":
			case "int": case "int1":
			case "uint": case "uint1":
			case "dword": case "dword1":
			case "half": case "half1":
			case "float": case "float1":
			case "double": case "double1":
				return true;
		}

		return false;
	}

	static IsVectorType(text)
	{
		switch (text)
		{
			case "bool2": case "bool3": case "bool4":
			case "int2": case "int3": case "int4":
			case "uint2": case "uint3": case "uint4":
			case "dword2": case "dword3": case "dword4":
			case "half2": case "half3": case "half4":
			case "float2": case "float3": case "float4":
			case "double2": case "double3": case "double4":
				return true;
		}

		return false;
	}

	static IsVectorOrScalarType(text)
	{
		return HLSL.IsScalarType(text) || HLSL.IsVectorType(text);
	}

	static IsMatrixType(text)
	{
		// Check for matrix first
		if (text == "matrix") return true;

		// Determine if the string starts with a valid scalar type
		let dims = null;
		if (text.startsWith("bool")) { dims = text.substring(4); }
		else if (text.startsWith("int")) { dims = text.substring(3); }
		else if (text.startsWith("dword")) { dims = text.substring(5); }
		else if (text.startsWith("uint")) { dims = text.substring(4); }
		else if (text.startsWith("half")) { dims = text.substring(4); }
		else if (text.startsWith("float")) { dims = text.substring(5); }
		else if (text.startsWith("double")) { dims = text.substring(6); }

		// Look for valid dimensions
		switch (dims)
		{
			case "2x2": case "2x3": case "2x4":
			case "3x2": case "3x3": case "3x4":
			case "4x2": case "4x3": case "4x4":
				return true;
		}

		return false;
	}

	static IsReservedWord(text)
	{
		return HLSLReservedWordConversion.hasOwnProperty(text);
	}

	#ParseStruct(it)
	{
		let name = null;
		let vars = [];

		// Ensure we start with "struct"
		this.#RequireIdentifier(it, "struct");

		// Next is the name
		this.#Require(it, TokenIdentifier);
		name = it.PeekPrev().Text;

		// Scope
		this.#Require(it, TokenScopeLeft);

		// Some number of variables
		do
		{
			if (it.Current().Type == TokenScopeRight)
				break;

			vars.push(this.#ParseMemberVariableOrFunctionParam(it, false, true, true, false));
		}
		while (this.#Allow(it, TokenSemicolon));

		// End scope and semicolon
		this.#Require(it, TokenScopeRight);
		this.#Require(it, TokenSemicolon);

		return new ShaderElementStruct(name, vars);
	}


	#ParseRegisterIndex(it, registerLabel) // "b", "s" or "t"
	{
		// If it's not a colon, skip
		if (!this.#Allow(it, TokenColon))
			return -1;

		// Must be followed by pattern: register(bN)
		this.#RequireIdentifier(it, "register");
		this.#Require(it, TokenParenLeft);

		// Validate register type
		this.#Require(it, TokenIdentifier);
		let regText = it.PeekPrev().Text;
		if (!regText.startsWith(registerLabel))
			throw new ParseError(it.PeekPrev(), "Invalid register type");
		
		// Get index
		let index = parseInt(regText.substring(1));
		if (isNaN(index))
			throw new ParseError(it.PeekPrev(), "Invalid register index");

		this.#Require(it, TokenParenRight);
		return index;
	}


	#ParseCBuffer(it)
	{
		let name = null;
		let regIndex = -1;
		let vars = [];

		// Verify identifiers
		this.#RequireIdentifier(it, "cbuffer");

		// Next is name
		this.#Require(it, TokenIdentifier);
		name = it.PeekPrev().Text;

		// Scan for register
		regIndex = this.#ParseRegisterIndex(it, "b");

		// Should be scope at this point
		this.#Require(it, TokenScopeLeft);

		// Process any variables
		do
		{
			if (it.Current().Type == TokenScopeRight)
				break;

			// Grab var dec and add to both the list of vars and the ongoing 
			// scope, since cbuffer members are global
			let v = this.#ParseMemberVariableOrFunctionParam(it, false, false, false, false);
			vars.push(v);
		}
		while (this.#Allow(it, TokenSemicolon));

		// End scope
		this.#Require(it, TokenScopeRight);

		// What's the translated name for this cbuffer?
		let prefix = "";
		switch (this.#shaderType)
		{
			case ShaderTypePixel: prefix = PrefixPSCBuffer; break;
			case ShaderTypeVertex: prefix = PrefixVSCBuffer; break;
		}
		let nameGL = HLSL.TranslateToGLSL(prefix + name);

		return new ShaderElementCBuffer(name, nameGL, regIndex, vars);
	}

	// Structs: Interpmod(s), type, name, arraysize, semantic
	// CBuffer: type, name, arraysize
	// Function Param: interpmod(s), type, name, arraysize, semantic, init
	#ParseMemberVariableOrFunctionParam(it, allowInputMod, allowInterpMod, allowSemantic, allowInit)
	{
		let interpMods = [];
		let inputMods = [];
		let dataTypeToken = null;
		let nameToken = null;
		let semantic = null;
		let arrayExp = null;
		let initExp = null;

		// Check for interpolation and/or input modifiers
		let modFound = false;
		do
		{
			// Reset
			modFound = false;

			// Check input modifiers (only 1)
			if (this.#AllowIdentifier(it, "in")) { inputMods.push("in"); modFound = true; }
			if (this.#AllowIdentifier(it, "inout")) { inputMods.push("inout"); modFound = true; }
			if (this.#AllowIdentifier(it, "out")) { inputMods.push("out"); modFound = true; }
			if (this.#AllowIdentifier(it, "uniform")) { inputMods.push("uniform"); modFound = true; }

			// Check interp mods (some combinations allowed)
			if (this.#AllowIdentifier(it, "linear")) { interpMods.push("linear"); modFound = true; }
			if (this.#AllowIdentifier(it, "centroid")) { interpMods.push("centroid"); modFound = true; }
			if (this.#AllowIdentifier(it, "nointerpolation")) { interpMods.push("nointerpolation"); modFound = true; }
			if (this.#AllowIdentifier(it, "noperspective")) { interpMods.push("noperspective"); modFound = true; }
			if (this.#AllowIdentifier(it, "sample")) { interpMods.push("sample"); modFound = true; }

		} while (modFound);

		// TODO: Validate interpolation mod combinations

		// Validate allowable modifiers
		if (!allowInputMod && inputMods.length > 0)
			throw new ParseError(it.PeekPrev(), "Input modifier not allowed here");

		if (inputMods.length > 1)
			throw new ParseError(it.PeekPrev(), "Multiple input modifiers found.");

		if (!allowInterpMod && interpMods.length > 0)
			throw new ParseError(it.PeekPrev(), "Interpolation modifier not allowed here");

		// Grab the data type
		this.#RequireDataType(it);
		dataTypeToken = it.PeekPrev();

		// Identifier
		this.#Require(it, TokenIdentifier);
		nameToken = it.PeekPrev();

		// Check for array
		if (this.#Allow(it, TokenBracketLeft))
		{
			// Grab the array expression
			arrayExp = this.#ParseExpression(it);
			this.#Require(it, TokenBracketRight);
		}

		// Check for semantic
		if(this.#Allow(it, TokenColon))
		{
			// Do we allow semantics?
			if (!allowSemantic)
				throw new ParseError(it.PeekPrev(), "Semantic not allowed here.");

			this.#Require(it, TokenIdentifier);
			semantic = it.PeekPrev().Text;
		}

		// Check for initialization
		if (this.#AllowOperator(it, "="))
		{
			// Allow an initialization?
			if (!allowInit)
				throw new ParseError(it.PeekPrev(), "Initialization not allowed here.");

			initExp = this.#ParseExpression(it);
		}

		return new VarDec(
			false,
			dataTypeToken,
			nameToken,
			arrayExp,
			initExp,
			inputMods.length == 1 ? inputMods[0] : null,
			interpMods,
			semantic);
	}


	// TODO: Handle typed textures
	#ParseTexture(it)
	{
		let type = null;
		let name = null
		let regIndex = -1;

		// Texture type
		this.#Require(it, TokenIdentifier);
		type = it.PeekPrev().Text;

		// Identifier
		this.#Require(it, TokenIdentifier);
		name = it.PeekPrev().Text;

		// Scan for register
		regIndex = this.#ParseRegisterIndex(it, "t");
		if (regIndex >= 0)
		{
			// Have we found this register already?
			for (let i = 0; i < this.#textures.length; i++)
				if (this.#textures[i].RegisterIndex == regIndex)
					throw new ParseError(it.PeekPrev(), "Duplicate texture register: t" + regIndex);
		}

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return new ShaderElementTexture(type, name, regIndex);
	}


	#ParseSampler(it)
	{
		let type = null;
		let name = null
		let regIndex = -1;

		// Sampler type
		this.#Require(it, TokenIdentifier);
		type = it.PeekPrev().Text;

		// Name
		this.#Require(it, TokenIdentifier);
		name = it.PeekPrev().Text;

		// Scan for register
		regIndex = this.#ParseRegisterIndex(it, "s");
		if (regIndex >= 0)
		{
			// Have we found this register already?
			for (let i = 0; i < this.#samplers.length; i++)
				if (this.#samplers[i].RegisterIndex == regIndex)
					throw new ParseError(it.PeekPrev(), "Duplicate sampler register: s" + regIndex);
		}

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return new ShaderElementSampler(type, name, regIndex);
	}

	// TODO: Handle swizzling of non-vector types (variable.xxx)
	// TODO: auto "casting" ints to floats - maybe just make "int" versions of all functions?  UGH
	#ParseGlobalVarOrFunction(it, globalCB)
	{
		// Data type
		this.#RequireDataType(it);
		let typeToken = it.PeekPrev();
		let type = it.PeekPrev().Text;

		// Name
		this.#Require(it, TokenIdentifier);
		let nameToken = it.PeekPrev();
		let name = it.PeekPrev().Text;

		// Check for parens, which means function
		if (this.#Allow(it, TokenParenLeft))
		{
			// It's a function, so it may have parameters
			let params = [];
			do
			{
				if (it.Current().Type == TokenParenRight)
					break;

				let p = this.#ParseMemberVariableOrFunctionParam(it, true, true, true, true);
				params.push(p);
			}
			while (this.#Allow(it, TokenComma));

			// Done with variables
			this.#Require(it, TokenParenRight);

			// Might have a semantic!
			let semantic = null;
			if (this.#Allow(it, TokenColon))
			{
				// Verify identifier and save
				this.#Require(it, TokenIdentifier);
				semantic = it.PeekPrev().Text;
			}

			// Next should be open scope, function body, end scope
			this.#Require(it, TokenScopeLeft);
			let statements = this.#ParseFunctionBody(it);
			this.#Require(it, TokenScopeRight);

			let f = new ShaderElementFunction(
				type,
				name,
				semantic,
				params,
				statements,
				null);

			// Is this main?
			if (name == "main")
			{
				// Too many mains?
				if (this.#main != null)
					throw new ParseError(it.PeekPrev(), "Multiple main functions detected");

				// Save main specially
				this.#main = f;
			}
			else
			{
				// Just a helper function
				this.#functions.push(f);
			}

			// Found something useful
			return true;
		}
		else if (this.#Allow(it, TokenSemicolon))
		{
			// Should be end of a variable, so add to the global cbuffer and scope
			let v = new VarDec(false, typeToken, nameToken, null, null);
			globalCB.Members.push(v);

			// Found a global variable
			return true;
		}

		// Unsuccessful parse
		return false;
	}


	#ParseFunctionBody(it)
	{
		let statements = [];

		// Go until we find the final end scope
		// TODO: Verify this works with nested blocks
		while (it.Current().Type != TokenScopeRight)
		{
			statements.push(this.#ParseStatement(it));
		}

		return statements;
	}

	#ParseStatement(it)
	{
		// Check for possible statement types
		if (this.#Allow(it, TokenScopeLeft)) return this.#ParseBlock(it);
		if (this.#AllowIdentifier(it, "do")) return this.#ParseDoWhile(it);
		if (this.#AllowIdentifier(it, "for")) return this.#ParseFor(it);
		if (this.#AllowIdentifier(it, "if")) return this.#ParseIf(it);
		if (this.#AllowIdentifier(it, "return")) return this.#ParseReturn(it);
		if (this.#AllowIdentifier(it, "switch")) return this.#ParseSwitch(it);
		if (this.#IsDataType(it.Current().Text) || it.Current().Text == "const") return this.#ParseVarDecStatement(it);
		if (this.#AllowIdentifier(it, "while")) return this.#ParseWhile(it);

		// Check for simple jump statements here
		if (this.#AllowIdentifier(it, "break") ||
			this.#AllowIdentifier(it, "continue") ||
			this.#AllowIdentifier(it, "discard"))
		{
			// Grab the token, then require a semicolon immediately
			let jumpToken = it.PeekPrev();
			this.#Require(it, TokenSemicolon);

			return new StatementJump(jumpToken);
		}

		// No matches?  Try an expression
		return this.#ParseExpressionStatement(it);
	}

	#ParseBlock(it)
	{
		// Assuming open scope already found, loop until matching end scope
		let statements = [];
		while (it.Current().Type != TokenScopeRight)
		{
			statements.push(this.#ParseStatement(it));
		}

		this.#Require(it, TokenScopeRight);

		return new StatementBlock(statements);
	}

	#ParseDoWhile(it)
	{
		// Assuming "do" already found
		let body = this.#ParseStatement(it);

		// Look for: while(EXPRESSION);
		this.#RequireIdentifier(it, "while");
		this.#Require(it, TokenParenLeft);
		let condition = this.#ParseExpression(it);
		this.#Require(it, TokenParenRight);
		this.#Require(it, TokenSemicolon);

		return new StatementDoWhile(body, condition);
	}

	#ParseFor(it)
	{
		// Any piece could be empty: for(;;)
		let initStatement = null; // Statement
		let condExp = null; // Expression
		let iterExp = null; // Expression
		let bodyStatement = null; // Statement

		// Assuming "for" already found
		this.#Require(it, TokenParenLeft);

		// TODO: Handle the comma operator!

		// Init could be a var declaration, or just assignment
		if (this.#IsDataType(it.Current().Text))
		{
			initStatement = this.#ParseVarDecStatement(it); // Already handles semicolon
		}
		else
		{
			// Expression + semicolon
			initStatement = this.#ParseExpressionStatement(it);
			this.#Require(it, TokenSemicolon);
		}

		// Move on to condition, if necessary
		if (it.Current().Type != TokenSemicolon)
		{
			condExp = this.#ParseExpression(it);
		}

		// Semicolon to end cond
		this.#Require(it, TokenSemicolon);

		// Move on to iteration, if necessary
		if (it.Current().Type != TokenParenRight)
		{
			iterExp = this.#ParseExpression(it);
		}

		// Require end paren
		this.#Require(it, TokenParenRight);

		// Parse the body
		bodyStatement = this.#ParseStatement(it);

		// All done
		return new StatementFor(initStatement, condExp, iterExp, bodyStatement);
	}

	#ParseIf(it)
	{
		// Assuming "if" already found
		this.#Require(it, TokenParenLeft);
		let cond = this.#ParseExpression(it);
		this.#Require(it, TokenParenRight);

		// Grab the if block
		let ifBlock = this.#ParseStatement(it);
		let elseBlock = null;

		// Do we have an else?
		if (this.#AllowIdentifier(it, "else"))
		{
			// Note, the else's block might be a whole if/else again!
			elseBlock = this.#ParseStatement(it);
		}

		return new StatementIf(cond, ifBlock, elseBlock);
	}

	#ParseReturn(it)
	{
		// Assuming "return" already found

		// Check for immediate semicolon (for return;)
		if (this.#Allow(it, TokenSemicolon))
		{
			return new StatementReturn(null);
		}

		// Parse the expression
		let exp = this.#ParseExpression(it);
		this.#Require(it, TokenSemicolon);
		return new StatementReturn(exp);
	}

	#ParseSwitch(it)
	{
		// Assuming "switch" already found
		let selectorExpression = null;
		let cases = [];

		// Need a variable inside ( )'s
		this.#Require(it, TokenParenLeft);
		selectorExpression = this.#ParseExpression(it);
		this.#Require(it, TokenParenRight);

		// Require { to start body
		this.#Require(it, TokenScopeLeft);
		// NOTE: This is not a new scope!

		// Loop until we hit a matching }
		let defaultFound = false;
		while (it.Current().Type != TokenScopeRight)
		{
			let caseValue = null; // null -> default, non-null -> case

			// Look for a case or default
			if (this.#AllowIdentifier(it, "case"))
			{
				// Grab the expression for the value
				caseValue = this.#ParseExpression(it);
			}
			else if (this.#AllowIdentifier(it, "default"))
			{
				// Duplicate defaults?
				if (defaultFound)
					throw new ParseError(it.PeekPrev(), "More than one 'default' found in switch statement");

				defaultFound = true;
			}
			else // If it's not case and it's not default
			{
				throw new ParseError(it.Current(), "Invalid token in switch statement: " + it.Current().Text);
			}

			// Must be followed by a colon
			this.#Require(it, TokenColon);

			// Grab statements until we hit case, default or end
			let statements = [];
			while (
				it.Current().Text != "case" &&
				it.Current().Text != "default" &&
				it.Current().Type != TokenScopeRight)
			{
				statements.push(this.#ParseStatement(it));
			}

			// Finished this case or default
			if (caseValue == null)
			{
				cases.push(new StatementDefault(statements));
			}
			else
			{
				cases.push(new StatementCase(caseValue, statements));
			}
		}

		// Need an end scope and we're done
		this.#Require(it, TokenScopeRight);
		return new StatementSwitch(selectorExpression, cases);
	}

	#ParseVarDecStatement(it)
	{
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
		
		// Might be const
		let isConst = this.#AllowIdentifier(it, "const");
		
		// Initial token (data type) not yet used up!
		this.#Require(it, TokenIdentifier);
		let dataTypeToken = it.PeekPrev();

		let varDecs = [];

		do
		{
			// Grab name
			this.#Require(it, TokenIdentifier);
			let varNameToken = it.PeekPrev();

			// Potentially an array?
			let arrayExp = null;
			if (this.#Allow(it, TokenBracketLeft))
			{
				arrayExp = this.#ParseExpression(it);
				this.#Require(it, TokenBracketRight);
			}

			// Any definition?
			let def = null;
			if (this.#AllowOperator(it, "="))
				def = this.#ParseExpression(it);

			// Add to var
			let v = new VarDec(isConst, dataTypeToken, varNameToken, arrayExp, def);
			varDecs.push(v);
		}
		while (this.#Allow(it, TokenComma));

		// Must have at least one var dec
		if (varDecs.length == 0)
			throw new ParseError(it.PeekPrev(), "Variable name expected");

		// Semicolon at end
		this.#Require(it, TokenSemicolon);
		return new StatementVar(isConst, dataTypeToken, varDecs);
	}

	#ParseWhile(it)
	{
		// Assuming "while" already found
		// Look for: (EXPRESSION) STATEMENT
		this.#Require(it, TokenParenLeft);
		let condition = this.#ParseExpression(it);
		this.#Require(it, TokenParenRight);
		let body = this.#ParseStatement(it);

		return new StatementWhile(condition, body);
	}

	#ParseExpressionStatement(it)
	{
		let exp = this.#ParseExpression(it);

		// Require a semicolon after an expression statement
		this.#Require(it, TokenSemicolon);

		return new StatementExpression(exp);
	}

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
	//
	//     x++			y()			z[]			w.a
	//
	//     x++++ NO		y()++ NO 	z[]++ YES	w.a++ YES
	//	   x++() NO		y()() NO	z[]() YES	w.a() YES
	//     x++[] NO		y()[] YES	z[][] YES	w.a[] YES
	//     x++.a NO		y().a YES	z[].a YES	w.a.a YES
	//
	//     ++ is terminal
	//     () cannot have ++ or () after
	//
	//  0: literals/variables/grouping

	#ParseExpression(it)
	{
		return this.#ParseAssignment(it);
	}

	#ParseAssignment(it)
	{
		// Look for next expression precedence first
		let exp = this.#ParseTernary(it);

		// Now look for assignment
		if (this.#AllowOperator(it, "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", "&=", "^=", "|="))
		{
			// Get the actual assignment operator
			let assignOp = it.PeekPrev().Text;

			// Was the expression above a variable?
			let expIsVar = exp instanceof ExpVariable || exp instanceof ExpArray;

			// Not a variable, but maybe part of a member access pattern: obj.member
			if (!expIsVar && exp instanceof ExpMember)
			{
				expIsVar = exp.RightmostChildIsVariableOrArray();
			}

			// Validate variable
			if (!expIsVar)
			{
				throw new ParseError(it.PeekPrev(), "Expected variable or array element for assignment.");
			}

			// Previous token is a variable, so parse the assignment
			return new ExpAssignment(
				exp, // Need whole expression since it might be a member, like: pos.x = 5;
				assignOp,
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
			let expIf = this.#ParseExpression(it);
			
			// Now we must have a ":"
			if (this.#Require(it, TokenColon))
			{
				// Last is the "else" expression
				let expElse = this.#ParseExpression(it);

				return new ExpTernary(
					exp,
					expIf,
					expElse);
			}
			else
			{
				throw new ParseError(it.PeekPrev(), "Expected ':' ternary operator");
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
		// Grab starting expression
		let exp = this.#ParseUnaryOrCast(it);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "*", "/", "%"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseUnaryOrCast(it));
		}

		return exp;
	}

	#ParseUnaryOrCast(it)
	{
		// Check for possible unary operators
		if (this.#AllowOperator(it, "+", "-", "!", "~", "++", "--"))
		{
			return new ExpUnary(
				it.PeekPrev(), // Token we just allowed
				this.#ParseUnaryOrCast(it)); // Next parse, which could be another unary or operand or grouping
		}

		// Check for cast, which follows the (DATATYPE) pattern
		if (it.Current().Type == TokenParenLeft &&
			this.#IsDataType(it.PeekNext().Text) &&
			it.PeekNextNext().Type == TokenParenRight) // Need a 2-token peek here!
		{
			// Move ahead
			this.#Require(it, TokenParenLeft);
			this.#RequireDataType(it);
			let typeToken = it.PeekPrev();

			// Followed by a right paren
			this.#Require(it, TokenParenRight);

			// Successfully found a cast
			return new ExpCast(
				typeToken,
				this.#ParseUnaryOrCast(it));
		}

		// Not a unary, so check next level
		return this.#ParsePostfixCallArrayOrMember(it);
	}

	#ParsePostfixCallArrayOrMember(it)
	{
		// Grab an operand first
		let exp = this.#ParseOperandFuncNameOrGrouping(it);

		// Handle multiple postfix type symbols
		while (true)
		{
			if (!(exp instanceof ExpFunctionCall) && this.#AllowOperator(it, "++", "--")) // Postfix operators (not valid after function calls)
			{
				// Terminal, nothing can follow
				return new ExpPostfix(
					exp,
					it.PeekPrev());
			}
			else if (!(exp instanceof ExpFunctionCall) && this.#Allow(it, TokenParenLeft)) // Left paren --> function call (not valid after another function call)
			{
				// Track all params
				let params = [];
				
				// Is this a right paren?
				if (it.Current().Type != TokenParenRight)
				{
					// Loop and grab comma-separated expressions for parameters
					do
					{
						params.push(this.#ParseExpression(it));
					}
					while (this.#Allow(it, TokenComma));
				}

				// Now require the right paren
				this.#Require(it, TokenParenRight);

				// Definitely have a function call, but is it a member (in the case of texture functions)?
				//  - exp is either ExpFunctionName or ExpMember (in the case of texture functions)
				let funcNameExp = exp; // Assume we're a function name expression
				if (exp instanceof ExpMember) // But if not, we might be a member
				{
					funcNameExp = exp.ExpRight;

					// Validate that the right member expression, in fact, a function name
					if (!(funcNameExp instanceof ExpFunctionName))
						throw new ParseError(it.Current(), "Invalid function call pattern");

					// Replace the right child with a function call (wrapping old right child)
					exp.ExpRight = new ExpFunctionCall(
						exp.ExpRight,
						params);

					this.#CheckForTextureSampleCall(exp);
				}
				else if (exp instanceof ExpFunctionName)
				{
					// Not a member function call, so not a texture sample
					// This is already a function name, so wrap in the function call
					exp = new ExpFunctionCall(
						exp,
						params);

					//this.#CheckForTextureSampleCall(exp); // should always be unnecessary I think?
				}
				else
				{
					throw new ParseError(it.Current(), "Invalid function call pattern");
				}
			}
			else if (this.#Allow(it, TokenBracketLeft)) // Left bracket --> array access
			{
				// Index could be an entire expression
				exp = new ExpArray(
					exp, // Array itself
					this.#ParseExpression(it)); // Index inside [ ]'s

				// Require a right bracket
				this.#Require(it, TokenBracketRight);
			}
			else if (this.#Allow(it, TokenPeriod)) // Period --> member access
			{
				// Very next token must be an identifier!
				this.#Require(it, TokenIdentifier);

				// The right side of the "." could be a function call (for texture sampling)
				// or simply a member (for structs or swizzling).
				let rightSide = null;
				if (it.Current().Type == TokenParenLeft)
				{
					// This is a function
					// Note: the data type won't be known until parameters are parsed, due to overloading
					rightSide = new ExpFunctionName(it.PeekPrev());
				}
				else
				{
					// Grab the data type for this member
					//let dataType = this.#DataTypeFromMemberExpression(exp, it.PeekPrev());
					// Type determination moved to validation
					rightSide = new ExpVariable(it.PeekPrev());//, dataType);
				}
				
				exp = new ExpMember(
					exp, // Left side of "."
					rightSide); // Right side of "."

				// Note: If this member access is really a function call, in
				// the case of texture sampling, the loop will properly handle wrapping this
				// in a function call expression
			}
			else // Nothing useful left
			{
				break;
			}
		}

		return exp;
	}

	#CheckForTextureSampleCall(exp)
	{
		// Pattern we're looking for is texture.SampleFunc()
		// - exp must be member expression
		// - Right must be function
		// - Function's exp must be funcName
		// - Left must be variable (texture)
		if (!(exp instanceof ExpMember) ||
			!(exp.ExpRight instanceof ExpFunctionCall) ||
			!(exp.ExpRight.FuncExp instanceof ExpFunctionName) ||
			!(exp.ExpLeft instanceof ExpVariable))
			return;
		
		// Grab texture name
		let texName = exp.ExpLeft.VarToken.Text;
		if (!this.#IsTexture(texName))
			return;

		// Get the function call expression
		let callExp = exp.ExpRight;
		
		// Grab function name
		// TODO: Determine proper number of params based on function name
		let funcName = callExp.FuncExp.NameToken.Text;
		switch (funcName)
		{
			case "Sample":
				// Pixel shaders only!
				if (this.#shaderType != ShaderTypePixel)
					throw new Error("Sample() only available in pixel shaders");
				break;

			case "SampleLevel": break; // Valid in either type

			default:
				throw new Error("Invalid (or not implemented) texture member function found.");
		}

		// Function must have 2+ parameters to be valid sample function
		if (callExp.Parameters.length <= 1) // TODO: Align with function name above
			throw new Error("Invalid number of parameters for texture sampling function");

		// First param must be variable
		if (!(callExp.Parameters[0] instanceof ExpVariable))
			throw new Error("Sampler expected");

		// Get the sampler name
		let sampName = callExp.Parameters[0].VarToken.Text;
		if (!this.#IsSampler(sampName))
			throw new Error("Sampler expected");

		// Does this combination already exist?
		let combined = null;
		for (let i = 0; i < this.#textureSamplerCombinations.length; i++)
		{
			if (this.#textureSamplerCombinations[i].TextureName == texName &&
				this.#textureSamplerCombinations[i].SamplerName == sampName)
			{
				combined = this.#textureSamplerCombinations[i];
				break;
			}
		}

		// Did we find anything?
		if (combined == null)
		{
			// This is new, so create and add the texture sampler combination
			combined = new ShaderElementCombinedTextureAndSampler(
				texName,
				sampName,
				this.#GetTexture(texName),
				this.#GetSampler(sampName));

			this.#textureSamplerCombinations.push(combined);
		}

		// Track this data in the expression (for ease of ToString() later)
		callExp.IsTextureSample = true;
		callExp.CombinedTextureAndSampler = combined;
	}

	#ParseOperandFuncNameOrGrouping(it)
	{
		let t = it.Current();

		// Check for true, false or numbers
		if (this.#AllowIdentifier(it, "true", "false") ||
			this.#Allow(it, TokenNumericLiteral))
		{
			return new ExpLiteral(it.PeekPrev());
		}

		// Check for variables or function names
		if (this.#Allow(it, TokenIdentifier))
		{
			// Info about the var
			let name = it.PeekPrev().Text;
			let dataType = null;

			// Is the current token now a left parens?  That means function!
			if (it.Current().Type == TokenParenLeft)
			{
				// Note: Data type won't necessarily be known until the parameters are known
				// TODO: Validate function name vs. scoped variable
				return new ExpFunctionName(it.PeekPrev());
			}

			//// Get the variable if it exists (yes this could be optimized)
			//let v = scope.GetVar(name);
			//let t = this.#GetTexture(name);
			//let s = this.#GetSampler(name);
			//if (v != null)
			//{
			//	dataType = v.DataTypeToken.Text;
			//}
			//else if (t != null)
			//{
			//	dataType = t.Type; // Is a texture!
			//}
			//else if (s != null)
			//{
			//	dataType = s.Type; // Is a sampler!
			//}
			//else
			//{
			//	// Not a variable, texture or sampler
			//	throw new ParseError(it.PeekPrev(), "Undeclared identifier '" + it.PeekPrev().Text + "'");
			//}

			return new ExpVariable(it.PeekPrev(), dataType);
		}

		// Check for grouping symbols
		if (this.#Allow(it, TokenParenLeft))
		{
			// Grab expression
			let exp = this.#ParseExpression(it);
			
			// Must be followed by a right parens
			this.#Require(it, TokenParenRight);

			// Create a grouping expression
			return new ExpGroup(exp);
		}

		// Problem! TODO: Better error details
		throw new ParseError(it.Current(), "Unexpected token '" + it.Current().Text + "'");
	}



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
		let glsl = "";

		switch (this.#shaderType)
		{
			case ShaderTypeVertex: glsl = this.#ConvertVertexShader(); break;
			case ShaderTypePixel: glsl = this.#ConvertPixelShader(); break;
			default: throw new Error("Invalid shader type");
		}
		
		return glsl;
	}

	#GetStructByName(name)
	{
		for (let s = 0; s < this.#structs.length; s++)
			if (this.#structs[s].Name == name)
				return this.#structs[s];

		return null;
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

		// Simple casting 4x4
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
		glsl += this.#GetGlobalConstantsString();
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHLSLOnlyFunctions();
		glsl += this.#GetMatrixConstructors();
		glsl += this.#GetTextureSamplerString();
		glsl += this.#GetFunctionsString();
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
			if (this.#IsStruct(param.DataTypeToken.Text))
			{
				let struct = this.#GetStructByName(param.DataTypeToken.Text);
				if (struct == null)
					throw new Error("Invalid data type in vertex shader input");

				// Add each struct member to the VS input
				for (let v = 0; v < struct.Members.length; v++)
				{
					vsInputs.push(struct.Members[v]);
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
				HLSL.TranslateToGLSL(vsInputs[i].DataTypeToken.Text) + " " +
				PrefixAttribute + vsInputs[i].NameToken.Text + ";\n";
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

		for (let v = 0; v < struct.Members.length; v++)
		{
			let member = struct.Members[v];

			// Skip SV_POSITION
			if (member.Semantic != null &&
				member.Semantic.toUpperCase() == "SV_POSITION")
				continue;

			vary += "out " + HLSL.TranslateToGLSL(member.DataTypeToken.Text);	// Data type - Note: "varying" to "out" for GLSL 3
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
			str += "struct " + HLSL.TranslateToGLSL(struct.Name) + "\n";
			str += "{\n";

			// Handle each variable (no semantics)
			for (let v = 0; v < struct.Members.length; v++)
			{
				let variable = struct.Members[v];
				str += "\t" + HLSL.TranslateToGLSL(variable.DataTypeToken.Text); // Datatype
				str += " " + HLSL.TranslateToGLSL(variable.NameToken.Text); // Identifier

				// Array?
				if (variable.ArrayExpression != null)
				{
					str += "[" + variable.ArrayExpression.ToString(ShaderLanguageGLSL, "") + "]";
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
	// TODO: Parameterize language!!
	#GetCBuffersString()
	{
		let cbStr = "";
		let prefix = "";
		switch (this.#shaderType)
		{
			case ShaderTypePixel: prefix = PrefixPSCBuffer; break;
			case ShaderTypeVertex: prefix = PrefixVSCBuffer; break;
		}

		for (let c = 0; c < this.#cbuffers.length; c++)
		{
			// Start the uniform block
			let cb = this.#cbuffers[c];
			cbStr += "layout(std140) uniform " + HLSL.TranslateToGLSL(prefix + cb.Name) + "\n";
			cbStr += "{\n";

			// Handle each variable (no semantics)
			for (let v = 0; v < cb.Members.length; v++)
			{
				let variable = cb.Members[v];
				cbStr += "\t" + HLSL.TranslateToGLSL(variable.DataTypeToken.Text); // Datatype
				cbStr += " " + HLSL.TranslateToGLSL(variable.NameToken.Text); // Identifier

				// Array?
				if (variable.ArrayExpression != null)
				{
					cbStr += "[" + variable.ArrayExpression.ToString(ShaderLanguageGLSL, "") + "]"; // MUST PARAMETERIZE THIS
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

	#GetGlobalConstantsString()
	{
		let glsl = "";

		for (let i = 0; i < this.#globalConstants.length; i++)
		{
			glsl += this.#globalConstants[i].ToString(ShaderLanguageGLSL, "") + "\n";
		}

		glsl += "\n";
		return glsl;
	}

	#GetFunctionsString()
	{
		let functions = "";
		for (let f = 0; f < this.#functions.length; f++)
		{
			functions += this.#functions[f].ToString(ShaderLanguageGLSL) + "\n\n";
		}

		functions += this.#main.ToString(ShaderLanguageGLSL, "hlsl_") + "\n\n";
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
				main += "\t" + "uint " + vsInputs[v].NameToken.Text + " = ";
				main += "uint(gl_VertexID);\n";
			}
			else
			{
				main += "\t" + HLSL.TranslateToGLSL(vsInputs[v].DataTypeToken.Text) + " " + vsInputs[v].NameToken.Text + " = ";
				main += PrefixAttribute + vsInputs[v].NameToken.Text + ";\n";
			}
		}

		// Are any of the actual function inputs structs?
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			let param = this.#main.Parameters[p];
			if (this.#IsStruct(param.DataTypeToken.Text))
			{
				// Yes, so build a struct object and "hook up" vsInputs
				let newParamName = HLSL.TranslateToGLSL(param.NameToken.Text);
				main += "\n\t" + param.DataTypeToken.Text;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				let struct = this.#GetStructByName(param.DataTypeToken.Text);
				for (let v = 0; v < struct.Members.length; v++)
				{
					let member = struct.Members[v];
					main += "\t" + newParamName + "." + HLSL.TranslateToGLSL(member.NameToken.Text) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       vsInput identifier used throughout the rest of the function
					main += HLSL.TranslateToGLSL(member.NameToken.Text) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + HLSL.TranslateToGLSL(this.#main.ReturnType) + " " + PrefixVSOutput + " = hlsl_main(";
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			main += HLSL.TranslateToGLSL(this.#main.Parameters[p].NameToken.Text);
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
			for (let v = 0; v < struct.Members.length; v++)
			{
				let member = struct.Members[v];

				// Is this our SV_Position?
				if (member.Semantic != null &&
					member.Semantic.toUpperCase() == "SV_POSITION")
				{
					// Remember for later
					posName = member.NameToken.Text;
				}
				else
				{
					// This is other VS->PS data (varying identifier is semantic!)
					main += "\t" + PrefixVarying + member.Semantic + " = " + PrefixVSOutput + "." + member.NameToken.Text + ";\n";
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
			if (this.#IsStruct(param.DataTypeToken.Text))
			{
				let struct = this.#GetStructByName(param.DataTypeToken.Text);
				if (struct == null)
					throw new Error("Invalid data type in pixel shader input");

				// Add each struct member to the VS input
				for (let v = 0; v < struct.Members.length; v++)
				{
					psInputs.push(struct.Members[v]);
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
			if (this.#IsStruct(param.DataTypeToken.Text))
			{
				// This param is an entire struct, so make a varying for each member
				// Note: Using semantic as varying identifiers!
				let struct = this.#GetStructByName(param.DataTypeToken.Text);
				for (let v = 0; v < struct.Members.length; v++)
				{
					let member = struct.Members[v];

					// Skip SV_POSITION
					if (member.Semantic != null &&
						member.Semantic.toUpperCase() == "SV_POSITION")
					{
						needFragCoord = true;
						continue;
					}

					vary += "in " + HLSL.TranslateToGLSL(member.DataTypeToken.Text); // Data type - Note: "varying" to "in" for GLSL 3
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
				vary += "in " + HLSL.TranslateToGLSL(param.DataTypeToken.Text); // Data type
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
			main += "\t" + HLSL.TranslateToGLSL(psInputs[v].DataTypeToken.Text) + " " + psInputs[v].NameToken.Text + " = ";

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
			if (this.#IsStruct(param.DataTypeToken.Text))
			{
				// Yes, so build a struct object and "hook up" psInputs
				let newParamName = HLSL.TranslateToGLSL(param.NameToken.Text);
				main += "\n\t" + param.DataTypeToken.Text;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				let struct = this.#GetStructByName(param.DataTypeToken.Text);
				for (let v = 0; v < struct.Members.length; v++)
				{
					let member = struct.Members[v];
					main += "\t" + newParamName + "." + HLSL.TranslateToGLSL(member.NameToken.Text) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       psInput identifier used throughout the rest of the function
					main += HLSL.TranslateToGLSL(member.NameToken.Text) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + HLSL.TranslateToGLSL(this.#main.ReturnType) + " " + PrefixPSOutput + " = hlsl_main(";
		for (let p = 0; p < this.#main.Parameters.length; p++)
		{
			main += HLSL.TranslateToGLSL(this.#main.Parameters[p].NameToken.Text);
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
			for (let v = 0; v < struct.Members.length; v++)
			{
				let member = struct.Members[v];

				// Is this our SV_Position?
				if (member.Semantic != null &&
					(member.Semantic.toUpperCase() == "SV_TARGET" ||
						member.Semantic.toUpperCase() == "SV_TARGET0"))
				{
					// Remember for later
					targetName = member.NameToken.Text;
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
		glsl += this.#GetGlobalConstantsString();
		glsl += this.#GetStructsString();
		glsl += this.#GetCBuffersString();
		glsl += this.#GetHLSLOnlyFunctions();
		glsl += this.#GetMatrixConstructors();
		glsl += this.#GetTextureSamplerString();
		glsl += this.#GetFunctionsString();
		glsl += this.#BuildPixelShaderMain(psInputs);
		
		return glsl;
	}

}

class ShaderElement { }

class ShaderElementCBuffer extends ShaderElement
{
	Name;
	NameGL;
	RegisterIndex;
	Members;

	constructor(name, nameGL, regIndex, members = [])
	{
		super();

		this.Name = name;
		this.NameGL = nameGL;
		this.RegisterIndex = regIndex;
		this.Members = members;
	}
}

class ShaderElementFunction extends ShaderElement
{
	ReturnType;
	Name;
	Semantic;
	Parameters; // Changed to VarDec objects
	Statements;

	constructor(returnType, name, semantic, params, statements)
	{
		super();

		this.ReturnType = returnType;
		this.Name = name;
		this.Semantic = semantic;
		this.Parameters = params;
		this.Statements = statements;
	}

	ToString(lang, prependName = "")
	{
		let s = "";
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL: throw new Error("IMPLEMENT ME"); // TODO: Implement
			case ShaderLanguageGLSL:

				s += HLSL.TranslateToGLSL(this.ReturnType) + " " + HLSL.TranslateToGLSL(prependName + this.Name) + "(";

				for (let p = 0; p < this.Parameters.length; p++)
				{
					s += this.Parameters[p].ToString(lang, true); // Include declaration!

					if (p < this.Parameters.length - 1)
						s += ", ";
				}

				s += ")\n";
				s += "{\n";

				for (let i = 0; i < this.Statements.length; i++)
				{
					s += this.Statements[i].ToString(lang, "\t") + "\n";
				}

				s += "}";

				break;
		}

		return s;
	}
}

class ShaderElementSampler extends ShaderElement
{
	Type;
	Name;
	RegisterIndex;

	constructor(type, name, regIndex)
	{
		super();

		this.Type = type;
		this.Name = name;
		this.RegisterIndex = regIndex;
	}
}


class ShaderElementStruct extends ShaderElement
{
	Name;
	Members;

	constructor(name, members)
	{
		super();

		this.Name = name;
		this.Members = members;
	}

	ToString(lang)
	{
		let s = "struct " + this.Name + "\n";
		s += "{\n";

		for (let m = 0; m < this.Members.length; m++)
		{
			s += this.Members[m].ToString(lang, "\t");
		}

		s += "}\n";
		return s;
	}
}

class ShaderElementTexture extends ShaderElement
{
	Type;
	Name;
	RegisterIndex;

	constructor(type, name, regIndex)
	{
		super();

		this.Type = type;
		this.Name = name;
		this.RegisterIndex = regIndex;
	}
}

class ShaderElementCombinedTextureAndSampler extends ShaderElement
{
	TextureName;
	SamplerName;
	CombinedName;
	Texture;
	Sampler;

	constructor(textureName, samplerName, textureObject, samplerObject)
	{
		super();

		this.TextureName = textureName;
		this.SamplerName = samplerName;
		this.CombinedName = "combined_" + textureName + "_" + samplerName;

		this.Texture = textureObject;
		this.Sampler = samplerObject;
	}
}



class Statement { }

class StatementBlock extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
	}

	// Adds scope, validates internal statements, removes scope
	Validate(scope)
	{
		scope.PushScope(ScopeTypeBlock);

		for (let i = 0; i < this.Statements.length; i++)
		{
			this.Statements[i].Validate(scope);
		}

		scope.PopScope();
	}

	ToString(lang, indent = "")
	{
		let s = indent + "{\n";

		for (let i = 0; i < this.Statements.length; i++)
			s += this.Statements[i].ToString(lang, indent + "\t") + "\n";

		s += indent + "}";
		return s;
	}
}

class StatementCase extends Statement
{
	CaseValueExpression;
	Statements;

	constructor(caseValueExp, statements)
	{
		super();
		this.CaseValueExpression = caseValueExp;
		this.Statements = statements;
	}

	// TODO: Need to pass potential return type through
	// to validate returns!
	// TODO: Validate fall-through (only on empty cases?)
	Validate(scope, selectorExpression)
	{
		// Note: No inherent additional scope

		// Validate case type matches switch type
		this.CaseValueExpression.Validate(scope);
		/* TODO: Check types */

		for (let i = 0; i < this.Statements.length; i++)
			this.Statements[i].Validate(scope);
	}

	ToString(lang, indent = "")
	{
		let s = indent + "case " + this.CaseValueExpression.ToString(lang) + ":\n";

		for (let i = 0; i < this.Statements.length; i++)
			s += this.Statements[i].ToString(lang, indent + "\t") + "\n";

		return s;
	}
}

// TODO: Consolidate this into the StatementCase with a simple boolean for "is default"?
// - Or even rely on the case value expression (null -> default)
class StatementDefault extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
	}

	Validate(scope, selectorExpression) // Matching overload of StatementCase.Validate()
	{
		// Note: No inherent additional scope
		for (let i = 0; i < this.Statements.length; i++)
			this.Statements[i].Validate(scope);
	}

	ToString(lang, indent = "")
	{
		let s = indent + "default:\n";

		for (let i = 0; i < this.Statements.length; i++)
			s += this.Statements[i].ToString(lang, indent + "\t") + "\n";

		return s;
	}
}

class StatementDoWhile extends Statement
{
	Body;
	Condition;

	constructor(body, cond)
	{
		super();
		this.Body = body;
		this.Condition = cond;
	}

	Validate(scope)
	{
		// Add loop scope
		scope.PushScope(ScopeTypeLoop);

		this.Body.Validate(scope);
		this.Condition.Validate(scope);
		// TODO: Verify condition evaluates to a boolean

		// Remove scope
		scope.PopScope();
	}

	ToString(lang, indent = "")
	{
		let s = indent + "do\n";
		s += this.Body.ToString(lang, indent + "\t");
		s += indent + "while(" + this.Condition.ToString(lang) + ");\n";
		return s;
	}
}

class StatementExpression extends Statement
{
	Exp;

	constructor(exp)
	{
		super();
		this.Exp = exp;
	}

	Validate(scope)
	{
		this.Exp.Validate(scope);
	}

	ToString(lang, indent = "")
	{
		return indent + this.Exp.ToString(lang) + ";";
	}
}

class StatementFor extends Statement
{
	InitStatement;
	ConditionExpression;
	IterateExpression;
	BodyStatement;

	constructor(initStatement, condExp, iterExp, bodyStatement)
	{
		super();
		this.InitStatement = initStatement;
		this.ConditionExpression = condExp;
		this.IterateExpression = iterExp;
		this.BodyStatement = bodyStatement;
	}

	Validate(scope)
	{
		// New scope
		scope.PushScope(ScopeTypeLoop);

		// TODO: Allow any of these to be "empty"
		this.InitStatement.Validate(scope);
		this.ConditionExpression.Validate(scope); // Note: "Empty" equates to true!
		this.IterateExpression.Validate(scope);

		this.BodyStatement.Validate(scope);

		// Remove scope
		scope.PopScope();
	}

	ToString(lang, indent = "")
	{
		let s = indent + "for(";
		s += this.InitStatement.ToString(lang, "") + " ";
		s += this.ConditionExpression.ToString(lang) + "; ";
		s += this.IterateExpression.ToString(lang) + ")\n";

		s += this.BodyStatement.ToString(lang, indent + "\t");
		return s;
	}
}

class StatementIf extends Statement
{
	Condition;
	If;
	Else;

	constructor(cond, ifBlock, elseBlock)
	{
		super();
		this.Condition = cond;
		this.If = ifBlock;
		this.Else = elseBlock;
	}

	Validate(scope)
	{
		// TODO: Verify condition evals to a bool
		this.Condition.Validate(scope);

		scope.PushScope(ScopeTypeConditional);
		this.If.Validate(scope);
		scope.PopScope();

		if (this.Else != null)
		{
			scope.PushScope(ScopeTypeConditional);
			this.Else.Validate(scope);
			scope.PopScope();
		}
	}

	ToString(lang, indent = "")
	{
		let s = indent + "if(" + this.Condition.ToString(lang) + ")\n";

		s += this.If.ToString(lang, indent + "\t") + "\n";

		if (this.Else != null)
		{
			s += indent + "else\n";
			s += this.Else.ToString(lang, indent + "\t") + "\n";
		}
		
		return s;
	}
}

class StatementJump extends Statement
{
	JumpToken;

	constructor(jumpToken)
	{
		super();
		this.JumpToken = jumpToken;
	}

	Validate(scope)
	{
		// TODO: Anything here?  Should just be "break" or "continue" I think?
	}

	ToString(lang, indent = "")
	{
		return indent + this.JumpToken.Text + ";";
	}
}

class StatementReturn extends Statement
{
	Expression;

	constructor(exp)
	{
		super();
		this.Expression = exp;
	}

	Validate(scope)
	{
		if (this.Expression != null)
			this.Expression.Validate(scope);

		// TODO: Verify this matches enclosing function type (or "empty") for null
		// - First, verify we're in a function scope: 
		// - Then, compare type (or void): 
	}

	ToString(lang, indent = "")
	{
		if (this.Expression == null)
			return index + "return;";

		return indent + "return " + this.Expression.ToString(lang) + ";";
	}
}

class StatementSwitch extends Statement
{
	SelectorExpression;
	Cases;

	constructor(selectorExp, cases)
	{
		super();
		this.SelectorExpression = selectorExp;
		this.Cases = cases;
	}

	Validate(scope)
	{
		scope.PushScope(ScopeTypeSwitch);

		this.SelectorExpression.Validate(scope); // TODO: Ensure this is a simple variable?
		for (let i = 0; i < this.Cases.length; i++)
		{
			this.Cases[i].Validate(scope, this.SelectorExpression);
		}

		// TODO: Need at least one case?

		scope.PopScope();
	}

	ToString(lang, indent = "")
	{
		let s = indent + "switch(" + this.SelectorExpression.ToString(lang) + ")\n";
		s += indent + "{\n";

		for (let c = 0; c < this.Cases.length; c++)
			s += this.Cases[c].ToString(lang, indent + "\t");

		s += indent + "}";
		return s;
	}
}

class StatementWhile extends Statement
{
	Condition;
	Body;

	constructor(cond, body)
	{
		super();
		this.Condition = cond;
		this.Body = body;
	}

	Validate(scope)
	{
		scope.PushScope(ScopeTypeLoop);

		this.Condition.Validate(scope);
		// TODO: Verify condition evaluates to a bool
		this.Body.Validate(scope);

		scope.PopScope();
	}

	ToString(lang, indent = "")
	{
		let s = indent + "while(" + this.Condition.ToString(lang) + ")\n";
		s += this.Body.ToString(lang, indent + "\t");
		return s;
	}
}

class StatementVar extends Statement
{
	IsConst;
	DataTypeToken;
	VarDecs; // Array of possible declarations, separated by commas

	constructor(isConst, dataTypeToken, varDecs)
	{
		super();
		this.IsConst = isConst;
		this.DataTypeToken = dataTypeToken;
		this.VarDecs = varDecs;
	}

	Validate(scope)
	{
		for (let i = 0; i < this.VarDecs.length; i++)
		{
			this.VarDecs[i].Validate(scope);
			scope.AddVar(this.VarDecs[i]);
		}
		// TODO: Need at least one var dec!
	}

	ToString(lang, indent = "")
	{
		let s = indent;

		for (let v = 0; v < this.VarDecs.length; v++)
		{
			if (v > 0) s += ", ";
			s += this.VarDecs[v].ToString(lang, v == 0); // Include declaration on the first one
		}

		s += ";";
		return s;
	}
}

class VarDec extends Statement
{
	DataTypeToken;
	NameToken;

	ArrayExpression;
	DefinitionExpression;

	IsConst;
	InputModifier;
	InterpModifiers;
	Semantic;

	constructor(isConst, dataTypeToken, nameToken, arrayExp, defExp, inputMod = null, interpMods = [], semantic = null)
	{
		super();

		this.IsConst = isConst;
		this.DataTypeToken = dataTypeToken;
		this.NameToken = nameToken;

		this.ArrayExpression = arrayExp;
		this.DefinitionExpression = defExp;

		this.InputModifier = inputMod;
		this.InterpModifiers = interpMods;
		this.Semantic = semantic;
	}

	Validate(scope)
	{
		// TOOD: Verify variable doesn't already exist in scope

		if (this.ArrayExpression != null)
			this.ArrayExpression.Validate(scope); // TODO: Must evaluate to an int

		if (this.DefinitionExpression != null)
			this.DefinitionExpression.Validate(scope); // TODO: Must match data type!

		// TODO: Verify modifiers/semantics are valid
	}

	ToString(lang, includeDeclaration)
	{
		let s = "";

		// Should we include the overall declaration?
		if (includeDeclaration)
		{
			if (this.IsConst)
				s += "const ";

			for (let i = 0; lang == ShaderLanguageHLSL && i < this.InterpModifiers.length; i++)
				s += this.InterpModifiers[i] + " "; 	// Interpolation mods only in HLSL

			if (this.InputModifier != null)
				s += this.InputModifier + " ";

			// Data type
			switch (lang)
			{
				default:
				case ShaderLanguageHLSL: s += this.DataTypeToken.Text + " "; break;
				case ShaderLanguageGLSL:s += HLSL.TranslateToGLSL(this.DataTypeToken.Text) + " "; break;
			}
		}

		// Identifier
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL: s += this.NameToken.Text; break;
			case ShaderLanguageGLSL: s += HLSL.TranslateToGLSL(this.NameToken.Text); break;
		}

		if (this.ArrayExpression != null)
			s += "[" + this.ArrayExpression.ToString(lang) + "]";

		if (lang == ShaderLanguageHLSL && this.Semantic != null)
			s += " : " + this.Semantic;

		if (this.DefinitionExpression != null)
			s += " = " + this.DefinitionExpression.ToString(lang);

		return s;
	}
}


class Expression
{
	DataType;
}

class ExpArray extends Expression
{
	ExpArrayVar;
	ExpIndex;

	constructor(expArrayVar, expIndex)
	{
		super();
		this.ExpArrayVar = expArrayVar;
		this.ExpIndex = expIndex;

		//this.DataType = expArrayVar.DataType;
		//console.log("Array data type: " + this.DataType);
	}

	Validate(scope)
	{
		this.ExpArrayVar.Validate(scope);
		this.ExpIndex.Validate(scope);
		// TOOD: Ensure index evaluates to an int
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.ExpArrayVar.ToString(lang) + "[" + this.ExpIndex.ToString(lang) + "]";
	}
}

class ExpAssignment extends Expression
{
	VarExp;
	AssignOperator;
	AssignExp;

	constructor(varExp, assignOp, assignExp)
	{
		super();
		this.VarExp = varExp;
		this.AssignOperator = assignOp;
		this.AssignExp = assignExp;

		// Data type matches assigned value (so, the variable itself?)
		//this.DataType = varExp.DataType;
		//console.log("Assignment data type: " + varExp.DataType);
	}

	Validate(scope)
	{
		this.VarExp.Validate(scope);
		this.AssignExp.Validate(scope);

		// TODO: Verify assignment evaluates to compatible type w/ variable
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.VarExp.ToString(lang) + " " + this.AssignOperator + " " + this.AssignExp.ToString(lang);
	}
}

class ExpBinary extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		super();
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;

		// Validate
		// - expression type compatibility with operator
		// - expression type compatibility with each other

		// ==, !=
		// <, <=, >, >=
		// <<, >>,
		// +, -
		// *, /, %

		// Check operators
		//switch (opToken.Text)
		//{
		//	// Math
		//	//  - Scalar, per - component vector or per - component matrix
		//	//  - Result is equivalent scalar, vector or matrix of larger type
		//	//  - NOTE: (int + uint) --> int implicit casts to uint (basically wrapping around from max value)
		//	case "+": case "-": case "*": case "/": case "%":

		//		this.DataType = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);
		//		//console.log("Binary operator type: " + this.DataType);

		//		break;

		//	// Comparison 
		//	//  - Scalar, per-component vector or per-component matrix
		//	//  - Result is equivalent bool scalar, vector or matrix
		//	case "==": case "!=": case "<": case "<=": case ">": case ">=":

		//		let a = HLSLDataTypeDetails[expLeft.DataType];
		//		let b = HLSLDataTypeDetails[expRight.DataType];

		//		// Validate type and dimensions
		//		if (a.SVM != b.SVM ||
		//			a.Components != b.Components ||
		//			a.Rows != b.Rows ||
		//			a.Cols != b.Cols)
		//			throw new ParseError(opToken, "Invalid operands for comparison operator"); // TODO: Real error message

		//		if (a.SVM == "scalar") this.DataType = "bool";
		//		else if (a.SVM == "vector") this.DataType = "bool" + a.Components.toString();
		//		else if (a.SVM == "matrix") this.DataType = "bool" + a.Rows.toString() + "x" + a.Cols.toString();
		//		else
		//			throw new ParseError(opToken, "Invalid operands for comparison operator");

		//		//console.log("Comparison operator type: " + this.DataType);
		//		break;

		//	// Shift
		//	//  - Must be int, uint or bool (implicit cast to int)
		//	//  - Result is int or uint
		//	case "<<": case ">>":
		//		// TODO: Validate types

		//		this.DataType = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);;
		//		//console.log("Shift operator type: " + this.DataType);
		//		break;

		//}
	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);
		this.ExpRight.Validate(scope);

		// TODO: Verify types are compatible
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.ExpLeft.ToString(lang) + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToString(lang);
	}
}

class ExpBitwise extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		super();
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;

		//let type = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);
		//this.DataType = type;
		//console.log("Bitwise type: " + type);

		// TODO: Validate that both expressions are int or uint!
		// See https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-operators#bitwise-operators

	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);
		this.ExpRight.Validate(scope);

		// TODO: Verify types are compatible (and both expressions are int or uint!)
		// See https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-operators#bitwise-operators
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.ExpLeft.ToString(lang) + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToString(lang);
	}
}

class ExpCast extends Expression
{
	TypeToken;
	Exp;

	constructor(typeToken, exp)
	{
		super();
		this.TypeToken = typeToken;
		this.Exp = exp;

		//this.DataType = typeToken.Text;
		//console.log("Cast found: " + typeToken.Text);
	}

	Validate(scope)
	{
		this.Exp.Validate(scope);
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL: return "(" + this.TypeToken.Text + ")" + this.Exp.ToString(lang); // (int)thing
			case ShaderLanguageGLSL: return HLSL.TranslateToGLSL(this.TypeToken.Text) + "(" + this.Exp.ToString(lang) + ")"; // int(thing)
		}
	}
}

class ExpFunctionCall extends Expression
{
	FuncExp; // ALWAYS a ExpFunctionName now!
	Parameters;

	IsTextureSample;
	CombinedTextureAndSampler;

	constructor(funcExp, params)
	{
		super();

		this.FuncExp = funcExp;
		this.Parameters = params;

		this.IsTextureSample = false;
		this.CombinedTextureAndSampler = null;
	}

	Validate(scope)
	{
		// Validate the function name
		this.FuncExp.Validate(scope);
	
		// Validate all parameters to the function call
		for (let i = 0; i < this.Parameters.length; i++)
			this.Parameters[i].Validate(scope);
		
		// Determine the data type
		// - First, is this a texture sample?
		if (this.IsTextureSample)
		{
			// Get the function name
			let funcName = this.FuncExp.NameToken.Text;
			if (!HLSLTextureSampleConversion.hasOwnProperty(funcName))
				throw new ValidationError(this.FuncExp.NameToken, "Invalid texture sample function");

			this.DataType = HLSLTextureSampleConversion[funcName].DataType;
		}
		else
		{
			// Not a texture sample, so handle type another way
			let dataType = scope.GetFunctionReturnType(this);

			// ************ NEXT ***************

			
		}
	}

	ToString(lang)
	{
		// Is this GLSL AND its a texture sample function?
		if (lang == ShaderLanguageGLSL && this.IsTextureSample)
		{
			// Get the hlsl texture sample function
			let hlslTextureFunc = this.FuncExp.NameToken.Text;
			
			if (!HLSLTextureSampleConversion.hasOwnProperty(hlslTextureFunc))
				throw new Error("Sample function type not yet implemented!");

			// Grab the glsl equivalent to start the string
			// This replaces the 'texture.Sample(sampler, ' pattern
			let s = HLSLTextureSampleConversion[hlslTextureFunc].Name + "(" + this.CombinedTextureAndSampler.CombinedName + ", ";
			
			// The second parameter of the function is the texture coordinate
			// This must be wrapped to flip the Y coord
			let uv = this.Parameters[1].ToString(lang);
			switch (this.CombinedTextureAndSampler.Texture.Type)
			{
				// 1D textures are really just 2D textures with a height of 1, so we need
				// to wrap the single (float) value in a vec2(v, 0)
				case "Texture1D": uv = "vec2(" + uv + ", 0.5)"; break;

				// Add in extra UV work to flip Y
				// - What we want is: uv.y = 1 - uv.y
				// - For that, we'll do: (0,1) + (1,-1) * uvExpression
				case "Texture2D": uv = "vec2(0.0, 1.0) + vec2(1.0, -1.0) * (" + uv + ")"; break;

				// Add in extra UV work to flip Y
				// - What we want is: uv.y = 1 - uv.y
				// - For that, we'll do: (0,1,0) + (1,-1,0) * uvExpression
				case "Texture3D": uv = "vec3(0.0, 1.0, 0.0) + vec3(1.0, -1.0, 1.0) * (" + uv + ")"; break;

				// Just flip the Y for the cube direction
				case "TextureCube": uv = "vec3(1.0, -1.0, 1.0) * (" + uv + ")"; break;

				default:
					throw new Error("Invalid texture type or not yet implemented");
			}
			s += uv;

			// Include any other parameters
			for (let i = 2; i < this.Parameters.length; i++)
			{
				s += ", " + this.Parameters[i].ToString(lang);
			}

			// Finalize call
			s += ")";
			return s;
		}
		else // HLSL or non-texture-sample GLSL
		{
			// Grab function expression
			let s = this.FuncExp.ToString(lang);

			// If we're in GLSL, see if the function expression is a simple matrix constructor
			// Note, this needs to happen manually (BEFORE) an overall data type translation!
			if (lang == ShaderLanguageGLSL &&
				this.FuncExp instanceof ExpFunctionName)
			{
				let text = this.FuncExp.NameToken.Text;
				if(HLSLMatrixConstructorConversion.hasOwnProperty(text))
					s = HLSLMatrixConstructorConversion[text];
			}
			
			// Parameter list
			s += "(";
			for (let p = 0; p < this.Parameters.length; p++)
			{
				if (p > 0) s += ", ";

				s += this.Parameters[p].ToString(lang);
			}
			s += ")";
			return s;
		}
	}
}

class ExpFunctionName extends Expression
{
	NameToken;

	constructor(nameToken)
	{
		super();
		this.NameToken = nameToken;
		
	}

	Validate(scope)
	{
		this.DataType = null; // Will be handled by the function call expression
		// TOOD: Anything else to do here?  Can't verify the function exists since we need the params, too!
	}

	ToString(lang)
	{
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL: return this.NameToken.Text;
			case ShaderLanguageGLSL: return HLSL.TranslateToGLSL(this.NameToken.Text);
		}
	}
}

class ExpGroup extends Expression
{
	Exp;

	constructor(exp)
	{
		super();
		this.Exp = exp;
		
		//this.DataType = exp.DataType;
		//console.log("Grouping found: " + exp.DataType);
	}

	Validate(scope)
	{
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return "(" + this.Exp.ToString(lang) + ")";
	}
}

class ExpLiteral extends Expression
{
	LiteralToken;

	constructor(litToken)
	{
		super();
		this.LiteralToken = litToken;
	}

	Validate(scope)
	{
		// Finalize data type
		this.DataType = scope.DataTypeFromLiteralToken(this.LiteralToken);
		//console.log("VALIDATION - Literal - " + this.LiteralToken.Text + " - " + this.DataType);
	}

	ToString(lang)
	{
		return this.LiteralToken.Text;
	}
}

class ExpLogical extends Expression
{
	ExpLeft;
	OperatorToken;
	ExpRight;

	constructor(expLeft, opToken, expRight)
	{
		super();
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;
		this.ExpRight = expRight;
	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);
		this.ExpRight.Validate(scope);

		// TODO: Verify expressions are compatible

		// Always a bool
		this.DataType = "bool";
		//console.log("VALIDATION - Logical Expression");
	}

	ToString(lang)
	{
		return this.ExpLeft.ToString(lang) + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToString(lang);
	}
}

class ExpMember extends Expression
{
	ExpLeft;
	ExpRight;

	constructor(expLeft, expRight)
	{
		super();
		
		this.ExpLeft = expLeft;
		this.ExpRight = expRight;
	}

	Validate(scope)
	{
		// Validate the left as normal
		this.ExpLeft.Validate(scope);
		
		// Temporarily add struct members to scope as we hit member access?
		//  - Feels a little dirty, but let's try it
		if (this.ExpRight instanceof ExpVariable) // Right side is "var", like color.rgb or light.position
		{
			//console.log(this.ExpLeft.constructor.name);
			// Use the left's data type as the struct (like "float3"), and check the members
			let rightType = scope.GetStructVariableDataType(this.ExpLeft.DataType, this.ExpRight.VarToken.Text);
			if (rightType == null)
			{
				throw new ValidationError(this.ExpRight.VarToken, "Invalid variable (need a better error message here)");
				// Found a matching type, so add it to the scope stack temporarily
				//scope.AddShortTermVar(this.ExpRight.VarToken.Text, rightType);

				// TODO: POTENTIAL BUG with light.position.position.position due to recursive validation?
			}
			
			// Just set the type rather than a full validation
			this.ExpRight.DataType = rightType;
		}
		else
		{
			// Standard validation, since it's not a variable
			this.ExpRight.Validate(scope);
		}
		
		// Clear short term scope now that right-side is evaluated
		//scope.ClearShortTermVars();

		// The data type of the member access is that of the right expression
		this.DataType = this.ExpRight.DataType;
	}

	GetRightmostChild()
	{
		let current = this.ExpRight;

		while (current instanceof ExpMember)
		{
			current = current.ExpRight;
		}

		return current;
	}

	RightmostChildIsVariableOrArray()
	{
		let rightmost = this.GetRightmostChild();
		return (rightmost instanceof ExpVariable) || (rightmost instanceof ExpArray);
	}

	ToString(lang)
	{
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL:
				return this.ExpLeft.ToString(lang) + "." + this.ExpRight.ToString(lang);

			case ShaderLanguageGLSL:

				let l = this.ExpLeft.ToString(lang);
				let r = this.ExpRight.ToString(lang);

				// Is this a texture sample?  If so, we don't follow the left.right pattern!
				// - albedo.Sample(...) --> texture(...)
				if (this.ExpRight instanceof ExpFunctionCall && this.ExpRight.IsTextureSample)
					return r;

				// Check for matrix element conversion, which should
				// replace the .mXY pattern with [X][Y] (removing the dot)
				if (HLSLMatrixElementConversion.hasOwnProperty(r))
				{
					return l + HLSLMatrixElementConversion[r];
				}
				
				return l + "." + r;
		}
	}
}

class ExpPostfix extends Expression
{
	ExpLeft;
	OperatorToken;

	constructor(expLeft, opToken)
	{
		super();
		this.ExpLeft = expLeft;
		this.OperatorToken = opToken;

		// Data type matches expression
		//this.DataType = this.ExpLeft.DataType;
		//console.log("Postfix Data Type: " + this.DataType);
	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);

		// TODO: Validate that the expression is numeric
		//  - numeric variable
		//  - member that is numeric variable: thing.x, thing.other.x, etc.
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.ExpLeft.ToString(lang) + this.OperatorToken.Text;
	}
}

class ExpTernary extends Expression
{
	ExpCondition
	ExpIf;
	ExpElse;

	constructor(expCondition, expIf, expElse)
	{
		super();
		this.ExpCondition = expCondition;
		this.ExpIf = expIf;
		this.ExpElse = expElse;

		//let type = HLSL.GetImplicitCastType(expIf.DataType, expElse.DataType);
		//this.DataType = type;
		//console.log("Ternary type: " + type);
	}

	Validate(scope)
	{
		this.ExpCondition.Validate(scope);
		this.ExpIf.Validate(scope);
		this.ExpElse.Validate(scope);

		// TODO: Verify condition evals to bool
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.ExpCondition.ToString(lang) + " ? " +
			this.ExpIf.ToString(lang) + " : " +
			this.ExpElse.ToString(lang);
	}
}

class ExpUnary extends Expression
{
	OperatorToken;
	ExpRight;

	constructor(opToken, expRight)
	{
		super();
		this.OperatorToken = opToken;
		this.ExpRight = expRight;

		// Same as expression
		//this.DataType = expRight.DataType;
		//console.log("Unary data type: " + expRight.DataType);
	}

	Validate(scope)
	{
		this.ExpRight.Validate(scope);

		// TODO: Validate that the expression is compatible
		//  - variable
		//  - member that is variable: thing.x, thing.other.x, etc.
		//  - literal, for ! or ~
		//  - bool for !
		//  - numeric for others
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		return this.OperatorToken.Text + this.ExpRight.ToString(lang);
	}
}

class ExpVariable extends Expression
{
	VarToken;

	constructor(varToken)
	{
		super();
		this.VarToken = varToken;
	}

	Validate(scope)
	{
		// Get the type of this variable from the scope stack
		// A value of null means the variable wasn't found
		let type = scope.GetVariableType(this.VarToken.Text);
		if (type == null)
			throw new ValidationError(this.VarToken, "Undeclared identifier: " + this.VarToken.Text);

		this.DataType = type;

		//console.log("VALIDATION - Variable - " + this.VarToken.Text + " - TYPE - " + this.DataType);
	}

	ToString(lang)
	{
		switch (lang)
		{
			default:
			case ShaderLanguageHLSL: return this.VarToken.Text;
			case ShaderLanguageGLSL: return HLSL.TranslateToGLSL(this.VarToken.Text);
		}
	}
}


// === CUSTOM ERRORS ===

class ParseError extends Error
{
	line;
	text;

	constructor(token, ...params)
	{
		super(...params);

		this.line = token == null ? -1 : token.Line;
		this.text = token == null ? "" : token.Text;
	}
}

class ValidationError extends Error
{
	line;
	text;

	constructor(token, ...params)
	{
		super(...params);

		this.line = token == null ? -1 : token.Line;
		this.text = token == null ? "" : token.Text;
	}
}


// === SCOPE TRACKING ===

const ScopeTypeGlobal = 0;
const ScopeTypeFunction = 1;
const ScopeTypeBlock = 2;
const ScopeTypeConditional = 3;
const ScopeTypeSwitch = 4;
const ScopeTypeLoop = 5;

class ScopeStack
{
	#stack;
	#stackTypes;
	#currentFunctionType;

	#structs;
	#functions;
	#textures;
	#samplers;
	#shortTermVars;

	#functionTable;
	static intrinsicTable = null;

	constructor()
	{
		this.#stack = [];
		this.#stackTypes = [];
		this.#currentFunctionType = null;

		this.#structs = [];
		this.#functions = [];
		this.#shortTermVars = [];
		this.#textures = [];
		this.#samplers = [];

		// Table for functions found during validation
		this.#functionTable = {};

		// Set up the intrinsic table
		// This should happen once
		// rather than per ScopeStack
		this.#PopulateIntrinsicTable();
	}

	// type is one of ScopeTypeGlobal, ScopeTypeFunction, etc.
	// functionScopeReturnType is optional - contains the data type for the current function, if we're in a function scope
	PushScope(type, functionScopeReturnType = null)
	{
		this.#stack.push([]);
		this.#stackTypes.push(type);

		// Is this a function?  If so, we need a type
		if (type == ScopeTypeFunction)
		{
			this.#currentFunctionType = functionScopeReturnType;
		}
	}

	PopScope()
	{
		// Exiting function?  If so, remove the function type
		if (this.#stackTypes[this.#stackTypes.length - 1] == ScopeTypeFunction)
		{
			this.#currentFunctionType = null;
		}

		this.#stack.pop();
		this.#stackTypes.pop();
	}

	CheckForScopeType(type)
	{
		// Determine if we're within the specified type of scope
		for (let s = 0; s < this.#stackTypes.length; s++)
			if (this.#stackTypes[s] == type)
				return true;

		// Not found
		return false;
	}

	GetFunctionScopeType()
	{
		return this.#currentFunctionType;
	}

	AddVarStatement(statement)
	{
		for (let v = 0; v < statement.VarDecs.length; v++)
			this.AddVar(statement.VarDecs[v]);
	}

	AddVar(v)
	{
		// Validate stack
		if (this.#stack.length == 0)
			throw new Error("Cannot add variable to empty scope stack");

		// Is this var already here?
		let name = v.NameToken.Text;
		if (this.IsVarInCurrentScope(name))
			throw new ParseError(v.NameToken, "Redefinition of '" + name + "'");
		
		// Add the variable to the stack
		this.#stack[this.#stack.length - 1].push(v);
	}

	GetVarDec(varName)
	{
		// Work through the scope, inner to outer, looking for this variable
		for (let s = this.#stack.length - 1; s >= 0; s--)
			for (let v = 0; v < this.#stack[s].length; v++)
				if (this.#stack[s][v].NameToken.Text == varName)
					return this.#stack[s][v];

		// Not found
		return null;
	}

	GetVariableType(varName)
	{
		// Check short term vars first
		for (let s = 0; s < this.#shortTermVars.length; s++)
			if (this.#shortTermVars[s].Name == varName)
				return this.#shortTermVars[s].DataType;

		// Check for textures & samplers
		if (this.#textures.hasOwnProperty(varName)) return this.#textures[varName].Type;
		if (this.#samplers.hasOwnProperty(varName)) return this.#samplers[varName].Type;

		// Look for standard var
		let varDec = this.GetVarDec(varName);
		if (varDec != null)
			return varDec.DataTypeToken.Text;

		// Not found
		return null;
	}

	IsVarInCurrentScope(varName)
	{
		if (this.#stack.length == 0)
			return false;

		// Check just the most recent scope
		return this.#IsVarInScope(varName, this.#stack[this.#stack.length - 1]);
	}

	IsVarInAnyScope(varName)
	{
		// Loop through all scopes, looking for the variable
		for (let s = this.#stack.length - 1; s >= 0; s--)
			if (this.#IsVarInScope(varName, this.#stack[s]))
				return true;

		// Nowhere
		return false;
	}

	#IsVarInScope(varName, scope)
	{
		// Check short term vars first
		for (let s = 0; s < this.#shortTermVars.length; s++)
			if (this.#shortTermVars[s].Name == varName)
				return true;

		// Check for textures & samplers
		if (this.#textures.hasOwnProperty(varName)) return true;
		if (this.#samplers.hasOwnProperty(varName)) return true;

		// Check all vars in the given scope
		for (let v = 0; v < scope.length; v++)
			if (scope[v].NameToken.Text == varName)
				return true;

		return false;
	}


	//AddShortTermVar(name, type)
	//{
	//	this.#shortTermVars.push({ Name: name, DataType: type });
	//}

	//ClearShortTermVars()
	//{
	//	this.#shortTermVars = [];
	//}

	AddStruct(s)
	{
		this.#structs[s.Name] = s;
	}

	AddTexture(shaderElementTexture)
	{
		this.#textures[shaderElementTexture.Name] = shaderElementTexture;
	}

	AddSampler(shaderElementSampler)
	{
		this.#samplers[shaderElementSampler.Name] = shaderElementSampler;
	}

	AddFunction(f)
	{
		this.#functions.push(f);
	}

	// See:
	// - HLSL: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions
	// - GLSL: https://registry.khronos.org/OpenGL-Refpages/gl4/index.php
	#PopulateIntrinsicTable()
	{
		// Ensure this happens exactly once
		if (ScopeStack.intrinsicTable != null)
			return;

		// Initialize the table as an object
		ScopeStack.intrinsicTable = {};

		// Add each intrinsic and its permutations

		// -------------------------------------------------
		// Detail	TemplateType	RootType		Size
		// -------------------------------------------------
		// p0		SVM				float, int		any
		// ret		match p0		match p0		same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["abs"],
			[{ SVM: "SVM", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType		Size
		// -------------------------------------------------
		// p0		SVM				float			any
		// ret		match p0		float			same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["acos", "asin", "atan", "ceil", "cos", "cosh", "tan", "ddx", "ddy", "degrees", "exp", "exp2", "floor",
			"frac", "fwidth", "log", "log2", "radians", "round", "saturate", "sin", "sinh", "sqrt", "tan", "tanh", "trunc"],
			[{ SVM: "SVM", Types: ["float"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			"p0");
		

		// -------------------------------------------------
		// Detail	TemplateType	RootType		Size
		// -------------------------------------------------
		// p0		SVM				float			any
		// p1		match p0		float			same dim as p0
		// ret		match p0		float			same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["atan2", "ldexp", "pow", "step"],
			[{ SVM: "SVM", Types: ["float"], Cols: [2, 3, 4], Rows: [2, 3, 4] }, "p0"],
			"p0");

		// -------------------------------------------------
		// Detail	TemplateType	RootType		Size
		// -------------------------------------------------
		// p0		SVM				float, int		any
		// p1		match p0		float, int		same dim as p0
		// p2		match p0		float, int		same dim as p0
		// ret		match p0		match p0		same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["clamp"],
			[{ SVM: "SVM", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [2, 3, 4] }, "p0", "p0"],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, int, bool	any
		// ret		scalar			bool				1
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["all", "any"],
			[{ SVM: "SVM", Types: ["float", "int", "bool"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ StaticReturnType: "bool" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, int, uint	any
		// ret		match p0		float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["asfloat"],
			[{ SVM: "SVM", Types: ["float", "int", "uint"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ SubstituteReturnType: "float" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, uint			any
		// ret		match p0		int					same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["asint"],
			[{ SVM: "SVM", Types: ["float", "uint"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ SubstituteReturnType: "int" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, int			any
		// ret		match p0		uint				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["asuint"],
			[{ SVM: "SVM", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ SubstituteReturnType: "uint" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SV				uint				any
		// ret		match p0		uint				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["countbits"], [{ SVM: "SV", Types: ["uint"], Cols: [2, 3, 4], Rows: [1] }], "p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				3
		// p1		vector			float				3
		// ret		vector			float				3
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["cross"], [{ SVM: "V", Types: ["float"], Cols: [3], Rows: [1] }, "p0"], "p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SV				float				any
		// ret		match p0		float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["ddx_coarse", "ddx_fine", "ddy_coarse", "ddy_fine"],
			[{ SVM: "SV", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		matrix			float				any (rows == columns)
		// ret		scalar			float				1
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["determinant"],
			[{ SVM: "M", Types: ["float"], Cols: "Square", Rows: "Square" }],
			{ StaticReturnType: "float" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				any (2,3,4)
		// p1		vector			float				same dim as p0
		// ret		scalar			float				1
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["distance"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }, "p0"],
			{ StaticReturnType: "float" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float, int			any (2,3,4)
		// p1		vector			float, int			same dim as p0
		// ret		scalar			float				1
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["dot"],
			[{ SVM: "V", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [1] }, "p0"],
			{ StaticReturnType: "float" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// n		vector			float				any (2,3,4)
		// i		vector			float				same dim as n
		// ng		vector			float				same dim as n
		// ret		vector			float				same dim as n
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["faceforward"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }, "p0", "p0"],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float				any
		// ret		match p0		bool				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(["isinf", "isnan"],
			[{ SVM: "SVM", Types: ["float"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ SubstituteReturnType: "bool" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				any (2,3,4)
		// ret		scalar			float				1
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["length"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }],
			{ StaticReturnType: "float" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float				any
		// p1		match p0		float				same dim as p0
		// p2		match p0		float				same dim as p0
		// ret		match p0		float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["lerp", "smoothstep"],
			[{ SVM: "SVM", Types: ["float"], Cols: [2, 3, 4], Rows: [2, 3, 4] }, "p0", "p0"],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, int			any (2,3,4)
		// p1		match p0		float, int			same dim as p0
		// ret		match p0		float, int			same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["max", "min", "modf"],
			[{ SVM: "SVM", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [2, 3, 4] }, "p0"],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				any (2,3,4)
		// ret		vector			float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["normalize"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				any (2,3,4)
		// p1		vector			float				same dim as p0
		// ret		vector			float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["reflect"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }, "p0"],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		vector			float				any (2,3,4)
		// p1		vector			float				same dim as p0
		// p2		scalar			float				1
		// ret		vector			float				same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["refract"],
			[{ SVM: "V", Types: ["float"], Cols: [2, 3, 4], Rows: [1] }, "p0", {StaticType: "float"}],
			"p0");


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		SVM				float, int			any
		// ret		match p0		int					same dim as p0
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["sign"],
			[{ SVM: "SVM", Types: ["float", "int"], Cols: [2, 3, 4], Rows: [2, 3, 4] }],
			{ SubstituteReturnType: "int" });


		// -------------------------------------------------
		// Detail	TemplateType	RootType			Size
		// -------------------------------------------------
		// p0		matrix			float, int, bool	any
		// ret		matrix			float, int, bool	r = p0.c, c = p0.r (transposed!)
		// -------------------------------------------------
		this.#AddIntrinsicPermutations(
			["transpose"],
			[{ SVM: "M", Types: ["float", "int", "bool"], Cols:  [2, 3, 4], Rows: [2, 3, 4] }],
			{ Transposed: true });


		// -------------------------------------------------
		// Mul has 9 different types of overloads!
		// Details: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-mul
		// Just doing it manually...
		// -------------------------------------------------

		// 1: Scalar * Scalar --> Scalar
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float"], "float");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int"], "int");

		// 2: Scalar * Vector --> Vector
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float2"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float3"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float4"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["int", "int2"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int3"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int4"], "int4");

		// 3: Scalar * Matrix --> Matrix
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float2x2"], "float2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float2x3"], "float2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float2x4"], "float2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float3x2"], "float3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float3x3"], "float3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float3x4"], "float3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float4x2"], "float4x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float4x3"], "float4x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float", "float4x4"], "float4x4");

		this.#AddIntrinsicFunctionToTable("mul", ["int", "int2x2"], "int2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int2x3"], "int2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int2x4"], "int2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int3x2"], "int3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int3x3"], "int3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int3x4"], "int3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int4x2"], "int4x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int4x3"], "int4x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int", "int4x4"], "int4x4");

		// 4: Vector * Scalar --> Vector
		this.#AddIntrinsicFunctionToTable("mul", ["float2", "float"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3", "float"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4", "float"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2", "int"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3", "int"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4", "int"], "int4");

		// 5: Vector * Vector --> Scalar
		this.#AddIntrinsicFunctionToTable("mul", ["float2", "float2"], "float");
		this.#AddIntrinsicFunctionToTable("mul", ["float3", "float3"], "float");
		this.#AddIntrinsicFunctionToTable("mul", ["float4", "float4"], "float");

		this.#AddIntrinsicFunctionToTable("mul", ["int2", "int2"], "int");
		this.#AddIntrinsicFunctionToTable("mul", ["int3", "int3"], "int");
		this.#AddIntrinsicFunctionToTable("mul", ["int4", "int4"], "int");

		// 6: Vector * Matrix --> Vector
		this.#AddIntrinsicFunctionToTable("mul", ["float2", "float2x2"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float2", "float3x2"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float2", "float4x2"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["float3", "float2x3"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3", "float3x3"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float3", "float4x3"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["float4", "float2x4"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float4", "float3x4"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4", "float4x4"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2", "int2x2"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int2", "int3x2"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int2", "int4x2"], "int4");

		this.#AddIntrinsicFunctionToTable("mul", ["int3", "int2x3"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3", "int3x3"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int3", "int4x3"], "int4");

		this.#AddIntrinsicFunctionToTable("mul", ["int4", "int2x4"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int4", "int3x4"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4", "int4x4"], "int4");

		// 7: Matrix * Scalar --> Matrix
		this.#AddIntrinsicFunctionToTable("mul", ["float2x2", "float"], "float2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float2x3", "float"], "float2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float2x4", "float"], "float2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x2", "float"], "float3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x3", "float"], "float3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x4", "float"], "float3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x2", "float"], "float4x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x3", "float"], "float4x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x4", "float"], "float4x4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2x2", "int"], "int2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int2x3", "int"], "int2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int2x4", "int"], "int2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x2", "int"], "int3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x3", "int"], "int3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x4", "int"], "int3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x2", "int"], "int4x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x3", "int"], "int4x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x4", "int"], "int4x4");

		// 8: Matrix * Vector --> Vector
		this.#AddIntrinsicFunctionToTable("mul", ["float2x2", "float2"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x2", "float2"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x2", "float2"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["float2x3", "float3"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x3", "float3"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x3", "float3"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["float2x4", "float4"], "float2");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x4", "float4"], "float3");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x4", "float4"], "float4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2x2", "int2"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x2", "int2"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x2", "int2"], "int4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2x3", "int3"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x3", "int3"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x3", "int3"], "int4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2x4", "int4"], "int2");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x4", "int4"], "int3");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x4", "int4"], "int4");

		// 9: Matrix * Matrix --> Matrix
		this.#AddIntrinsicFunctionToTable("mul", ["float2x2", "float2x2"], "float2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float2x2", "float2x3"], "float3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["float2x2", "float2x4"], "float4x2");

		this.#AddIntrinsicFunctionToTable("mul", ["float3x3", "float3x2"], "float2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x3", "float3x3"], "float3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["float3x3", "float3x4"], "float4x3");

		this.#AddIntrinsicFunctionToTable("mul", ["float4x4", "float4x2"], "float2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x4", "float4x3"], "float3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["float4x4", "float4x4"], "float4x4");

		this.#AddIntrinsicFunctionToTable("mul", ["int2x2", "int2x2"], "int2x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int2x2", "int2x3"], "int3x2");
		this.#AddIntrinsicFunctionToTable("mul", ["int2x2", "int2x4"], "int4x2");

		this.#AddIntrinsicFunctionToTable("mul", ["int3x3", "int3x2"], "int2x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x3", "int3x3"], "int3x3");
		this.#AddIntrinsicFunctionToTable("mul", ["int3x3", "int3x4"], "int4x3");

		this.#AddIntrinsicFunctionToTable("mul", ["int4x4", "int4x2"], "int2x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x4", "int4x3"], "int3x4");
		this.#AddIntrinsicFunctionToTable("mul", ["int4x4", "int4x4"], "int4x4");


		// Basic intrinsic data type initializers: int(), float(), etc.
		let rootTypes = ["bool", "uint", "int", "dword", "half", "float", "double"];
		for (let n = 0; n < rootTypes.length; n++)
		{
			let name = rootTypes[n];
			// Handle this name (bool, int, etc) taking each other type: int(bool), etc.
			for (let p = 0; p < rootTypes.length; p++)
			{
				// Example - Name: bool, Param: [anything], Return type: matches name
				this.#AddIntrinsicFunctionToTable(name, [rootTypes[p]], name);
			}

			// Vectors taking themselves
			this.#AddIntrinsicFunctionToTable(name + "2", [name + "2"], name + "2");
			this.#AddIntrinsicFunctionToTable(name + "3", [name + "3"], name + "3");
			this.#AddIntrinsicFunctionToTable(name + "4", [name + "4"], name + "4");

			// Vectors made up of scalars
			this.#AddIntrinsicFunctionToTable(name + "2", [name, name], name + "2");
			this.#AddIntrinsicFunctionToTable(name + "3", [name, name, name], name + "3");
			this.#AddIntrinsicFunctionToTable(name + "4", [name, name, name, name], name + "4");

			// Combinations of root type params: float4(float, float3), etc.
			// Example: float4 can be (float, float2, float) or (float3, float)
			this.#AddIntrinsicFunctionToTable(name + "3", [name, name + "2"], name + "3");
			this.#AddIntrinsicFunctionToTable(name + "3", [name + "2", name], name + "3");

			this.#AddIntrinsicFunctionToTable(name + "4", [name + "2", name + "2"], name + "4"); // f4(f2, f2)
			this.#AddIntrinsicFunctionToTable(name + "4", [name, name, name + "2"], name + "4"); // f4(f, f, f2)
			this.#AddIntrinsicFunctionToTable(name + "4", [name, name + "2", name], name + "4"); // f4(f, f2, f)
			this.#AddIntrinsicFunctionToTable(name + "4", [name + "2", name, name], name + "4"); // f4(f2, f, f)

			this.#AddIntrinsicFunctionToTable(name + "4", [name + "3", name], name + "4"); // f4(f3, f)
			this.#AddIntrinsicFunctionToTable(name + "4", [name, name + "3"], name + "4"); // f4(f, f3)

			// TODO: Matrix combinations - check these in HLSL!
			// Example: float3x3 can be made with (float3, float3, float3)
			this.#AddIntrinsicFunctionToTable(name + "3x3", [name + "3", name + "3", name + "3"], name + "3x3");
		}
	}

	#AddIntrinsicPermutations(names, paramReqs, returnReq)
	{
		// Get all possible param permutations
		let p0_permutations = [];

		// For each root data type
		for (let d = 0; d < paramReqs[0].Types.length; d++)
		{
			let rootType = paramReqs[0].Types[d];

			// For each template type (scalar/vector/matrix)
			for (let t = 0; t < paramReqs[0].SVM.length; t++)
			{
				let templateType = paramReqs[0].SVM.charAt(t);

				// Handle the various types
				switch (templateType)
				{
					// Scalar
					case "S": p0_permutations.push(rootType); break;

					// Vectors (2, 3, 4)
					case "V":
						for (let c = 0; c < paramReqs[0].Cols.length; c++)
							p0_permutations.push(rootType + paramReqs[0].Cols[c]);
						break;

					// Matrices
					case "M":
						// Square matrices only?
						if (paramReqs[0].Cols == "Square" || paramReqs[0].Rows == "Square")
						{
							p0_permutations.push(rootType + "2x2");
							p0_permutations.push(rootType + "3x3");
							p0_permutations.push(rootType + "4x4");
						}
						else
							// All CxR combinations
							for (let c = 0; c < paramReqs[0].Cols.length; c++)
								for (let r = 0; r < paramReqs[0].Rows.length; r++)
									p0_permutations.push(rootType + paramReqs[0].Cols[c] + "x" + paramReqs[0].Rows[r]);
						break;

				}
			}
		}

		// Handle each name provided
		for (let n = 0; n < names.length; n++)
		{
			let name = names[n];

			// Create all permutations
			for (let p = 0; p < p0_permutations.length; p++)
			{
				// Grab the data type for p0
				let p0 = p0_permutations[p];

				let params = [];
				params.push(p0);

				// Check other param reqs
				for (let r = 1; r < paramReqs.length; r++)
				{
					if (paramReqs[r] == "p0")
						params.push(p0); // Match first param
					else if (paramReqs[r].hasOwnProperty("StaticType"))
						params.push(paramReqs[r].StaticType); // Use a static type
					else
						throw new Error("TODO: HANDLE non-p0 params in intrinsic function permutations");
				}

				// Assume return type matches p0, and adjust otherwise
				let returnType = null;
				if (returnReq == "p0")
					returnType = p0;
				else if (returnReq.hasOwnProperty("StaticReturnType"))
					returnType = returnReq.StaticReturnType;
				else if (returnReq.hasOwnProperty("SubstituteReturnType"))
				{
					// Get the root type of p0, such as "float" or "uint"
					let p0_root = HLSL.GetRootType(p0);

					// Combine the substitute type with the remaining vector or matrix details
					returnType = returnReq.SubstituteReturnType + p0.substring(p0_root.length);
				}
				else if (returnReq.hasOwnProperty("Transposed") && returnReq.Transposed == true)
				{
					// Assume we're a matrix and transpose p0's row and col
					let p0_root = HLSL.GetRootType(p0);
					let p0_dims = p0.substring(p0_root.length);
					returnType = p0_root + p0_dims.charAt(2) + "x" + p0_dims.charAt(0);
				}
				else
				{
					throw new Error("Invalid intrinsic permutation return type");
				}
					

				// Add to the table
				this.#AddIntrinsicFunctionToTable(name, params, returnType);
			}
		}
	}

	#AddIntrinsicFunctionToTable(name, params, returnType)
	{
		// Does a function with this name exist?  If not, make it
		if (!ScopeStack.intrinsicTable.hasOwnProperty(name))
			ScopeStack.intrinsicTable[name] = [];

		// Set up the entry
		let tableEntry = {
			ReturnType: returnType,
			Parameters: [],
			MangledName: name + "(" // Added to below
		};

		// For each param
		for (let i = 0; i < params.length; i++)
		{
			let p = {
				//Name: params[i].Name, // Do we need this?
				DataType: params[i],
				IsArray: false
			};

			// Continue the mangled name
			tableEntry.MangledName += (i > 0 ? "," : "") + p.DataType;

			// Add this param to the function table's entry for this function
			tableEntry.Parameters.push(p);
		}

		// Finish up the name and verify it doesn't already exist
		tableEntry.MangledName += ")";
		
		// Loop through all entries looking for the same mangled name
		// which should indicate an identical signature
		//for (let i = 0; i < this.#functionTable[name].length; i++)
		//	if (this.#functionTable[name][i].MangledName == tableEntry.MangledName)
		//		throw new ValidationError(null, "Function with this signature already exists (TODO: MAKE THIS MESSAGE BETTER)");
		// SKIPPING since this shouldn't be an issue and will take increasingly longer and longer

		// Add this entry to the table since it's unique
		ScopeStack.intrinsicTable[name].push(tableEntry);
	}

	AddFunctionToTable(f)
	{
		// Does a function with this name exist?  If not, make it
		if (!this.#functionTable.hasOwnProperty(f.Name))
			this.#functionTable[f.Name] = [];

		// Set up this table entry
		let tableEntry = {
			ReturnType: f.ReturnType,
			Parameters: [],
			MangledName: f.Name + "(" // Will be added to below
		};

		// Loop through all params
		for (let i = 0; i < f.Parameters.length; i++)
		{
			let p = {
				//Name: f.Parameters[i].NameToken.Text, // Do we need this?
				DataType: f.Parameters[i].DataTypeToken.Text,
				IsArray: f.Parameters[i].ArrayExpression != null
			};

			// Add this param's data type
			tableEntry.MangledName += (i > 0 ? "," : "") + p.DataType + (p.IsArray ? "[]" : "");

			// Add this param to the function table's entry for this function
			tableEntry.Parameters.push(p);
		}

		// Finish up the name and verify it doesn't already exist
		tableEntry.MangledName += ")";

		// Loop through all entries looking for the same mangled name
		// which should indicate an identical signature
		for (let i = 0; i < this.#functionTable[f.Name].length; i++)
			if (this.#functionTable[f.Name][i].MangledName == tableEntry.MangledName)
				throw new ValidationError(null, "Function with this signature already exists (TODO: MAKE THIS MESSAGE BETTER)");

		// Add this entry to the table since it's unique
		this.#functionTable[f.Name].push(tableEntry);
	}



	GetStructVariableDataType(structName, varName)
	{
		// Check "implicit" structs
		let impType = this.#GetImplicitStructVariableDataType(structName, varName);
		if (impType != null) return impType;

		// Is this an explicit struct?
		if (!this.#structs.hasOwnProperty(structName))
			throw new Error("Invalid struct name '" + structName + "'");

		// Check for member
		for (let m = 0; m < this.#structs[structName].Members.length; m++)
			if (this.#structs[structName].Members[m].NameToken.Text == varName)
				return this.#structs[structName].Members[m].DataTypeToken.Text;

		// Not found
		return null;
	}

	#GetImplicitStructVariableDataType(structName, varName)
	{
		// Check swizzle based on type of data
		switch (structName)
		{
			case "float": if (!this.#CheckVectorSwizzle(varName, "x") && !this.#CheckVectorSwizzle(varName, "r")) { return null; } break;
			case "float2": if (!this.#CheckVectorSwizzle(varName, "xy") && !this.#CheckVectorSwizzle(varName, "rg")) { return null; } break;
			case "float3": if (!this.#CheckVectorSwizzle(varName, "xyz") && !this.#CheckVectorSwizzle(varName, "rgb")) { return null; } break;
			case "float4": if (!this.#CheckVectorSwizzle(varName, "xyzw") && !this.#CheckVectorSwizzle(varName, "rgba")) { return null; } break;
			default: return null; // Not an implicit struct
		}

		// Swizzle is valid, so return the swizzle type based on its length (.x == float, .xyz == float3, etc.)
		// NOTE: This is NOT the same as the incoming struct name!
		switch (varName.length)
		{
			case 1: return "float";
			case 2: return "float2";
			case 3: return "float3";
			case 4: return "float4";
			default: throw new Error("Invalid variable name for implicit structs: " + varName); // REALLY shouldn't be able to get here, but just in case
		}
	}

	/**
	 * Determines if the given swizzle pattern contains valid componenets
	 * 
	 * @param {string} swizzle The swizzle pattern, like "x", "rgg" or "xyzz"
	 * @param {string} validComponents The valid components, like "x", "xyz" or "rgba"
	 */
	#CheckVectorSwizzle(swizzle, validComponents)
	{
		// Must be between 1 and 4 components
		if (swizzle.length < 1 || swizzle.length > 4)
			return false;

		// Check each swizzle member
		for (let m = 0; m < swizzle.length; m++)
			if (!validComponents.includes(swizzle[m]))
				return false;
		
		// Everything checks out - valid swizzle		
		return true;
	}

	DoesFunctionExist(expFuncCall)
	{
		// TODO: Determine if the function expression matches an existing function
	}


	// === TYPE CHECKING ===
	// Note: This is in ScopeStack so we have access to structs!

	// Casting details (tested in HLSL)
	//
	// - All numeric types implicitly cast to each other
	//   - Everything is 32-bit aside from double
	//   - implicit cast from double causes a warning: "conversion from larger type to smaller, possible loss of data"
	// - similar overloads can exist
	//   - Example:
	//     - void f(int x)
	//     - void f(float x)
	//   - Exact calls work fine:
	//     - f(5) <-- int
	//     - f(5.0f) <-- float
	//   - Some implicit calls can work fine:
	//     - f(uintVar)  <-- uses int version
	//     - f(dwordVar) <-- uses int version
	//     - f(halfVar)  <-- uses float version
	//   - Calls relying on implicit casts fail if there is ambiguity!
	//     - f(false)     <-- ambigious
	//     - f(doubleVar) <-- ambigious
	//   - Direction of cast matters, too?
	//     - f(false) when options are int, half, double is ambiguous
	//     - f(half) when options are float, double is ambiguous
	//     - f(float) when options are half, double uses double (larger type)
	//   - Smear across family is possible: int --> float4
	//     - But within-family casting has priority
	//     - Example:
	//        - void f(int x)
	//        - void f(float4 x)
	//        - Calling f(5) is obviously int
	//        - Calling f(5.0f) prefers smear within family
	//        - Calling f(false) uses int version ("closest" cast?)
	//   - Truncation from vec/mat to scalar is ok, too
	//     - Cast outside family is preferred over truncation: float2 -> int2 rather than float2 -> float
	//
	// - Struct-struct casting
	//   - NO implicit casting!
	//   - Explicit: order and type of members must match (no "casting" between numeric types)
	//     - vectors/matrices count as that many scalars --> float2 matches two floats in a row, etc.
	// - Vector/matrix casting
	//   - OK: vector = scalar, matrix = scalar
	//   - OK: scalar = vector, scalar = matrix (implicit truncation warning)
	//   - OK: smallerVec = largerVec, smallerMat = largerMat (implicit truncation warning)
	//   - NO: larger = smaller (cannot cast float2 to float3/4, same with matrices)
	//
	//
	// - Possible Weights
	//   - Exact match (int -> int): 0
	//   - Inside family (int -> uint): 10
	//   - Outside family (int -> float): 1000
	//   - Smear: 100 (worse than inside family, better than outside family)
	//   - Truncate: 10000 (worse than cast outside family)

	// Cast details
	// {
	//    FamilyType: "Exact" or "Inside" or "Outside"
	//    SVMType: "Exact" or "Smear" or "Truncate"
	//    Weight: number --> Based on type of cast
	// }
	GetImplicitCastDetails(startType, targetType)
	{
		// Void can't be cast
		if (startType == "void" || targetType == "void")
			return null;

		// Validate built-in types
		if (!HLSLDataTypeDetails.hasOwnProperty(startType) ||
			!HLSLDataTypeDetails.hasOwnProperty(targetType))
			return null;

		// Identical?
		if (startType == targetType)
		{
			return {
				FamilyType: "Exact",
				SVMType: "Exact",
				Weight: 0
			}
		}

		// Grab details
		let s = HLSLDataTypeDetails[startType];
		let t = HLSLDataTypeDetails[targetType];
		let sRootType = s.RootType;
		let tRootType = t.RootType;
		let sFam = s.Family;
		let tFam = t.Family;

		// Fill out the details
		let details = {
			FamilyType: null,
			SVMType: null,
			Weight: HLSLScalarImplicitCastWeights[sRootType][tRootType]
		};

		// Family details
		if (sRootType == tRootType) details.FamilyType = "Exact";
		else if (sFam == tFam) details.FamilyType = "Inside";
		else details.FamilyType = "Outside";

		// Check SVM types
		if (s.SVM == "S" && t.SVM == "S") // Scalar --> Scalar
		{
			// Both are scalars
			details.SVMType = "Exact";
		}
		else if (s.SVM == "S" && (t.SVM == "V" || t.SVM == "M")) // Scalar --> (Vector or Matrix)
		{
			// This is a smear (scalar to non-scalar)
			details.SVMType = "Smear";
		}
		else if ((s.SVM == "V" || s.SVM == "M") && t.SVM == "S") // (Vector or Matrix) --> Scalar
		{
			// This is a truncation from Vector or Matrix to scalar
			details.SVMType = "Truncate";
		}
		else if ((s.SVM == "V" && t.SVM == "V") && s.Components >= t.Components)
		{
			// Both are vectors, but this only works if casting from larger to smaller
			details.SVMType = "Truncate";
		}
		else if ((s.SVM == "M" && t.SVM == "M") && s.Rows >= t.Rows && s.Cols >= t.Rows)
		{
			// Both matrices, but we can only go from larger to smaller in each dimension
			details.SVMType = "Truncate";
		}
		else
		{
			// Any other combination is invalid
			return null;
		}

		// Finalize weight and return
		if (details.FamilyType == "Inside") details.Weight *= 10;
		else if (details.FamilyType == "Outside") details.Weight *= 1000;

		if (details.SVMType == "Smear") details.Weight *= 100;
		else if (details.SVMType == "Truncate") details.Weight *= 10000;
		
		return details;
	}

	DataTypeFromLiteralToken(token)
	{
		// Check for true/false first
		let lower = token.Text.toLowerCase();
		if (token.Type == TokenIdentifier && (lower == "true" || lower == "false"))
			return "bool";

		// Otherwise, this must be a numeric literal
		if (token.Type != TokenNumericLiteral)
			throw new Error("Invalid token for data type extraction");

		// Grab the last two characters
		let lastChar = token.Text.charAt(token.Text.length - 1).toLowerCase();
		let secLastChar = token.Text.length == 1 ? "" : token.Text.charAt(token.Text.length - 2).toLowerCase();

		// A decimal means definitely a float!
		if (token.Text.indexOf(".") >= 0)
		{
			// Check for half or long
			switch (lastChar)
			{
				case "h": return "half";
				case "l": return "double";
				default: return "float";
			}
		}

		// Definitely not a float - is it an unsigned int?
		if (lastChar == "u" || secLastChar == "u")
			return "uint";

		// All that's left is int
		// Note: Even though HLSL accepts "L" as a suffix, it 
		//       doesn't support 64-bit integers (SM 5.0, anyway)
		return "int";
	}

	GetImplicitCastType(typeA, typeB)
	{
		// "void" can't be cast to or from
		if (typeA == "void" || typeB == "void")
			return null;

		// Validate built-in types
		if (!HLSLDataTypeDetails.hasOwnProperty(typeA) ||
			!HLSLDataTypeDetails.hasOwnProperty(typeB))
			return null;

		// Identical?
		if (typeA == typeB)
			return typeA;

		// Grab details
		let a = HLSLDataTypeDetails[typeA];
		let b = HLSLDataTypeDetails[typeB];
		let rankA = HLSLImplicitCastRank[a.RootType];
		let rankB = HLSLImplicitCastRank[b.RootType];

		// Check for s/v/m types
		if (a.SVM == "S" && b.SVM == "S") // Scalar & Scalar
		{
			return rankA >= rankB ? typeA : typeB; // Return the highest rank
		}
		else if (a.SVM == "S" && (b.SVM == "V" || b.SVM == "M")) // Scalar & (Vector or Matrix)
		{
			return typeB; // Non-scalar wins
		}
		else if ((a.SVM == "V" || a.SVM == "M") && b.SVM == "S") // (Vector or Matrix) & Scalar
		{
			return typeA; // Non-scalar wins
		}
		else if (a.SVM == "V" && b.SVM == "V")
		{
			// Both vectors, so truncate to smallest (but use highest rank?)
			let size = a.Components <= b.Components ? a.Components : b.Components;
			let rootType = rankA >= rankB ? a.RootType : b.RootType;
			return rootType + size.toString(); // Example: "float" + "2"
		}
		else if (a.SVM == "M" && b.SVM == "M")
		{
			// Both matrices, so truncate to smallest (but use highest rank?)
			let r = a.Rows <= b.Rows ? a.Rows : b.Rows;
			let c = a.Cols <= b.Cols ? a.Cols : b.Cols;
			let rootType = rankA >= rankB ? a.RootType : b.RootType;
			return rootType + r.toString() + "x" + c.toString(); // Example: "float" + "3" + "x" + "3"
		}

		// Matrix & Vector is invalid!
		return null;
	}



	// Determines if the give castee type can be cast to the target type
	//  startType: type that might be cast
	//  targetType: type we actually need
	CanCastTo(startType, targetType)
	{
		// "void" can't be cast to or from
		if (typeA == "void" || typeB == "void")
			return false;

		// Is this just an implicit cast with built-in types?
		if (this.GetImplicitCastType(startType, targetType) != null)
			return true;

		// Do they match?  If so, they're fine
		if (startType == targetType)
			return true;

		// TODO: Struct-struct casting if their "core" scalars match
		if (this.#structs.hasOwnProperty(startType))
			throw new ValidationError(null, "Casting from structs not yet implemented");

		// Supporting (Struct)scalar, such as: (Light)0
		if (this.#structs.hasOwnProperty(targetType))
		{
			// If the target is a struct, then the start type
			// can definitely be a scalar, such as: (Light)0
			return HLSL.IsScalarType(startType);
		}

		// Nope!
		return false;
	}


	GetBestCastType(startType, possibleTypes)
	{
		// Is the start type valid?
		if (!HLSLDataTypeDetails.hasOwnProperty(startType))
			return null;

		// Grab the starting rank
		let startRank = HLSLImplicitCastRank[startType];

		// More than one type, so figure out the best
		let bestType = null;
		let bestRank = -1;
		for (let p = 0; p < possibleTypes.length; p++)
		{
			// Grab the current type from the array
			let currentType = possibleTypes[p];
			if (!HLSLImplicitCastRank.hasOwnProperty(currentType))
				continue;

			
		}

		return bestType;
	}



	// === FUNCTION VALIDATION ===

	GetFunctionReturnType(funcCallExp)
	{
		let name = funcCallExp.FuncExp.NameToken.Text;
		console.log(name);
		// Determine which table to use
		let overloadEntries = null;
		if (this.#functionTable.hasOwnProperty(name))
			overloadEntries = this.#functionTable[name];
		else if (ScopeStack.intrinsicTable.hasOwnProperty(name))
			overloadEntries = ScopeStack.intrinsicTable[name];
		else
			throw new ValidationError(funcCallExp.FuncExp.NameToken, "Function name not found");

		// We have the list of overloads, so begin matching and weighting parameters
		let matches = []; // [{ Overload, Weight }, ...]
		
		for (let o = 0; o < overloadEntries.length; o++)
		{
			let overload = overloadEntries[o];

			// Different number of params is an immediate miss
			if (funcCallExp.Parameters.length != overload.Parameters.length)
				continue;

			// Go through the params and check matches
			let matchingParamCount = 0;
			let totalCastWeight = 0;
			for (let p = 0; p < funcCallExp.Parameters.length; p++)
			{
				let callParam = funcCallExp.Parameters[p];
				let overloadParam = overload.Parameters[p];

				// If the parameter is an exact match, move to the next
				if (callParam.DataType == overloadParam.DataType)
				{
					matchingParamCount++;
					continue;
				}

				// Wasn't an exact match, so see if a cast is possible
				let castDetails = this.GetImplicitCastDetails(callParam.DataType, overloadParam.DataType);
				if (castDetails == null)
					break; // No cast possible, overload is invalid

				// Valid cast, keep going
				totalCastWeight += castDetails.Weight;
				matchingParamCount++;
			}

			// Any match?
			if (matchingParamCount == funcCallExp.Parameters.length)
			{
				// A total weight of zero means a perfect match
				if (totalCastWeight == 0)
				{
					return overload.DataType;
				}

				// Not a perfect match, so add to array of matches
				matches.push({ Overload: overload, Weight: totalCastWeight });

			}
		}

		// How many matches did we find?
		if (matches.length == 0)
		{
			console.log(name + ": NO MATCHES");
			return null;
		}
		else if (matches.length == 1)
		{
			console.log(name + ": ONE MATCH!");
			console.log(matches[0]);
			return matches[0].Overload.ReturnType;
		}

		// Multiple matches, so we need to find the best one
		let bestMatch = matches[0];
		for (let m = 1; m < matches.length; m++)
		{
			// Compare weights
			if (matches[m].Weight < bestMatch.Weight)
				bestMatch = matches[m];
			else if (matches[m].Weight == bestMatch.Weight)
				throw new ValidationError(funcCallExp.FuncExp.NameToken, "Ambiguous function call: " + bestMatch.Overload.MangledName);

			// TODO: Handle ambiguity due to weights that are too similar
			// - Maybe need to categorize casts types and check against them?  (InsideFamily, OutsideFamily, Smear, Truncate)?
		}

		console.log(name + ": MULTIPLE MATCHES - Best one...");
		console.log(bestMatch);
		return bestMatch.Overload.ReturnType;
	}


	// Does a function match the given name and param list?
	MatchFunctionSignature(customFunction, name, params)
	{
		// Check name and param length first
		if (customFunction.Name != name || customFunction.Parameters.length != params.length)
			return false;

		// Loop through params and check data type compatibility
		for (let p = 0; p < customFunction.Parameters.length; p++)
			if (!this.CanCastTo(params[p].DataType, customFunction.Parameters[p].DataTypeToken.Text))
				return false;

		// Everything matches
		return true;
	}

	

	/**
	 *  
	 * Param reqs are in the form:
	 * [
	 *   {
	 *      TemplateType: "SVM"(or "S", or "SV", etc.),
	 *      RootType: ["float", "int"],
	 *	    Cols: [1,2,3,4],
	 *      Rows: [1,2,3,4]
	 *   },
	 *   {
	 *      TemplateType: "p0", // Means matching param zero
	 *      RootType: "p0", // Match param zero
	 * 	    Cols: "p0", // Match
	 *      Rows: "p0" // Match
	 *   }
	 * ]
	 * Return reqs are similar, but not an array
	 * 
	 * 
	 * Some examples:
	 *  - dot(float3(), int3()) <-- 2nd param casts to float3, return value is float
	 *  - clamp(float, float, float) <-- returns float
	 *  - clamp(int, int, int) <-- returns int
	 *  - clamp(float, int, float) <-- returns float?  Casts to "highest" rank I assume?
	 *  - clamp(bool, uint, half) <-- returns float, since it's either INT or FLOAT and half is "higher" than int?
	 * 
	 * 
	 */
	ValidateIntrinsicFunction(funcCallExp, paramReqs, returnReqs)
	{
		// Require the right number of params
		if (funcCallExp.Parameters.length != paramReqs.length)
			throw new ValidationError(funcCallExp.FuncExp.NameToken, "Incorrect number of arguments to intrinsic function call " + funcCallExp.FuncExp.NameToken.Text);

		// Check each function param
		for (let p = 0; p < funcCallExp.Parameters.length; p++)
		{
			// Grab the current parameter and its info
			let pType = funcCallExp.Parameters[p].DataType;
			if (!HLSLDataTypeDetails.hasOwnProperty(pType))
				throw new ValidationError(funcCallExp.FuncExp.NameToken, "Invalid argument to intrinsic function call " + funcCallExp.FuncExp.NameToken.Text);
			let pInfo = HLSLDataTypeDetails[pType];

			// Which requirements are we matching?
			// - If any piece is "p0", we need to grab the details from the first parameter
			let req = paramReqs[p];
			if (p > 0)
			{
				if (req.TemplateType == "p0") req.TemplateType = paramReqs[0].TemplateType;
				if (req.RootType == "p0") req.RootType = paramReqs[0].RootType;
				if (req.Rows == "p0") req.Rows = paramReqs[0].Rows;
				if (req.Cols == "p0") req.Cols = paramReqs[0].Cols;
			}

			// Validate template type
			let templateTypeValid = 
				(pInfo.SVM == "scalar") || // A scalar can be promoted to a vector or matrix, so scalars always work
				(pInfo.SVM == "vector" && req.TemplateType.includes("V")) ||
				(pInfo.SVM == "matrix" && req.TemplateType.includes("M"));

			// Validate root type
			// Note: All built-in numeric types can cast to each other, so
			// as long as this is actually a numeric type (checked above!)
			// it should work
			let rootTypeValid = true;// req.RootType.includes(pInfo.RootType);

			// TODO: Determine which overload matches?  Track params and match after the loop?

			// Validate sizes
			let colsValid =
				(pInfo.SVM == "scalar" && req.Cols.includes(1)) ||
				((pInfo.SVM == "vector" || pInfo.SVM == "matrix") && req.Cols.includes(pInfo.Cols));

			let rowsValid =
				(pInfo.SVM == "scalar" && req.Rows.includes(1)) ||
				((pInfo.SVM == "vector" || pInfo.SVM == "matrix") && req.Rows.includes(pInfo.Rows));

			// TODO: Handle larger vectors/matrices being used for smaller params (like float3 when needing float2)
			// - That is a valid implicit truncation

			// Is this a valid argument?
			let match = templateTypeValid && rootTypeValid && colsValid && rowsValid;
			if (!match)
				throw new ValidationError(funcCallExp.FuncExp.NameToken, "Invalid argument to intrinsic function call " + funcCallExp.FuncExp.NameToken.Text);

		}

		// Grab the info of parameter 0 just in case
		let p0 = HLSLDataTypeDetails[funcCallExp.Parameters[0].DataType];

		// Determine return type based on reqs 
		// - "p0" means use the same data as the actual initial parameter
		let retTemplateType = (returnReqs.TemplateType == "p0") ? p0.SVM : returnReqs.TemplateType;
		let retRootType = (returnReqs.RootType == "p0") ? p0.RootType : returnReqs.RootType;
		let retCols = (returnReqs.Cols == "p0") ? p0.Cols : returnReqs.Cols;
		let retRows = (returnReqs.Rows == "p0") ? p0.Rows : returnReqs.Rows;

		// TODO: Handle any odd-ball / specific return changes here, like transpose()

		// Finalize return type
		switch (retTemplateType)
		{
			case "scalar": return retRootType; // "float", "uint", etc
			case "vector": return retRootType + retCols; // float4, uint3, etc.
			case "matrix": return retRootType + retCols + "x" + retRows; // float4x4
			default: return null; // Invalid
		}
	}

	DataTypeFromIntrinsicFunctionCallExpression(funcCallExp)
	{
		// Grab the function call name
		let funcName = funcCallExp.FuncExp.NameToken.Text;

		// Handle "matrix()" specifically
		// TODO: Validate parameters
		if (funcName == "matrix") return "float4x4";

		// Search for data type initializers, like float2()
		if (HLSLDataTypeDetails.hasOwnProperty(funcName))
		{
			// TODO: Validate parameters
			return funcName;
		}

		// Check for intrinsics
		let ret = ""; // For testing
		switch (funcName)
		{
			// TODO: Validate parameter requirements for each function type!!!

			// See:
			// - HLSL: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions
			// - GLSL: https://registry.khronos.org/OpenGL-Refpages/gl4/index.php

			// -------------------------------------------------
			// Detail	TemplateType	RootType		Size
			// -------------------------------------------------
			// p0		SVM				float, int		any
			// ret		match p0		match p0		same dim as p0
			// -------------------------------------------------
			case "abs":
				return this.ValidateIntrinsicFunction(funcCallExp,
					[{ TemplateType: "SVM", RootType: ["float", "int"], Cols: [1, 2, 3, 4], Rows: [1, 2, 3, 4] }],
					{ TemplateType: "p0", RootType: "p0", Cols: "p0", Rows: "p0" }
				);

			// -------------------------------------------------
			// Detail	TemplateType	RootType		Size
			// -------------------------------------------------
			// p0		SVM				float			any
			// ret		match p0		float			same dim as p0
			// -------------------------------------------------
			case "acos":
			case "asin":
			case "atan":
			case "ceil":
			case "cos":
			case "cosh":
			case "sin":
			case "tan":
			case "ddx":
			case "ddy":
			case "degrees":
			case "exp":
			case "exp2":
			case "floor":
			case "frac":
			case "fwidth":
			case "log":
			case "log2":
			case "radians":
			case "round":
			case "saturate":
			case "sin":
			case "sinh":
			case "sqrt":
			case "tan":
			case "tanh":
			case "trunc":
				ret = this.ValidateIntrinsicFunction(funcCallExp,
					[{ TemplateType: "SVM", RootType: ["float"], Cols: [1, 2, 3, 4], Rows: [1, 2, 3, 4] }],
					{ TemplateType: "p0", RootType: ["float"], Cols: "p0", Rows: "p0" }
				);
				console.log(funcName + ": " + ret);
				return ret;

			// -------------------------------------------------
			// Detail	TemplateType	RootType		Size
			// -------------------------------------------------
			// p0		SVM				float			any
			// p1		match p0		float			same dim as p0
			// ret		match p0		float			same dim as p0
			// -------------------------------------------------
			case "atan2":
			case "ldexp":
			case "pow":
			case "step":
				ret = this.ValidateIntrinsicFunction(funcCallExp,
					[
						{ TemplateType: "SVM", RootType: ["float"], Cols: [1, 2, 3, 4], Rows: [1, 2, 3, 4] },
						{ TemplateType: "p0", RootType: ["float"], Cols: "p0", Rows: "p0" }
					],
					{ TemplateType: "p0", RootType: ["float"], Cols: "p0", Rows: "p0" }
				);
				console.log(funcName + ": " + ret);
				return ret;


			// -------------------------------------------------
			// Detail	TemplateType	RootType		Size
			// -------------------------------------------------
			// p0		SVM				float, int		any
			// p1		match p0		float, int		same dim as p0
			// p2		match p0		float, int		same dim as p0
			// ret		match p0		match p0		same dim as p0
			// -------------------------------------------------
			case "clamp":
				ret = this.ValidateIntrinsicFunction(funcCallExp,
					[
						{ TemplateType: "SVM", RootType: ["float", "int"], Cols: [1, 2, 3, 4], Rows: [1, 2, 3, 4] },
						{ TemplateType: "p0", RootType: ["float", "int"], Cols: "p0", Rows: "p0" },
						{ TemplateType: "p0", RootType: ["float", "int"], Cols: "p0", Rows: "p0" }
					],
					{ TemplateType: "p0", RootType: "p0", Cols: "p0", Rows: "p0" }
				);
				console.log(funcName + ": " + ret);
				return ret;


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, int, bool	any
			// ret		scalar			bool				1
			// -------------------------------------------------
			case "all":
			case "any":
				ret = this.ValidateIntrinsicFunction(funcCallExp,
					[{ TemplateType: "SVM", RootType: ["float", "int", "bool"], Cols: [1, 2, 3, 4], Rows: [1, 2, 3, 4] }],
					{ TemplateType: "scalar", RootType: ["bool"], Cols: [1], Rows: [1] }
				);
				console.log(funcName + ": " + ret);
				return ret;


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, int, uint	any
			// ret		match p0		float				same dim as p0
			// -------------------------------------------------
			case "asfloat":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, uint			any
			// ret		match p0		int					same dim as p0
			// -------------------------------------------------
			case "asint":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, int			any
			// ret		match p0		uint				same dim as p0
			// -------------------------------------------------
			case "asuint":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SV				uint				any
			// ret		match p0		uint				same dim as p0
			// -------------------------------------------------
			case "countbits":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				3
			// p1		vector			float				3
			// ret		vector			float				3
			// -------------------------------------------------
			case "cross":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SV				float				any
			// ret		match p0		float				same dim as p0
			// -------------------------------------------------
			case "ddx_coarse":
			case "ddx_fine":
			case "ddy_coarse":
			case "ddy_fine":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		matrix			float				any (rows == columns)
			// ret		scalar			float				1
			// -------------------------------------------------
			case "determinant":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				any (2,3,4)
			// p1		vector			float				same dim as p0
			// ret		scalar			float				1
			// -------------------------------------------------
			case "distance":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float, int			any (2,3,4)
			// p1		vector			float, int			same dim as p0
			// ret		scalar			float				1
			// -------------------------------------------------
			case "dot":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// n		vector			float				any (2,3,4)
			// i		vector			float				same dim as n
			// ng		vector			float				same dim as n
			// ret		vector			float				same dim as n
			// -------------------------------------------------
			case "faceforward":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float				any
			// ret		match p0		bool				same dim as p0
			// -------------------------------------------------
			case "isinf":
			case "isnan":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				any (2,3,4)
			// ret		scalar			float				1
			// -------------------------------------------------
			case "length":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float				any
			// p1		match p0		float				same dim as p0
			// p2		match p0		float				same dim as p0
			// ret		match p0		float				same dim as p0
			// -------------------------------------------------
			case "lerp":
			case "smoothstep":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, int			any (2,3,4)
			// p1		match p0		float, int			same dim as p0
			// ret		match p0		float, int			same dim as p0
			// -------------------------------------------------
			case "max":
			case "min":
			case "modf":
				return null; // TODO finish


			// -------------------------------------------------
			// 9 different overloads!  Details: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-mul
			// -------------------------------------------------
			case "mul":
				return null;


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				any (2,3,4)
			// ret		vector			float				same dim as p0
			// -------------------------------------------------
			case "normalize":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				any (2,3,4)
			// p1		vector			float				same dim as p0
			// ret		vector			float				same dim as p0
			// -------------------------------------------------
			case "reflect":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		vector			float				any (2,3,4)
			// p1		vector			float				same dim as p0
			// p2		scalar			float				1
			// ret		vector			float				same dim as p0
			// -------------------------------------------------
			case "refract":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		SVM				float, int			any
			// ret		match p0		int					same dim as p0
			// -------------------------------------------------
			case "sign":
				return null; // TODO finish


			// -------------------------------------------------
			// Detail	TemplateType	RootType			Size
			// -------------------------------------------------
			// p0		matrix			float, int, bool	any
			// ret		matrix			float, int, bool	r = p0.c, c = p0.r (transposed!)
			// -------------------------------------------------
			case "transpose":
				return null; // TODO finish
		}

		// Nothing found
		return null;
	}
	
}

