
// -----------------------------------------------------
// -------------- API Object Base Classes --------------
// -----------------------------------------------------

class IUnknown
{
	#refCount;

	constructor()
	{
		this.#refCount = 0;
		this.AddRef();
	}

	// Not to spec, but necessary due to a lack
	// of protected access in javascript
	// NOTE: Could be "faked" with an Add(), Release() pair, but that feels silly
	GetRef()
	{
		return this.#refCount;
	}

	AddRef()
	{
		this.#refCount++;
		return this.#refCount;
	}

	Release()
	{
		this.#CheckRef();

		this.#refCount--;
		return this.#refCount;
	}

	#CheckRef()
	{
		if (this.#refCount <= 0)
			throw new Error("Object has been released and is no longer available");
	}
}


class ID3D11DeviceChild extends IUnknown
{
	#device;

	constructor(device)
	{
		super();
		this.#device = device;

		// Add another ref to the device, too
		this.#device.AddRef();
	}

	Release()
	{
		super.Release();
		
		// If we're done, release the device
		if (this.GetRef() <= 0)
			this.#device.Release();
	}

	GetDevice()
	{
		this.#device.AddRef();
		return this.#device;
	}
}