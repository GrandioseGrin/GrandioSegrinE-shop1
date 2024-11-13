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
              At Salford Studio, we value your trust and are committed to
              protecting your privacy. This policy outlines how we collect, use,
              and protect your personal information when you visit our website
              or engage with our services.
            </Paragraph3>
          </div>
          <div className="absolute sm:-bottom-[200px] -bottom-[60px] overflow-hidden flex w-full">
            <img
              className="min-w-full"
              src="/images/white_bgR.svg"
              alt="privacy"
            />
          </div>
        </div>

        <div className="py-4 sm:py-[50px] rounded-b-[24px] text-p_black z-[10] bg-white px-4 sm:px-[65px] space-y-[18px] sm:space-y-[32px]">
          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Information We Collect
            </ParagraphLink1>
            <Paragraph1>
              We may gather personal information to provide better services,
              including:
              <br />
              - Personal Details: Name, email, phone number, and relevant
              details shared through forms or bookings.
              <br />
              - Usage Data: Information such as IP address, browser type, and
              pages visited to enhance user experience.
              <br />- Cookies: We use cookies to improve website functionality
              and track performance. You can manage cookie preferences through
              your browser.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              How We Use Your Information
            </ParagraphLink1>
            <Paragraph1>
              The personal information collected helps us:
              <br />
              - Deliver Services: Manage inquiries, bookings, and consultations.
              <br />
              - Enhance Customer Experience: Improve our services based on your
              feedback and preferences.
              <br />- Communicate Updates: With your consent, send you updates
              about promotions or new services.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Safeguarding Your Data
            </ParagraphLink1>
            <Paragraph1>
              We take reasonable measures to protect your data from unauthorized
              access. While no system is entirely secure, we strive to use
              industry-standard practices to keep your information safe.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Sharing Your Information
            </ParagraphLink1>
            <Paragraph1>
              We do not sell or share your personal information, except:
              <br />
              - With Trusted Partners: We may work with third-party vendors to
              support website operations and services.
              <br />- For Legal Compliance: We may disclose data if required by
              law or to protect our legal rights.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Your Rights
            </ParagraphLink1>
            <Paragraph1>
              You have the right to:
              <br />
              - Access, correct, or delete your personal information.
              <br />
              - Opt-out of marketing communications at any time.
              <br />- Manage cookies through your browser settings.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Links to External Websites
            </ParagraphLink1>
            <Paragraph1>
              Our website may contain links to third-party sites. We are not
              responsible for their privacy practices and encourage you to
              review their policies.
            </Paragraph1>
          </div>

          <div>
            <ParagraphLink1 className="font-bold text-primary">
              Changes to Our Privacy Policy
            </ParagraphLink1>
            <Paragraph1>
              We may update this policy from time to time. Any changes will be
              posted here, with the updated effective date. Please review it
              periodically to stay informed.
            </Paragraph1>
          </div>
        </div>
        <Section6 />
      </div>
    </div>
  );
}

export default Overview;
