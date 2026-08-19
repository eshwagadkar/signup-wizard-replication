const events = [
  {
    id: 1,
    title: "Weekend Gathering",
    location: "Central City",
    date: "This Saturday",
  },
  {
    id: 2,
    title: "Community Meetup",
    location: "Downtown",
    date: "Next Sunday",
  },
];

export default function HomeScreen({ onProtectedAction }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div className="text-xl font-semibold">
            Home
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onProtectedAction}
              className="text-sm text-zinc-300"
            >
              Notifications
            </button>

            <button
              type="button"
              onClick={onProtectedAction}
              className="text-sm text-zinc-300"
            >
              Chat
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div>
          <h1 className="text-3xl font-semibold">
            Discover what's happening
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Explore events and activities around you.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="aspect-[16/9] rounded-2xl bg-zinc-800" />

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  {event.date}
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {event.title}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {event.location}
                </p>

                <button
                  type="button"
                  onClick={onProtectedAction}
                  className="mt-5 w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
                >
                  Join
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}