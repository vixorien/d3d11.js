
// -----------------------------------------------------
// ---------------------- Device -----------------------
// -----------------------------------------------------

class ID3D11Device extends IUnknown
{
	#gl;
	#immediateContext;

	constructor(gl)
	{
		super();

		this.#gl = gl;
		this.#immediateContext = null;
	}

	GetAdapter()
	{
		return this.#gl;
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
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Create the gl buffer and final D3D buffer
		let glBuffer = this.#gl.createBuffer();
		let d3dBuffer = new ID3D11Buffer(this, bufferDesc, glBuffer);

		// Determine usage flag
		// TODO: Analyze CPUAccessFlag to further refine these options
		// See "usage" at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
		let usage = this.#gl.STATIC_DRAW;
		switch (bufferDesc.Usage)
		{
			case D3D11_USAGE_IMMUTABLE: usage = this.#gl.STATIC_DRAW; break;
			case D3D11_USAGE_DYNAMIC: usage = this.#gl.DYNAMIC_DRAW; break;
			case D3D11_USAGE_STAGING: usage = this.#gl.DYNAMIC_COPY; break; // ???
			case D3D11_USAGE_DEFAULT:
			default:
				usage = this.#gl.STATIC_DRAW; // ???
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
			this.#gl.bufferData(bufferType, bufferDesc.ByteWidth, usage);
		else
			this.#gl.bufferData(bufferType, initialData, usage); // TODO: Verify size vs. description?

		// Restore previous buffer and return new one
		this.#gl.bindBuffer(bufferType, prevBuffer);
		return d3dBuffer;
	}

	// TODO: Determine if we should do ALL verification at this level
	//       and let the view constructor just be super simple.  Ideally,
	//       no one else is creating views, though we may want to formalize
	//       that somehow?  (anonymous classes?)
	CreateDepthStencilView(resource, desc)
	{
		// Have to have a valid resource
		if (resource == null)
			throw new Error("Must provide a non-null resource to create a depth stencil view");

		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Null descriptions are valid here!  Create a default one
		if (desc == null)
		{
			let resDesc = resource.GetDesc();
			let viewDim;

			// Determine the view dimension by analyzing the resource
			// TODO: Texture 1D
			if (resource instanceof ID3D11Texture1D)
			{
				viewDim = D3D11_DSV_DIMENSION_TEXTURE1D;
			}
			else if (resource instanceof ID3D11Texture2D)
			{
				viewDim = D3D11_DSV_DIMENSION_TEXTURE2D;
			}
			else
			{
				// Invalid resource type
				throw new Error("Invalid resource for depth stencil view creation");
			}

			// Basic, 0-mip, first-array-slice description
			desc = new D3D11_DEPTH_STENCIL_VIEW_DESC(
				resDesc.Format,
				viewDim,
				0,
				0);
		}

		// Create the view (which will verify the description elements like bind flag)
		return new ID3D11DepthStencilView(this, resource, desc);
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

	// TODO: Decide if we want to handle description verification here instead
	CreateSamplerState(samplerDesc)
	{
		// Description is not optional
		if (samplerDesc == null)
			throw new Error("Sampler description cannot be null");

		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Object will verify the description
		return new ID3D11SamplerState(this, samplerDesc);
	}


	// TODO: Validate full description
	// NOTE: Immutable textures are possible:
	//  - https://registry.khronos.org/OpenGL/specs/es/3.0/es_spec_3.0.pdf#nameddest=subsection.3.8.4
	//  - Using texStorage2D() makes the resource immutable
	//  - Immutable here means it cannot be resized or mip levels be changed
	//  - Its DATA can still change!
	CreateTexture2D(desc, initialData)
	{
		// May have changed GL state!
		if (this.#immediateContext != null)
			this.#immediateContext.DirtyPipeline();

		// Create the gl texture and final D3D texture object
		let glTexture = this.#gl.createTexture();
		let d3dTexture = new ID3D11Texture2D(this, desc, glTexture);

		// TODO: Determine usage and how this will affect the texture (if at all)
		// - Seems like webgl just uses texImage2D() to basically "rebuild" the texture?
		// - Note: Look into "pixel buffer objects" and "pixel unpack buffers" for staging resources!
		// Skipping usage for now (see above)

		// TODO: Check description for texture array or cube, as they have different constants
		if (desc.ArraySize < 1) throw new Error("Invalid array size specified");
		if (desc.ArraySize > 1) throw new Error("Texture arrays not implemented yet!");
		if (desc.MiscFlags == D3D11_RESOURCE_MISC_TEXTURECUBE) throw new Error("Texture cubes not implemented yet!");

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

		// Store the previous texture
		//TODO: Handle different types of textures (array, cube)
		let prevTexture = this.#gl.getParameter(this.#gl.TEXTURE_BINDING_2D);

		// Set new texture
		// TODO: Handle types
		this.#gl.bindTexture(this.#gl.TEXTURE_2D, glTexture);

		// Any initial data?
		if (initialData == null)
		{
			// Use texStorage2D() to initialize the entire
			// texture and all subresources at once
			// See here for details on formats/types/etc: https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexStorage2D.xhtml
			// Note: Doesn't seem to work for texture arrays!
			this.#gl.texStorage2D(
				this.#gl.TEXTURE_2D,
				desc.MipLevels,
				internalFormat,
				desc.Width,
				desc.Height);
		}
		else
		{
			// Use texImage2D() to set initial data
			// TODO: Handle multiple mips/array elements/etc?
			this.#gl.texImage2D(
				this.#gl.TEXTURE_2D,
				0, // TODO: Handle specific mip levels?
				internalFormat,
				desc.Width,
				desc.Height,
				0,
				format,
				type,
				initialData);
		}

		//TODO: Handle different types of textures (array, cube)
		this.#gl.bindTexture(this.#gl.TEXTURE_2D, prevTexture);
		return d3dTexture;
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
}