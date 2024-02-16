
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

	//#DoesIdentifierExistInScope(ident, scopeStack)
	//{
	//	// Go through stack
	//	for (let i = 0; i < scopeStack.length; i++)
	//	{
	//		// Check this scope's variables
	//		let currScope = scopeStack[i];
	//		for (let v = 0; v < currScope.Vars.length; v++)
	//		{
	//			// Found it?
	//			if (ident == currScope.Vars[v].Name)
	//				return true;
	//		}
	//	}

	//	// Nothing!
	//	return false;
	//}

	//#ProcessVarDecIdentifier(token, varDecType, scopeStack)
	//{
	//	// Is it really an identifier?
	//	if (token.Type != TokenIdentifier)
	//	{
	//		// ERROR!
	//		// TODO: Throw
	//		console.log("ERROR - Expected identifier for variable declaration.  Found: " + token.Text);
	//		return false;
	//	}

	//	if (this.#DoesIdentifierExistInScope(token.Text, scopeStack))
	//	{
	//		// ERROR!
	//		// TODO: Throw
	//		console.log("ERROR - Identifier redeclaration: " + token.Text);
	//		return false;
	//	}

	//	// Identifier is valid, add to scope stack
	//	scopeStack[scopeStack.length - 1].Vars.push({
	//		Name: token.Text,
	//		DataType: varDecType
	//	});
	//	return true;
	//}

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

			// TESTING: Attempt a parse
			//let statements = this.#ParseFunctionBody(it);
			//console.log(statements);
			//for (let i = 0; i < statements.length; i++)
			//	console.log(statements[i].ToHLSL());
			//throw new Error("STOPPING NOW");

			do
			{
				this.#CheckAndParseTextureObjectFunction(it, f, funcStartPos);

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
		if (this.#IsDataType(it.Current().Text) || this.#AllowIdentifier(it, "const")) return this.#ParseVarDec(it);
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
		let init = null; // Statement
		let cond = null; // Expression
		let iter = null; // Expression
		let body = null; // Statement

		// Assuming "for" already found
		this.#Require(it, TokenParenLeft);

		// TODO: Handle the comma operator!

		// Init could be a var declaration, or just assignment
		if (this.#IsDataType(it.Current().Text))
		{
			init = this.#ParseVarDec(it);
		}
		else
		{
			init = this.#ParseExpressionStatement(it);
		}

		// Semicolon to end init
		this.#Require(it, TokenSemicolon);

		// Move on to condition, if necessary
		if (it.Current().Type != TokenSemicolon)
		{
			cond = this.#ParseExpression(it);
		}

		// Semicolon to end cond
		this.#Require(it, TokenSemicolon);

		// Move on to iteration, if necessary
		if (it.Current().Type != TokenParenRight)
		{
			iter = this.#ParseExpression(it);
		}

		// Require end paren
		this.#Require(it, TokenParenRight);

		// Parse the body
		body = this.#ParseStatement(it);

		// All done
		return new StatementFor(init, cond, iter, body);
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
					throw new Error("More than one 'default' found in switch statement");

				defaultFound = true;
			}
			else // If it's not case and it's not default
			{
				throw new Error("Invalid token in switch statement: " + it.Current().Text);
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

	#ParseVarDec(it)
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
			throw new Error("Variable name expected");

		// Semicolon at end
		console.log(it.Current().Text);
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
				throw new Error("Expected variable for assignment.");
			}

			// Previous token is a variable, so parse the assignment
			return new ExpAssignment(
				exp, // Need whole expression since it might be a member, like: pos.x = 5;
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

		// Check for cast, which starts with '(' followed by a data type
		if (it.Current().Type == TokenParenLeft &&
			this.#IsDataType(it.PeekNext().Text))
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
				if (it.Current().Type != TokenIdentifier)
					throw new Error("Invalid token after member access operator '.': " + it.Current().Text);

				exp = new ExpMember(
					exp, // Left side of "."
					this.#ParsePostfixCallArrayOrMember(it)); // right side of "."
			}
			else // Nothing useful left
			{
				break;
			}
		}

		return exp;
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
		throw new Error("Invalid token detected");
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

class Statement { }

class StatementBlock extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
	}

	ToHLSL()
	{
		let s = "{\n";

		for (let i = 0; i < this.Statements.length; i++)
			s += this.Statements.ToHLSL() + "\n";

		s += "}";
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
}

class StatementDefault extends Statement
{
	Statements;

	constructor(statements)
	{
		super();
		this.Statements = statements;
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
}

class StatementExpression extends Statement
{
	Exp;

	constructor(exp)
	{
		super();
		this.Exp = exp;
	}

	ToHLSL()
	{
		return this.Exp.ToHLSL() + ";";
	}
}

class StatementFor extends Statement
{
	Init;
	Condition;
	Iterate;
	Body;

	constructor(init, cond, iter, body)
	{
		super();
		this.Init = init;
		this.Condition = cond;
		this.Iterate = iter;
		this.Body = body;
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
}

class StatementJump extends Statement
{
	JumpToken;

	constructor(jumpToken)
	{
		super();
		this.JumpToken = jumpToken;
	}

	ToHLSL()
	{
		return this.JumpToken.Text + ";";
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

	ToHLSL()
	{
		return "return " + this.Expression.ToHLSL() + ";";
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

	ToHLSL()
	{
		let s = "";

		if (this.IsConst) s += "const ";

		s += this.DataTypeToken.Text + " ";

		for (let v = 0; v < this.VarDecs.length; v++)
		{
			if (v > 0) s += ", ";
			s += this.VarDecs[v].ToHLSL();
		}

		s += ";";
		return s;
	}
}

class VarDec extends Statement
{
	IsConst;
	DataTypeToken;
	NameToken;
	ArrayExpression;
	DefinitionExpression;

	constructor(isConst, dataTypeToken, nameToken, arrayExp, defExp)
	{
		super();
		this.IsConst = isConst;
		this.DataTypeToken = dataTypeToken;
		this.NameToken = nameToken;
		this.ArrayExpression = arrayExp;
		this.DefinitionExpression = defExp;
	}

	ToHLSL()
	{
		// Note: Const AND data type will be added at the StatementVar level!
		let s = this.NameToken.Text;

		if (this.ArrayExpression != null)
			s += "[" + this.ArrayExpression.ToHLSL() + "]";

		if (this.DefinitionExpression != null)
			s += " = " + this.DefinitionExpression.ToHLSL();

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

	ToHLSL()
	{
		return this.ExpArray.ToHLSL() + "[" + this.ExpIndex.ToHLSL() + "]";
	}
}

class ExpAssignment extends Expression
{
	VarExp;
	AssignExp;

	constructor(varExp, assignExp)
	{
		super();
		this.VarExp = varExp;
		this.AssignExp = assignExp;
	}

	ToHLSL()
	{
		return this.VarExp.ToHLSL() + " = " + this.AssignExp.ToHLSL();
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

	ToHLSL()
	{
		return this.ExpLeft.ToHLSL() + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToHLSL();
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

	ToHLSL()
	{
		return this.ExpLeft.ToHLSL() + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToHLSL();
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

	ToHLSL()
	{
		return "(" + this.TypeToken.Text + ")" + this.Exp.ToHLSL();
	}
}

class ExpFunctionCall extends Expression
{
	FuncExp;
	Parameters;

	constructor(funcExp, params)
	{
		super();
		this.FuncExp = funcExp;
		this.Parameters = params;
	}

	ToHLSL()
	{
		let s = this.FuncExp.ToHLSL() + "(";

		for (let p = 0; p < this.Parameters.length; p++)
		{
			if (p > 0)
				s += ", ";

			s += this.Parameters[p].ToHLSL();
		}

		s += ")";
		return s;
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

	ToHLSL()
	{
		return "(" + this.Exp.ToHLSL() + ")";
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

	ToHLSL()
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

	ToHLSL()
	{
		return this.ExpLeft.ToHLSL() + " " +
			this.OperatorToken.Text + " " +
			this.ExpRight.ToHLSL();
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

	ToHLSL()
	{
		return this.ExpLeft.ToHLSL() + "." + this.ExpRight.ToHLSL();
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

	ToHLSL()
	{
		return ExpLeft.ToHLSL() + this.OperatorToken.Text;
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

	ToHLSL()
	{
		return this.ExpCondition.ToHLSL() + " ? " +
			this.ExpIf.ToHLSL() + " : " +
			this.ExpElse.ToHLSL();
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

	ToHLSL()
	{
		return this.OperatorToken.Text + ExpRight.ToHLSL();
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

	ToHLSL()
	{
		return this.VarToken.Text;
	}
}