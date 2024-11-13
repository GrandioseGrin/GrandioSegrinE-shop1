"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Paragraph2 } from "@/components/Text";
import Button from "@/components/Button";
import BlogModal from "./BlogModal";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  price,
  description,
}) => {
  const [product, setProduct] = useState({
    title: "Product Title",
    price: "$49.99",
    description:
      "Introducing an exceptional product crafted with precision and designed to meet your every need...",
    image: "/images/testProduct.jpg",
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
        <BlogModal
          product={product}
          onClose={handleModalClose}
          onSave={handleSaveProduct}
        />
      )}
      <div
        onClick={handleEditClick}
        className="bg-white relative hover:border-primary cursor-pointer border-2 rounded-lg"
      >
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
