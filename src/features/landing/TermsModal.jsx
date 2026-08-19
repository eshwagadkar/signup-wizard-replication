export default function TermsModal({ open, onAccept, onAlreadyHaveAccount }) {
    
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-black shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300 sm:hidden" />

        <h2
          id="terms-modal-title"
          className="text-2xl font-semibold leading-tight"
        >
          Terms & Conditions
        </h2>

        <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-600">
          <p>
            Please review the terms and conditions before continuing.
          </p>

          <p>
            The complete reference-app terms content can be inserted here
            when the corresponding source copy/assets are available.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={onAccept}
            className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 active:scale-[0.99]"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={onAlreadyHaveAccount}
            className="w-full rounded-full border border-zinc-300 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-50 active:scale-[0.99]"
          >
            Skip — Already have an account
          </button>
        </div>
      </div>
    </div>
  )
}
