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
//const D3D11_SRV_DIMENSION_TEXTURECUBEARRAY = 10;
//const D3D11_SRV_DIMENSION_BUFFEREX = 11;

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
const DXGI_FORMAT_R32G32B32A32_FLOAT = 2;	// 128-bit, four channel float (for input layouts)
//const DXGI_FORMAT_R32G32B32A32_UINT = 3;
//const DXGI_FORMAT_R32G32B32A32_SINT = 4;
//const DXGI_FORMAT_R32G32B32_TYPELESS = 5;
const DXGI_FORMAT_R32G32B32_FLOAT = 6;		// 96-bit, three channel float (for input layouts)
//const DXGI_FORMAT_R32G32B32_UINT = 7;
//const DXGI_FORMAT_R32G32B32_SINT = 8;
//const DXGI_FORMAT_R16G16B16A16_TYPELESS = 9;
//const DXGI_FORMAT_R16G16B16A16_FLOAT = 10;
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
const DXGI_FORMAT_R8G8B8A8_UNORM = 28;		// Standard 32-bit, 8-per-channel color format
//const DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29;
//const DXGI_FORMAT_R8G8B8A8_UINT = 30;
//const DXGI_FORMAT_R8G8B8A8_SNORM = 31;
//const DXGI_FORMAT_R8G8B8A8_SINT = 32;
//const DXGI_FORMAT_R16G16_TYPELESS = 33;
//const DXGI_FORMAT_R16G16_FLOAT = 34;
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

class D3D11_RENDER_TARGET_VIEW_DESC
{
	Format; // NO typeless, if DXGI_FORMAT_UNKNOWN then resource type is used
	ViewDimension;

	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_RTV)
	MipSlice;
	FirstArraySlice;	// Or FirstWSlice for 3D textures
	ArraySize;			// Or WSize for 3D textures

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
}

// Describes a sampler state
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
}


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
	// TODO: Remove array slice/size stuff?  WebGL doesn't seem to handle it
	//       Or just keep but rRequire to match resource?

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
}


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
		this.SampleDesc = Object.assign({}, sampleDesc);
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}
}


class DXGI_SAMPLE_DESC
{
	Count;
	Quality;

