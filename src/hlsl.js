
// -----------------------------------------------------
// ----------------------- HLSL ------------------------
// -----------------------------------------------------

// NEW: https://microsoft.github.io/hlsl-specs/specs/hlsl.pdf  Has exact casting details!

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


// Update: Basing new weights on chart: https://docs.google.com/spreadsheets/d/1kUEB6gI3y3kCFMcatRDtht6f7c8WZ6wp2gZA50eI138/edit
const HLSLScalarImplicitCastWeights = {
	bool:	{ bool: 0, int: 1, dword: 1, uint: 1, half: 2, float: 1, double: 1 },
	int:	{ bool: 2, int: 0, dword: 1, uint: 1, half: 3, float: 2, double: 2 },
	dword:  { bool: 2, int: 1, dword: 0, uint: 0, half: 3, float: 2, double: 2 },
	uint:	{ bool: 2, int: 1, dword: 0, uint: 0, half: 3, float: 2, double: 2 },
	half:	{ bool: 3, int: 2, dword: 2, uint: 2, half: 0, float: 1, double: 1 },
	float:	{ bool: 2, int: 2, dword: 2, uint: 2, half: 2, float: 0, double: 1 },
	double: { bool: 1, int: 1, dword: 1, uint: 1, half: 1, float: 1, double: 0 }
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

	static IsNumericType(text)
	{
		let rootType = HLSL.GetRootType(text);

		switch (rootType) {
			case "int":
			case "uint":
			case "dword":
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

	Validate(scope) // DONE
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
			// PROBLEM: function call on left side, like so:  mul(a, b).x
			//  - Left side function call has no type yet! 

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
	}

	Validate(scope) // DONE?
	{
		this.ExpLeft.Validate(scope);

		// Expression must be variable or member
		if (!(this.ExpLeft instanceof ExpVariable) &&
			!(this.ExpLeft instanceof ExpMember))
			throw new ValidationError(this.ExpLeft, "Invalid operand type for postfix operator");

		// If it's a member, the rightmost child must be a variable
		if (this.ExpLeft instanceof ExpMember &&
			!(this.ExpLeft.GetRightmostChild() instanceof ExpVariable))
			throw new ValidationError(this.ExpLeft, "Invalid member operand for postfix operator");

		// Check the expression's type
		console.log("TYPE: " + this.ExpLeft.DataType);
		if (!HLSL.IsNumericType(this.ExpLeft.DataType))
			throw new ValidationError(this.ExpLeft, "Invalid type for postfix operator");

		// Type from expression
		this.DataType = this.ExpLeft.DataType;
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

	Validate(scope) // DONE
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
			console.log(name + ": NO MATCHES (in " + overloadEntries.length + " overloads)");
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