import { useEffect, useRef, useState } from "react";

function LocationScreen({ onSuccess, onError }) {
    
  const [status, setStatus] = useState("requesting");
  const hasRequested = useRef(false);

  const requestLocation = () => {

    if (!navigator.geolocation) {
      setStatus("unavailable");

      onError("Location services are not available in this browser.");
      return;
    }

    setStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setStatus("success");
        onSuccess(location);
      },
      (error) => {
        setStatus("error");

        switch (error.code) {
          case error.PERMISSION_DENIED:
            onError("Location permission was denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            onError("Your location is currently unavailable.");
            break;

          case error.TIMEOUT:
            onError("The location request timed out.");
            break;

          default:
            onError("Unable to retrieve your location.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    if (hasRequested.current) {
      return;
    }

    hasRequested.current = true;
    requestLocation();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <span className="text-2xl">📍</span>
          </div>

          <h1 className="mt-8 text-3xl font-semibold">
            {status === "requesting"
              ? "Finding your location"
              : "Location access"}
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            {status === "requesting"
              ? "Please allow location access in your browser."
              : "We use your location to provide a better experience."}
          </p>

          {status !== "requesting" && status !== "success" && (
            <button
              type="button"
              onClick={requestLocation}
              className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-zinc-200"
            >
              Retry
            </button>
          )}

          {status === "requesting" && (
            <div className="mt-8 flex justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default LocationScreen;