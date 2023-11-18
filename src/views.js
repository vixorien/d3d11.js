
// -----------------------------------------------------
// ----------------------- Views -----------------------
// -----------------------------------------------------

class ID3D11View extends ID3D11DeviceChild
{
	#resource;
	#desc;

	constructor(device, resource, desc)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11View)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11View objects - use corresponding Create___View() functions of an ID3D11Device object instead");
		}

		this.#resource = resource;
		this.#desc = desc.Copy();

		// Add a reference to the resource
		// so the view keeps it alive
		// NOTE: This might not exactly match D3D ref count, but the
		//       overall effect should be the same!
		this.#resource.AddRef();
	}

	GetDesc()
	{
		return this.#desc.Copy();
	}

	GetResource()
	{
		this.#resource.AddRef();
		return this.#resource;
	}

	Release()
	{
		super.Release();

		// If we're done, release the resource ref, too
		if (this.GetRef() <= 0)
		{
			this.#resource.Release();
		}
	}
}


class ID3D11DepthStencilView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11DepthStencilView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11DepthStencilView objects - use device.CreateDepthStencilView() instead");
		}
	}
}


// still a work in progress until we get actual textures
class ID3D11RenderTargetView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11RenderTargetView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11RenderTargetView objects - use device.CreateRenderTargetView() instead");
		}
	}
}

// Work in progress!
class ID3D11ShaderResourceView extends ID3D11View
{
	constructor(device, resource, desc)
	{
		super(device, resource, desc);

		// Abstract check
		if (new.target === ID3D11ShaderResourceView)
		{
			device.Release();
			throw new Error("Cannot instantiate ID3D11ShaderResourceView objects - use device.CreateShaderResourceView() instead");
		}
	}
}