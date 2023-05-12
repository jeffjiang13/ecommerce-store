import React from 'react'
import Favorites from "@/components/Favorites";

const favorites = () => {
  return (
    <div className="text-left max-w-[800px] mx-auto my-[50px] md:my-[80px]">
      <h1 className="text-[24px] md:text-[30px] mb-5 font-semibold leading-tight">
        Favorites
      </h1>{" "}
      <Favorites />
    </div>  )
}

export default favorites
