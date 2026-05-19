"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type City = {
  slug: string;
  city: string;
  state: string;
  stateCode?: string;
  country: string;
};

type Props = {
  cities: City[];
};

export default function CitySearch({ cities }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return cities
      .filter((item) => {
        const searchText = `${item.city} ${item.state} ${item.stateCode ?? ""} ${item.country}`.toLowerCase();
        return searchText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [cities, query]);

  function handleSearch() {
    const firstMatch = filteredCities[0];

    if (firstMatch) {
      router.push(`/prediction/${firstMatch.slug}`);
    }
  }

  return (
    <div className="relative mx-auto mt-10 max-w-2xl">
      <div className="flex rounded-full bg-white p-2 shadow-2xl">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 rounded-full px-6 text-gray-700 outline-none"
          placeholder="Search your city..."
        />

        <button
          onClick={handleSearch}
          className="rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {query && (
        <div className="absolute left-0 right-0 top-[72px] z-20 rounded-3xl bg-white p-3 text-left shadow-2xl">
          {filteredCities.length > 0 ? (
            filteredCities.map((item) => (
              <a
                key={item.slug}
                href={`/prediction/${item.slug}`}
                className="block rounded-2xl px-5 py-3 font-bold text-[#0d2342] hover:bg-blue-50"
              >
                {item.city}, {item.stateCode || item.state}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {item.country}
                </span>
              </a>
            ))
          ) : (
            <div className="rounded-2xl px-5 py-4 text-sm text-gray-500">
              No matching cities found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}