

export class Vector2 extends Float32Array
{
	get x() { return this[0]; }
	get y() { return this[1]; }

	set x(x) { this[0] = x; }
	set y(y) { this[1] = y; }

	constructor(x = 0, y = 0)
	{
		super(2);
		this[0] = x;
		this[1] = y;
	}
}



export class Vector3 extends Float32Array
{
	static get Zero() { return new Vector3(0, 0, 0); }
	static get UnitX() { return new Vector3(1, 0, 0); }
	static get UnitY() { return new Vector3(0, 1, 0); }
	static get UnitZ() { return new Vector3(0, 0, 1); }
	static get UnitXNeg() { return new Vector3(-1, 0, 0); }
	static get UnitYNeg() { return new Vector3(0, -1, 0); }
	static get UnitZNeg() { return new Vector3(0, 0, -1); }

	get x() { return this[0]; }
	get y() { return this[1]; }
	get z() { return this[2]; }

	set x(x) { this[0] = x; }
	set y(y) { this[1] = y; }
	set z(z) { this[2] = z; }

	constructor(x = 0, y = 0, z = 0)
	{
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
	}

	static Length(v)
	{
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}

	static Normalize(v)
	{
		let length = Vector3.Length(v);
		return new Vector3(v.x / length, v.y / length, v.z / length);
	}

	static Dot(v1, v2)
	{
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	static Cross(v1, v2)
	{
		return new Vector3(
			v1.y * v2.z - v1.z * v2.y,
			v1.z * v2.x - v1.x * v2.z,
			v1.x * v2.y - v1.y * v2.x);
	}

	static Add(v1, v2)
	{
		return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	}

	static Subtract(v1, v2)
	{
		return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	}

	static Multiply(v, scalar)
	{
		return new Vector3(v.x * scalar, v.y * scalar, v.z * scalar);
	}

	static Divide(v, scalar)
	{
		return new Vector3(v.x / scalar, v.y / scalar, v.z / scalar);
	}

	static Negate(v)
	{
		return new Vector3(-v.x, -v.y, -v.z);
	}

	static Transform(v, mat)
	{
		return new Vector3(
			mat[0] * v.x + mat[4] * v.y + mat[8] * v.z + mat[12],
			mat[1] * v.x + mat[5] * v.y + mat[9] * v.z + mat[13],
			mat[2] * v.x + mat[6] * v.y + mat[10] * v.z + mat[14]);
	}

	static Rotate(v, pitch, yaw, roll)
	{
		// Create three matrices
		// Note: This could be combined manually to be WAY faster
		let pMat = Matrix4x4.RotationX(pitch);
		let yMat = Matrix4x4.RotationY(yaw);
		let rMat = Matrix4x4.RotationZ(roll);

		// Combine in roll/pitch/yaw order
		let rotMat = Matrix4x4.Multiply(yMat, Matrix4x4.Multiply(pMat, rMat));
		
		return Vector3.Transform(v, rotMat);
	}
}


export class Quaternion extends Float32Array
{
	get x() { return this[0]; }
	get y() { return this[1]; }
	get z() { return this[2]; }
	get w() { return this[3]; }

	set x(x) { this[0] = x; }
	set y(y) { this[1] = y; }
	set z(z) { this[2] = z; }
	set w(w) { this[3] = w; }

	constructor(x = 0, y = 0, z = 0, w = 0)
	{
		super(4);
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	static Identity()
	{
		return new Quaternion(0, 0, 0, 1);
	}

	// Applied in order: roll, pitch, yaw
	static FromAngles(pitch, yaw, roll)
	{
		// Cut each angle in half
		pitch *= 0.5;
		yaw *= 0.5;
		roll *= 0.5;

		// Sin and cos of each
		let sinP = Math.sin(pitch);
		let sinY = Math.sin(yaw);
		let sinR = Math.sin(roll);

		let cosP = Math.cos(pitch);
		let cosY = Math.cos(yaw);
		let cosR = Math.cos(roll);

		// Fill result and return
		let q = new Quaternion();
		q.x = cosR * sinP & cosY + sinR * cosP * sinY;
		q.y = cosR * cosP & sinY - sinR * sinP * cosY;
		q.z = sinR * cosP & cosY - cosR * sinP * sinY;
		q.w = cosR * cosP & cosY + sinR * sinP * sinY;
		return q;
	}
}


// Note: Fastest way of filling these arrays is manually (one element at a time)
// - Using fill() is much worse
// - Using .set() is even worse
export class Matrix4x4 extends Float32Array
{
	constructor()
	{
		super(16);
	}

	// -------------------------------------------
	// ----------- Creation functions  -----------
	// -------------------------------------------

	static get Identity()
	{
		let mat = new Matrix4x4();
		mat[0] = 1.0;
		mat[5] = 1.0;
		mat[10] = 1.0;
		mat[15] = 1.0;
		return mat;
	}

	// [1, 0, 0, 0]
	// [0, 1, 0, 0]
	// [0, 0, 1, 0]
	// [x, y, z, 1]
	static Translation(x, y, z)
	{
		let mat = Matrix4x4.Identity;
		mat[12] = x;
		mat[13] = y;
		mat[14] = z;
		return mat;
	}

