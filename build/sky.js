
import { TextureUtils } from "./textureUtils.js";
import { Vertex } from "./vertex.js";
import { Mesh } from "./mesh.js";

export class Sky
{
	// SRVs and details
	SkyCubeSRV;
	SkyCubeSize;
	SkyColorFormat;

	IrradianceCubeSRV;
	IrradianceCubeSize;
	IrradianceColorFormat;

	SpecularIBLCubeSRV;
	SpecularIBLCubeSize;
	SpecularIBLColorFormat;
	SpecularIBLMipsTotal;
	SpecularIBLMipsToSkip;

	BRDFLookUpTableSRV;
	BRDFLookUpTableSize;
	BRDFLookUpTableColorFormat;

	// Internal D3D stuff
	#d3dDevice;
	#d3dContext;
	#sampler;
	#cbVS;		// Constant buffer for sky rendering vertex shader work
	#cbVSData;	// Data array for vertex shader
	#cbPS;		// Constant buffer for sky rendering & IBL pixel shader work
	#cbPSData;	// Data array for pixel shader

	// Pipeline
	#skyRasterState;
	#skyDepthState;
	#scissorRasterState;

	// HDR specific
	#isHDR;
	#hdrExposure;
	#equirectSRV;

	// Rendering
	#skyVS;
	#skyPS;
	#skyMesh;

	// Pre-calc shaders
	#irrPS;
	#iblSpecPS;
	#brdfLutPS;
	#equirectToCubePS;
	#fullscreenVS;

	// Progressive updating
	#progressiveUpdate = true;
	#maxUpdateTileSize = 128;

	#lutDirty;
	#lutTileUpdate;

	#irrDirty;
	#irrFaceUpdate;
	#irrTileUpdate;

	#specDirty;
	#specMipUpdate;
	#specFaceUpdate;
	#specTileUpdate;


