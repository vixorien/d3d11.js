
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


	#ParseVariable(it, interpModAllowed, semanticAllowed)
	{
		let variable = {
			InterpMod: null,
			DataType: null,
			ArraySize: null,
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
			let v = this.#ParseVariable(it, true, true);
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
			let v = this.#ParseVariable(it, false, false);
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
				let v = this.#ParseVariable(it, true, true);
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
		glsl += "int saturate(int x) { return clamp(x, 0, 1); }\n";

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

			// Is a space necessary?  Yes for 2 idents in a row
			if (t.Type == TokenIdentifier && it.PeekNext().Type == TokenIdentifier)
				funcStr += " ";

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

		// We definitely have the proper pattern, skip these tokens
		it.MoveNext();
		it.MoveNext();
		
		// Give back the replacement
		return replace + "(";
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