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
import ProductCard from "@/components/Products/ProductCard";

function Section3() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div>
      {" "}
      <div className=" container1 py-[24px] xl:py-[100px]  text-p_black">
        {" "}
        <div
          className=" flex xl:gap-[24px] flex-col items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>
            Fresh Finds for Your <span className="text-primary">Glow-Up</span>
          </Header3>{" "}
          <Paragraph1 className="max-w-[883px] text-center">
            Discover our newest beauty essentials! Handpicked just for you,
            these products are here to elevate your routine and keep you at the
            forefront of beauty trends.
          </Paragraph1>
        </div>
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

export default Section3;
