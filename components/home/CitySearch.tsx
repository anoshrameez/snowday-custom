"use client";

import { useMemo, useState, useEffect } from "react";
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

  const normalizedQuery = query.trim().toLowerCase();
  const showDropdown = normalizedQuery.length > 0;

  const filteredCities = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return cities
      .filter((item) => {
        const searchText = `${item.city} ${item.state ?? ""} ${item.stateCode ?? ""} ${item.country}`.toLowerCase();
        return searchText.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [cities, normalizedQuery]);

  function handleSearch() {
    const firstMatch = filteredCities[0];

    if (firstMatch) {
      router.push(`/prediction/${firstMatch.slug}`);
    }
  }

  // ensure parent doesn't clip the absolute dropdown by toggling a class on body when open
  useEffect(() => {
    if (showDropdown) {
      document.body.classList.add("search-dropdown-open");
    } else {
      document.body.classList.remove("search-dropdown-open");
    }
  }, [showDropdown]);

  return (
    <div className="relative mx-auto mt-6 max-w-2xl z-[99999]">
      <div className="flex w-full flex-col gap-3 rounded-[32px] bg-white/80 p-3 shadow-xl backdrop-blur-xl border border-white/50 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          placeholder="Search your city..."
          inputMode="search"
          aria-label="Search your city"
        />

        <button
          onClick={handleSearch}
          className="h-14 rounded-3xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-3 z-[99999] max-h-[360px] overflow-y-auto overscroll-contain rounded-[32px] bg-white/95 p-2 shadow-2xl">
          {filteredCities.length > 0 ? (
            filteredCities.map((item) => (
              <Link
                key={item.slug}
                href={`/prediction/${item.slug}`}
                className="block rounded-3xl px-4 py-4 text-left text-[#0d2342] transition hover:bg-blue-50"
              >
                <div className="text-base font-bold">
                  {item.city}, {item.stateCode || item.state}
                </div>
                <div className="mt-1 text-sm text-gray-500">{item.country}</div>
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