type Props = {
  city: string;
  state: string;
  country: string;
  chance: number;
  temperature: string | number;
  windSpeed: string | number;
  snowfall: string | number;
};

export default function CityHero({
  city,
  state,
  country,
  chance,
  temperature,
  windSpeed,
  snowfall,
}: Props) {
  const safeChance = Math.max(0, Math.min(100, Math.round(chance)));

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-white/70 p-6 shadow-xl backdrop-blur-xl border border-white/60 md:p-10">
      <div className="absolute right-[-100px] top-[-100px] h-[220px] w-[220px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-[-100px] left-[-100px] h-[220px] w-[220px] rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          Updated with live weather data
        </div>

        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {city}, {state} Snow Day Prediction
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
          Real-time snow day probability, snowfall forecast, road conditions,
          and school closure prediction for {city}, {state}, {country}.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
            <div className="text-sm font-semibold text-slate-500">Snow Probability</div>
            <div className="mt-2 text-4xl font-black text-blue-700">{safeChance}%</div>
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
            <div className="text-sm font-semibold text-slate-500">Temperature</div>
            <div className="mt-2 text-4xl font-black text-cyan-600">{temperature}°C</div>
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
            <div className="text-sm font-semibold text-slate-500">Wind Speed</div>
            <div className="mt-2 text-4xl font-black text-slate-900">{windSpeed} km/h</div>
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
            <div className="text-sm font-semibold text-slate-500">Snowfall</div>
            <div className="mt-2 text-4xl font-black text-blue-600">{snowfall} mm</div>
          </div>
        </div>
      </div>
    </section>
  );
}