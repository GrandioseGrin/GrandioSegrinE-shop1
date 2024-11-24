"use client";

import Button from "@/components/Button";
import { Header1, Paragraph2, Paragraph3 } from "@/components/Text";
import React from "react";
import ElevatingBrands from "./others/ElevatingBrands";
import AOS from "aos";

function HeroSection() {
  React.useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  });

  return (
    <div className="  ">
      <div className="xl:py-[50px] relative py-[50px] xl:pt-[100px] pt-[100px] bg-p_black pb-[100px]">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover  bg-center- z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dtipo8fg3/image/upload/v1731516500/istockphoto-1536721205-612x612_bdmsat.jpg')",
          }}
        ></div>
        {/* Dark overlay for the background image */}
        <div className="absolute inset-0  bg-p_black opacity-80 z-0"></div>
        <div className=" container1 flex justify-center w-full items-center ">
          {" "}
          <div
            className="col-span-2 order-2 max-w-[900px] lg:order-1 text-center"
            data-aos="fade-up-right"
          >
            <Header1 className="text-white mt-4 xl:mt-0">
              Welcome to{" "}
              <span className=" py-2 rounded-[24px] sm:border-b-4 border-primary">
                {" "}
                GrandioseGrin{" "}
              </span>{" "}
              – your destination for high-quality, original beauty and cosmetic
              products.
            </Header1>
            <Paragraph3 className="mt-[16px] mb-[48px] text-white">
              Beauty begins with self-love. Indulge in skincare and cosmetics
              that celebrate the unique radiance within you.
            </Paragraph3>

            <div className="flex justify-center  xl:flex-row flex-col items-center mt-4 gap-[24px] xl:gap-[32px]">
              <Button
                text="Shop Now"
                href="/products"
                isLink={true}
                border="border-2 border-primary "
                additionalClasses="border-primary xl:w-fit w-full "
              />
              <Button
                text="About Us"
                href="/about-us"
                isLink={true}
                color="text-white"
                backgroundColor=" bg-p_black"
                border="border-2 border-white "
                additionalClasses=" xl:w-fit w-full "
              />
            </div>
          </div>
          {/* <div className="col-span-1 order-1 lg:order-2 flex justify-center">
            <div className=" relative  h-[200px] w-[250px] sm:h-[400px] sm:w-[500px]">
              <div
                style={{ transform: "rotate(-12deg)" }}
                className=" rounded-lg border-4 relative border-white  bg-primary h-[200px] w-[250px] sm:h-[400px] sm:w-[500px]"
              ></div>
              <div
                style={{ transform: "rotate(8deg)" }}
                className=" bg-primary h-full w-full overflow-hidden absolute -top-[20px] -right-[20px] p-4 border-4 border-white rounded-lg object-cover"
              >
                <img
                  data-aos="fade-left"
                  src="/images/hero_photo.jpg"
                  alt=""
                  className="w-ful object-cover h-full w-full  "
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className=" my-[50px] ">
        <ElevatingBrands />
      </div>
    </div>
  );
}

export default HeroSection;
