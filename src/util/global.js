import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Initialize SweetAlert with React Content
const MySwal = withReactContent(Swal);

// Global function
export const showAlert = (options) => {
  return MySwal.fire({
    title: options.title || "Are you sure?",
    text: options.text || "",
    icon: options.icon || "warning",
    showCancelButton: options.showCancelButton || false,
    confirmButtonText: options.confirmButtonText || "OK",
    cancelButtonText: options.cancelButtonText || "Cancel",
  });
};

export function isValidText(value, maxLength = 1) {
  return value && value.trim().length >= maxLength;
}

export function validateForm(formData, validations) {
  for (const [key, value] of Object.entries(formData)) {
    const isValid = validations[key](value);
    if (!isValid) {
      return false;
    }
  }

  return true;
}
