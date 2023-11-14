
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


class D3D11_INPUT_ELEMENT_DESC 
{
	SemanticName;
	SemanticIndex;
	Format;
	InputSlot;
	AlignedByteOffset;
	InputSlotClass;
	InstanceDataStepRate;

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


class D3D11_RENDER_TARGET_VIEW_DESC
{
	Format; // NO typeless, if DXGI_FORMAT_UNKNOWN then resource type is used
	ViewDimension;

	// NOTE: Skipping structured buffer stuff (D3D11_BUFFER_RTV)
	MipSlice;
	FirstArraySlice;	// Or FirstWSlice for 3D textures
	ArraySize;			// Or WSize for 3D textures

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

// Describes a sampler state
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
	// TODO: Remove array slice/size stuff?  WebGL doesn't seem to handle it
	//       Or just keep but rRequire to match resource?

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

	constructor(
		width,
		height,
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
		this.MipLevels = mipLevels;
		this.Format = format;
		this.Usage = usage;
		this.BindFlags = bindFlags;
		this.CPUAccessFlags = cpuAccessFlags;
		this.MiscFlags = miscFlags;
	}
}


class DXGI_SAMPLE_DESC
{
	Count;
	Quality;

	constructor(count, quality)
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