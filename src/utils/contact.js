// Shared by the contact form (browser) and /api/contact (server),
// so both check messages with exactly the same rules.

export const CONTACT_FIELDS = ["name", "email", "message"];

export const CONTACT_MAX_LENGTH = {
  name: 100,
  email: 254,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const validateContactField = (field, value) => {
  const text = typeof value === "string" ? value.trim() : "";
  const name = capitalize(field);

  if (!text) {
    return `${name} is a required field`;
  }
  if (text.length > CONTACT_MAX_LENGTH[field]) {
    return `${name} must be ${CONTACT_MAX_LENGTH[field]} characters or fewer`;
  }
  if (field === "email" && !EMAIL_PATTERN.test(text)) {
    return "Must be a valid email address";
  }
  return "";
};

export const validateContact = (data = {}) => {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateContactField(field, data[field]);
    if (error) errors[field] = error;
  }
  return errors;
};
