export default function Footer() {
  return (
    <footer className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/30 p-6 text-[#0d2342] md:grid-cols-3">
          <div>
            <div className="text-2xl font-black">Snow Day Predictor</div>
            <p className="mt-3 text-sm text-[#0d2342]/70">
              Live snow day predictions, school closure chances, snowfall
              forecasts, and AI-powered weather summaries.
            </p>
          </div>

          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="/prediction" className="hover:underline">Predictions</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Legal</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:underline">Privacy</a>
              </li>
              <li>
                <a href="/robots.txt" className="hover:underline">Robots</a>
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