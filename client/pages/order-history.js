import React from 'react';
import OrderHistory from '../components/OrderHistory';

const OrderHistoryPage = () => {
  console.log("Loading OrderHistoryPage");
  return (
    <div className="flex items-center justify-center min-h-screen">
      <OrderHistory />
    </div>
  );
};

export default OrderHistoryPage;
