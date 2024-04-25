
import { Vector3 } from "./d3dmath.js";

export class TextureUtils
{
	// MISC DDS constants
	static DDS_MAGIC_NUMBER = 0x20534444;
	static DDS_FOUR_CC_DX10_EXTENDED_HEADER = 0x30315844;
	static DDS_FOUR_CC_DXT1 = 0x31545844;
	static DDS_FOUR_CC_DXT2 = 0x32545844;
	static DDS_FOUR_CC_DXT3 = 0x33545844;
	static DDS_FOUR_CC_DXT4 = 0x34545844;
	static DDS_FOUR_CC_DXT5 = 0x35545844;

	// DDS Flags
	static DDSD_CAPS = 0x1;
	static DDSD_HEIGHT = 0x2;
	static DDSD_WIDTH = 0x4;
	static DDSD_PITCH = 0x8;
	static DDSD_PIXELFORMAT = 0x1000;
	static DDSD_MIPMAPCOUNT = 0x20000;
	static DDSD_LINEARSIZE = 0x80000;
	static DDSD_DEPTH = 0x800000;

	static DDS_HEADER_FLAGS_TEXTURE =
		TextureUtils.DDSD_CAPS |
		TextureUtils.DDSD_HEIGHT |
		TextureUtils.DDSD_WIDTH |
		TextureUtils.DDSD_PIXELFORMAT;

	// Caps flags
	static DDSCAPS_COMPLEX = 0x8; // Has more than once surface: mips, cube, etc.
	static DDSCAPS_MIPMAP = 0x400000;
	static DDSCAPS_TEXTURE = 0x1000;

	// Caps2 flags
	static DDSCAPS2_CUBEMAP = 0x200
	static DDSCAPS2_CUBEMAP_POSITIVEX = 0x400;
	static DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800;
	static DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000;
	static DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000;
	static DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000;
	static DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000;
	static DDSCAPS2_VOLUME = 0x200000;

	static DDS_CUBEMAP_ALLFACES =
		TextureUtils.DDSCAPS2_CUBEMAP |
		TextureUtils.DDSCAPS2_CUBEMAP_POSITIVEX |
		TextureUtils.DDSCAPS2_CUBEMAP_NEGATIVEX |
		TextureUtils.DDSCAPS2_CUBEMAP_POSITIVEY |
		TextureUtils.DDSCAPS2_CUBEMAP_NEGATIVEY |
		TextureUtils.DDSCAPS2_CUBEMAP_POSITIVEZ |
		TextureUtils.DDSCAPS2_CUBEMAP_NEGATIVEZ;

	// Pixel format flags
	static DDPF_ALPHAPIXELS = 0x1;
	static DDPF_ALPHA = 0x2;
	static DDPF_FOURCC = 0x4; // Used when DXT10 header is needed, set FourCC to 'DX10' (backwards?)
	static DDPF_RGB = 0x40;
	static DDPF_YUV = 0x200;
	static DDPF_LUMINANCE = 0x20000;

	// Extended header details
	static DDS_DIMENSION_TEXTURE1D = 2;
	static DDS_DIMENSION_TEXTURE2D = 3;
	static DDS_DIMENSION_TEXTURE3D = 4;
	static DDS_RESOURCE_MISC_TEXTURECUBE = 0x4;

	/**
	 * Creates a texture of the specified size and color.  The color format is
	 * RGBA (8 bits per channel).  Color should be specified as four [0,255] integers.
	 * 
	 * @param {any} d3dDevice D3D Device for resource creation
	 * @param {any} width Width of the new texture
	 * @param {any} height Height of the new texture
	 * @param {any} redInt Red channel integer value [0,255]
	 * @param {any} greenInt Green channel integer value [0,255]
	 * @param {any} blueInt Blue channel integer value [0,255]
	 * @param {any} alphaInt Alpha channel integer value [0,255]
	 * 
	 * @returns An ID3D11ShaderResourceView for the texture
	 */
	static CreateSolidTexture2D(d3dDevice, width, height, redInt, greenInt, blueInt, alphaInt)
	{
		// Set up the texture
		let desc = new D3D11_TEXTURE2D_DESC(
			width, height,
			1, // No mips
			1, // No array
			DXGI_FORMAT_R8G8B8A8_UNORM,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE,
			0,
			0);

		// Replicate the color data
		let size = width * height * 4;
		let data = new Uint8Array(size);
		for (let i = 0; i < size;)
		{
			data.set([redInt], i++);
			data.set([greenInt], i++);
			data.set([blueInt], i++);
			data.set([alphaInt], i++);
		}

		// Create the texture and SRV, then release the texture ref
		let texture = d3dDevice.CreateTexture2D(desc, [data]);
		let srv = d3dDevice.CreateShaderResourceView(texture, null);
		texture.Release();

		return srv;
	}

	/**
	 * Creates a blank texture and returns a shader resource view for it.
	 * 
	 * @param {ID3D11Device} d3dDevice The D3D device to use for creation
	 * @param {number} width The width in pixels
	 * @param {number} height The height in pixels
	 * @param {any} dxgiFormat The color format
	 * @param {number} mips Number of mip map levels.  Set this to zero to generate all mips down to 1x1.
	 * @param {number} arraySize Texture array size
	 * @param {boolean} renderTargetCapable Can this be used as a render target, too?
	 * @param {boolean} canGenerateMips Can mip maps be auto generated for this texture?
	 * 
	 * @returns {ID3D11ShaderResourceView} An SRV for the underlying texture resource
	 */
	static CreateTexture2D(d3dDevice, width, height, dxgiFormat = DXGI_FORMAT_R8G8B8A8_UNORM, mips = 1, arraySize = 1, renderTargetCapable = true, canGenerateMips = true)
	{
		// Set up the texture
		let desc = new D3D11_TEXTURE2D_DESC(
			width, height,
			mips,
			arraySize,
			dxgiFormat,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE,
			0,
			canGenerateMips ? D3D11_RESOURCE_MISC_GENERATE_MIPS : 0);

		// Check for render target
		if (renderTargetCapable)
			desc.BindFlags |= D3D11_BIND_RENDER_TARGET;

		// Create the texture and SRV, then release the texture ref
		let texture = d3dDevice.CreateTexture2D(desc, null);
		let srv = d3dDevice.CreateShaderResourceView(texture, null);
		texture.Release();

		return srv;
	}

	/**
	 * Creates a blank cube map texture and returns a shader resource view for it.
	 * 
	 * @param {ID3D11Device} d3dDevice The D3D device to use for creation
	 * @param {number} cubeSize The width (and the height) of a single cube face in pixels
	 * @param {any} dxgiFormat The color format
	 * @param {number} mips Number of mip map levels.  Set this to zero to generate all mips down to 1x1.
	 * @param {boolean} renderTargetCapable Can this be used as a render target, too?
	 * @param {boolean} canGenerateMips Can mip maps be auto generated for this texture?
	 * 
	 * @returns {ID3D11ShaderResourceView} An SRV for the underlying texture resource
	 */
	static CreateTextureCube(d3dDevice, cubeSize, dxgiFormat = DXGI_FORMAT_R8G8B8A8_UNORM, mips = 1, renderTargetCapable = true, canGenerateMips = true)
	{
		// Set up the texture
		let desc = new D3D11_TEXTURE2D_DESC(
			cubeSize,
			cubeSize,
			mips,
			6, // 6 faces (as array elements)
			dxgiFormat,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE,
			0,
			D3D11_RESOURCE_MISC_TEXTURECUBE);

		// Check for other flags
		if (renderTargetCapable) desc.BindFlags |= D3D11_BIND_RENDER_TARGET;
		if (canGenerateMips) desc.MiscFlags |= D3D11_RESOURCE_MISC_GENERATE_MIPS;

		// Create the texture and SRV, then release the texture ref
		let texture = d3dDevice.CreateTexture2D(desc, null);
		let srv = d3dDevice.CreateShaderResourceView(texture, null);
		texture.Release();

		return srv;
	}

