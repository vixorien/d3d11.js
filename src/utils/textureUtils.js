
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
}
