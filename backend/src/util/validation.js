function isValidText(value, maxLength = 1) {
  return value && value.trim().length >= maxLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

function isValidEmail(value) {
  return value && value.includes("@");
}

export { isValidText, isValidDate, isValidImageUrl, isValidEmail };

// import { isValidText } from "../util/validation.js"; // นำเข้าฟังก์ชันตามชื่อ
// import isValidText from "../util/validation.js"; // นำเข้าฟังก์ชันแบบ default
