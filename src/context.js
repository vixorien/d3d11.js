
// -----------------------------------------------------
// ------------------ Device Context -------------------
// -----------------------------------------------------

class ID3D11DeviceContext extends ID3D11DeviceChild
{
	#gl;

	// General pipeline ---
	#backBufferFramebuffer;
	#readbackFrameBuffer;

	// General shaders ---
	#maxCombinedTextures;
	#shaderProgramMap;
	#currentShaderProgram;
	#currentCBufferMap;
	#currentTextureSamplerMap;
	#textureMipStatus;
	#shadersDirty;

	// Input Assembler ---
	#inputAssemblerDirty;
	#inputLayout;
	#primitiveTopology

	#vertexBuffers;
	#vertexBufferStrides;
	#vertexBufferOffsets;

	#indexBuffer;
	#indexBufferFormat;

	// Vertex Shader ---
	#vertexShader;
	#maxVSTextures;
	#maxVSConstantBuffers;
	#vsConstantBuffers;
	#vsConstantBuffersDirty;

	// Rasterizer ---
	#viewport;
	#scissorRect;
	#rasterizerState;
	#defaultRasterizerDesc;
	#rasterizerDirty;
	#viewportDirty;
	#scissorRectDirty

	// Pixel Shader ---
	#pixelShader;
	#maxPSTextures;
	#maxPSConstantBuffers;
	#psConstantBuffers;
	#psConstantBuffersDirty;
	#psShaderResources;
	#psShaderResourcesDirty;
	#psSamplers;
	#psSamplersDirty;

	// Output Merger ---
	#renderTargetViews;
	#depthStencilView;
	#depthStencilState;
	#stencilRef;
	#defaultDepthStencilDesc;
	#outputMergerDirty;

	constructor(device)
	{
		super(device);

		// Abstract check
		if (new.target === ID3D11DeviceContext)
		{
			this.Release();
			throw new Error("Cannot instantiate ID3D11DeviceContext objects - use device.GetImmediateContext() or D3D11CreateDeviceAndSwapChain() instead");
		}

		this.#gl = device.GetAdapter();

		// Set some defaults
		// TODO: Extrapolate this into proper states
		this.#gl.enable(this.#gl.CULL_FACE); // Turns on culling (default is backs)
		this.#gl.frontFace(this.#gl.CW);	 // Clockwise fronts to match D3D
		this.#gl.enable(this.#gl.DEPTH_TEST);

		// General
		this.#backBufferFramebuffer = device.GetBackBufferFramebuffer();
		this.#readbackFrameBuffer = this.#gl.createFramebuffer();

		// General shaders
		this.#shaderProgramMap = new Map();
		this.#maxCombinedTextures = this.#gl.getParameter(this.#gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
		this.#textureMipStatus = Array(this.#maxCombinedTextures).fill(false);
		this.#currentShaderProgram = null;
		this.#currentCBufferMap = null;
		this.#shadersDirty = true;

		// Input Assembler
		{
			this.#inputAssemblerDirty = true;
			this.#inputLayout = null;
			this.#primitiveTopology = D3D11_PRIMITIVE_TOPOLOGY_UNDEFINED;

			this.#vertexBuffers = [];
			this.#vertexBufferStrides = [];
			this.#vertexBufferOffsets = [];

			this.#indexBuffer = null;
			this.#indexBufferFormat = DXGI_FORMAT_R16_UINT;
		}

		// Vertex Shader
		{
			this.#vertexShader = null;
			this.#maxVSTextures = this.#gl.getParameter(this.#gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
			this.#maxVSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_VERTEX_UNIFORM_BLOCKS);

			this.#vsConstantBuffers = Array(this.#maxVSConstantBuffers).fill(null);

			this.#vsConstantBuffersDirty = true;
		}

		// Rasterizer
		{
			this.#viewport = null;
			this.#viewportDirty = true;
			this.#scissorRect = new D3D11_RECT(0, 0, 0, 0); // D3D11 default is empty box
			this.#scissorRectDirty = true;
			this.#rasterizerState = null;
			this.#rasterizerDirty = true;

			this.#defaultRasterizerDesc = new D3D11_RASTERIZER_DESC(
				D3D11_FILL_SOLID,
				D3D11_CULL_BACK);
		}

		// Pixel Shader
		{
			this.#pixelShader = null;
			this.#maxPSTextures = this.#gl.getParameter(this.#gl.MAX_TEXTURE_IMAGE_UNITS);
			this.#maxPSConstantBuffers = this.#gl.getParameter(this.#gl.MAX_FRAGMENT_UNIFORM_BLOCKS);

			this.#psConstantBuffers = Array(this.#maxPSConstantBuffers).fill(null);
			this.#psShaderResources = Array(this.#maxPSTextures).fill(null);
			this.#psSamplers = Array(this.#maxPSTextures).fill(null);

			this.#psConstantBuffersDirty = true;
			this.#psShaderResourcesDirty = true;
			this.#psSamplersDirty = true;
		}

