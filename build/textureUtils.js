
export class TextureUtils
{
	/**
	 * Loads an image from a URL as a Texture2D and
	 * optionally generates a mipmap chain for it
	 * 
	 * @param {any} d3dDevice The D3D Device for resource creation
	 * @param {any} d3dContext The D3D Context for mip generation (pass in null to skip mips)
	 * @param {any} fileURL The image file URL
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


