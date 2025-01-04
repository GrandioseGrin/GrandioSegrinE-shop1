"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Header3, Paragraph1, ParagraphLink1, ParagraphLink2 } from "../Text";
import ProductCard from "./ProductCard";
import AOS from "aos";
import { db } from "@/lib/firebase"; // Firestore setup
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";

interface Product {
  id: string;
  name: string;
  currentPrice: number;
  isFeatured: boolean;
  createdAt: Date;
  productImageURL1: string;
  category: string;
  sub_category: string;
  selectedCategory: any;
  isTrending: any;
  isElite: boolean;
  isSpecial: boolean;
  isBudget: boolean;
}

interface Category {
  id: string;
  name: string;
  properties: Record<string, any>; // Store additional properties of the category
}

const PRODUCTS_PER_PAGE = 200; // Control the number of products loaded per page

function Overview() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCOpen, setIsCOpen] = useState(false);
  const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [lastDoc, setLastDoc] = useState<any>(null); // For Firestore pagination
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

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

    fetchCategories();
  }, []);

  // Fetch products with pagination
  const fetchProducts = useCallback(
    async (isInitialLoad = false) => {
      if (isLoadingMore) return; // Prevent overlapping requests
      setIsLoadingMore(true);

      try {
        const productsQuery = query(
          collection(db, "products"),
          ...(selectedCategory
            ? [where("category", "==", selectedCategory)]
            : []),
          orderBy("createdAt", "desc"),
          ...(lastDoc && !isInitialLoad ? [startAfter(lastDoc)] : []),
          limit(PRODUCTS_PER_PAGE)
        );

        const querySnapshot = await getDocs(productsQuery);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as Product[];

        setProducts((prev) =>
          isInitialLoad ? productsData : [...prev, ...productsData]
        );
        setDisplayedProducts((prev) =>
          isInitialLoad ? productsData : [...prev, ...productsData]
        );
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingMore(false);
      }
    },
    [selectedCategory, lastDoc, isLoadingMore]
  );

  // Initial product fetch
  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchProducts();
      }
    },
    [fetchProducts]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "100px", // Trigger slightly before hitting the bottom
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(products);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    let filteredProducts = products;

    // Filter by category
    if (selectedCategory) {
      setLoading(true);

      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category === selectedCategory ||
          product.sub_category === selectedCategory
      );
    }

    // Apply additional filters
    if (activeFilter === "Trending") {
      setLoading(true);

      filteredProducts = filteredProducts.filter(
        (product) => product.isTrending
      );
    } else if (activeFilter === "Single Products") {
      setLoading(true);

      filteredProducts = filteredProducts.filter((product) => product.isElite);
    } else if (activeFilter === "Special Products") {
      setLoading(true);

      filteredProducts = filteredProducts.filter(
        (product) => product.isSpecial
      );
    } else if (activeFilter === "Wholesale and Bulk Products") {
      setLoading(true);

      filteredProducts = filteredProducts.filter((product) => product.isBudget);
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
    // "Price: Low to High",
    // "Price: High to Low",
  ];

  const section = ["Elite Products", "Special Products", "Shop on Budget"];

  const sections = [
    {
      name: "All",
      BackgroundURL:
        "https://res.cloudinary.com/dcb4ilgmr/image/upload/v1736021991/utilities/images_2_ufuh7a.jpg",
      bgColor: "bg-black",
    },
    {
      name: "Single Products",
      BackgroundURL:
        "https://res.cloudinary.com/dtipo8fg3/image/upload/v1733537996/kitera-dent-brwX1UMmeEc-unsplash_didfn4.jpg",
      bgColor: "bg-secondary",
    },
    // {
    //   name: "Special Products",
    //   BackgroundURL:
    //     "https://res.cloudinary.com/dtipo8fg3/image/upload/v1733538005/hanna-postova-oha7AANDiL8-unsplash_g4ykyj.jpg",
    //   bgColor: "bg-primary",
    // },
    {
      name: "Wholesale and Bulk Products",
      BackgroundURL:
        "https://res.cloudinary.com/dtipo8fg3/image/upload/v1733538011/enecta-cannabis-extracts-80wCkpt-IKE-unsplash_o77f6s.jpg",
      bgColor: "bg-black",
    },
  ];

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <div className=" relative">
      {loading && (
        <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      <div className=" container1 min-h-screen  py-[24px] xl:py-[70px] pt-[70px] text-p_black">
        <div className=" grid grid-cols-1 xl:grid-cols-6 gap-4">
          <div className=" xl:flex hidden border-r">
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              closeMenu={() => setIsCOpen(false)} // Pass the close function
            />
          </div>

          <div className=" xl:col-span-5">
            <div
              className=" hidden -flex flex-col text-center gap-[8px] xl:gap-[24px] items-center w-full mb-[24px] xl:mb-[64px]"
              data-aos="fade-up"
            >
              <Header3>
                Where Your <span className="text-primary">Beauty</span> Shines
                Brightest
              </Header3>
              <Paragraph1 className="max-w-[883px] text-center">
                Each product is carefully crafted to celebrate your unique
                beauty, empowering you to express yourself with confidence,
                elegance, and radiance.
              </Paragraph1>
            </div>
            <div className=" mb-4 xl:hidden pt-2">
              <SearchBar />
            </div>
            <div className=" flex gap-2 w-full mb-2 whitespace-nowrap  overflow-x-auto scrollbar-hide  ">
              {sections.map((section, index) => (
                <div
                  key={index}
                  onClick={() => setActiveFilter(section.name)}
                  className={` relative flex cursor-pointer  justify-center min:w-[400px]- items-center py-2 px-4 xl:h-[80px] xl:px-[40px] xl: w-full  ${section.bgColor}- bg-black rounded-lg border`}
                >
                  <div
                    className="absolute inset-0 rounded-lg "
                    style={{
                      backgroundImage: `url(${section.BackgroundURL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.7, // Adjust this value as needed
                      zIndex: 0,
                    }}
                  ></div>
                  <div className="bg-black  bg-opacity-55 rounded-lg py-2 px-2 text-white relative z-10">
                    <ParagraphLink2 className=" font-bold">
                      {" "}
                      {section.name}
                    </ParagraphLink2>
                  </div>
                </div>
              ))}
            </div>

            <div className=" flex w-full justify-between items-center mb-4">
              <div className=" relative xl:hidden">
                <button
                  onClick={() => setIsCOpen(!isCOpen)}
                  className="  w-fit px-2 py-1 border rounded-lg "
                >
                  <ParagraphLink1 className="  ">Categories</ParagraphLink1>
                </button>

                <div
                  className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isCOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ width: "300px" }}
                >
                  <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    closeMenu={() => setIsCOpen(false)} // Pass the close function
                  />
                </div>
              </div>

              <div className="relative inline- ">
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
                  <div className="absolute right-0 xl:left-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
            {/* data-aos="fade-right" */}

            <div className="grid grid-cols-2 xl:grid-cols-5 sm:grid-cols-1 gap-2 xl:gap-4 [30px] ">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.productImageURL1}
                    title={product.name}
                    price={product.currentPrice}
                    product={product}
                  />
                ))
              ) : searchQuery ? (
                // Display this if no products match the search query
                <div className="col-span-full mt-6 text-center p-4">
                  <p className="text-gray-500 text-lg pb-4">
                    No products found for "
                    <span className="font-semibold">{searchQuery}</span>"
                  </p>
                  <Link
                    href="/products"
                    className=" text-primary font underline"
                  >
                    {" "}
                    Browse other products{" "}
                  </Link>
                </div>
              ) : (
                // Placeholder loading skeleton when no query is provided
                Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-[250px] w-full bg-gray-200 rounded-md animate-pulse"
                    ></div>
                  ))
              )}
            </div>
            {isLoadingMore && (
              <div className="flex items-center justify-center space-x-2 mt-6">
                <div className="w-6 h-6 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
              </div>
            )}
            <div className="observer scrollbar-hide" ref={observerRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
