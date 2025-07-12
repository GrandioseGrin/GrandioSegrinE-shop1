"use client";

import Button from "@/components/Button";
import { Header1Plus, Header3, Header4, Paragraph1 } from "@/components/Text";
import Link from "next/link";
import React from "react";
import AOS from "aos";


function section6() {

   React.useEffect(() => {
     AOS.init({
       duration: 1000,
     });
   });
  
  return (
    <div>
      <div
        className=" container1 pt-[24px] xl:pt-[50px] text-p_black"
        data-aos="fade-up"
      >
        {" "}
        <div className="flex flex-col xl:gap-[24px] items-center w-full text-center pb-[64px]">
          <Header1Plus>
            Make Life <span className="text-primary">Easier</span> with 9to5
            Mart
          </Header1Plus>
          <Paragraph1 className="max-w-[883px] text-center">
            Got questions or need help? Our team is here to guide you—whether
            you're ordering dinner, shopping tools, or picking up essentials for
            the week.
          </Paragraph1>
          <Button
            text="Contact Us Today"
            href="/contact-us"
            isLink={true}
            additionalClasses="border-white mt-[24px] xl:mt-[48px] w-fit "
          />
        </div>
      </div>
    </div>
  );
}

export default section6;