	constructor(
		d3dDevice,
		d3dContext,

		cubeSRV, // Skybox format will be read from here
		isHDR,

		skyVS,
		skyPS,
		skyMesh,

		brdfLutColorFormat,
		brdfLutSize,
		brdfLutPS,

		irrColorFormat,
		irrCubeSize,
		irrPS,

		iblSpecColorFormat,
		iblSpecCubeSize,
		iblSpecMipsToSkip,
		iblSpecPS,

		equirectPS,
		fullscreenVS
	)
	{
		this.#d3dDevice = d3dDevice;
		this.#d3dContext = d3dContext;

		this.#skyPS = skyPS;
		this.#skyVS = skyVS;
		this.#skyMesh = skyMesh;

		this.SkyCubeSRV = cubeSRV;
		this.SkyColorFormat = cubeSRV.GetDesc().Format;
		this.#isHDR = isHDR;

		let cubeRes = cubeSRV.GetResource();
		this.SkyCubeSize = cubeRes.GetDesc().Width;
		cubeRes.Release();

		this.BRDFLookUpTableColorFormat = brdfLutColorFormat;
		this.BRDFLookUpTableSize = brdfLutSize;
		this.#brdfLutPS = brdfLutPS;

		this.IrradianceColorFormat = irrColorFormat;
		this.IrradianceCubeSize = irrCubeSize;
		this.#irrPS = irrPS;

		this.SpecularIBLColorFormat = iblSpecColorFormat;
		this.SpecularIBLCubeSize = iblSpecCubeSize;
		this.SpecularIBLMipsToSkip = iblSpecMipsToSkip;
		this.SpecularIBLMipsTotal = Math.max(Math.log2(iblSpecCubeSize) + 1 - iblSpecMipsToSkip, 1); // Add 1 for 1x1
		this.#iblSpecPS = iblSpecPS;

		this.#equirectToCubePS = equirectPS;
		this.#fullscreenVS = fullscreenVS;

		// Other defaults
		this.#equirectSRV = null;
		this.#hdrExposure = 0;

		// Create a sampler for rendering
		let sampDesc = new D3D11_SAMPLER_DESC(
			D3D11_FILTER_ANISOTROPIC,
			D3D11_TEXTURE_ADDRESS_WRAP,
			D3D11_TEXTURE_ADDRESS_WRAP,
			D3D11_TEXTURE_ADDRESS_WRAP,
			0,
			16,
			0,
			0,
			0,
			D3D11_FLOAT32_MAX);
		this.#sampler = this.#d3dDevice.CreateSamplerState(sampDesc);

		// Create a rasterizer state for rendering the inside of our mesh
		let skyRastDesc = new D3D11_RASTERIZER_DESC(
			D3D11_FILL_SOLID,
			D3D11_CULL_FRONT);
		this.#skyRasterState = this.#d3dDevice.CreateRasterizerState(skyRastDesc);

		// Create a rasterizer state for using a scissor rect
		let scissorDesc = new D3D11_RASTERIZER_DESC(
			D3D11_FILL_SOLID,
			D3D11_CULL_BACK,
			false,
			0,
			0,
			0,
			true,
			true);
		this.#scissorRasterState = this.#d3dDevice.CreateRasterizerState(scissorDesc);

		// Create a depth/stencil state so we accept equal depth values
		let skyDepthDesc = new D3D11_DEPTH_STENCIL_DESC(
			true,
			D3D11_DEPTH_WRITE_MASK_ALL,
			D3D11_COMPARISON_LESS_EQUAL);
		this.#skyDepthState = this.#d3dDevice.CreateDepthStencilState(skyDepthDesc);

		// Create a constant buffer big enough for any sky rendering work
		let psMaxDataSize = 8; // 8 floats worth of data
		let vsMaxDataSize = 16 * 2; // Two matrices worth of data

		// Set up pixel shader constant buffer
		let cbDesc = new D3D11_BUFFER_DESC(
			Float32Array.BYTES_PER_ELEMENT * psMaxDataSize,
			D3D11_USAGE_DYNAMIC,
			D3D11_BIND_CONSTANT_BUFFER,
			D3D11_CPU_ACCESS_WRITE,
			0, 0);
		this.#cbPS = this.#d3dDevice.CreateBuffer(cbDesc, null);

		// Set up vertex shader constant buffer
		cbDesc.ByteWidth = Float32Array.BYTES_PER_ELEMENT * vsMaxDataSize;
		this.#cbVS = this.#d3dDevice.CreateBuffer(cbDesc, null);

		// Set up data arrays
		this.#cbPSData = new Float32Array(psMaxDataSize);
		this.#cbVSData = new Float32Array(vsMaxDataSize);

		// Create the resources (but don't render to them yet)
		this.#CreateBrdfLutTexture();
		this.#CreateIrradianceTexture();
		this.#CreateSpecularIBLTexture();

		// Set dirty to start
		this.#MarkIBLDirty();
		this.#lutDirty = true; // Look up table only needs to be made once
		this.#lutTileUpdate = 0;
	}

	#MarkIBLDirty()
	{
		this.#irrDirty = true;
		this.#irrFaceUpdate = 0;
		this.#irrTileUpdate = 0;

		this.#specDirty = true;
		this.#specMipUpdate = 0;
		this.#specFaceUpdate = 0;
		this.#specTileUpdate = 0;
	}
	

	LoadSixFaces()
	{

	}

	//LoadEquirectNonHDR(width, height, pixelData)
	//{
	//}

