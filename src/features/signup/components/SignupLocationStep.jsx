import { useEffect, useRef, useState } from "react";

import { requestLocation } from "../../../services/locationService.js";

function SignupLocationStep({
  value,
  onChange,
  onNext,
  onBack,
  showToast,
}) {
  const [status, setStatus] = useState(
    value ? "success" : "idle"
  );

  const hasRequested = useRef(false);

  const requestUserLocation = async () => {
    if (status === "requesting") {
      return;
    }

    setStatus("requesting");

    try {
      const location = await requestLocation();

      onChange(location);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      showToast?.(error.message);
    }
  };

  useEffect(() => {
    if (value || hasRequested.current) {
      return;
    }

    hasRequested.current = true;
    requestUserLocation();
  }, []);

  const isLoading = status === "requesting";
  const hasLocation = Boolean(value);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="text-sm text-zinc-400 transition hover:text-white disabled:opacity-50"
          >
            ← Back
          </button>

          <div className="mt-12">
            <p className="text-sm text-zinc-500">
              Step 5
            </p>

            <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
              <span className="text-2xl">
                📍
              </span>
            </div>

            <h1 className="mt-8 text-3xl font-semibold">
              Where are you?
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Allow location access so we can use your
              current location.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5">
            {isLoading && (
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />

                <span className="text-sm text-zinc-300">
                  Finding your location...
                </span>
              </div>
            )}

            {hasLocation && (
              <div>
                <p className="text-sm font-medium text-white">
                  Location detected
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Latitude: {value.latitude}
                </p>

                <p className="text-xs text-zinc-500">
                  Longitude: {value.longitude}
                </p>
              </div>
            )}

            {!isLoading && !hasLocation && (
              <div>
                <p className="text-sm text-zinc-400">
                  Location access is required to
                  continue.
                </p>

                <button
                  type="button"
                  onClick={requestUserLocation}
                  className="mt-5 w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
                >
                  Allow Location
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasLocation || isLoading}
            className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default SignupLocationStep;