type Props = {
  city: string;
  state: string;
  schoolDistrict: string;
  avgSnowfall: number;
  seoContent: string;
};

export default function CitySeoContent({
  city,
  state,
  schoolDistrict,
  avgSnowfall,
  seoContent,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-2xl">
      <h2 className="text-4xl font-black text-[#0d2342] leading-tight">
        Will Schools Be Closed Tomorrow in {city}, {state}?
      </h2>

      <div className="mt-6 space-y-6 text-lg leading-[1.9] text-gray-700">
        <p>{seoContent}</p>

        <p>
          Our {city}, {state} snow day predictor analyzes live weather forecasts,
          snowfall accumulation, freezing temperatures, wind speeds, and road
          conditions to estimate school closure chances.
        </p>

        <p>
          The main school district tracked for this area is{" "}
          <strong>{schoolDistrict}</strong>. Local closure decisions may vary by
          district, road conditions, and early morning storm timing.
        </p>

        <p>
          {city} receives an estimated average snowfall of{" "}
          <strong>{avgSnowfall} inches</strong> per winter season, which helps
          provide local context for the prediction model.
        </p>
      </div>
    </section>
  );
}