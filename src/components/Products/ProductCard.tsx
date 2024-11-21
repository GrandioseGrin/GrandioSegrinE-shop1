import React from "react";
import { Paragraph2 } from "../Text";
import Button from "../Button";
import Link from "next/link";
import useCartStore from "../../stores/cartStore";
import AOS from "aos";


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
        <div className="p-1 pl-2 border flex w-[90%] justify-between items-center  gap-4 rounded-lg z-10 absolute bottom-[4%] left-[4%]  bg-white bg-opacity-65">
          <Paragraph2 className=" font-bold whitespace-nowrap w-[50%] truncate overflow-hidden">
            {" "}
            {title}{" "}
          </Paragraph2>
          <Button
            text={`₦ ${new Intl.NumberFormat("en-US", {}).format(
              Number(price)
            )}`}
            onClick={handleAddToCart}
            additionalClasses=" border-0 whitespace-nowrap "
          />{" "}
        </div>
        <Link href={`/products/${productID}`}>
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
