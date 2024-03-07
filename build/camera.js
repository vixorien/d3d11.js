
import { Keys, MouseButtons } from "./input.js";
import { Vector3, Matrix4x4 } from "./d3dmath.js";
import { Transform } from "./transform.js";

class Camera
{
	get ProjectionMatrix() { this.#updateProjection(); return this.#projMatrix; }

	get AspectRatio() { return this.#aspectRatio; }
	set AspectRatio(ar) { this.#aspectRatio = ar; this.#projDirty = true; }

	// Projection
	#aspectRatio;
	#fov;
	#nearClip;
	#farClip;

	// Projection matrix
	#projMatrix;
	#projDirty;

	constructor(aspectRatio, fov = Math.PI / 4, nearClip = 0.01, farClip = 100)
	{
		this.#aspectRatio = aspectRatio;
		this.#fov = fov;
		this.#nearClip = nearClip;
		this.#farClip = farClip;

		this.#projDirty = true;
		this.#updateProjection();
	}

	#updateProjection()
	{
		if (!this.#projDirty)
			return;

		this.#projMatrix = Matrix4x4.PerspectiveFovLH(this.#fov, this.#aspectRatio, this.#nearClip, this.#farClip);
		this.#projDirty = false;
	}

}

export class FPSCamera extends Camera
{
	get ViewMatrix() { this.#updateView(); return this.#viewMatrix; }

	get Forward() { return this.#forwardVector; }
	get Position() { return this.#position; }
	get PitchYawRoll() { return this.#pitchYawRoll; }


	// View
	#position;
	#pitchYawRoll;
	#forwardVector;

	// Matrices
	#viewMatrix;
	#viewDirty;

	constructor(x, y, z, aspectRatio, fov = Math.PI / 4, nearClip = 0.01, farClip = 100)
	{
		super(aspectRatio, fov, nearClip, farClip);

		this.#position = new Vector3(x, y, z);
		this.#pitchYawRoll = Vector3.Zero;
		this.#forwardVector = Vector3.UnitZ;

		this.#viewDirty = true;
		this.#updateView();
	}

	Update(input, dt)
	{
		// Update
		let speed = 12 * dt;
		if (input.IsKeyDown(Keys.Shift)) speed *= 5;
		if (input.IsMouseDown(MouseButtons.Right)) speed *= 0.15;

		let cameraMoveRelative = new Vector3();
		let cameraMoveAbsolute = new Vector3();
		let anyMove = false;
		if (input.IsKeyDown(Keys.A)) { anyMove = true; cameraMoveRelative.x -= speed; }
		if (input.IsKeyDown(Keys.D)) { anyMove = true; cameraMoveRelative.x += speed; }
		if (input.IsKeyDown(Keys.W)) { anyMove = true; cameraMoveRelative.z += speed; }
		if (input.IsKeyDown(Keys.S)) { anyMove = true; cameraMoveRelative.z -= speed; }
		if (input.IsKeyDown(Keys.Space)) { anyMove = true; cameraMoveAbsolute.y += speed; }
		if (input.IsKeyDown(Keys.X)) { anyMove = true; cameraMoveAbsolute.y -= speed; }

		if (input.IsMouseDown(MouseButtons.Left) || input.IsMouseDown(MouseButtons.Right))
		{
			this.#pitchYawRoll.x += input.GetMouseDeltaY() * 0.001;
			this.#pitchYawRoll.y += input.GetMouseDeltaX() * 0.001;

			// Recompute forward vector
			this.#forwardVector.x = Math.sin(this.#pitchYawRoll.y);
			this.#forwardVector.z = Math.cos(this.#pitchYawRoll.y);
			this.#forwardVector.y = -Math.sin(this.#pitchYawRoll.x);
			this.#forwardVector = Vector3.Normalize(this.#forwardVector);

			this.#viewDirty = true;
		}

		if (anyMove)
		{
			// Relative movement based on rotation
			let moveRelative = Vector3.Rotate(cameraMoveRelative, this.#pitchYawRoll.x, this.#pitchYawRoll.y, 0);
			this.#position = Vector3.Add(this.#position, moveRelative);

			// Absolute movement
			this.#position = Vector3.Add(this.#position, cameraMoveAbsolute);

			this.#viewDirty = true;
		}
	}

	#updateView()
	{
		if (!this.#viewDirty)
			return;

		this.#viewMatrix = Matrix4x4.ViewDirectionLH(this.#position, this.#forwardVector, Vector3.UnitY);
		this.#viewDirty = false;
	}

	
}

export class OrbitCamera extends Camera
{
	get ViewMatrix() { this.#updateView(); return this.#viewMatrix; }

	get Forward() { return this.#forwardVector; }
	get Position() { return this.#position; }
	get FocusPosition() { return this.#focusPosition; }
	get PitchYawRoll() { return this.#pitchYawRoll; }

	// View
	#distance;
	#position;
	#focusPosition;
	#pitchYawRoll;
	#forwardVector;

	// Matrices
	#viewMatrix;
	#viewDirty;

	constructor(distance, aspectRatio, fov = Math.PI / 4, nearClip = 0.01, farClip = 100)
	{
		super(aspectRatio, fov, nearClip, farClip);

		this.#distance = distance;

		this.#focusPosition = Vector3.Zero;
		this.#pitchYawRoll = Vector3.Zero;
		this.#forwardVector = Vector3.UnitZ;
		this.#updatePosition();

		this.#viewDirty = true;
		this.#updateView();
	}

	Update(input, dt)
	{
		let wheel = input.GetMouseWheel();
		if(wheel != 0)
		{
			this.#distance += wheel * 0.01;
			this.#distance = Math.max(this.#distance, 0.1);
			this.#viewDirty = true;
		}

		if (input.IsMouseDown(MouseButtons.Left) || input.IsMouseDown(MouseButtons.Right))
		{
			this.#pitchYawRoll.x += input.GetMouseDeltaY() * 0.01;
			this.#pitchYawRoll.y += input.GetMouseDeltaX() * 0.01;

			// Recompute forward vector
			this.#forwardVector.x = Math.sin(this.#pitchYawRoll.y);
			this.#forwardVector.z = Math.cos(this.#pitchYawRoll.y);
			this.#forwardVector.y = -Math.sin(this.#pitchYawRoll.x);
			this.#forwardVector = Vector3.Normalize(this.#forwardVector);

			this.#viewDirty = true;
		}

		// Update position in the event anything changed
		if (this.#viewDirty)
			this.#updatePosition();
	}

	#updatePosition()
	{
		this.#position = Vector3.Add(this.#focusPosition, Vector3.Multiply(this.#forwardVector, -this.#distance));
	}

	#updateView()
	{
		if (!this.#viewDirty)
			return;

		this.#viewMatrix = Matrix4x4.ViewPositionLH(
			this.#position,
			this.#focusPosition,
			Vector3.UnitY);
		
		this.#viewDirty = false;
	}
}