import { Header3, Header4, Header5 } from "@/components/Text";
import React from "react";
import ProductCard from "./ProductCard";

function ProductSections() {
  return (
    <div>
      <div className="container1  pt-[100px] xl:pt-[104px] pb-[24px] ">
        <div className=" pb-[24px]">
          <div>
            <Header4>Featured Products</Header4>
          </div>
          <div className=" grid grid-cols-1 xl:grid-cols-4  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
          </div>
        </div>
        <div className=" pb-[24px]">
          <div>
            <Header4>All Products</Header4>
          </div>
          <div className=" grid grid-cols-1 xl:grid-cols-4  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
              image="/images/testProduct.jpg"
              title="Product Title"
              description="A brief description of the product."
              price={29.99}
            />
            <ProductCard
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

export default ProductSections;
