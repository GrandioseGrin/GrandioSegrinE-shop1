"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section6 from "./sections/Section6";
import { db } from "@/lib/firebase"; // Firestore setup
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  isFeatured: boolean;
  createdAt: Date;
  productImageURL1: string;
  category: string;
  selectedCategory: any;
  isTrending: any;
}

function Overview() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Convert Firestore Timestamp to Date
          };
        }) as Product[];

        setProducts(productsData);

        // Featured products
        setFeaturedProducts(
          productsData.filter((product) => product.isFeatured)
        );

        // Latest products
        setLatestProducts(
          productsData.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )
        );

        setDisplayedProducts(productsData); // Default: show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <HeroSection />
      <Section2 featuredProducts={featuredProducts} />
      <Section3 latestProducts={latestProducts} />
      <Section6 />
    </div>
  );
}

export default Overview;
