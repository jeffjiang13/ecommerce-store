import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + STRAPI_API_TOKEN,
      },
    };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  export const makePaymentRequest = async (endpoint, payload, userId) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + STRAPI_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload, user: userId }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Payment request error:', error);
      throw error;
    }
  };


  // src/api.js
import axios from "axios";

export const register = async (username, email, password) => {
  return await axios.post(`${API_URL}/api/auth/local/register`, {
    username,
    email,
    password,
  });
};

export const login = async (identifier, password) => {
  return await axios.post(`${API_URL}/api/auth/local`, {
    identifier,
    password,
  });
};

export const logout = () => {
  // Remove JWT token from local storage
  localStorage.removeItem("token");
};
// ... other imports and functions

// Add this function to your existing API utility file
export async function fetchUserOrders(username) {
  try {
    const res = await fetchDataFromApi(`/api/orders?user.username=${username}`);

    if (!res.ok) {
      throw new Error("Failed to fetch user orders.");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching orders for username:", username, err);
    throw err;
  }
}
