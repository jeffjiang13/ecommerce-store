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