		// Output Merger
		{
			this.#renderTargetViews = [];
			this.#depthStencilView = null;
			this.#depthStencilState = null;
			this.#stencilRef = 0;
			this.#outputMergerDirty = true;

			this.#defaultDepthStencilDesc = new D3D11_DEPTH_STENCIL_DESC();
		}
	}

	// Not to spec, but used by the device to dirty the entire pipeline when
	// the device has altered the GL state in some way
	DirtyPipeline()
	{
		this.#inputAssemblerDirty = true;
		this.#shadersDirty = true;
		this.#vsConstantBuffersDirty = true;
		this.#rasterizerDirty = true;
		this.#psConstantBuffersDirty = true;
		this.#psShaderResourcesDirty = true;
		this.#psSamplersDirty = true;
		this.#outputMergerDirty = true;
	}

	// TODO: Handle texture vs. renderbuffer once
	//       that distinction is implemented elsewhere
	// NOTE: No longer restoring bindings after clear!
	// TODO: Clear the entire resource (all mips, array slices and cube faces)
	ClearRenderTargetView(renderTargetView, color)
	{
		// Validate RTV
		if (renderTargetView == null)
			throw new Error("Invalid RenderTargetView for clear");

		// Bind the RTV
		this.#BindBackBufferFramebuffer();
		this.#BindRenderTargets([renderTargetView]);

		// TODO: Turn off buffer write masks, as
		//       D3D does not take those into account when clearing

		let [width, height] = this.#GetActiveRenderTargetSize();
		this.#gl.scissor(0, 0, width, height);

		// Clear
		this.#gl.clearColor(color[0], color[1], color[2], color[3]);
		this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);

		// Need to update rasterizer due to scissor change
		this.#scissorRectDirty = true;
	}


	ClearDepthStencilView(depthStencilView, clearFlags, depth, stencil)
	{
		// Validate DSV
		if (depthStencilView == null)
			throw new Error("Invalid DepthStencilView for clear");

		// Any clear flags?
		let clearingDepth = (clearFlags & D3D11_CLEAR_DEPTH == D3D11_CLEAR_DEPTH);
		let clearingStencil = (clearFlags & D3D11_CLEAR_STENCIL == D3D11_CLEAR_STENCIL);
		if (!clearingDepth && !clearingStencil)
			return;

		// Bind the depth stencil
		this.#BindBackBufferFramebuffer();
		this.#BindDepthStencil(depthStencilView);

		// TODO: Turn off buffer write masks, as
		//       D3D does not take those into account when clearing

		let [width, height] = this.#GetActiveRenderTargetSize();
		this.#gl.scissor(0, 0, width, height);

		// Set values for clears
		let mask = 0;

		if (clearingDepth)
		{
			this.#gl.clearDepth(depth);
			mask |= this.#gl.DEPTH_BUFFER_BIT;
		}

		if (clearingStencil)
		{
			this.#gl.clearStencil(stencil);
			mask |= this.#gl.STENCIL_BUFFER_BIT;
		}

		// Actual clear
		this.#gl.clear(mask);

		// Need to update rasterizer due to scissor change
		this.#scissorRectDirty = true;
	}

	/**
	 * Copies the entirety of a resource to another one, including all subresources.
	 * 
	 * @param {ID3D11Resource} dstResource The destination resource
	 * @param {ID3D11Resource} srcResource The source resource
	 * 
	 * @throws {Error}
	 */
	CopyResource(dstResource, srcResource)
	{
		if (dstResource == srcResource)
			throw new Error("Cannot copy resource when destination and source are the same resource");

		// Check types
		if (dstResource instanceof ID3D11Buffer &&
			srcResource instanceof ID3D11Buffer)
		{
			// Do a buffer-to-buffer copy
			throw new Error("Buffer resource copying not yet implemented!");
		}
		else if (
			dstResource instanceof ID3D11Texture2D &&
			srcResource instanceof ID3D11Texture2D)
		{
			// Validate descriptions match
			let srcDesc = srcResource.GetDesc();
			let dstDesc = dstResource.GetDesc();

			if (dstResource.Usage == D3D11_USAGE_IMMUTABLE)
				throw new Error("Cannot use an immutable resource as a copy destination");

			if (srcDesc.Width != dstDesc.Width ||
				srcDesc.Height != dstDesc.Height ||
				srcDesc.ArraySize != dstDesc.ArraySize ||
				srcDesc.MipLevels != dstDesc.MipLevels)
				throw new Error("Source and destination resources do not match in size or subresource count");

			if (srcDesc.Format != dstDesc.Format)
				throw new Error("Source and destination resources have different formats");

			// Loop through all mips of each array slice
			for (let arrSlice = 0; arrSlice < srcDesc.ArraySize; arrSlice++)
			{
				for (let mip = 0; mip < srcDesc.MipLevels; mip++)
				{
					// Calculate this subresource index and copy
					let subresIndex = D3D11CalcSubresource(mip, arrSlice, srcDesc.MipLevels);
					this.CopySubresourceRegion(dstResource, subresIndex, 0, 0, 0, srcResource, subresIndex, null);
				}
			}
		}
		else
		{
			throw new Error("Resources being copied do not match or are not yet implemented!");
		}
	}

	/**
	 * Copy a region from a source resource to a destination resource
	 * 
	 * @param {ID3D11Resource} dstResource The destination resource.
	 * @param {Number} dstSubresource Zero-based destination subresource index.  Use {@see D3D11CalcSubresource} to calculate.
	 * @param {Number} dstX The x-coordinate of the upper left corner of the destination region.
	 * @param {Number} dstY The y-coordinate of the upper left corner of the destination region. For a 1D subresource, this must be zero.
	 * @param {Number} dstZ The z-coordinate of the upper left corner of the destination region. For a 1D or 2D subresource, this must be zero.
	 * @param {ID3D11Resource} srcResource The source resource.
	 * @param {Number} srcSubresource Zero-based source subresource index.  Use {@see D3D11CalcSubresource} to calculate.
	 * @param {D3D11_BOX} srcBox A box that defines a portion of the subresource to read, or null for the entire subresource.  An empty box results in no data being copied.
	 *
	 * @throws {Error}
	 */
	CopySubresourceRegion(dstResource, dstSubresource, dstX, dstY, dstZ, srcResource, srcSubresource, srcBox = null)
	{
		// Is the box empty?  If so, nothing to do.
		if (srcBox != null && srcBox.IsEmpty())
			return;

		// Grab descriptions and validate
		let srcDesc = srcResource.GetDesc();
		let dstDesc = dstResource.GetDesc();

		// Validate resource details
		if (dstDesc.Usage == D3D11_USAGE_IMMUTABLE)
			throw new Error("Cannot copy into an immutable resource");

		// Validate subresource indices
		this.#ValidateSubresourceIndex(srcDesc, srcSubresource);
		this.#ValidateSubresourceIndex(dstDesc, dstSubresource);

		// Same exact subresource?
		if (srcResource == dstResource &&
			srcSubresource == dstSubresource)
			throw new Error("Cannot use the same subresource as both the source and destination of a copy");

		// Must have the same format
		if (srcDesc.Format != dstDesc.Format)
			throw new Error("Source and destination must have same format when copying");

		// If one is a buffer, they both must be buffers
		let srcIsBuffer = srcResource instanceof ID3D11Buffer;
		let dstIsBuffer = dstResource instanceof ID3D11Buffer;
		if ((srcIsBuffer && !dstIsBuffer) ||
			(dstIsBuffer && !srcIsBuffer))
			throw new Error("Source and destination must be the same type (buffer or texture) when copying");

		// SOURCE resource first ---------------------
		if (srcResource instanceof ID3D11Texture2D)
		{
			// dstZ must be zero for 1D and 2D textures
			if (dstZ != 0)
				throw new Error("Invalid destination Z value for 2D textures - must be zero");

			// Validate the source box
			if (srcBox != null)
			{
				let srcArraySlice = Math.floor(srcSubresource / srcDesc.MipLevels);
				let srcMipSlice = srcSubresource - (srcArraySlice * srcDesc.MipLevels);
				let div = Math.pow(2, srcMipSlice);
				let srcMipWidth = Math.max(1, Math.floor(dstDesc.Width / div));
				let srcMipHeight = Math.max(1, Math.floor(dstDesc.Height / div));

				if (srcBox.Left < 0 || srcBox.Right > srcMipWidth ||
					srcBox.Top < 0 || srcBox.Bottom > srcMipHeight)
					throw new Error("Source box extends outside source resource dimensions for mip level " + srcMipSlice);
			}
		}
		else
		{
			throw new Error("Given source resource is invalid or not yet implemented!");
		}

		// DESTINATION resource and copy -------------
		if (dstResource instanceof ID3D11Texture2D)
		{
			// Calculate destination subresource details
			let dstArraySlice = Math.floor(dstSubresource / dstDesc.MipLevels);
			let dstMipSlice = dstSubresource - (dstArraySlice * dstDesc.MipLevels);
			let dstIsArray = dstDesc.ArraySize > 1;
			let dstIsCubemap = (dstDesc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE;

			// Calculate size of the mip
			let div = Math.pow(2, dstMipSlice);
			let dstMipWidth = Math.max(1, Math.floor(dstDesc.Width / div));
			let dstMipHeight = Math.max(1, Math.floor(dstDesc.Height / div));

			// Actual offsets
			let x = 0;
			let y = 0;
			let width = dstMipWidth;
			let height = dstMipHeight;
			if (srcBox != null)
			{
				x = srcBox.Left;
				y = dstMipHeight - srcBox.Bottom; // Flip the Y
				width = srcBox.Right - srcBox.Left;
				height = srcBox.Bottom - srcBox.Top;

				// Update the destination location Y, too
				let dstBottom = dstY + height;
				dstY = dstMipHeight - dstBottom;
			}

			// Validate the desintation offsets, too
			if (dstX < 0 ||
				dstY < 0 ||
				dstX + width > dstMipWidth ||
				dstY + height > dstMipHeight)
				throw new Error("Destination offset extends outside destination resource dimensions for mip level " + dstMipSlice);

			// Validate cube map array slice
			if (dstIsCubemap && (dstArraySlice < 0 || dstArraySlice >= 6))
				throw new Error("Invalid subresource for cube map copying");

			// Should be all good, so actually bind the framebuffer
			this.#BindSubresourceAsReadFramebuffer(srcResource, srcDesc, srcSubresource);

			// Assume the output merger is dirty due to the framebuffer change
			// TODO: Determine if this is necessary, since it's only changing the read buffer?
			this.#outputMergerDirty = true;

			// Which function for copying
			if (!dstIsArray || dstIsCubemap)
			{
				// Which GL texture target?
				let target = this.#gl.TEXTURE_2D;
				if (dstIsCubemap)
				{
					switch (dstArraySlice)
					{
						case 0: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
						case 1: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
						case 2: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break; // FLIP Y!
						case 3: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break; // FLIP Y!
						case 4: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
						case 5: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					}

					// Also bind as a cube map target
					this.#gl.bindTexture(this.#gl.TEXTURE_CUBE_MAP, dstResource.GetGLResource());
				}
				else
				{
					// Regular texture2d binding for the target
					this.#gl.bindTexture(this.#gl.TEXTURE_2D, dstResource.GetGLResource());
				}

				// Use the basic copy function
				this.#gl.copyTexSubImage2D(
					target,
					dstMipSlice,
					dstX,
					dstY,
					x, y, width, height);
			}
			else
			{
				// Bind the target before copy
				this.#gl.bindTexture(this.#gl.TEXTURE_2D_ARRAY, dstResource.GetGLResource());

				// Is an array and NOT a cube map, so we
				// need to use the specific function that
				// allows us to specify the array slice
				this.#gl.copyTexSubImage3D(
					this.#gl.TEXTURE_2D_ARRAY,
					dstMipSlice,
					dstX,
					dstY,
					dstArraySlice,
					x, y, width, height);
			}
		}
		else
		{
			throw new Error("Given destination resource is invalid or not yet implemented!");
		}
	}

	#ValidateSubresourceIndex(resourceDesc, subresourceIndex)
	{
		let maxSubresource = D3D11CalcSubresource(
			resourceDesc.MipLevels - 1,
			resourceDesc.ArraySize - 1,
			resourceDesc.MipLevels);
		if (subresourceIndex < 0 || subresourceIndex > maxSubresource)
			throw new Error("Invalid subresource index");
	}

	#BindSubresourceAsReadFramebuffer(resource, desc, subresource)
	{
		// Set up the read framebuffer
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, this.#readbackFrameBuffer);

		// Calculate subresource details from indices
		let arraySlice = Math.floor(subresource / desc.MipLevels);
		let mipSlice = subresource - (arraySlice * desc.MipLevels);

		// If this is a texture array (and not a cube map), we
		// need to use a different function for binding
		let isCubemap = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);
		let isArray = desc.ArraySize > 1;

		// Which function?
		if (!isArray || isCubemap)
		{
			// Which GL texture target?
			let target = this.#gl.TEXTURE_2D;
			if (isCubemap)
			{
				switch (arraySlice)
				{
					case 0: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
					case 1: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
					case 2: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break; // FLIP Y!
					case 3: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break; // FLIP Y!
					case 4: target = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
					case 5: target = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					default: throw new Error("Invalid subresource for cube map reading");
				}
			}

			// Bind for reading
			this.#gl.framebufferTexture2D(
				this.#gl.READ_FRAMEBUFFER,
				this.#gl.COLOR_ATTACHMENT0,
				target,
				resource.GetGLResource(),
				mipSlice);
		}
		else
		{
			// Is an array and NOT a cube map, so we
			// need to use the specific function that
			// allows us to specify the array slice
			this.#gl.framebufferTextureLayer(
				this.#gl.READ_FRAMEBUFFER,
				this.#gl.COLOR_ATTACHMENT0,
				resource.GetGLResource(),
				mipSlice,
				arraySlice);
		}
	}


	GenerateMips(shaderResourceView)
	{
		// Get the base resource of the view to check bind flags
		let res = shaderResourceView.GetResource();
		let desc = res.GetDesc();

		// If the resource isn't set up for generating mip maps,
		// this method has no effect (according to the spec).
		// TODO: Also check for SRV and RTV, as per spec?
		if ((desc.MiscFlags & D3D11_RESOURCE_MISC_GENERATE_MIPS) == 0)
		{
			res.Release();
			return;
		}
		
		// Perform the generation
		let glTarget = res.GetGLTarget();
		this.#gl.bindTexture(glTarget, res.GetGLResource());
		this.#gl.generateMipmap(glTarget);

		// Pipeline might be dirty
		this.DirtyPipeline();

		// Done with resource
		res.Release();
	}


	IASetInputLayout(inputLayout)
	{
		this.#inputLayout = inputLayout;
		this.#inputAssemblerDirty = true;
	}


	// TODO: Validate format!
	// Note: The D3D11 version takes a third param - offset - which is 
	//       a byte offset into the buffer.  WebGL has no such param.
	IASetIndexBuffer(indexBuffer, format)
	{
		this.#indexBuffer = indexBuffer;
		this.#indexBufferFormat = format;

		// Determine if we're binding or unbinding
		if (indexBuffer == null)
			this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, null);
		else
			this.#gl.bindBuffer(this.#gl.ELEMENT_ARRAY_BUFFER, this.#indexBuffer.GetGLResource());

		this.#inputAssemblerDirty = true;
	}

	IASetPrimitiveTopology(topology)
	{
		// Note: All vertex shaders have "gl_PointSize = 1.0"
		// to account for D3D points always being exactly 1 pixel
		this.#primitiveTopology = topology;
	}

	// TODO: Actually use params
	// TODO: Limit num buffers to actual WebGL max
	// TODO: Don't reset buffer array entirely - just update various elements
	IASetVertexBuffers(startSlot, buffers, strides, offsets)
	{
		// Reset existing vb data
		this.#vertexBuffers = [];
		this.#vertexBufferStrides = [];
		this.#vertexBufferOffsets = [];

		// Save buffers in correct slots
		for (let i = 0; i < buffers.length; i++)
		{
			this.#vertexBuffers[startSlot + i] = buffers[i];
			this.#vertexBufferStrides[startSlot + i] = strides[i];
			this.#vertexBufferOffsets[startSlot + i] = offsets[i];
		}

		this.#inputAssemblerDirty = true;
	}

	VSSetShader(vertexShader)
	{
		this.#vertexShader = vertexShader;
		this.#shadersDirty = true;
	}

	VSSetConstantBuffers(startSlot, constantBuffers)
	{
		// Validate overall slots
		if (startSlot + constantBuffers.length < 0 ||
			startSlot + constantBuffers.length >= this.#maxVSConstantBuffers)
			throw new Error("Attempting to set VS constant buffers outside valid range");

		// Place buffers in contiguous slots, offset by starting index
		for (let c = 0; c < constantBuffers.length; c++)
		{
			this.#vsConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#vsConstantBuffersDirty = true;
	}

	RSGetState()
	{
		if (this.#rasterizerState == null)
			return null;

		this.#rasterizerState.AddRef();
		return this.#rasterizerState;
	}


	RSSetState(rasterizerState)
	{
		// TODO: Type check the state?
		this.#rasterizerState = rasterizerState;
		this.#rasterizerDirty = true;
	}

	/**
	 * Gets the scissor rectangle currently bound to the rasterizer stage
	 * 
	 * @returns {Array<D3D11_RECT>} An array containing the current scissor rect
	 */
	RSGetScissorRects()
	{
		return [structuredClone(this.#scissorRect)];
	}

	/**
	 * Sets the scissor rectangle for the rasterizer.
	 * Note that even though the function takes an array of
	 * rectangles, only the first is used in d3d11.js.  
	 * 
	 * @param {Array<D3D11_RECT>} rects Array of scissor rects.  Note that only the first scissor rect is used in d3d11.js.
	 */
	RSSetScissorRects(rects)
	{
		// Copy the first element
		this.#scissorRect = structuredClone(rects[0]);
		this.#scissorRectDirty = true;
		this.#rasterizerDirty = true; // TODO: See if we can optimize this so we don't need to update the entire stage
	}

	/**
	 * Gets the viewport currently bound to the rasterizer stage
	 * 
	 * @returns {Array<D3D11_VIEWPORT>} An array containing the current viewport
	 */
	RSGetViewports()
	{
		return [structuredClone(this.#viewport)];
	}

	/**
	 * Sets the viewport for the rasterizer.  
	 * Note that even though the function takes an array of
	 * viewports, only the first is used in d3d11.js.  
	 * 
	 * @param {Array<D3D11_VIEWPORT>} viewports Array of viewports.  Note that only the first viewport is used in d3d11.js.
	 */
	RSSetViewports(viewports)
	{
		// Copy the first element
		this.#viewport = structuredClone(viewports[0]);
		this.#viewportDirty = true;
	}

	PSSetShader(pixelShader)
	{
		this.#pixelShader = pixelShader;
		this.#shadersDirty = true;
	}

	PSSetConstantBuffers(startSlot, constantBuffers)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + constantBuffers.length >= this.#maxPSConstantBuffers)
			throw new Error("Attempting to set PS constant buffers outside valid range");

		// Place buffers in contiguous slots, offset by starting index
		for (let c = 0; c < constantBuffers.length; c++)
		{
			this.#psConstantBuffers[c + startSlot] = constantBuffers[c];
		}

		this.#psConstantBuffersDirty = true;
	}

	// TODO: Handle null samplers simply holding the default sampler
	PSSetSamplers(startSlot, samplers)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + samplers.length >= this.#maxPSTextures)
			throw new Error("Attempting to set PS samplers outside valid range");

		// Place samplers in contiguos slots, offset by starting index
		for (let i = 0; i < samplers.length; i++)
		{
			this.#psSamplers[i + startSlot] = samplers[i];
		}

		this.#psSamplersDirty = true;
	}

	// TODO: Handle resources already bound as output?
	PSSetShaderResources(startSlot, shaderResourceViews)
	{
		// Validate overall slots
		if (startSlot < 0 ||
			startSlot + shaderResourceViews.length >= this.#maxPSTextures)
			throw new Error("Attempting to set PS shader resources outside valid range");

		// Place resource views in contiguos slots, offset by starting index
		for (let i = 0; i < shaderResourceViews.length; i++)
		{
			this.#psShaderResources[i + startSlot] = shaderResourceViews[i];
		}
		
		this.#psShaderResourcesDirty = true;
	}


	OMSetDepthStencilState(depthStencilState, stencilRef)
	{
		this.#depthStencilState = depthStencilState;
		this.#stencilRef = stencilRef;
		this.#outputMergerDirty = true;
	}

	// TODO: Handle multiple render targets
	// TODO: Unbind when rtv parameter is empty/null
	// TODO: Validate render target details?
	// TODO: Check input/output bindings?  (UGH)
	OMSetRenderTargets(renderTargetViews, depthStencilView)
	{
		if (renderTargetViews == null || renderTargetViews.length == 0)
			throw new Error("Unbinding render targets not yet implemented!");

		if (renderTargetViews.length > 1)
			throw new Error("Multiple render targets not yet implemented!");

		// Save and dirty
		this.#renderTargetViews = renderTargetViews.slice(); // Copy
		this.#depthStencilView = depthStencilView;
		this.#outputMergerDirty = true;
		this.#viewportDirty = true; // Need to "re-flip" the viewport!
	}

	OMGetRenderTargets()
	{
		return [this.#renderTargetViews.slice(), this.#depthStencilView];
	}

	// TODO: Handle instancing
	// TODO: Error reporting if state isn't set
	#PrepareInputAssembler()
	{
		if (!this.#inputAssemblerDirty || this.#inputLayout == null)
			return;

		// Handle each input element
		let inputElementDescs = this.#inputLayout.GetInputElementDescs();
		let currentBufferIndex = -1;

		for (let i = 0; i < inputElementDescs.length; i++)
		{
			// Grab this element and associated data
			// TODO: bake format details into the input layout to save time here?
			let ie = inputElementDescs[i];
			let dataType = this.#GetDXGIFormatDataType(ie.Format);
			let compCount = this.#GetDXGIFormatComponentCount(ie.Format);

			// Do we have this buffer?
			let bufferIndex = ie.InputSlot;
			if (bufferIndex >= this.#vertexBuffers.length)
				continue;

			// Bind the correct buffer for this element
			if (bufferIndex != currentBufferIndex) // TODO: Performance worry?  Or skip
			{
				this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#vertexBuffers[bufferIndex].GetGLResource());
				currentBufferIndex = bufferIndex;
			}

			// Enable this attribute and then set up the details
			this.#gl.enableVertexAttribArray(i);
			this.#gl.vertexAttribPointer(
				i, // Index
				compCount, // Component count (1 - 4)
				dataType, // gl.FLOAT, gl.INT, etc.
				false, // Normalized - only for non-float types
				this.#vertexBufferStrides[bufferIndex],
				this.#vertexBufferOffsets[bufferIndex] + ie.AlignedByteOffset); // TOOD: Verify this is correct
		}

		this.#inputAssemblerDirty = false;
	}

	#PrepareShaders()
	{
		// Any work to do?
		if (!this.#shadersDirty)
			return;
		
		// Do we have proper shaders?
		// NOTE: WebGL appears to require both a vertex and pixel shader!
		// TODO: Determine if we can simply provide an "empty"/"basic" PS when PS is null?
		if (this.#vertexShader == null) throw new Error("No vertex shader bound!");
		if (this.#pixelShader == null) throw new Error("No pixel shader bound!");

		// Determine if we've seen this vertex shader before
		if (!this.#shaderProgramMap.has(this.#vertexShader))
		{
			this.#shaderProgramMap.set(this.#vertexShader, new Map());
		}

		// Determine if we've seen this pixel shader before
		let vsMap = this.#shaderProgramMap.get(this.#vertexShader);
		if (!vsMap.has(this.#pixelShader))
		{
			// Create texture/sampler arrays
			let vsTextureArray = Array(this.#maxVSTextures);
			let vsSamplerArray = Array(this.#maxVSTextures);
			let psTextureArray = Array(this.#maxPSTextures);
			let psSamplerArray = Array(this.#maxPSTextures);
			for (let i = 0; i < this.#maxVSTextures; i++)
			{
				vsTextureArray[i] = [];
				vsSamplerArray[i] = [];
			}
			for (let i = 0; i < this.#maxPSTextures; i++)
			{
				psTextureArray[i] = [];
				psSamplerArray[i] = [];
			}

			// We now have a combined VS+PS set
			vsMap.set(this.#pixelShader, {
				GLProgram: null,

				// This maps a D3D register index to a GL uniform block index
				// Note that the CB indices are laid out [vsCBs][psCBs+maxVSCBs]
				CBufferMap: Array(this.#maxVSConstantBuffers + this.#maxPSConstantBuffers).fill(-1),

				// Mapping D3D register indices to uniform locations
				// Note that a single texture or register may map to multiple locations
				// due to the texture/sampler combinations (t0 + s0 != t0 + s1)
				// TODO: Determine if these array sizes make sense - any register could
				//       really map to any uniform block.  Might be able to align with D3D
				//       register limits instead, though is that necessary?
				TextureSamplerMap:
				{
					VSTextures: vsTextureArray,
					VSSamplers: vsSamplerArray,
					PSTextures: psTextureArray,
					PSSamplers: psSamplerArray
				}
			}); // Note: May want to store more stuff?
		}

		// Does this program exist?
		let vspsMap = vsMap.get(this.#pixelShader);
		let prog = vspsMap.GLProgram;
		if (prog == null)
		{
			// Create the program and cache for later
			prog = this.#CreateShaderProgram(this.#vertexShader, this.#pixelShader);
			vspsMap.GLProgram = prog;

			// Now that we have a program, cache cbuffer (uniform buffer) indices

			// Start with vertex shader cbuffers
			let vsCBs = this.#vertexShader.GetCBuffers();
			for (let v = 0; v < vsCBs.length; v++)
			{
				let cb = vsCBs[v];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxVSConstantBuffers)
					throw new Error("Invalid register index for vertex shader constant buffer");

				// Get the uniform block index using the GL-translated name
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.NameGL);

				// Store in the map
				vspsMap.CBufferMap[cb.RegisterIndex] = ubIndex;
			}

			// Next, pixel shader cbuffers
			let psCBs = this.#pixelShader.GetCBuffers();
			for (let p = 0; p < psCBs.length; p++)
			{
				let cb = psCBs[p];

				// Validate index
				if (cb.RegisterIndex < 0 || cb.RegisterIndex >= this.#maxPSConstantBuffers)
					throw new Error("Invalid register index for pixel shader constant buffer");

				// Get the uniform block index using the GL-translated name
				let ubIndex = this.#gl.getUniformBlockIndex(prog, cb.NameGL);

				// Store in the map - Note the offset for uniform block indices, since
				// we need PS indices to start after all possible VS indices
				let offsetPSIndex = cb.RegisterIndex + this.#maxVSConstantBuffers;
				vspsMap.CBufferMap[offsetPSIndex] = ubIndex;
			}

			// Next, cache texture/sampler combinations
			let currentTextureUnit = 0;

			// Start with vertex shader t/s combos
			let vsTexSampCombos = this.#vertexShader.GetTextureSamplerCombinations();
			for (let i = 0; i < vsTexSampCombos.length; i++)
			{
				let tsc = vsTexSampCombos[i];

				// Have we run out of VS texture units?
				if (currentTextureUnit >= this.#maxVSTextures)
					throw new Error("Too many vertex shader texture/sampler combinations in use!");

				// Which D3D registers?
				let tReg = tsc.Texture.RegisterIndex;
				let sReg = tsc.Sampler.RegisterIndex;

				// Which GL uniform location for the combined name?
				let uniformLoc = this.#gl.getUniformLocation(prog, tsc.CombinedName);

				// Add this data to maps at the proper indices (registers)
				vspsMap.TextureSamplerMap.VSTextures[tReg].push({ TextureUnit: currentTextureUnit, UniformLocation: uniformLoc });
				vspsMap.TextureSamplerMap.VSSamplers[sReg].push(currentTextureUnit);

				// Move on to the next unit
				currentTextureUnit++;
			}

			// Then the PS combos
			let psTexSampCombos = this.#pixelShader.GetTextureSamplerCombinations();
			for (let i = 0; i < psTexSampCombos.length; i++)
			{
				let tsc = psTexSampCombos[i];
				
				// Have we run out of PS texture units?
				if (currentTextureUnit >= this.#maxPSTextures)
					throw new Error("Too many pixel shader texture/sampler combinations in use!");

				// Have we run out of TOTAL texture units?
				if (currentTextureUnit >= this.#maxCombinedTextures)
					throw new Error("Too many total texture/sampler combinations in use!");

				// Which D3D registers?
				let tReg = tsc.Texture.RegisterIndex;
				let sReg = tsc.Sampler.RegisterIndex;

				// Which GL uniform location for the combined name?
				let uniformLoc = this.#gl.getUniformLocation(prog, tsc.CombinedName);

				// Add this data to maps at the proper indices (registers)
				vspsMap.TextureSamplerMap.PSTextures[tReg].push({ TextureUnit: currentTextureUnit, UniformLocation: uniformLoc });
				vspsMap.TextureSamplerMap.PSSamplers[sReg].push(currentTextureUnit);

				// Move on to the next unit
				currentTextureUnit++;
			}
		}

		// Activate this program and we're clean
		this.#gl.useProgram(prog);
		this.#currentShaderProgram = prog;
		this.#currentCBufferMap = vspsMap.CBufferMap;
		this.#currentTextureSamplerMap = vspsMap.TextureSamplerMap;
		this.#shadersDirty = false;

		// TODO: See if we can cut down on the following for performance reasons...

		// After shader program swap, we need to double check cbuffers
		this.#vsConstantBuffersDirty = true;
		this.#psConstantBuffersDirty = true;

		// Also check textures/samplers
		this.#psSamplersDirty = true;
		this.#psShaderResourcesDirty = true;
	}

	#CreateShaderProgram(vs, ps)
	{
		// Create the new program and attach shaders
		let program = this.#gl.createProgram();
		this.#gl.attachShader(program, vs.GetGLShader());
		this.#gl.attachShader(program, ps.GetGLShader());

		// Link and check status
		this.#gl.linkProgram(program);
		let linkSuccess = this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS);
		if (!linkSuccess)
		{
			throw new Error("Error linking shaders: " + this.#gl.getProgramInfoLog(program));
		}

		// Validate and check status
		this.#gl.validateProgram(program);
		let validSuccess = this.#gl.getProgramParameter(program, this.#gl.VALIDATE_STATUS);
		if (!validSuccess)
		{
			throw new Error("Error validating shaders: " + this.#gl.getProgramInfoLog(program));
		}

		return program;
	}

	#PrepareConstantBuffers()
	{
		// Bind all VS cbuffers to the proper registers, then map them to uniform block indices
		if (this.#vsConstantBuffersDirty)
		{
			for (let v = 0; v < this.#vsConstantBuffers.length; v++)
			{
				let cb = this.#vsConstantBuffers[v];
	
				// Check to see if the shader program expects a buffer
				let ubIndex = this.#currentCBufferMap[v];
				if (ubIndex == -1 || cb == null)
				{
					// Doesn't want this buffer, so unbind
					this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, v, null);
				}
				else
				{
					// Bind to correct "register slot"
					this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, v, cb.GetGLResource());

					// Map the "register slot" to the uniform block index in the program
					this.#gl.uniformBlockBinding(this.#currentShaderProgram, ubIndex, v);
				}
			}
		}

		// Bind all PS cbuffers, too - taking into account an offset to put them after all VS cbuffers
		if (this.#psConstantBuffersDirty)
		{
			for (let p = 0; p < this.#psConstantBuffers.length; p++)
			{
				let cb = this.#psConstantBuffers[p];

				// Expecting a buffer? (Use PS offset index)
				let psIndex = p + this.#maxVSConstantBuffers;
				let ubIndex = this.#currentCBufferMap[psIndex];
				if (ubIndex == -1 || cb == null)
				{
					// Doesn't want this buffer, so unbind
					this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, psIndex, null);
				}
				else
				{
					// Bind to correct "register slot", taking into account VS register offset
					this.#gl.bindBufferBase(this.#gl.UNIFORM_BUFFER, psIndex, cb.GetGLResource());

					// Map the "register slot" to the uniform block index in the program
					this.#gl.uniformBlockBinding(this.#currentShaderProgram, ubIndex, psIndex);
				}
			}
		}

		// All clean
		this.#vsConstantBuffersDirty = false;
		this.#psConstantBuffersDirty = false;
	}

	#PrepareTexturesAndSamplers()
	{
		// Reset mip status
		this.#textureMipStatus.fill(false);

		// TODO: Handle vertex textures

		if (this.#psShaderResourcesDirty)
		{
			// Go through each resource slot
			for (let i = 0; i < this.#psShaderResources.length; i++)
			{
				let srv = this.#psShaderResources[i];
				if (srv == null)
					continue;

				// Grab the associated data from the map and loop through all possible gl binds
				let texMap = this.#currentTextureSamplerMap.PSTextures[i];
				for (let t = 0; t < texMap.length; t++)
				{
					// Grab this resource and first check its mip status
					let res = srv.GetResource();
					let glTarget = res.GetGLTarget();
					this.#textureMipStatus[texMap[t].TextureUnit] = (res.GetDesc().MipLevels != 1);

					// Activate the proper texture unit, bind this resource and set the uniform location
					this.#gl.activeTexture(this.#GetGLTextureUnit(texMap[t].TextureUnit));
					this.#gl.bindTexture(glTarget, res.GetGLResource());
					this.#gl.uniform1i(texMap[t].UniformLocation, texMap[t].TextureUnit);

					// Set SRV-specific texture properties
					let srvDesc = srv.GetDesc();
					let baseMip = srvDesc.MostDetailedMip;
					let maxMip = srvDesc.MostDetailedMip + srvDesc.MipLevels - 1;
					this.#gl.texParameteri(glTarget, this.#gl.TEXTURE_BASE_LEVEL, baseMip);
					this.#gl.texParameteri(glTarget, this.#gl.TEXTURE_MAX_LEVEL, maxMip);

					// TODO: Set sampler-specific texture properties (aniso level)

					// Release the resource ref
					res.Release();
				}
			}

			// TODO: Unbind leftover slots?  How do we know which ones aren't in use?

		}

		if (this.#psSamplersDirty)
		{
			// Go through each resource slot
			for (let i = 0; i < this.#psSamplers.length; i++)
			{
				let sampState = this.#psSamplers[i];
				if (sampState == null)
					continue;

				// Grab the data from this spot in the map
				let sampMap = this.#currentTextureSamplerMap.PSSamplers[i];
				for (let s = 0; s < sampMap.length; s++)
				{
					// Get the proper sampler version (with or without mips)
					const mips = this.#textureMipStatus[sampMap[s]];
					this.#gl.bindSampler(sampMap[s], sampState.GetGLSampler(mips));
				}
			}
		}


		// All clean
		this.#psSamplersDirty = false;
		this.#psShaderResourcesDirty = false;
	}

	#GetGLTextureUnit(index)
	{
		return this.#gl.TEXTURE0 + index;
	}


	/**
	 * Gets the height of the current render target and/or depth buffer
	 * (if there is no render target currently bound)
	 * 
	 * @returns {number} The height of the current RTV/DSV, or zero if there are none bound
	 */
	#GetActiveRenderTargetSize()
	{
		let rtWidth = 0;
		let rtHeight = 0;

		// Any RTVs?
		if (this.#renderTargetViews != null)
		{
			// Get the first render target in the RTV list (might not be zero)
			for (let i = 0; i < this.#renderTargetViews.length; i++)
			{
				// Found an RTV; grab details
				if (this.#renderTargetViews[i] != null)
				{
					// Height of actual target
					let rtRes = this.#renderTargetViews[i].GetResource();
					rtWidth = rtRes.GetDesc().Width;
					rtHeight = rtRes.GetDesc().Height;
					rtRes.Release();

					// Use mip level to calculate height
					let mip = this.#renderTargetViews[i].GetDesc().MipSlice;
					let div = Math.pow(2, mip);
					rtWidth = Math.max(1, Math.floor(rtWidth / div));
					rtHeight = Math.max(1, Math.floor(rtHeight / div));
					break;
				}
			}
		}

		// If we're still zero, check depth stencil instead
		if (rtHeight == 0 && this.#depthStencilView != null)
		{
			// Height of actual resource
			let dsvRes = this.#depthStencilView.GetResource();
			rtWidth = dsvRes.GetDesc().Width;
			rtHeight = dsvRes.GetDesc().Height;
			dsvRes.Release();

			// Use mip level to calculate height
			let mip = this.#depthStencilView.GetDesc().MipSlice;
			let div = Math.pow(2, mip);
			rtWidth = Math.max(1, Math.floor(rtWidth / div));
			rtHeight = Math.max(1, Math.floor(rtHeight / div));
		}

		return [rtWidth, rtHeight];
	}

	
	#PrepareRasterizer()
	{
		// We need to flip the Y on viewports & scissor rects, so
		// what's the actual render target height?
		let rtWidth = 0;
		let rtHeight = 0;
		if (this.#viewportDirty || this.#scissorRectDirty)
		{
			[rtWidth, rtHeight] = this.#GetActiveRenderTargetSize();
		}
		
		// Need to update viewport (and we have a real height)?
		if (this.#viewportDirty && this.#viewport != null && rtHeight > 0 && rtWidth > 0)
		{
			// Perform the invert
			let invertY = rtHeight - this.#viewport.Height;

			// Set up the GL viewport first, flipping Y
			this.#gl.viewport(
				this.#viewport.TopLeftX,
				invertY - this.#viewport.TopLeftY,
				this.#viewport.Width,
				this.#viewport.Height);

			// Next the depth range
			this.#gl.depthRange(
				this.#viewport.MinDepth,
				this.#viewport.MaxDepth);

			this.#viewportDirty = false;
		}

		// Need to update scissor rect (and we have a real height)?
		if (this.#scissorRectDirty && rtHeight > 0 && rtWidth > 0)
		{
			// Invert the Y
			let scissorWidth = this.#scissorRect.Right - this.#scissorRect.Left;
			let scissorHeight = this.#scissorRect.Bottom - this.#scissorRect.Top;
			let invertY = rtHeight - scissorHeight;

			// Set up the GL scissor rect
			this.#gl.scissor(
				this.#scissorRect.Left,
				invertY - this.#scissorRect.Top,
				scissorWidth,
				scissorHeight);
			
			// All clean
			this.#scissorRectDirty = false;
		}

		// Check for overall rasterizer state
		if (!this.#rasterizerDirty)
			return;

		// Which description are we using?
		let desc;
		if (this.#rasterizerState == null)
			desc = this.#defaultRasterizerDesc;
		else
			desc = this.#rasterizerState.GetDesc();

		// Fill mode - Solid only for now! (Wireframe isn't an option in WebGL)

		// Cull mode
		switch (desc.CullMode)
		{
			case D3D11_CULL_BACK:
				this.#gl.enable(this.#gl.CULL_FACE);
				this.#gl.cullFace(this.#gl.BACK);
				break;

			case D3D11_CULL_FRONT:
				this.#gl.enable(this.#gl.CULL_FACE);
				this.#gl.cullFace(this.#gl.FRONT);
				break;

			case D3D11_CULL_NONE:
			default:
				this.#gl.disable(this.#gl.CULL_FACE);
				break;
		}

		// Front Counter Clockwise for flipping the default winding order
		this.#gl.frontFace(desc.FrontCounterClockwise ? this.#gl.CCW : this.#gl.CW);

		// Depth bias
		if (desc.DepthBias == 0 && desc.SlopeScaleDepthBias == 0)
		{
			// Turn off biasing ("polygon offset")
			this.#gl.disable(this.#gl.POLYGON_OFFSET_FILL);
		}
		else
		{
			// Biasing is on with at least one of the params
			this.#gl.enable(this.#gl.POLYGON_OFFSET_FILL);
			this.#gl.polygonOffset(
				desc.SlopeScaleDepthBias,	// Assuming slope scale is "factor"
				desc.DepthBias);			// And depth bias is "units"
		}

		// No depth bias clamp in WebGL?

		// Depth clip enable - not present in webgl?

		// Scissor
		if (desc.ScissorEnable)
			this.#gl.enable(this.#gl.SCISSOR_TEST);
		else
			this.#gl.disable(this.#gl.SCISSOR_TEST);

		// Multisample - not currently implemented!

		this.#rasterizerDirty = false;
	}

	// TODO: Split Render Target and DS state dirty flags?
	// TODO: Move framebuffer binding above dirty flag so it's ALWAYS set each draw?
	#PrepareOutputMerger()
	{
		if (!this.#outputMergerDirty)
			return;

		// Handle depth-stencil state
		{
			let desc;
			if (this.#depthStencilState == null)
				desc = this.#defaultDepthStencilDesc;
			else
				desc = this.#depthStencilState.GetDesc();

			// Depth enable
			if (desc.DepthEnable)
				this.#gl.enable(this.#gl.DEPTH_TEST);
			else
				this.#gl.disable(this.#gl.DEPTH_TEST);

			// Depth write mask
			if (desc.DepthWriteMask == D3D11_DEPTH_WRITE_MASK_ZERO)
				this.#gl.depthMask(false);
			else if (desc.DepthWriteMask == D3D11_DEPTH_WRITE_MASK_ALL)
				this.#gl.depthMask(true);

			// Depth function
			this.#gl.depthFunc(this.#GetGLComparisonFunc(desc.DepthFunc));

			// TODO: Implement stencil!

		}

		// Ensure the framebuffer is bound first
		this.#BindBackBufferFramebuffer();

		// Bind the render target and depth buffer as necessary
		this.#BindRenderTargets(this.#renderTargetViews);
		this.#BindDepthStencil(this.#depthStencilView);

		// All done
		this.#outputMergerDirty = false;
	}

	#BindBackBufferFramebuffer()
	{
		// Remove from the read framebuffer just in case
		this.#gl.bindFramebuffer(this.#gl.READ_FRAMEBUFFER, null);
		this.#gl.bindFramebuffer(this.#gl.DRAW_FRAMEBUFFER, this.#backBufferFramebuffer);
	}

	// TODO: Handle texture vs. render buffer
	// TODO: Test out RTV/Resource combinations:
	//       - 2D RTV, 2D Resource
	//       - 2D Array RTV, 2D Resource
	//       - 2D RTV, 2D Array Resource
	//       - 2D Array RTV, 2D Array Resource
	#BindRenderTargets(rtvs)
	{
		// Any RTVs?
		if (rtvs.length > 0)
		{
			// TODO: Multiple render targets
			let rtvResource = rtvs[0].GetResource();
			let resDesc = rtvResource.GetDesc();
			let viewDesc = rtvs[0].GetDesc();

			// Which texture type?
			if (!(rtvResource instanceof ID3D11Texture2D))
				throw new Error("RTV texture type OM binding not yet implemented");

			// Is this RTV a single texture, an array or a cube map?
			if ((resDesc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE)
			{
				// It's (presumably) a cube map, so bind the proper target
				let glTarget;
				switch (viewDesc.FirstArraySlice)
				{
					case 0: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
					case 1: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
					case 2: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break;
					case 3: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break;
					case 4: glTarget = this.#gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
					case 5: glTarget = this.#gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
					default:
						throw new Error("Only array slices 0-5 are valid for texture cube RTVs");
				}

				// Bind the proper cube face
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					glTarget,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice);
			}
			else if (resDesc.ArraySize > 1)
			{
				// Texture2D Array resource, so we need a different GL function
				this.#gl.framebufferTextureLayer(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice,
					viewDesc.FirstArraySlice);
			}
			else
			{
				// Just a standard (non-array) Texture2D
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.COLOR_ATTACHMENT0,
					this.#gl.TEXTURE_2D,
					rtvResource.GetGLResource(),
					viewDesc.MipSlice);
			}

			// Done with ref
			rtvResource.Release();
		}
	}

	#BindDepthStencil(dsv)
	{
		// Any depth?
		if (dsv == null)
		{
			// Unbind depth/stencil
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				this.#gl.DEPTH_STENCIL_ATTACHMENT,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				null,
				0);

			// Unbind just depth, too (just in case)
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				this.#gl.DEPTH_ATTACHMENT,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				null,
				0);
		}
		else
		{
			let dsvResource = dsv.GetResource();
			let viewDesc = dsv.GetDesc();

			// Does this have a stencil buffer?
			let hasStencil = (viewDesc.Format == DXGI_FORMAT_D24_UNORM_S8_UINT);
			let attach = hasStencil ? this.#gl.DEPTH_STENCIL_ATTACHMENT : this.#gl.DEPTH_ATTACHMENT;

			if (!hasStencil)
			{
				// Unbind the combined depth/stencil just in case
				this.#gl.framebufferTexture2D(
					this.#gl.DRAW_FRAMEBUFFER,
					this.#gl.DEPTH_STENCIL_ATTACHMENT,
					this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
					null,
					0);
			}

			// Bind the depth texture
			this.#gl.framebufferTexture2D(
				this.#gl.DRAW_FRAMEBUFFER,
				attach,
				this.#gl.TEXTURE_2D, // TODO: Handle cube faces?
				dsvResource.GetGLResource(),
				viewDesc.MipSlice); // TODO: Verify this actually works?  Docs say ZERO only!
			
			// Done with ref
			dsvResource.Release();
		}
	}

	Draw(vertexCount, startVertexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		this.#PrepareTexturesAndSamplers();
		this.#PrepareOutputMerger();
		this.#PrepareRasterizer(); // Rasterizer AFTER output merger due to scissor needing up-to-date render target details!

		this.#gl.drawArrays(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			startVertexLocation,
			vertexCount);
	}

	// Note: D3D11 has a third param - baseVertexLocation - that is added to
	//       each index.  WebGL has no such param (there is an extension that
	//       was proposed but hasn't been implemented yet)
	DrawIndexed(indexCount, startIndexLocation)
	{
		this.#PrepareInputAssembler();
		this.#PrepareShaders();
		this.#PrepareConstantBuffers();
		this.#PrepareTexturesAndSamplers();
		this.#PrepareOutputMerger();
		this.#PrepareRasterizer(); // Rasterizer AFTER output merger due to scissor needing up-to-date render target details!

		// Get proper format
		let format = this.#gl.UNSIGNED_SHORT;
		switch (this.#indexBufferFormat)
		{
			case DXGI_FORMAT_R16_UINT: format = this.#gl.UNSIGNED_SHORT; break;
			case DXGI_FORMAT_R32_UINT: format = this.#gl.UNSIGNED_INT; break;
		}

		// Perform draw
		this.#gl.drawElements(
			this.#GetGLPrimitiveType(this.#primitiveTopology),
			indexCount,
			format,
			startIndexLocation);
	}

	/**
	 * Sends queued up commands to the GPU to be processed
	 */
	Flush()
	{
		// TODO: Experiement with flush() vs. finish()
		this.#gl.finish();
	}

	// NOTE: Not using all of the params just yet
	// TODO: Support texture updates once textures are working
	UpdateSubresource(dstResource, dstSubresource, dstBox, srcData, srcRowPitch, srcDepthPitch)
	{
		// If this is a standard buffer, we ignore most params and just set the data
		if (dstResource instanceof ID3D11Buffer)
		{
			// Check for immutable
			// Note: Some D3D docs say this shouldn't work on dynamic usage, others say it's fine
			if (dstResource.GetDesc().Usage == D3D11_USAGE_IMMUTABLE)
				throw new Error("Cannot update immutable resource");

			// Subresource must be zero here
			if (dstSubresource != 0)
				throw new Error("Invalid subresource (" + dstSubresource + ") used for buffer update");

			// No box update on buffers
			if (dstBox != null)
				throw new Error("Cannot update a box within a buffer resource");

			// Bind and update
			this.#gl.bindBuffer(this.#gl.UNIFORM_BUFFER, dstResource.GetGLResource());
			this.#gl.bufferSubData(
				this.#gl.UNIFORM_BUFFER,
				0,
				srcData);
		}
		else
		{
			throw new Error("Updating non-buffer resource not yet implemented!");
		}
	}

	// NOTE: Assuming floats only for now!
	// TODO: Make this actually check!
	#GetDXGIFormatDataType(format)
	{
		return this.#gl.FLOAT;
	}

	// NOTE: Assuming only floats and only 1-4 for now!
	#GetDXGIFormatComponentCount(format)
	{
		switch (format)
		{
			case DXGI_FORMAT_R32_FLOAT: return 1;
			case DXGI_FORMAT_R32G32_FLOAT: return 2;
			case DXGI_FORMAT_R32G32B32_FLOAT: return 3;
			case DXGI_FORMAT_R32G32B32A32_FLOAT: return 4;
			default: return 0;
		}
	}

	#GetGLComparisonFunc(func)
	{
		switch (func)
		{
			case D3D11_COMPARISON_NEVER: return this.#gl.NEVER;
			case D3D11_COMPARISON_LESS: return this.#gl.LESS;
			case D3D11_COMPARISON_EQUAL: return this.#gl.EQUAL;
			case D3D11_COMPARISON_LESS_EQUAL: return this.#gl.LEQUAL;
			case D3D11_COMPARISON_GREATER: return this.#gl.GREATER;
			case D3D11_COMPARISON_NOT_EQUAL: return this.#gl.NOTEQUAL;
			case D3D11_COMPARISON_GREATER_EQUAL: return this.#gl.GEQUAL;
			case D3D11_COMPARISON_ALWAYS: return this.#gl.ALWAYS;
			default: throw new Error("Invalid comparison function");
		}
	}

	#GetGLPrimitiveType(d3dPrimType)
	{
		switch (d3dPrimType)
		{
			case D3D11_PRIMITIVE_TOPOLOGY_POINTLIST: return this.#gl.POINTS;
			case D3D11_PRIMITIVE_TOPOLOGY_LINELIST: return this.#gl.LINES;
			case D3D11_PRIMITIVE_TOPOLOGY_LINESTRIP: return this.#gl.LINE_STRIP;
			case D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST: return this.#gl.TRIANGLES;
			case D3D11_PRIMITIVE_TOPOLOGY_TRIANGLESTRIP: return this.#gl.TRIANGLE_STRIP;

			// Default to triangles
			case D3D11_PRIMITIVE_TOPOLOGY_UNDEFINED:
			default: return this.#gl.TRIANGLES;
		}
	}
}