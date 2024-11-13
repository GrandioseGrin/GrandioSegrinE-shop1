"use client"

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
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
}) => {

   const [product, setProduct] = useState({
     title: "Product Title",
     price: "$49.99",
     description:
       "Introducing an exceptional product crafted with precision and designed to meet your every need...",
     images: [
       "/images/testProduct.jpg",
       "https://via.placeholder.com/501",
       "https://via.placeholder.com/502",
       "https://via.placeholder.com/503",
     ],
   });
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleEditClick = () => {
     setIsModalOpen(true);
   };

   const handleModalClose = () => {
     setIsModalOpen(false);
   };

   const handleSaveProduct = (updatedProduct: typeof product) => {
     setProduct(updatedProduct);
     setIsModalOpen(false);
   };

  return (
    <div className="max-w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={handleModalClose}
          onSave={handleSaveProduct}
        />
      )}
      <div
        onClick={handleEditClick}
        className="bg-white relative hover:border-primary cursor-pointer border-2 rounded-lg"
      >
        <div className="p-1 pl-2 border flex gap-4 rounded-lg z-10 absolute bottom-[2%] left-[2%] bg-white bg-opacity-65">
          <Paragraph2 className=" font-bold"> {title} </Paragraph2>
          <Button
            text={`$${price.toFixed(2)}`}
            additionalClasses=" border-0   "
          />{" "}
        </div>
        <div >
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
