
// -----------------------------------------------------
// --------------------- Resources ---------------------
// -----------------------------------------------------

class ID3D11Resource extends ID3D11DeviceChild
{
	#desc;
	#dimension;
	#glResource;

	constructor(device, desc, dimension, glResource)
	{
		super(device);
		this.#desc = Object.assign({}, desc); // Copy
		this.#dimension = dimension;
		this.#glResource = glResource;
	}

	GetDesc()
	{
		// Returns a copy so that we can't alter the original
		return Object.assign({}, this.#desc);
	}

	GetType()
	{
		return this.#dimension;
	}

	GetGLResource()
	{
		return this.#glResource;
	}
}

class ID3D11Buffer extends ID3D11Resource
{
	constructor(device, desc, glBuffer)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_BUFFER, glBuffer);
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
	constructor(device, desc, glBuffer)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_TEXTURE2D, glBuffer);

		throw new Error("Texture1D is not implemented yet!");
	}

	Release()
	{
		super.Release();

		// Actually remove texture if necessary
		// TODO: Handle distinction between texture & render buffer
		if (this.GetRef() <= 0)
		{
			let dev = this.GetDevice();
			dev.GetAdapter().deleteTexture(this.GetGLResource());
			dev.Release();
		}
	}
}

class ID3D11Texture2D extends ID3D11Resource
{
	constructor(device, desc, glBuffer)
	{
		super(device, desc, D3D11_RESOURCE_DIMENSION_TEXTURE2D, glBuffer);
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