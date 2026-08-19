import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
});

function EmailScreen({ onSubmit, onBack, mode = "signup" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value) => {
    const result = emailSchema.safeParse({
      email: value,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setEmail(value);

    if (error) {
      validateEmail(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const isValid = validateEmail(email);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(email.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  const title =
    mode === "signin"
      ? "Sign in"
      : "Let's get started";

  const description =
    mode === "signin"
      ? "Enter your email to continue."
      : "Enter your email to create or access your account.";

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
              <span className="text-lg font-bold">LOGO</span>
            </div>

            <h1 className="mt-8 text-3xl font-semibold">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-200"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              onBlur={() => validateEmail(email)}
              autoComplete="email"
              disabled={isSubmitting}
              placeholder="Enter your email"
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
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Continue
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default EmailScreen;