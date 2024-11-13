"use client";

import React, { useState } from "react";
import ProductCard from "../ProductCard";
import {
  Header4,
  Header5,
  Paragraph1,
  ParagraphLink1,
} from "@/components/Text";
import Button from "@/components/Button";
import Section6 from "@/components/home/sections/Section6";
import ProductCartCard from "@/components/Cart/ProductCartCard";
import Checkout from "./Checkout";

const CheckOutOverview = () => {
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

  const [products, setProducts] = useState<any[]>([
    {
      id: 1,
      image: "/images/testProduct.jpg",
      title: "Cream A",
      price: 20.99,
      quantity: 2,
    },
    {
      id: 2,
      image: "product2.jpg",
      title: "Cream B",
      price: 15.49,
      quantity: 1,
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Calculate subtotal and total
  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const tax = 2.5;
  const shippingFee = 5.0;
  const total = subtotal + tax + shippingFee;

  // Handle quantity change for a product
  const handleQuantityChange = (productId: number, delta: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  // Handle product removal
  const handleRemoveProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  // Toggle visibility function
  const toggleSummary = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  return (
    <div>
      <div className="container1 mx-auto px-4  py-[100px]">
        <div className=" grid grid-cols-1 sm:grid-cols-5 gap-8 bg-white sm:p-8 p-4 rounded-lg">
          <div className="block sm:hidden">
            <div className=" flex justify-between bg-bg_gray p-2 px-4 rounded-lg items-center ">
              <button
                onClick={toggleSummary}
                className=" flex gap-1 items-center text-[12px] text-primary "
              >
                {isSummaryVisible ? "Hide order summary" : "Show order summary"}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform ${
                    isSummaryVisible ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ParagraphLink1 className="text-lg font-bold">
                ${total.toFixed(2)}
              </ParagraphLink1>
            </div>

            {/* Conditionally render Summary based on state */}
            {isSummaryVisible && (
              <div className=" space-y-2 mt-4">
                {/* Products list */}
                <div className="space-y-4 overflow-y-auto bg-bg_gray p-2 rounded-lg h-[300px] scrollbar-hide">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductCartCard
                        key={product.id}
                        product={product}
                        onRemove={handleRemoveProduct}
                        onQuantityChange={handleQuantityChange}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      Your cart is empty.
                    </p>
                  )}
                </div>
                <hr />
                <div className="flex- hidden justify-between">
                  <Paragraph1>Taxes:</Paragraph1>
                  <Paragraph1>${tax.toFixed(2)}</Paragraph1>
                </div>
                <div className="flex justify-between">
                  <Paragraph1>Shipping fee:</Paragraph1>
                  <Paragraph1 className="text-gray-500">
                    Calculated at checkout
                  </Paragraph1>
                </div>
                <div className="flex justify-between font-semibold">
                  <ParagraphLink1>Total:</ParagraphLink1>
                  <ParagraphLink1>${total.toFixed(2)}</ParagraphLink1>
                </div>
              </div>
            )}
          </div>

          {/* Right section - Product Images */}
          <div className=" sm:col-span-3">
            <Checkout
              products={products}
              total={total.toFixed(2)}
              logoUrl="/images/logo.png"
            />
          </div>

          {/* Left section - Product Details */}
          <div className="sm:col-span-2 hidden sm:block">
            <div className="p-4 space-y-4 overflow-y-auto h-[300px] bg-bg_gray px-4 rounded-lg scrollbar-hide">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCartCard
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveProduct}
                    onQuantityChange={handleQuantityChange}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>

            {/* Summary */}
            <div className="p-4  space-y-2">
              <div className="flex- hidden justify-between">
                <Paragraph1>Taxes:</Paragraph1>
                <Paragraph1>${tax.toFixed(2)}</Paragraph1>
              </div>
              <div className="flex justify-between">
                <Paragraph1>Shipping fee:</Paragraph1>
                <Paragraph1 className="text-gray-500">
                  Calculated at checkout
                </Paragraph1>
              </div>
              <div className="flex justify-between font-semibold">
                <ParagraphLink1>Total:</ParagraphLink1>
                <ParagraphLink1>${total.toFixed(2)}</ParagraphLink1>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Other Products</h2>
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

export default CheckOutOverview;
