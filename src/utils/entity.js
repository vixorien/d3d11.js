
import { Transform } from "./transform.js";

export class Entity
{
	Mesh;
	Material;
	Transform;

	constructor(mesh, material)
	{
		this.Mesh = mesh;
		this.Material = material;

		this.Transform = new Transform();
	}
}