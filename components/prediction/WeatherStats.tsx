type Props = {
  temperature: string | number;
  windSpeed: string | number;
  snowfall: string | number;
};

export default function WeatherStats({
  temperature,
  windSpeed,
  snowfall,
}: Props) {
  const snowfallNumber = Number(snowfall);

  const stats = [
    {
      label: "Temperature",
      value: `${temperature}°C`,
      icon: "🌡️",
      description: "Current outside temperature",
    },
    {
      label: "Wind Speed",
      value: `${windSpeed} km/h`,
      icon: "🌬️",
      description: "Live wind conditions",
    },
    {
      label: "Snowfall",
      value: `${snowfall} mm`,
      icon: "❄️",
      description: "Expected snow accumulation",
    },
    {
      label: "Road Risk",
      value: snowfallNumber > 2 ? "High" : "Low",
      icon: "🚗",
      description: "Estimated road safety conditions",
      highlight:
        snowfallNumber > 2
          ? "text-red-600"
          : "text-emerald-600",
    },
    {
      label: "Closure Risk",
      value: snowfallNumber > 2 ? "Possible" : "Low",
      icon: "🏫",
      description: "Potential school closure level",
      highlight:
        snowfallNumber > 2
          ? "text-orange-600"
          : "text-emerald-600",
    },
    {
      label: "Updated",
      value: "Live",
      icon: "⚡",
      description: "Real-time weather data",
      highlight: "text-sky-600",
    },
  ];

  return (
    <section className="mt-10 rounded-[32px] bg-white/80 p-6 shadow-xl backdrop-blur-xl border border-white/60">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Live Weather
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0d2342] md:text-4xl">
          Current Weather Conditions
        </h2>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
          Live weather metrics affecting school closure probability and snow day predictions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="group rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
                  {item.label}
                </div>

                <div
                  className={`mt-4 text-4xl font-black tracking-tight text-[#0d2342] ${
                    item.highlight || ""
                  }`}
                >
                  {item.value}
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:bg-sky-100">
                {item.icon}
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 text-sm leading-6 text-gray-500">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}