

class Vector2 extends Float32Array
{
	get X() { return this[0]; }
	get Y() { return this[1]; }

	set X(x) { this[0] = x; }
	set Y(y) { this[1] = y; }

	constructor(x = 0, y = 0)
	{
		super(2);
		this[0] = x;
		this[1] = y;
	}
}



class Vector3 extends Float32Array
{
	get X() { return this[0]; }
	get Y() { return this[1]; }
	get Z() { return this[2]; }

	set X(x) { this[0] = x; }
	set Y(y) { this[1] = y; }
	set Z(z) { this[2] = z; }

	constructor(x = 0, y = 0, z = 0)
	{
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
	}

	static Length(v)
	{
		return Math.sqrt(v.X * v.X + v.Y * v.Y + v.Z * v.Z);
	}

	static Normalize(v)
	{
		let length = Vector3.Length(v);
		return new Vector3(v.X / length, v.Y / length, v.Z / length);
	}

	static Dot(v1, v2)
	{
		return v1.X * v2.X + v1.Y * v2.Y + v1.Z * v2.Z;
	}

	static Add(v1, v2)
	{
		return new Vector3(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
	}

	static Subtract(v1, v2)
	{
		return new Vector3(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
	}

	static Multiply(v, scalar)
	{
		return new Vector3(v.X * scalar, v.Y * scalar, v.Z * scalar);
	}

	static Divide(v, scalar)
	{
		return new Vector3(v.X / scalar, v.Y / scalar, v.Z / scalar);
	}
}



class Matrix4x4 extends Float32Array
{
	constructor()
	{
		super(16);
	}

	static Identity()
	{
		let mat = new Matrix4x4();
		mat[0] = 1.0;
		mat[5] = 1.0;
		mat[10] = 1.0;
		mat[15] = 1.0;
		return mat;
	}

	static Translation(x, y, z)
	{
		let mat = Matrix4x4.Identity();

		// [1, 0, 0, 0]
		// [0, 1, 0, 0]
		// [0, 0, 1, 0]
		// [x, y, z, 1]

		mat[12] = x;
		mat[13] = y;
		mat[14] = z;

		return mat;
	}

	static Scale(x, y, z)
	{
		let mat = Matrix4x4.Identity();
		mat[0] = x;
		mat[5] = arguments.length == 1 ? x : y;
		mat[10] = arguments.length == 1 ? x : z;
		return mat;
	}

	static RotationY(angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		// [cos, 0, -sin, 0]
		// [0    1,    0, 0]
		// [sin, 0,  cos, 0]
		// [0    0     0, 1]

		let mat = this.Identity();
		mat[0] = cosAngle;
		mat[2] = -sinAngle;
		mat[8] = sinAngle;
		mat[10] = cosAngle;
		return mat;
	}

	static Multiply(a, b)
	{
		let mat = new Matrix4x4();

		let a_00 = a[0], a_01 = a[1], a_02 = a[2], a_03 = a[3];
		let a_10 = a[4], a_11 = a[5], a_12 = a[6], a_13 = a[7];
		let a_20 = a[8], a_21 = a[9], a_22 = a[10], a_23 = a[11];
		let a_30 = a[12], a_31 = a[13], a_32 = a[14], a_33 = a[15];

		// NOTE: Should really just type this all out to make it faster
		for (var row = 0; row < 4; row++)
		{
			let offset = row * 4;
			let b_0 = b[0 + offset];
			let b_1 = b[1 + offset];
			let b_2 = b[2 + offset];
			let b_3 = b[3 + offset];

			mat[0 + offset] = b_0 * a_00 + b_1 * a_10 + b_2 * a_20 + b_3 * a_30;
			mat[1 + offset] = b_0 * a_01 + b_1 * a_11 + b_2 * a_21 + b_3 * a_31;
			mat[2 + offset] = b_0 * a_02 + b_1 * a_12 + b_2 * a_22 + b_3 * a_32;
			mat[3 + offset] = b_0 * a_03 + b_1 * a_13 + b_2 * a_23 + b_3 * a_33;
		}

		return mat;
	}

	static PerspectiveFovLH(fovAngleY, aspectRatio, nearZ, farZ)
	{
		const sinFov = Math.sin(0.5 * fovAngleY);
		const cosFov = Math.cos(0.5 * fovAngleY);

		const height = cosFov / sinFov;
		const width = height / aspectRatio;
		const fRange = farZ / (farZ - nearZ);

		let mat = new Matrix4x4();

		// [width, 0,      0,               0]
		// [0,     height, 0,               0]
		// [0,     0,      fRange,          1]
		// [0,     0,      -fRange * nearZ, 0]

		mat[0] = width;
		mat[5] = height;
		mat[10] = fRange;
		mat[11] = 1.0;
		mat[14] = -fRange * nearZ;

		return mat;
	}

	static TestView(x, y, z)
	{
		let mat = Matrix4x4.Identity();

		// [1, 0, 0, 0]
		// [0, 1, 0, 0]
		// [0, 0, 1, 0]
		// [-x, -y, -z, 1]

		mat[12] = -x;
		mat[13] = -y;
		mat[14] = -z;

		return mat;
	}
}

