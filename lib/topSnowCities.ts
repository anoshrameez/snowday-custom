import fs from "fs";
import path from "path";
import { getWeatherData } from "./weather";

type City = {
  slug: string;
  city: string;
  state?: string;
  stateCode?: string;
  country: string;
  lat: number;
  lon: number;
  avgSnowfall?: number;
};

type SnowCity = {
  city: City;
  snowfall: number;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: { ts: number; data: SnowCity[] } | null = null;

async function readCities(): Promise<City[]> {
  const file = path.join(process.cwd(), "data", "cities.json");
  const raw = await fs.promises.readFile(file, "utf-8");
  return JSON.parse(raw) as City[];
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function getTopSnowCities(count = 5): Promise<SnowCity[]> {
  const now = Date.now();
  if (cache && now - cache.ts < CACHE_TTL_MS) return cache.data.slice(0, count);

  const cities = await readCities();

  const results: SnowCity[] = [];

  // Limit concurrent requests by batching
  const batches = chunk(cities, 20);
  for (const batch of batches) {
    const promises = batch.map(async (city) => {
      try {
        const w = await getWeatherData(city.lat, city.lon);
        return {
          city,
          snowfall: Number((w.snowfall ?? 0) as number),
        } as SnowCity;
      } catch (e) {
        return null;
      }
    });

    const settled = await Promise.all(promises);
    for (const s of settled) {
      if (s) results.push(s);
    }
  }

  const snowCities = results
    .filter((c) => c && typeof c.snowfall === "number")
    .sort((a, b) => b.snowfall - a.snowfall);

  // If all zeros, fallback to forecast-risk ranking using avgSnowfall and temperature
  const anySnow = snowCities.some((c) => c.snowfall > 0);
  let ranking = snowCities;

  if (!anySnow) {
    // compute risk score = avgSnowfall * 0.7 - temperature * 0.3 (higher is riskier)
    const scored = results.map((r) => ({
      ...r,
      riskScore:
        ((r.city.avgSnowfall ?? 0) * 0.7 - (0 /* temperature unknown */) * 0.3) || 0,
    }));

    ranking = scored
      .sort((a, b) => (b as any).riskScore - (a as any).riskScore)
      .map((s) => ({ city: s.city, snowfall: 0 }));
  }

  cache = { ts: now, data: ranking };
  return ranking.slice(0, count);
}
