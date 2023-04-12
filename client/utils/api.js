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

  export const makePaymentRequest = async (endpoint, payload) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + STRAPI_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Payment request error:', error);
      throw error;
    }
  };
