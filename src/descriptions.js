
// -----------------------------------------------------
// ------------------- Descriptions --------------------
// -----------------------------------------------------


class D3D11_BUFFER_DESC
{
	ByteWidth;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;
	StructureByteStride;

	constructor(
		byteWidth,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags,
		structureByteStride)
	{
		this.ByteWidth = byteWidth;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
		this.StructureByteStride = structureByteStride;
	}
}

class D3D11_DEPTH_STENCIL_DESC
{
	DepthEnable;
	DepthWriteMask;
	DepthFunc;
	StencilEnable;
	StencilReadMask;
	StencilWriteMask;
	FrontFace;
	BackFace;

	constructor(
		depthEnable = true,
		depthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL,
		depthFunc = D3D11_COMPARISON_LESS,
		stencilEnable = false,
		stencilReadMask = D3D11_DEFAULT_STENCIL_READ_MASK,
		stencilWriteMask = D3D11_DEFAULT_STENCIL_READ_MASK,
		frontFace = new D3D11_DEPTH_STENCILOP_DESC(),
		backFace = new D3D11_DEPTH_STENCILOP_DESC())
	{
		this.DepthEnable = depthEnable;
		this.DepthWriteMask = depthWriteMask;
		this.DepthFunc = depthFunc;
		this.StencilEnable = stencilEnable;
		this.StencilReadMask = stencilReadMask;
		this.StencilWriteMask = stencilWriteMask;
		this.FrontFace = structuredClone(frontFace);
		this.BackFace = structuredClone(backFace);
	}
}

class D3D11_DEPTH_STENCILOP_DESC
{
	StencilFailOp;
	StencilDepthFailOp;
	StencilPassOp;
	StencilFunc;

	constructor(
		stencilFailOp = D3D11_STENCIL_OP_KEEP,
		stencilDepthFailOp = D3D11_STENCIL_OP_KEEP,
		stencilPassOp = D3D11_STENCIL_OP_KEEP,
		stencilFunc = D3D11_COMPARISON_ALWAYS)
	{
		this.StencilFailOp = stencilFailOp;
		this.StencilDepthFailOp = stencilDepthFailOp;
		this.StencilPassOp = stencilPassOp;
		this.StencilFunc = stencilFunc;
	}
}

class D3D11_DEPTH_STENCIL_VIEW_DESC
{
	Format;
	ViewDimension;
	Flags;

	MipSlice;
	FirstArraySlice;
	ArraySize;
	// The actual description has these union'd
	// together, but I've opted to simply include
	// their common members above
	// Texture1D;
	// Texture1DArray;
	// Texture2D;
	// Texture2DArray;
	// Texture2DMS;
	// Texture2DMSArray;


	constructor(
		format,
		viewDimension,
		flags = 0,
		mipSlice = 0,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.Flags = flags;
		this.MipSlice = mipSlice;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}
}

/**
 * A description of a single element for the input-assembler stage
 */
class D3D11_INPUT_ELEMENT_DESC 
{
	SemanticName;
	SemanticIndex;
	Format;
	InputSlot;
	AlignedByteOffset;
	InputSlotClass;
	InstanceDataStepRate;

	/**
	 * Creates a new Input Element description
	 * 
	 * @param {string} semanticName The HLSL semantic associated with this element in a shader input-signature
	 * @param {number} semanticIndex The semantic index for the element. A semantic index modifies a semantic, with an integer index number.
	 * @param {any} format The data type of the element data
	 * @param {number} inputSlot An integer value that identifies the input-assembler slot
	 * @param {number} alignedByteOffset Offset (in bytes) from the start of the vertex. Use D3D11_APPEND_ALIGNED_ELEMENT for convenience to define the current element directly after the previous one, including any packing if necessary.
	 * @param {any} inputSlotClass Identifies the input data class (per vertex or per instance) for a single input slot
	 * @param {number} instanceDataStepRate The number of instances to draw using the same per-instance data before advancing in the buffer by one element. This value must be 0 for an element that contains per-vertex data.
	 */
	constructor(
		semanticName,
		semanticIndex,
		format,
		inputSlot,
		alignedByteOffset,
		inputSlotClass,
		instanceDataStepRate)
	{
		this.SemanticName = semanticName;
		this.SemanticIndex = semanticIndex;
		this.Format = format;
		this.InputSlot = inputSlot;
		this.AlignedByteOffset = alignedByteOffset;
		this.InputSlotClass = inputSlotClass;
		this.InstanceDataStepRate = instanceDataStepRate;
	}
}


/**
 * Describes a rasterizer state
 */
class D3D11_RASTERIZER_DESC
{
	FillMode;
	CullMode;
	FrontCounterClockwise;
	DepthBias;
	DepthBiasClamp;
	SlopeScaledDepthBias;
	DepthClipEnable;
	ScissorEnable;
	MultisampleEnable;
	AntiasliasedLineEnable;

