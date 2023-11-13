
// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{
	#desc;
	#glTarget;
	#glResource;

	constructor(device, desc, glTarget, glResource)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11Buffer)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Resource objects - use corresponding Create() functions of an ID3D11Device object instead");
		}

		this.#desc = Object.assign({}, desc); // Copy
		this.#glTarget = glTarget;
		this.#glResource = glResource;
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}

	GetGLTarget()
	{
		return this.#glTarget;
	}

	GetGLResource()
	{
		return this.#glResource;
	}
}

class ID3D11Buffer extends ID3D11Resource
{
	constructor(device, desc, glTarget, glBuffer)
	{
		super(device, desc, glTarget, glBuffer);

		// Abstract check
		if (new.target === ID3D11Buffer)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Buffer objects - use device.CreateBuffer() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteBuffer(this.GetGLResource());
			dev.Release();
		}
	}
}

// TODO: Actually implement 1D textures
// - This exists currently so that I can start using the type elsewhere
class ID3D11Texture1D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture1D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture1D objects - use device.CreateTexture1D() instead");
		}

		throw new Error("Texture1D is not implemented yet!");
	}
}

class ID3D11Texture2D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture2D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture2D objects - use device.CreateTexture2D() instead");
		}
	}

	Release()
	{
		super.Release();

		// Actually remove buffer if necessary
		// TODO: Handle distinction between texture & render buffer
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteTexture(this.GetGLResource());
			dev.Release();
		}
	}
}

// TODO: Actually implement 3D textures
// - This exists currently so that I can start using the type elsewhere
class ID3D11Texture3D extends ID3D11Resource
{
	constructor(device, desc, glTarget, glTexture)
	{
		super(device, desc, glTarget, glTexture);

		// Abstract check
		if (new.target === ID3D11Texture3D)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11Texture3D objects - use device.CreateTexture3D() instead");
		}

		throw new Error("Texture3D is not implemented yet!");
	}
}