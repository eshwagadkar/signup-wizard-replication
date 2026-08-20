function SignupSuccess({ onContinue }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-black">
            <span className="text-2xl">
              ✓
            </span>
          </div>

          <h1 className="mt-8 text-3xl font-semibold">
            You're all set!
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Your account has been created successfully.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200"
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}

export default SignupSuccess;