	/**
	 * Loads an image from a URL as a Texture2D and
	 * optionally generates a mipmap chain for it
	 * 
	 * @param {any} d3dDevice The D3D Device for resource creation
	 * @param {any} d3dContext The D3D Context for mip generation (pass in null to skip mips)
	 * @param {any} fileURL The image file URL
	 * 
	 * @returns An ID3D11ShaderResourceView for the texture
	 */
	static async LoadTexture2D(d3dDevice, d3dContext, fileURL)
	{
		// Fetch and grab the binary data, then turn into an image
		const resp = await fetch(fileURL);
		const imageBlob = await resp.blob();
		const bitmap = await createImageBitmap(imageBlob, { imageOrientation: "flipY" });

		// Set up the texture
		let desc = new D3D11_TEXTURE2D_DESC(
			bitmap.width,
			bitmap.height,
			d3dContext == null ? 1 : 0, // 0 means full mip chain
			1,
			DXGI_FORMAT_R8G8B8A8_UNORM,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE | D3D11_BIND_RENDER_TARGET,
			0,
			d3dContext == null ? 0 : D3D11_RESOURCE_MISC_GENERATE_MIPS);

		// Create the texture and a default SRV
		let texture = d3dDevice.CreateTexture2D(desc, [bitmap]);
		let srv = d3dDevice.CreateShaderResourceView(texture, null);

		// Generate mips if we have a context
		if (d3dContext != null)
		{
			d3dContext.GenerateMips(srv);
		}

		// Release the texture resource since the view has it
		texture.Release();
		bitmap.close(); // Release the browser resource, too
		return srv;
	}

	static async LoadHDRFile(fileURL)
	{
		// Read the file
		// Fetch and grab the binary data, then turn into an image
		const resp = await fetch(fileURL);
		const contents = await resp.arrayBuffer();

		// Convert the data
		return TextureUtils.#LoadHDRFile(contents);
	}

	static #GetArrayForReadback(dxgiFormat, pixelCount)
	{
		switch (dxgiFormat)
		{
			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				return new Float32Array(pixelCount * 4);

			case DXGI_FORMAT_R32G32B32_FLOAT:
				return new Float32Array(pixelCount * 3);

			case DXGI_FORMAT_R16G16B16A16_FLOAT:
				return new Uint16Array(pixelCount * 4);

			case DXGI_FORMAT_R32G32_FLOAT:
				return new Float32Array(pixelCount * 2);

			case DXGI_FORMAT_R8G8B8A8_UNORM:
			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
				return new Uint8Array(pixelCount * 4);

			case DXGI_FORMAT_R16G16_FLOAT:
				return new Uint16Array(pixelCount * 2);

			case DXGI_FORMAT_R32_FLOAT:
				return new Float32Array(pixelCount);

			case DXGI_FORMAT_R32_UINT:
				return new Uint32Array(pixelCount);

			case DXGI_FORMAT_D24_UNORM_S8_UINT:
				return new Uint8Array(pixelCount * 4); // TODO: Test this!

			case DXGI_FORMAT_D16_UNORM:
			case DXGI_FORMAT_R16_UINT:
				return new Uint16Array(pixelCount);

			// Unknown
			default:
				throw new Error("Invalid format specified");
		}
	}

	/**
	 * Reads pixel data from the texture of the given shader resource view
	 * 
	 * @param {ID3D11Device} d3dDevice The ID3D11Device object
	 * @param {ID3D11DeviceContext} d3dContext The ID3D11DeviceContext object
	 * @param {ID3D11ShaderResourceView} textureSRV An SRV of the texture to read
	 * 
	 * @returns {Array} Array of [width, height, mipLevels, arraySizeOrCubeCount, isCubemap, dxgiFormat, pixelData].
	 * Note that pixelData is a TypedArray, but the exact type depends upon the texture format of the resource.
	 */
	static ReadPixelDataFromSRV(d3dDevice, d3dContext, textureSRV)
	{
		// Grab the resource, which adds a reference
		let resource = textureSRV.GetResource();

		// Perform the actual work
		let results = TextureUtils.ReadPixelDataFromTexture(d3dDevice, d3dContext, resource);

		// Clean up and return
		resource.Release();
		return results;
	}

	/**
	 * Reads pixel data from the texture of the given GPU texture resource
	 * 
	 * @param {ID3D11Device} d3dDevice The ID3D11Device object
	 * @param {ID3D11DeviceContext} d3dContext The ID3D11DeviceContext object
	 * @param {ID3D11Resource} textureResource The texture resource to read
	 * 
	 * @returns {Array} Array of [width, height, mipLevels, arraySizeOrCubeCount, isCubemap, dxgiFormat, pixelData].
	 * Note that pixelData is a TypedArray, but the exact type depends upon the texture format of the resource.
	 */
	static ReadPixelDataFromTexture(d3dDevice, d3dContext, textureResource)
	{
		// Grab the texture's description and save some details
		let desc = textureResource.GetDesc();
		let w = desc.Width;
		let h = desc.Height;
		let mipLevels = desc.MipLevels;
		let arraySize = desc.ArraySize;
		let isCubemap = ((desc.MiscFlags & D3D11_RESOURCE_MISC_TEXTURECUBE) == D3D11_RESOURCE_MISC_TEXTURECUBE);

		// Adjust this description and make a readback resource
		desc.BindFlags = 0;
		desc.Usage = D3D11_USAGE_STAGING;
		desc.CPUAccessFlags = D3D11_CPU_ACCESS_READ;
		desc.MiscFlags = (desc.MiscFlags & ~D3D11_RESOURCE_MISC_GENERATE_MIPS); // Remove mip gen flag!
		let readbackTexture = d3dDevice.CreateTexture2D(desc, null);

		// Copy the original texture to the readback texture
		d3dContext.CopyResource(readbackTexture, textureResource);

		// Calculate the total size of the resource
		//let bytesPerPixel = TextureUtils.GetDXGIFormatBytesPerPixel(desc.Format);
		let totalPixels = w * h * arraySize;
		let mipWidth = w;
		let mipHeight = h;
		for (let mip = 1; mip < mipLevels; mip++)
		{
			// Calc mip size
			mipWidth = Math.max(Math.floor(mipWidth / 2), 1);
			mipHeight = Math.max(Math.floor(mipHeight / 2), 1);

			// Add this mip to the overall size
			totalPixels += mipWidth * mipHeight * arraySize;
		}

		// Create an array big enough to hold all subresources
		let readbackData = TextureUtils.#GetArrayForReadback(desc.Format, totalPixels);

		// Read all of the data, one subresource at a time
		let dataOffset = 0;
		for (let arrayElement = 0; arrayElement < arraySize; arrayElement++)
		{
			// Mip size starts as the main texture size
			mipWidth = w;
			mipHeight = h;
			for (let mip = 0; mip < mipLevels; mip++)
			{
				// Data for just this subresource
				let subResIndex = D3D11CalcSubresource(mip, arrayElement, mipLevels);
				let subResDataSize = mipWidth * mipHeight;
				let subResData = TextureUtils.#GetArrayForReadback(desc.Format, subResDataSize);

				// Perform the read and copy to the overall array
				d3dDevice.ReadFromSubresource(subResData, readbackTexture, subResIndex, null);

				// Flip the data on Y by looping through top half and swapping
				let rowWidth = subResData.length / mipHeight;
				for (let y = 0; y < mipHeight / 2; y++)
				{
					let flippedY = mipHeight - y - 1;
					for (let x = 0; x < rowWidth; x++)
					{
						let top = x + y * rowWidth;
						let bot = x + flippedY * rowWidth;

						let bottomPixel = subResData[bot];
						subResData[bot] = subResData[top];
						subResData[top] = bottomPixel;
					}
				}

				// Add to the overall data
				readbackData.set(subResData, dataOffset);

				// Adjust data offset
				dataOffset += subResData.length;

				// Update the mip size
				mipWidth = Math.max(Math.floor(mipWidth / 2), 1);
				mipHeight = Math.max(Math.floor(mipHeight / 2), 1);
			}
		}

		return [w, h, mipLevels, isCubemap ? arraySize / 6 : arraySize, isCubemap, desc.Format, readbackData];
	}

	
	static async LoadSixFacesLocal(inputs)
	{
		// Validate files
		for (let i = 0; i < 6; i++)
		{
			// Ensure file has been set
			if (inputs[i].files.length == 0)
			{
				alert("Missing one or more files for skybox load");
				return null;
			}

			// Check extension
			let filename = inputs[i].files[0].name;
			let extension = filename.slice(filename.lastIndexOf('.'));
			if (extension != ".jpg" && extension != ".jpeg" && extension != ".png")
			{
				alert("One or more files for skybox load have invalid extensions.  Must be .jpg, .jpeg or .png");
				return null;
			}
		}

		// Files validated - Perform the load(s)
		let faceBitmaps = [];
		let size = -1;
		for (let i = 0; i < 6; i++)
		{
			let contents = await TextureUtils.#ReadLocalFile(inputs[i].files[0]);
			let blob = new Blob([contents]);
			let bitmap = await createImageBitmap(blob, { imageOrientation: "flipY" });

			// Get the size from the first image
			if (size == -1)
				size = bitmap.width;

			// Validate bitmap aspect ratio
			if (bitmap.width != bitmap.height)
			{
				console.log("Error: Texture cube faces must be square");
				return null;
			}

			// Validate size matches
			if (size != bitmap.width)
			{
				console.log("Error: Texture cube faces must all be the same size");
				return null;
			}

			// Add to array of initial data
			faceBitmaps.push(bitmap);
		}

		return faceBitmaps;
	}

