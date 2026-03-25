export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto p-10 mt-20">
      <h2 className="text-4xl font-bold text-white mb-10">About Me</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#15171c] rounded-xl border border-gray-800 hover:border-green-400 transition">
          <h3 className="text-green-400 font-semibold text-lg">Design</h3>
          <p className="text-gray-400 mt-2">
            Creating UI/UX and modern interfaces with clean aesthetics.
          </p>
        </div>

        <div className="p-6 bg-[#15171c] rounded-xl border border-gray-800 hover:border-green-400 transition">
          <h3 className="text-green-400 font-semibold text-lg">Front-End</h3>
          <p className="text-gray-400 mt-2">
            Next.js, React, TailwindCSS — performance & smooth UI.
          </p>
        </div>

        <div className="p-6 bg-[#15171c] rounded-xl border border-gray-800 hover:border-green-400 transition">
          <h3 className="text-green-400 font-semibold text-lg">Back-End</h3>
          <p className="text-gray-400 mt-2">
            Node.js, Azure Functions, MongoDB, scalable APIs.
          </p>
        </div>
      </div>
    </section>
  );
}
