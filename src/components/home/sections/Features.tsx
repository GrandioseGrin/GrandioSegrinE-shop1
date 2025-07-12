import { Header4, Paragraph2 } from "@/components/Text";
import React from "react";
import AOS from "aos";

function Features() {
  const features = [
    {
      title: "All-in-One Shopping",
      description:
        "From groceries and fast food to electronics, cosmetics, and tools—find everything you need in one place.",
      icon: "https://your-cdn-link.com/icons/all-in-one.png", // Replace with your actual image
    },
    {
      title: "Fast, Reliable Delivery",
      description:
        "We deliver quickly and reliably, so busy working-class customers can get what they need without the wait.",
      icon: "https://your-cdn-link.com/icons/fast-delivery.png", // Replace with your actual image
    },
    {
      title: "Great Prices & Deals",
      description:
        "Enjoy competitive prices and regular promotions that help you save on everyday essentials.",
      icon: "https://your-cdn-link.com/icons/best-deals.png", // Replace with your actual image
    },
    {
      title: "Secure, Easy Payment",
      description:
        "Shop confidently with safe, encrypted payment options designed for convenience and peace of mind.",
      icon: "https://your-cdn-link.com/icons/secure-payment.png", // Replace with your actual image
    },
  ];
  

    React.useEffect(() => {
      AOS.init({
        duration: 1000,
      });
    });

  return (
    <div className="container1 py-[50px] text-p_black">
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-[24px] sm:gap-[36px] items-start">
        {features.map((feature, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className="flex flex-col gap-4 justify-center text-center pb-4 "
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto"
            />
            <Header4 className="text-lg font-semibold">{feature.title}</Header4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
