export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d2342]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        <a href="/" className="leading-none">
          <div className="text-2xl font-black italic text-white">
            Snow Day
          </div>

          <div className="text-[10px] font-bold tracking-[4px] text-blue-300">
            PREDICTOR
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="/prediction/joliet-il"
            className="text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Predictions
          </a>

          <a
            href="/"
            className="text-sm font-semibold text-white/70 transition hover:text-white"
          >
            About
          </a>
        </nav>

        <a
          href="/prediction/buffalo-ny"
          className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Check Prediction
        </a>

      </div>
    </header>
  );
}