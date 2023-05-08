import React, { useEffect, useState } from 'react';
import { fetchUserOrders } from '../pages/api/orders';
import {fetchDataFromApi} from '../utils/api'
const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { data } = fetchDataFromApi("/api/orders?populate=*");
    console.log(data);
    const getUserOrders = async () => {
      const userOrders = await fetchUserOrders(userId);
      setOrders(Array.isArray(userOrders) ? userOrders : []);
      console.log(orders, userId, userOrders);

    };

    getUserOrders();
  }, [userId]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
          <p className="mb-4">Date: {order.date}</p>
          {/* Add more order details as needed */}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
