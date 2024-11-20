"use client";

import {
  Header4,
  HeaderAny,
  ParagraphLink1,
  ParagraphLink2,
} from "@/components/Text";
import React, { useState, useEffect } from "react";
import countries from "./CountriesWithFlags";


function Locations() {
  const [isStateOpen, setIsStateOpen] = useState(false);

  return (
    <div>
      <div className="container1  pt-[100px]  xl:pt-[104px] pb-[24px] ">
        <div>
          <Header4>Available Shipping Locations</Header4>
        </div>
        <div className=" grid xl:grid-cols-3 grid-cols-1 mt-8 gap-4">
          {countries.map((country) => (
            <div className=" bg-white rounded-lg relative    p-2">
              <div className="flex justify-between items-center">
                <div
                  onClick={() => setIsStateOpen(!isStateOpen)}
                  className=" flex gap-2 cursor-pointer items-center"
                >
                  <div className=" h-[50px] w-[50px] bg-bg_gray rounded-lg ">
                    <img src={country.flag} className=" h-[50px] w-[50px] rounded-lg border object-cover" alt="" />
                  </div>
                  <HeaderAny className=" text-[24px]">
                    {" "}
                    {country.name}
                  </HeaderAny>
                </div>

                <div className=" border px-4 py-1 rounded-lg">$100.00</div>
              </div>
              {isStateOpen && (
                <div className="absolute py-2 right-0 top-[70px] z-20 mt-2 w-full max-h-[300px] overflow-hidden overflow-y-auto scrollbar-hide px-4 rounded-lg shadow-lg bg-white  ">
                  {/* shipping fee for each states */}
                  <div className=" flex justify-between items-center border-b py-2">
                    <ParagraphLink1>Lagos </ParagraphLink1>
                    <div className=" border px-4 py-1 rounded-lg">$100.00</div>
                  </div>

                  <p className=" text-center cursor-pointer text-primary py-2 mt-8 ">
                    {" "}
                    Add new state
                  </p>
                </div>
              )}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Locations;
