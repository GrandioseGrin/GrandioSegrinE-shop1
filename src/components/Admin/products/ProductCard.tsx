"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Paragraph2 } from "@/components/Text";
import Button from "@/components/Button";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  product,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div className="max-w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={handleModalClose}
        />
      )}
      <div
        onClick={handleEditClick}
        className="bg-white relative hover:border-primary cursor-pointer border-2 rounded-lg"
      >
        <div className="p-1 pl-2 border flex w-[90%] justify-between  gap-4 rounded-lg z-10 absolute bottom-[4%] left-[4%]  bg-white bg-opacity-65">
          <Paragraph2 className=" font-bold whitespace-nowrap w-[40%] truncate overflow-hidden">
            {title}{" "}
          </Paragraph2>
          <Button
            text={`₦ ${new Intl.NumberFormat("en-US", {}).format(
              Number(price)
            )}`}
            additionalClasses=" border-0 whitespace-nowrap  "
          />{" "}
        </div>
        <div>
          {" "}
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-contain hover:scale-110 transition-transform duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
