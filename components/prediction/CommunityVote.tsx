export default function CommunityVote() {
  return (
    <section className="mt-8 rounded-3xl bg-white p-8 shadow-2xl">
      <h2 className="text-3xl font-black text-[#0d2342]">
        Community Prediction
      </h2>

      <p className="mt-2 text-gray-500">
        What locals think about tomorrow’s school closure.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["School Closed", "Delayed Opening", "School Open"].map((item) => (
          <button
            key={item}
            className="rounded-2xl border-2 border-[#dce3ea] p-5 text-lg font-bold text-[#0d2342] hover:border-blue-500 hover:bg-blue-50"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}