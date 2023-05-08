// Add this function to your existing API utility file
import { API_URL, STRAPI_API_TOKEN } from "../../utils/urls";


export const fetchUserOrders = async (userId) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + STRAPI_API_TOKEN,
      },
    };

    try {
      const res = await fetch(`${API_URL}/api/orders?user.id=${userId}`, options);
      const data = await res.json();
      console.log(data)
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Fetch user orders error:', error);
      throw error;
    }
  };
