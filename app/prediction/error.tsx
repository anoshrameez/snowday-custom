"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#eef3f8] px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="text-6xl">❄️</div>

        <h1 className="mt-6 text-4xl font-black text-[#0d2342]">
          Something went wrong
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          We could not load the latest snow prediction right now.
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-2xl bg-[#0d2342] px-8 py-4 font-bold text-white transition hover:bg-blue-900"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}