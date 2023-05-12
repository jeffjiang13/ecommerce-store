import React, { useState, useEffect } from 'react';
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";
import axios from "axios";

// OrderHistory Component
const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await fetchDataFromApi("/api/orders?populate=*");
    setOrderHistory(data);
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const filteredOrders = orderHistory.filter(order => order.attributes.userName === currentUser.username);

  return (
    <div className="orders-container">
      {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.id} className='order-box mb-4 p-4 bg-gray-200 rounded-lg shadow'>
            <h3 className='mb-2 md:mr-2 md:text-base text-center md:text-left overflow-hidden overflow-ellipsis whitespace-nowrap'>{`Order ID: ${order.attributes.stripeId}`}</h3>
            <ul>
              {order.attributes.products.map((product) => (
                <li key={product.id}>
                  {`Product name: ${product.attributes.name}, Quantity: ${product.quantity}, Price: $${product.attributes.price}`}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="no-orders-message text-center mt-4">
          <h3>You don't have any orders yet.</h3>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
