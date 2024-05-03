
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


// TODO: missing a few matrix permutations (1xN, Nx1) and matrices of non-floats
const HLSLDataTypeConversion = {
	"void": "void",

	"bool": "bool",
	"bool1": "bool",
	"bool2": "bvec2",
	"bool3": "bvec3",
	"bool4": "bvec4",

	"int": "int",
	"int1": "int",
	"int2": "ivec2",
	"int3": "ivec3",
	"int4": "ivec4",

	"uint": "uint",
	"uint1": "uint",
	"uint2": "uvec2",
	"uint3": "uvec3",
	"uint4": "uvec4",

	"dword": "uint",
	"dword1": "uint",
	"dword2": "uvec2",
	"dword3": "uvec3",
	"dword4": "uvec4",

	"half": "float",
	"half1": "float",
	"half2": "vec2",
	"half3": "vec3",
	"half4": "vec4",

	"float": "float",
	"float1": "float",
	"float2": "vec2",
	"float3": "vec3",
	"float4": "vec4",

	"double": "float",
	"double1": "float",
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

const HLSLTextureSampleConversion = {
	"Sample": "texture",
	"SampleLevel": "textureLod"
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
			return HLSLDataTypeConversion[identifier];
		else if (HLSLReservedWordConversion.hasOwnProperty(identifier))
			return HLSLReservedWordConversion[identifier];
		else
			return identifier;
	}

	static DataTypeFromLiteralToken(token)
	{
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
					let globalConst = this.#ParseVarDecStatement(it);
					this.#globalConstants.push(globalConst);
					scope.AddVarStatement(globalConst);
					break;

				// Skip extra end statements
				case ";":
					it.MoveNext();
					break;

				case "struct":
					this.#structs.push(this.#ParseStruct(it));
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
					throw new ParseError(it.Line, "Not currently handling multisampled textures");

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

	#IsReservedWord(text)
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

			let v = this.#ParseMemberVariableOrFunctionParam(it, false, false, false, false);
			vars.push(v);
			scope.AddVar(v); // TODO: How to handle these objects vs. vardecs?  Just store names?
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
		let dataType = null;
		let dataTypeToken = null;
		let name = null;
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
		dataType = it.PeekPrev().Text;

		// Identifier
		this.#Require(it, TokenIdentifier);
		nameToken = it.PeekPrev();
		name = it.PeekPrev().Text;

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

		//return new ShaderElementMemberVar(
		//	dataType,
		//	name,
		//	inputMods.length == 1 ? inputMods[0] : null,
		//	interpMods,
		//	arrayExp,
		//	semantic,
		//	initExp);
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

				params.push(this.#ParseMemberVariableOrFunctionParam(it, true, true, true, true));
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
			// Should be end of a variable, so add to the global cbuffer
			//globalCB.Members.push(new ShaderElementMemberVar(type, name)); // Note: main loop will do MoveNext
			globalCB.Members.push(new VarDec(false, typeToken, nameToken, null, null));

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
			varDecs.push(new VarDec(isConst, dataTypeToken, varNameToken, arrayExp, def));
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
			let expIsVar = exp instanceof ExpVariable;

			// Not a variable, but maybe part of a member access pattern: obj.member
			if (!expIsVar && exp instanceof ExpMember)
			{
				expIsVar = exp.RightmostChildIsVariable();
			}

			// Validate variable
			if (!expIsVar)
			{
				throw new ParseError(it.PeekPrev(), "Expected variable for assignment.");
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
		let exp = this.#ParseOperandOrGrouping(it);

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

				// Now require the right paren and finish function expression
				this.#Require(it, TokenParenRight);
				exp = new ExpFunctionCall(
					exp,
					params);

				// If this is a texture sample call, we need to created a combined version for GLSL
				this.#CheckForTextureSampleCall(exp);
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

				exp = new ExpMember(
					exp, // Left side of "."
					new ExpVariable(it.PeekPrev())); // Right side of "."
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
			!(exp.FuncExp.ExpRight instanceof ExpVariable))
			return;
		
		// Grab texture
		let texName = exp.FuncExp.ExpLeft.VarToken.Text;
		if (!this.#IsTexture(texName))
			return;
		
		// Grab function name
		// TODO: Determine proper number of params based on function name
		let funcName = exp.FuncExp.ExpRight.VarToken.Text;
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
		console.log(glsl);
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

// TODO: What is the type for "variables" here?  Standard statements?
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

// Function param modifiers
//  - in
//  - inout
//  - out
//  - uniform
//
// Semantics: (float4 x : SV_POSITION)
//
// Initializers: (int x = 5)
//
// Interpolation modifiers: Func(float4 x : linear) OR struct Z { linear float2 x; }
//  - linear
//  - centroid
//  - nointerpolation (only option for int/uint)
//  - noperspective
//  - sample
//class ShaderElementMemberVar
//{
//	DataType;
//	Name;

//	InputModifier;
//	InterpModifiers;
//	ArrayExpression;
//	Semantic;
//	InitializerExp;

//	constructor(
//		dataType,
//		name,
//		inputMod = null,
//		interpMods = [],
//		arrayExp = null,
//		semantic = null,
//		initExp = null,
//		)
//	{
//		this.DataType = dataType;
//		this.Name = name;
//		this.InputModifier = inputMod;
//		this.InterpModifiers = interpMods;
//		this.ArrayExpression = arrayExp;
//		this.Semantic = semantic;
//		this.InitializerExp = initExp;
//	}

//	ToString(lang, indent = "")
//	{
//		let s = indent;

//		switch (lang)
//		{
//			default:
//			case ShaderLanguageHLSL:

//				for (let i = 0; i < this.InterpModifiers.length; i++)
//					s += this.InterpModifiers[i] + " ";

//				if (this.InputModifier != null)
//					s += this.InputModifier + " ";

//				s += this.DataType + " ";
//				s += this.Name;

//				if (this.ArrayExpression != null)
//					s += " [" + this.ArrayExpression.ToString(lang) + "]";

//				if (this.Semantic != null)
//					s += " : " + this.Semantic;

//				if (this.InitializerExp != null)
//					s += " " + this.InitializerExp.ToString(lang);

//				break;

//			case ShaderLanguageGLSL: // No semantics (or interpolation modifiers?) 

//				if (this.InputModifier != null)
//					s += this.InputModifier + " ";

//				s += HLSL.TranslateToGLSL(this.DataType) + " ";
//				s += HLSL.TranslateToGLSL(this.Name);

//				if (this.ArrayExpression != null)
//					s += " [" + this.ArrayExpression.ToString(lang) + "]";

//				if (this.InitializerExp != null)
//					s += " " + this.InitializerExp.ToString(lang);
				
//				break;
//		}

//		return s;

//	}
//}


class Statement { }

class StatementBlock extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
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

	ToString(lang, indent = "")
	{
		let s = indent + "case " + this.CaseValueExpression.ToString(lang) + ":\n";

		for (let i = 0; i < this.Statements.length; i++)
			s += this.Statements[i].ToString(lang, indent + "\t") + "\n";

		return s;
	}
}

class StatementDefault extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
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

	ToString(lang, indent = "")
	{
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


class Expression { }

class ExpArray extends Expression
{
	ExpArray;
	ExpIndex;

	constructor(expArray, expIndex)
	{
		super();
		this.ExpArray = expArray;
		this.ExpIndex = expIndex;
	}

	ToString(lang)
	{
		return this.ExpArray.ToString(lang) + "[" + this.ExpIndex.ToString(lang) + "]";
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

	constructor(funcExp, params)
	{
		super();

		this.FuncExp = funcExp;
		this.Parameters = params;

		this.IsTextureSample = false;
		this.CombinedTextureAndSampler = null;
	}

	ToString(lang)
	{
		// Is this GLSL AND its a texture sample function?
		if (lang == ShaderLanguageGLSL && this.IsTextureSample)
		{
			// Get the hlsl texture sample function
			let hlslTextureFunc = this.FuncExp.ExpRight.VarToken.Text;
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
				this.FuncExp instanceof ExpVariable)
			{
				let text = this.FuncExp.VarToken.Text;
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

class ExpGroup extends Expression
{
	Exp;

	constructor(exp)
	{
		super();
		this.Exp = exp;
	}

	ToString(lang)
	{
		return "(" + this.Exp.ToString(lang) + ")";
	}
}

class ExpLiteral extends Expression
{
	DataType;
	LiteralToken;

	constructor(litToken)
	{
		super();
		this.LiteralToken = litToken;
		this.DataType = HLSL.DataTypeFromLiteralToken(litToken);
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

	RightmostChildIsVariable()
	{
		let current = this.ExpRight;

		while (current instanceof ExpMember)
		{
			current = current.ExpRight;
		}

		return (current instanceof ExpVariable);
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

class ScopeStack
{
	#stack;
	#dict;

	constructor()
	{
		this.#stack = [];
		this.#dict = {};
	}

	PushScope()
	{
		this.#stack.push([]);
	}

	PopScope()
	{
		let toRemove = this.#stack.pop();

		// Remove all variables from the dictionary, too
		for (let i = 0; i < toRemove.length; i++)
		{
			delete this.#dict[toRemove[i].NameToken.Text];
		}
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
		if (this.#dict.hasOwnProperty(name))
			throw new ParseError(v.NameToken, "Redefinition of '" + name + "'");

		// Add the variable to the stack and the dictionary
		this.#stack[this.#stack.length - 1].push(v);
		this.#dict[name] = v;
	}

	IsVarInScope(varName)
	{
		return this.#dict.hasOwnProperty(varName);
	}

}