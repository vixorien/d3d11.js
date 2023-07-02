
// -----------------------------------------------------
// -------------------- Swap Chain ---------------------
// -----------------------------------------------------

class IDXGISwapChain extends IUnknown
{
	#desc;
	#device;
	#gl;
	#backBuffer;
	#finalCopyFramebuffer;

	// TODO: Take in a description to customize back buffer!
	constructor(device, desc)
	{
		super();
		this.#desc = Object.assign({}, desc); // Copy
		this.#device = device;
		this.#gl = device.GetAdapter();

		// Validate the description
		if (this.#desc.Width <= 0) throw new Error("Swap Chain width must be greater than zero");
		if (this.#desc.Height <= 0) throw new Error("Swap Chain height must be greater than zero");
		if (this.#desc.Format != DXGI_FORMAT_R8G8B8A8_UNORM &&
			this.#desc.Format != DXGI_FORMAT_R8G8B8A8_UNORM_SRGB)
			throw new Error("Invalid Swap Chain format");

		// Create the back buffer from the description
		this.#CreateBackBuffer();

		// Create a frame buffer for the final blit on Present()
		this.#finalCopyFramebuffer = this.#gl.createFramebuffer();
	}

	/**
	 * Gets the description of this swap chain
	 * 
	 * @returns {DXGI_SWAP_CHAIN_DESC} A copy of the description
	 * */
	GetDesc()
	{
		return Object.assign({}, this.#desc);
	}

	GetBuffer()
	{
		this.#backBuffer.AddRef();
		return this.#backBuffer;
	}

	// Blit from the back buffer to the default frame buffer
	Present()
	{
		// Detach everything from the current READ framebuffer, as this
		// tends to mess with a potentially newly-resized back buffer
		// TODO: Simplify this so we're not making assumptions about what is/is not bound!
		this.#DetachReadFramebuffers();

		// Bind the default frame buffer (null) to the DRAW buffer
		// and the back buffer as the READ buffer
		this.#gl.bindFramebuffer(this.#gl.DRAW_FRAMEBUFFER, null);
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#finalCopyFramebuffer);

		// Attach the back buffer to the read frame buffer
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.TEXTURE_2D,
			this.#backBuffer.GetGLResource(),
			0);

		// Perform the blit
		let w = this.#desc.Width;
		let h = this.#desc.Height;
		this.#gl.blitFramebuffer(
			0, 0, w, h, // Source L,T,R,B
			0, 0, w, h, // Dest L,T,R,B
			this.#gl.COLOR_BUFFER_BIT, // Colors only
			this.#gl.NEAREST); // No interpolation

		// Flush (not strictly necessary)
		this.#gl.flush();
	}


	Release()
	{
		super.Release();

		if (this.GetRef() <= 0)
		{
			this.#backBuffer.Release();
			this.#gl.deleteFramebuffer(this.#finalCopyFramebuffer);
		}
	}

	/**
	 * Resizes the swap chain back buffer if the parameters differ
	 * from the existing back buffer
	 * 
	 * @param {Number} width The new width
	 * @param {Number} height The new height
	 * @param {any} newFormat The new format.  Use DXGI_FORMAT_UNKNOWN to preserve the existing format.
	 */
	ResizeBuffers(width, height, newFormat = DXGI_FORMAT_UNKNOWN)
	{
		// Preserve format?
		if (newFormat == DXGI_FORMAT_UNKNOWN)
			newFormat = this.#desc.Format;

		// Anything to do?
		if (this.#desc.Width == width &&
			this.#desc.Height == height &&
			this.#desc.Format == newFormat)
			return;

		// Validate the parameters
		if (width <= 0) throw new Error("Swap Chain width must be greater than zero");
		if (height <= 0) throw new Error("Swap Chain height must be greater than zero");
		if (newFormat != DXGI_FORMAT_R8G8B8A8_UNORM &&
			newFormat != DXGI_FORMAT_R8G8B8A8_UNORM_SRGB)
			throw new Error("Invalid Swap Chain format");

		// All set, update the description and perform the resize
		this.#desc.Width = width;
		this.#desc.Height = height;
		this.#desc.Format = newFormat;

		// Release the back buffer reference
		this.#backBuffer.Release();
		if (this.#backBuffer.GetRef() != 0)
			throw new Error("One or more outstanding back buffer references exist; cannot resize");

		// Everything checks out, so create the back buffer
		this.#CreateBackBuffer();
	}


	#CreateBackBuffer()
	{
		// Create the "back buffer" description and texture
		let bbDesc = new D3D11_TEXTURE2D_DESC(
			this.#desc.Width,
			this.#desc.Height,
			1,
			1,
			this.#desc.Format,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_RENDER_TARGET,
			0, 0);
		this.#backBuffer = this.#device.CreateTexture2D(bbDesc, null);
	}


	#DetachReadFramebuffers()
	{
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.TEXTURE_2D,
			null,
			0);
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.DEPTH_ATTACHMENT,
			this.#gl.TEXTURE_2D,
			null,
			0);
		this.#gl.framebufferTexture2D(
			this.#gl.READ_FRAMEBUFFER,
			this.#gl.DEPTH_STENCIL_ATTACHMENT,
			this.#gl.TEXTURE_2D,
			null,
			0);

	}

	// JUST FOR TESTING - WILL REMOVE
	#EnumerateFramebufferAttachments()
	{
		let attachNames = ["Color", "Depth", "DepthStencil"];
		let attachments = [
			this.#gl.COLOR_ATTACHMENT0,
			this.#gl.DEPTH_ATTACHMENT,
			this.#gl.DEPTH_STENCIL_ATTACHMENT
		];

		let targetNames = ["Read", "Draw"];
		let targets = [this.#gl.READ_FRAMEBUFFER, this.#gl.DRAW_FRAMEBUFFER];

		for (let t = 0; t < targets.length; t++)
		{
			for (let a = 0; a < attachments.length; a++)
			{
				let param = this.#gl.getFramebufferAttachmentParameter(
					targets[t],
					attachments[a],
					this.#gl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME);

				console.log("Target: " + targetNames[t] + " | Attachment: " + attachNames[a]);
				console.log(param);
				console.log(" ");
			}
		}

		console.log("---");
	}
}