function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-12 text-white">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl sm:p-14">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
          Learn Without Limits
        </p>

        <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl">
          Find the right tutor for your goals
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          Connect with experienced tutors, explore available sessions, and
          build your skills through personalized learning.
        </p>

        <button
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
          type="button"
        >
          Explore Tutors
        </button>
      </section>
    </main>
  );
}

export default App;