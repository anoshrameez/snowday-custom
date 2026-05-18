type HourlyData = {
  time: string;
  snow: number;
};

type Props = {
  data: HourlyData[];
};

export default function HourlySnowfall({ data }: Props) {
  const maxSnow = Math.max(...data.map((item) => item.snow), 1);

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Snowfall Timeline
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0d2342] md:text-4xl">
          Hourly Snowfall Forecast
        </h2>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
          Live hourly snowfall forecast showing when snow is expected to build up.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-6 text-center font-semibold text-slate-500">
          No hourly snowfall data available right now.
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-end gap-4">
            {data.map((item, index) => {
              const barHeight = Math.max((item.snow / maxSnow) * 220, 10);
              const isHeavy = item.snow >= 2;

              return (
                <div
                  key={`${item.time}-${index}`}
                  className="flex flex-1 flex-col items-center"
                >
                  <div className="mb-3 text-xs font-bold text-slate-500">
                    {item.snow} mm
                  </div>

                  <div className="flex h-[240px] w-full items-end rounded-2xl bg-slate-50 p-2">
                    <div
                      className={`w-full rounded-2xl transition-all duration-500 ${
                        isHeavy
                          ? "bg-blue-700"
                          : "bg-gradient-to-t from-sky-500 to-sky-300"
                      }`}
                      style={{
                        height: `${barHeight}px`,
                      }}
                    />
                  </div>

                  <div className="mt-4 text-sm font-black text-[#0d2342]">
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}