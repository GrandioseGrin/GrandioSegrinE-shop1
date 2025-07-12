"use client";

import Button from "@/components/Button";
import { Header3, Header4, Header5, Paragraph1 } from "@/components/Text";
import Link from "next/link";
import React, { useState } from "react";
import AOS from "aos";


function Section5() {
  const [openedQuestionIndex, setOpenedQuestionIndex] = useState(null);

  const toggleParagraphVisibility = (index: any) => {
    setOpenedQuestionIndex(openedQuestionIndex === index ? null : index);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  // Array of FAQ items
  const faqs = [
    {
      id: 1,
      question: "Q. What types of products does 9to5 Mart sell?",
      answer:
        "9to5 Mart offers a wide variety of products, including groceries, fast food, cosmetics, tools, electronics, and household essentials. We’re your one-stop shop for everyday needs.",
    },
    {
      id: 2,
      question: "Q. How do I place an order?",
      answer:
        "Placing an order is easy! Browse our categories, add items to your cart, and complete checkout in just a few steps. Our secure payment options make shopping safe and convenient.",
    },
    {
      id: 3,
      question: "Q. How long will delivery take?",
      answer:
        "We process and ship most orders within 1-2 business days. Delivery times depend on your location, and you'll receive a tracking link as soon as your order ships.",
    },
    {
      id: 4,
      question: "Q. Can I return or exchange items?",
      answer:
        "Yes! We offer an easy return and exchange policy. If something isn’t right, contact us within 30 days to start a return or exchange. We’re here to help.",
    },
    {
      id: 5,
      question: "Q. Is it safe to shop on 9to5 Mart?",
      answer:
        "Absolutely. Your security is our priority. We use secure payment gateways and encryption to protect your personal and payment information.",
    },
    {
      id: 6,
      question: "Q. Do you offer any special deals or discounts?",
      answer:
        "Yes! We regularly feature special offers, discounts, and bundles. Subscribe to our newsletter or check our homepage to stay updated on the latest deals.",
    },
  ];
  

  return (
    <div>
      <div className=" container1 py-[54px] xl:p5-[100px] text-p_black">
        {" "}
        <div
          className=" flex flex-col xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
          data-aos="fade-up"
        >
          <Header3>
            Frequently Asked <span className=" text-primary">Questions</span>{" "}
          </Header3>
          <Paragraph1 className=" max-w-[883px] text-center ">
            Find answers to all your questions about our skincare and beauty
            products, ordering, and more.
          </Paragraph1>
        </div>
        <div
          className="flex-row items-center justify-center py-4 xl:py-[37px] bg-bg_gray rounded-lg "
          data-aos="flip-up"
        >
          {/* Mapping over FAQ items */}
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`w-full px-4 xl:px-[37px] pt-4 xl:py-[21px] ${
                index !== faqs.length - 1
                  ? "border-b-4 border-[#E4E4E7]"
                  : "xl:-mb-6"
              }`}
            >
              <div
                className="flex items-start   justify-between cursor-pointer"
                onClick={() => toggleParagraphVisibility(faq.id)}
              >
                <Header5 className="text-[18px] w-[250px] xl:w-full font-medium text-primary-50">
                  {faq.question}
                </Header5>
                <button
                  className=" flex justify-center items-center h-4 w-4  cursor-pointer"
                  onClick={() => toggleParagraphVisibility(faq.id)}
                >
                  <img
                    src={
                      openedQuestionIndex === faq.id
                        ? "/icons/dash.svg"
                        : "/icons/plus.svg"
                    }
                    alt=""
                    className=""
                    style={{
                      transform:
                        openedQuestionIndex === faq.id
                          ? "rotate(0deg)" // Keep it static or adjust if necessary
                          : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>
              </div>
              <p
                className={`text-[12px] xl:text-[14px]- md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[18px]  overflow-hidden  transition-all pb-4 pt-4 max-w-[90%] duration-300 ${
                  openedQuestionIndex === faq.id ? "max-h-[500px]" : "max-h-0"
                }`}
                style={{ opacity: openedQuestionIndex === faq.id ? "1" : "0" }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section5;
