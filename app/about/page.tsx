import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata = {
  title: "About Us - Snow Day Predictor",
  description:
    "Learn how Snow Day Predictor uses live weather data and predictive analytics to estimate school closure chances.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff5ff,transparent_35%),linear-gradient(135deg,#edf7ff,#f8fbff)] px-4 py-20">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-white/70 p-8 shadow-xl backdrop-blur-xl border border-white/50">
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-[#0d2342] sm:text-5xl">
              About Snow Day Predictor
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Snow Day Predictor delivers live weather-driven school closure risk
              estimates through snowfall forecast, temperature, wind speed, and
              AI-driven analysis. Our predictions are designed to help parents,
              students, and caregivers prepare for winter weather with better
              insight.
            </p>

            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Live Weather Data",
                  description:
                    "We use real-time Open-Meteo weather data so predictions reflect current conditions.",
                },
                {
                  title: "Snowfall & Wind",
                  description:
                    "Snow totals, temperature, and wind speed are combined to judge how likely a snow day will occur.",
                },
                {
                  title: "School Closure Risk",
                  description:
                    "Our app highlights the risk level for school closures, but official decisions remain with districts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50/80 p-6 shadow-inner shadow-slate-200/60"
                >
                  <h2 className="text-xl font-bold text-[#0d2342]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-blue-600/10 p-6 text-slate-800">
              <h2 className="text-2xl font-black text-[#0d2342]">
                Disclaimer
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                These predictions are estimates based on live weather data and
                algorithmic scoring. Official school closure decisions are made
                by local districts and authorities. Use this tool as a helpful
                guide rather than a final decision.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Looking for live predictions? Explore our city prediction pages.
              </p>
              <Link
                href="/"
                className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
