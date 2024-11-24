"use client";

import React, { useState, useEffect } from "react";
import { Header3, Header4, Header5, ParagraphLink1 } from "@/components/Text";
import ProductCard from "./ProductCard";
import AddMore from "./AddMore";
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

interface Category {
  id: string;
  name: string;
  properties: Record<string, any>; // Store additional properties of the category
}

function ProductSections() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

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
        setDisplayedProducts(productsData); // Default: show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = products;

    // Filter by category
    if (selectedCategory) {
      setLoading(true);

      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply additional filters
    if (activeFilter === "Trending") {
      setLoading(true);

      filteredProducts = filteredProducts.filter(
        (product) => product.isTrending
      );
    } else if (activeFilter === "Latest") {
      setLoading(true);

      filteredProducts = filteredProducts.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } else if (activeFilter === "Price: Low to High") {
      setLoading(true);

      filteredProducts = filteredProducts.sort(
        (a, b) => a.currentPrice - b.currentPrice
      );
    } else if (activeFilter === "Price: High to Low") {
      setLoading(true);

      filteredProducts = filteredProducts.sort(
        (a, b) => b.currentPrice - a.currentPrice
      );
    } else if (activeFilter === "All") {
      setLoading(true);

      filteredProducts = filteredProducts;
    }

    setDisplayedProducts(filteredProducts);
    setLoading(false);
  }, [selectedCategory, activeFilter, products]);

  const filters = [
    "All",
    "Trending",
    "Latest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  if (loading)
    return (
      <div className=" fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div>
      <div className="container1  pt-[100px]  xl:pt-[104px] pb-[24px] ">
        <AddMore />
        <div className=" pb-[24px]">
          <div>
            <Header4>Featured Products</Header4>
          </div>
          <div className=" grid grid-cols-1 xl:grid-cols-4  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">

            {featuredProducts && featuredProducts.length > 0
              ? featuredProducts
                  .slice(0, 4)
                  .map((product: any) => (
                    <ProductCard
                      key={product.id}
                      image={product.productImageURL1}
                      title={product.name}
                      description="A brief description of the product."
                      price={product.currentPrice}
                      product={product}
                    />
                  ))
              : Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-[300px] w-full bg-white rounded-md animate-pulse"
                    ></div>
                  ))}
          </div>
        </div>
        <div className=" py-[24px]">
          <div>
            <Header4>All Products</Header4>
          </div>
          <div className=" flex justify-between items-center- my-4">
            {/* categorey filter buttons */}
            <div className=" flex w-full gap-4 md:w-[90%] overflow-hidden overflow-x-auto scrollbar-hide   ">
              <button
                className={`flex gap-4  w-fit justify-center items-center rounded-lg px-4 border ${
                  !selectedCategory
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                {" "}
                <ParagraphLink1 className="max-w-[883px] text-center">
                  All{" "}
                </ParagraphLink1>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex gap-4 w-fit justify-center items-center rounded-lg px-4 border ${
                    selectedCategory === category.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <ParagraphLink1 className="max-w-[883px] text-center">
                    {category.name}
                  </ParagraphLink1>
                </button>
              ))}
            </div>
            <div className="relative inline-">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className=" flex gap-4 bg-white w-fit cursor-pointe rounded-lg p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {filters.map((filter) => (
                      <div
                        key={filter}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" grid grid-cols-1 xl:grid-cols-4  sm:grid-cols-1 gap-[24px] xl:gap-[30px]">
            {/* all products */}
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.productImageURL1}
                title={product.name}
                description="A brief description of the product."
                price={product.currentPrice}
                product={product}
              />
            ))}
          </div>
          <div className=" pb-[400px]"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSections;
