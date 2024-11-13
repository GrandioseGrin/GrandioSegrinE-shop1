import React from "react";
import { Paragraph1, ParagraphLink2 } from "../Text";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type ProductCartCardProps = {
  product: Product;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, delta: number) => void;
};

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  product,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className="flex relative justify-between items-start bg-white p-2 px-3 rounded-lg">
      <div className="flex gap-2 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <ParagraphLink2 className="font-bold">{product.title}</ParagraphLink2>
          <div className="flex gap-2 items-center justify-between">
            <Paragraph1 className="text-gray-500">Qt:</Paragraph1>
            <div className="flex gap-4 items-center justify-between border rounded-lg px-4">
              <button
                onClick={() => onQuantityChange(product.id, -1)}
                className="text-gray-500"
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() => onQuantityChange(product.id, 1)}
                className="text-gray-500"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Paragraph1 className="font-bold">
          ${(product.price * product.quantity).toFixed(2)}
        </Paragraph1>
        <button
          onClick={() => onRemove(product.id)}
          className="absolute right-4 bottom-4 text-[12px] text-gray-500"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default ProductCartCard;