	LoadEquirectHDR(width, height, pixelData, hdrExposure = 0)
	{
		if (width <= 0 || height <= 0 || height != width / 2)
			throw new Error("Invalid width and/or height for equirectangular HDR data");

		if (pixelData == null || pixelData.length == 0)
			throw new Error("Invalid or empty pixel data for equirectangular HDR data");

		// Save exposure
		this.#isHDR = true;
		this.#hdrExposure = hdrExposure;

		// Determine the color format
		let format = DXGI_FORMAT_UNKNOWN;
		if (pixelData instanceof Float32Array) format = DXGI_FORMAT_R32G32B32A32_FLOAT;
		else if (pixelData instanceof Uint16Array) format = DXGI_FORMAT_R16G16B16A16_FLOAT;
		else throw new Error("Invalid data type for equirectangular HDR pixel data");

		// Reset if necessary
		if (this.#equirectSRV != null)
			this.#equirectSRV.Release();

		let hdrDesc = new D3D11_TEXTURE2D_DESC(
			width,
			height,
			1,
			1,
			format,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE,
			0,
			0);
		let tex = this.#d3dDevice.CreateTexture2D(hdrDesc, [pixelData]);
		this.#equirectSRV = this.#d3dDevice.CreateShaderResourceView(tex, null);
		tex.Release(); // Just need the SRV

		// Copy the equirect to a cube map
		this.#CopyEquirectToCube();

		// All done
		this.#MarkIBLDirty();
	}

	LoadDDS()
	{

	}

	SetHDRExposure(exp)
	{
		this.#hdrExposure = exp;

		if (this.#isHDR)
		{
			this.#CopyEquirectToCube(); // Update sky cube with new exposure
			this.#MarkIBLDirty(); // Re-create IBL to match
		}
	}

	Update()
	{
		// Perform any asset updates if necessary, ensuring
		// that we do at most one per frame
		if (this.#lutDirty) this.#RenderBrdfLookUpTable();
		else if (this.#irrDirty) this.#RenderIrradianceMap();
		else if (this.#specDirty) this.#RenderSpecularIBLMap();
	}

	Draw(view, proj, mipLevelPreview = 0)
	{
		// Set up states
		this.#d3dContext.RSSetState(this.#skyRasterState);
		this.#d3dContext.OMSetDepthStencilState(this.#skyDepthState);

		// Set up shaders
		this.#d3dContext.VSSetShader(this.#skyVS);
		this.#d3dContext.PSSetShader(this.#skyPS);
		
		// VS cbuffer
		this.#d3dContext.VSSetConstantBuffers(0, [this.#cbVS]);
		this.#cbVSData.set(view, 0);
		this.#cbVSData.set(proj, 16);
		this.#d3dContext.UpdateSubresource(this.#cbVS, 0, null, this.#cbVSData, 0, 0);
		
		// PS cbuffer
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#cbPSData.set([mipLevelPreview, this.#isHDR ? 1.0 : 0.0]);
		this.#d3dContext.UpdateSubresource(this.#cbPS, 0, null, this.#cbPSData, 0, 0);

		// Set up texture
		this.#d3dContext.PSSetShaderResources(0, [this.SkyCubeSRV]);

		// Draw cube
		this.#d3dContext.IASetVertexBuffers(0, [this.#skyMesh.VertexBuffer], [Vertex.GetStrideInBytes()], [0]);
		this.#d3dContext.IASetIndexBuffer(this.#skyMesh.IndexBuffer, DXGI_FORMAT_R16_UINT, 0);
		this.#d3dContext.DrawIndexed(this.#skyMesh.IndexCount, 0, 0);

		// Revert states
		this.#d3dContext.RSSetState(null);
		this.#d3dContext.OMSetDepthStencilState(null);
	}

	// Helpers for creating the proper sized resources
	#CreateBrdfLutTexture()
	{
		if (this.BRDFLookUpTableSRV != null)
			this.BRDFLookUpTableSRV.Release();

		this.BRDFLookUpTableSRV = TextureUtils.CreateTexture2D(
			this.#d3dDevice,
			this.BRDFLookUpTableSize,
			this.BRDFLookUpTableSize,
			this.BRDFLookUpTableColorFormat,
			1,
			1,
			true);
	}

	#CreateIrradianceTexture()
	{
		if (this.IrradianceCubeSRV != null)
			this.IrradianceCubeSRV.Release();

		this.IrradianceCubeSRV = TextureUtils.CreateTextureCube(
			this.#d3dDevice,
			this.IrradianceCubeSize,
			this.IrradianceColorFormat,
			1,
			true);
	}

	#CreateSpecularIBLTexture()
	{
		this.SpecularIBLCubeSRV = TextureUtils.CreateTextureCube(
			this.#d3dDevice,
			this.SpecularIBLCubeSize,
			this.SpecularIBLColorFormat,
			this.SpecularIBLMipsTotal,
			true,
			true);
	}

	#GetNumTiles(tileSize, fullWidth, fullHeight)
	{
		return Math.ceil(fullWidth / tileSize) * Math.ceil(fullHeight / tileSize);
	}

	#GetScissorRectFromTileIndex(tileIndex, tileSize, fullWidth, fullHeight)
	{
		let numTilesX = Math.ceil(fullWidth / tileSize);
		//let numTilesY = Math.ceil(fullHeight / tileSize);

		let col = Math.floor(tileIndex % numTilesX);
		let row = Math.floor(tileIndex / numTilesX);

		let x = tileSize * col;
		let y = tileSize * row;

		// Note: Left, Top, Right, Bottom!
		return new D3D11_RECT(x, y, x + tileSize, y + tileSize);
	}

	#RenderBrdfLookUpTable()
	{
		if (!this.#lutDirty)
			return;

		// Grab the resource so we can make an RTV
		let lutTexture = this.BRDFLookUpTableSRV.GetResource();

		// RTV
		let [oldRTVs, dsv] = this.#d3dContext.OMGetRenderTargets();
		let rtv = this.#d3dDevice.CreateRenderTargetView(lutTexture, null);
		this.#d3dContext.OMSetRenderTargets([rtv], null);

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, this.BRDFLookUpTableSize, this.BRDFLookUpTableSize, 0, 1);
		this.#d3dContext.RSSetViewports([vp]);

		// Check the overall size against the max tile size
		let singleTileUpdate = false;
		let numTiles = 1;
		if (this.#progressiveUpdate)
		{
			// What's the tile size we need?
			let tileSize = this.BRDFLookUpTableSize;
			if (tileSize > this.#maxUpdateTileSize)
				tileSize = this.#maxUpdateTileSize;

			// How many tiles based on tile size?
			numTiles = this.#GetNumTiles(tileSize, this.BRDFLookUpTableSize, this.BRDFLookUpTableSize);
			
			// Is current one valid?
			if (numTiles > 1 && this.#lutTileUpdate >= 0 && this.#lutTileUpdate < numTiles)
			{
				let rect = this.#GetScissorRectFromTileIndex(this.#lutTileUpdate, tileSize, this.BRDFLookUpTableSize, this.BRDFLookUpTableSize);
				this.#d3dContext.RSSetScissorRects([rect]);
				this.#d3dContext.RSSetState(this.#scissorRasterState);

				singleTileUpdate = true;
			}
		}

		// Draw
		this.#d3dContext.PSSetShader(this.#brdfLutPS);
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.Draw(3, 0);

		// If this was a single tile update, reset everything and progress to the next tile
		if (singleTileUpdate)
		{
			this.#d3dContext.RSSetState(null);
			//this.#d3dContext.RSSetScissorRects([null]);

			this.#lutTileUpdate++;
			if (this.#lutTileUpdate >= numTiles)
			{
				this.#lutTileUpdate = 0;
				this.#lutDirty = false;

			}
		}
		else // Did the full surface, so we're done after this
		{
			this.#lutDirty = false;
		}

		// Finish up
		this.#d3dContext.OMSetRenderTargets([oldRTVs[0]], dsv);
		this.#d3dContext.RSSetViewports([oldVP]);
		lutTexture.Release();
		rtv.Release();
	}

	#RenderIrradianceMap()
	{
		// Make sure we have a skybox first and work to do
		if (this.SkyCubeSRV == null || !this.#irrDirty)
			return;

		// Which face(s) are we updating now?
		let startFace = 0;
		let endFace = 6;
		let singleFaceUpdate = false;
		let numTiles = 1;
		let singleTileUpdate = false;
		if (this.#progressiveUpdate &&
			this.#irrFaceUpdate >= 0 && this.#irrFaceUpdate < 6) // Must be a valid face
		{
			// Exactly one face this time
			startFace = this.#irrFaceUpdate;
			endFace = startFace + 1;
			singleFaceUpdate = true;

			// TILES ----
			// What's the tile size we need?
			let tileSize = this.IrradianceCubeSize;
			if (tileSize > this.#maxUpdateTileSize)
				tileSize = this.#maxUpdateTileSize;

			// How many tiles based on tile size?
			numTiles = this.#GetNumTiles(tileSize, this.IrradianceCubeSize, this.IrradianceCubeSize);

			// Is current one valid?
			if (numTiles > 1 && this.#irrTileUpdate >= 0 && this.#irrTileUpdate < numTiles)
			{
				this.#d3dContext.RSSetState(this.#scissorRasterState);
				this.#d3dContext.RSSetScissorRects([
					this.#GetScissorRectFromTileIndex(this.#irrTileUpdate, tileSize, this.IrradianceCubeSize, this.IrradianceCubeSize)
				]);

				singleTileUpdate = true;
			}
		
		}

		// Grab texture and rt
		let [oldRTVs, dsv] = this.#d3dContext.OMGetRenderTargets();
		let irrTexture = this.IrradianceCubeSRV.GetResource();

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, this.IrradianceCubeSize, this.IrradianceCubeSize, 0, 1);
		this.#d3dContext.RSSetViewports([vp]);
		
		// Process each face
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.PSSetShader(this.#irrPS);
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#d3dContext.PSSetShaderResources(0, [this.SkyCubeSRV]);
		this.#d3dContext.PSSetSamplers(0, [this.#sampler]);
		for (let face = startFace; face < endFace; face++)
		{
			// RTV for this face
			let faceRTVDesc = new D3D11_RENDER_TARGET_VIEW_DESC(
				this.IrradianceColorFormat,
				D3D11_RTV_DIMENSION_TEXTURE2DARRAY,
				0,
				face,
				1);
			let faceRTV = this.#d3dDevice.CreateRenderTargetView(irrTexture, faceRTVDesc);

			// Set cb data
			this.#cbPSData.set([
				face,
				this.#isHDR ? 1 : 0,
				this.IrradianceCubeSize
			]);

			this.#d3dContext.UpdateSubresource(this.#cbPS, 0, null, this.#cbPSData, 0, 0);

			// Draw and flush to ensure we're done
			this.#d3dContext.OMSetRenderTargets([faceRTV], null);
			this.#d3dContext.Draw(3, 0);

			if (!singleFaceUpdate)
				this.#d3dContext.Flush();

			faceRTV.Release();
		}

		// Was this a single tile update?
		if (singleTileUpdate) // Implies a single face update, too
		{
			this.#d3dContext.RSSetState(null);
			//this.#d3dContext.RSSetScissorRects([null]);

			// Next tile
			this.#irrTileUpdate++;

			// Done with all tiles?
			if (this.#irrTileUpdate >= numTiles)
			{
				this.#irrTileUpdate = 0;
				this.#irrFaceUpdate++; // Next face
			}

			// Done with all faces?
			if (this.#irrFaceUpdate >= 6)
			{
				this.#irrFaceUpdate = 0;
				this.#irrDirty = false;
			}
		}
		else if (singleFaceUpdate) // Was this a single face update but NOT a single tile update
		{
			// Now that we've set the face for this update, increment for next time
			this.#irrFaceUpdate++;
			if (this.#irrFaceUpdate >= 6)
			{
				this.#irrFaceUpdate = 0;
				this.#irrDirty = false;
			}
		}
		else
		{
			// Wasn't a single face, so the whole thing is clean
			this.#irrDirty = false;
		}

		// Release and clean up
		irrTexture.Release();
		this.#d3dContext.OMSetRenderTargets([oldRTVs[0]], dsv);
		this.#d3dContext.RSSetViewports([oldVP]);
	}

	#RenderSpecularIBLMap()
	{
		// Make sure we have a skybox first
		if (this.SkyCubeSRV == null || !this.#specDirty)
			return;

		// Which mip(s) are we updating now?
		let startMip = 0;
		let endMip = this.SpecularIBLMipsTotal;
		if (this.#progressiveUpdate &&
			this.#specMipUpdate >= 0 && this.#specMipUpdate < this.SpecularIBLMipsTotal)
		{
			// Exactly one mip this time
			startMip = this.#specMipUpdate;
			endMip = startMip + 1;
		}

		// Which face(s) are we updating now?
		let startFace = 0;
		let endFace = 6;
		let singleFaceUpdate = false;
		let numTiles = 1;
		let singleTileUpdate = false;
		if (this.#progressiveUpdate &&
			this.#specFaceUpdate >= 0 && this.#specFaceUpdate < 6) // Must be a valid face
		{
			// Exactly one face this time
			startFace = this.#specFaceUpdate;
			endFace = startFace + 1;
			singleFaceUpdate = true;

			// TILES ----
			// What's the tile size we need?
			// TODO: Move this lower to ensure we're using the right mip?
			let mipSize = Math.pow(2, this.SpecularIBLMipsTotal + this.SpecularIBLMipsToSkip - 1 - startMip);

			let tileSize = mipSize;
			if (tileSize > this.#maxUpdateTileSize)
				tileSize = this.#maxUpdateTileSize;

			// How many tiles based on tile size?
			numTiles = this.#GetNumTiles(tileSize, mipSize, mipSize);

			// Is current one valid?
			if (numTiles > 1 && this.#specTileUpdate >= 0 && this.#specTileUpdate < numTiles)
			{
				this.#d3dContext.RSSetState(this.#scissorRasterState);
				this.#d3dContext.RSSetScissorRects([
					this.#GetScissorRectFromTileIndex(this.#specTileUpdate, tileSize, mipSize, mipSize)
				]);

				singleTileUpdate = true;
			}
		}


		let specTexture = this.SpecularIBLCubeSRV.GetResource();
		let [oldRTVs, dsv] = this.#d3dContext.OMGetRenderTargets();
		let oldVP = this.#d3dContext.RSGetViewports()[0];

		// Prepare overall pipeline
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.PSSetShader(this.#iblSpecPS);
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#d3dContext.PSSetShaderResources(0, [this.SkyCubeSRV]);
		this.#d3dContext.PSSetSamplers(0, [this.#sampler]);

		// Process each mip
		for (let mip = startMip; mip < endMip; mip++)
		{
			// Set the viewport for this mip size
			let mipSize = Math.pow(2, this.SpecularIBLMipsTotal + this.SpecularIBLMipsToSkip - 1 - mip);

			let vp = new D3D11_VIEWPORT(0, 0, mipSize, mipSize, 0, 1);
			this.#d3dContext.RSSetViewports([vp]);

			// Roughness for this mip
			let roughness = mip / Math.max(this.SpecularIBLMipsTotal - 1.0, 1.0);

			// Process each face
			for (let face = startFace; face < endFace; face++)
			{
				// RTV for this face
				let faceRTVDesc = new D3D11_RENDER_TARGET_VIEW_DESC(
					this.SpecularIBLColorFormat,
					D3D11_RTV_DIMENSION_TEXTURE2DARRAY,
					mip,
					face,
					1);
				let faceRTV = this.#d3dDevice.CreateRenderTargetView(specTexture, faceRTVDesc);

				// Set cb data
				this.#cbPSData.set([
					roughness,
					face,
					mip,
					this.#isHDR ? 1 : 0,
					this.SkyCubeSize // Source cube size, not IBL spec cube size
				]);
				this.#d3dContext.UpdateSubresource(this.#cbPS, 0, null, this.#cbPSData, 0, 0);

				// Draw and flush to ensure we're done
				this.#d3dContext.OMSetRenderTargets([faceRTV], null);
				this.#d3dContext.Draw(3, 0);

				if (!singleFaceUpdate)
					this.#d3dContext.Flush();

				faceRTV.Release();
			}
		}

		// Was this a single tile update?
		if (singleTileUpdate) // Implies a single face update, too
		{
			this.#d3dContext.RSSetState(null);
			//this.#d3dContext.RSSetScissorRects([null]);

			// Next tile
			this.#specTileUpdate++;

			// Done with all tiles?
			if (this.#specTileUpdate >= numTiles)
			{
				this.#specTileUpdate = 0;
				this.#specFaceUpdate++; // Next face
			}

			// Done with all faces?
			if (this.#specFaceUpdate >= 6)
			{
				this.#specFaceUpdate = 0;
				this.#specMipUpdate++;
			}

			// Done with all mips?
			if (this.#specMipUpdate >= this.SpecularIBLMipsTotal)
			{
				this.#specMipUpdate = 0;
				this.#specDirty = false;
			}
		}
		else if (singleFaceUpdate)
		{
			// Now that we've set the face for this update, increment for next time
			this.#specFaceUpdate++;

			// Done with all faces for this mip?
			if (this.#specFaceUpdate >= 6)
			{
				this.#specFaceUpdate = 0;
				this.#specMipUpdate++;
			}

			// Done with all mips?
			if (this.#specMipUpdate >= this.SpecularIBLMipsTotal)
			{
				this.#specMipUpdate = 0;
				this.#specDirty = false;
			}
		}
		else
		{
			// Wasn't a single face, so the whole thing is clean
			this.#specDirty = false;
		}

		// Clean up and done
		specTexture.Release();
		this.#d3dContext.OMSetRenderTargets([oldRTVs[0]], dsv);
		this.#d3dContext.RSSetViewports([oldVP]);
	}

	#CopyEquirectToCube()
	{
		// Anything to do?
		if (this.#equirectSRV == null)
			return;

		// Grab the resource and its description from the SRV
		let equirectRes = this.#equirectSRV.GetResource();
		let equirectDesc = equirectRes.GetDesc();
		equirectRes.Release();

		// Validate size
		if (equirectDesc.Width != equirectDesc.Height * 2)
			throw new Error("Invalid dimensions for equirect map");

		// Do we need to recreate the cube map?
		let idealCubeSize = equirectDesc.Width / 4;
		if (this.SkyCubeSize != idealCubeSize)
		{
			// Release if necessary
			if (this.SkyCubeSRV != null)
				this.SkyCubeSRV.Release();

			// Recreate the sky cube
			this.SkyCubeSRV = TextureUtils.CreateTextureCube(
				this.#d3dDevice,
				idealCubeSize,
				this.SkyColorFormat,
				0); // All mips down to 1x1!

			// Save new size
			this.SkyCubeSize = idealCubeSize;
		}
		
		// Grab the texture itself
		let cubeTexture = this.SkyCubeSRV.GetResource();
	
		// Set extra PS data
		this.#cbPSData.set([this.#hdrExposure], 1); // Exposure adjustment
		this.#cbPSData.set([this.#isHDR ? 1 : 0], 2); // Is ths environment HDR?

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, this.SkyCubeSize, this.SkyCubeSize, 0, 1);
		this.#d3dContext.RSSetViewports([vp]);

		// Get existing render targets
		let [rts, dsv] = this.#d3dContext.OMGetRenderTargets();

		// Process each face
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.PSSetShader(this.#equirectToCubePS);
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#d3dContext.PSSetShaderResources(0, [this.#equirectSRV]);
		this.#d3dContext.PSSetSamplers(0, [this.#sampler]);
		for (let face = 0; face < 6; face++)
		{
			// RTV for this face
			let faceRTVDesc = new D3D11_RENDER_TARGET_VIEW_DESC(
				this.SkyColorFormat,
				D3D11_RTV_DIMENSION_TEXTURE2DARRAY,
				0,
				face,
				1);
			let faceRTV = this.#d3dDevice.CreateRenderTargetView(cubeTexture, faceRTVDesc);

			// Set cb data
			this.#cbPSData.set([face], 0);
			this.#d3dContext.UpdateSubresource(this.#cbPS, 0, null, this.#cbPSData, 0, 0);

			// Draw and flush to ensure we're done
			this.#d3dContext.OMSetRenderTargets([faceRTV], null);
			this.#d3dContext.Draw(3, 0);
			this.#d3dContext.Flush();

			faceRTV.Release();
		}

		// Generate mip maps for the enviroment map for later IBL steps
		this.#d3dContext.GenerateMips(this.SkyCubeSRV);

		// Clean up
		cubeTexture.Release(); // SRV has ref
		this.#d3dContext.RSSetViewports([oldVP]);
		this.#d3dContext.OMSetRenderTargets(rts, dsv); // Restore old targets
	}
}

