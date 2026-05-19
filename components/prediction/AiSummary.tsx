type Props = {
  city: string;
  state: string;
  summary: string;
};

export default function AiSummary({
  city,
  state,
  summary,
}: Props) {
  return (
    <section className="mt-8 rounded-[32px] bg-white/85 p-8 shadow-xl backdrop-blur-xl border border-white/60 text-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500 text-2xl text-white">
          🤖
        </div>

        <div>
          <h2 className="text-3xl font-black">
            AI Snow Summary
          </h2>

          <p className="text-white/60">
            Live AI-generated analysis for {city}, {state}
          </p>
        </div>
      </div>

      <p className="text-lg leading-[1.9] text-white/80">
        {summary}
      </p>
    </section>
  );
}