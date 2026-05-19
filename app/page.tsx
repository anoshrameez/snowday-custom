import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySearch from "@/components/home/CitySearch";
import TopSnowCities from "@/components/home/TopSnowCities";
import Link from "next/link";
import cities from "@/data/cities.json";

export const metadata = {
  title: "Snow Day Predictor | School Closure Predictions",
  description:
    "Check live snow day predictions, school closure chances, snowfall forecasts, and AI-powered weather summaries for your city.",
};

export default function HomePage() {
  const featuredCities = cities.slice(0, 8);
  const browseCities = cities.slice(0, 12);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff5ff,transparent_35%),linear-gradient(135deg,#edf7ff,#f8fbff)]">
        <section id="prediction-search" className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-white/75 p-8 shadow-xl backdrop-blur-xl border border-white/50">
            <div className="mb-6 inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700 shadow-sm">
              Live Snow Day Predictions
            </div>

            <h1 className="text-4xl font-black leading-tight text-[#0d2342] sm:text-5xl md:text-6xl">
              Will School Be Closed Tomorrow?
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Check live snow day predictions, school closure chances, snowfall forecasts, and AI-powered weather summaries for your city.
            </p>

            <div className="mt-10">
              <CitySearch cities={cities} />
            </div>
          </div>
        </section>

        <TopSnowCities />

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-white/70 p-8 shadow-xl backdrop-blur-xl border border-white/50">
            <h2 className="text-center text-3xl font-black text-[#0d2342]">
              Your Trusted Source for Snow Day Predictions
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-slate-600">
              Snow Day Predictor uses live weather data, snowfall forecasts, wind speed, temperatures, and AI analysis to estimate school closure chances.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                "Live Weather Data",
                "AI Snow Summary",
                "City-Based Predictions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-3xl">❄️</div>
                  <div className="mt-3 text-xl font-black text-[#0d2342]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-white/70 p-8 shadow-xl backdrop-blur-xl border border-white/50">
            <h2 className="text-3xl font-black text-[#0d2342]">Popular Snow Day Predictions</h2>

            <p className="mt-2 text-slate-600">Start with popular city prediction pages.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {featuredCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/prediction/${city.slug}`}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-xl font-black text-[#0d2342]">{city.city}, {city.stateCode}</div>
                  <div className="mt-1 text-sm text-slate-500">{city.country}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-white/70 p-8 shadow-xl backdrop-blur-xl border border-white/50">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#0d2342]">Browse Cities</h2>
                <p className="mt-2 text-slate-600">Search by city, state, or country and go directly to a prediction page.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {browseCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/prediction/${city.slug}`}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-xl font-black text-[#0d2342]">{city.city}, {city.stateCode}</div>
                  <div className="mt-1 text-sm text-slate-500">{city.country}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}