	static async #LoadCubeFromFaces(d3dDevice, d3dContext, faceURLs, filesAreLocal, generateMips)
	{
		let faceTextures = [];
		let size = -1;
		let mips = 1;
		for (let i = 0; i < faceURLs.length; i++)
		{
			// Fetch and grab the binary data, then turn into an image
			const resp = filesAreLocal ? faceURLs[i] : await fetch(faceURLs[i]);
			const imageBlob = filesAreLocal ? resp : await resp.blob();
			const bitmap = await createImageBitmap(imageBlob, { imageOrientation: "flipY" });

			// Set size and mips on first bitmap
			if (size == -1)
			{
				size = bitmap.width;

				if (generateMips)
				{
					mips = Math.floor(Math.log2(size)) + 1;
				}
			}

			// Validate bitmap aspect ratio
			if (bitmap.width != bitmap.height)
			{
				console.log("Error: Texture cube faces must be square");
				return;
			}

			// Validate size matches
			if (size != bitmap.width)
			{
				console.log("Error: Texture cube faces must all be the same size");
			}

			// Add to array of initial data
			faceTextures.push(bitmap);

			// Note: Must also add nulls for other mips of this face
			for (let i = 1; generateMips && i < mips; i++)
				faceTextures.push(null); // No data for this mip yet!
		}

		// Set up the texture cube
		let desc = new D3D11_TEXTURE2D_DESC(
			faceTextures[0].width,
			faceTextures[0].height,
			mips,
			6, // 6 faces (as array elements)
			DXGI_FORMAT_R8G8B8A8_UNORM,
			new DXGI_SAMPLE_DESC(1, 0),
			D3D11_USAGE_DEFAULT,
			D3D11_BIND_SHADER_RESOURCE | (generateMips ? D3D11_BIND_RENDER_TARGET : 0),
			0,
			D3D11_RESOURCE_MISC_TEXTURECUBE | (generateMips ? D3D11_RESOURCE_MISC_GENERATE_MIPS : 0));
		let texture = d3dDevice.CreateTexture2D(desc, faceTextures);

		let srv = d3dDevice.CreateShaderResourceView(texture, null);

		// Generate mip maps for the enviroment map for later IBL steps
		if (generateMips)
		{
			d3dContext.GenerateMips(srv);
		}

		// Release the texture
		texture.Release();
		return srv;
	}

	/**
	 * Loads a local HDR file from the user's machine
	 * 
	 * @param {any} fileInput The file input HTML element to use
	 * 
	 * @returns Array of [width, height, pixels]
	 */
	static async LoadHDRFileLocal(fileInput)
	{
		// Ensure file has been set
		if (fileInput.files.length == 0)
		{
			alert("Missing HDR file");
			return;
		}

		// Check extension
		let filename = fileInput.files[0].name;
		let extension = filename.slice(filename.lastIndexOf('.'));
		if (extension != ".hdr")
		{
			alert("Invalid file extension for HDR file");
			return;
		}

		// Read the local file and process
		let fileContents = await TextureUtils.#ReadLocalFile(fileInput.files[0]);
		return TextureUtils.#LoadHDRFile(fileContents);
	}


