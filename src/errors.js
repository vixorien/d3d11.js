
// -----------------------------------------------------
// -------------- D3D11 & d3d11.js Errors --------------
// -----------------------------------------------------

// See: https://learn.microsoft.com/en-us/windows/win32/direct3d11/d3d11-graphics-reference-returnvalues
// See: https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error

// --- Example Errors ---
//
// 1. Invalid array size on texture2d creation:
//
// D3D11 ERROR: ID3D11Device::CreateTexture2D: The Dimensions are invalid. For feature level D3D_FEATURE_LEVEL_11_0, the Width (value = 256) must be between 1 and 16384, inclusively. The Height (value = 256) must be between 1 and 16384, inclusively. And, the ArraySize (value = 0) must be between 1 and 2048, inclusively. [ STATE_CREATION ERROR #101: CREATETEXTURE2D_INVALIDDIMENSIONS]
//
// 2. Invalid mip levels on tex2d creation:
//
// D3D11 ERROR: ID3D11Device::CreateTexture2D: MipLevels invalid. With the dimensions of Width = 256, Height = 256, and ArraySize = 1, MipLevels (value = 999) must be between 1 and 9, inclusively. [ STATE_CREATION ERROR #102: CREATETEXTURE2D_INVALIDMIPLEVELS]
//
