import { useState } from "react";
import { z } from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

function OtpScreen({
  email,
  onVerify,
  onBack,
}) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateOtp = (value) => {
    const result = otpSchema.safeParse({
      otp: value,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

    if (error) {
      validateOtp(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const isValid = validateOtp(otp);

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onVerify(otp);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="text-sm text-zinc-400 transition hover:text-white disabled:opacity-50"
          >
            ← Back
          </button>

          <div className="mt-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <span className="text-lg font-bold">
                OTP
              </span>
            </div>

            <h1 className="mt-8 text-3xl font-semibold">
              Verify your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Enter the 6-digit code sent to:
            </p>

            <p className="mt-1 break-all text-sm font-medium text-white">
              {email}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10"
          >
            <label
              htmlFor="otp"
              className="text-sm font-medium text-zinc-200"
            >
              Verification code
            </label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={handleChange}
              onBlur={() => validateOtp(otp)}
              disabled={isSubmitting}
              maxLength={6}
              placeholder="000000"
              className={`mt-3 w-full rounded-2xl border bg-white px-4 py-4 text-center text-2xl tracking-[0.4em] text-black outline-none transition ${
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
              disabled={
                isSubmitting || otp.length !== 6
              }
              className="mt-6 flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Verifying
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            For this assessment, use the test code
            <span className="font-medium text-zinc-300">
              {" "}
              123456
            </span>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default OtpScreen;