	// Decodes an HDR file
	// Based on: http://www.cs.virginia.edu/~jcw5q/apps/imageview/src/libimageviewer/hdr.c
	// Also see: https://paulbourke.net/dataformats/pic/
	static async #LoadHDRFile(data)
	{
		// Handle signature
		let decoder = new TextDecoder();

		const headerSig = "#?RADIANCE";
		const headerFormat = "FORMAT=";
		const headerExposure = "EXPOSURE=";
		const headerFormatRGB = "32-bit_rle_rgbe";
		const headerFormatXYZ = "32-bit_rle_xyze";
		const formatRGB = "RGB";
		const formatXYZ = "XYZ";

		// Use typed array as a view into the data, and decode as a string
		let sig = decoder.decode(new Int8Array(data, 0, headerSig.length));
		if (sig != headerSig)
		{
			alert("Required HDR header signature not found");
			return;
		}

		// File details from header
		let format = null;
		let fileExposure = 1;
		let flipX = false;
		let flipY = false;
		let width = -1;
		let height = -1;

		// Loop and find format string
		let offset = headerSig.length + 1; // Account for initial new line
		let line = "";

		do
		{
			// Grab line (untrimmed so we can offset properly)
			line = TextureUtils.#GetLineFromArrayBuffer(data, offset);
			offset += line.length;

			// Trim before checking
			line = line.trim();

			// Check for various header elements
			if (line.startsWith(headerFormat))
			{
				let formatFromHeader = line.substring(headerFormat.length); // Skip "FORMAT="

				// Validate format and save
				if (formatFromHeader == headerFormatRGB)
					format = formatRGB;
				else if (formatFromHeader == headerFormatXYZ)
					format = formatXYZ;
				else
				{
					alert("Invalid HDR format specified in header: " + formatFromHeader);
					return;
				}
			}
			else if (line.startsWith(headerExposure))
			{
				let expFromHeader = Number(line.substring(headerExposure.length)); // Skip "EXPOSURE="

				// Validate number
				if (isNan(expFromHeader))
				{
					alert("Invalid HDR exposure specified in header");
					return;
				}

				// Ignore zero
				if (expFromHeader != 0)
				{
					fileExposure = expFromHeader;
				}
			}
		}
		while (line != "");

		// We've found a blank line, so the next thing should be the resolution string
		let resString = TextureUtils.#GetLineFromArrayBuffer(data, offset);
		offset += resString.length;

		// Parse resolution string into resolution elements (re)
		let re = resString.trim().split(" ");
		if (re.length != 4)
		{
			alert("Invalid resolution details in HDR file");
			return;
		}

		// Check first resolution element
		switch (re[0])
		{
			case "+X": width = Number(re[1]); break;
			case "-X": width = Number(re[1]); flipX = !flipX; break;
			case "+Y": height = Number(re[1]); break;
			case "-Y": height = Number(re[1]); flipY = !flipY; break;
			default:
				alert("Invalid resolution details in HDR file")
				return;
		}

		// Check next resolution element
		switch (re[2])
		{
			case "+X": width = Number(re[3]); break;
			case "-X": width = Number(re[3]); flipX = !flipX; break;
			case "+Y": height = Number(re[3]); break;
			case "-Y": height = Number(re[3]); flipY = !flipY; break;
			default:
				alert("Invalid resolution details in HDR file")
				return;
		}

		// Validate that we got both width and height
		if (width <= 0 || height <= 0)
		{
			alert("Invalid width or height details in HDR file");
			return;
		}

		// Offset is now where the actual data begins!
		let source = new Uint8Array(data, offset);
		let sourceIndex = 0;

		// We'll be storing results as R32G32B32A32 float pixels
		let dest = new Float32Array(width * height * 4);

		// Loop through scanlines
		for (let s = 0; s < height; s++)
		{
			// Grab the first "pixel" of this line, which is encoding info
			let encoding = new Uint8Array(source, sourceIndex, 4);
			sourceIndex += 4;

			// First pixel is encoding information
			let scanlineStart = s * width * 4;
			if (flipY)
				scanlineStart = (height * width * 4) - scanlineStart;

			if (encoding[0] == 2 && encoding[1] == 2 && encoding[2] < 128) // New RLE ---
			{
				// Components handled separately
				for (let c = 0; c < 4; c++)
				{
					// Offset to this component in the scanline
					let compOffset = scanlineStart + c;

					// Loop through destination pixels
					for (let dPixel = 0; dPixel < width;)
					{
						let run = source[sourceIndex];
						sourceIndex++;

						// Check the first component of this pixel
						if (run <= 128)
						{
							// No run; contiguous single-component data
							for (let r = 0; r < run; r++)
							{
								dest[compOffset + dPixel * 4] = source[sourceIndex];
								sourceIndex++;
								dPixel++;
							}
						}
						else
						{
							// Run!  Adjust value
							run -= 128;

							// Grab the value for this run
							let val = source[sourceIndex];
							sourceIndex++;

							// Apply value to all destination pixels in run
							for (let r = 0; r < run; r++)
							{
								dest[compOffset + dPixel * 4] = val;
								dPixel++;
							}
						}
					}
				}
			}
			else // Old RLE ---
			{
				// First set of data is actually the first pixel, so back up
				sourceIndex -= 4;

				// Loop through pixels of this scanline
				let shift = 0;
				for (let d = 0; d < width * 4;) // d is specific component here!
				{
					// Grab this pixel
					let pixel = new Uint8Array(source, sourceIndex, 4);
					sourceIndex += 4;

					// Check this pixel for RLE span
					// Note: Starting with the first pixel from above!
					if (pixel[0] == 1 && pixel[1] == 1 && pixel[2] == 1)
					{
						// RLE span!  Get the length
						let spanLength = pixel[3] << shift;

						for (let i = 0; i < spanLength; i++)
						{
							// Converting from int to float here!
							dest[d + 0] = pixel[0];
							dest[d + 1] = pixel[1];
							dest[d + 2] = pixel[2];
							dest[d + 3] = pixel[3];
							d += 4;
						}

						shift += 8; // Next RLE is shifted (? Is this correct?)
					}
					else
					{
						// Not an RLE span, just a regular pixel
						// Converting from int to float here!
						dest[d + 0] = pixel[0];
						dest[d + 1] = pixel[1];
						dest[d + 2] = pixel[2];
						dest[d + 3] = pixel[3];
						d += 4; // One more destination pixel down

						shift = 0; // Reset bit shift after RLE
					}
				}
			}
		}

		// Got the data, now to convert it (if necessary based on format from header)
		if (format == formatRGB)
		{
			// Based on "Real Pixels" by Greg Ward in Graphics Gems II
			let invExposure = 1 / fileExposure;
			let adjust = 0.0; // Ward adjusts by 0.5, trying without
			for (let i = 0; i < dest.length; i += 4)
			{
				let exponent = dest[i + 3];
				if (exponent == 0)
				{
					dest[i + 0] = 0;
					dest[i + 1] = 0;
					dest[i + 2] = 0;
				}
				else
				{
					// Replicate ldexp(x, exponent) --> x * 2 ^ exp
					// ldexp(invExposure, exponent - 128) --> invExposure * 2 ^ (exponent - 128)
					let v = invExposure * Math.pow(2, exponent - (128 + 8));

					dest[i + 0] = (dest[i + 0] + adjust) * v;
					dest[i + 1] = (dest[i + 1] + adjust) * v;
					dest[i + 2] = (dest[i + 2] + adjust) * v;
					dest[i + 3] = 1;
				}
			}
		}

		return [width, height, dest];
	}

	static #GetLineFromArrayBuffer(arrayBuffer, startPos)
	{
		// Create a character view into the array buffer
		let charArray = new Uint8Array(arrayBuffer, startPos);

		// Track where we are
		let offset = 0;
		let line = "";
		let char = "";
		do
		{
			// Append character from array buffer
			char = String.fromCharCode(charArray[offset]);
			line += char;

			// Move forward
			offset++;
		}
		while (offset < charArray.length && char != "\n");

		return line;
	}

	static async #ReadLocalFile(file)
	{
		return new Promise((resolve, reject) =>
		{
			let fr = new FileReader();
			fr.onerror = reject;
			fr.onload = function ()
			{
				resolve(fr.result);
			}
			fr.readAsArrayBuffer(file);
		});
	}

	/**
	 * Loads a local DDS file from the user's machine
	 * 
	 * @param {any} fileInput The file input HTML element to use
	 * 
	 * @returns Array of ???
	 * TODO: Determine what to return - probably a bunch of info (maybe just a texture_desc + data array?)
	 */
	static async LoadDDSFileLocal(fileInput)
	{
		// Ensure file has been set
		if (fileInput.files.length == 0)
		{
			alert("Missing DDS file");
			return;
		}

		// Check extension
		let filename = fileInput.files[0].name;
		let extension = filename.slice(filename.lastIndexOf('.'));
		if (extension != ".dds")
		{
			alert("Invalid file extension for DDS file");
			return;
		}

		// Read the local file and process
		let fileContents = await TextureUtils.#ReadLocalFile(fileInput.files[0]);
		return TextureUtils.#LoadDDSFile(fileContents);
	}

