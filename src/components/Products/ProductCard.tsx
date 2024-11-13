import React from "react";
import { Paragraph2 } from "../Text";
import Button from "../Button";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  onAddToCart,
}) => {
  return (
    <div className="max-w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white relative hover:border-primary border-2 rounded-lg">
        <div className="p-1 pl-2 border flex gap-4 rounded-lg z-10 absolute bottom-[2%] left-[2%] bg-white bg-opacity-65">
          <Paragraph2 className=" font-bold whitespace-nowrap w-[50%] truncate overflow-hidden">
            {" "}
            {title}{" "}
          </Paragraph2>
          <Button
            text={`$${price.toFixed(2)}`}
            href="/contact-us"
            isLink={true}
            additionalClasses=" border-0   "
          />{" "}
        </div>
        <Link href="/products/test">
          {" "}
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-contain hover:scale-110 transition-transform duration-300 "
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
