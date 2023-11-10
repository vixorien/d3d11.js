
import { Vector2, Vector3 } from "./d3dmath.js"

/**
 * Represents a vertex for 3D geometry with enough
 * data for textures, lighting and normal mapping
 */
export class Vertex
{
	Position;
	UV;
	Normal;
	Tangent;

	/**
	 * Creates a new vertex
	 * 
	 * @param {Vector3} pos The Position of this vertex in 3D space
	 * @param {Vector2} uv The UV (texture) coordinate of this vertex
	 * @param {Vector3} norm The Normal of this vertex
	 * @param {Vector3} tang The Tangent of this vertex, based on the UV mapping
	 */
	constructor(pos, uv, norm, tang = new Vector3(0, 0, 0))
	{
		this.Position = pos.slice();
		this.UV = uv.slice();
		this.Normal = norm.slice();
		this.Tangent = tang.slice();
	}

	static GetStrideInFloats()
	{
		// pos + uv + normal + tangent = 3 + 2 + 3 + 3 = 11
		return 11;
	}

	static GetStrideInBytes()
	{
		// pos + uv + normal + tangent = 3 + 2 + 3 + 3 = 11
		return Float32Array.BYTES_PER_ELEMENT * this.GetStrideInFloats(); 
	}
}

