import { useState } from "react";

import DobModal from "./DobModal.jsx";
import { formatDob } from "../signupUtil.js";

function DobStep({
  value,
  onChange,
  onNext,
  onBack,
}) {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const handleDobConfirm = (result) => {
    onChange({
      day: result.day,
      month: result.month,
      year: result.year,
      date: result.date,
      age: result.age,
    });

    setIsModalOpen(false);
  };

  const hasDob = Boolean(value?.date);

  return (
    <>
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
                Step 3
              </p>

              <h1 className="mt-2 text-3xl font-semibold">
                What's your age?
              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Your age is calculated from your date
                of birth.
              </p>
            </div>

            <div className="mt-10">
              <label
                htmlFor="age"
                className="text-sm font-medium text-zinc-200"
              >
                Age
              </label>

              <button
                id="age"
                type="button"
                onClick={() =>
                  setIsModalOpen(true)
                }
                className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left text-black"
              >
                <span
                  className={
                    hasDob
                      ? "text-black"
                      : "text-zinc-400"
                  }
                >
                  {hasDob
                    ? `${value.age} years`
                    : "Select date of birth"}
                </span>

                <span className="text-sm text-zinc-500">
                  →
                </span>
              </button>

              {hasDob && (
                <p className="mt-3 text-sm text-zinc-500">
                  DOB:{" "}
                  {formatDob(
                    value.day,
                    value.month,
                    value.year
                  )}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={!hasDob}
              className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      <DobModal
        open={isModalOpen}
        initialValue={value}
        onClose={() =>
          setIsModalOpen(false)
        }
        onConfirm={handleDobConfirm}
      />
    </>
  );
}

export default DobStep;