"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type City = {
  slug: string;
  city: string;
  state: string;
  stateCode?: string;
  country: string;
  countryCode: string;
};

type Props = {
  cities: City[];
};

const countryTabs = [
  { label: "United States", code: "US" },
  { label: "Canada", code: "CA" },
  { label: "Japan", code: "JP" },
];

export default function CityBrowser({ cities }: Props) {
  const [activeCountry, setActiveCountry] = useState("US");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCities = useMemo(() => {
    const countryCities = cities.filter((city) => city.countryCode === activeCountry);
    if (!normalizedQuery) {
      return countryCities.slice(0, 12);
    }

    return countryCities.filter((city) => {
      const text = `${city.city} ${city.state ?? ""} ${city.stateCode ?? ""} ${city.country}`.toLowerCase();
      return text.includes(normalizedQuery);
    });
  }, [cities, activeCountry, normalizedQuery]);

  return (
    <section className="mt-10 rounded-[32px] bg-white/80 p-6 shadow-xl backdrop-blur-xl border border-white/60">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            City Browser
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#0d2342]">
            Explore Predictions by Country
          </h2>
          <p className="mt-2 text-slate-600">
            Search any city in the United States, Canada, or Japan and open its snow day prediction.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {countryTabs.map((tab) => (
            <button
              key={tab.code}
              type="button"
              onClick={() => setActiveCountry(tab.code)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCountry === tab.code
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="sr-only" htmlFor="city-browser-search">
          Search cities
        </label>
        <input
          id="city-browser-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-[32px] border border-slate-200 bg-white/90 px-5 py-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          placeholder="Search by city, state, or country"
          autoComplete="off"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/prediction/${city.slug}`}
              className="group rounded-[28px] border border-white/70 bg-slate-50/90 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white"
            >
              <div className="text-lg font-bold text-[#0d2342]">{city.city}, {city.stateCode || city.state}</div>
              <div className="mt-2 text-sm text-slate-500">{city.country}</div>
            </Link>
          ))
        ) : (
          <div className="rounded-[28px] bg-slate-50/90 p-6 text-slate-500">
            No cities found. Try a different search term.
          </div>
        )}
      </div>
    </section>
  );
}
