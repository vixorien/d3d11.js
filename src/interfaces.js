
// -----------------------------------------------------
// ---------------- Misc API Interfaces ----------------
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
	#shader;
	#cbuffers;

	constructor(device, glShader, cbuffers)
	{
		super(device);

		this.#shader = glShader;
		this.#cbuffers = cbuffers;
	}

	GetShader()
	{
		return this.#shader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#cbuffers;
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
			dev.GetAdapter().deleteShader(this.#shader);
			dev.Release();
		}
	}
}


class ID3D11SamplerState extends ID3D11DeviceChild
{
	#desc;

	constructor(device, description)
	{
		super(device);
		this.#desc = Object.assign({}, description); // Copy

		// Validate
		this.#ValidateDesc();
	}

	#ValidateDesc()
	{
		// Release our ref to the device just in case we throw an exception
		this.GetDevice().Release();

		// Check filter mode
		const filter = this.#desc.Filter;
		if (filter < 0 || filter > D3D11_FILTER_COMPARISON_ANISOTROPIC ||
			(filter & 2) == 2 || // The 2 bit should be unused
			(filter & 8) == 8 || // The 8 bit should be unused
			(filter & 32) == 32) // The 32 bit should be unused
		{
			// Invalid range, or an invalid bit is set
			throw new Error("Invalid filter mode for sampler state");
		}

		// Check address modes
		const u = this.#desc.AddressU;
		const v = this.#desc.AddressV;
		const w = this.#desc.AddressW;
		if (u < D3D11_TEXTURE_ADDRESS_WRAP || u > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address U mode for sampler state");
		if (v < D3D11_TEXTURE_ADDRESS_WRAP || v > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address V mode for sampler state");
		if (w < D3D11_TEXTURE_ADDRESS_WRAP || w > D3D11_TEXTURE_ADDRESS_MIRROR_ONCE)
			throw new Error("Invalid address W mode for sampler state");

		// Max anisotropy should be between 1 and 16
		// TODO: Determine if we need to check device capabilities here
		const ani = this.#desc.MaxAnisotropy;
		if (ani < 1 || ani > 16)
			throw new Error("Invalid max anisotropy for sampler state");

		// Check comparison, but only if filter requires it
		const comp = this.#desc.ComparisonFunc;
		if ((filter & 128) == 128 &&
			(comp < D3D11_COMPARISON_NEVER || comp > D3D11_COMPARISON_ALWAYS))
			throw new Error("Invalid comparison function for sampler state");

		// Verify border color elements, but only if address mode requires it
		const border = this.#desc.BorderColor;
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

		// We're fine, so add the ref back
		this.GetDevice().AddRef();
		return true;
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}
}


class ID3D11VertexShader extends ID3D11DeviceChild
{
	#shader;
	#cbuffers;

	constructor(device, glShader, cbuffers)
	{
		super(device);

		this.#shader = glShader;
		this.#cbuffers = cbuffers;
	}

	GetShader()
	{
		return this.#shader;
	}

	// Not to spec but necessary for program creation
	// and mapping HLSL cbuffers -> GLSL uniform blocks
	GetCBuffers()
	{
		return this.#cbuffers;
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
			dev.GetAdapter().deleteShader(this.#shader);
			dev.Release();
		}
	}
}