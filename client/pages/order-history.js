import React from "react";
import OrderHistory from "../components/OrderHistory";
import Wrapper from "@/components/Wrapper";

const OrderHistoryPage = () => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {" "}
        <h1 className="text-[24px] md:text-[30px] mb-5 font-semibold leading-tight">
          Orders
        </h1>
        <OrderHistory />
      </Wrapper>
    </div>
  );
};

export default OrderHistoryPage;
