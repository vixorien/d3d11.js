
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

		// TODO: Check description for texture array or cube, as they have different constants
		if (desc.ArraySize < 1) throw new Error("Invalid array size specified");
		if (desc.ArraySize > 1) throw new Error("Texture arrays not implemented yet!");
		if (desc.MiscFlags == D3D11_RESOURCE_MISC_TEXTURECUBE) throw new Error("Texture cubes not implemented yet!");

		// Determine how many mip levels we'll need (0 in the desc means 'full mip chain')
		let maxMips = Math.log2(Math.max(desc.Width, desc.Height)) + 1;
		if (desc.MipLevels == 0)
			desc.MipLevels = maxMips; // Update description!

		if (desc.MipLevels <= 0 || desc.MipLevels > maxMips)
			throw new Error("Invalid mip levels");

		// Create the gl texture and final D3D texture object
		let glTexture = this.#gl.createTexture();
		let d3dTexture = new ID3D11Texture2D(this, desc, glTexture);

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

		// Set default sampler info
		// NOTE: Base level and max level will be handled by the view
		// NOTE: WebGL does not support border colors
		// TODO: MipLODBias?  Is that a thing in WebGL?  Maybe adjust min/max mip levels by this as a work around?  Not ideal
		// TODO: Handle types
		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MAG_FILTER, this.#gl.LINEAR);
		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MIN_FILTER, hasMipmaps ? this.#gl.LINEAR_MIPMAP_LINEAR : this.#gl.LINEAR); // Can't use the mipmap one if no mipmaps!  Results in black texture sample

		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_WRAP_S, this.#gl.CLAMP_TO_EDGE);
		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_WRAP_T, this.#gl.CLAMP_TO_EDGE);
		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_WRAP_R, this.#gl.CLAMP_TO_EDGE);

		this.#gl.texParameterf(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MIN_LOD, -D3D11_FLOAT32_MAX);
		this.#gl.texParameterf(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_MAX_LOD, D3D11_FLOAT32_MAX);

		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_COMPARE_MODE, this.#gl.NONE);
		this.#gl.texParameteri(this.#gl.TEXTURE_2D, this.#gl.TEXTURE_COMPARE_FUNC, this.#gl.NEVER);

		if (this.#anisoExt != null)
		{
			this.#gl.texParameterf(this.#gl.TEXTURE_2D, this.#anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, 1);
		}

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

	#ValidateBufferDesc(desc)
	{
		let isVB = ((desc.BindFlags & D3D11_BIND_VERTEX_BUFFER) == D3D11_BIND_VERTEX_BUFFER);
		let isIB = ((desc.BindFlags & D3D11_BIND_INDEX_BUFFER) == D3D11_BIND_INDEX_BUFFER);
		let isCB = ((desc.BindFlags & D3D11_BIND_CONSTANT_BUFFER) == D3D11_BIND_CONSTANT_BUFFER);
		let isSR = ((desc.BindFlags & D3D11_BIND_SHADER_RESOURCE) == D3D11_BIND_SHADER_RESOURCE);
		let isSO = ((desc.BindFlags & D3D11_BIND_STREAM_OUTPUT) == D3D11_BIND_STREAM_OUTPUT);
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
		if (!isVB && !isIB && !isCB && !isSR && !isSO && !isRT && !isDS)
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
}