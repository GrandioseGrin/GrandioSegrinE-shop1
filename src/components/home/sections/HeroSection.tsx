/** @format */

import React from "react";
import BannerCarousel from "./others/Banner";
import Image from "next/image";
import Button from "@/components/Button";

const HomePage = () => {
  const imageUrls = [
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1753519931/Screenshot_2025-07-26_095103_zbcnj0.png",
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1753519930/Screenshot_2025-07-26_095118_vt7g0f.png",
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1753519931/Screenshot_2025-07-26_095136_fkqpla.png",
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1753519930/Screenshot_2025-07-26_095043_zqgsd4.png",
  ];

  return (
    <div className="  pt-[70px] ">
     
      <BannerCarousel imageUrls={imageUrls} />

      <div className="flex container1 justify-center-  xl: flex-row -flex-col items-center mt-4 gap-4 xl:gap-[32px]">
        <Button
          text="Shop Now"
          href="/products"
          isLink={true}
          border="border-2 border-primary "
          additionalClasses="border-primary xl:w-fit- flex justify-center  w-full "
        />
        <Button
          text="About Us"
          href="/about-us"
          isLink={true}
          color="text-white"
          backgroundColor=" bg-p_black"
          border="border-2 border-white "
          additionalClasses=" xl: w-fit- justify-center flex w-full "
        />
      </div>
    </div>
  );
};

export default HomePage;
