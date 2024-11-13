"use client";


import React from "react";
import { Header3, Paragraph1, ParagraphLink1 } from "../Text";
import ProductCard from "./ProductCard";
import AOS from "aos";
import { useState } from "react";


function Overview() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
    
    const categories = [
      "Creams",
      "Lipsticks",
      "Foundations",
      "Serums",
      "Masks",
      "Lotions",
    ];

  const [isOpen, setIsOpen] = useState(false);
  const filters = [
    "Trending",
    "Latest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  return (
    <div>
      <div className=" container1 py-[24px] xl:py-[100px] pt-[100px] text-p_black">
        {" "}
        <div
          className=" flex flex-col gap-[8px] xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>
            Where Your <span className="text-primary">Beauty</span> Shines
            Brightest
          </Header3>
          <Paragraph1 className="max-w-[883px] text-center">
            Each product is carefully crafted to celebrate your unique beauty,
            empowering you to express yourself with confidence, elegance, and
            radiance.
          </Paragraph1>
        </div>
        <div className=" flex justify-between items-center- mb-4">
          <div className=" flex w-full gap-4 md:w-[60%] overflow-hidden overflow-x-auto scrollbar-hide   ">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex gap-4 bg-white w-fit justify-center items-center rounded-lg px-4 border"
              >
                <ParagraphLink1 className="max-w-[883px] text-center">
                  {category}
                </ParagraphLink1>
              </div>
            ))}
          </div>
          <div className="relative inline-">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" flex gap-4 bg-white w-fit cursor-pointe rounded-lg p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {filters.map((filter, index) => (
                    <div
                      key={index}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        // Handle filter option selection here
                        console.log(`Selected filter: ${filter}`);
                        setIsOpen(false);
                      }}
                    >
                      {filter}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* data-aos="fade-right" */}
        <div className=" grid grid-cols-1 xl:grid-cols-4  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
          <ProductCard
            image="/images/testProduct.jpg"
            title="Product Title"
            description="A brief description of the product."
            price={29.99}
            onAddToCart={() => console.log("Added to cart")}
          />
          <ProductCard
            image="/images/testProduct.jpg"
            title="Product Title"
            description="A brief description of the product."
            price={29.99}
            onAddToCart={() => console.log("Added to cart")}
          />
          <ProductCard
            image="/images/testProduct.jpg"
            title="Product Title"
            description="A brief description of the product."
            price={29.99}
            onAddToCart={() => console.log("Added to cart")}
          />
          <ProductCard
            image="/images/testProduct.jpg"
            title="Product Title"
            description="A brief description of the product."
            price={29.99}
            onAddToCart={() => console.log("Added to cart")}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
