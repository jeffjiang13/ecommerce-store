import React from "react";
import Favorites from "@/components/Favorites";
import Wrapper from "@/components/Wrapper";

const favorites = () => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {" "}
        <h1 className="text-[24px] md:text-[30px] mb-5 font-semibold leading-tight">
          Favorites
        </h1>{" "}
        <Favorites />
      </Wrapper>
    </div>
  );
};

export default favorites;
