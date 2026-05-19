import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Privacy Policy - Snow Day Predictor",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/60 backdrop-blur-xl border border-white/30 p-8 shadow-xl">
          <h1 className="text-3xl font-black text-[#0d2342]">Privacy Policy</h1>

          <p className="mt-4 text-gray-700">
            Snow Day Predictor respects your privacy. This site uses public weather
            APIs and does not store personal data. For more details contact us at
            <a href="/" className="ml-1 font-semibold underline">Support</a>.
          </p>

          <div className="mt-6">
            <Link href="/" className="rounded-2xl bg-blue-600 px-4 py-2 text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