	static async LoadDDSFile(fileURL)
	{
		// Read the file
		// Fetch and grab the binary data, then turn into an image
		const resp = await fetch(fileURL);
		const contents = await resp.arrayBuffer();

		// Convert the data
		return TextureUtils.#LoadDDSFile(contents);
	}


	static #CheckMasks(masks, r, g, b, a)
	{
		return (
			masks[0] == r &&
			masks[1] == g &&
			masks[2] == b &&
			masks[3] == a
		);
	}

	/**
	 * Loads a DDS file
	 * Format details here: https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide
	 * 
	 * @param {any} data Contents of the file
	 * 
	 * @returns {any} ???
	 */
	static async #LoadDDSFile(dataFromFile)
	{
		// Read data as uints
		let data = new Uint32Array(dataFromFile);
		let offset = 0;

		// Check for magic number
		if (data[offset] != TextureUtils.DDS_MAGIC_NUMBER)
		{
			throw new Error("Invalid header for DDS file");
		}
		offset++;

		// Read next header details
		let headerSize = data[offset++];
		let flags = data[offset++];
		let width = data[offset++];
		let height = data[offset++];
		let pitchOrLinearSize = data[offset++];
		let depth = data[offset++];
		let mipLevels = data[offset++];
		if (mipLevels <= 1)
			mipLevels = 1;

		// Skip next 11 unused entries
		offset += 11;

		// Pixel format details
		let pfSize = data[offset++];
		let pfFlags = data[offset++];
		let pfFourCC = data[offset++];
		let pfRGBBitCount = data[offset++];
		let pfRBitMask = data[offset++];
		let pfGBitMask = data[offset++];
		let pfBBitMask = data[offset++];
		let pfABitMask = data[offset++];

		// Caps
		let caps = data[offset++];
		let caps2 = data[offset++];

		// Skip caps3, caps4 and reserved2
		offset += 3;

		// Do we need to parse the DX10 extended header?
		let hasExtendedHeader = false;
		let exDXGIFormat = 0;
		let exDimensions = 0;
		let exMisc = 0;
		let exArraySize = 0;
		let exMisc2 = 0;
		if ((pfFlags & TextureUtils.DDPF_FOURCC) == TextureUtils.DDPF_FOURCC &&
			pfFourCC == TextureUtils.DDS_FOUR_CC_DX10_EXTENDED_HEADER)
		{
			hasExtendedHeader = true;
			exDXGIFormat = data[offset++];
			exDimensions = data[offset++];
			exMisc = data[offset++];
			exArraySize = data[offset++];
			exMisc2 = data[offset++];
		}

		// Should be at the pixel data now
		// But first - figure out the actual format
		let bgraFlip = false;
		let compressed = false;
		let compBlockSize = 0;

		// Currently only supporting a subset of formats!
		let format = DXGI_FORMAT_UNKNOWN;
		if (exDXGIFormat != 0)
		{
			format = exDXGIFormat;
		}
		else if ((pfFlags & TextureUtils.DDPF_RGB) == TextureUtils.DDPF_RGB &&
			pfRGBBitCount == 32)  
		{
			// Not a DX10 header, so manual format sussing

			// Look for 32-bit formats first
			let masks = [pfRBitMask, pfGBitMask, pfBBitMask, pfABitMask];

			if (TextureUtils.#CheckMasks(masks, 0x000000ff, 0x0000ff00, 0x00ff0000, 0xff000000))
			{
				format = DXGI_FORMAT_R8G8B8A8_UNORM;
			}
			else if (TextureUtils.#CheckMasks(masks, 0x00ff0000, 0x0000ff00, 0x000000ff, 0xff000000))
			{
				//format = DXGI_FORMAT_B8G8R8A8_UNORM; // Not actually supporting BGRA!
				format = DXGI_FORMAT_R8G8B8A8_UNORM;
				bgraFlip = true;
			}
			else if (TextureUtils.#CheckMasks(masks, 0x00ff0000, 0x0000ff00, 0x000000ff, 0))
			{
				//format = DXGI_FORMAT_B8G8R8X8_UNORM; // Not actually supporting BGRA!
				format = DXGI_FORMAT_R8G8B8A8_UNORM;
				bgraFlip = true;
			}
		}
		else if ((pfFlags & TextureUtils.DDPF_FOURCC) == TextureUtils.DDPF_FOURCC)
		{
			// Use FourCC to check texture
			switch (pfFourCC)
			{
				// Block compression (DXT formats)
				case TextureUtils.DDS_FOUR_CC_DXT1:
					format = DXGI_FORMAT_BC1_UNORM;
					compressed = true;
					compBlockSize = 8;
					break;

				case TextureUtils.DDS_FOUR_CC_DXT2:
				case TextureUtils.DDS_FOUR_CC_DXT3:
					format = DXGI_FORMAT_BC2_UNORM;
					compressed = true;
					compBlockSize = 16;
					break;

				case TextureUtils.DDS_FOUR_CC_DXT4: 
				case TextureUtils.DDS_FOUR_CC_DXT5:
					format = DXGI_FORMAT_BC3_UNORM;
					compressed = true;
					compBlockSize = 16;
					break;

				// Older D3DFORMAT values
				case 113: format = DXGI_FORMAT_R16G16B16A16_FLOAT;
				case 116: format = DXGI_FORMAT_R32G32B32A32_FLOAT;
			}
		}

		// Check the format
		if (format == DXGI_FORMAT_UNKNOWN)
			throw new Error("Invalid DDS file or format not supported.  Format: " + format);

		// Validate other data
		if ((caps2 & TextureUtils.DDS_CUBEMAP_ALLFACES) == 0)
			throw new Error("Invalid DDS cube map - file not flagged as cube map in header");

		if (hasExtendedHeader && ((exMisc & TextureUtils.DDS_RESOURCE_MISC_TEXTURECUBE) == 0))
			throw new Error("Invalid DDS cube map - extended header missing cube map flag");

		if (width != height)
			throw new Error("Invalid DDS cube map - width and height of each face must be the same");

		// TODO:
		// - Array of cube maps ? Should we disallow?
		// - TEST NEW LOADING WITH COMPRESSION - Not really taking compressed size into account anymore

		// Each face needs its own array!
		let bytesPerPixel = TextureUtils.GetDXGIFormatBytesPerPixel(format);
		let faceStartByte = offset * 4; // Convert offset to bytes
		//let faceSizeInChannels = width * height * 4;
		//let faceSizeInBytes = width * height * bytesPerPixel;
		//if (compressed)
		//{
		//	// Can't rely on linear size from file - figure it out ourselves
		//	faceSizeInBytes =
		//		Math.max(1, Math.floor((width + 3) / 4)) *
		//		Math.max(1, Math.floor((height + 3) / 4)) *
		//		compBlockSize;
		//}

		let faceDataArrays = [];
		let dataByteOffset = faceStartByte;
		for (let f = 0; f < 6; f++)
		{
			for (let m = 0; m < mipLevels; m++)
			{
				// Calculate sizes for this mip
				let div = Math.pow(2, m);
				let mipWidth = Math.max(1, Math.floor(width / div));
				let mipHeight = Math.max(1, Math.floor(height / div));
				let mipElements = mipWidth * mipHeight * 4; // 4 channels
				let mipSizeInBytes = mipElements;

				// Can't rely on standard sizing for compressed images
				if (compressed)
				{
					mipElements =
						Math.max(1, Math.floor((mipWidth + 3) / 4)) *
						Math.max(1, Math.floor((mipHeight + 3) / 4)) *
						compBlockSize;

					mipSizeInBytes = mipElements;
				}

				// Determine the type of data to store
				let mipData;
				switch (format)
				{
					case DXGI_FORMAT_R32G32B32A32_FLOAT:
						mipSizeInBytes = mipElements * 4;
						mipData = new Float32Array(dataFromFile, dataByteOffset, mipElements);
						break;

					case DXGI_FORMAT_R16G16B16A16_FLOAT:
						mipSizeInBytes = mipElements * 2;
						mipData = new Uint16Array(dataFromFile, dataByteOffset, mipElements);
						break;

					default:
						mipData = new Uint8Array(dataFromFile, dataByteOffset, mipElements);
						break;
					// TODO: Handle other formats
				}

				// Offset past this mip
				dataByteOffset += mipSizeInBytes;// mipWidth * mipHeight * bytesPerPixel;

				// Flip
				if (compressed)
					TextureUtils.#FlipCompressedTextureData(mipData, mipWidth, mipHeight, format);
				else
					TextureUtils.#FlipTextureData(mipData, mipWidth, mipHeight, format, bgraFlip);

				// Push into overall data array
				faceDataArrays.push(mipData);
			}
		}

		// Return all the info we have
		return [width, height, mipLevels, format, faceDataArrays];
	}

	static #SwapAndFlipBlocks(pixels, index0, index1, format)
	{
		switch (format)
		{
			case DXGI_FORMAT_BC1_UNORM:
				{
					// Grab data at index 0
					let b00 = pixels[index0 + 0];
					let b01 = pixels[index0 + 1];
					let b02 = pixels[index0 + 2];
					let b03 = pixels[index0 + 3];
					let b04 = pixels[index0 + 4];
					let b05 = pixels[index0 + 5];
					let b06 = pixels[index0 + 6];
					let b07 = pixels[index0 + 7];

					// Overwrite data at index 0 with index 1
					// Note: Flipping the last 4 to flip the block on Y
					pixels[index0 + 0] = pixels[index1 + 0];
					pixels[index0 + 1] = pixels[index1 + 1];
					pixels[index0 + 2] = pixels[index1 + 2];
					pixels[index0 + 3] = pixels[index1 + 3];
					pixels[index0 + 4] = pixels[index1 + 7]; // Flipped
					pixels[index0 + 5] = pixels[index1 + 6]; // Flipped
					pixels[index0 + 6] = pixels[index1 + 5]; // Flipped
					pixels[index0 + 7] = pixels[index1 + 4]; // Flipped

					// Overwrite index 1
					// Note: Flipping the last 4 to flip the block on Y
					pixels[index1 + 0] = b00;
					pixels[index1 + 1] = b01;
					pixels[index1 + 2] = b02;
					pixels[index1 + 3] = b03;
					pixels[index1 + 4] = b07; // Flipped
					pixels[index1 + 5] = b06; // Flipped
					pixels[index1 + 6] = b05; // Flipped
					pixels[index1 + 7] = b04; // Flipped
				}
				break;

			case DXGI_FORMAT_BC2_UNORM:
				{
					// Grab data at index 0
					let a00 = pixels[index0 + 0];
					let a01 = pixels[index0 + 1];
					let a02 = pixels[index0 + 2];
					let a03 = pixels[index0 + 3];
					let a04 = pixels[index0 + 4];
					let a05 = pixels[index0 + 5];
					let a06 = pixels[index0 + 6];
					let a07 = pixels[index0 + 7];
					let b00 = pixels[index0 + 8];
					let b01 = pixels[index0 + 9];
					let b02 = pixels[index0 + 10];
					let b03 = pixels[index0 + 11];
					let b04 = pixels[index0 + 12];
					let b05 = pixels[index0 + 13];
					let b06 = pixels[index0 + 14];
					let b07 = pixels[index0 + 15];

					// Overwrite data at index 0 with index 1
					// Note: Flipping the alpha section and the last 4 bytes to flip the block on Y
					pixels[index0 + 0] = pixels[index1 + 6];
					pixels[index0 + 1] = pixels[index1 + 7];

					pixels[index0 + 2] = pixels[index1 + 4];
					pixels[index0 + 3] = pixels[index1 + 5];

					pixels[index0 + 4] = pixels[index1 + 2];
					pixels[index0 + 5] = pixels[index1 + 3];

					pixels[index0 + 6] = pixels[index1 + 0]; 
					pixels[index0 + 7] = pixels[index1 + 1];

					pixels[index0 + 8] = pixels[index1 + 8]; 
					pixels[index0 + 9] = pixels[index1 + 9]; 
					pixels[index0 + 10] = pixels[index1 + 10];
					pixels[index0 + 11] = pixels[index1 + 11];
					pixels[index0 + 12] = pixels[index1 + 15]; // Flipped
					pixels[index0 + 13] = pixels[index1 + 14]; // Flipped
					pixels[index0 + 14] = pixels[index1 + 13]; // Flipped
					pixels[index0 + 15] = pixels[index1 + 12]; // Flipped

					// Overwrite index 1
					// Note: Flipping the last 4 to flip the block on Y
					pixels[index1 + 0] = a06;
					pixels[index1 + 1] = a07;
										 
					pixels[index1 + 2] = a04;
					pixels[index1 + 3] = a05;
										 
					pixels[index1 + 4] = a02;
					pixels[index1 + 5] = a03;

					pixels[index1 + 6] = a00;
					pixels[index1 + 7] = a01;

					pixels[index1 + 8] = b00;
					pixels[index1 + 9] = b01;
					pixels[index1 + 10] = b02;
					pixels[index1 + 11] = b03;
					pixels[index1 + 12] = b07; // Flipped
					pixels[index1 + 13] = b06; // Flipped
					pixels[index1 + 14] = b05; // Flipped
					pixels[index1 + 15] = b04; // Flipped
				}
				break;

			case DXGI_FORMAT_BC3_UNORM:
				throw new Error("BC3 not yet implemented");
		}
	}

	static #FlipCompressedTextureData(pixels, width, height, format)
	{
		// Get the real width and height
		let blocksX = Math.max(1, Math.floor((width + 3) / 4));
		let blocksY = Math.max(1, Math.floor((height + 3) / 4));
		let blockSize = 0;
		switch (format)
		{
			case DXGI_FORMAT_BC1_UNORM: blockSize = 8; break;
			case DXGI_FORMAT_BC2_UNORM: blockSize = 16; break;
			case DXGI_FORMAT_BC3_UNORM: blockSize = 16; break;
			default: throw new Error("Invalid or unsupported format");
		}
		
		let halfY = blocksY / 2;
		for (let h = 0; h < halfY; h++)
		{
			let yFlip = blocksY - h - 1;
			for (let w = 0; w < blocksX; w++)
			{
				let top = h * (blocksX * blockSize) + (w * blockSize);
				let bot = yFlip * (blocksX * blockSize) + (w * blockSize);
				
				this.#SwapAndFlipBlocks(pixels, top, bot, format);
			}
		}

	}

	static #FlipTextureData(pixels, width, height, format, bgraFlip)
	{
		let bytesPerPixel = 4;// TextureUtils.GetDXGIFormatBytesPerPixel(format);

		let halfHeight = height / 2;
		for (let h = 0; h < halfHeight; h++)
		{
			let yFlip = height - h - 1;
			for (let w = 0; w < width; w++)
			{
				// Calculate byte start for both pixels
				let pos = h * (width * bytesPerPixel) + (w * bytesPerPixel);
				let posFlip = yFlip * (width * bytesPerPixel) + (w * bytesPerPixel);

				// Flip Y as we go
				TextureUtils.#SwapPixels(pixels, pos, posFlip, bgraFlip);
			}
		}
	}

	static #SwapPixels(pixels, index0, index1, bgraFlip)
	{
		// Read index 0's pixel components
		let r0 = pixels[index0 + 0];
		let g0 = pixels[index0 + 1];
		let b0 = pixels[index0 + 2];
		let a0 = pixels[index0 + 3];

		// Read index 1's pixel components
		let r1 = pixels[index1 + 0];
		let g1 = pixels[index1 + 1];
		let b1 = pixels[index1 + 2];
		let a1 = pixels[index1 + 3];

		// Swap 0 and 1, and possibly R and B
		pixels[index0 + 0] = bgraFlip ? b1 : r1;
		pixels[index0 + 1] = g1;
		pixels[index0 + 2] = bgraFlip ? r1 : b1;
		pixels[index0 + 3] = a1;

		pixels[index1 + 0] = bgraFlip ? b0 : r0;
		pixels[index1 + 1] = g0;
		pixels[index1 + 2] = bgraFlip ? r0 : b0;
		pixels[index1 + 3] = a0;
	}

	/**
	 * Write the specified pixel data to a DDS file and initiates the "download".
	 * Format details: https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide
	 * Note: The exact layout of the pixel data is dependant upon the width, height
	 * mip levels and whether or not this is a cube map.
	 * 
	 * @param {string} fileName The file name to save
	 * @param {number} width Width in pixels
	 * @param {number} height Height in pixels
	 * @param {number} mipLevels Number of mip levels
	 * @param {number} arraySizeOrCubeCount Number of array elements (or number of cubes, if also a cube map)
	 * @param {boolean} isCube Is this a cube map?
	 * @param {number} dxgiFormat The pixel format of the data
	 * @param {TypedArray} pixelData TypedArray of pixel data
	 */
	static WriteDDSFile(fileName, width, height, mipLevels, arraySizeOrCubeCount, isCube, dxgiFormat, pixelData)
	{
		// Flags for header
		let flags =
			TextureUtils.DDS_HEADER_FLAGS_TEXTURE |
			TextureUtils.DDSD_PITCH |
			(mipLevels > 1 ? TextureUtils.DDSD_MIPMAPCOUNT : 0);
		let caps =
			TextureUtils.DDSCAPS_TEXTURE |
			(mipLevels > 1 || isCube ? TextureUtils.DDSCAPS_COMPLEX : 0) |
			(mipLevels > 1 ? TextureUtils.DDSCAPS_MIPMAP : 0);
		let caps2 = isCube ? TextureUtils.DDS_CUBEMAP_ALLFACES : 0;
		let pixelFormatFlags = TextureUtils.DDPF_RGB | TextureUtils.DDPF_ALPHAPIXELS;

		// Calculations for header
		let bytesPerPixel = TextureUtils.GetDXGIFormatBytesPerPixel(dxgiFormat);
		let bitsPerPixel = bytesPerPixel * 8;
		let pitch = Math.trunc((width * bitsPerPixel + 7) / 8);
		// Pitch formula here: https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide

		let header = new Uint32Array([
			TextureUtils.DDS_MAGIC_NUMBER, // Magic number for DDS files: 'DDS ' (0x20534444)

			// --- Starting standard header ---
			124, // Header size, always 124
			flags,
			width, // Width
			height, // Height
			pitch,
			1, // Depth (Unused for non-volume textures - maybe just set to zero?)
			mipLevels,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 11x unused (reserved) entries
			// --- Pixel format ---
			/* dwSize        */ 32, // Always 32
			/* dwFlags       */ TextureUtils.DDPF_FOURCC,  // Assuming we're using the extended header for all formats!
			/* dwFourCC      */ TextureUtils.DDS_FOUR_CC_DX10_EXTENDED_HEADER,   // Needs to be "DX10", but left-to-right: '0', '1', 'X', 'D'
			/* dwRGBBitCount */ bitsPerPixel, 
			/* dwRBitMask    */ 0, // The following are all zeros since the extended header handles format details (right?)
			/* dwGBitMask    */ 0,
			/* dwBBitMask    */ 0,
			/* dwABitMask    */ 0,
			// --- End pixel format ---
			caps,
			caps2,
			0, 0, 0, // Caps3, caps4 & reserved2
			// --- End standard header ---

			// --- Starting DX10 Extended header ---
			/* DXGI Format */ dxgiFormat,
			/* Dimensions  */ TextureUtils.DDS_DIMENSION_TEXTURE2D, // Assuming 2D only for now!
			/* Misc (cube) */ isCube ? TextureUtils.DDS_RESOURCE_MISC_TEXTURECUBE : 0,
			/* ArraySize   */ arraySizeOrCubeCount, // Array elements OR cube count, NEVER cubeCount * 6
			/* Misc2       */ 0 
			// --- End extended header ---
		]);

		// Create the file to save
		let fileBlob = new Blob([header, pixelData], { type: "image/vnd-ms.dds" });
		let file = window.URL.createObjectURL(fileBlob);

		// Quick HTML element to initiate the "download"
		let aTag = document.createElement("a");
		aTag.setAttribute("download", fileName);
		aTag.href = file;
		aTag.click();
		aTag.remove();
	}

	/**
	 * Write the specified pixel data to a PNG file and initiates the "download"
	 * 
	 * @param {string} fileName The file name to save
	 * @param {TypedArray} pixelData TypedArray of pixel data
	 * @param {number} width Width in pixels
	 * @param {number} height Height in pixels
	 * @param {boolean} flipY Should the pixel data be flipped on the Y axis?
	 */
	static WritePNGFile(fileName, pixelData, width, height, elementsPerPixel = 4, flipY = false)
	{
		// Create a canvas element with the proper size
		let canvas = document.createElement("canvas");
		let canvasContext = canvas.getContext("2d");
		let imageData = canvasContext.createImageData(width, height);

		// Copy data to the canvas image
		// Need to flip the Y axis!
		let rowWidth = width * elementsPerPixel;
		for (let y = 0; y < height; y++)
		{
			let flippedY = height - y - 1;
			for (let x = 0; x < rowWidth; x++)
			{
				let readIndex = x + y * rowWidth;
				let writeIndex = x + flippedY * rowWidth;

				imageData.data[writeIndex] = pixelData[readIndex];
			}
		}

		// Put the data into the canvas
		canvas.width = width;
		canvas.height = height;
		canvasContext.putImageData(imageData, 0, 0);

		// Create an HTML element to initiate the "download"
		let aTag = document.createElement("a");
		aTag.setAttribute("download", fileName);
		aTag.href = canvas.toDataURL("image/png");
		aTag.click();
		aTag.remove();
	}

	/**
	 * Write the specified pixel data to a TGA file and initiates the "download".
	 * Note: This function assumes the pixel data is 32 bits per pixel
	 * 
	 * @param {string} fileName The file name to save
	 * @param {TypedArray} pixelData TypedArray of pixel data
	 * @param {number} width Width in pixels
	 * @param {number} height Height in pixels
	 */
	static WriteTGAFile(fileName, pixelData, width, height)
	{
		let header = new Uint8Array([
			0, 0, 2, // No ID field, no color map, image type 2
			0, 0, 0, 0, 0, // Color map details (none)
			0, 0, // Image origin X (0) as two bytes
			0, 0, // Image origin Y (0) as two bytes
			Math.floor(width % 256), Math.floor(width / 256), // Image width (two bytes)
			Math.floor(height % 256), Math.floor(height / 256), // Image height (two bytes)
			32, // Bits per pixel
			0x20
		]);

		// Create the file to save
		let fileBlob = new Blob([header, pixelData], { type: "image/x-targa" });
		let file = window.URL.createObjectURL(fileBlob);

		// Create an HTML element to initiate the "download"
		let aTag = document.createElement("a");
		aTag.setAttribute("download", fileName);
		aTag.href = file;
		aTag.click();
		aTag.remove();
	}

	/**
	 * Calculates spherical harmonics for the given cubemap
	 * 
	 * @param {ID3D11Device} device D3D device
	 * @param {ID3D11DeviceContext} context D3D device context
	 * @param {ID3D11ShaderResourceView} cubeSRV SRV for a cubemap
	 * @param {boolean} isHDR Is this cubemap HDR?  (If so, no gamma correction is applied)
	 * 
	 * @returns {Array<Vector3>} Array of 9 normalized SH colors for the cubemap
	 */
	static SHFromCubemap(device, context, cubeSRV, isHDR)
	{
		// Grab data from cube map
		let res = cubeSRV.GetResource();
		let [cubeWidth, cubeHeight, mipLevels, arraySize, isCubemap, format, pixels] = TextureUtils.ReadPixelDataFromTexture(device, context, res);
		res.Release();

		// Validate texture
		if (!isCubemap)
			throw new Error("Cannot calculate SH - texture is not a cube map");

		let channels = 4; // TODO: Align with format
		let scanlineFloats = cubeWidth * channels;
		let faceFloats = scanlineFloats * cubeWidth;

		let totalWeight = 0;
		let color9 = [];
		for (let i = 0; i < 9; i++)
			color9[i] = Vector3.Zero;

		for (let face = 0; face < 6; face++)
		{
			for (let y = 0; y < cubeWidth; y++)
			{
				for (let x = 0; x < cubeWidth; x++)
				{
					let pixelStart =
						face * faceFloats +
						y * scanlineFloats +
						x * channels;

					// Grab this pixel color
					let color = new Vector3(
						pixels[pixelStart + 0],
						pixels[pixelStart + 1],
						pixels[pixelStart + 2]);

					// Convert to linear?
					if (!isHDR)
					{
						color.x = Math.pow(color.x, 2.2);
						color.y = Math.pow(color.y, 2.2);
						color.z = Math.pow(color.z, 2.2);
					}

					// Convert to -1 to 1 range
					let u = ((x + 0.5) / cubeWidth) * 2 - 1;
					let v = ((y + 0.5) / cubeWidth) * 2 - 1;

					// Calc weight to account for cube map -> sphere difference
					let denom = 1 + u * u + v * v;
					let weight = 4 / (Math.sqrt(denom) * denom);
					totalWeight += weight;

					// Calculate SH for the color in this direction
					let dir = TextureUtils.#CubePixelToDirection(face, u, v);
					let color9Dir = TextureUtils.#CalcSHForDirection(dir, color);
					for (let i = 0; i < 9; i++)
						color9[i] = Vector3.Add(color9[i], Vector3.Multiply(color9Dir[i], weight));

				}
			}
		}

		// Normalize the result before returning
		let normFactor = 4 * Math.PI / totalWeight;
		for (let i = 0; i < 9; i++)
			color9[i] = Vector3.Multiply(color9[i], normFactor);

		// NOT gamma corrected!
		return color9;

		// FOR LATER:
		// With PI:
		// A0 = PI
		// A1 = 2 * PI / 3
		// A2 = PI / 4
		//
		// Without PI:
		// A0 = 1.0
		// A1 = 2.0 / 3.0
		// A2 = 0.25
	}

	/**
	 * Calculates spherical harmonics for a given direction and color
	 * 
	 * @param {Vector3} dir Normalized direction
	 * @param {Vector3} color RGB color
	 * 
	 * @returns {Array<Vector3>} Array of 9 SH "color" values
	 */
	static #CalcSHForDirection(dir, color)
	{
		let sh9 = new Float32Array(9);
		sh9[0] = 0.282095;
		sh9[1] = 0.488603 * dir.y;
		sh9[2] = 0.488603 * dir.z;
		sh9[3] = 0.488603 * dir.x;
		sh9[4] = 1.092548 * dir.x * dir.y;
		sh9[5] = 1.092548 * dir.y * dir.z;
		sh9[6] = 0.315392 * (3 * dir.z * dir.z - 1);
		sh9[7] = 1.092548 * dir.x * dir.z;
		sh9[8] = 0.546274 * (dir.x * dir.x - dir.y * dir.y);

		let color9 = [];
		for (let i = 0; i < 9; i++)
			color9[i] = Vector3.Multiply(color, sh9[i]);

		return color9;
	}

	/**
	 * Calculates a normalized direction for a pixel of a cubemap
	 * 
	 * @param {number} face Cubemap face index 0-5 corresponding to -X, +X, -Y, +Y, -Z, +Z
	 * @param {number} u Horizontal point on the face, in the range -1 to 1
	 * @param {number} v Vertical point on the face, in the range -1 to 1
	 * 
	 * @returns {Vector3} Normalized direction toward the specified pixel
	 */
	static #CubePixelToDirection(face, u, v)
	{
		let dir;
		switch (face)
		{
			default:
			case 0: dir = new Vector3(+1, -v, -u); break;
			case 1: dir = new Vector3(-1, -v, +u); break;
			case 2: dir = new Vector3(+u, +1, +v); break;
			case 3: dir = new Vector3(+u, -1, -v); break;
			case 4: dir = new Vector3(+u, -v, +1); break;
			case 5: dir = new Vector3(-u, -v, -1); break;
		}
		return Vector3.Normalize(dir);
	}

	/**
	 * Gets the bytes per pixel for the given DXGI format
	 * 
	 * @param {any} format A DXGI_FORMAT value
	 * 
	 * @returns {number} The number of bytes for the given format
	 */
	static GetDXGIFormatBytesPerPixel(format)
	{
		switch (format)
		{
			case DXGI_FORMAT_R32G32B32A32_FLOAT:
				return 16;

			case DXGI_FORMAT_R32G32B32_FLOAT:
				return 12;

			case DXGI_FORMAT_R16G16B16A16_FLOAT:
			case DXGI_FORMAT_R32G32_FLOAT:
				return 8;

			case DXGI_FORMAT_R8G8B8A8_UNORM:
			case DXGI_FORMAT_R8G8B8A8_UNORM_SRGB:
			case DXGI_FORMAT_R16G16_FLOAT:
			case DXGI_FORMAT_R32_FLOAT:
			case DXGI_FORMAT_R32_UINT:
			case DXGI_FORMAT_D24_UNORM_S8_UINT:
				return 4;

			case DXGI_FORMAT_D16_UNORM:
			case DXGI_FORMAT_R16_UINT:
				return 2;

			// Unknown
			default:
				return 0;
		}
	}

	/**
	 * Gets the bits per pixel for the given DXGI format
	 * 
	 * @param {any} format A DXGI_FORMAT value
	 * 
	 * @returns {number} The number of bits for the given format
	 */
	static GetDXGIFormatBitsPerPixel(format)
	{
		return TextureUtils.GetDXGIFormatBytesPerPixel(format) * 8;
	}
}