	/**
	 * Creates a new Rasterizer State description
	 * 
	 * @param {any} fillMode Determines the fill mode to use when rendering
	 * @param {any} cullMode Indicates triangles facing the specified direction are not drawn
	 * @param {boolean} frontCounterClockwise Determines if a triangle is front- or back-facing. If this parameter is TRUE, a triangle will be considered front-facing if its vertices are counter-clockwise on the render target and considered back-facing if they are clockwise. If this parameter is FALSE, the opposite is true.
	 * @param {number} depthBias Depth value added to a given pixel
	 * @param {number} depthBiasClamp Maximum depth bias of a pixel
	 * @param {number} slopeScaledDepthBias Scalar on a given pixel's slope
	 * @param {boolean} depthClipEnable Enable clipping based on distance
	 * @param {boolean} scissorEnable Enable scissor-rectangle culling. All pixels outside an active scissor rectangle are culled.
	 * @param {boolean} multisampleEnable Enable multi-sampling
	 * @param {boolean} antialiasedLineEnable Specifies whether to enable line antialiasing
	 */
	constructor(
		fillMode,
		cullMode,
		frontCounterClockwise = false,
		depthBias = 0,
		depthBiasClamp = 0,
		slopeScaledDepthBias = 0,
		depthClipEnable = true,
		scissorEnable = false,
		multisampleEnable = false,
		antialiasedLineEnable = false)
	{
		this.FillMode = fillMode;
		this.CullMode = cullMode;
		this.FrontCounterClockwise = frontCounterClockwise;
		this.DepthBias = depthBias;
		this.DepthBiasClamp = depthBiasClamp;
		this.SlopeScaledDepthBias = slopeScaledDepthBias;
		this.DepthClipEnable = depthClipEnable;
		this.ScissorEnable = scissorEnable;
		this.MultisampleEnable = multisampleEnable;
		this.AntiasliasedLineEnable = antialiasedLineEnable;
	}
}

/**
 * Specifies the subresources from a resource that are accessible using a render-target view
 */
class D3D11_RENDER_TARGET_VIEW_DESC
{
	Format; // NO typeless, if DXGI_FORMAT_UNKNOWN then resource type is used
	ViewDimension;

	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_RTV)
	MipSlice;
	FirstArraySlice;	// Or FirstWSlice for 3D textures
	ArraySize;			// Or WSize for 3D textures

	/**
	 * Creates a new Render Target View description
	 * 
	 * @param {any} format The data format
	 * @param {any} viewDimension The resource type which specifies how the render-target resource will be accessed
	 * @param {number} mipSlice The index of the mipmap level to use
	 * @param {number} firstArraySlice The index of the first texture to use in an array of textures
	 * @param {number} arraySize Number of textures in the array to use in the render target view, starting with FirstArraySlice
	 */
	constructor(
		format,
		viewDimension,
		mipSlice = 0,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.MipSlice = mipSlice;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}
}

/**
 * Describes a sampler state
 */
class D3D11_SAMPLER_DESC
{
	Filter;
	AddressU;
	AddressV;
	AddressW;
	MipLODBias;
	MaxAnisotropy;
	ComparisonFunc;
	BorderColor;
	MinLOD;
	MaxLOD;

	/**
	 * Creates a new Sampler State description 
	 * 
	 * @param {any} filter Filtering method to use when sampling a texture
	 * @param {any} addressU Method to use for resolving a u texture coordinate that is outside the 0 to 1 range
	 * @param {any} addressV Method to use for resolving a v texture coordinate that is outside the 0 to 1 range
	 * @param {any} addressW Method to use for resolving a w texture coordinate that is outside the 0 to 1 range
	 * @param {number} mipLODBias Offset from the calculated mipmap level
	 * @param {number} maxAnisotropy Clamping value used if filter is anisotropic. Valid values are between 1 and 16.
	 * @param {any} comparisonFunc A function that compares sampled data against existing sampled data
	 * @param {Array<number>} borderColor Border color to use if D3D11_TEXTURE_ADDRESS_BORDER is specified for AddressU, AddressV, or AddressW (unsupported in WebGL?)
	 * @param {number} minLOD Lower end of the mipmap range to clamp access to
	 * @param {number} maxLOD Upper end of the mipmap range to clamp access to. To have no upper limit on LOD set this to a large value such as D3D11_FLOAT32_MAX.
	 */
	constructor(
		filter,
		addressU,
		addressV,
		addressW,
		mipLODBias,
		maxAnisotropy,
		comparisonFunc,
		borderColor,
		minLOD,
		maxLOD)
	{
		this.Filter = filter;
		this.AddressU = addressU;
		this.AddressV = addressV;
		this.AddressW = addressW;
		this.MipLODBias = mipLODBias;
		this.MaxAnisotropy = maxAnisotropy;
		this.ComparisonFunc = comparisonFunc;
		this.BorderColor = borderColor;
		this.MinLOD = minLOD;
		this.MaxLOD = maxLOD;
	}
}

/**
 * Describes a shader-resource view
 */
