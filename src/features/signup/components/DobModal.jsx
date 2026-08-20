import { useEffect, useState } from "react";
import { dobPartsSchema } from "../signupSchema.js";
import {
  calculateAge,
  createDateFromParts,
} from "../signupUtil.js";

const MINIMUM_AGE = 18;

function DobModal({
  open,
  initialValue,
  onClose,
  onConfirm,
}) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setDay(
      initialValue?.day
        ? String(initialValue.day)
        : ""
    );

    setMonth(
      initialValue?.month
        ? String(initialValue.month)
        : ""
    );

    setYear(
      initialValue?.year
        ? String(initialValue.year)
        : ""
    );

    setError("");
  }, [open, initialValue]);

  if (!open) {
    return null;
  }

  const validate = () => {
    const schemaResult = dobPartsSchema.safeParse({
      day,
      month,
      year,
    });

    if (!schemaResult.success) {
      setError(
        schemaResult.error.issues[0].message
      );
      return null;
    }

    const numericDay = Number(day);
    const numericMonth = Number(month);
    const numericYear = Number(year);

    if (numericMonth < 1 || numericMonth > 12) {
      setError("Month must be between 01 and 12.");
      return null;
    }

    if (numericDay < 1 || numericDay > 31) {
      setError("Day must be between 01 and 31.");
      return null;
    }

    const dateOfBirth = createDateFromParts(
      numericDay,
      numericMonth,
      numericYear
    );

    if (!dateOfBirth) {
      setError("Enter a valid calendar date.");
      return null;
    }

    const today = new Date();

    if (dateOfBirth > today) {
      setError("Date of birth cannot be in the future.");
      return null;
    }

    const age = calculateAge(dateOfBirth);

    if (age < MINIMUM_AGE) {
      setError(
        `You must be at least ${MINIMUM_AGE} years old.`
      );
      return null;
    }

    return {
      day: numericDay,
      month: numericMonth,
      year: numericYear,
      date: dateOfBirth,
      age,
    };
  };

  const handleSubmit = () => {
    const result = validate();

    if (!result) {
      return;
    }

    onConfirm(result);
  };

  const handleNumericInput = (
    value,
    setter,
    maxLength
  ) => {
    const numericValue = value
      .replace(/\D/g, "")
      .slice(0, maxLength);

    setter(numericValue);

    if (error) {
      setError("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dob-modal-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-black shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300 sm:hidden" />

        <div className="flex items-center justify-between">
          <h2
            id="dob-modal-title"
            className="text-2xl font-semibold"
          >
            Date of Birth
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-500 hover:text-black"
          >
            Close
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="dob-day"
              className="text-xs font-medium uppercase tracking-wide text-zinc-500"
            >
              Day
            </label>

            <input
              id="dob-day"
              value={day}
              onChange={(event) =>
                handleNumericInput(
                  event.target.value,
                  setDay,
                  2
                )
              }
              inputMode="numeric"
              placeholder="DD"
              className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-4 text-center outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="dob-month"
              className="text-xs font-medium uppercase tracking-wide text-zinc-500"
            >
              Month
            </label>

            <input
              id="dob-month"
              value={month}
              onChange={(event) =>
                handleNumericInput(
                  event.target.value,
                  setMonth,
                  2
                )
              }
              inputMode="numeric"
              placeholder="MM"
              className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-4 text-center outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="dob-year"
              className="text-xs font-medium uppercase tracking-wide text-zinc-500"
            >
              Year
            </label>

            <input
              id="dob-year"
              value={year}
              onChange={(event) =>
                handleNumericInput(
                  event.target.value,
                  setYear,
                  4
                )
              }
              inputMode="numeric"
              placeholder="YYYY"
              className="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-4 text-center outline-none focus:border-black"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-8 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default DobModal;