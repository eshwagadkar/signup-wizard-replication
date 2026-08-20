const EXISTING_USER_EMAIL = "existing@example.com";
const VALID_OTP = "123456";

export function submitEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        email,
      });
    }, 800);
  });
}

export function verifyOtp(email, otp) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp !== VALID_OTP) {
        resolve({
          success: false,
          error: "Invalid verification code.",
        });

        return;
      }

      const isExistingUser =
        email.toLowerCase() === EXISTING_USER_EMAIL;

      resolve({
        success: true,
        isExistingUser,
        email,
      });
    }, 1000);
  });
}