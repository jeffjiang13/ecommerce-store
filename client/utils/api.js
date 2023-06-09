import { API_URL, STRAPI_API_TOKEN } from "./urls";

export async function fetchItemsByQuery(query) {
  const response = await fetch(
    `${API_URL}/api/products?populate=image&filter[name][$regex]=${encodeURIComponent(
      query
    )}&filter[name][$options]=i`,
    {
      method: "GET",
    }
  );  const data = await response.json();
  console.log("data",data); // Add this line

  // Map through the items to include the thumbnail property
  const itemsWithThumbnails = data.data.map(item => {
    const thumbnailUrl = item.attributes.image.data.length > 0 ? item.attributes.image.data[0].attributes.url : null;

    return {
      ...item,
      attributes: {
        ...item.attributes,
        thumbnail: {
          data: {
            attributes: {
              url: thumbnailUrl
            }
          }
        }
      }
    };
  });

  return itemsWithThumbnails;
}



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
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
    {
      identifier,
      password,
    }
  );

  // Fetch user data with profileImage
  const userResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${response.data.user.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Return the user and jwt token
  return {
    data: {
      jwt: response.data.jwt,
      user: userResponse.data,
    },
  };
};

export const logout = () => {
  // Remove JWT token from local storage
  localStorage.removeItem("token");
};
// ... other imports and functions
