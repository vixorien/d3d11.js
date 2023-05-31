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

// Filtering options during texture sampling							// Hex -> Binary
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
// Notes on filter bits:
// 1 bit: Mip filter --> 0 = point, 1 = linear
// 2 bit: unused
// 4 bit: Mag filter --> 0 = point, 1 = linear
// 8 bit: unused
// 16 bit: Min filter --> 0 = point, 1 = linear
// 32 bit: unused
// 64 bit: Anisotropic --> 0 = no, 1 = yes
// 128 bit: Comparison --> 0 = no, 1 = yes

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

// Identify a technique for resolving texture coordinates that are outside of the boundaries of a texture.
const D3D11_TEXTURE_ADDRESS_WRAP = 1;
const D3D11_TEXTURE_ADDRESS_MIRROR = 2;
const D3D11_TEXTURE_ADDRESS_CLAMP = 3;
const D3D11_TEXTURE_ADDRESS_BORDER = 4;
const D3D11_TEXTURE_ADDRESS_MIRROR_ONCE = 5;

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