"use client"

import React from "react";
import { HeaderAny, Paragraph1, ParagraphLink1, ParagraphLink2 } from "./Text";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Footer() {
  const pathname = usePathname();
  
  if (pathname.includes("/admin")) {
    return null; // Return null to hide the navbar
  }


  return (
    <div
      className={
        ["/contact-us", "/privacy-policy", "/terms-of-service"].includes(
          pathname
        )
          ? "bg-bg_gray sm:py-[100px]-"
          : " bg-white sm:py-[100px]-"
      }
    >
      <div className="  bg-[#4A4A4A]  ">
        <div className=" container1 py-[32px] sm:py-[80px] ">
          {/* desktop */}
          <div className="sm:flex hidden items-center justify-between mb-[60px]">
            <div className="w-[200px] relative">
              <img src="/images/logo2.png" alt="photographer" />
            </div>
            <div className=" flex gap-[48px]">
              <Link href="/">
                <ParagraphLink1
                  className={
                    pathname === "/"
                      ? "text-[#ECECEC] font-bold "
                      : " text-[#ECECEC] "
                  }
                >
                  Home
                </ParagraphLink1>
              </Link>{" "}
              <Link href="/about-us">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/about-us"
                      ? "text-[#ECECEC] font-bold "
                      : " text-[#ECECEC] "
                  }
                >
                  About
                </ParagraphLink1>
              </Link>
              <Link href="/products">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/products"
                      ? "text-[#ECECEC] font-bold "
                      : " text-[#ECECEC] "
                  }
                >
                  Shop
                </ParagraphLink1>
              </Link>
              <Link href="/blogs">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/blogs"
                      ? "text-[#ECECEC] font-bold "
                      : " text-[#ECECEC] "
                  }
                >
                  Blog
                </ParagraphLink1>
              </Link>
              <Link href="/contact-us">
                {" "}
                <ParagraphLink1
                  className={
                    pathname === "/contact-us"
                      ? "text-[#ECECEC] font-bold "
                      : " text-[#ECECEC] "
                  }
                >
                  Contact us
                </ParagraphLink1>
              </Link>
            </div>
            <div className=" flex flex-col py-4 gap-4 items-center- justify-center-">
              <div className=" flex gap-4 items-center">
                <Link href="/">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676533/utilities/templates/instagram_2_ujmgac.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676725/utilities/templates/facebook-app-symbol_x2whit.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729675779/utilities/templates/twitter_3_sihd1i.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className=" sm:flex justify-center items-center hidden py-4">
            <div className=" py-2 px-4 rounded-lg bg-white flex justify-center items-center gap-2 flex-col">
              <p className=" text-[12px] pb-2 ">
                {" "}
                Payments secuered by{" "}
                <span className=" font-bold">Flutterwave</span>{" "}
              </p>
              <div className=" flex gap-4 flex-col- items-center">
                {" "}
                <img
                  src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732661439/image-removebg-preview_6_sygmis.png"
                  alt=""
                  className=" w-[30px] h-[30px]"
                />{" "}
                <img
                  src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732660748/image-removebg-preview_5_doqrew.png"
                  alt=""
                  className=" w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* mobile  */}
          <div className=" mb-[24px] sm:hidden sm:mb-[110px]">
            <div className=" space-y-[24px] mb-[24px] ">
              {" "}
              <Link href="/">
                {" "}
                <ParagraphLink1 className=" text-[#ECECEC]  ">
                  Home{" "}
                </ParagraphLink1>
              </Link>
              <Link href="/about-us">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC]  ">
                  About{" "}
                </ParagraphLink2>
              </Link>
              <Link href="/products">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC] ">
                  Shop
                </ParagraphLink2>
              </Link>
              <Link href="/blogs">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC] ">
                  Blog
                </ParagraphLink2>
              </Link>
              <Link href="/contact-us">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC] ">
                  Contact us
                </ParagraphLink2>
              </Link>
              <div className=" flex flex-col p-4- gap-4 items-center- justify-center-">
                <div className=" flex gap-4 items-center">
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676533/utilities/templates/instagram_2_ujmgac.png"
                      alt="instagram"
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729676725/utilities/templates/facebook-app-symbol_x2whit.png"
                      alt="facebook"
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                  <Link href="/">
                    <img
                      src="https://res.cloudinary.com/dcb4ilgmr/image/upload/v1729675779/utilities/templates/twitter_3_sihd1i.png"
                      alt=""
                      className="w-[14px] h-[14px]"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-1 order-2 sm:order-1">
              {" "}
              <img
                src="/images/logo2.png"
                alt="photographer"
                className=" "
              />{" "}
            </div>
          </div>

          <div className=" border-t pt-[24px] sm:pt-[32px] flex flex-wrap justify-between">
            <div className=" flex justify-center items-center sm:hidden py-4">
              <div className=" py-2 px-4 rounded-lg bg-white flex justify-center items-center gap-2 flex-col">
                <p className=" text-[12px] pb-2 ">
                  {" "}
                  Payments secuered by{" "}
                  <span className=" font-bold">Flutterwave</span>{" "}
                </p>
                <div className=" flex gap-4 flex-col- items-center">
                  {" "}
                  <img
                    src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732661439/image-removebg-preview_6_sygmis.png"
                    alt=""
                    className=" w-[20px] h-[20px]"
                  />{" "}
                  <img
                    src="https://res.cloudinary.com/dtipo8fg3/image/upload/v1732660748/image-removebg-preview_5_doqrew.png"
                    alt=""
                    className=" w-[150px]"
                  />
                </div>
              </div>
            </div>
            <ParagraphLink2 className=" text-[14px] text-[#ECECEC] ">
              © 2024 GrandioseGrin Ltd. All rights reserved.
            </ParagraphLink2>
            <div className="flex flex-wrap gap-[24px] items-center">
              <Link href="/privacy-policy" className="">
                {" "}
                <ParagraphLink2 className=" text-[14px] text-[#ECECEC] underline ">
                  Privacy Policy
                </ParagraphLink2>
              </Link>

              <Link href="/terms-of-service">
                <ParagraphLink2 className=" text-[14px] text-[#ECECEC] underline">
                  Terms of Service{" "}
                </ParagraphLink2>
              </Link>

              {/* <Link href="/">
                {" "}
                <ParagraphLink2 className=" text-[#ECECEC] underline">
                  Cookies Settings{" "}
                </ParagraphLink2>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
