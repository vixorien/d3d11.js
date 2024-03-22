
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

	// Velocity
	#velocityOrbit;
	#velocityRotate;
	#velocityDistance;
	#velocityPosition;

	constructor(distance, aspectRatio, fov = Math.PI / 4, nearClip = 0.01, farClip = 100)
	{
		super(aspectRatio, fov, nearClip, farClip);

		this.#distance = distance;

		this.#focusPosition = Vector3.Zero;
		this.#pitchYawRoll = Vector3.Zero;

		this.#updateForward();
		this.#updatePosition();
		this.#updateView();

		this.#velocityDistance = 0;
		this.#velocityOrbit = Vector3.Zero;
		this.#velocityRotate = Vector3.Zero;
		this.#velocityPosition = Vector3.Zero;

		
	}

	Update(input, dt)
	{
		let wheel = input.GetMouseWheel();
		if(wheel != 0)
		{
			this.#velocityDistance += wheel * 0.01;
		}

		if (input.IsMouseDown(MouseButtons.Left))
		{
			this.#velocityOrbit.x += input.GetMouseDeltaY() * 0.0005;
			this.#velocityOrbit.y += input.GetMouseDeltaX() * 0.0005;
		}
		else if (input.IsMouseDown(MouseButtons.Right))
		{
			let speed = 2 * dt;
			let cameraMoveRelative = Vector3.Zero;
			let cameraMoveAbsolute = Vector3.Zero;
			let anyMove = false;
			if (input.IsKeyDown(Keys.A)) { anyMove = true; cameraMoveRelative.x -= speed; }
			if (input.IsKeyDown(Keys.D)) { anyMove = true; cameraMoveRelative.x += speed; }
			if (input.IsKeyDown(Keys.W)) { anyMove = true; cameraMoveRelative.z += speed; }
			if (input.IsKeyDown(Keys.S)) { anyMove = true; cameraMoveRelative.z -= speed; }
			if (input.IsKeyDown(Keys.Space)) { anyMove = true; cameraMoveAbsolute.y += speed; }
			if (input.IsKeyDown(Keys.X)) { anyMove = true; cameraMoveAbsolute.y -= speed; }

			if (anyMove)
			{
				// Relative movement based on rotation
				let moveRelative = Vector3.Rotate(cameraMoveRelative, this.#pitchYawRoll.x, this.#pitchYawRoll.y, 0);
				this.#velocityPosition = Vector3.Add(this.#velocityPosition, moveRelative);

				// Absolute movement
				this.#velocityPosition = Vector3.Add(this.#velocityPosition, cameraMoveAbsolute);
			}

			this.#velocityRotate.x += input.GetMouseDeltaY() * 0.0005;
			this.#velocityRotate.y += input.GetMouseDeltaX() * 0.0005;
		}

		// Rotate velocity
		{
			// Rotate the forward vector
			this.#pitchYawRoll = Vector3.Add(this.#pitchYawRoll, this.#velocityRotate);

			// Move the focus position according to this new forward vector
			let newFwd = Vector3.Transform(Vector3.UnitZ, Matrix4x4.RotationAnglesV(this.#pitchYawRoll));
			this.#focusPosition = Vector3.Add(this.#position, Vector3.Multiply(newFwd, this.#distance));

			this.#velocityRotate = Vector3.Multiply(this.#velocityRotate, 0.9);
		}

		// Orbit velocity
		{
			this.#pitchYawRoll = Vector3.Add(this.#pitchYawRoll, this.#velocityOrbit);
			this.#velocityOrbit = Vector3.Multiply(this.#velocityOrbit, 0.9);
		}

		// Limit pitch
		{
			let offset = 0.1;
			let halfPI = Math.PI / 2;
			if (this.#pitchYawRoll.x < -halfPI + offset)
				this.#pitchYawRoll.x = -halfPI + offset;
			else if (this.#pitchYawRoll.x > halfPI - offset)
				this.#pitchYawRoll.x = halfPI - offset;
		}

		// Distance velocity
		{
			this.#distance += this.#velocityDistance;
			this.#distance = Math.max(this.#distance, 0.1);
			this.#velocityDistance *= 0.7;
		}

		// Position velocity
		{
			this.#focusPosition = Vector3.Add(this.#focusPosition, this.#velocityPosition);
			this.#velocityPosition = Vector3.Multiply(this.#velocityPosition, 0.9);
		}

		// Final forward vector and position update based on changes
		{
			this.#updateForward();
			this.#updatePosition();
		}

		// Update the view matrix 
		this.#updateView();
	}

	#updatePosition()
	{
		this.#position = Vector3.Add(this.#focusPosition, Vector3.Multiply(this.#forwardVector, -this.#distance));
	}

	#updateForward()
	{
		let mat = Matrix4x4.RotationAnglesV(this.#pitchYawRoll);
		this.#forwardVector = Vector3.Normalize(Vector3.Transform(Vector3.UnitZ, mat));
	}

	#updateView()
	{
		this.#viewMatrix = Matrix4x4.ViewPositionLH(
			this.#position,
			this.#focusPosition,
			Vector3.UnitY);
	}
}