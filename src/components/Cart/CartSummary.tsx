import React from "react";
import { Header3, Header4, Paragraph1, ParagraphLink1, ParagraphLink2 } from "../Text";
import Link from "next/link";
import ProductCartCard from "./ProductCartCard";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type CartSummaryProps = {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  tax: number;
  shippingFee: number;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const CartSummary: React.FC<CartSummaryProps> = ({
  isOpen,
  onClose,
  products,
  tax,
  shippingFee,
  setProducts,
}) => {
  // Calculate subtotal and total
  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
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

  return (
    <div
      className={`fixed top-0 z-20 border right-0 h-full text-p_black w-[400px] bg-bg_gray shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Header4 className="text-lg font-semibold">Cart</Header4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 border px-2 py-1 rounded-lg"
        >
          &#x2715;
        </button>
      </div>

      {/* Product List */}
      <div className="p-4 space-y-4 overflow-y-auto h-[300px] scrollbar-hide">
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
      <div className="p-4 border-t space-y-2">
        <div className="flex- hidden justify-between">
          <Paragraph1>Taxes:</Paragraph1>
          <Paragraph1>${tax.toFixed(2)}</Paragraph1>
        </div>
        <div className="flex justify-between">
          <Paragraph1>Shipping:</Paragraph1>
          <Paragraph1 className="text-gray-500">
            Calculated at checkout
          </Paragraph1>
        </div>
        <div className="flex justify-between font-semibold">
          <ParagraphLink1>Total:</ParagraphLink1>
          <ParagraphLink1>${total.toFixed(2)}</ParagraphLink1>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-4">
        <Link
          onClick={onClose}
          href="/products/checkout"
          className="w-full flex justify-center py-2 bg-primary text-white font-semibold rounded-lg hover:bg-black transition"
        >
          <ParagraphLink1>Proceed to Checkout</ParagraphLink1>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
