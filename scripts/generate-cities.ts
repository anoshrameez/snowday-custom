import fs from "fs/promises";
import path from "path";

type SourceCity = {
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  timezone: string;
  population: number;
  elevation: number;
  avgSnowfall: number;
  schoolDistrict: string;
};

type GeneratedCity = SourceCity & {
  slug: string;
  stateSlug: string;
  seoContent: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createSeoContent(city: string, state: string) {
  return `${city}, ${state} is a major snow day prediction city known for lake-effect snow, winter storms, freezing temperatures, and school closure risks.`;
}

async function generateCities() {
  const sourcePath = path.join(process.cwd(), "data", "source-cities.json");
  const outputPath = path.join(process.cwd(), "data", "cities.json");

  const raw = await fs.readFile(sourcePath, "utf-8");
  const sourceCities = JSON.parse(raw) as SourceCity[];

  if (!Array.isArray(sourceCities)) {
    throw new Error("source-cities.json must contain an array of city objects.");
  }

  const cities = sourceCities.map((city) => {
    const stateSlug = slugify(city.state);
    const slug = slugify(`${city.city}-${city.stateCode}`);

    return {
      ...city,
      slug,
      stateSlug,
      seoContent: createSeoContent(city.city, city.state),
    };
  });

  const uniqueCities = Array.from(
    cities.reduce<Map<string, GeneratedCity>>((map, city) => {
      if (!map.has(city.slug)) {
        map.set(city.slug, city);
      }
      return map;
    }, new Map()).values()
  );

  uniqueCities.sort((a, b) => {
    if (a.country !== b.country) return a.country.localeCompare(b.country);
    if (a.state !== b.state) return a.state.localeCompare(b.state);
    return a.city.localeCompare(b.city);
  });

  await fs.writeFile(outputPath, JSON.stringify(uniqueCities, null, 2) + "\n", "utf-8");
  console.log(`Generated ${uniqueCities.length} cities at ${outputPath}`);
}

if (require.main === module) {
  generateCities().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
