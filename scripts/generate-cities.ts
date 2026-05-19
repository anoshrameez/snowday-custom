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

const seoTemplates = [
  "is known for lake-effect snow, freezing temperatures, winter storms, and school closure risk.",
  "sees heavy snow, icy roads, winter storms, and frequent school closure alerts.",
  "faces powerful winter storms, lake-effect snow, freezing temperatures, and closure risks.",
  "has live snowy forecasts, winter travel warnings, and school closure alerts.",
  "is a top snowy destination with heavy snow forecasts, icy conditions, and school closure chances."
];

function createSeoContent(city: string, state: string, index: number) {
  const template = seoTemplates[index % seoTemplates.length];
  return `${city}, ${state} ${template}`;
}

async function generateCities() {
  const sourcePath = path.join(process.cwd(), "data", "source-cities.json");
  const outputPath = path.join(process.cwd(), "data", "cities.json");

  const raw = await fs.readFile(sourcePath, "utf-8");
  const sourceCities = JSON.parse(raw) as SourceCity[];

  if (!Array.isArray(sourceCities)) {
    throw new Error("source-cities.json must contain an array of city objects.");
  }

  const cities = sourceCities.map((city, index) => {
    const stateSlug = slugify(city.state);
    const slug = slugify(`${city.city}-${city.stateCode}`);

    return {
      ...city,
      slug,
      stateSlug,
      seoContent: createSeoContent(city.city, city.state, index),
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
