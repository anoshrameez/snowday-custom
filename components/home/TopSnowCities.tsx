import Link from "next/link";
import { getWeatherData } from "@/lib/weather";

type City = {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  lat: number;
  lon: number;
  avgSnowfall: number;
};

type Props = {
  cities: City[];
};

type SnowCity = {
  city: City;
  snowfall: number;
};

const CACHE_TTL_MS = 60 * 60 * 1000;
let cachedSnowCities: SnowCity[] = [];
let cachedSnowCitiesAt = 0;

async function fetchSnowiestCities(cities: City[]) {
  const now = Date.now();

  if (cachedSnowCitiesAt && now - cachedSnowCitiesAt < CACHE_TTL_MS && cachedSnowCities.length) {
    return cachedSnowCities;
  }

  const results = await Promise.allSettled(
    cities.map(async (city) => {
      try {
        const weather = await getWeatherData(city.lat, city.lon);
        return {
          city,
          snowfall: weather.snowfall,
        };
      } catch {
        return null;
      }
    })
  );

  const snowCities = results
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((item): item is SnowCity => item !== null)
    .sort((a, b) => b.snowfall - a.snowfall);

  cachedSnowCities = snowCities;
  cachedSnowCitiesAt = now;
  return snowCities;
}

export default async function TopSnowCities({ cities }: Props) {
  const snowCities = await fetchSnowiestCities(cities);
  const topCities = snowCities.slice(0, 5);

  return (
    <section className="px-4 pb-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black text-[#0d2342]">
              Today's Snowiest Cities
            </h2>
            <p className="mt-2 text-gray-500">
              Live snowfall amounts are updated each hour from weather forecast data.
            </p>
          </div>
          <div className="rounded-3xl bg-blue-50 px-5 py-3 text-blue-700">
            Updated every hour with live snowfall data.
          </div>
        </div>

        {topCities.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {topCities.map(({ city, snowfall }, index) => (
              <Link
                key={city.slug}
                href={`/prediction/${city.slug}`}
                className="group rounded-3xl border border-gray-200 p-6 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-black text-[#0d2342]">
                      {index + 1}. {city.city}, {city.stateCode}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {city.country}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                    {snowfall.toFixed(1)} mm
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-slate-50 p-6 text-center text-gray-500">
            Live snowfall data is unavailable right now. Please refresh in a few minutes.
          </div>
        )}
      </div>
    </section>
  );
}
