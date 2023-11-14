
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
}
