import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f8] px-4">
      <div className="max-w-2xl rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="text-7xl">❄️</div>

        <h1 className="mt-6 text-5xl font-black text-[#0d2342]">
          404
        </h1>

        <p className="mt-4 text-lg leading-8 text-gray-600">
          The snow prediction page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-[#0d2342] px-8 py-4 font-bold text-white transition hover:bg-blue-900"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}