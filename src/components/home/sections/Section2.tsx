"use client";

import Button from "@/components/Button";
import {
  Header3,
  Header4,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import Link from "next/link";
import React from "react";
import AOS from "aos";
import RandomFaces from "./others/RandomFaces";
import ProductCard from "@/components/Products/ProductCard";

function Section2() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div>
      <div className=" container1 pt-[24px] xl:pt-[100px]  text-p_black">
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

export default Section2;
