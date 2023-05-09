import React from 'react';
import OrderHistory from '../components/OrderHistory';

const OrderHistoryPage = () => {
  return (
    <div className="text-left max-w-[800px] mx-auto my-[50px] md:my-[80px]">
      <h1 className="text-[24px] md:text-[30px] mb-5 font-semibold leading-tight">Orders</h1>

      <OrderHistory />
    </div>

  );
};

export default OrderHistoryPage;
