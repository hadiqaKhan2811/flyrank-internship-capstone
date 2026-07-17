export const VALIDATION_MESSAGES = {
  displayNameRequired: "Display name is required.",
  displayNameMinLength: "Display name must be at least 2 characters.",
  emailRequired: "Email is required.",
  emailInvalid: "Please enter a valid email address.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettingsForm(values) {
  const errors = {};

  const displayName = values.displayName.trim();
  if (!displayName) {
    errors.displayName = VALIDATION_MESSAGES.displayNameRequired;
  } else if (displayName.length < 2) {
    errors.displayName = VALIDATION_MESSAGES.displayNameMinLength;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = VALIDATION_MESSAGES.emailRequired;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = VALIDATION_MESSAGES.emailInvalid;
  }

  return errors;
}

export function isSettingsFormValid(errors) {
  return Object.keys(errors).length === 0;
}
