import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import cities from "@/data/cities.json";

export default function PredictionIndex() {
  const sample = cities.slice(0, 12);

  return (
    <>
      <Header />

      <main className="min-h-screen px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-black text-[#0d2342]">Predictions</h1>

          <p className="mt-3 text-gray-600">Browse prediction pages by city.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sample.map((city) => (
              <Link
                key={city.slug}
                href={`/prediction/${city.slug}`}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <div className="text-lg font-bold text-[#0d2342]">{city.city}, {city.stateCode}</div>
                <div className="mt-1 text-sm text-gray-500">{city.country}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
