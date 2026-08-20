function Button({
  children,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-wide transition ${
        isDisabled
          ? "cursor-not-allowed opacity-40"
          : "hover:opacity-90"
      } ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-3">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />

          <span>Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;