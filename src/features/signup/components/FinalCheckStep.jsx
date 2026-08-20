function FinalCheckStep({
  value,
  onChange,
  onBack,
  onSubmit,
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            ← Back
          </button>

          <div className="mt-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <span className="text-lg font-bold">
                LOGO
              </span>
            </div>

            <h1 className="mt-8 text-3xl font-semibold">
              Almost there
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Check your details before creating your
              account.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Username
              </p>

              <p className="mt-1 text-sm font-medium">
                {value.username}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Name
              </p>

              <p className="mt-1 text-sm font-medium">
                {value.name}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Age
              </p>

              <p className="mt-1 text-sm font-medium">
                {value.dob?.age} years
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Pronouns
              </p>

              <p className="mt-1 text-sm font-medium">
                {value.pronouns.join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="invite-code"
              className="text-sm font-medium text-zinc-300"
            >
              Invite / Referral Code
            </label>

            <input
              id="invite-code"
              type="text"
              value={value.inviteCode}
              onChange={(event) =>
                onChange(
                  event.target.value
                )
              }
              maxLength={50}
              placeholder="Optional"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Optional. You can leave this empty.
            </p>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200"
          >
            Sign Up
          </button>
        </div>
      </section>
    </main>
  );
}

export default FinalCheckStep;