function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  closeOnBackdrop = true,
}) {
  if (!open) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (
      closeOnBackdrop &&
      event.target === event.currentTarget
    ) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onMouseDown={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-black shadow-2xl">
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300 sm:hidden" />

        {title && (
          <h2
            id="modal-title"
            className="text-2xl font-semibold leading-tight"
          >
            {title}
          </h2>
        )}

        <div className={title ? "mt-4" : ""}>
          {children}
        </div>

        {footer && (
          <div className="mt-8">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;