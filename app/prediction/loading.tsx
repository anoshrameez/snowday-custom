export default function Loading() {
  return (
    <main className="min-h-screen bg-[#eef3f8] px-4 py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="h-[280px] animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-[320px] animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-[320px] animate-pulse rounded-3xl bg-slate-200" />
        </div>

        <div className="h-[400px] animate-pulse rounded-3xl bg-slate-200" />
      </div>
    </main>
  );
}