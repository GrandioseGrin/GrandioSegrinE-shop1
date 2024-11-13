"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";
import {
  Header3,
  HeaderAny,
  Paragraph1,
  Paragraph2,
  ParagraphLink1,
  ParagraphLink2,
} from "./Text";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CartSummary from "./Cart/CartSummary";

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (pathname.includes("/admin")) {
    return null; // Return null to hide the navbar
  }

  return (
    <div
      className={
        ["/contact-us", "/privacy-policy", "/terms-of-service"].includes(
          pathname
        )
          ? "bg-bg_gray- bg-white py-[8px]- border-b border-secondary-  fixed flex w-full z-20 py-[8px] "
          : " bg-white py-[8px] fixed flex w-full border-b border-secondary- z-20"
      }
    >
      <div className="  w-full">
        <div className=" container1 flex justify-between font-semibold- w-full items-center">
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <Image
                height={2}
                width={25}
                src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
                alt="menu"
                className=""
              />
            </button>
          </div>
          <img src="/images/logo.png" alt="" className="h-[30px]" />
          {/* <div className=" relative">
            {" "}
            <div className=" border-2 border-primary rounded-full w-2 h-2 p- absolute top-1 -left-1 "></div>
            <HeaderAny className=" text-[24px]">GrandioseGrin</HeaderAny>{" "}
          </div> */}
          <div className="  gap-[48px] items-center hidden lg:flex">
            <Link href="/">
              <Paragraph1
                className={pathname === "/" ? "text-primary font-bold " : " "}
              >
                Home
              </Paragraph1>
            </Link>
            <Link href="/about-us">
              {" "}
              <Paragraph1
                className={
                  pathname === "/about-us" ? "text-primary font-bold " : "  "
                }
              >
                About
              </Paragraph1>
            </Link>
            <Link href="/products">
              {" "}
              <Paragraph1
                className={
                  pathname === "/products" ? "text-primary font-bold " : "  "
                }
              >
                Shop
              </Paragraph1>
            </Link>
            <Link href="/blog">
              {" "}
              <Paragraph1
                className={
                  pathname === "/blog" ? "text-primary font-bold " : "  "
                }
              >
                Blog
              </Paragraph1>
            </Link>
            <Link href="/contact-us">
              {" "}
              <Paragraph1
                className={
                  pathname === "/contact-us" ? "text-primary font-bold " : "  "
                }
              >
                Contact us
              </Paragraph1>
            </Link>

            <div className="flex justify-between items-center p-2 px-3   bg-bg_gray rounded-lg w-[400px]  cursor-pointer">
              <input
                type="text"
                placeholder="Search for product..."
                className="flex-grow outline-none bg-bg_gray text-gray-700"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>

          <div
            onClick={() => setCartOpen(true)}
            className=" border rounded-lg p-2 cursor-pointer flex relative "
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div className=" absolute -top-2 -right-4 bg-primary p-1 px-2 text-white text-[10px] rounded-full">
              0
            </div>
          </div>

          <CartSummary
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
            products={products}
            tax={2.5}
            shippingFee={5.0}
            setProducts={setProducts} // <-- Add this line
          />
        </div>

        {/* mobile dropdown */}
        {menuOpen && (
          <div className="p-[24px] flex flex-col justify-center items-center">
            <div className=" container1 flex flex-col w-full space-y-[24px] justify-between items-center">
              <Link href="/" onClick={toggleMenu}>
                <ParagraphLink1
                  className={pathname === "/" ? "text-primary font-bold " : " "}
                >
                  Home
                </ParagraphLink1>
              </Link>
              <Link href="/about-us" onClick={toggleMenu}>
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/about-us" ? "text-primary font-bold " : "  "
                  }
                >
                  About
                </ParagraphLink1>
              </Link>
              <Link href="/products" onClick={toggleMenu}>
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/products" ? "text-primary font-bold " : "  "
                  }
                >
                  Shop
                </ParagraphLink1>
              </Link>
              <Link href="/blog" onClick={toggleMenu}>
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/blog" ? "text-primary font-bold " : "  "
                  }
                >
                  Blog
                </ParagraphLink1>
              </Link>
              <Link href="/contact-us" onClick={toggleMenu}>
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/contact-us"
                      ? "text-primary font-bold "
                      : "  "
                  }
                >
                  Contact us
                </ParagraphLink1>
              </Link>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
