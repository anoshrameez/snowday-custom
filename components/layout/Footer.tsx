import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 py-10 bg-[radial-gradient(circle_at_top_left,#f3faff,transparent_35%),linear-gradient(180deg,#f8fbff,#e7f1fb)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-[32px] bg-white/75 p-6 shadow-xl backdrop-blur-xl border border-white/50 text-[#0d2342] md:grid-cols-3">
          <div>
            <div className="text-2xl font-black">Snow Day Predictor</div>
            <p className="mt-3 text-sm text-[#0d2342]/70">
              Live snow day predictions, school closure chances, snowfall
              forecasts, and AI-powered weather summaries.
            </p>
          </div>

          <div>
            <div className="font-semibold text-[#0d2342]">Links</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/prediction" className="hover:underline">
                  Predictions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-[#0d2342]">Resources</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:underline">
                  Robots
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-[#0d2342]/60">
          © 2026 Snow Day Predictor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}