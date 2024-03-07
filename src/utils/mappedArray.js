

export class MappedArray extends Float32Array
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

	SetData(name, data)
	{
		// Get offset of this name
		if (!this.#mapping.hasOwnProperty(name))
			throw new Error("Name not found in map");

		let offset = this.#mapping[name];
		this.set(data, offset);
	}

	PushMapping(name, size)
	{
		if (this.#offset + size > this.#size)
			throw new Error("Cannot map past end of buffer");

		if (this.#mapping.hasOwnProperty(name))
			throw new Error("Name already exists in map");

		this.#mapping[name] = this.#offset;
		this.#offset += size;
	}

}