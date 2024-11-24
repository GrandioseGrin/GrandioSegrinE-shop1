import React from "react";
import { Paragraph2, ParagraphLink2 } from "../Text";
import Button from "../Button";
import Link from "next/link";
import useCartStore from "../../stores/cartStore";
import AOS from "aos";
import { useExchangeRateStore } from "@/stores/exchangeRateStore";

interface ProductCardProps {
  image: string;
  title: string;
  price: any;
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  product,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const productID = product.id;
  const { selectedCurrency, exchangeRate } = useExchangeRateStore();

  const displayPrice =
    selectedCurrency === "USD" && exchangeRate > 0
      ? price / exchangeRate // Convert to USD
      : price; // Default to NGN

  const currencySymbol = selectedCurrency === "USD" ? "$" : "₦";

  const formattedPrice =
    selectedCurrency === "USD"
      ? displayPrice.toFixed(2) // Format for USD with 2 decimal places
      : displayPrice; // Format for NGN (comma-separated)

  const handleAddToCart = () => {
    addToCart(productID); // Just pass the ID
    // @ts-ignore
    toggleCart(true); // Ensure the cart is open
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div
      data-aos="fade-up"
      className="max-w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="bg-white relative hover:border-primary overflow-hidden border-2 rounded-lg ">
        <Link href={`/products/${productID}`}>
          {" "}
          <img
            src={image.replace("/upload/", "/upload/w_500,f_auto/")}
            alt={title}
            className="w-full h-[150px] object-contain hover:scale-110 transition-transform duration-300 "
          />
        </Link>
        <div className=" flex flex-col justify-center border-t  items-center  p-2 ga rounded-lg  bg-white bg-opacity-65">
          <p className=" font-medium text-center  whitespace-nowrap w-[100%] truncate overflow-hidden">
            {" "}
            {title}{" "}
          </p>
          <Paragraph2>{`${currencySymbol} ${new Intl.NumberFormat(
            "en-US",
            {}
          ).format(Number(formattedPrice))}`}</Paragraph2>
          {product.availableAmount === 0 ? (
            <div className="py-2 flex px-2 justify-center sm:hidden items-center rounded-lg bg-black text-white text-center">
              Null
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="whitespace-nowrap flex justify-center py-1 bg-primary hover:bg-black rounded-lg w-full  text-white "
            >
              <ParagraphLink2>Add to chat</ParagraphLink2>
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