class D3D11_SHADER_RESOURCE_VIEW_DESC 
{
	Format;
	ViewDimension;

	// The actual description has these union'd
	// together, but I've opted to simply include
	// their common members above
	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_SRV)

	MostDetailedMip;
	MipLevels;
	FirstArraySlice;	// Or First2DArrayFace for tex cube arrays
	ArraySize;			// Or NumCubes for tex cube arrays

	/**
	 * Creates a new Shader Resource View description
	 * 
	 * @param {any} format The viewing format
	 * @param {any} viewDimension The resource type of the view
	 * @param {any} mostDetailedMip Index of the most detailed mipmap level to use
	 * @param {any} mipLevels The maximum number of mipmap levels for the view of the texture
	 * @param {any} firstArraySlice The index of the first texture to use in an array of textures
	 * @param {any} arraySize Number of textures in the array
	 */
	constructor(
		format,
		viewDimension,
		mostDetailedMip = 0,
		mipLevels = 1,
		firstArraySlice = 0,
		arraySize = 1)
	{
		this.Format = format;
		this.ViewDimension = viewDimension;
		this.MostDetailedMip = mostDetailedMip;
		this.MipLevels = mipLevels;
		this.FirstArraySlice = firstArraySlice;
		this.ArraySize = arraySize;
	}
}


/**
 * Describes a 1D texture
 */
class D3D11_TEXTURE1D_DESC
{
	Width;
	MipLevels;
	ArraySize;
	Format;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture1D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {number} arraySize Number of textures in the texture array (use 1 is no array is desired)
	 * @param {any} format Texture format
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		mipLevels,
		arraySize,
		format,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.MipLevels = mipLevels;
		this.ArraySize = arraySize;
		this.Format = format;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}
}


/**
 * Describes a 2D texture
 */
class D3D11_TEXTURE2D_DESC
{
	Width;
	Height;
	MipLevels;
	ArraySize;
	Format;
	SampleDesc;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture2D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} height Texture height (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {number} arraySize Number of textures in the texture array (use 1 is no array is desired)
	 * @param {any} format Texture format
	 * @param {DXGI_SAMPLE_DESC} sampleDesc Specifies multisampling parameters for the texture
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		height,
		mipLevels,
		arraySize,
		format,
		sampleDesc,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.Height = height;
		this.MipLevels = mipLevels;
		this.ArraySize = arraySize;
		this.Format = format;
		this.SampleDesc = structuredClone(sampleDesc);
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}
}

/**
 * Describes a 3D texture
 */
class D3D11_TEXTURE3D_DESC
{
	Width;
	Height;
	Depth;
	MipLevels;
	Format;
	Usage;
	BindFlags;
	CPUAccessFlags;
	MiscFlags;

	/**
	 * Creates a new Texture3D description
	 * 
	 * @param {number} width Texture width (in texels)
	 * @param {number} height Texture height (in texels)
	 * @param {number} depth Texture depth (in texels)
	 * @param {number} mipLevels The maximum number of mipmap levels in the texture
	 * @param {any} format Texture format
	 * @param {any} usage Value that identifies how the texture is to be read from and written to
	 * @param {any} bindFlags Flags for binding to pipeline stages
	 * @param {any} cpuAccessFlags Specify the types of CPU access allowed (use 0 if CPU access is not required)
	 * @param {any} miscFlags Identify other, less common resource options (use 0 if none of these flags apply)
	 */
	constructor(
		width,
		height,
		depth,
		mipLevels,
		format,
		usage,
		bindFlags,
		cpuAccessFlags,
		miscFlags
	)
	{
		this.Width = width;
		this.Height = height;
		this.Depth = depth;
		this.MipLevels = mipLevels;
		this.Format = format;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}
}

/**
 * Describes multi-sampling parameters for a resource
 */
class DXGI_SAMPLE_DESC
{
	Count;
	Quality;

	/**
	 * Creates a new DXGI Sample description of multi-sampling parameters
	 * @param {number} count The number of multisamples per pixel
	 * @param {number} quality The image quality level (unused in WebGL?)
	 */
	constructor(count = 1, quality = 0)
	{
		this.Count = count;
		this.Quality = quality;
	}
}

/**
 * Simplified swap chain description, removing a majority of
 * DXGI/D3D11 parameters that aren't applicable in WebGL
 */
class DXGI_SWAP_CHAIN_DESC
{
	Width;
	Height;
	Format;

	/**
	 * Creates a new DXGI Swap Chain description
	 * 
	 * @param {Number} width The width of the back buffer
	 * @param {Number} height The height of the back buffer
	 * @param {any} format The back buffer format, either DXGI_FORMAT_R8G8B8A8_UNORM or DXGI_FORMAT_R8G8B8A8_UNORM_SRGB
	 */
	constructor(width, height, format = DXGI_FORMAT_R8G8B8A8_UNORM)
	{
		this.Width = width;
		this.Height = height;
		this.Format = format;
	}
}