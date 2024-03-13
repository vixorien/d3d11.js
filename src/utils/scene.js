

export class Scene
{
	Entities;
	MaterialOverride;

	constructor(materialOverride = null)
	{
		this.Entities = [];
		this.MaterialOverride = materialOverride;
	}
}