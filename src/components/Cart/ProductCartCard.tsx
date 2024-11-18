import React from "react";
import { Paragraph1, ParagraphLink2 } from "../Text";


type ProductCartCardProps = {
  product: any;
  onRemove: any;
  onQuantityChange: any;
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
          src={product.productImageURL1}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <ParagraphLink2 className="font-bold">{product.name}</ParagraphLink2>
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
          {`₦ ${new Intl.NumberFormat("en-US").format(
            Number(product.currentPrice * product.quantity)
          )}`}
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
