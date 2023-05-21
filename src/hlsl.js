
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


class HLSL2GLSL
{
	// Initial data
	#hlsl;

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
			Pattern: /^[+-]?([0-9]*[.])?[0-9]+[f]?/
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

	// Note: missing a few permutations (especially matrices)
	DataTypes = [
		"bool", "bool2", "bool3", "bool4",
		"int", "int2", "int3", "int4",
		"uint", "uint2", "uint3", "uint4",
		"dword", "dword2", "dword3", "dword4",
		"half", "half2", "half3", "half4",
		"float", "float2", "float3", "float4",
		"double", "double2", "double3", "double4",

		"float3x3", "float3x4", "float4x3", "float4x4",
		"matrix"
	];

	InterpolationModifiers = [
		"linear",
		"centroid",
		"nointerpolation",
		"noperspective",
		"sample"
	];

	constructor(hlslCode)
	{
		this.#hlsl = hlslCode.repeat(1); // Copy
		this.#tokens = [];

		// Tokenize
		this.#Tokenize();
		this.#Parse();
	}

	GetTokens()
	{
		return this.#tokens;
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
		var code = this.#hlsl.repeat(1); // Copy
		var lineNum = 1;

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
					this.#structs.push(this.#GetStruct(it));
					break;

				case "cbuffer":
					this.#cbuffers.push(this.#GetCBuffer(it));
					break;

				case "SamplerState":
				case "SamplerComparisonState":
					this.#samplers.push(this.#GetSampler(it));
					break;

				case "Texture1D": case "Texture1DArray":
				case "Texture2D": case "Texture2DArray":
				case "TextureCube": case "TextureCubeArray":
				case "Texture3D":
					this.#textures.push(this.#GetTexture(it));
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
		// TODO: Fill in implicit register indices!!!

		console.log(this);
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


	#GetVariable(it, interpModAllowed, semanticAllowed)
	{
		var variable = {
			InterpMod: null,
			DataType: null,
			Identifier: null,
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
		variable.Identifier = it.PeekPrev().Text;

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


	#GetStruct(it)
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
			var v = this.#GetVariable(it, true, true);
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

	#GetRegisterIndex(it, registerLabel) // "b", "s" or "t"
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


	#GetCBuffer(it)
	{
		// Make the cbuffer - assume consecutive registers unless otherwise noted
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
		cb.RegisterIndex = this.#GetRegisterIndex(it, "b");
		if (cb.RegisterIndex >= 0)
			cb.ExplicitRegister = true;

		// Should be scope at this point
		this.#Require(it, TokenScopeLeft);

		// Process any variables
		do
		{
			var v = this.#GetVariable(it, false, false);
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

	#GetTexture(it)
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
		t.RegisterIndex = this.#GetRegisterIndex(it, "t");
		if (t.RegisterIndex >= 0)
			t.ExplicitRegister = true;

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return t;
	}

	#GetSampler(it)
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
		s.RegisterIndex = this.#GetRegisterIndex(it, "s");
		if (s.RegisterIndex >= 0)
			s.ExplicitRegister = true;

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return s;
	}

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
				var v = this.#GetVariable(it, true, true);
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
				Identifier: name,
				Semantic: null
			};
			globalCB.Variables.push(v); // Note: main loop will do MoveNext
		}
	}

	ConvertToGLSL(shaderType)
	{
		var glsl = "";

		// Converting hlsl to glsl
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

		return glsl;
	}
}