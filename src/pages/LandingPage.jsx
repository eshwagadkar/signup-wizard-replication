import { useState } from "react";

import LandingScreen from "../features/landing/LandingScreen.jsx";
import WarningModal from "../features/landing/WarningModal.jsx";
import TermsModal from "../features/landing/TermsModal.jsx";
import LocationScreen from "../features/landing/LocationScreen.jsx";
import HomeScreen from "../features/home/HomeScreen.jsx";
import Toast from "../components/Feedback/Toast.jsx";
import AccountRequiredModal from "../features/authentication/AccountRequiredModal.jsx";
import EmailScreen from "../features/authentication/EmailScreen.jsx";

export default function LandingPage() {
  const [stage, setStage] = useState("landing");
  const [authMode, setAuthMode] = useState("signup");
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

   const clearToast = () => {
    setToast({
      message: "",
      type: "error",
    });
  };

  const handleLocationSuccess = (locationData) => {
    setLocation(locationData);

    if (authMode === "signin") {
      setStage("email");
      return;
    }

    setStage("home");
  };

  const handleLocationError = (message) => {
    showToast(message);
  };

  const handleProtectedAction = () => {
    setStage("account-required");
  };

  const handleGetStarted = () => {
    setAuthMode("signup");
    setStage("email");
  };

  const handleEmailSubmit = async (email) => {
   console.log("Simulated email submission:", email);

  showToast("Email submitted. OTP verification is the next milestone.", "success");
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
          onClose={clearToast}
        />
      </>
    );
  }

  if (stage === "home") {
    return (
      <>
        <HomeScreen
          onProtectedAction={handleProtectedAction}
        />

        <AccountRequiredModal
          open={false}
          onGetStarted={handleGetStarted}
          onDismiss={() => setStage("home")}
        />
      </>
    );
  }

  if (stage === "account-required") {
    return (
      <>
        <HomeScreen
          onProtectedAction={handleProtectedAction}
        />

        <AccountRequiredModal
          open
          onGetStarted={handleGetStarted}
          onDismiss={() => setStage("home")}
        />
      </>
    );
  }

   if (stage === "email") {
    return (
      <>
        <EmailScreen
          mode={authMode}
          onBack={() => setStage("home")}
          onSubmit={handleEmailSubmit}
        />

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      </>
    );
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
        onAccept={() => {
          setAuthMode("signup");
          setStage("location");
        }}
        onAlreadyHaveAccount={() => {
          setAuthMode("signin");
          setStage("location");
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={clearToast}
      />
    
    </>
  );
}