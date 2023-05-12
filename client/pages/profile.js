import React from "react";
import Profile from "@/components/Profile";
import Wrapper from "@/components/Wrapper";

const profile = () => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {" "}
        <h1 className="text-[24px] md:text-[30px] mb-5 font-semibold leading-tight">
          Profile
        </h1>{" "}
        <Profile />
      </Wrapper>
    </div>
  );
};

export default profile;
