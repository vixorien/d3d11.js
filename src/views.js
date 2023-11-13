
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
		this.#desc = Object.assign({}, desc);

		// Add a reference to the resource
		// so the view keeps it alive
		// NOTE: This might not exactly match D3D ref count, but the
		//       overall effect should be the same!
		this.#resource.AddRef();
	}

	GetDesc()
	{
		return Object.assign({}, this.#desc);
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

		// Check the resource
		let resDesc = resource.GetDesc();

		// Has to have the correct bind flag
		if ((resDesc.BindFlags & D3D11_BIND_DEPTH_STENCIL) == 0)
			throw new Error("Resource not set for depth stencil binding");

		// Must be the right dimension!
		// TODO: Handle the rest of the types
		switch (desc.ViewDimension)
		{
			//case D3D11_DSV_DIMENSION_TEXTURE1D:
			//case D3D11_DSV_DIMENSION_TEXTURE1DARRAY: break;
			//case D3D11_DSV_DIMENSION_TEXTURE2DARRAY: break;

			case D3D11_DSV_DIMENSION_TEXTURE2D:

				// Has to actually be a texture2d
				if (!(resource instanceof ID3D11Texture2D))
					throw new Error("Resource type does not match view description");

				break;

			default:
				throw new Error("Invalid view dimension for depth stencil view");
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