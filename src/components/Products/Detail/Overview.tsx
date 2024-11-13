"use client";

import React, { useState } from "react";
import ProductCard from "../ProductCard";
import { Header4, Header5, ParagraphLink1 } from "@/components/Text";
import Button from "@/components/Button";
import Section6 from "@/components/home/sections/Section6";

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
        <div className=" grid grid-cols-1 sm:grid-cols-5 gap-8 bg-white p-2 py-4 sm:p-8  rounded-lg">
          {/* Right section - Product Images */}
          <div className=" sm:col-span-3">
            <div className="w-full sm:h-[500px]  rounded-lg mb-4 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="max-h-full w-full rounded-lg object-contain"
              />
            </div>
            <div className="flex gap-2 w-full overflow-hidden overflow-x-auto scrollbar-hide p-1">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Left section - Product Details */}
          <div className="sm:col-span-2">
            <Header4>{product.title}</Header4>
            <div className=" flex gap-4 mt-2">
              <Header5 className="">{product.price}</Header5>
              <p className="text-xl text-gray-700 mb-4 line-through">
                {product.price}
              </p>
            </div>
            <Button
              text="Add to Cart"
              // onClick={handleClick} // onClick is passed from a client component
              additionalClasses="border-white bg-black w-full flex justify-center sm:hidden"
            />
            <hr className=" mb-8 " />

            <ParagraphLink1 className=" font-medium">
              {" "}
              Description
            </ParagraphLink1>
            <p className="text-gray-600 mb-6 text-justify">{product.description}</p>
            <Button
              text="Add to Cart"
              // onClick={handleClick} // onClick is passed from a client component
              additionalClasses="border-white bg-black w-full flex justify-center"
            />
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
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
