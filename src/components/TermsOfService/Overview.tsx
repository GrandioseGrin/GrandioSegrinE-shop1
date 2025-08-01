"use client";

import React from "react";
import { Header1Plus, Paragraph1, Paragraph3, ParagraphLink1 } from "../Text";
import Section6 from "../home/sections/Section6";
import AOS from "aos";

function Overview() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div className="pt-[10px] bg-bg_gray">
      <div data-aos="flip-right" className="container1">
        <div className="relative overflow-hidden">
          <div className="flex flex-col bg-primary sm:gap-[20px] px-4 sm:p-[65px] py-12 sm:py- rounded-t-[24px] w-full sm:text-center text-white">
            <Header1Plus>Terms and Conditions</Header1Plus>
            <Paragraph3>
              Welcome to 9to5 Mart! By using our website and services, you agree
              to the following terms and conditions. Please review them
              carefully to ensure a smooth and secure shopping experience.
            </Paragraph3>
          </div>
          <div className="absolute sm:-bottom-[200px] -bottom-[60px] overflow-hidden flex w-full">
            <img
              className="min-w-full"
              src="/images/white_bgR.svg"
              alt="terms and conditions"
            />
          </div>
        </div>

        <div className="py-4 sm:py-[50px] rounded-b-[24px] text-p_black z-[10] bg-white px-4 sm:px-[65px] space-y-[18px] sm:space-y-[32px]">
          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Use of Website
            </ParagraphLink1>
            <Paragraph1>
              By accessing 9to5 Mart, you agree to use our platform for lawful
              purposes only. Any misuse, such as attempting to disrupt services
              or harm users, is strictly prohibited.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Account Responsibility
            </ParagraphLink1>
            <Paragraph1>
              Users are responsible for maintaining the confidentiality of their
              account details, including passwords. Please notify us immediately
              if you suspect unauthorized access or any security breach.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Orders and Payments
            </ParagraphLink1>
            <Paragraph1>
              - Order Confirmation: Orders placed on 9to5 Mart are subject to
              availability. We reserve the right to cancel orders for any
              reason, including errors in pricing or stock levels.
              <br />- Payment: All payments must be completed at checkout. We
              accept credit/debit cards, digital wallets, and other secure
              payment options listed on our site.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Shipping and Delivery
            </ParagraphLink1>
            <Paragraph1>
              We aim to deliver your orders promptly and reliably. Delivery
              times and costs may vary by location and will be displayed at
              checkout. While we strive to meet delivery estimates, delays may
              occur due to unforeseen circumstances.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Returns and Refunds
            </ParagraphLink1>
            <Paragraph1>
              - Eligibility: Returns are accepted for most unused and unopened
              items within 30 days of delivery.
              <br />
              - Refunds: Approved returns will be refunded to the original
              payment method. Shipping fees are non-refundable.
              <br />- Exclusions: Perishable goods, customized orders, and
              certain hygiene products may not be eligible for return. See our
              Returns Policy for full details.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Intellectual Property
            </ParagraphLink1>
            <Paragraph1>
              All content on 9to5 Mart, including text, images, logos, and
              branding, is owned by us or our licensors. Unauthorized use or
              reproduction is prohibited.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Limitation of Liability
            </ParagraphLink1>
            <Paragraph1>
              9to5 Mart is not liable for any indirect, incidental, or
              consequential damages arising from the use of our website or
              products, to the maximum extent permitted by law.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Changes to Terms
            </ParagraphLink1>
            <Paragraph1>
              We may update these terms periodically. Continued use of our
              website implies acceptance of any changes. We recommend reviewing
              these terms regularly for updates.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Contact Us
            </ParagraphLink1>
            <Paragraph1>
              If you have any questions about our terms and conditions, please
              reach out to our support team via email or the contact form on our
              website.
            </Paragraph1>
          </div>
        </div>
        <Section6 />
      </div>
    </div>
  );
}

export default Overview;
