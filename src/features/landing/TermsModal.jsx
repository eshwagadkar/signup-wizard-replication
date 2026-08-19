import Modal from "../../components/UI/Modal";

export default function TermsModal({
  open,
  onAccept,
  onAlreadyHaveAccount,
}) {
  return (
    <Modal
      open={open}
      title="Terms & Conditions"
      closeOnBackdrop={false}
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={onAccept}
            className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={onAlreadyHaveAccount}
            className="w-full rounded-full border border-zinc-300 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black"
          >
            Skip — Already have an account
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-sm leading-6 text-zinc-600">
        <p>
          Please review the terms and conditions before
          continuing.
        </p>

        {/* Reference-app terms content goes here */}
      </div>
    </Modal>
  );
}
