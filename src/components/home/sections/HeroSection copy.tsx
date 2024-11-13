"use client";

import Button from "@/components/Button";
import { Header1, Paragraph1, Paragraph2, Paragraph3 } from "@/components/Text";
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
      <div className="xl:py-[80px] py-[50px] pt-[100px] bg-[F6F9FF] pb-[150px]">
        <div className=" container1 grid grid-cols-1 lg:grid-cols-3 gap-[24px] items-center ">
          {" "}
          <div
            className="col-span-2 order-2 lg:order-1"
            data-aos="fade-up-right"
          >
            <div className="bg-white relative hover:border-primary border-2 rounded-lg">
              <div className="p-1 pl-2 border flex gap-4 rounded-lg absolute top-[20%] left-[10%] bg-white bg-opacity-65">
                <Paragraph2 className=" font-bold"> Product Name </Paragraph2>
                <Button
                  text="$15.00"
                  href="/contact-us"
                  isLink={true}
                  additionalClasses=" border-0   "
                />{" "}
              </div>
              <img
                src="/images/testProduct.jpg"
                alt=""
                className="w-full h-[420px] object-contain"
              />
            </div>
          </div>
          <div className="col-span-1 order-1 lg:order-2">
            {" "}
            <div className="bg-white relative hover:border-primary border-2 rounded-lg mb-[24px]">
              <div className="p-1 pl-2 border flex gap-4 rounded-lg absolute bottom-[2%] left-[2%] bg-white bg-opacity-65">
                <Paragraph2 className=" font-bold"> Product Name </Paragraph2>
                <Button
                  text="$15.00"
                  href="/contact-us"
                  isLink={true}
                  additionalClasses=" border-0   "
                />{" "}
              </div>
              <img
                src="/images/testProduct.jpg"
                alt=""
                className="w-full h-[195px] object-contain"
              />
            </div>
            <div className="bg-white relative hover:border-primary border-2 rounded-lg">
              <div className="p-1 pl-2 border flex gap-4 rounded-lg absolute bottom-[2%] left-[2%] bg-white bg-opacity-65">
                <Paragraph2 className=" font-bold"> Product Name </Paragraph2>
                <Button
                  text="$15.00"
                  href="/contact-us"
                  isLink={true}
                  additionalClasses=" border-0   "
                />{" "}
              </div>
              <img
                src="/images/testProduct.jpg"
                alt=""
                className="w-full h-[195px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" -mt-[42px] ">
        <ElevatingBrands />
      </div>
    </div>
  );
}

export default HeroSection;
