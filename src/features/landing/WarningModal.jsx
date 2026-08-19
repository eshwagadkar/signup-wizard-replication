import Modal from "../../components/UI/Modal";

export default function WarningModal({ open, onContinue }) {
  return (
    <Modal
      open={open}
      title="Entering may lead to spontaneous hi fives ?"
      closeOnBackdrop={false}
      footer={
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white"
        >
          Continue
        </button>
      }
    />
  );
}