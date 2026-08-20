import { useState } from "react";

import UsernameStep from "./components/UsernameStep.jsx";
import NameStep from "./components/NameStep.jsx";

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