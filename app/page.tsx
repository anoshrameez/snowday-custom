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

      <main className="min-h-screen bg-[#dce3ea]">
        <section className="px-4 py-20 text-center md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-blue-600 shadow">
              Live Snow Day Predictions
            </div>

            <h1 className="text-5xl font-black leading-tight text-[#0d2342] md:text-7xl">
              Will School Be Closed Tomorrow?
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Check live snow day predictions, school closure chances, snowfall
              forecasts, and AI-powered weather summaries for your city.
            </p>

            <CitySearch cities={cities} />
          </div>
        </section>

        <TopSnowCities />

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-center text-3xl font-black text-[#0d2342]">
              Your Trusted Source for Snow Day Predictions
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-gray-600">
              Snow Day Predictor uses live weather data, snowfall forecasts,
              wind speed, temperatures, and AI analysis to estimate school
              closure chances.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                "Live Weather Data",
                "AI Snow Summary",
                "City-Based Predictions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 p-6 text-center"
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
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-[#0d2342]">
              Popular Snow Day Predictions
            </h2>

            <p className="mt-2 text-gray-500">
              Start with popular city prediction pages.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {featuredCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/prediction/${city.slug}`}
                  className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <div className="text-xl font-black text-[#0d2342]">
                    {city.city}, {city.stateCode}
                  </div>

                  <div className="mt-1 text-sm text-gray-500">{city.country}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#0d2342]">
                  Browse Cities
                </h2>
                <p className="mt-2 text-gray-500">
                  Search by city, state, or country and go directly to a prediction page.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {browseCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/prediction/${city.slug}`}
                  className="rounded-3xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  <div className="text-xl font-black text-[#0d2342]">
                    {city.city}, {city.stateCode}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{city.country}</div>
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