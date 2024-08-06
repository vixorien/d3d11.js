# d3d11.js

A D3D11-style wrapper around WebGL2, including an HLSL-to-GLSL parser.  

To see it in action, check out my in-browser IBL utility: https://image-based.lighting

## 💡 The Idea 
I was thinking about creating web-based demos to match some of my D3D11 C++ examples from class.  This gave me an idea: What if I wrap a few WebGL calls in functions that *look* like D3D11?  How hard could that be?

10,000+ lines of code later, I have most of the D3D11 API working in javascript, including a homebrew HLSL-to-GLSL parser/converter.

## 🔺 Step by Step Example - Hello World
### API Initialization
```javascript
const swapChainDesc = new DXGI_SWAP_CHAIN_DESC(800, 600, DXGI_FORMAT_R8G8B8A8_UNORM);

let [device, context, swapChain] = D3D11CreateDeviceAndSwapChain(
	document.getElementById("viewport"),  // A canvas element on the page
	0,                                   
	swapChainDesc); 
```

### Back Buffer Setup & Clear
```javascript
let backBufferRef = swapChain.GetBuffer(); // Also adds 1 to the buffer's reference count
let backBufferRTV = device.CreateRenderTargetView(backBufferRef, null);
backBufferRef.Release(); // Releases 1 reference to the buffer

context.OMSetRenderTargets([backBufferRTV], null);

let cornflowerBlue = [0.39, 0.58, 0.93, 1];
context.ClearRenderTargetView(backBufferRTV, cornflowerBlue);

swapChain.Present();
```

### Example HLSL Shaders
```javascript
let vertexShaderString = `
	struct VSInput
	{
		float3 position : POSITION;
		float4 color    : COLOR;
	};

	struct VertexToPixel
	{
		float4 position : SV_POSITION;
		float4 color    : COLOR;
	};

	VertexToPixel main(VSInput input)
	{
		VertexToPixel output;
		output.position = float4(input.position, 1);
		output.color = input.color;
		return output;
	}
`;

let pixelShaderString = `
	struct VertexToPixel
	{
		float4 position : SV_POSITION;
		float4 color    : COLOR;
	};

	float4 main(VertexToPixel input) : SV_TARGET
	{
		return input.color;
	}
`;
```

### Loading & Binding Shaders
```javascript
let vertexShader = device.CreateVertexShader(vertexShaderString);
let pixelShader = device.CreatePixelShader(pixelShaderString);

context.VSSetShader(vertexShader);
context.PSSetShader(pixelShader);
```

### Creating Geometry
```javascript
// Define the vertices that make up a single triangle
let vertices = new Float32Array([
	// Positions         Colors
	+0.0, +0.5, +0.0,    1,0,0,1,  // Vertex 1
	+0.5, -0.5, +0.0,    0,1,0,1,  // Vertex 2
	-0.5, -0.5, +0.0,    0,0,1,1   // Vertex 3
]);

// Describe the buffer we want, including its size and intended usage
let vbDesc = new D3D11_BUFFER_DESC(
	3 * 7 * Float32Array.BYTES_PER_ELEMENT, // Total size in bytes
	D3D11_USAGE_IMMUTABLE,                  // Data won't change after creation
	D3D11_BIND_VERTEX_BUFFER,               // We can use this as buffer of vertices
	0,   // Not performing any GPU readbacks
	0,   // No other special flags
	0);  // Not a "structured buffer"

// Actually create the buffer, including its initial data
let vertexBuffer = device.CreateBuffer(vbDesc, vertices);
```