	static TranslationV(vec3)
	{
		let mat = Matrix4x4.Identity;
		mat[12] = vec3.x;
		mat[13] = vec3.y;
		mat[14] = vec3.z;
		return mat;
	}

	// [1,    0,    0, 0]
	// [0,  cos,  sin, 0]
	// [0, -sin,  cos, 0]
	// [0,    0,    0, 1]
	static RotationX(angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		let mat = Matrix4x4.Identity;
		mat[5] = cosAngle;
		mat[6] = sinAngle;
		mat[9] = -sinAngle;
		mat[10] = cosAngle;
		return mat;
	}

	// [cos, 0, -sin, 0]
	// [  0, 1,    0, 0]
	// [sin, 0,  cos, 0]
	// [  0, 0,    0, 1]
	static RotationY(angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		let mat = Matrix4x4.Identity;
		mat[0] = cosAngle;
		mat[2] = -sinAngle;
		mat[8] = sinAngle;
		mat[10] = cosAngle;
		return mat;
	}

	// [ cos, sin, 0, 0]
	// [-sin, cos, 0, 0]
	// [   0,   0, 0, 0]
	// [   0,   0, 0, 1]
	static RotationZ(angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		let mat = Matrix4x4.Identity;
		mat[0] = cosAngle;
		mat[1] = sinAngle;
		mat[4] = -sinAngle;
		mat[5] = cosAngle;
		return mat;
	}

	// Applied as roll, pitch, yaw
	static RotationAngles(pitch, yaw, roll)
	{
		// Sin and cos of each
		let sinP = Math.sin(pitch);
		let sinY = Math.sin(yaw);
		let sinR = Math.sin(roll);

		let cosP = Math.cos(pitch);
		let cosY = Math.cos(yaw);
		let cosR = Math.cos(roll);

		let mat = new Matrix4x4();

		mat[0] = cosR * cosY + sinR * sinP * sinY;
		mat[1] = sinR * cosP;
		mat[2] = sinR * sinP * cosY + cosR * sinY;
		mat[3] = 0;

		mat[4] = cosR * sinP * sinY - sinR * cosY;
		mat[5] = cosR * cosP;
		mat[6] = sinR * sinY + cosR * sinP * cosY;
		mat[7] = 0;

		mat[8] = cosP * sinY;
		mat[9] = -sinP;
		mat[10] = cosP * cosY;
		mat[11] = 0;

		mat[12] = 0;
		mat[13] = 0;
		mat[14] = 0;
		mat[15] = 1;

		return mat;
	}

	static RotationAnglesV(vec3)
	{
		return Matrix4x4.RotationAngles(vec3.x, vec3.y, vec3.z);
	}

	// [x, 0, 0, 0]
	// [0, y, 0, 0]
	// [0, 0, z, 0]
	// [0, 0, 0, 1]
	static Scale(x, y, z)
	{
		let mat = Matrix4x4.Identity;
		mat[0] = x;
		mat[5] = y;
		mat[10] = z;
		return mat;
	}

	static ScaleV(vec3)
	{
		let mat = Matrix4x4.Identity;
		mat[0] = vec3.x;
		mat[5] = vec3.y;
		mat[10] = vec3.z;
		return mat;
	}

	static ScaleUniform(s)
	{
		let mat = Matrix4x4.Identity;
		mat[0] = s;
		mat[5] = s
		mat[10] = s;
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
		let offset;
		let b_0, b_1, b_2, b_3;
		for (let row = 0; row < 4; row++)
		{
			offset = row * 4;
			b_0 = b[0 + offset];
			b_1 = b[1 + offset];
			b_2 = b[2 + offset];
			b_3 = b[3 + offset];

			mat[0 + offset] = b_0 * a_00 + b_1 * a_10 + b_2 * a_20 + b_3 * a_30;
			mat[1 + offset] = b_0 * a_01 + b_1 * a_11 + b_2 * a_21 + b_3 * a_31;
			mat[2 + offset] = b_0 * a_02 + b_1 * a_12 + b_2 * a_22 + b_3 * a_32;
			mat[3 + offset] = b_0 * a_03 + b_1 * a_13 + b_2 * a_23 + b_3 * a_33;
		}

		return mat;
	}


	static ViewDirectionLH(eyePos, viewDir, up)
	{
		// Rotation directions
		let zDir = Vector3.Normalize(viewDir);
		let xDir = Vector3.Normalize(Vector3.Cross(up, zDir));
		let yDir = Vector3.Cross(zDir, xDir);

		// Translation portion
		let negPos = Vector3.Negate(eyePos);
		let tx = Vector3.Dot(xDir, negPos);
		let ty = Vector3.Dot(yDir, negPos);
		let tz = Vector3.Dot(zDir, negPos);

		// Transpose as we store
		let mat = new Matrix4x4();

		mat[0] = xDir.x;
		mat[1] = yDir.x;
		mat[2] = zDir.x;
		mat[3] = 0;

		mat[4] = xDir.y;
		mat[5] = yDir.y;
		mat[6] = zDir.y;
		mat[7] = 0;

		mat[8] = xDir.z;
		mat[9] = yDir.z;
		mat[10] = zDir.z;
		mat[11] = 0;

		mat[12] = tx;
		mat[13] = ty;
		mat[14] = tz;
		mat[15] = 1;

		return mat;
	}

