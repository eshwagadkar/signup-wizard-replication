import Modal from '../../components/UI/Modal'

export default function AccountRequiredModal({
  open,
  onGetStarted,
  onDismiss,
}) {
  return (
    <Modal
      open={open}
      title="Account required"
      onClose={onDismiss}
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="w-full rounded-full border border-zinc-300 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black"
          >
            Maybe Later
          </button>
        </div>
      }
    >
      <p className="text-sm leading-6 text-zinc-600">
        Create an account or sign in to continue with this
        action.
      </p>
    </Modal>
  );
}