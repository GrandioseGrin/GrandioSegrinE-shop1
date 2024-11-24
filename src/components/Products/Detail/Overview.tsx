"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { Header4, Header5, ParagraphLink1 } from "@/components/Text";
import Button from "@/components/Button";
import Section6 from "@/components/home/sections/Section6";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import useCartStore from "@/stores/cartStore";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  currentPrice: string;
  oldPrice?: string;
  availableAmount: any;
  productImageURL1?: string;
  productImageURL2?: string;
  productImageURL3?: string;
  productImageURL4?: string;
  productImageURL5?: string;
  productImages: any;
}

const ProductDetail = () => {
  const { productID } = useParams() as { productID: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    if (!productID) return;

    const fetchProductAndRelated = async () => {
      try {
        // Fetch main product
        const productRef = doc(db, "products", productID);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data() as Product;

          // Dynamically construct images array
          const productImages = [
            productData.productImageURL1,
            productData.productImageURL2,
            productData.productImageURL3,
            productData.productImageURL4,
            productData.productImageURL5,
          ].filter((url) => url !== undefined); // Filter out undefined values

          setProduct({ ...productData, productImages });
          setSelectedImage(productImages[0] || null); // Set the first image as selected by default

          // Fetch related products
          const relatedQuery = query(collection(db, "products"));
          const relatedSnap = await getDocs(relatedQuery);
          const related: Product[] = [];
          relatedSnap.forEach((doc) => {
            const data = doc.data() as Omit<Product, "id">; // Exclude 'id'
            related.push({ id: doc.id, ...data });
          });

          setRelatedProducts(related);
        } else {
          console.error("No product found with this ID");
        }
      } catch (error) {
        console.error("Error fetching product or related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [productID]);

  const shuffledProducts = [...relatedProducts].sort(() => 0.5 - Math.random());
  const randomProducts = shuffledProducts.slice(0, 4);

  const handleAddToCart = () => {
    addToCart(productID); // Just pass the ID
    // @ts-ignore
    toggleCart(true); // Ensure the cart is open
  };

  if (loading)
    return (
      <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 ">
        <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <div className="container mx-auto px-4 py-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 bg-white p-2 py-4 sm:p-8 rounded-lg">
          {/* Right section - Product Images */}
          <div className="sm:col-span-3">
            <div className="w-full sm:h-[500px] rounded-lg mb-4 flex items-center justify-center">
              <img
                src={selectedImage!.replace(
                  "/upload/",
                  "/upload/w_1000,f_auto/"
                )}
                alt="Selected Product"
                className="max-h-full w-full rounded-lg object-contain"
              />
            </div>
            <div className="flex gap-2 w-full overflow-hidden overflow-x-auto scrollbar-hide p-1">
              {product.productImages?.map((image: any, index: any) => (
                <img
                  key={index}
                  src={image.replace("/upload/", "/upload/w_500,f_auto/")}
                  alt={`Product thumbnail ${index + 1}`}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Left section - Product Details */}
          <div className="sm:col-span-2">
            <Header4>{product.name}</Header4>
            <div className="flex items-center  gap-4 py-2">
              <Header5>
                {`₦ ${new Intl.NumberFormat("en-US").format(
                  Number(product.currentPrice)
                )}`}
              </Header5>
              {product.oldPrice && (
                <p className="text-[12px] text-gray-700  sm:mb-0 line-through">
                  {`₦ ${new Intl.NumberFormat("en-US").format(
                    Number(product.oldPrice)
                  )}`}
                </p>
              )}
            </div>
            {product.availableAmount === 0 ? (
              <div className="py-2 flex w-full justify-center sm:hidden items-center rounded-lg bg-black text-white text-center">
                Out of Stock
              </div>
            ) : (
              <Button
                text="Add to Cart"
                onClick={handleAddToCart}
                additionalClasses="border-white bg-black w-full flex justify-center sm:hidden"
              />
            )}
            <hr className="mb-6" />

            <div className=" flex gap-2 mb-4 text-gray-600 text-[12px]">
              <p>Available Quantity:</p> <p>{product.availableAmount}</p>
            </div>
            <ParagraphLink1 className="font-medium">Description</ParagraphLink1>

            <p className="text-gray-600 mb-6 text-justify">
              {product.description}
            </p>
            {product.availableAmount === 0 ? (
              <div className="py-2 flex w-full justify-center items-center rounded-lg bg-black text-white text-center">
                Out of Stock
              </div>
            ) : (
              <Button
                text="Add to Cart"
                onClick={handleAddToCart}
                additionalClasses="border-white bg-black w-full flex justify-center "
              />
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <Header5 className="text-2xl font-semibold mb-4">
            Other Products
          </Header5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {randomProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                image={
                  relatedProduct.productImageURL1 || "" // Use the first image of related products
                }
                title={relatedProduct.name}
                price={relatedProduct.currentPrice}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      </div>
      <Section6 />
    </div>
  );
};

export default ProductDetail;
