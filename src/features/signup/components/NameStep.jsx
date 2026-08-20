import { useState } from "react";
import { nameSchema } from "../signupSchema.js";

function NameStep({
  value,
  onChange,
  onNext,
  onBack,
}) {
  const [error, setError] = useState("");

  const validate = (name) => {
    const result = nameSchema.safeParse({
      name,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;

    onChange(nextValue);

    if (error) {
      validate(nextValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate(value)) {
      onNext();
    }
  };

  const isValid = nameSchema.safeParse({
    name: value,
  }).success;

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
            <p className="text-sm text-zinc-500">
              Step 2
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              What's your name?
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Enter the name you'd like to use.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10"
          >
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-200"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={() => validate(value)}
              autoComplete="name"
              maxLength={60}
              placeholder="Enter your name"
              className={`mt-3 w-full rounded-2xl border bg-white px-4 py-4 text-black outline-none transition ${
                error
                  ? "border-red-500"
                  : "border-transparent focus:border-zinc-400"
              }`}
            />

            {error && (
              <p className="mt-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className="mt-6 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default NameStep;