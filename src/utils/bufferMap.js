

export class BufferMap extends Float32Array
{
	#size;
	#offset;
	#mapping;

	constructor(size)
	{
		super(size);

		this.#size = size;
		this.#offset = 0;
		this.#mapping = {};
	}

	SetByName(name, data)
	{
		// Get offset of this name
		if (!this.#mapping.hasOwnProperty(name))
			throw new Error("Name not found in map");

		let offset = this.#mapping[name];
		this.set(data, offset);
	}

	PushMapping(name, size)
	{
		if (this.#offset + size >= this.#size)
			throw new Error("Mapping past end of buffer");

		this.#mapping[name] = this.#offset;
		this.#offset += size;
	}

	SetMappingOffset(name, size, offset)
	{
		if (offset + size >= this.#size)
			throw new Error("Mapping past end of buffer");

		this.#mapping[name] = offset;
	}

}