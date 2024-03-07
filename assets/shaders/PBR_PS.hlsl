#include "../assets/shaders/Lighting.hlsli"

struct VertexToPixel
{
	float4 position : SV_POSITION;
	float2 uv		: TEXCOORD;
	float3 normal	: NORMAL;
	float3 tangent	: TANGENT;
	float3 worldPos	: POSITION;
};

cbuffer psData : register(b0)
{
	float3 cameraPos;	// Auto pad

	float3 tint;		// Pad
	float pad0;			// Pad out this float4

	float iblSpecMips;
	float lightCount;
	float envIsHDR;
	float pad2;

	Light lights[11];
}

Texture2D albedoMap			: register(t0);
Texture2D normalMap			: register(t1);
Texture2D metalMap			: register(t2);
Texture2D roughnessMap		: register(t3);

Texture2D brdfLUT			: register(t4);
TextureCube iblIrradiance	: register(t5);
TextureCube iblSpecular		: register(t6);

SamplerState samp			: register(s0);
SamplerState clampSamp		: register(s1);


float4 main(VertexToPixel input) : SV_TARGET
{
	input.normal = normalize(input.normal);
	input.tangent = normalize(input.tangent);
	
	float3 albedo = pow(albedoMap.Sample(samp, input.uv).rgb, 2.2) * tint;
	float metal = metalMap.Sample(samp, input.uv).r;
	float rough = max(roughnessMap.Sample(samp, input.uv).r, MIN_ROUGHNESS);
	float3 normalFromMap = normalMap.Sample(samp, input.uv).rgb;
	normalFromMap = normalize(normalFromMap * 2.0 - 1.0);
	
	// Gather the required vectors for converting the normal
	float3 N = input.normal;
	float3 T = normalize(input.tangent - N * dot(input.tangent, N));
	float3 B = cross(T, N);

	// Create the 3x3 matrix to convert from TANGENT-SPACE normals to WORLD-SPACE normals
	float3x3 TBN = float3x3(T, B, N);
	
	// Adjust the normal from the map and simply use the results
	input.normal = mul(normalFromMap, TBN);
	
	float3 specColor = lerp(float3(F0_NON_METAL, F0_NON_METAL, F0_NON_METAL), albedo.rgb, metal);

	float3 color = float3(0,0,0);
	float3 toCam = normalize(cameraPos - input.worldPos);
	
	for (int i = 0; i < (int)lightCount; i++)
	{
		Light l = lights[i];

		if (l.type == LIGHT_TYPE_DIR)
		{
			color += DirLightPBR(
				l,
				input.normal,
				input.worldPos,
				cameraPos,
				rough,
				metal,
				albedo,
				specColor);
		}
		else if (l.type == LIGHT_TYPE_POINT)
		{
			color += PointLightPBR(
				l,
				input.normal,
				input.worldPos,
				cameraPos,
				rough,
				metal,
				albedo,
				specColor);
		}
	}

	// --- Indirect PBR ---
	//float3 indirectDiffuse = pow(iblIrradiance.Sample(samp, input.normal).rgb, 2.2);
	float3 indirectDiffuse = iblIrradiance.Sample(samp, input.normal).rgb;

	float NdotV = dot(input.normal, toCam);
	float3 viewRefl = reflect(-toCam, input.normal);
	float2 indirectBRDF = brdfLUT.Sample(clampSamp, float2(NdotV, rough)).rg;

	// No multiscatter compensation (results in darker metals as roughness increases)
	//float3 indSpecFresnel = specColor * indirectBRDF.x + indirectBRDF.y;
	
	// --- Multiscattering compensation ---
	// Should now pass the white furnace test!
	// 
	// First, adjust fresnel term due to changes to look up table
	// See end of: https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/distantlightprobes/pre-integrationformultiscattering
	float3 indSpecFresnel = lerp(indirectBRDF.xxx, indirectBRDF.yyy, specColor);
	
	// Add energy compensation based on LUT roughness
	// See end of: https://google.github.io/filament/Filament.md.html#materialsystem/improvingthebrdfs/energylossinspecularreflectance
	float3 energyCompensation = 1.0 + specColor * (1.0 / indirectBRDF.y - 1.0);
	indSpecFresnel *= energyCompensation;
	// --- END multiscattering compensation ---

	//float3 indirectSpecular = pow(iblSpecular.SampleLevel(samp, viewRefl, rough * (iblSpecMips - 1.0)).rgb, 2.2) * indSpecFresnel;
	float3 indirectSpecular = iblSpecular.SampleLevel(samp, viewRefl, rough * (iblSpecMips - 1.0)).rgb * indSpecFresnel;
	float3 fullIndirect = (indirectDiffuse * albedo * saturate(1.0 - metal)) + indirectSpecular;

	float3 finalColor = color + fullIndirect;
	finalColor = envIsHDR == 1.0 ? finalColor : pow(finalColor, 1.0 / 2.2);

	return float4(finalColor, 1);
}