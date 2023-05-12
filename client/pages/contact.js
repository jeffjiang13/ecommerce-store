import React from 'react';
import Wrapper from "@/components/Wrapper";

const Contact = () => {
  return (
    <div className="w-full md:py-20">
    <Wrapper>      <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Contact Us</h1>
      <p className="text-lg">
        If you have any questions, suggestions, or need assistance, please feel
        free to contact us at:
      </p>
      <p className="text-md md:text-xl">
        <a href="mailto:jeff.jiang13@gmail.com" className="text-blue-500">
            jeff.jiang13@gmail.com
        </a>
      </p>
      </Wrapper>
    </div>
  );
};

export default Contact;
