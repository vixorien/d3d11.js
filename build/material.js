

export class Material
{
	VertexShader;
	PixelShader;
	Color;

	constructor(vs, ps, color)
	{
		this.VertexShader = vs;
		this.PixelShader = ps;
		this.Color = color;
	}
}

export class MaterialPBR extends Material
{
	AlbedoSRV;
	NormalSRV;
	MetalSRV;
	RoughSRV;

	constructor(vs, ps, color, albedoSRV, normalSRV, metalSRV, roughSRV)
	{
		super(vs, ps, color);
		this.AlbedoSRV = albedoSRV;
		this.NormalSRV = normalSRV;
		this.MetalSRV = metalSRV;
		this.RoughSRV = roughSRV;
	}
}