import { useState } from "react";

import UsernameStep from "./components/UsernameStep.jsx";
import NameStep from "./components/NameStep.jsx";
import DobStep from "./components/DobStep.jsx";
import PronounsStep from "./components/PronounsStep.jsx";
import Toast from "../../components/Feedback/Toast.jsx";

function SignupWizard({
  email,
  onComplete,
}) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email,
    username: "",
    name: "",
    dob: null,
    age: null,
    pronouns: [],
    location: null,
    inviteCode: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const goToNextStep = () => {
    setStep((current) => current + 1);
  };

  const goToPreviousStep = () => {
    setStep((current) => Math.max(1, current - 1));
  };

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

  if (step === 1) {
    return (
      <UsernameStep
        value={formData.username}
        onChange={(value) =>
          updateField("username", value)
        }
        onNext={goToNextStep}
        onBack={() => {
          onComplete?.("back");
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <NameStep
        value={formData.name}
        onChange={(value) =>
          updateField("name", value)
        }
        onNext={goToNextStep}
        onBack={goToPreviousStep}
      />
    );
  }

  if (step === 3) {
  return (
    <DobStep
      value={formData.dob}
      onChange={(value) =>
        updateField("dob", value)
      }
      onNext={goToNextStep}
      onBack={goToPreviousStep}
    />
  );
}

if (step === 4) {
  return (
  <>
    <PronounsStep
        value={formData.pronouns}
        onChange={(value) =>
        updateField("pronouns", value)
        }
        onNext={goToNextStep}
        onBack={goToPreviousStep}
        showToast={showToast}
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
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">
          Next signup step
        </h1>

        <p className="mt-3 text-sm text-zinc-400">
          DOB will be implemented in the next milestone.
        </p>
      </div>
    </main>
  );
}

export default SignupWizard;