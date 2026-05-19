type PredictionGaugeProps = {
  chance: number;
};

export default function PredictionGauge({ chance }: PredictionGaugeProps) {
  const safeChance = Math.max(0, Math.min(100, Math.round(chance)));

  const radius = 86;
  const stroke = 18;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (safeChance / 100) * circumference;

  const label =
    safeChance >= 75
      ? "Very likely"
      : safeChance >= 50
      ? "Possible"
      : safeChance >= 25
      ? "Unlikely"
      : "Very unlikely";

  const message =
    safeChance >= 75
      ? "Strong snow day potential based on current weather conditions."
      : safeChance >= 50
      ? "There is a fair chance, but conditions may still change."
      : safeChance >= 25
      ? "Some winter weather signals exist, but confidence is still low."
      : "A snow day is not likely with the current forecast.";

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
      <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-center">
        <div className="flex justify-center">
          <div className="relative h-[220px] w-[220px]">
            <svg
              height="220"
              width="220"
              viewBox="0 0 220 220"
              className="-rotate-90"
            >
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="110"
                cy="110"
              />

              <circle
                stroke="url(#gaugeGradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx="110"
                cy="110"
                className="transition-all duration-700 ease-out"
              />

              <defs>
                <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-5xl font-extrabold tracking-tight text-slate-950">
                {safeChance}%
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            Prediction Result
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            {label}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            {message}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Confidence
              </p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                {safeChance >= 60
                  ? "High"
                  : safeChance >= 35
                  ? "Medium"
                  : "Low"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Risk Level
              </p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                {safeChance >= 70
                  ? "Severe"
                  : safeChance >= 40
                  ? "Moderate"
                  : "Minor"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Updated
              </p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                Live
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}