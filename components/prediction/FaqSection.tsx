type Props = {
  city: string;
  state: string;
};

export default function FaqSection({ city, state }: Props) {
  const faqs = [
    {
      q: `Will schools be closed tomorrow in ${city}, ${state}?`,
      a: `School closure chances depend on snowfall, road conditions, temperature, wind, and the timing of the storm during early morning hours.`,
    },
    {
      q: `How often is the ${city} snow day prediction updated?`,
      a: `The prediction is designed to update hourly once live weather API data is connected.`,
    },
    {
      q: `What factors affect snow day chances in ${city}?`,
      a: `Snowfall totals, freezing temperatures, wind chill, visibility, icy roads, and district closure patterns all affect the final probability.`,
    },
  ];

  return (
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-2xl">
      <h2 className="text-3xl font-black text-[#0d2342]">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="text-xl font-bold text-[#0d2342]">{faq.q}</h3>
            <p className="mt-2 text-gray-600 leading-7">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}