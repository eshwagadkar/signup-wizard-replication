import { useState } from "react";

import LandingScreen from "../features/landing/LandingScreen.jsx";
import WarningModal from "../features/landing/WarningModal.jsx";
import TermsModal from "../features/landing/TermsModal.jsx";
import LocationScreen from "../features/landing/LocationScreen.jsx";
import HomeScreen from "../features/home/HomeScreen.jsx";
import Toast from "../components/Feedback/Toast.jsx";

export default function LandingPage() {
  const [stage, setStage] = useState("landing");

  const [toast, setToast] = useState({
    message: "",
    type: "error",
  });

  const [location, setLocation] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({
      message,
      type,
    });
  };

  const handleLocationSuccess = (locationData) => {
    setLocation(locationData);

    setStage("home");
  };

  const handleLocationError = (message) => {
    showToast(message);
  };

  if (stage === "location") {
    return (
      <>
        <LocationScreen
          onSuccess={handleLocationSuccess}
          onError={handleLocationError}
        />

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              message: "",
              type: "error",
            })
          }
        />
      </>
    );
  }

  if (stage === "home") {
    return <HomeScreen location={location} />;
  }

  return (
    <>
      <LandingScreen
        onContinue={() => setStage("warning")}
      />

      <WarningModal
        open={stage === "warning"}
        onContinue={() => setStage("terms")}
      />

      <TermsModal
        open={stage === "terms"}
        onAccept={() => setStage("location")}
        onAlreadyHaveAccount={() => setStage("location")}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            message: "",
            type: "error",
          })
        }
      />
    </>
  );
}