	static ViewPositionLH(eyePos, targetPos, up)
	{
		let viewDir = Vector3.Subtract(targetPos, eyePos);
		return Matrix4x4.ViewDirectionLH(eyePos, viewDir, up);
	}

	// [width, 0,      0,               0]
	// [0,     height, 0,               0]
	// [0,     0,      fRange,          1]
	// [0,     0,      -fRange * nearZ, 0]
	static PerspectiveFovLH(fovAngleY, aspectRatio, nearZ, farZ)
	{
		const sinFov = Math.sin(0.5 * fovAngleY);
		const cosFov = Math.cos(0.5 * fovAngleY);

		const height = cosFov / sinFov;
		const width = height / aspectRatio;
		const fRange = farZ / (farZ - nearZ);

		let mat = new Matrix4x4();

		mat[0] = width;
		mat[5] = height;
		mat[10] = fRange;
		mat[11] = 1.0;
		mat[14] = -fRange * nearZ;

		return mat;
	}

	// -------------------------------------------
	// ------------- Fill functions  -------------
	// -------------------------------------------

	static FillIdentity(mat)
	{
		mat[0] = 1.0;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = 1.0;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = 1.0;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;
		return mat;
	}

	// [1, 0, 0, 0]
	// [0, 1, 0, 0]
	// [0, 0, 1, 0]
	// [x, y, z, 1]
	static FillTranslation(mat, x, y, z)
	{
		mat[0] = 1.0;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = 1.0;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = 1.0;
		mat[11] = 0.0;

		mat[12] = x;
		mat[13] = y;
		mat[14] = z;
		mat[15] = 1.0;
		return mat;
	}


	static FillTranslationV(mat, vec3)
	{
		mat[0] = 1.0;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = 1.0;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = 1.0;
		mat[11] = 0.0;

		mat[12] = vec3.x;
		mat[13] = vec3.y;
		mat[14] = vec3.z;
		mat[15] = 1.0;
		return mat;
	}


	// [1,    0,    0, 0]
	// [0,  cos,  sin, 0]
	// [0, -sin,  cos, 0]
	// [0,    0,    0, 1]
	static FillRotationX(mat, angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		mat[0] = 1.0;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = cosAngle;
		mat[6] = sinAngle;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = -sinAngle;
		mat[10] = cosAngle;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;

		return mat;
	}

	// [cos, 0, -sin, 0]
	// [  0, 1,    0, 0]
	// [sin, 0,  cos, 0]
	// [  0, 0,    0, 1]
	static FillRotationY(mat, angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		mat[0] = cosAngle;
		mat[1] = 0.0;
		mat[2] = -sinAngle;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = 1.0;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = sinAngle;
		mat[9] = 0.0;
		mat[10] = cosAngle;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;

		return mat;
	}

	// [ cos, sin, 0, 0]
	// [-sin, cos, 0, 0]
	// [   0,   0, 0, 0]
	// [   0,   0, 0, 1]
	static FillRotationZ(mat, angle)
	{
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		mat[0] = cosAngle;
		mat[1] = sinAngle;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = -sinAngle;
		mat[5] = cosAngle;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = 1.0;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;

		return mat;
	}

	// [x, 0, 0, 0]
	// [0, y, 0, 0]
	// [0, 0, z, 0]
	// [0, 0, 0, 1]
	static FillScale(mat, x, y, z)
	{
		mat[0] = x;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = y;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = z;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;
		return mat;
	}

	
	static FillScaleV(mat, vec3)
	{
		mat[0] = vec3.x;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = vec3.y;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = vec3.z;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;

		return mat;
	}


	static FillScaleUniform(mat, s)
	{
		mat[0] = s;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = s;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = s;
		mat[11] = 0.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = 0.0;
		mat[15] = 1.0;

		return mat;
	}


	// [width, 0,      0,               0]
	// [0,     height, 0,               0]
	// [0,     0,      fRange,          1]
	// [0,     0,      -fRange * nearZ, 0]
	static FillPerspectiveFovLH(mat, fovAngleY, aspectRatio, nearZ, farZ)
	{
		const sinFov = Math.sin(0.5 * fovAngleY);
		const cosFov = Math.cos(0.5 * fovAngleY);

		const height = cosFov / sinFov;
		const width = height / aspectRatio;
		const fRange = farZ / (farZ - nearZ);

		mat[0] = width;
		mat[1] = 0.0;
		mat[2] = 0.0;
		mat[3] = 0.0;

		mat[4] = 0.0;
		mat[5] = height;
		mat[6] = 0.0;
		mat[7] = 0.0;

		mat[8] = 0.0;
		mat[9] = 0.0;
		mat[10] = fRange;
		mat[11] = 1.0;

		mat[12] = 0.0;
		mat[13] = 0.0;
		mat[14] = -fRange * nearZ;
		mat[15] = 0.0;

		return mat;
	}
}