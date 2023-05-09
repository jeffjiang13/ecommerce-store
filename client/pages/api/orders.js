// Add this function to your existing API utility file
import { API_URL, STRAPI_API_TOKEN } from "../../utils/urls";


async function fetchUserOrders(username) {
  try {
    const res = await fetch(`${API_URL}/orders?user.username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

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
