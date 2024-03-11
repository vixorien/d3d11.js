
// -----------------------------------------------------
// ------------------ Other Structures -----------------
// -----------------------------------------------------

/**
 * Defines the dimensions of a viewport
 */
class D3D11_VIEWPORT
{
	TopLeftX;
	TopLeftY;
	Width;
	Height;
	MinDepth;
	MaxDepth;

	constructor(topLeftX, topLeftY, width, height, minDepth, maxDepth)
	{
		this.TopLeftX = topLeftX;
		this.TopLeftY = topLeftY;
		this.Width = width;
		this.Height = height;
		this.MinDepth = minDepth;
		this.MaxDepth = maxDepth;
	}
}


/**
 * Defines a 2D rectangle
 */
class D3D11_RECT
{
	Left;
	Top;
	Right;
	Bottom;

	/**
	 * Creates a new 2D rectangle
	 * 
	 * @param {Number} left The x position of the left hand side of the box
	 * @param {Number} top The y position of the top of the box
	 * @param {Number} right The x position of the right hand side of the box
	 * @param {Number} bottom The y position of the bottom of the box
	 */
	constructor(left, top, right, bottom)
	{
		this.Left = left;
		this.Top = top;
		this.Right = right;
		this.Bottom = bottom;
	}
}


/**
 * Defines a 3D box
 */
class D3D11_BOX
{
	Left;
	Top;
	Front;
	Right;
	Bottom;
	Back;

	/**
	 * Creates a new 3D box.  Coordinates are interpreted as bytes for buffers
	 * and as texels for textures.
	 * 
	 * @param {Number} left The x position of the left hand side of the box
	 * @param {Number} top The y position of the top of the box
	 * @param {Number} right The x position of the right hand side of the box
	 * @param {Number} bottom The y position of the bottom of the box
	 * @param {Number} front The z position of the front of the box
	 * @param {Number} back The z position of the back of the box
	 */
	constructor(left, top, right, bottom, front = 0, back = 1)
	{
		this.Left = left;
		this.Top = top;
		this.Right = right;
		this.Bottom = bottom;
		this.Front = front;
		this.Back = back;
	}

	/**
	 * Determines if the box is empty (one or more dimensions have a size of zero)
	 */
	IsEmpty()
	{
		return ( // Need something on the "return" line for javascript :/
			this.Right <= this.Left ||
			this.Bottom <= this.Top ||
			this.Back <= this.Front
		);
	}
}