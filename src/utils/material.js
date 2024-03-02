

export class Material
{
	VertexShader;
	PixelShader;
	Color;

	PSTextureSRVs;
	PSSamplerStates;

	constructor(vs, ps, color)
	{
		this.VertexShader = vs;
		this.PixelShader = ps;
		this.Color = color;

		this.PSTextureSRVs = [];
		this.PSSamplerStates = [];
	}

	SetPSTextureSRV(index, srv) { this.PSTextureSRVs[index] = srv; }
	SetPSSamplerState(index, samp) { this.PSSamplerStates[index] = samp; }

	PrepareMaterial(context)
	{
		context.PSSetShaderResources(0, this.PSTextureSRVs);
		context.PSSetSamplers(0, this.PSSamplerStates);
	}
}