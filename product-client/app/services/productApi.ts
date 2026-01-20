const BASE_URL = "http://localhost:5000";

export const api = async (endpoint: any) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  console.log("api response", response);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};
