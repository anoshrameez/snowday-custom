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
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-2xl">
      <h2 className="text-3xl font-black text-[#0d2342]">
        Related Snow Day Predictions
      </h2>

      <p className="mt-2 text-gray-500">
        Check snow day chances for other nearby cities and regions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {relatedCities.map((item) => (
          <a
            key={item.slug}
            href={`/prediction/${item.slug}`}
            className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="text-xl font-black text-[#0d2342]">
              {item.city}, {item.stateCode || item.state}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              {item.country}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}