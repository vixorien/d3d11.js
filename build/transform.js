
import { Vector3, Matrix4x4 } from "./d3dmath.js";

export class Transform
{
	#position;
	#pitchYawRoll;
	#scale;

	#worldDirty;
	#worldMat;
	#worldInvTransMat;

	get Position() { return this.#position.slice(); }
	get PitchYawRoll() { return this.#pitchYawRoll.slice(); }
	get Scale() { return this.#scale.slice(); }

	get WorldMatrix() { this.#UpdateWorldMatrix(); return this.#worldMat.slice(); }
	get WorldInvTransMatrix() { this.#UpdateWorldMatrix(); return this.#worldInvTransMat.slice(); }

	constructor()
	{
		this.#position = new Vector3(0, 0, 0);
		this.#pitchYawRoll = new Vector3(0, 0, 0);
		this.#scale = new Vector3(1, 1, 1);

		this.#worldMat = Matrix4x4.Identity();
		this.#worldInvTransMat = Matrix4x4.Identity();

		this.#worldDirty = false;
	}

	SetPosition(x, y, z)
	{
		this.#position.x = x;
		this.#position.y = y;
		this.#position.z = z;
		this.#worldDirty = true;
	}

	SetPitchYawRoll(p, y, r)
	{
		this.#pitchYawRoll.x = p;
		this.#pitchYawRoll.y = y;
		this.#pitchYawRoll.z = r;
		this.#worldDirty = true;
	}

	SetScale(x, y, z)
	{
		this.#scale.x = x;
		this.#scale.y = y;
		this.#scale.z = z;
		this.#worldDirty = true;
	}

	SetScaleUniform(s)
	{
		this.#scale.x = s;
		this.#scale.y = s;
		this.#scale.z = s;
		this.#worldDirty = true;
	}

	MoveAbsolute(x, y, z)
	{
		this.#position.x += x;
		this.#position.y += y;
		this.#position.z += z;
		this.#worldDirty = true;
	}

	Rotate(p, y, r)
	{
		this.#pitchYawRoll.x += p;
		this.#pitchYawRoll.y += y;
		this.#pitchYawRoll.z += r;
		this.#worldDirty = true;
	}

	Scale(x, y, z)
	{
		this.#scale.x *= x;
		this.#scale.y *= y;
		this.#scale.z *= z;
		this.#worldDirty = true;
	}

	ScaleUniform(s)
	{
		this.#scale.x *= s;
		this.#scale.y *= s;
		this.#scale.z *= s;
		this.#worldDirty = true;
	}

	#UpdateWorldMatrix()
	{
		if (!this.#worldDirty)
			return;

		// Update the matrix here
		let tMat = Matrix4x4.TranslationV(this.#position);
		let rMat = Matrix4x4.RotationAnglesV(this.#pitchYawRoll);
		let sMat = Matrix4x4.ScaleV(this.#scale);

		this.#worldMat =
			Matrix4x4.Multiply(sMat,
				Matrix4x4.Multiply(rMat, tMat));

		// TODO: Inverse transpose!

		this.#worldDirty = false;
	}
}