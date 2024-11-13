"use client";

import React from "react";
import { Header3, Paragraph1, ParagraphLink1 } from "../Text";
import AOS from "aos";
import { useState } from "react";
import BlogCard from "./BlogCard";

function BlogIntro() {
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
      <div className=" container1 py-[24px] xl:py-[100px] pt-[100px]  text-p_black">
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
        <div className=" grid grid-cols-1 xl:grid-cols-3  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
          <BlogCard
            title="How to Use Our Products"
            description="Learn how to maximize the benefits of our skincare range."
            image="https://via.placeholder.com/300"
            link="/blog/how-to-use-our-products"
          />
          <BlogCard
            title="How to Use Our Products"
            description="Learn how to maximize the benefits of our skincare range."
            image="https://via.placeholder.com/300"
            link="/blog/how-to-use-our-products"
          />
          <BlogCard
            title="How to Use Our Products"
            description="Learn how to maximize the benefits of our skincare range."
            image="https://via.placeholder.com/300"
            link="/blog/how-to-use-our-products"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogIntro;
