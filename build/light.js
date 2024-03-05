
import { Vector3 } from "./d3dmath.js";

export class Light extends Float32Array
{
	static TypeDirectional = 0.0;
	static TypePoint = 1.0;

	static SizeInBytes = 16 * Float32Array.BYTES_PER_ELEMENT;

	// Overall mapping in shader
	// {
	//	float type;
	//	float intensity;
	//	float range;
	//	float pad;			// End first 16 byte boundary
	//
	//	float3 position;	// Next 16 bytes, auto pad the last float
	//
	//	float3 direction;	// Next 16 bytes, auto pad the last float
	//
	//	float3 color;		// Next 16 bytes, auto pad the last float
	// }

	get Type() { return this[0]; }
	get Intensity() { return this[1]; }
	get Range() { return this[2]; }
	get Position() { return new Vector3(this[4], this[5], this[6]); }
	get Direction() { return new Vector3(this[8], this[9], this[10]); }
	get Color() { return new Vector3(this[12], this[13], this[14]); }

	set Type(val) { this[0] = val; }
	set Intensity(val) { this[1] = val; }
	set Range(val) { this[2] = val; }
	set Position(val) { this[4] = val.x; this[5] = val.y; this[6] = val.z; }
	set Direction(val) { this[8] = val.x; this[9] = val.y; this[10] = val.z; }
	set Color(val) { this[12] = val.x; this[13] = val.y; this[14] = val.z; }

	constructor(
		type = Light.TypeDirectional,
		color = Vector3.One,
		intensity = 1,
		dir = Vector3.UnitX,
		pos = Vector3.Zero,
		range = 1)
	{
		super(16);

		this.Type = type;
		this.Color = color;
		this.Intensity = intensity;
		this.Direction = dir;
		this.Position = pos;
		this.Range = range;
	}
}