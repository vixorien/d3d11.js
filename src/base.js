
// -----------------------------------------------------
// -------------- API Object Base Classes --------------
// -----------------------------------------------------

/** 
 *  The base class for all D3D11 API objects.
 *  @abstract
 */
class IUnknown
{
	#refCount;

	/** 
	 *  Creates a new IUnknown object.  
	 *  
	 *  @throws {Error} If this class is instantiated directly.
	 */
	constructor()
	{
		// Abstract check
		if (new.target === IUnknown)
		{
			throw new Error("Cannot instantiate IUnknown objects directly.");
		}

		this.#refCount = 0;
		this.AddRef();
	}



	/**
	 * Get the current reference count of the object.  Note that this is not
	 * to spec but is necessary due to the lack of protected access in javascript.
	 * 
	 * @returns {number} The current reference count
	 */
	GetRef()
	{
		return this.#refCount;
	}

	/** 
	 *  Increments the reference count by 1
	 *  
	 *  @returns {number} The new reference count
	 */
	AddRef()
	{
		this.#refCount++;
		return this.#refCount;
	}

	/**
	 * Decrements the reference count by 1
	 * 
	 * @throws {Error} Cannot release an object with a ref count of zero
	 * @returns {number} The new reference count
	 */
	Release()
	{
		this.#refCount--;
		this.#CheckRef();

		return this.#refCount;
	}

	/**
	 * Helper for checking for an invalid ref count
	 * 
	 * @throws {Error} If the ref count is less than zero
	 */
	#CheckRef()
	{
		if (this.#refCount < 0)
			throw new Error("Object has been released and is no longer available");
	}
}

/** 
 *  Base class for objects created by an {@link ID3D11Device} object.
 *  @abstract
 */
class ID3D11DeviceChild extends IUnknown
{
	#device;

	/**
	 *  Creates a new ID3D11DeviceChild object.
	 *  
	 *  @throws {Error} If this class is instantiated directly.
	 */
	constructor(device)
	{
		super();

		// Abstract check.
		if (new.target === ID3D11DeviceChild)
		{
			throw new Error("Cannot instantiate ID3D11DeviceChild objects directly.");
		}

		// Add another ref to the device, too
		this.#device = device;
		this.#device.AddRef();
	}

	/**
	 * Releases one reference.  If the ref count is now zero, this
	 * object releases its reference to the underlying device, too.
	 * 
	 * @returns {number} The new reference count
	 */
	Release()
	{
		super.Release();
		
		// If we're done, release the device
		if (this.GetRef() <= 0)
			this.#device.Release();

		return this.GetRef();
	}

	/**
	 * Gets a reference to the {@link ID3D11Device} that created
	 * this object.  Note that this adds a reference to the
	 * device that must be released by the caller.
	 * 
	 * @returns {ID3D11Device} The device that created this object.
	 */
	GetDevice()
	{
		this.#device.AddRef();
		return this.#device;
	}
}