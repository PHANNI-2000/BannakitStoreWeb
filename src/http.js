import { getAuthToken } from "./util/auth";

export async function fetchCategory() {
  const token = getAuthToken();
  
  if (token !== "EXPIRED") {
    const response = await fetch("http://localhost:3000/api/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }

    return resData.results;
  }
}
