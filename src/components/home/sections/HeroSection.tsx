/** @format */

import React from "react";
import BannerCarousel from "./others/Banner";
import Image from "next/image";
import Button from "@/components/Button";

const HomePage = () => {
  const imageUrls = [
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1734057094/ad-banner-natural-beauty-products-600nw-1780339220_fi36g5.webp",
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1734057163/cosmetic-banner-design-template-f144d95f86f429ed2b4cf012c01937cc_screen_xemfkc.jpg",
    "https://res.cloudinary.com/dtipo8fg3/image/upload/v1734057163/HKen-blackFriday_FCbanana_web_banner_3b60d3ff-04ac-494d-af52-e198f9fa37bb_g02jmr.webp",
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
