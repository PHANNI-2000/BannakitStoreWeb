import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationData = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationData); // วันที่หมดอายุ
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); // ระยะเวลา

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();

  if (!token) {
    // If no token, redirect to login page
    return redirect("/login");
  }

  return token; // EXPIRED
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
}

export function logoutUser() {
  // Remove authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  // Redirect to login page after logout
  return redirect("/login");
}

export async function checkSessionLoader() {
  const response = await fetch("http://localhost:3000", {
    credentials: "include",
  });

  if (response.ok) {
    return null;
  } else {
    // return { loggedIn: false }
    console.log("checkSessionLoader");
    // redirect('/login')
  }
}
