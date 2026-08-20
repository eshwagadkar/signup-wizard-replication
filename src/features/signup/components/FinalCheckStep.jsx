import { useState } from "react";

import Button from "../../../components/FormElements/Button.jsx";
import {
  finalSignupSchema,
} from "../../../features/signup/finalSignupSchema.js";

function FinalCheckStep({
  value,
  onChange,
  onBack,
  onSubmit,
}) {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setError("");

    const result =
      finalSignupSchema.safeParse(value);

    if (!result.success) {
      setError(
        result.error.issues[0].message
      );

      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(result.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
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
                onChange(event.target.value)
              }
              disabled={isSubmitting}
              maxLength={50}
              placeholder="Optional"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30 disabled:opacity-50"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Optional. You can leave this empty.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <Button
            type="button"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            className="mt-8 bg-white text-black"
          >
            Sign Up
          </Button>
        </div>
      </section>
    </main>
  );
}

export default FinalCheckStep;