import { useState } from "react";

import LandingScreen from "../features/landing/LandingScreen.jsx";
import WarningModal from "../features/landing/WarningModal.jsx";
import TermsModal from "../features/landing/TermsModal.jsx";
import LocationScreen from "../features/landing/LocationScreen.jsx";
import HomeScreen from "../features/home/HomeScreen.jsx";
import Toast from "../components/Feedback/Toast.jsx";
import AccountRequiredModal from "../features/authentication/AccountRequiredModal.jsx";
import EmailScreen from "../features/authentication/EmailScreen.jsx";
import OtpScreen from "../features/authentication/OtpScreen.jsx";
import { submitEmail, verifyOtp } from "../services/authService.js";
import SignupWizard from "../features/signup/SignupWizard.jsx";
import SignupSuccess from "../features/signup/SignupSuccess.jsx";

export default function LandingPage() {
  const [stage, setStage] = useState("landing");
  const [authMode, setAuthMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    type: "error",
  });


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

  const handleEmailSubmit = async (submittedEmail) => {
  try {
    await submitEmail(submittedEmail);

    setEmail(submittedEmail);
    setStage("otp");
  } catch {
    showToast(
      "Unable to send the verification code."
    );
  }
};

const handleOtpVerify = async (otp) => {
  try {
    const result = await verifyOtp(email, otp);

    if (!result.success) {
      showToast(result.error);
      return;
    }

    if (result.isExistingUser) {
      setAuthMode("signin");
      setStage("authenticated-home");
      return;
    }

    setStage("signup");
  } catch {
    showToast(
      "Verification failed. Please try again."
    );
  }
};

if (stage === "otp") {
  return (
    <>
      <OtpScreen
        email={email}
        onBack={() => setStage("email")}
        onVerify={handleOtpVerify}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={clearToast}
      />
    </>
  );
}

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

  if (stage === "authenticated-home") {
  return (
    <HomeScreen
      isAuthenticated
      onProtectedAction={() => {}}
    />
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

  if (stage === "signup") {
  return (
    <SignupWizard
      email={email}
      onComplete={(action, data) => {

      if (action === "back") {
        setStage("email");
        return;
      }

     if (action === "success") {
          console.log(
            "Signup completed successfully:",
            data
          );

          setStage("signup-success");
    }
  }}
 />
);
}

if (stage === "signup-success") {
  return (
    <SignupSuccess
      onContinue={() =>
        setStage("authenticated-home")
      }
    />
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