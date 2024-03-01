

export class Material
{
	ColorTint;

	constructor(colorTint)
	{
		this.ColorTint = colorTint;
	}
}

export class PBRMaterial extends Material
{
	AlbedoSRV;
	NormalSRV;
	MetalSRV;
	RoughSRV;

	constructor(colorTint, albedoSRV, normalSRV, metalSRV, roughSRV)
	{
		super(colorTint);
		this.AlbedoSRV = albedoSRV;
		this.NormalSRV = normalSRV;
		this.MetalSRV = metalSRV;
		this.RoughSRV = roughSRV;
	}
}