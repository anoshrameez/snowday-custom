import Link from "next/link";

type City = {
  slug: string;
  city: string;
  state: string;
  stateCode?: string;
  country: string;
};

type Props = {
  currentSlug: string;
  cities: City[];
};

export default function RelatedCities({ currentSlug, cities }: Props) {
  const relatedCities = cities
    .filter((city) => city.slug !== currentSlug)
    .slice(0, 6);

  return (
    <section className="mt-8 rounded-[32px] bg-white/80 p-8 shadow-xl backdrop-blur-xl border border-white/60">
      <h2 className="text-3xl font-black text-[#0d2342]">
        Related Snow Day Predictions
      </h2>

      <p className="mt-2 text-gray-500">
        Check snow day chances for other nearby cities and regions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {relatedCities.map((item) => (
          <Link
            key={item.slug}
            href={`/prediction/${item.slug}`}
            className="rounded-[28px] border border-white/70 bg-white/90 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="text-xl font-black text-[#0d2342]">
              {item.city}, {item.stateCode || item.state}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              {item.country}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}