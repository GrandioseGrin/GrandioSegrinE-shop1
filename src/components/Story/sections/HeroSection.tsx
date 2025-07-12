"use client";

import Button from "@/components/Button";
import { Header1, Header1Plus, Header3, Paragraph3 } from "@/components/Text";
import React from "react";
import AOS from "aos";

function HeroSection() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <div className="mt-[90px]">
      <div className=" container1 relative h-[460px xl:rounded-lg overflow-hidden w-full bg-black">
        <div
          className="relative z-10 px-2 xl:p-[100px] py-[32px] pt-[150px] xl:py-[70px]"
          data-aos="fade-right"
        >
          <div className="flex flex-col xl:w-[60%] w-full xl:space-y-[24px] ">
            <Header3 className="text-white col-span-1">
              Simplify everyday shopping with
              <span className="border-primary"> 9to5 Mart’s </span>
              wide selection of essentials.
            </Header3>
            <Paragraph3 className="xl:mt-[16px] mb-[24px] xl:mb-[48px] text-white">
              At 9to5 Mart, we make life easier for busy people with groceries,
              fast food, electronics, cosmetics, tools, and more—all in one
              convenient place.
            </Paragraph3>

            <Button
              text="Start Shopping Now"
              href="/products"
              isLink={true}
              additionalClasses="border-primary xl:w-fit w-full"
            />
          </div>
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover xl:-top-[100px] xl:-left-[0px] -left-[150px] -top-[24px] bg-center- z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dtipo8fg3/image/upload/v1731517423/istockphoto-637324230-612x612as_w7eazz.jpg')",
          }}
        ></div>
        {/* Dark overlay for the background image */}
        <div className="absolute inset-0  bg-black opacity-70 z-0"></div>
      </div>
    </div>
  );
}

export default HeroSection;
