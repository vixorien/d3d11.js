
const float LIGHT_TYPE_DIR = 0.0f;
const float LIGHT_TYPE_POINT = 1.0f;

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

// Useful constants
const float F0_NON_METAL = 0.04f;
const float MIN_ROUGHNESS = 0.0000001f;
const float PI = 3.14159265359f;
const float TWO_PI = PI * 2.0f;
const float HALF_PI = PI / 2.0f;
const float QUARTER_PI = PI / 4.0f;

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

// From 5.3 in https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf
float BurleyDiffuse(float3 N, float3 L, float3 V, float roughness)
{
	// Pre-calcs
	float3 H = (L + V) / 2.0;
	float a = roughness * roughness; // Perceptual to linear
	float NdotL = saturate(dot(N, L));
	float NdotV = saturate(dot(N, V));
	float VdotH = saturate(dot(V, H)); // Theta_d in the disney paper (VdotH == LdotH, so either should work?)

	float f_d90 = 0.5 + 2.0 * a * VdotH * VdotH;
	float f_d90_minus_1 = f_d90 - 1.0;

	float lTerm = 1.0 + f_d90_minus_1 * pow(1.0 - NdotL, 5.0);
	float vTerm = 1.0 + f_d90_minus_1 + pow(1.0 - NdotV, 5.0);

	return NdotL * lTerm * vTerm;
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
	float a2 = max(a * a, MIN_ROUGHNESS); // Applied after remap!

	// ((n dot h)^2 * (a^2 - 1) + 1)
	// Can go to zero if roughness is 0 and NdotH is 1
	float denomToSquare = NdotH2 * (a2 - 1.0) + 1.0;

	// Final value
	return a2 / (PI * denomToSquare * denomToSquare);
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

// Specular G
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
float G1_Schlick(float Roughness, float NdotV)
{
	float k = Roughness * Roughness;
	k /= 2.0f; // Schlick-GGX version of k - Used in UE4

	// Staying the same
	return NdotV / (NdotV * (1.0f - k) + k);
}

// Specular G
// http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf
float G_Smith(float Roughness, float NdotV, float NdotL)
{
	return G1_Schlick(Roughness, NdotV) * G1_Schlick(Roughness, NdotL);
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
	//float diff = BurleyDiffuse(normal, toLight, toCam, roughness);
	float diff = DiffusePBR(normal, toLight);
	float3 F;
	float3 spec = MicrofacetBRDF(normal, toLight, toCam, roughness, specularColor, F);

	// Calculate diffuse with energy conservation
	// (Reflected light doesn't get diffused)
	float3 balancedDiff = DiffuseEnergyConserve(float3(diff), F, metalness);

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
	// float diff = BurleyDiffuse(normal, toLight, toCam, roughness);
	float diff = DiffusePBR(normal, toLight);
	float3 F;
	float3 spec = MicrofacetBRDF(normal, toLight, toCam, roughness, specularColor, F);

	// Calculate diffuse with energy conservation
	// (Reflected light doesn't diffuse)
	float3 balancedDiff = DiffuseEnergyConserve(float3(diff), F, metalness);

	// Combine
	return (balancedDiff * surfaceColor + spec) * atten * light.intensity * light.color;
}
