import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d2342]/95 backdrop-blur-xl shadow-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="leading-none">
          <div className="text-2xl font-black italic text-white">Snow Day</div>

          <div className="text-[10px] font-bold tracking-[4px] text-blue-300">
            PREDICTOR
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-semibold text-white/80 transition hover:text-white">
            Home
          </Link>

          <Link href="/prediction" className="text-sm font-semibold text-white/80 transition hover:text-white">
            Predictions
          </Link>

          <Link href="/about" className="text-sm font-semibold text-white/80 transition hover:text-white">
            About
          </Link>
        </nav>

        <Link
          href="/#prediction-search"
          className="rounded-full bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
        >
          Check Prediction
        </Link>

      </div>
    </header>
  );
}