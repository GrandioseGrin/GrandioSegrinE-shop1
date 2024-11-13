import { Header3, Header4, Header5 } from "@/components/Text";
import React from "react";
import BlogCard from "./BlogCard";

function BlogsSections() {
  return (
    <div>
      <div className="container1  pt-[100px] xl:pt-[104px] pb-[24px] ">
        
        <div className=" pb-[24px]">
          <div>
            <Header4>All Blogs</Header4>
          </div>
          <div className=" grid grid-cols-1 xl:grid-cols-3  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
            <BlogCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <BlogCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <BlogCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <BlogCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsSections;
