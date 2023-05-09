import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderHistory = () => {
  console.log("Loading OrderHistory component");

  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user && state.auth.user.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getOrderHistory = async (authToken, userId) => {
    try {
      const response = await axios.get(`http://localhost:1339/api/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          users_permissions_user: userId,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching order history:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Authenticated:", isAuthenticated);
      console.log("User ID:", userId);
      console.log("Auth Token:", authToken);

      if (isAuthenticated && userId && authToken) {
        const orders = await getOrderHistory(authToken, userId);
        console.log("Fetched Orders:", orders);
        setOrderHistory(orders);
      }
      setLoading(false);
    };

    fetchData();
  }, [userId, authToken, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {orderHistory.length === 0 ? (
        <h2 className="text-lg">You don't have any orders yet.</h2>
      ) : (
        orderHistory.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
            <p className="mb-4">Date: {order.created_at}</p>
            {/* Add more order details as needed */}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
