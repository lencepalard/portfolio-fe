export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto p-10 mt-20">
      <h2 className="text-4xl font-bold text-white mb-10">Latest Works</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#15171c] rounded-xl border border-gray-800 hover:border-green-400 transition">
          <h3 className="text-xl font-semibold text-white">Timekeeping System</h3>
          <p className="text-gray-400 mt-2">
            Employee DTR automation using Azure Functions + MongoDB + Messenger bot.
          </p>
        </div>

        <div className="p-6 bg-[#15171c] rounded-xl border border-gray-800 hover:border-green-400 transition">
          <h3 className="text-xl font-semibold text-white">POS System</h3>
          <p className="text-gray-400 mt-2">
            Cloud-synced POS with Visual Basic + MySQL, real-time monitoring.
          </p>
        </div>
      </div>
    </section>
  );
}
