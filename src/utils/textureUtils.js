
export class TextureUtils
{
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

	/**
	 * Gets the bytes per pixel for the given DXGI format
	 * 
	 * @param {any} format A DXGI_FORMAT value
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
	 * Write the specified pixel data to a DDS file and initiates the "download".
	 * Format details: format details here: https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide
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
		// Overall Flags
		const DDSD_CAPS = 0x1;
		const DDSD_HEIGHT = 0x2;
		const DDSD_WIDTH = 0x4;
		const DDSD_PITCH = 0x8;
		const DDSD_PIXELFORMAT = 0x1000;
		const DDSD_MIPMAPCOUNT = 0x20000;
		const DDSD_LINEARSIZE = 0x80000;
		const DDSD_DEPTH = 0x800000;

		const DDS_HEADER_FLAGS_TEXTURE =
			DDSD_CAPS | DDSD_HEIGHT | DDSD_WIDTH | DDSD_PIXELFORMAT;

		// Caps flags
		const DDSCAPS_COMPLEX = 0x8; // Has more than once surface: mips, cube, etc.
		const DDSCAPS_MIPMAP = 0x400000;
		const DDSCAPS_TEXTURE = 0x1000;

		// Caps2 flags
		const DDSCAPS2_CUBEMAP = 0x200
		const DDSCAPS2_CUBEMAP_POSITIVEX = 0x400;
		const DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800;
		const DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000;
		const DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000;
		const DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000;
		const DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000;
		const DDSCAPS2_VOLUME = 0x200000;

		const DDS_CUBEMAP_ALLFACES =
			DDSCAPS2_CUBEMAP |
			DDSCAPS2_CUBEMAP_POSITIVEX |
			DDSCAPS2_CUBEMAP_NEGATIVEX |
			DDSCAPS2_CUBEMAP_POSITIVEY |
			DDSCAPS2_CUBEMAP_NEGATIVEY |
			DDSCAPS2_CUBEMAP_POSITIVEZ |
			DDSCAPS2_CUBEMAP_NEGATIVEZ;

		// Pixel format flags
		const DDPF_ALPHAPIXELS = 0x1;
		const DDPF_ALPHA = 0x2;
		const DDPF_FOURCC = 0x4; // Used when DXT10 header is needed, set FourCC to 'DX10' (backwards?)
		const DDPF_RGB = 0x40;
		const DDPF_YUV = 0x200;
		const DDPF_LUMINANCE = 0x20000;

		// Extended header details
		const DDS_DIMENSION_TEXTURE1D = 2;
		const DDS_DIMENSION_TEXTURE2D = 3;
		const DDS_DIMENSION_TEXTURE3D = 4;
		const DDS_RESOURCE_MISC_TEXTURECUBE = 0x4;

		// Flags for header
		let flags = DDS_HEADER_FLAGS_TEXTURE | DDSD_PITCH | (mipLevels > 1 ? DDSD_MIPMAPCOUNT : 0);
		let caps =
			DDSCAPS_TEXTURE |
			(mipLevels > 1 || isCube ? DDSCAPS_COMPLEX : 0) |
			(mipLevels > 1 ? DDSCAPS_MIPMAP : 0);
		let caps2 = isCube ? DDS_CUBEMAP_ALLFACES : 0;
		let pixelFormatFlags = DDPF_RGB | DDPF_ALPHAPIXELS;

		// Calculations for header
		let bytesPerPixel = TextureUtils.GetDXGIFormatBytesPerPixel(dxgiFormat);
		let bitsPerPixel = bytesPerPixel * 8;
		let pitch = Math.trunc((width * bitsPerPixel + 7) / 8);
		// Pitch formula here: https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide

		let header = new Uint32Array([
			0x20534444, // Magic number for 'DDS '

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
			/* dwFlags       */ DDPF_FOURCC,  // Assuming we're using the extended header for all formats!
			/* dwFourCC      */ 0x30315844,   // Needs to be "DX10", but left-to-right: '0', '1', 'X', 'D'
			/* dwRGBBitCount */ 0, // The following are all zeros since the extended header handles format details
			/* dwRBitMask    */ 0,
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
			/* Dimensions  */ DDS_DIMENSION_TEXTURE2D, // Assuming 2D only for now!
			/* Misc (cube) */ isCube ? DDS_RESOURCE_MISC_TEXTURECUBE : 0,
			/* Elements    */ arraySizeOrCubeCount, // Array elements OR cube count, NEVER cubeCount * 6
			/* Misc        */ 0 
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
}
