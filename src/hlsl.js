
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

// TODO: missing a few matrix permutations (1xN, Nx1) and matrices of non-floats
const HLSLDataTypeConversion = {
	"void": { "RootType": "void", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "void" },

	"bool":  { "RootType": "bool", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "bool" },
	"bool1": { "RootType": "bool", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "bool" },
	"bool2": { "RootType": "bool", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "bvec2" },
	"bool3": { "RootType": "bool", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "bvec3" },
	"bool4": { "RootType": "bool", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "bvec4" },

	"int":  { "RootType": "int", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "int" },
	"int1": { "RootType": "int", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "int" },
	"int2": { "RootType": "int", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "ivec2" },
	"int3": { "RootType": "int", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "ivec3" },
	"int4": { "RootType": "int", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "ivec4" },

	"uint":  { "RootType": "uint", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" }, 
	"uint1": { "RootType": "uint", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"uint2": { "RootType": "uint", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "uvec2" },
	"uint3": { "RootType": "uint", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "uvec3" },
	"uint4": { "RootType": "uint", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "uvec4" },

	"dword":  { "RootType": "dword", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"dword1": { "RootType": "dword", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "uint" },
	"dword2": { "RootType": "dword", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "uvec2" },
	"dword3": { "RootType": "dword", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "uvec3" },
	"dword4": { "RootType": "dword", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "uvec4" },

	"half":  { "RootType": "half", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"half1": { "RootType": "half", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"half2": { "RootType": "half", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" }, 
	"half3": { "RootType": "half", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" }, 
	"half4": { "RootType": "half", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" }, 

	"float":  { "RootType": "float", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"float1": { "RootType": "float", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"float2": { "RootType": "float", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" }, 
	"float3": { "RootType": "float", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" }, 
	"float4": { "RootType": "float", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" }, 

	"double":  { "RootType": "double", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"double1": { "RootType": "double", "SVM": "scalar", "Components": 1, "Rows": 1, "Cols": 1, "GLSL": "float" },
	"double2": { "RootType": "double", "SVM": "vector", "Components": 2, "Rows": 1, "Cols": 2, "GLSL": "vec2" },
	"double3": { "RootType": "double", "SVM": "vector", "Components": 3, "Rows": 1, "Cols": 3, "GLSL": "vec3" },
	"double4": { "RootType": "double", "SVM": "vector", "Components": 4, "Rows": 1, "Cols": 4, "GLSL": "vec4" },

	"float2x2": { "RootType": "float", "SVM": "matrix", "Components": 4, "Rows": 2, "Cols": 2, "GLSL": "mat2" },
	"float2x3": { "RootType": "float", "SVM": "matrix", "Components": 6, "Rows": 2, "Cols": 3, "GLSL": "mat2x3" },
	"float2x4": { "RootType": "float", "SVM": "matrix", "Components": 8, "Rows": 2, "Cols": 4, "GLSL": "mat2x4" },

	"float3x2": { "RootType": "float", "SVM": "matrix", "Components": 6, "Rows": 3, "Cols": 2, "GLSL": "mat3x2" },
	"float3x3": { "RootType": "float", "SVM": "matrix", "Components": 9, "Rows": 3, "Cols": 3, "GLSL": "mat3" },
	"float3x4": { "RootType": "float", "SVM": "matrix", "Components": 12, "Rows": 3, "Cols": 4, "GLSL": "mat3x4" },

	"float4x2": { "RootType": "float", "SVM": "matrix", "Components": 8, "Rows": 4, "Cols": 2, "GLSL": "mat4x2" },
	"float4x3": { "RootType": "float", "SVM": "matrix", "Components": 12, "Rows": 4, "Cols": 3, "GLSL": "mat4x3" },
	"float4x4": { "RootType": "float", "SVM": "matrix", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" },

	"matrix": { "RootType": "float", "SVM": "matrix", "Components": 16, "Rows": 4, "Cols": 4, "GLSL": "mat4" }
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
	"Sample": "texture",
	"SampleLevel": "textureLod"
};

const HLSLImplicitCastRank = {
	"bool": 0,
	"int": 1,
	"uint": 2,
	"dword": 3,
	"half": 4,
	"float": 5,
	"double": 6
};

// See:
// - HLSL: https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions
// - GLSL: https://registry.khronos.org/OpenGL-Refpages/gl4/index.php
// Return type details
// - Full passthrough --> same as the input
// - Components == -1 --> Use the same as the input
const HLSLIntrinsics = {
	"abs": { ReturnType: "float", GLSL:"abs" },
	"acos": { ReturnType: "float", GLSL: "acos" }, // TEMP return type!!
	"all": { ReturnType: "bool", GLSL: "abs" },
	"any": { ReturnType: "bool", GLSL: "abs" },
	// "asdouble": {}, // Skip -> No GLSL equivalent.  Or make our own?
	"asfloat": { ReturnType: "passthrough", GLSL: "intBitsToFloat" }, // Note: GLSL versions (intBitsToFloat, uintBitsToFloat) are scalar only!  Custom handling?
	"asin": { ReturnType: "float", GLSL: "asin" }, // TEMP return type!!
	"asint": { ReturnType: "passthrough", GLSL: "floatBitsToInt"},
	"asuint": { ReturnType: "passthrough", GLSL: "floatBitsToUint" },
	"atan": { ReturnType: "float", GLSL: "atan" }, // TEMP return type!!
	"atan2": { ReturnType: "float", GLSL: null }, // TEMP return type!!  Handling GLSL translation another way!
	"ceil": { ReturnType: "float", GLSL: "ceil" }, // TEMP return type!!
	"clamp": { ReturnType: "float", GLSL: "clamp" }, // TEMP return type!!
	//"clip": { }, // No equiv.  Could make our own w/ discard?
	"cos": { ReturnType: "float", GLSL: "cos" },
	"cosh": { ReturnType: "float", GLSL: "cosh" },
	"countbits": { ReturnType: "uint", GLSL: "bitCount" },
	"cross": { ReturnType: "float3", GLSL: "cross" }, // TEMP return type!!
	"ddx": { ReturnType: "float", GLSL: "dFdx" },// TEMP return type!!
	"ddx_coarse": { ReturnType: "float", GLSL: "dFdxCoarse" },// TEMP return type!!
	"ddx_fine": { ReturnType: "float", GLSL: "dFdxFine" },// TEMP return type!!
	"ddy": { ReturnType: "float", GLSL: "dFdy" },// TEMP return type!!
	"ddy_coarse": { ReturnType: "float", GLSL: "dFdyCoarse" },// TEMP return type!!
	"ddy_fine": { ReturnType: "float", GLSL: "dFdyFine" },// TEMP return type!!
	"degrees": { ReturnType: "float", GLSL: "degrees" },
	"determinant": { ReturnType: "float", GLSL: "determinant" },
	"distance": { ReturnType: "float", GLSL: "distance" },
	"dot": { ReturnType: "float", GLSL: "dot" },
	//"dst": {}, // Maybe skip?
	"exp": { ReturnType: "float", GLSL: "exp" },// TEMP return type!!
	"exp2": { ReturnType: "float", GLSL: "exp2" },// TEMP return type!!
	//"f16tof32": {}, // Skip?
	//"f32tof16": {}, // Skip?
	"faceforward": { ReturnType: "float3", GLSL: "faceforward" },
	//"firstbithigh": {}, // Skip?
	//"firstbitlow": {}, // Skip?
	"floor": { ReturnType: "float", GLSL: "floor" },// TEMP return type!!
	// "fma": {}, // Skip?  Exists in GLSL but HLSL version is only doubles?
	// "fmod": {}, // Skip?
	"frac": { ReturnType: "float", GLSL: "fract" },
	"fwidth": { ReturnType: "float", GLSL: "fwidth" }, // TEMP return type!!
	"isfinite": {},
	"isinf": { ReturnType: "bool", GLSL: "isinf" }, // TEMP return type!!
	"isnan": { ReturnType: "bool", GLSL: "isnan" }, // TEMP return type!!
	"ldexp": { ReturnType: "float", GLSL: "ldexp" }, // TEMP return type!!
	"length": { ReturnType: "float", GLSL: "length" },
	"lerp": { ReturnType: "float3", GLSL: "mix" },
	// "lit": {}, // Skip?  // No GLSL equiv
	"log": { ReturnType: "float", GLSL: "log" }, // TEMP return type!!
	// "log10": {}, // Skip?  No GLSL equiv
	"log2": { ReturnType: "float", GLSL: "log2" }, // TEMP return type!!
	// "mad": {}, // Skip?  No GLSL equiv
	"max": { ReturnType: "float", GLSL: "max" },  // TEMP return type!!
	"min": { ReturnType: "float", GLSL: "min" },  // TEMP return type!!
	"modf": { ReturnType: "float", GLSL: "modf" },  // TEMP return type!!
	// "msad4": {}, // Skip?  No GLSL equiv
	"mul": { ReturnType: "float4", GLSL: null }, // TEMP return type!!  Handling GLSL translation another way!
	"normalize": { ReturnType: "float3", GLSL: "normalize" },  // TEMP return type!!
	"pow": { ReturnType: "float", GLSL: "pow" },  // TEMP return type!!
	"radians": { ReturnType: "float", GLSL: "radians" },  // TEMP return type!!
	// "rcp": {}, // Skip?  No GLSL equiv
	"reflect": { ReturnType: "float3", GLSL: "reflect" },  // TEMP return type!!
	"refract": { ReturnType: "float3", GLSL: "refract" },  // TEMP return type!!
	// "reversebits": {}, // Skip?  No GLSL equiv
	"round": { ReturnType: "float", GLSL: "round" },  // TEMP return type!!
	// "rsqrt": {}, // Skip?  No GLSL equiv.  Maybe make our own?
	"saturate": { ReturnType: "float4", GLSL: null }, // TEMP return type!!  Handling GLSL translation another way!
	"sign": { ReturnType: "int", GLSL: "sign" },  // TEMP return type!!
	"sin": { ReturnType: "float", GLSL: "sin" },  // TEMP return type!!
	// "sincos": {}, // Skip here - handled another way
	"sinh": { ReturnType: "float", GLSL: "sinh" },  // TEMP return type!!
	"smoothstep": { ReturnType: "float", GLSL: "smoothstep" },  // TEMP return type!!
	"sqrt": { ReturnType: "float", GLSL: "sqrt" },  // TEMP return type!!
	"step": { ReturnType: "float", GLSL: "step" },  // TEMP return type!!
	"tan": { ReturnType: "float", GLSL: "tan" },  // TEMP return type!!
	"tanh": { ReturnType: "float", GLSL: "tanh" },  // TEMP return type!!
	"transpose": { ReturnType: "matrix", GLSL: "transpose" },  // TEMP return type!!
	"trunc": { ReturnType: "float", GLSL: "trunc" },  // TEMP return type!!
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
		if (HLSLDataTypeConversion.hasOwnProperty(identifier))
			return HLSLDataTypeConversion[identifier].GLSL;
		else if (HLSLReservedWordConversion.hasOwnProperty(identifier))
			return HLSLReservedWordConversion[identifier];
		else
			return identifier;
	}

	static DataTypeFromLiteralToken(token)
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

	// Determines if the give castee type can be cast to the target type
	//  casteeType: type that might be cast
	//  targetType: type we actually need
	#CanCastTo(casteeTypeName, targetTypeName)
	{
		// "void" can't be cast to or from
		if (casteeTypeName == "void" || targetTypeName == "void")
			return false;

		// Do they match?  If so, they're fine
		if (casteeTypeName == targetTypeName)
			return true;

		// Castee must be a real type (not a struct)
		if (!HLSLDataTypeConversion.hasOwnProperty(casteeTypeName))
			return false;

		// If this isn't a built in type, it might be a struct
		if (!HLSLDataTypeConversion.hasOwnProperty(targetTypeName))
		{
			// Custom structs can't be castees, but CAN be targets!
			for (let s = 0; s < this.#structs.length; s++)
			{
				if (s.Name == targetTypeName)
				{
					// The target is a struct, so the castee must be a scalar
					return this.#IsScalarType(casteeTypeName);
				}
			}

			// Target is not built in, and not a struct
			return false;
		}

		// Both types are built in, grab their details
		let casteeDetails = HLSLDataTypeConversion[casteeTypeName];
		let targetDetails = HLSLDataTypeConversion[targetTypeName];
		let casteeRank = HLSLImplicitCastRank[casteeDetails.RootType];
		let targetRank = HLSLImplicitCastRank[targetDetails.RootType];

		// Check permutations
		if (casteeDetails.SVM == "scalar" && targetDetails.SVM == "scalar")
		{

		}

		// TODO: FINISH

		// TEMPORARY!!!
		return true;
	}

	// Does this function match the given name and param list?
	// Note: This is not a "ShaderElementFunction" member function
	//       because it needs access to the HLSL's #structs array
	#MatchFunctionSignature(customFunction, name, params)
	{
		// Check name and param length first
		if (customFunction.Name != name || customFunction.Parameters.length != params.length)
			return false;
		
		// Loop through params and check data type compatibility
		for (let p = 0; p < customFunction.Parameters.length; p++)
			if (!this.#CanCastTo(params[p].DataType, customFunction.Parameters[p].DataTypeToken.Text))
				return false;

		// Everything matches
		return true;
	}

	static GetImplicitCastType(typeA, typeB)
	{
		// Validate types
		if (typeA == null || typeB == null)
			return null;

		// Grab details
		let a = HLSLDataTypeConversion[typeA];
		let b = HLSLDataTypeConversion[typeB];
		let rankA = HLSLImplicitCastRank[a.RootType];
		let rankB = HLSLImplicitCastRank[b.RootType];

		// Check for s/v/m types
		if (a.SVM == "scalar" && b.SVM == "scalar") // Scalar & Scalar
		{
			return rankA >= rankB ? typeA : typeB; // Return the highest rank
		}
		else if (a.SVM == "scalar" && (b.SVM == "vector" || b.SVM == "matrix")) // Scalar & (Vector or Matrix)
		{
			return typeB; // Non-scalar wins
		}
		else if ((a.SVM == "vector" || a.SVM == "matrix") && b.SVM == "scalar") // (Vector or Matrix) & Scalar
		{
			return typeA; // Non-scalar wins
		}
		else if (a.SVM == "vector" && b.SVM == "vector")
		{
			// Both vectors, so truncate to smallest (but use highest rank?)
			let size = a.Components <= b.Components ? a.Components : b.Components;
			let rootType = rankA >= rankB ? a.RootType : b.RootType;
			return rootType + size.toString(); // Example: "float" + "2"
		}
		else if (a.SVM == "matrix" && b.SVM == "matrix")
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

	#DataTypeFromMemberExpression(exp, memberToken)
	{
		// Member could be:
		// - vector components/swizzle
		// - matrix element
		// - struct member (left is variable)

		// Check for struct type first
		let memberType = this.#GetStructMemberType(exp.DataType, memberToken.Text);
		if (memberType != null)
			return memberType;

		// Not a struct member - check for matrix
		if (this.#IsMatrixType(exp.DataType))
		{
			// This is a matrix, so validate member
			if (HLSLMatrixElementConversion.hasOwnProperty(memberToken.Text))
				return "float"; // All matrices are floats in GLSL, so we've got to follow suit
				// TODO: Maybe keep this as the declared type until actual GLSL conversion?
			else
				throw new ParseError(memberToken, "Invalid matrix member: " + memberToken.Text); // TODO: Find the actual error message
		}

		// Is the left-side expression a scalar?
		if (this.#IsScalarType(exp.DataType))
		{
			let scalarType = HLSLDataTypeConversion[exp.DataType].RootType;
			if (scalarType == null)
				throw new ParseError(memberToken, "Invalid scalar type");

			// We have the scalar type of the expression, so validate the member
			switch (memberToken.Text)
			{
				case "r": case "x": return scalarType;
				case "rr": case "xx": return scalarType + "2";
				case "rrr": case "xxx": return scalarType + "3";
				case "rrrr": case "xxxx": return scalarType + "4";
				default:
					throw new ParseError(memberToken, "Invalid swizzle: " + memberToken.Text); // TODO: Real error message
			}
		}

		// Is the left-side expression a vector?
		if (this.#IsVectorType(exp.DataType))
		{
			// Extract data about the vector
			let components = exp.DataType.slice(-1);
			let coreType = exp.DataType.slice(0, -1);
			
			// TODO: Clean this up!
			switch (components)
			{
				case "2":
					let xy = RegexSwizzleXY.test(memberToken.Text);
					let rg = RegexSwizzleRG.test(memberToken.Text);
					if (xy || rg)
						return memberToken.Text.length == 1 ? coreType : coreType + memberToken.Text.length.toString(); // .xyy -> float3

				case "3":
					let xyz = RegexSwizzleXYZ.test(memberToken.Text);
					let rgb = RegexSwizzleRGB.test(memberToken.Text);
					if (xyz || rgb)
						return memberToken.Text.length == 1 ? coreType : coreType + memberToken.Text.length.toString(); // .xyy -> float3

				case "4":
					let xyzw = RegexSwizzleXYZW.test(memberToken.Text);
					let rgba = RegexSwizzleRGBA.test(memberToken.Text);
					if (xyzw || rgba)
						return memberToken.Text.length == 1 ? coreType : coreType + memberToken.Text.length.toString(); // .xyy -> float3
			}

			// Invalid component count or swizzle failed
			throw new ParseError(memberToken, "Invalid swizzle: " + memberToken.Text); // TODO: Real error message
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

		// Create the scope stack to track variable definitions
		let scope = new ScopeStack();
		scope.PushScope();

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
					let globalConst = this.#ParseVarDecStatement(it, scope);
					this.#globalConstants.push(globalConst);
					break;

				// Skip extra end statements
				case ";":
					it.MoveNext();
					break;

				case "struct":
					this.#structs.push(this.#ParseStruct(it, scope));
					break;

				case "cbuffer":
					this.#cbuffers.push(this.#ParseCBuffer(it, scope));
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
					if (!this.#ParseGlobalVarOrFunction(it, scope, globalCB))
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
		// Scope stack?
		let scope = new ScopeStack();

		// Validate each statement in each function
		for (let f = 0; f < this.#functions.length; f++)
		{
			let func = this.#functions[f];
			for (let s = 0; s < func.Statements.length; s++)
			{
				// Call validate on each statement, letting it handle the scope stack?
				func.Statements[s].Validate(scope);
			}
		}
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
		let isDataType = HLSLDataTypeConversion.hasOwnProperty(text);
		return isStructType || isDataType;
	}

	#IsMatrixType(text)
	{
		switch (text)
		{
			case "float2x2":
			case "float2x3":
			case "float2x4":

			case "float3x2":
			case "float3x3":
			case "float3x4":

			case "float4x2":
			case "float4x3":
			case "float4x4":

			case "matrix":
				return true;
		}

		return false;
	}

	#IsScalarType(text)
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

	#IsVectorType(text)
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

	#IsVectorOrScalarType(text)
	{
		return this.#IsScalarType(text) || this.#IsVectorType(text);
	}

	#IsReservedWord(text)
	{
		return HLSLReservedWordConversion.hasOwnProperty(text);
	}

	#GetFunctionReturnType(nameToken, params)
	{
		//console.log("NAME: " + nameToken.Text);
		// Check different types of functions
		if (nameToken.Text != "void" && HLSLDataTypeConversion.hasOwnProperty(nameToken.Text)) // Built-in type initializers: float4(), uint(), etc.
		{
			return nameToken.Text;
		}
		else if (HLSLIntrinsics.hasOwnProperty(nameToken.Text)) // Check for intrinsics
		{
			// TODO: Make this MUCH more versatile, checking S/V/M type, component count, etc.
			return HLSLIntrinsics[nameToken.Text].ReturnType;
		}
		else if (HLSLTextureSampleConversion.hasOwnProperty(nameToken.Text))
		{
			// This is a texture sample function
			// TODO: Update this once we support comparison sampling!
			return "float4";
		}
		else // Might be a custom function
		{
			for (let f = 0; f < this.#functions.length; f++)
			{
				// If this function matches, use its return type
				if (this.#MatchFunctionSignature(this.#functions[f], nameToken.Text, params))
					return this.#functions[f].ReturnType;
			}
		}

		// Function name not found!
		throw new ParseError(nameToken, "Invalid function name: " + nameToken.Text); // TODO: Better error message
	}

	#ParseStruct(it, scope)
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

			vars.push(this.#ParseMemberVariableOrFunctionParam(it, scope, false, true, true, false));
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


	#ParseCBuffer(it, scope)
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
			let v = this.#ParseMemberVariableOrFunctionParam(it, scope, false, false, false, false);
			vars.push(v);
			scope.AddVar(v);
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
	#ParseMemberVariableOrFunctionParam(it, scope, allowInputMod, allowInterpMod, allowSemantic, allowInit)
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
			arrayExp = this.#ParseExpression(it, scope);
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

			initExp = this.#ParseExpression(it, scope);
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
	#ParseGlobalVarOrFunction(it, scope, globalCB)
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
			// We've entered a new scope
			scope.PushScope();
			
			// It's a function, so it may have parameters
			let params = [];
			do
			{
				if (it.Current().Type == TokenParenRight)
					break;

				let p = this.#ParseMemberVariableOrFunctionParam(it, scope, true, true, true, true);
				params.push(p);
				scope.AddVar(p);
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
			let statements = this.#ParseFunctionBody(it, scope);
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
			
			// Finished the function (and scope)
			scope.PopScope();

			// Found something useful
			return true;
		}
		else if (this.#Allow(it, TokenSemicolon))
		{
			// Should be end of a variable, so add to the global cbuffer and scope
			let v = new VarDec(false, typeToken, nameToken, null, null);
			globalCB.Members.push(v);
			scope.AddVar(v);

			// Found a global variable
			return true;
		}

		// Unsuccessful parse
		return false;
	}


	#ParseFunctionBody(it, scope)
	{
		let statements = [];

		// Go until we find the final end scope
		// TODO: Verify this works with nested blocks
		while (it.Current().Type != TokenScopeRight)
		{
			statements.push(this.#ParseStatement(it, scope));
		}

		return statements;
	}

	#ParseStatement(it, scope)
	{
		// Check for possible statement types
		if (this.#Allow(it, TokenScopeLeft)) return this.#ParseBlock(it, scope);
		if (this.#AllowIdentifier(it, "do")) return this.#ParseDoWhile(it, scope);
		if (this.#AllowIdentifier(it, "for")) return this.#ParseFor(it, scope);
		if (this.#AllowIdentifier(it, "if")) return this.#ParseIf(it, scope);
		if (this.#AllowIdentifier(it, "return")) return this.#ParseReturn(it, scope);
		if (this.#AllowIdentifier(it, "switch")) return this.#ParseSwitch(it, scope);
		if (this.#IsDataType(it.Current().Text) || it.Current().Text == "const") return this.#ParseVarDecStatement(it, scope);
		if (this.#AllowIdentifier(it, "while")) return this.#ParseWhile(it, scope);

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
		return this.#ParseExpressionStatement(it, scope);
	}

	#ParseBlock(it, scope)
	{
		// Assuming open scope already found, loop until matching end scope
		scope.PushScope();
		let statements = [];
		while (it.Current().Type != TokenScopeRight)
		{
			statements.push(this.#ParseStatement(it, scope));
		}

		this.#Require(it, TokenScopeRight);
		scope.PopScope();

		return new StatementBlock(statements);
	}

	#ParseDoWhile(it, scope)
	{
		// Assuming "do" already found
		let body = this.#ParseStatement(it, scope);

		// Look for: while(EXPRESSION);
		this.#RequireIdentifier(it, "while");
		this.#Require(it, TokenParenLeft);
		let condition = this.#ParseExpression(it, scope);
		this.#Require(it, TokenParenRight);
		this.#Require(it, TokenSemicolon);

		return new StatementDoWhile(body, condition);
	}

	#ParseFor(it, scope)
	{
		// Any piece could be empty: for(;;)
		let initStatement = null; // Statement
		let condExp = null; // Expression
		let iterExp = null; // Expression
		let bodyStatement = null; // Statement

		// Assuming "for" already found
		this.#Require(it, TokenParenLeft);
		scope.PushScope();

		// TODO: Handle the comma operator!

		// Init could be a var declaration, or just assignment
		if (this.#IsDataType(it.Current().Text))
		{
			initStatement = this.#ParseVarDecStatement(it, scope); // Already handles semicolon
		}
		else
		{
			// Expression + semicolon
			initStatement = this.#ParseExpressionStatement(it, scope);
			this.#Require(it, TokenSemicolon);
		}

		// Move on to condition, if necessary
		if (it.Current().Type != TokenSemicolon)
		{
			condExp = this.#ParseExpression(it, scope);
		}

		// Semicolon to end cond
		this.#Require(it, TokenSemicolon);

		// Move on to iteration, if necessary
		if (it.Current().Type != TokenParenRight)
		{
			iterExp = this.#ParseExpression(it, scope);
		}

		// Require end paren
		this.#Require(it, TokenParenRight);

		// Parse the body
		bodyStatement = this.#ParseStatement(it, scope);

		// All done
		scope.PopScope();
		return new StatementFor(initStatement, condExp, iterExp, bodyStatement);
	}

	#ParseIf(it, scope)
	{
		// Assuming "if" already found
		this.#Require(it, TokenParenLeft);
		let cond = this.#ParseExpression(it, scope);
		this.#Require(it, TokenParenRight);

		// Grab the if block
		let ifBlock = this.#ParseStatement(it, scope);
		let elseBlock = null;

		// Do we have an else?
		if (this.#AllowIdentifier(it, "else"))
		{
			// Note, the else's block might be a whole if/else again!
			elseBlock = this.#ParseStatement(it, scope);
		}

		return new StatementIf(cond, ifBlock, elseBlock);
	}

	#ParseReturn(it, scope)
	{
		// Assuming "return" already found

		// Check for immediate semicolon (for return;)
		if (this.#Allow(it, TokenSemicolon))
		{
			return new StatementReturn(null);
		}

		// Parse the expression
		let exp = this.#ParseExpression(it, scope);
		this.#Require(it, TokenSemicolon);
		return new StatementReturn(exp);
	}

	#ParseSwitch(it, scope)
	{
		// Assuming "switch" already found
		let selectorExpression = null;
		let cases = [];

		// Need a variable inside ( )'s
		this.#Require(it, TokenParenLeft);
		selectorExpression = this.#ParseExpression(it, scope);
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
				caseValue = this.#ParseExpression(it, scope);
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
				statements.push(this.#ParseStatement(it, scope));
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

	#ParseVarDecStatement(it, scope)
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
				arrayExp = this.#ParseExpression(it, scope);
				this.#Require(it, TokenBracketRight);
			}

			// Any definition?
			let def = null;
			if (this.#AllowOperator(it, "="))
				def = this.#ParseExpression(it, scope);

			// Add to var
			let v = new VarDec(isConst, dataTypeToken, varNameToken, arrayExp, def);
			varDecs.push(v);
			scope.AddVar(v);
		}
		while (this.#Allow(it, TokenComma));

		// Must have at least one var dec
		if (varDecs.length == 0)
			throw new ParseError(it.PeekPrev(), "Variable name expected");

		// Semicolon at end
		this.#Require(it, TokenSemicolon);
		return new StatementVar(isConst, dataTypeToken, varDecs);
	}

	#ParseWhile(it, scope)
	{
		// Assuming "while" already found
		// Look for: (EXPRESSION) STATEMENT
		this.#Require(it, TokenParenLeft);
		let condition = this.#ParseExpression(it, scope);
		this.#Require(it, TokenParenRight);
		let body = this.#ParseStatement(it, scope);

		return new StatementWhile(condition, body);
	}

	#ParseExpressionStatement(it, scope)
	{
		let exp = this.#ParseExpression(it, scope);

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

	#ParseExpression(it, scope)
	{
		return this.#ParseAssignment(it, scope);
	}

	#ParseAssignment(it, scope)
	{
		// Look for next expression precedence first
		let exp = this.#ParseTernary(it, scope);

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
				this.#ParseAssignment(it, scope));
		}

		// No assignment operator found
		return exp;
	}

	#ParseTernary(it, scope)
	{
		// Grab the expression first
		let exp = this.#ParseLogicalOr(it, scope);
		
		// Check for "?" operator
		if (this.#AllowOperator(it, "?"))
		{
			// The next piece should be the "if" expression
			let expIf = this.#ParseExpression(it, scope);
			
			// Now we must have a ":"
			if (this.#Require(it, TokenColon))
			{
				// Last is the "else" expression
				let expElse = this.#ParseExpression(it, scope);

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

	#ParseLogicalOr(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseLogicalAnd(it, scope);

		// Keep going while we have ORs
		while (this.#AllowOperator(it, "||"))
		{
			exp = new ExpLogical(
				exp,
				it.PeekPrev(),
				this.#ParseLogicalAnd(it, scope));
		}

		return exp;
	}

	#ParseLogicalAnd(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseOr(it, scope);

		// Keep going while we have ANDs
		while (this.#AllowOperator(it, "&&"))
		{
			exp = new ExpLogical(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseOr(it, scope));
		}

		return exp;
	}

	#ParseBitwiseOr(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseXor(it, scope);

		// Keep going while we have ORs
		while (this.#AllowOperator(it, "|"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseXor(it, scope));
		}

		return exp;
	}

	#ParseBitwiseXor(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseBitwiseAnd(it, scope);

		// Keep going while we have XORs
		while (this.#AllowOperator(it, "^"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseBitwiseAnd(it, scope));
		}

		return exp;
	}

	#ParseBitwiseAnd(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseEquality(it, scope);

		// Keep going while we have ANDs
		while (this.#AllowOperator(it, "&"))
		{
			exp = new ExpBitwise(
				exp,
				it.PeekPrev(),
				this.#ParseEquality(it, scope));
		}

		return exp;
	}

	#ParseEquality(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseComparison(it, scope);

		// Keep going while we have comparisons
		while (this.#AllowOperator(it, "==", "!="))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseComparison(it, scope));
		}

		return exp;
	}

	#ParseComparison(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseShift(it, scope);

		// Keep going while we have comparisons
		while (this.#AllowOperator(it, "<", "<=", ">", ">="))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseShift(it, scope));
		}

		return exp;
	}

	#ParseShift(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseAddSubtract(it, scope);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "<<", ">>"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseAddSubtract(it, scope));
		}

		return exp;
	}

	#ParseAddSubtract(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseMulDivMod(it, scope);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "+", "-"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseMulDivMod(it, scope));
		}

		return exp;
	}

	#ParseMulDivMod(it, scope)
	{
		// Grab starting expression
		let exp = this.#ParseUnaryOrCast(it, scope);

		// Keep going while we have shift ops
		while (this.#AllowOperator(it, "*", "/", "%"))
		{
			exp = new ExpBinary(
				exp,
				it.PeekPrev(),
				this.#ParseUnaryOrCast(it, scope));
		}

		return exp;
	}

	#ParseUnaryOrCast(it, scope)
	{
		// Check for possible unary operators
		if (this.#AllowOperator(it, "+", "-", "!", "~", "++", "--"))
		{
			return new ExpUnary(
				it.PeekPrev(), // Token we just allowed
				this.#ParseUnaryOrCast(it, scope)); // Next parse, which could be another unary or operand or grouping
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
				this.#ParseUnaryOrCast(it, scope));
		}

		// Not a unary, so check next level
		return this.#ParsePostfixCallArrayOrMember(it, scope);
	}

	#ParsePostfixCallArrayOrMember(it, scope)
	{
		// Grab an operand first
		let exp = this.#ParseOperandFuncNameOrGrouping(it, scope);

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
						params.push(this.#ParseExpression(it, scope));
					}
					while (this.#Allow(it, TokenComma));
				}

				// Now require the right paren
				this.#Require(it, TokenParenRight);

				// Definitely have a function call, so figure out the type based on the name & params

				// Note: exp is either ExpFunctionName or ExpMember (in the case of texture functions)
				let funcNameExp = exp; // Assume we're a function name expression
				if (exp instanceof ExpMember) // But if not, we might be a member
					funcNameExp = exp.GetRightmostChild();

				// Verify final type to get name token
				let nameToken = null;
				if (funcNameExp instanceof ExpFunctionName) 
					nameToken = funcNameExp.NameToken;
				else
					throw new ParseError(it.PeekPrev(), "Error parsing function call"); // PROBLEM!

				// on the name (exp should be ExpFunctionName) and params
				let type = this.#GetFunctionReturnType(nameToken, params);
				//console.log("===== FUNCTION: " + nameToken.Text + " / " + type);

				// Finalize function call
				exp = new ExpFunctionCall(
					exp,
					type,
					params);

				// If this is a texture sample call, we need to created a combined version for GLSL
				this.#CheckForTextureSampleCall(exp);
			}
			else if (this.#Allow(it, TokenBracketLeft)) // Left bracket --> array access
			{
				// Index could be an entire expression
				exp = new ExpArray(
					exp, // Array itself
					this.#ParseExpression(it, scope)); // Index inside [ ]'s

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
					let dataType = this.#DataTypeFromMemberExpression(exp, it.PeekPrev());
					rightSide = new ExpVariable(it.PeekPrev(), dataType);
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
		// Must be a function
		if (!(exp instanceof ExpFunctionCall))
			return;
		
		// Left expression must be member expression
		// Left of member must be variable (the texture)
		// Right of member must be "variable" (the sample function name)
		if (!(exp.FuncExp instanceof ExpMember) ||
			!(exp.FuncExp.ExpLeft instanceof ExpVariable) ||
			!(exp.FuncExp.ExpRight instanceof ExpFunctionName))
			return;
		
		// Grab texture
		let texName = exp.FuncExp.ExpLeft.VarToken.Text;
		if (!this.#IsTexture(texName))
			return;
		
		// Grab function name
		// TODO: Determine proper number of params based on function name
		let funcName = exp.FuncExp.ExpRight.NameToken.Text;
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
		if (exp.Parameters.length <= 1) // TODO: Align with function name above
			throw new Error("Invalid number of parameters for texture sampling function");

		// First param must be variable
		if (!(exp.Parameters[0] instanceof ExpVariable))
			throw new Error("Sampler expected");

		// Get the sampler name
		let sampName = exp.Parameters[0].VarToken.Text;
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
		exp.IsTextureSample = true;
		exp.CombinedTextureAndSampler = combined;
	}

	#ParseOperandFuncNameOrGrouping(it, scope)
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

			// Get the variable if it exists (yes this could be optimized)
			let v = scope.GetVar(name);
			let t = this.#GetTexture(name);
			let s = this.#GetSampler(name);
			if (v != null)
			{
				dataType = v.DataTypeToken.Text;
			}
			else if (t != null)
			{
				dataType = t.Type; // Is a texture!
			}
			else if (s != null)
			{
				dataType = s.Type; // Is a sampler!
			}
			else
			{
				// Not a variable, texture or sampler
				throw new ParseError(it.PeekPrev(), "Undeclared identifier '" + it.PeekPrev().Text + "'");
			}

			return new ExpVariable(it.PeekPrev(), dataType);
		}

		// Check for grouping symbols
		if (this.#Allow(it, TokenParenLeft))
		{
			// Grab expression
			let exp = this.#ParseExpression(it, scope);
			
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
		scope.PushScope();

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
		this.Body.Validate(scope);
		this.Condition.Validate(scope);
		// TODO: Verify condition evaluates to a boolean
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
		// TODO: Allow any of these to be "empty"
		this.InitStatement.Validate(scope);
		this.ConditionExpression.Validate(scope); // Note: "Empty" equates to true!
		this.IterateExpression.Validate(scope);

		this.BodyStatement.Validate(scope);
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
		this.If.Validate(scope);
		if (this.Else != null)
		{
			this.Else.Validate(scope);
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
		this.SelectorExpression.Validate(scope); // TODO: Ensure this is a simple variable?
		for (let i = 0; i < this.Cases.length; i++)
		{
			this.Cases[i].Validate(scope, this.SelectorExpression);
		}

		// TODO: Need at least one case?
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
		this.Condition.Validate(scope);
		// TODO: Verify condition evaluates to a bool
		this.Body.Validate(scope);
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
			this.VarDecs[i].Validate(scope);

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

		this.DataType = expArrayVar.DataType;
		//console.log("Array data type: " + this.DataType);
	}

	Validate(scope)
	{
		ExpArrayVar.Validate(scope);
		ExpIndex.Validate(scope);
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
		this.DataType = varExp.DataType;
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
		switch (opToken.Text)
		{
			// Math
			//  - Scalar, per - component vector or per - component matrix
			//  - Result is equivalent scalar, vector or matrix of larger type
			//  - NOTE: (int + uint) --> int implicit casts to uint (basically wrapping around from max value)
			case "+": case "-": case "*": case "/": case "%":

				this.DataType = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);
				//console.log("Binary operator type: " + this.DataType);

				break;

			// Comparison 
			//  - Scalar, per-component vector or per-component matrix
			//  - Result is equivalent bool scalar, vector or matrix
			case "==": case "!=": case "<": case "<=": case ">": case ">=":

				let a = HLSLDataTypeConversion[expLeft.DataType];
				let b = HLSLDataTypeConversion[expRight.DataType];

				// Validate type and dimensions
				if (a.SVM != b.SVM ||
					a.Components != b.Components ||
					a.Rows != b.Rows ||
					a.Cols != b.Cols)
					throw new ParseError(opToken, "Invalid operands for comparison operator"); // TODO: Real error message

				if (a.SVM == "scalar") this.DataType = "bool";
				else if (a.SVM == "vector") this.DataType = "bool" + a.Components.toString();
				else if (a.SVM == "matrix") this.DataType = "bool" + a.Rows.toString() + "x" + a.Cols.toString();
				else
					throw new ParseError(opToken, "Invalid operands for comparison operator");

				//console.log("Comparison operator type: " + this.DataType);
				break;

			// Shift
			//  - Must be int, uint or bool (implicit cast to int)
			//  - Result is int or uint
			case "<<": case ">>":
				// TODO: Validate types

				this.DataType = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);;
				//console.log("Shift operator type: " + this.DataType);
				break;

		}
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

		let type = HLSL.GetImplicitCastType(expLeft.DataType, expRight.DataType);
		this.DataType = type;
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

		this.DataType = typeToken.Text;
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
	FuncExp;
	Parameters;

	IsTextureSample;
	CombinedTextureAndSampler;

	constructor(funcExp, dataType, params)
	{
		super();

		this.FuncExp = funcExp;
		this.Parameters = params;

		this.IsTextureSample = false;
		this.CombinedTextureAndSampler = null;

		this.DataType = dataType;
		//console.log("Function call type: " + dataType);
	}

	Validate(scope)
	{
		this.FuncExp.Validate(scope);
		for (let i = 0; i < this.Parameters.length; i++)
			this.Parameters[i].Validate(scope);

		// TODO: Verify the function exists (look for overloads, too)
		//    - This requires grabbing the function name, which should be the
		//      rightmost(?) child of the FuncExp, I think...
		//    - FuncExp could be obj.func, similar to Texture.Sample
		// TODO: Finalize data type (move from constructor)
	}

	ToString(lang)
	{
		// Is this GLSL AND its a texture sample function?
		if (lang == ShaderLanguageGLSL && this.IsTextureSample)
		{
			// Get the hlsl texture sample function
			let hlslTextureFunc = this.FuncExp.ExpRight.NameToken.Text;
			if (!HLSLTextureSampleConversion.hasOwnProperty(hlslTextureFunc))
				throw new Error("Sample function type not yet implemented!");

			// Grab the glsl equivalent to start the string
			// This replaces the 'texture.Sample(sampler, ' pattern
			let s = HLSLTextureSampleConversion[hlslTextureFunc] + "(" + this.CombinedTextureAndSampler.CombinedName + ", ";

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
		this.DataType = null; // Will be handled by the function call expression
	}

	Validate(scope)
	{
		// TOOD: Anything to do here?  Can't verify the function exists since we need the params, too!
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
		
		this.DataType = exp.DataType;
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

		this.DataType = HLSL.DataTypeFromLiteralToken(litToken);
		//console.log("Literal found: " + litToken.Text + "/" + this.DataType);
	}

	Validate(scope)
	{
		// TODO: Finalize data type (move from constructor)
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

		// Always bool
		this.DataType = "bool";
		//console.log("Logical found (always bool)!");
	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);
		this.ExpRight.Validate(scope);

		// TODO: Verify expressions are compatible
		// TODO: Finalize data type (move from constructor) - always bool!
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

		this.DataType = this.ExpRight.DataType;
		//console.log("Member Data Type: " + this.DataType);
	}

	Validate(scope)
	{
		this.ExpLeft.Validate(scope);
		this.ExpRight.Validate(scope);

		// TODO: Verify left and right expressions are compatible...
		//  - Just Texture.Sample pattern?
		// TODO: Finalize data type (move from constructor)
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
		let current = this.ExpRight;

		while (current instanceof ExpMember)
		{
			current = current.ExpRight;
		}

		return (current instanceof ExpVariable) || (current instanceof ExpArray);
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
		this.DataType = this.ExpLeft.DataType;
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

		let type = HLSL.GetImplicitCastType(expIf.DataType, expElse.DataType);
		this.DataType = type;
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
		this.DataType = expRight.DataType;
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

	constructor(varToken, dataType)
	{
		super();
		this.VarToken = varToken;

		this.DataType = dataType;
		//console.log("Variable Data Type: " + this.VarToken.Text + "/" + this.DataType);
	}

	Validate(scope)
	{
		// TODO: Verify that variable exists within scope!
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

class ScopeStack
{
	#stack;
	#functions;

	constructor()
	{
		this.#stack = [];
		this.#functions = [];
	}

	PushScope()
	{
		this.#stack.push([]);
	}

	PopScope()
	{
		this.#stack.pop();
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

	GetVar(varName)
	{
		// Work through the scope, inner to outer, looking for this variable
		for (let s = this.#stack.length - 1; s >= 0; s--)
			for (let v = 0; v < this.#stack[s].length; v++)
				if (this.#stack[s][v].NameToken.Text == varName)
					return this.#stack[s][v];

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
		// Check all vars in the given scope
		for (let v = 0; v < scope.length; v++)
			if (scope[v].NameToken.Text == varName)
				return true;

		return false;
	}

	AddFunction(f)
	{
		this.#functions.push(f);
	}

	DoesFunctionExist(expFuncCall)
	{
		// TODO: Determine if the function expression matches an existing function
	}
}