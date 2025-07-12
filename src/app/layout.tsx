import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "aos/dist/aos.css";
import Head from "next/head"; // Import Head for adding custom scripts
import NetworkStatusChecker from "./NetworkStatusChecker";
import { Toaster } from "react-hot-toast"; // Import Toaster

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "9to5 Mart - Everything You Need, Delivered Fast",
  description:
    "Shop a huge range of essentials at 9to5 Mart. From groceries and fast food to electronics, cosmetics, and tools—get everything you need in one place, delivered quickly for busy working-class customers.",
  generator:
    "9to5 Mart, online shopping, groceries, fast food, electronics, cosmetics, tools, retail, e-commerce",
  keywords: [
    "online shopping",
    "groceries",
    "fast food delivery",
    "electronics",
    "cosmetics",
    "tools",
    "household essentials",
    "one-stop shop",
    "working class",
    "9to5 Mart",
  ],
  applicationName: "9to5 Mart",
  openGraph: {
    title: "9to5 Mart - Everything You Need, Delivered Fast",
    description:
      "9to5 Mart makes shopping easier for busy people. Get fast food, groceries, cosmetics, electronics, tools, and more—all in one place, delivered to your door.",
    url: "https://www.9to5mart.com",
    siteName: "9to5 Mart",
    images: [
      {
        url: "https://your-cdn-or-image-link.com/og-image-9to5mart.jpg",
        width: 1200,
        height: 630,
        alt: "9to5 Mart - Online shopping for everything you need",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@9to5mart",
    title: "9to5 Mart - Everything You Need, Delivered Fast",
    description:
      "From groceries to gadgets, 9to5 Mart delivers it all for busy working-class shoppers.",
    images: "https://your-cdn-or-image-link.com/twitter-image-9to5mart.jpg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Add Cloudinary widget script */}
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
          async
        ></script>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F2YRYGXF65"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F2YRYGXF65');
            `,
          }}
        />
      </Head>
      <body className=" bg-[#f1efe8]-">
        <Toaster />
        <NetworkStatusChecker />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
