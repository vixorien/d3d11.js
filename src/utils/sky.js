
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

		// Create the sampler we'll need
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

		// Create a rasterizer state for the sky
		let skyRastDesc = new D3D11_RASTERIZER_DESC(
			D3D11_FILL_SOLID,
			D3D11_CULL_FRONT);
		this.#skyRasterState = this.#d3dDevice.CreateRasterizerState(skyRastDesc);

		// Create a depth/stencil state for the sky
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

		// Create the resources (but don't render to them yet?)
		this.BRDFLookUpTableSRV = this.#CreateBrdfLookUpTable();
		this.IrradianceCubeSRV = this.#CreateIrradianceMap();
		this.SpecularIBLCubeSRV = this.#CreateSpecularIBLMap();
	}

	static FromSixFaces()
	{
	}

	static FromHDR()
	{
	}

	Update()
	{

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
		this.#cbPSData.set([mipLevelPreview]);
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

	#CreateBrdfLookUpTable()
	{
		let lutSRV = TextureUtils.CreateTexture2D(
			this.#d3dDevice,
			this.BRDFLookUpTableSize,
			this.BRDFLookUpTableSize,
			this.BRDFLookUpTableColorFormat);
		let lutTexture = lutSRV.GetResource();

		// RTV
		let rtv = this.#d3dDevice.CreateRenderTargetView(lutTexture, null);
		this.#d3dContext.OMSetRenderTargets([rtv], null);

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, this.BRDFLookUpTableSize, this.BRDFLookUpTableSize, 0, 1);
		this.#d3dContext.RSSetViewports([vp]);

		// Draw
		this.#d3dContext.PSSetShader(this.#brdfLutPS);
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.Draw(3, 0);
		this.#d3dContext.Flush();

		// Finish up before returning the view
		this.#d3dContext.RSSetViewports([oldVP]);
		lutTexture.Release();
		rtv.Release();
		return lutSRV;
	}

	// TODO: Parameterize face?
	#CreateIrradianceMap()
	{
		let mapSize = this.IrradianceCubeSize;
		if (mapSize <= 0)
			mapSize = this.SkyCubeSize;

		// Create an empty texture cube for irradiance
		let irrSRV = TextureUtils.CreateTextureCube(
			this.#d3dDevice,
			mapSize,
			this.IrradianceColorFormat);
		let irrTexture = irrSRV.GetResource();

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, mapSize, mapSize, 0, 1);
		this.#d3dContext.RSSetViewports([vp]);

		// Process each face
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.PSSetShader(this.#irrPS);
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#d3dContext.PSSetShaderResources(0, [this.SkyCubeSRV]);
		this.#d3dContext.PSSetSamplers(0, [this.#sampler]);
		for (let face = 0; face < 6; face++)
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
				mapSize
			]);

			this.#d3dContext.UpdateSubresource(this.#cbPS, 0, null, this.#cbPSData, 0, 0);

			// Draw and flush to ensure we're done
			this.#d3dContext.OMSetRenderTargets([faceRTV], null);
			this.#d3dContext.Draw(3, 0);
			this.#d3dContext.Flush();

			faceRTV.Release();
		}

		// Release and clean up
		irrTexture.Release();
		this.#d3dContext.RSSetViewports([oldVP]);
		return irrSRV;
	}

	#CreateSpecularIBLMap()
	{
		let mapSize = this.SpecularIBLCubeSize;
		if (mapSize <= 0)
			mapSize = this.SkyCubeSize;

		// Create an empty texture cube for specular
		let specSRV = TextureUtils.CreateTextureCube(
			this.#d3dDevice,
			mapSize,
			this.SpecularIBLColorFormat,
			this.SpecularIBLMipsTotal);
		let specTexture = specSRV.GetResource();

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];

		// Prepare overall pipeline
		this.#d3dContext.VSSetShader(this.#fullscreenVS);
		this.#d3dContext.PSSetShader(this.#iblSpecPS);
		this.#d3dContext.PSSetConstantBuffers(0, [this.#cbPS]);
		this.#d3dContext.PSSetShaderResources(0, [this.SkyCubeSRV]);
		this.#d3dContext.PSSetSamplers(0, [this.#sampler]);

		// Process each mip
		for (let mip = 0; mip < this.SpecularIBLMipsTotal; mip++)
		{
			// Set the viewport for this mip size
			let mipSize = Math.pow(2, this.SpecularIBLMipsTotal + this.SpecularIBLMipsToSkip - 1 - mip);

			let vp = new D3D11_VIEWPORT(0, 0, mipSize, mipSize, 0, 1);
			this.#d3dContext.RSSetViewports([vp]);

			// Roughness for this mip
			let roughness = mip / Math.max(this.SpecularIBLMipsTotal - 1.0, 1.0);

			// Process each face
			for (let face = 0; face < 6; face++)
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
				this.#d3dContext.Flush();

				faceRTV.Release();
			}
		}

		// Clean up and done
		specTexture.Release();
		this.#d3dContext.RSSetViewports([oldVP]);
		return specSRV;
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
			// Recreate the sky cube
			this.SkyCubeSRV.Release();
			this.SkyCubeSRV = TextureUtils.CreateTextureCube(
				this.#d3dDevice,
				idealCubeSize,
				this.SkyColorFormat,
				0); // All mips down to 1x1!

			this.SkyCubeSize = idealCubeSize;
		}


		// Grab the texture itself
		let cubeTexture = this.SkyCubeSRV.GetResource();

		// Set exposure adjustment value
		this.#cbPSData.set([this.#hdrExposure], 1);

		// Set up viewport
		let oldVP = this.#d3dContext.RSGetViewports()[0];
		let vp = new D3D11_VIEWPORT(0, 0, cubeSize, cubeSize, 0, 1);
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
				dxgiFormat,
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