### Other Pipeline Setup
```javascript
// Set the API to draw triangles
context.IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);

// Define an array of input element descriptions to describe a single vertex
// - Each element description refers to a single vector in a vertex
let inputElements = [
	new D3D11_INPUT_ELEMENT_DESC(
		"POSITION",                   // Semantic name (matching corresponding vertex shader input)
		0,                            // Semantic index (in the event of multiple similar semantic names: POSITION0, POSITION1, etc.
		DXGI_FORMAT_R32G32B32_FLOAT,  // Format of this element's data - 3x 32-bit floats in this case
		0,                            // Index of the bound vertex buffer containing this data
		0,                            // Offset from the beginning of the vertex (in bytes)
		D3D11_INPUT_PER_VERTEX_DATA,  // Is this data defined per-vertex or per-instance?
		0),                           // Number of instances that will use this data (0 since this is per-vertex)
	new D3D11_INPUT_ELEMENT_DESC(
		"COLOR",
		0,
		DXGI_FORMAT_R32G32B32A32_FLOAT, // 4x 32-bit floats for the color element
		0,
		3 * Float32Array.BYTES_PER_ELEMENT, // Offset past the first element, which contains 3 floats
		D3D11_INPUT_PER_VERTEX_DATA,
		0)
];

// Create the associated Input Layout API object and set it
let inputLayout = device.CreateInputLayout(inputElements);
context.IASetInputLayout(inputLayout);
```

### Bind Geometry & Draw
```javascript
// Set (bind) this buffer as the active vertex buffer
let vbStride = 7 * Float32Array.BYTES_PER_ELEMENT; // Size of a single vertex
let vbOffset = 0; // Offset to the first vertex we want to use
context.IASetVertexBuffers(
	0,               // Index of the first buffer to set
	[vertexBuffer],  // Array of buffers to set (just one in our case)
	[vbStride],      // Array of vertex strides, corresponding to the buffers being set
	[vbOffset]);     // Array of offsets, corresponding to the buffers being set

// Perform a draw
context.Draw(3, 0);
```

## 📝 Details
So, what can this do?  A lot, but not everything.  Below are many of the major components that exist, though not every bell and whistle works just yet.

- **Major API Objects**
  - ID3D11Device
  - ID3D11DeviceContext
  - IDXGISwapChain

- **Resources**
  - ID3D11Buffer (Vertex, Index and Constant buffers)
  - ID3D11Texture1D
  - ID3D11Texture2D (including cube maps)
  - ID3D11Texture3D
 
- **Resource Views**
  - ID3D11DepthStencilView
  - ID3D11RenderTargetView
  - ID3D11ShaderResourceView
 
- **Other API Objects**
  - ID3D11DepthStencilState
  - ID3D11InputLayout
  - ID3D11PixelShader
  - ID3D11RasterizerState
  - ID3D11SamplerState
  - ID3D11VertexShader
 
- **Descriptions**
  - D3D11_BUFFER_DESC
  - D3D11_DEPTH_STENCIL_DESC
  - D3D11_DEPTH_STENCIL_VIEW_DESC
  - D3D11_INPUT_ELEMENT_DESC
  - D3D11_RASTERIZER_DESC
  - D3D11_RENDER_TARGET_VIEW_DESC
  - D3D11_SAMPLER_DESC
  - D3D11_SHADER_RESOURCE_VIEW_DESC
  - D3D11_TEXTURE1D_DESC
  - D3D11_TEXTURE2D_DESC
  - D3D11_TEXTURE3D_DESC
  - DXGI_SWAP_CHAIN_DESC
 
### Not Yet Implemented
What's not done *yet*?  These are possible, but have been low priority.

- Instance rendering
- Stencil operations
- Blending
- Comparison samplers
- Plenty more that I'm forgetting

### Impossible Features
What *can't* be done?  Pretty much anything unsupported by WebGL2.

- Geometry shaders
- Tesselation shaders
- Compute shaders
- Directly mapping resources for reading/writing
- A few misc options scattered throughout existing features

## ❓ Frequently Asked Questions
### Why?
A few reasons:
1. I thought it would be fun (it was!)
2. I wanted it to exist (now it does!)
3. I hoped it would help me refresh my OpenGL (it sure did!)

### Should I use this?
To mess around?  Sure!  For production?  Probably not 😬

### Is this performant?
lol. lmao, even.
