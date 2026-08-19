import { useState } from 'react'

import LandingScreen from '../features/landing/LandingScreen.jsx'
import WarningModal from '../features/landing/WarningModal.jsx'
import TermsModal from '../features/landing/TermsModal.jsx'

function EntryPage() {
  const [showWarning, setShowWarning] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const handleLandingContinue = () => {
    setShowWarning(true)
  }

  const handleWarningContinue = () => {
    setShowWarning(false)
    setShowTerms(true)
  }

  const handleTermsAccept = () => {
    setShowTerms(false)

    // Milestone 4:
    // transition to the Location flow.
  }

  const handleAlreadyHaveAccount = () => {
    setShowTerms(false)

    // Future existing-user flow:
    // Location → Email → OTP → Sign In
  }

  return (
    <>
      <LandingScreen onContinue={handleLandingContinue} />

      <WarningModal
        open={showWarning}
        onContinue={handleWarningContinue}
      />

      <TermsModal
        open={showTerms}
        onAccept={handleTermsAccept}
        onAlreadyHaveAccount={handleAlreadyHaveAccount}
      />
    </>
  )
}

export default EntryPage