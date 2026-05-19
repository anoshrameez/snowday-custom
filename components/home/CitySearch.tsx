"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        const searchText = `${item.city} ${item.state ?? ""} ${item.stateCode ?? ""} ${item.country}`.toLowerCase();
        return searchText.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [cities, query]);

  function handleSearch() {
    const firstMatch = filteredCities[0];

    if (firstMatch) {
      router.push(`/prediction/${firstMatch.slug}`);
    }
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  // ensure parent doesn't clip the absolute dropdown by toggling a class on body when open
  useEffect(() => {
    if (query) {
      document.body.classList.add("search-dropdown-open");
    } else {
      document.body.classList.remove("search-dropdown-open");
    }
  }, [query]);

  return (
    <div ref={containerRef} className="relative mx-auto mt-6 max-w-2xl z-50">
      <div className="flex w-full items-center gap-3 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/30 p-2 shadow-xl">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 rounded-2xl px-4 py-3 text-gray-700 outline-none"
          placeholder="Search your city..."
          inputMode="search"
        />

        <button
          onClick={handleSearch}
          className="rounded-2xl bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {query && (
        <div className="absolute left-0 right-0 top-full mt-3 z-[9999] max-h-[320px] overflow-y-auto rounded-3xl bg-white/80 p-2 shadow-xl">
          {filteredCities.length > 0 ? (
            filteredCities.map((item) => (
              <Link
                key={item.slug}
                href={`/prediction/${item.slug}`}
                className="block rounded-2xl px-4 py-3 font-bold text-[#0d2342] hover:bg-blue-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    {item.city}, {item.stateCode || item.state}
                    <div className="mt-1 text-sm font-normal text-gray-500">
                      {item.country}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-2xl px-5 py-4 text-sm text-gray-500">No matching cities found.</div>
          )}
        </div>
      )}
    </div>
  );
}