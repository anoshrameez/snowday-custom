import Link from "next/link";
import { getTopSnowCities } from "@/lib/topSnowCities";

export default async function TopSnowCities() {
  const topCities = await getTopSnowCities(5);

  return (
    <section className="px-4 pb-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 p-6 shadow-xl">
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
          <div className="mt-6 grid gap-4">
            {topCities.map(({ city, snowfall }, index) => (
              <Link
                key={city.slug}
                href={`/prediction/${city.slug}`}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-white/20 p-4 transition hover:scale-[1.01]"
              >
                <div>
                  <div className="text-xl font-extrabold text-[#0d2342]">
                    {index + 1}. {city.city}{city.stateCode ? `, ${city.stateCode}` : ""}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {city.country}
                  </div>
                </div>
                <div className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                  {snowfall > 0 ? `${snowfall.toFixed(1)} mm` : `Forecast risk`}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/40 p-6 text-center text-gray-500">
            Live snowfall data is unavailable right now. Please refresh in a few minutes.
          </div>
        )}
      </div>
    </section>
  );
}
