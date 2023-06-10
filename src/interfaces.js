
// -----------------------------------------------------
// ---------------- Pipeline Interfaces ----------------
// -----------------------------------------------------

class ID3D11InputLayout extends ID3D11DeviceChild
{
	#inputElementDescs;

	constructor(device, inputElementDescs)
	{
		super(device);

		// Copy array of element descs and save
		// TODO: Throw exception if param is not an array?
		this.#inputElementDescs = this.#CopyDescriptions(inputElementDescs);
	}

	#CopyDescriptions(descriptionArray)
	{
		let descs = [];
		for (let i = 0; i < descriptionArray.length; i++)
			descs[i] = Object.assign({}, descriptionArray[i]);
		return descs;
	}

	GetInputElementDescs()
	{
		return this.#CopyDescriptions(this.#inputElementDescs);
	}
}


class ID3D11PixelShader extends ID3D11DeviceChild
{
	#glShader;
	#hlsl;

	constructor(device, glShader, hlsl)
	{
		super(device);

		this.#glShader = glShader;
		this.#hlsl = hlsl;
	}

	GetGLShader()
	{
		return this.#glShader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#hlsl.GetCBuffers();
	}

	GetTextureSamplerCombinations()
	{
		return this.#hlsl.GetTextureSamplerCombinations();
	}

	// TODO: Do we need to scan the context for any
	// outstanding programs and delete if necessary?
	Release()
	{
		super.Release();

		// Actually remove shader if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteShader(this.#glShader);
			dev.Release();
		}
	}
}

/**
 * Holds a description for rasterizer state that you can bind to the rasterizer stage.
 */
class ID3D11RasterizerState extends ID3D11DeviceChild
{
	#desc;

	/**
	 * Creates a new rasterizer state.  Note that this should not be invoked directly.
	 * 
	 * @param {ID3D11Device} device The device that created this state
	 * @param {D3D11_RASTERIZER_DESC} desc The description of this state
	 * 
	 * @throws {Error} If this object is instantiated directly
	 */
	constructor(device, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11RasterizerState)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11RasterizerState objects - use device.CreateRasterizerState() instead");
		}

		this.#desc = Object.assign({}, desc); // Copy
	}

	/**
	 * Gets the description of this rasterizer state
	 * 
	 * @returns {D3D11_RASTERIZER_DESC} The rasterizer description for this state
	 */
	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}
}


class ID3D11SamplerState extends ID3D11DeviceChild
{
	#desc;
	#glSamplerNoMips;
	#glSamplerWithMips;

