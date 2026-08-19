export default function Toast({ message, type = "error", onClose }) {

  if (!message) {
    return null
  }

  const isError = type === "error";

  return (
    <div className="fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4">
      <div
        role="alert"
        className={`flex w-full max-w-md items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm font-medium shadow-xl ${
          isError
            ? "bg-red-600 text-white"
            : "bg-black text-white"
        }`}
      >
        <span>{message}</span>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-xs font-semibold uppercase opacity-80 hover:opacity-100"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
