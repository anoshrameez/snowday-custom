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
    <section className="relative overflow-hidden rounded-3xl bg-[#0d2342] p-6 text-white shadow-2xl md:p-10">
      <div className="absolute right-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-[-120px] left-[-120px] h-[260px] w-[260px] rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
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
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold text-white/60">
              Snow Probability
            </div>
            <div className="mt-2 text-4xl font-black text-sky-300">
              {safeChance}%
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold text-white/60">
              Temperature
            </div>
            <div className="mt-2 text-4xl font-black text-cyan-300">
              {temperature}°C
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold text-white/60">
              Wind Speed
            </div>
            <div className="mt-2 text-4xl font-black text-white">
              {windSpeed} km/h
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold text-white/60">
              Snowfall
            </div>
            <div className="mt-2 text-4xl font-black text-blue-200">
              {snowfall} mm
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}