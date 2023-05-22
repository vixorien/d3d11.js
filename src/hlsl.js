
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

const PrefixAttribute = "_attrib_";
const PrefixVarying = "_vary_";
const PrefixVSInput = "_vs_input_";
const PrefixVSOutput = "_vs_output_";

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
		"input",
		"output"
	];

	ReservedWordConversion = {
		"input": "_input",
		"output": "_output"
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
		// Reset
		this.#tokens = [];
		var lineNum = 1;

		// Make a copy of the code as we'll be substringing it
		var code = this.#hlsl.repeat(1); // Copy

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

	#IsReservedWord(text)
	{
		return this.ReservedWords.indexOf(text) >= 0;
	}


	#ParseVariable(it, interpModAllowed, semanticAllowed)
	{
		var variable = {
			InterpMod: null,
			DataType: null,
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

		return variable;
	}


	#ParseStruct(it)
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
			var v = this.#ParseVariable(it, true, true);
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


	#ParseCBuffer(it)
	{
		// Make the cbuffer
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
		cb.RegisterIndex = this.#ParseRegisterIndex(it, "b");
		if (cb.RegisterIndex >= 0)
			cb.ExplicitRegister = true;

		// Should be scope at this point
		this.#Require(it, TokenScopeLeft);

		// Process any variables
		do
		{
			var v = this.#ParseVariable(it, false, false);
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
		t.RegisterIndex = this.#ParseRegisterIndex(it, "t");
		if (t.RegisterIndex >= 0)
			t.ExplicitRegister = true;

		// Semicolon to end
		this.#Require(it, TokenSemicolon);
		return t;
	}

	#ParseSampler(it)
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
		s.RegisterIndex = this.#ParseRegisterIndex(it, "s");
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
				var v = this.#ParseVariable(it, true, true);
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
				Name: name,
				Semantic: null
			};
			globalCB.Variables.push(v); // Note: main loop will do MoveNext
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
		for (var s = 0; s < this.#structs.length; s++)
			if (this.#structs[s].Name == name)
				return this.#structs[s];

		return null;
	}

	#Translate(identifier)
	{
		if (this.#IsDataType(identifier) && !this.#DataTypeIsStruct(identifier))
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
			var stripSize = 1;
			if (token.Text.charAt(token.Text.length - 2) == ".")
				stripSize = 2;

			return token.Text.substring(0, token.Text.length - stripSize);
		}
		else
		{
			return this.#Translate(token.Text);
		}
	}

	#ConvertVertexShader()
	{
		var glsl = "";
		var vsInputs = this.#GetVSInputs();

		// Append each type of shader element
		glsl += this.#GetAttributesString(vsInputs);
		glsl += this.#GetVSVaryings();
		glsl += this.#GetStructsString();
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
		var vsInputs = [];
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];

			// If this is a data type, we have to scan the whole thing
			if (this.#DataTypeIsStruct(param.DataType))
			{
				var struct = this.#GetStructByName(param.DataType);
				if (struct == null)
					throw new Error("Invalid data type in vertex shader input");

				// Add each struct member to the VS input
				for (var v = 0; v < struct.Variables.length; v++)
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
		var attribs = "";

		for (var i = 0; i < vsInputs.length; i++)
		{
			attribs +=
				"attribute " +
				this.#Translate(vsInputs[i].DataType) + " " +
				PrefixAttribute + vsInputs[i].Name + ";\n";
		}

		attribs += "\n";

		return attribs;
	}

	#GetVSVaryings()
	{
		// Does main actually return a struct?
		if (!this.#DataTypeIsStruct(this.#main.ReturnType))
			return "";

		// Grab the struct and put together varyings
		var struct = this.#GetStructByName(this.#main.ReturnType);
		var vary = "";

		for (var v = 0; v < struct.Variables.length; v++)
		{
			var member = struct.Variables[v];

			// Skip SV_POSITION
			if (member.Semantic != null &&
				member.Semantic.toUpperCase() == "SV_POSITION")
				continue;

			vary += "varying " + this.#Translate(member.DataType);	// Data type
			vary += " " + PrefixVarying + member.Name + ";\n";		// Identifier
		}

		vary += "\n";
		return vary;
	}

	#GetStructsString()
	{
		var str = "";

		for (var s = 0; s < this.#structs.length; s++)
		{
			// Start the struct
			var struct = this.#structs[s];
			str += "struct " + struct.Name + "\n";
			str += "{\n";

			// Handle each variable (no semantics)
			for (var v = 0; v < struct.Variables.length; v++)
			{
				var variable = struct.Variables[v];
				str += "\t" + this.#Translate(variable.DataType); // Datatype
				str += " " + this.#Translate(variable.Name) + ";\n"; // Identifier
			}

			// End the struct
			str += "};\n\n";
		}

		return str;
	}

	
	#GetFunctionString(func, prependName = "")
	{
		var newFuncName = prependName + func.Name;
		var funcStr = "";

		// Start the function
		funcStr += this.#Translate(func.ReturnType); // Data type
		funcStr += " " + this.#Translate(newFuncName) + "("; // Identifier

		// Parameters
		for (var p = 0; p < func.Parameters.length; p++)
		{
			var param = func.Parameters[p];
			funcStr += this.#Translate(param.DataType); // Data type
			funcStr += " " + this.#Translate(param.Name); // Identifier

			if (p < func.Parameters.length - 1)
				funcStr += ", ";
		}

		// End header
		funcStr += ")";

		// Body (including scope!)
		var it = new TokenIterator(func.BodyTokens);
		var indent = 0;
		var parenDepth = 0;
		while (it.MoveNext())
		{
			var t = it.Current();

			// Track parens (due to for loops)
			switch (t.Type)
			{
				case TokenParenLeft: parenDepth++; break;
				case TokenParenRight: parenDepth--; break;
			}

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

			// Add the token
			funcStr += this.#TranslateToken(t);

			// Is a space necessary?  Yes for 2 idents in a row
			if (t.Type == TokenIdentifier && it.PeekNext().Type == TokenIdentifier)
				funcStr += " ";

			// New line?
			if ((t.Type == TokenSemicolon && parenDepth == 0) ||	// End of line, but not for loops
				t.Type == TokenScopeLeft ||
				t.Type == TokenScopeRight)
				funcStr += "\n";
		}

		// End body
		funcStr += "\n";
		return funcStr;
	}

	#GetHelperFunctionsString()
	{
		var functions = "";
		for (var f = 0; f < this.#functions.length; f++)
			functions += this.#GetFunctionString(this.#functions[f]);
		return functions;
	}

	// TODO: Need to handle VS taking in an entire struct!
	#BuildVertexShaderMain(vsInputs)
	{
		var main = "void main()\n";
		main += "{\n";

		// Create a variable for each vs input
		for (var v = 0; v < vsInputs.length; v++)
		{
			main += "\t" + this.#Translate(vsInputs[v].DataType) + " " + vsInputs[v].Name + " = ";
			main += PrefixAttribute + vsInputs[v].Name + ";\n";
		}

		// Are any of the actual function inputs structs?
		for (var p = 0; p < this.#main.Parameters.length; p++)
		{
			var param = this.#main.Parameters[p];
			if (this.#DataTypeIsStruct(param.DataType))
			{
				// Yes, so build a struct object and "hook up" vsInputs
				var newParamName = this.#Translate(param.Name);
				main += "\n\t" + param.DataType;
				main += " " + newParamName + ";\n";

				// Handle each struct member
				var struct = this.#GetStructByName(param.DataType);
				for (var v = 0; v < struct.Variables.length; v++)
				{
					var member = struct.Variables[v];
					main += "\t" + newParamName + "." + this.#Translate(member.Name) + " = ";

					// NOTE: Assumption here is that the struct member name is identical to the
					//       vsInput identifier used throughout the rest of the function
					main += this.#Translate(member.Name) + ";\n";
				}
			}
		}

		// Call the function and capture the return value
		main += "\n\t" + this.#main.ReturnType + " " + PrefixVSOutput + " = hlsl_main(";
		for (var p = 0; p < this.#main.Parameters.length; p++)
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
			var posName = null;
			var struct = this.#GetStructByName(this.#main.ReturnType);
			for (var v = 0; v < struct.Variables.length; v++)
			{
				var member = struct.Variables[v];

				// Is this our SV_Position?
				if (member.Semantic != null &&
					member.Semantic.toUpperCase() == "SV_POSITION")
				{
					// Remember for later
					posName = member.Name;
				}
				else
				{
					// This is other VS->PS data
					main += "\t" + PrefixVarying + member.Name + " = " + PrefixVSOutput + "." + member.Name + ";\n";
				}
			}

			main += "\tgl_Position = " + PrefixVSOutput + "." + posName + ";\n";
		}

		main += "}\n";
		return main;
	}


	#ConvertPixelShader()
	{

	}
}