	constructor(count, quality)
	{
		this.Count = count;
		this.Quality = quality;
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

	// Not to spec, but necessary due to a lack
	// of protected access in javascript
	// NOTE: Could be "faked" with an Add(), Release() pair, but that feels silly

	/**
	 * Get the current reference count of the object
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

		// Abstract check.
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



// -----------------------------------------------------
// ---------------------- Device -----------------------
// -----------------------------------------------------

class ID3D11Device extends IUnknown
{
	#gl;
	#immediateContext;
	#anisoExt;

	constructor(gl)
	{
		super();

		this.#gl = gl;
		this.#immediateContext = null;

		// Attempt to load the anisotropic extension
		this.#anisoExt =
			this.#gl.getExtension("EXT_texture_filter_anisotropic") ||
			this.#gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
			this.#gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
	}

	GetAdapter()
	{
		return this.#gl;
	}

	// Not to spec, but I want the device to "own" thing kind of stuff
	GetAnisoExt()
	{
		return this.#anisoExt;
	}

	GetImmediateContext()
	{
		if (this.#immediateContext == null)
			this.#immediateContext = new ID3D11DeviceContext(this);

		return this.#immediateContext;
	}

	// TODO: Add description
	CreateRenderTargetView(resource)
	{
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		return new ID3D11RenderTargetView(this, resource);
	}


	// TODO: Respect buffer desc
	// TODO: Use SubresourceData struct for initial data to match d3d spec?
	// TODO: Ensure array types for initial data? 
	// TODO: Full validation of description
	CreateBuffer(bufferDesc, initialData)
	{
		// Validate description
		this.#ValidateBufferDesc(bufferDesc);

		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Create the gl buffer and final D3D buffer
		let glBuffer = this.#gl.createBuffer();
		let d3dBuffer = new ID3D11Buffer(this, bufferDesc, glBuffer);

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
				// NOTE: Constant buffers with default usage should probably still be dyanmic draw
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
		return d3dBuffer;
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
			if (resource instanceof ID3D11Texture2D)
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

		return new ID3D11InputLayout(this, inputElementDescs);
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
		return new ID3D11PixelShader(this, glShader, ps);
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
			if (resource instanceof ID3D11Texture2D)
				viewDim = D3D11_RTV_DIMENSION_TEXTURE2D;
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

		return new class extends ID3D11RenderTargetView { }(this, resource, desc);
	}


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
			let viewDim = null;
			if (resource instanceof ID3D11Texture2D)
				viewDim = D3D11_SRV_DIMENSION_TEXTURE2D;
			else
				throw new Error("Invalid resource type for SRV");

			let resDesc = resource.GetDesc();
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


	// TODO: Validate full description
	// NOTE: Immutable textures are possible:
	//  - https://registry.khronos.org/OpenGL/specs/es/3.0/es_spec_3.0.pdf#nameddest=subsection.3.8.4
	//  - Using texStorage2D() makes the resource immutable
	//  - Immutable here means it cannot be resized or mip levels be changed
	//  - Its DATA can still change!

	CreateTexture2D(desc, initialData)
	{
		// This may change pipeline state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Validate the description/initial data combo
		this.#ValidateTexture2DDesc(desc, initialData);

		// Create the gl texture and final D3D texture object
		let glTexture = this.#gl.createTexture();

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
		let glFormatDetails = this.#GetFormatDetails(desc.Format);
		let internalFormat = glFormatDetails.InternalFormat;
		let format = glFormatDetails.Format;
		let type = glFormatDetails.Type;
		let isDepth = glFormatDetails.IsDepth;
		let hasStencil = glFormatDetails.HasStencil;
		let hasMipmaps = desc.MipLevels > 1; // TODO: Check and update

		// Set new texture
		// TODO: Handle types
		this.#gl.bindTexture(this.#gl.TEXTURE_2D, glTexture);

		// Create the actual resource
		// Use texStorage2D() to initialize the entire
		// texture and all subresources at once
		// See here for details on formats/types/etc: https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexStorage2D.xhtml
		// TODO: Use texStorage3D() for 3D textures and 2D Texture Arrays!
		this.#gl.texStorage2D(
			this.#gl.TEXTURE_2D,
			desc.MipLevels,
			internalFormat,
			desc.Width,
			desc.Height);

		// Do we have any initial data?
		if (initialData != null)
		{
			// Now that it exists, copy the initial data to the first mip level
			// TODO: Somehow handle taking in multiple levels worth of data?  Array of images?
			// TODO: Handle other types with texSubImage3D()
			this.#gl.texSubImage2D(
				this.#gl.TEXTURE_2D,
				0, // Mip
				0, // X
				0, // Y
				desc.Width,
				desc.Height,
				format,
				type,
				initialData);
		}

		// TODO: Handle types
		this.#SetDefaultSamplerStateForTexture(this.#gl.TEXTURE_2D, hasMipmaps);

		// Create and return the new object
		return new class extends ID3D11Texture2D { } (this, desc, glTexture);
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

		return new ID3D11VertexShader(this, glShader, vs);
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
	#SetDefaultSamplerStateForTexture(textureType, hasMipmaps)
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


	#ValidateBufferDesc(desc)
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
		if (desc.Usage < D3D11_USAGE_DEFAULT ||
			desc.Usage > D3D11_USAGE_STAGING)
			throw new Error("Invalid usage for buffer description.");

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
		if (this.#anisoExt)
		{
			// Is available, so validate maxAniso range
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
			case DXGI_FORMAT_R8G8B8A8_UNORM: break;

			default:
				throw new Error("Specified RTV Format is invalid or not yet implemented!");
		}

		// View dimension
		// - Must match that of the resource type
		// - TODO: Check how to handle arrays vs. single elements
		switch (rtvDesc.ViewDimension)
		{
			case D3D11_RTV_DIMENSION_TEXTURE2D:
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Specified RTV View Dimension does not match resource");
				break;

			case D3D11_RTV_DIMENSION_TEXTURE1D:
			case D3D11_RTV_DIMENSION_TEXTURE1DARRAY:
			case D3D11_RTV_DIMENSION_TEXTURE2DARRAY:
			case D3D11_RTV_DIMENSION_TEXTURE3D:
			case D3D11_RTV_DIMENSION_TEXTURECUBE:
				throw new Error("Specified RTV View Dimension is not yet implemented!");

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
			case DXGI_FORMAT_R8G8B8A8_UNORM: break;

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
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Specified SRV View Dimension does not match resource");
				break;

			case D3D11_SRV_DIMENSION_TEXTURE1D:
			case D3D11_SRV_DIMENSION_TEXTURE1DARRAY:
			case D3D11_SRV_DIMENSION_TEXTURE2DARRAY:
			case D3D11_SRV_DIMENSION_TEXTURE3D:
			case D3D11_SRV_DIMENSION_TEXTURECUBE:
				throw new Error("Specified SRV View Dimension is not yet implemented!");

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

	#ValidateTexture2DDesc(desc, initialData)
	{
		// Description cannot be null
		if (desc == null)
			throw new Error("Description cannot be null when creating a texture");

		// Get system maximums
		/// TODO: Need to cache this?  Probably not?
		const maxSize = this.#gl.getParameter(this.#gl.MAX_TEXTURE_SIZE);
		const maxCubeSize = this.#gl.getParameter(this.#gl.MAX_CUBE_MAP_TEXTURE_SIZE);
		const maxArraySize = this.#gl.getParameter(this.#gl.MAX_ARRAY_TEXTURE_LAYERS);

		// Is this a texture cube?
		const isCube = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);
		const genMips = ((desc.MiscFlags & D3D11_RESOURCE_MISC_GENERATE_MIPS) == D3D11_RESOURCE_MISC_GENERATE_MIPS);

		// Validate size, for both cubes and non-cubes
		if (isCube && (desc.Width > maxCubeSize || desc.Height > maxCubeSize))
			throw new Error(`Texture Cube dimensions must be less than or equal to ${maxCubeSize}`);
		else if
			(desc.Width <= 0 || desc.Width > maxSize ||
			desc.Height <= 0 || desc.Height > maxSize)
			throw new Error(`Texture dimensions must be between 1 and ${maxSize}, inclusive`);

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

		// TODO: Validate format


		// Validate usage
		// Initial data can be null, unless the resource is immutable
		switch (desc.Usage)
		{
			case D3D11_USAGE_DEFAULT:
			case D3D11_USAGE_DYNAMIC:
			case D3D11_USAGE_STAGING:
				// Should all be fine as-is?
				break;

			case D3D11_USAGE_IMMUTABLE:
				if ((initialData == null || initialData.length == 0))
					throw new Error("Immutable textures must have initial data");
				break;

			default:
				throw new Error("Invalid usage for texture 2d");
		}

		// TODO: Validate bind flags

		// TODO: Validate CPU Access flags

		// Validate misc flags
		if (isCube && desc.ArraySize != 6)
			throw new Error("Invalid array size for texture cube - must be exactly 6");
		
		// Note: this matches spec but is not strictly necessary for WebGL
		if (genMips && (
			(desc.BindFlags & D3D11_BIND_SHADER_RESOURCE) == 0 ||
			(desc.BindFlags & D3D11_BIND_RENDER_TARGET) == 0))
			throw new Error("Resource must have SHADER_RESOURCE and RENDER_TARGET bind flags to generate mip maps");
	}
}


// -----------------------------------------------------
// ------------------ Device Context -------------------
// -----------------------------------------------------

class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	// General pipeline ---
	#fakeBackBufferFrameBuffer;

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
	#outputMergerDirty;

	constructor(device)
	{
		super(device);
		this.#gl = device.GetAdapter();

		// Set some defaults
		// TODO: Extrapolate this into proper states
		this.#gl.enable(this.#gl.CULL_FACE); // Turns on culling (default is backs)
		this.#gl.frontFace(this.#gl.CW);	 // Clockwise fronts to match D3D
		this.#gl.enable(this.#gl.DEPTH_TEST);

		// General
		this.#fakeBackBufferFrameBuffer = this.#gl.createFramebuffer();
		this.#gl.bindFramebuffer(this.#gl.FRAMEBUFFER, this.#fakeBackBufferFrameBuffer);

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
			this.#outputMergerDirty = true;
		}
	}

	// Not to spec, but used by the device to dirty the entire pipeline when
	// the device has altered the GL state in some way
	DirtyPipeline()
	{
		this.#inputAssemblerDirty = true;
		this.#shadersDirty = true;
		this.#vsConstantBuffersDirty = true;
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
		this.#BindFakeFramebuffer();
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
		this.#BindFakeFramebuffer();
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
		// TODO: Handle different types
		this.#gl.bindTexture(this.#gl.TEXTURE_2D, res.GetGLResource());
		this.#gl.generateMipmap(this.#gl.TEXTURE_2D);

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

	// Note: Just taking a single viewport, though
	// the name suggests otherwise, as WebGL only handles
	// a single viewport
	RSSetViewports(viewport)
	{
		// Copy the first element
		this.#viewport = Object.assign({}, viewport);

		// Set the relevant details
		let invertY = this.#gl.canvas.height - this.#viewport.Height;
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

			// Bind the correct buffer for this element
			let bufferIndex = ie.InputSlot;
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
					// TODO: Handle different texture types

					// Grab this resource and first check its mip status
					let res = srv.GetResource();
					this.#textureMipStatus[texMap[t].TextureUnit] = (res.GetDesc().MipLevels != 1);

					// Activate the proper texture unit, bind this resource and set the uniform location
					this.#gl.activeTexture(this.#GetGLTextureUnit(texMap[t].TextureUnit));
					this.#gl.bindTexture(this.#gl.TEXTURE_2D, res.GetGLResource());
					this.#gl.uniform1i(texMap[t].UniformLocation, texMap[t].TextureUnit);

					// Set SRV-specific texture properties
					let srvDesc = srv.GetDesc();
					let baseMip = srvDesc.MostDetailedMip;
					let maxMip = srvDesc.MostDetailedMip + srvDesc.MipLevels - 1;
					this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_BASE_LEVEL, baseMip);
					this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MAX_LEVEL, maxMip);

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

	#PrepareOutputMerger()
	{
		if (!this.#outputMergerDirty)
			return;

		// Ensure the framebuffer is bound first
		this.#BindFakeFramebuffer();

		// Bind the render target and depth buffer as necessary
		this.#BindRenderTargets(this.#renderTargetViews);
		this.#BindDepthStencil(this.#depthStencilView);

		// All done
		this.#outputMergerDirty = false;
	}

	#BindFakeFramebuffer()
	{
		// NOTE: Removed getParam() check due to "best practices" advice
		this.#gl.bindFramebuffer(this.#gl.FRAMEBUFFER, this.#fakeBackBufferFrameBuffer);
	}

	#BindRenderTargets(rtvs)
	{
		// Any RTVs?
		if (rtvs.length > 0)
		{
			// TODO: Multiple render targets
			let rtvResource = rtvs[0].GetResource();
			let viewDesc = rtvs[0].GetDesc();

			// TODO: Handle texture vs. render buffer

			// Get the existing color (target 0)
			let fbTex = this.#gl.getFramebufferAttachmentParameter(
				this.#gl.FRAMEBUFFER,
				this.#gl.COLOR_ATTACHMENT0,
				this.#gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);

			// Do we need to rebind the texture?
			if (fbTex != rtvResource.GetGLResource())
			{
				this.#gl.framebufferTexture2D(
					this.#gl.FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
					rtvResource.GetGLResource(),
					viewDesc.MipSlice); // TODO: Check existing mip slice binding, too!
			}

			// Done with ref
			rtvResource.Release();
		}
	}

	#BindDepthStencil(dsv)
	{
		// Any depth?
		if (dsv != null)
		{
			let dsvResource = dsv.GetResource();
			let viewDesc = dsv.GetDesc();

			// Does this have a stencil buffer?
			let hasStencil = (viewDesc.Format == DXGI_FORMAT_D24_UNORM_S8_UINT);
			let attach = hasStencil ? this.#gl.DEPTH_STENCIL_ATTACHMENT : this.#gl.DEPTH_ATTACHMENT;

			// Get the existing depth/stencil
			let fbDepth = this.#gl.getFramebufferAttachmentParameter(
				this.#gl.FRAMEBUFFER,
				attach,
				this.#gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);

			// Do we need to rebind?
			// TODO: What if it's the same resource but different mip/array slice?
			if (fbDepth != dsvResource.GetGLResource())
			{
				if (!hasStencil)
				{
					// Unbind the combined depth/stencil just in case
					this.#gl.framebufferTexture2D(
						this.#gl.FRAMEBUFFER,
						this.#gl.DEPTH_STENCIL_ATTACHMENT,
						this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
						null,
						0);
				}

				// Bind the depth texture
				this.#gl.framebufferTexture2D(
					this.#gl.FRAMEBUFFER,
					attach,
					this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
					dsvResource.GetGLResource(),
					viewDesc.MipSlice); // TODO: Verify this actually works?  Docs say ZERO only!
			}

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
	#device;
	#gl;
	#backBuffer;
	#finalCopyFramebuffer;

	// TODO: Take in a description to customize back buffer!
	constructor(device)
	{
		super();
		this.#device = device;
		this.#gl = device.GetAdapter();

		// Create the "back buffer"
		let bbDesc = new D3D11_TEXTURE2D_DESC(
			this.#gl.canvas.width,		// TODO: parameterize?
			this.#gl.canvas.height,		// TODO: parameterize?
			1,
			1,
			DXGI_FORMAT_R8G8B8A8_UNORM,	// TODO: parameterize!
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_RENDER_TARGET,	// TODO: parameterize!
			0, 0);

		this.#backBuffer = this.#device.CreateTexture2D(bbDesc, null);

		// Create a frame buffer for the final blit on Present()
		this.#finalCopyFramebuffer = this.#gl.createFramebuffer();
	}


	GetBuffer()
	{
		this.#backBuffer.AddRef();
		return this.#backBuffer;
	}

	// Blit from the back buffer to the default frame buffer
	Present()
	{
		// Bind the default frame buffer (null) to the DRAW buffer
		// and the back buffer as the READ buffer
		this.#gl.bindFramebuffer(this.#gl.DRAW_FRAMEBUFFER, null);
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#finalCopyFramebuffer);

		// Attach the back buffer to the read frame buffer
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.TEXTURE_2D,
			this.#backBuffer.GetGLResource(),
			0);

		// Perform the blit
		let w = this.#gl.canvas.width;
		let h = this.#gl.canvas.height;
		this.#gl.blitFramebuffer(
			0, 0, w, h, // Source L,T,R,B
			0, 0, w, h, // Dest L,T,R,B
			this.#gl.COLOR_BUFFER_BIT, // Colors only
			this.#gl.NEAREST); // No interpolation
		// TODO: Determine if interpolation (LINEAR) makes sense here

		// Flush (not strictly necessary)
		this.#gl.flush();
	}

	Release()
	{
		super.Release();

		if (this.GetRef() <= 0)
		{
			this.#backBuffer.Release();
			this.#gl.deleteFramebuffer(this.#finalCopyFramebuffer);
		}
	}
}


// -----------------------------------------------------
// ---------------- Pipeline Interfaces ----------------
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
		let descs = [];
		for (let i = 0; i < descriptionArray.length; i++)
			descs[i] = Object.assign({}, descriptionArray[i]);
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

		this.#desc = Object.assign({}, desc); // Copy

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
		return Object.assign({}, this.#desc);
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
		const anisoExt = device.GetAnisoExt();
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
		console.log(func);
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
	#dimension;
	#glResource;

	constructor(device, desc, dimension, glResource)
	{
		super(device);
		this.#desc = Object.assign({}, desc); // Copy
		this.#dimension = dimension;
		this.#glResource = glResource;
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
	constructor(device, desc, glBuffer)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_BUFFER, glBuffer);
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

// TODO: Actually implement 1D textures
// - This exists currently so that I can start using the type elsewhere
class ID3D11Texture1D extends ID3D11Resource
{
	constructor(device, desc, glTexture)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_TEXTURE2D, glTexture);

		throw new Error("Texture1D is not implemented yet!");
	}

	Release()
	{
		super.Release();

		// Actually remove texture if necessary
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
	constructor(device, desc, glTexture)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_TEXTURE2D, glTexture);

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
		this.#resource = resource;
		this.#desc = Object.assign({}, desc);

		// Add a reference to the resource
		// so the view keeps it alive
		// NOTE: This might not exactly match D3D ref count, but the
		//       overall effect should be the same!
		this.#resource.AddRef();
	}

	GetDesc()
	{
		return Object.assign({}, this.#desc);
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

		// Check the resource
		let resDesc = resource.GetDesc();

		// Has to have the correct bind flag
		if ((resDesc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == 0)
			throw new Error("Resource not set for depth stencil binding");

		// Must be the right dimension!
		// TODO: Handle the rest of the types
		switch (desc.ViewDimension)
		{
			//case D3D11_DSV_DIMENSION_TEXTURE1D:
			//case D3D11_DSV_DIMENSION_TEXTURE1DARRAY: break;
			//case D3D11_DSV_DIMENSION_TEXTURE2DARRAY: break;

			case D3D11_DSV_DIMENSION_TEXTURE2D:

				// Has to actually be a texture2d
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Resource type does not match view description");

				break;

			default:
				throw new Error("Invalid view dimension for depth stencil view");
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
					this.#ParseGlobalVarOrFunction(it, globalCB);
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
			do
			{
				// Check for texture object function call, which occurs
				// when a texture identifier is followed immediately by a period
				this.#CheckAndParseTextureObjectFunction(it, f, funcStartPos);

				// Look for matrix functions


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
		}
	}


	// Check the current token to see if we're at the beginning of a texture
	// object function call, and if so, store that info
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

				// TODO: Maybe a helper to handle all of the permutations?
				break;

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

		// An entire expression that (theoretically) evaluates to texture
		// coords, including another texture sample!
		let uvExpressionStartPos = it.Position() - relativePosOffset;
		let parenDepth = 1;

		do
		{
			// Check for a sub-texture function
			this.#CheckAndParseTextureObjectFunction(it, baseFunc, relativePosOffset);

			// Check for paren depth changes
			if (this.#Allow(it, TokenParenLeft))
				parenDepth++;
			else if (this.#Allow(it, TokenParenRight))
				parenDepth--;
			else
				it.MoveNext();

		} while (parenDepth >= 1);

		// We've ended the overall function with a right paren
		// so store the end location and finalize this data
		let uvExpressionEndPos = it.Position() - relativePosOffset - 1; // Stop one early (before last parens)
		let overallEndPos = it.Position() - relativePosOffset; // Should include the end parens

		// Set up the texture/sampler combination
		let combination = this.#GetOrCreateTextureSamplerCombination(textureName, samplerName);

		// Set up the overall texture function details and add to the base function
		let texFunc = {
			TextureSamplerCombination: combination,
			FunctionName: textureFuncName,
			StartPosition: overallStartPos,
			EndPosition: overallEndPos,
			UVExpressionStartPosition: uvExpressionStartPos,
			UVExpressionEndPosition: uvExpressionEndPos
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
		glsl += "vec3 lerp(vec3 a, vec3 b, float t) { return mix(a, b, t); }\n";

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
				case "Texture2D":
					samplerType = "sampler2D";
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

			// Add the token
			funcStr += this.#TranslateToken(t);

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

		// We have at least one function and we're at the right position
		let texFuncStr = "texture(" + whichTexFunc.TextureSamplerCombination.CombinedName + ", ";

		// Skip ahead to the expression
		while (it.Position() < whichTexFunc.UVExpressionStartPosition)
			it.MoveNext();

		// Handle the expression, which may require a recursive call
		while (it.Position() < whichTexFunc.UVExpressionEndPosition)
		{
			// Determine if we've got a sub-texture-function
			texFuncStr += this.#GetTextureFunctionString(it, baseFunc);

			// Handle the remaining tokens
			texFuncStr += this.#TranslateToken(it.Current());

			// Skip ahead
			it.MoveNext();
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
			main += "\t" + this.#Translate(vsInputs[v].DataType) + " " + vsInputs[v].Name + " = ";
			main += PrefixAttribute + vsInputs[v].Name + ";\n";
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

