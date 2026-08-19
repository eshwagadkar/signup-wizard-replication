export default function WarningModal({ open, onContinue }) {
    
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="warning-modal-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-black shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300 sm:hidden" />

        <h2
          id="warning-modal-title"
          className="text-2xl font-semibold leading-tight"
        >
          Entering may lead to spontaneous hi fives ?
        </h2>

        <button
          type="button"
          onClick={onContinue}
          className="mt-8 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 active:scale-[0.99]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}