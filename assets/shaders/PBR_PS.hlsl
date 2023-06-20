struct VertexToPixel
{
	float4 position : SV_POSITION;
	float2 uv		: TEXCOORD;
	float3 normal	: NORMAL;
	float3 tangent	: TANGENT;
	float3 worldPos	: POSITION;
};

struct Light
{
	float type;
	float intensity;
	float range;
	float pad;
	float3 position;	// auto pad
	float3 direction;	// auto pad
	float3 color;		// auto pad
};

cbuffer psData : register(b0)
{
	float3 cameraPos;	// Auto pad
	float3 tint;		// Auto pad
	
	float iblSpecMips; // Pad?
	float pad;
	float pad1;
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

// Range-based attenuation function
float attenuate(Light light, float3 worldPos)
{
	// Calculate the distance between the surface and the light
	float dist = distance(light.position, worldPos);

	// Ranged-based attenuation
	float att = saturate(1.0f - (dist * dist / (light.range * light.range)));

	// Soft falloff
	return att * att;
}


float DiffusePBR(float3 normal, float3 dirToLight)
{
	return saturate(dot(normal, dirToLight));
}

// Normal Distribution Function: GGX (Trowbridge-Reitz)
//
// a - Roughness
// h - Half vector
// n - Normal
// 
// D(h, n, a) = a^2 / pi * ((n dot h)^2 * (a^2 - 1) + 1)^2
float D_GGX(float3 n, float3 h, float roughness)
{
	// Pre-calculations
	float NdotH = saturate(dot(n, h));
	float NdotH2 = NdotH * NdotH;
	float a = roughness * roughness;
	float a2 = max(a * a, 0.000001); // Applied after remap!

	// ((n dot h)^2 * (a^2 - 1) + 1)
	// Can go to zero if roughness is 0 and NdotH is 1
	float denomToSquare = NdotH2 * (a2 - 1.0) + 1.0;

	// Final value
	return a2 / (3.14159 * denomToSquare * denomToSquare);
}



// Fresnel term - Schlick approx.
// 
// v - View vector
// h - Half vector
// f0 - Value when l = n
//
// F(v,h,f0) = f0 + (1-f0)(1 - (v dot h))^5
float3 F_Schlick(float3 v, float3 h, float3 f0)
{
	// Pre-calculations
	float VdotH = saturate(dot(v, h));

	// Final value
	return f0 + (1.0 - f0) * pow(1.0 - VdotH, 5.0);
}



// Geometric Shadowing - Schlick-GGX
// - k is remapped to a / 2, roughness remapped to (r+1)/2 before squaring!
//
// n - Normal
// v - View vector
//
// G_Schlick(n,v,a) = (n dot v) / ((n dot v) * (1 - k) * k)
//
// Full G(n,v,l,a) term = G_SchlickGGX(n,v,a) * G_SchlickGGX(n,l,a)
float G_SchlickGGX(float3 n, float3 v, float roughness)
{
	// End result of remapping:
	float k = pow(roughness + 1.0, 2.0) / 8.0f;
	float NdotV = saturate(dot(n, v));

	// Final value
	// Note: Numerator should be NdotV (or NdotL depending on parameters).
	// However, these are also in the BRDF's denominator, so they'll cancel!
	// We're leaving them out here AND in the BRDF function as the
	// dot products can get VERY small and cause rounding errors.
	return 1.0 / (NdotV * (1.0 - k) + k);
}

// Cook-Torrance Microfacet BRDF (Specular)
//
// f(l,v) = D(h)F(v,h)G(l,v,h) / 4(n dot l)(n dot v)
// - parts of the denominator are canceled out by numerator (see below)
//
// D() - Normal Distribution Function - Trowbridge-Reitz (GGX)
// F() - Fresnel - Schlick approx
// G() - Geometric Shadowing - Schlick-GGX
float3 MicrofacetBRDF(float3 n, float3 l, float3 v, float roughness, float3 f0, out float3 F_out)
{
	// Other vectors
	float3 h = normalize(v + l);

	// Run numerator functions
	float  D = D_GGX(n, h, roughness);
	float3 F = F_Schlick(v, h, f0);
	float  G = G_SchlickGGX(n, v, roughness) * G_SchlickGGX(n, l, roughness);

	// Pass F out of the function for diffuse balance
	F_out = F;

	// Final specular formula
	// Note: The denominator SHOULD contain (NdotV)(NdotL), but they'd be
	// canceled out by our G() term.  As such, they have been removed
	// from BOTH places to prevent floating point rounding errors.
	float3 specularResult = (D * F * G) / 4.0;

	// One last non-obvious requirement: According to the rendering equation,
	// specular must have the same NdotL applied as diffuse!  We'll apply
	// that here so that minimal changes are required elsewhere.
	return specularResult * max(dot(n, l), 0.0);
}


// Calculates diffuse amount based on energy conservation
//
// diffuse   - Diffuse amount
// F         - Fresnel result from microfacet BRDF
// metalness - surface metalness amount
//
// Metals should have an albedo of (0,0,0)...mostly
// See slide 65: http://blog.selfshadow.com/publications/s2014-shading-course/hoffman/s2014_pbs_physics_math_slides.pdf
float3 DiffuseEnergyConserve(float3 diffuse, float3 F, float metalness)
{
	return diffuse * (1.0 - F) * (1.0 - metalness);
}

float3 DirLightPBR(Light light, float3 normal, float3 worldPos, float3 camPos, float roughness, float metalness, float3 surfaceColor, float3 specularColor)
{
	// Get normalize direction to the light
	float3 toLight = normalize(-light.direction);
	float3 toCam = normalize(camPos - worldPos);

	// Calculate the light amounts
	float diff = DiffusePBR(normal, toLight);
	float3 F;
	float3 spec = MicrofacetBRDF(normal, toLight, toCam, roughness, specularColor, F);

	// Calculate diffuse with energy conservation
	// (Reflected light doesn't get diffused)
	float3 balancedDiff = DiffuseEnergyConserve(float3(diff), spec, metalness);

	// Combine amount with 
	return (balancedDiff * surfaceColor + spec) * light.intensity * light.color;
}

float3 PointLightPBR(Light light, float3 normal, float3 worldPos, float3 camPos, float roughness, float metalness, float3 surfaceColor, float3 specularColor)
{
	// Calc light direction
	float3 toLight = normalize(light.position - worldPos);
	float3 toCam = normalize(camPos - worldPos);

	// Calculate the light amounts
	float atten = attenuate(light, worldPos);
	float diff = DiffusePBR(normal, toLight);
	float3 F;
	float3 spec = MicrofacetBRDF(normal, toLight, toCam, roughness, specularColor, F);

	// Calculate diffuse with energy conservation
	// (Reflected light doesn't diffuse)
	float3 balancedDiff = DiffuseEnergyConserve(float3(diff), spec, metalness);

	// Combine
	return (balancedDiff * surfaceColor + spec) * atten * light.intensity * light.color;
}


float4 main(VertexToPixel input) : SV_TARGET
{
	//return sky.Sample(samp, input.normal);
	float MIN_ROUGHNESS = 0.0000001f;

	input.normal = normalize(input.normal);
	input.tangent = normalize(input.tangent);
	
	float3 albedo = pow(albedoMap.Sample(samp, input.uv).rgb, 2.2);
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

	float3 specColor = lerp(float3(0.04, 0.04, 0.04), albedo.rgb, metal);

	float3 color = float3(0,0,0);
	float3 toCam = normalize(cameraPos - input.worldPos);
	for (int i = 0; i < 11; i++)
	{
		Light l = lights[i];

		if (l.type == 0.0)
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
		else if (l.type == 1.0)
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
	float3 indirectDiffuse = pow(iblIrradiance.Sample(samp, input.normal).rgb, 2.2);

	float NdotV = dot(input.normal, toCam);
	float3 viewRefl = reflect(-toCam, input.normal);
	float2 indirectBRDF = brdfLUT.Sample(clampSamp, float2(NdotV, rough)).rg;
	float3 indSpecFresnel = specColor * indirectBRDF.x + indirectBRDF.y;
	float3 indirectSpecular = pow(iblSpecular.SampleLevel(samp, viewRefl, rough * (iblSpecMips - 1.0)).rgb, 2.2) * indSpecFresnel;

	float3 fullIndirect = (indirectDiffuse* albedo* saturate(1.0 - metal)) + indirectSpecular;
	
	return float4(pow(color + fullIndirect, 1.0 / 2.2), 1);
}