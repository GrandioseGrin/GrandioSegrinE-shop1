"use client";

import React, { useState } from "react";
import { Header4, Header5, ParagraphLink1 } from "@/components/Text";
import Button from "@/components/Button";
import Section6 from "@/components/home/sections/Section6";
import ProductCard from "@/components/Products/ProductCard";
import BlogCard from "../BlogCard";

const ProductDetail = () => {
  const product = {
    title: "Product Title",
    price: "$49.99",
    description:
      "Introducing an exceptional product crafted with precision and designed to meet your every need. This item combines top-tier quality with cutting-edge features, ensuring a seamless experience that fits effortlessly into your lifestyle. Not only does it deliver outstanding performance, but it’s also built with durability in mind, so you can enjoy it for years to come. Every detail, from the intuitive design to the advanced technology, is tailored to provide unparalleled satisfaction. Whether you’re using it daily or for special occasions, this product adapts perfectly, making it a must-have in any household or personal collection. You'll find yourself reaching for it time and time again, appreciating its reliability, ease of use, and the added value it brings.  Get ready to fall in love with a product that truly understands your needs!",
    images: [
      "/images/testProduct.jpg",
      "https://via.placeholder.com/501",
      "https://via.placeholder.com/502",
      "https://via.placeholder.com/503",
    ],
  };

  const relatedProducts = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Related Product 1",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Related Product 2",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Related Product 3",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Related Product 4",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div>
      <div className="container1 mx-auto px-4  py-[100px]">
        <div className=" grid h-full grid-cols-1 sm:grid-cols-5 gap-8 bg-white sm:p-8 p-2 py-4 rounded-lg">
          {/* Right section - Product Images */}
          <div className=" col-span-4">
            <div className="w-full   rounded-lg mb-4 ">
              <Header4>{product.title}</Header4>
              Author: <span className="text-gray-500">Dr. John Doe</span>
              <hr className=" mb-8" />
              <img
                src={selectedImage}
                alt="Selected Product"
                className="h-[200px] w-full rounded-lg object-cover"
              />
              <ParagraphLink1 className=" font-medium">
                {" "}
                Description
              </ParagraphLink1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <ParagraphLink1 className=" font-medium">
                {" "}
                Description
              </ParagraphLink1>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>
          </div>

          {/* Left section - Product Details */}
          <div className="col-span-1 space-y-4 hidden sm:block">
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

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  description="A brief description of the product."
                  price={29.99}
                  onAddToCart={() => console.log("Added to cart")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Section6 />
    </div>
  );
};

export default ProductDetail;
