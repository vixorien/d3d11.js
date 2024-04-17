

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

	SetData(name, data, additionalOffset = 0)
	{
		// Get offset of this name
		if (!this.#mapping.hasOwnProperty(name))
			throw new Error("Name not found in map");
		console.log("NAME: " + name + " " + Array.isArray(data));

		// Is this already a real array or an array-like object?
		let isArray = Array.isArray(data) || ArrayBuffer.isView(data);

		let offset = this.#mapping[name];
		this.set(isArray ? data : [data], offset + additionalOffset);
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