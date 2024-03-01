
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

	get World() { this.#UpdateWorldMatrix(); return this.#worldMat.slice(); }
	get WorldInvTrans() { this.#UpdateWorldMatrix(); return this.#worldInvTransMat.slice(); }

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

	#UpdateWorldMatrix()
	{
		if (!this.#worldDirty)
			return;

		// Update the matrix here
		let tMat = Matrix4x4.TranslationV(this.#position);
		let rMat = Matrix4x4.RotationZ(this.#pitchYawRoll.z);
		let pMat = Matrix4x4.RotationZ(this.#pitchYawRoll.x);
		let yMat = Matrix4x4.RotationZ(this.#pitchYawRoll.y);
		let sMat = Matrix4x4.ScaleV(this.#scale);

		this.#worldMat = this.#scale;
		this.#worldMat = Matrix4x4.Multiply(this.#worldMat, yMat);
		this.#worldMat = Matrix4x4.Multiply(this.#worldMat, pMat);
		this.#worldMat = Matrix4x4.Multiply(this.#worldMat, rMat);
		this.#worldMat = Matrix4x4.Multiply(this.#worldMat, tMat);

		// TODO: Inverse transpose!

		this.#worldDirty = false;
	}
}