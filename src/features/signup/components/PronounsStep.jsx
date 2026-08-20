import { useState } from "react";

import CustomPronounModal from "./CustomPronounModal.jsx";
import { PRONOUN_OPTIONS } from "../pronounOptions.js";

const MAX_SELECTIONS = 3;

function PronounsStep({
  value,
  onChange,
  onNext,
  onBack,
  showToast,
}) {
  const [isCustomModalOpen, setIsCustomModalOpen] =
    useState(false);

  const handleToggle = (pronoun) => {
    const isSelected = value.includes(pronoun);

    if (isSelected) {
      onChange(
        value.filter(
          (selected) => selected !== pronoun
        )
      );

      return;
    }

    if (value.length >= MAX_SELECTIONS) {
     showToast?.(
        "You can select up to 3 pronouns."
      );

      return;
    }

    onChange([...value, pronoun]);
  };

  const handleCustomRequestSuccess = () => {
    setIsCustomModalOpen(false);

   showToast?.(
      "Request sent",
      "success"
    );
  };

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
                Step 4
              </p>

              <h1 className="mt-2 text-3xl font-semibold">
                What are your pronouns?
              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Select up to 3.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {PRONOUN_OPTIONS.map((pronoun) => {
                const isSelected =
                  value.includes(pronoun);

                const isDisabled =
                  !isSelected &&
                  value.length >= MAX_SELECTIONS;

                return (
                  <button
                    key={pronoun}
                    type="button"
                    onClick={() =>
                      handleToggle(pronoun)
                    }
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                      isSelected
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    } ${
                      isDisabled
                        ? "cursor-not-allowed opacity-40"
                        : ""
                    }`}
                  >
                    <span>{pronoun}</span>

                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="text-sm"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                setIsCustomModalOpen(true)
              }
              className="mt-6 text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline"
            >
              Did we miss anything?
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={value.length === 0}
              className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      <CustomPronounModal
        open={isCustomModalOpen}
        onClose={() =>
          setIsCustomModalOpen(false)
        }
        onSuccess={handleCustomRequestSuccess}
        onError={showToast}
      />
    </>
  );
}

export default PronounsStep;