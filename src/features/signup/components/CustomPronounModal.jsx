import { useState } from "react";

import Modal from "../../../components/UI/Modal.jsx";
import { requestCustomPronoun } from "../../../services/signupService.js";

function CustomPronounModal({
  open,
  onClose,
  onSuccess,
  onError,
}) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmedValue = value.trim();

    if (!trimmedValue || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requestCustomPronoun(
        trimmedValue
      );

      if (!result.success) {
        onError?.("Unable to send your request.");
        return;
      }

      setValue("");
      onSuccess?.();
    } catch {
      onError?.(
        "Unable to send your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Looking for something else?"
      onClose={onClose}
      closeOnBackdrop={!isSubmitting}
      footer={
        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            isSubmitting || !value.trim()
          }
          className="flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Request
            </span>
          ) : (
            "Request"
          )}
        </button>
      }
    >
      <div>
        <p className="text-sm leading-6 text-zinc-600">
          Let us know and we will try to add it.
        </p>

        <label
          htmlFor="custom-pronoun"
          className="mt-6 block text-sm font-medium text-zinc-800"
        >
          Pronoun
        </label>

        <input
          id="custom-pronoun"
          type="text"
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          disabled={isSubmitting}
          maxLength={30}
          placeholder="Enter a pronoun"
          className="mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-black outline-none transition focus:border-black disabled:opacity-50"
        />
      </div>
    </Modal>
  );
}

export default CustomPronounModal;