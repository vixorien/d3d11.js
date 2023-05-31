
// -----------------------------------------------------
// -------------------- Swap Chain ---------------------
// -----------------------------------------------------

class IDXGISwapChain extends IUnknown
{
	#device;
	#gl;
	#backBuffer;
	#finalCopyFramebuffer;

	// TODO: Take in a description to customize back buffer!
	constructor(device)
	{
		super();
		this.#device = device;
		this.#gl = device.GetAdapter();

		// Create the "back buffer"
		let bbDesc = new D3D11_TEXTURE2D_DESC(
			this.#gl.canvas.width,		// TODO: parameterize?
			this.#gl.canvas.height,		// TODO: parameterize?
			1,
			1,
			DXGI_FORMAT_R8G8B8A8_UNORM,	// TODO: parameterize!
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_RENDER_TARGET,	// TODO: parameterize!
			0, 0);

		this.#backBuffer = this.#device.CreateTexture2D(bbDesc, null);

		// Create a frame buffer for the final blit on Present()
		this.#finalCopyFramebuffer = this.#gl.createFramebuffer();
	}


	GetBuffer()
	{
		this.#backBuffer.AddRef();
		return this.#backBuffer;
	}

	// Blit from the back buffer to the default frame buffer
	Present()
	{
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
		let w = this.#gl.canvas.width;
		let h = this.#gl.canvas.height;
		this.#gl.blitFramebuffer(
			0, 0, w, h, // Source L,T,R,B
			0, 0, w, h, // Dest L,T,R,B
			this.#gl.COLOR_BUFFER_BIT, // Colors only
			this.#gl.NEAREST); // No interpolation
		// TODO: Determine if interpolation (LINEAR) makes sense here

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
}