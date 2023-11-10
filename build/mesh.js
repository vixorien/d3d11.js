
import { Vector2, Vector3, Matrix4x4 } from "./d3dmath.js";
import { Vertex } from "./vertex.js";

export class Mesh
{
	VertexBuffer;
	IndexBuffer;
	VertexCount;
	IndexCount;

	constructor(d3dDevice, vertices, indices)
	{
		this.#CreateBuffers(d3dDevice, vertices, indices);
	}

	static async LoadFromFile(d3dDevice, objFileURL)
	{
		let [vertices, indices] = await Mesh.#LoadOBJFile(d3dDevice, objFileURL);
		return new Mesh(d3dDevice, vertices, indices);
	}

	static async #LoadOBJFile(d3dDevice, url)
	{
		const resp = await fetch(url);
		const fileText = await resp.text();

		let positions = [];
		let normals = [];
		let uvs = [];
		let vertices = [];
		let indices = [];

		let lines = fileText.split("\n");
		for (let i = 0; i < lines.length; i++)
		{
			// Trim and verify
			lines[i] = lines[i].trim();
			if (lines[i].length == 0)
				continue;

			// Check the type of line
			if (lines[i].charAt(0) == 'v' && lines[i].charAt(1) == 'n')
			{
				// vn x y z
				let normLine = lines[i].split(' ');
				normals.push(new Vector3(
					parseFloat(normLine[1]),
					parseFloat(normLine[2]),
					parseFloat(normLine[3])));
			}
			else if (lines[i].charAt(0) == 'v' && lines[i].charAt(1) == 't')
			{
				// vt u v
				let uvLine = lines[i].split(' ');
				uvs.push(new Vector2(
					parseFloat(uvLine[1]),
					parseFloat(uvLine[2])));
			}
			else if (lines[i].charAt(0) == 'v')
			{
				// v x y z
				let posLine = lines[i].split(' ');
				positions.push(new Vector3(
					parseFloat(posLine[1]),
					parseFloat(posLine[2]),
					parseFloat(posLine[3])));
			}
			else if (lines[i].charAt(0) == 'f')
			{
				// f 1/2/3 1/2/3 1/2/3
				//  - or -
				// f 1/2/3 1/2/3 1/2/3 1/2/3
				let faceLine = lines[i].split(' ');

				// Assume at least 3 verts per face
				for (let f = 1; f <= 3; f++)
				{
					let data = faceLine[f].split('/');
					let p = parseInt(data[0]);
					let u = parseInt(data[1]);
					let n = parseInt(data[2]);

					let vert = new Vertex(
						positions[p - 1],
						uvs[u - 1],
						normals[n - 1]);

					// Convert to left handed
					vert.Position.z *= -1.0; // Invert Z pos
					vert.Normal.z *= -1.0; // Invert Z normal
					vert.UV.y = 1.0 - vert.UV.y; // Flip UV

					// Add to array
					vertices.push(vert);
				}

				// Add indices (0, 2, 1)
				let ind = indices.length;
				indices.push(ind + 0);
				indices.push(ind + 2);
				indices.push(ind + 1);

				// A fourth face? (So 5 total elements after split)
				if (faceLine.length == 5)
				{
					let data = faceLine[4].split('/');
					let p = parseInt(data[0]);
					let u = parseInt(data[1]);
					let n = parseInt(data[2]);

					let vert = new Vertex(
						positions[p - 1],
						uvs[u - 1],
						normals[n - 1]);

					// Convert to left handed
					vert.Position.z *= -1.0; // Invert Z pos
					vert.Normal.z *= -1.0; // Invert Z normal
					vert.UV.y = 1.0 - vert.UV.y; // Flip UV

					// Add to array
					vertices.push(vert);

					// Add another whole face (0, 3, 2)
					indices.push(ind + 0);
					indices.push(ind + 3);
					indices.push(ind + 2);
				}
			}
		}

		// Calculate tangents
		for (let i = 0; i < indices.length;)
		{
			// Grab indices and vertices of first triangle
			let i1 = indices[i++];
			let i2 = indices[i++];
			let i3 = indices[i++];
			let v1 = vertices[i1];
			let v2 = vertices[i2];
			let v3 = vertices[i3];

			// Calculate vectors relative to triangle positions
			let x1 = v2.Position.x - v1.Position.x;
			let y1 = v2.Position.y - v1.Position.y;
			let z1 = v2.Position.z - v1.Position.z;

			let x2 = v3.Position.x - v1.Position.x;
			let y2 = v3.Position.y - v1.Position.y;
			let z2 = v3.Position.z - v1.Position.z;

			// Do the same for vectors relative to triangle uv's
			let s1 = v2.UV.x - v1.UV.x;
			let t1 = v2.UV.y - v1.UV.y;

			let s2 = v3.UV.x - v1.UV.x;
			let t2 = v3.UV.y - v1.UV.y;

			// Create vectors for tangent calculation
			let r = 1.0 / (s1 * t2 - s2 * t1);

			let tx = (t2 * x1 - t1 * x2) * r;
			let ty = (t2 * y1 - t1 * y2) * r;
			let tz = (t2 * z1 - t1 * z2) * r;

			// Adjust tangents of each vert of the triangle
			v1.Tangent.x += tx;
			v1.Tangent.y += ty;
			v1.Tangent.z += tz;

			v2.Tangent.x += tx;
			v2.Tangent.y += ty;
			v2.Tangent.z += tz;

			v3.Tangent.x += tx;
			v3.Tangent.y += ty;
			v3.Tangent.z += tz;
		}

		// Orthonormalize
		for (let i = 0; i < vertices.length; i++)
		{
			let n = vertices[i].Normal;
			let t = vertices[i].Tangent;

			vertices[i].Tangent = Vector3.Normalize(
				Vector3.Subtract(t, Vector3.Multiply(n, Vector3.Dot(n, t)))
			);
		}

		return [vertices, indices];
	}

	#CreateBuffers(d3dDevice, vertices, indices)
	{
		// Save counts
		this.VertexCount = vertices.length;
		this.IndexCount = indices == null ? 0 : indices.length;

		// Copy data to float array
		const floatsPerVert = Vertex.GetStrideInFloats();
		let vbData = new Float32Array(vertices.length * floatsPerVert);
		for (let v = 0; v < vertices.length; v++)
		{
			vbData.set(vertices[v].Position, v * floatsPerVert + 0);
			vbData.set(vertices[v].UV, v * floatsPerVert + 3);
			vbData.set(vertices[v].Normal, v * floatsPerVert + 5);
			vbData.set(vertices[v].Tangent, v * floatsPerVert + 8);
		}

		// Create vertex buffer
		let vbDesc = new D3D11_BUFFER_DESC(
			Vertex.GetStrideInBytes() * vertices.length,
			D3D11_USAGE_IMMUTABLE,
			D3D11_BIND_VERTEX_BUFFER,
			0, 0, 0);
		this.VertexBuffer = d3dDevice.CreateBuffer(vbDesc, vbData);

		// Create index buffer if necessary
		if (indices != null)
		{
			let ibData = new Int16Array(indices);
			let ibDesc = new D3D11_BUFFER_DESC(
				Int16Array.BYTES_PER_ELEMENT * indices.length,
				D3D11_USAGE_IMMUTABLE,
				D3D11_BIND_INDEX_BUFFER,
				0, 0, 0);
			this.IndexBuffer = d3dDevice.CreateBuffer(ibDesc, ibData);
		}
	}
}

