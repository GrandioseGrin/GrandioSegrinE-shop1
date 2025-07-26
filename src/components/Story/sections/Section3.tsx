"use client";

import {
  Header3,
  Header4,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import Link from "next/link";
import React from "react";
import AOS from "aos";


function Section3() {

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });


  return (
    <div>
      {" "}
      <div className="container1 py-[24px] xl:py-[100px] text-p_black">
        <div
          className="flex xl:gap-[24px] flex-col items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>Get to Know Us</Header3>
          <Paragraph1 className="max-w-[883px] text-center">
            Your One-Stop Destination for Everyday Essentials
          </Paragraph1>
        </div>
        <div className="grid col-span-1 xl:items-center xl:grid-cols-6 gap-[24px] xl:gap-[30px]">
          <div className="xl:col-span-3">
            <div
              className="bg-white rounded-lg h-[250px] sm:h-[500px] sm:p-[31px] overflow-hidden"
              data-aos="fade-left"
            >
              <img
                src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1753520729/Gemini_Generated_Image_eefhy3eefhy3eefh_gkgnid.png"
                alt="branding"
                className="w-full h-full rounded-lg object-cover object-center "
              />
            </div>
          </div>
          <div className="xl:col-span-3 xl:space-y-[30px]">
            <div data-aos="fade-right">
              <div className="space-y-[12px] xl:space-y-[32px] md:space-y-[32px]">
                <Header4>Making Everyday Shopping Easier</Header4>
                <Paragraph1>
                  Our dedicated team is committed to helping busy working-class
                  customers save time and stress by offering a wide selection of
                  essentials all in one place. From groceries and fast food to
                  electronics, cosmetics, and tools, 9to5 Mart has you covered.
                </Paragraph1>
                <Paragraph1>
                  We believe shopping should be simple and reliable. Our mission
                  is to deliver convenience, value, and quality to your
                  doorstep, supporting you in managing life’s daily demands with
                  ease.
                </Paragraph1>

                <div>
                  <Link
                    href="/about-us"
                    className="text-[20px] text-primary font-bold underline"
                  >
                    <ParagraphLink1>Read More</ParagraphLink1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;