	constructor(device, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11SamplerState)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11SamplerState objects - use device.CreateSamplerState() instead");
		}

		this.#desc = Object.assign({}, desc); // Copy

		// Create two GL samplers - with and without mips
		let gl = device.GetAdapter();
		this.#glSamplerNoMips = gl.createSampler();
		this.#glSamplerWithMips = gl.createSampler();

		// Initialize both samplers
		this.#InitializeGLSampler(device, this.#glSamplerNoMips, desc, false);
		this.#InitializeGLSampler(device, this.#glSamplerWithMips, desc, true);
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}

	GetGLSampler(withMips)
	{
		return withMips ? this.#glSamplerWithMips : this.#glSamplerNoMips;
	}

	Release()
	{
		super.Release();

		// Actually remove sampler
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteSampler(this.#glSamplerNoMips);
			dev.GetAdapter().deleteSampler(this.#glSamplerWithMips);
			dev.Release();
		}
	}

	// Populate with description options
	// TODO: Decide how to handle MipLODBias, if at all
	#InitializeGLSampler(device, glSampler, desc, withMips)
	{
		const gl = device.GetAdapter();

		// Filtering
		gl.samplerParameteri(glSampler, gl.TEXTURE_MAG_FILTER, this.#GetGLMagFilter(gl, desc.Filter));
		gl.samplerParameteri(glSampler, gl.TEXTURE_MIN_FILTER, this.#GetGLMinFilter(gl, desc.Filter, withMips));

		// Address mode
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_S, this.#GetGLAddressMode(gl, desc.AddressU));
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_T, this.#GetGLAddressMode(gl, desc.AddressV));
		gl.samplerParameteri(glSampler, gl.TEXTURE_WRAP_R, this.#GetGLAddressMode(gl, desc.AddressW));

		// LOD control
		gl.samplerParameterf(glSampler, gl.TEXTURE_MIN_LOD, desc.MinLOD);
		gl.samplerParameterf(glSampler, gl.TEXTURE_MAX_LOD, desc.MaxLOD);

		// Comparison
		if (this.#IsCompareFilter(desc.Filter))
		{
			gl.samplerParameteri(glSampler, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
			gl.samplerParameteri(glSampler, gl.TEXTURE_COMPARE_FUNC,
				this.#GetGLComparisonFunc(gl, desc.ComparisonFunc));
		}

		// Anisotropy
		const anisoExt = device.GetAnisoExt();
		if (this.#IsAnisoFilter(desc.Filter) && anisoExt != null)
		{
			gl.samplerParameteri(glSampler, anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, desc.MaxAnisotropy);
		}
	}

	#GetGLMagFilter(gl, filter)
	{
		// 4's bit controls mag filter: 1 = linear, 0 = point
		return ((filter & 4) == 4) ? gl.LINEAR : gl.NEAREST;
	}

	#GetGLMinFilter(gl, filter, withMips)
	{
		const min = ((filter & 16) == 16) ? gl.LINEAR : gl.NEAREST;	// 1 = linear, 0 = point
		const mip = ((filter & 1) == 1) ? gl.LINEAR : gl.NEAREST;	// 1 = linear, 0 = point

		// If no mips, just use the basic min filter
		if (!withMips) return min;

		// We have mips
		if (min == gl.LINEAR && mip == gl.LINEAR) return gl.LINEAR_MIPMAP_LINEAR;
		if (min == gl.LINEAR && mip == gl.NEAREST) return gl.LINEAR_MIPMAP_NEAREST;
		if (min == gl.NEAREST && mip == gl.LINEAR) return gl.NEAREST_MIPMAP_LINEAR;
		if (min == gl.NEAREST && mip == gl.NEAREST) return gl.NEAREST_MIPMAP_NEAREST;

		throw new Error("Invalid filter");
	}

	#IsAnisoFilter(filter)
	{
		return ((filter & 64) == 64); // 64's bit is aniso on/off
	}

	#IsCompareFilter(filter)
	{
		return ((filter & 128) == 128); // 128's bit is comparison on/off
	}


	#GetGLAddressMode(gl, addr)
	{
		switch (addr)
		{
			case D3D11_TEXTURE_ADDRESS_WRAP: return gl.REPEAT;
			case D3D11_TEXTURE_ADDRESS_MIRROR: return gl.MIRRORED_REPEAT;
			case D3D11_TEXTURE_ADDRESS_CLAMP: return gl.CLAMP_TO_EDGE;
			default: throw new Error("Invalid address mode");
		}
	}

	#GetGLComparisonFunc(gl, func)
	{
		console.log(func);
		switch (func)
		{
			case D3D11_COMPARISON_NEVER: return gl.NEVER;
			case D3D11_COMPARISON_LESS: return gl.LESS;
			case D3D11_COMPARISON_EQUAL: return gl.EQUAL;
			case D3D11_COMPARISON_LESS_EQUAL: return gl.LEQUAL;
			case D3D11_COMPARISON_GREATER: return gl.GREATER;
			case D3D11_COMPARISON_NOT_EQUAL: return gl.NOTEQUAL;
			case D3D11_COMPARISON_GREATER_EQUAL: return gl.GEQUAL;
			case D3D11_COMPARISON_ALWAYS: return gl.ALWAYS;
			default: throw new Error("Invalid comparison function");
		}
	}
}


class ID3D11VertexShader extends ID3D11DeviceChild
{
	#glShader;
	#hlsl

	constructor(device, glShader, hlsl)
	{
		super(device);

		this.#glShader = glShader;
		this.#hlsl = hlsl;
	}

	GetGLShader()
	{
		return this.#glShader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#hlsl.GetCBuffers();
	}

	GetTextureSamplerCombinations()
	{
		return this.#hlsl.GetTextureSamplerCombinations();
	}

	// TODO: Do we need to scan the context for any
	// outstanding programs and delete if necessary?
	Release()
	{
		super.Release();

		// Actually remove shader if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteShader(this.#glShader);
			dev.Release();
		}
	}
}