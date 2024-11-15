"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { db } from "@/lib/firebase"; // Firestore setup
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"; // Firebase methods

interface Product {
  id: any;
  name: string;
  productImageURL1: string;
  productImagePublicId1?: string;
  productImageURL2: string;
  productImagePublicId2?: string;
  productImageURL3: string;
  productImagePublicId3?: string;
  productImageURL4: string;
  productImagePublicId4?: string;
  productImageURL5: string;
  productImagePublicId5?: string;
  currentPrice: number;
  oldPrice: number;
  availableAmount: number;
  category: string;
  selectedCategory: any;
  description: string;
  isFeatured: boolean;
  isTrending: boolean;
}

interface ModalProps {
  product: Product;
  onClose: () => void;
}

type ProductValues = {
  name: string;
  productImageURL1: string;
  productImagePublicId1?: string;
  productImageURL2: string;
  productImagePublicId2?: string;
  productImageURL3: string;
  productImagePublicId3?: string;
  productImageURL4: string;
  productImagePublicId4?: string;
  productImageURL5: string;
  productImagePublicId5?: string;
  currentPrice: number;
  oldPrice: number;
  availableAmount: number;
  category: string;
  selectedCategory: any;
  description: string;
  isFeatured: boolean;
  isTrending: boolean;
};

interface Category {
  id: string;
  name: string;
  properties: Record<string, any>; // Store additional properties of the category
}


const ProductModal: React.FC<ModalProps> = ({ product, onClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(""); // State for input
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const initialValues: ProductValues = {
    name: product.name,
    productImageURL1: product.productImageURL1,
    productImagePublicId1: product.productImagePublicId1,
    productImageURL2: product.productImageURL2,
    productImagePublicId2: product.productImagePublicId2,
    productImageURL3: product.productImageURL3,
    productImagePublicId3: product.productImagePublicId3,
    productImageURL4: product.productImageURL4,
    productImagePublicId4: product.productImagePublicId4,
    productImageURL5: product.productImageURL5,
    productImagePublicId5: product.productImagePublicId5,
    currentPrice: product.currentPrice,
    oldPrice: product.oldPrice,
    availableAmount: product.availableAmount,
    category: product.category,
    selectedCategory: product.selectedCategory,
    description: product.name,
    isFeatured: product.isFeatured,
    isTrending: product.isTrending,
  };

  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[];
        setCategories(categoriesData);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories: ", error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

   const validationSchema = Yup.object({
     name: Yup.string().required("Product name is required"),
     currentPrice: Yup.number().required("Current price is required"),
     oldPrice: Yup.number().required("Old price is required"),
     availableAmount: Yup.number().required("Avaliable quantity is required"),
     category: Yup.string().required("Category is required"),
     description: Yup.string().required("Description is required"),
   });
  
  const handleImageUpload = async (
    file: File,
    setFieldValue: any,
    fieldName: string,
    oldImagePublicId?: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-shop");

    try {
      setIsLoading(true);

      // Delete the old image if there's a public ID
      if (oldImagePublicId) {
        console.log(
          "Attempting to delete old image with public_id:",
          oldImagePublicId
        );

        const deleteResponse = await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: oldImagePublicId }),
        });

        const deleteData = await deleteResponse.json();
        console.log("Delete response from Cloudinary:", deleteData);

        if (!deleteResponse.ok) {
          console.error("Failed to delete the image:", deleteData);
          return;
        }
      }

      // Upload the new image
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtipo8fg3/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      // Set the new image URL
      setFieldValue(fieldName, data.secure_url);
      // Save the public_id of the new image
      setFieldValue("productImagePublicId", data.public_id);
    } catch (error) {
      console.error("Error uploading or deleting image:", error);
    } finally {
      setIsLoading(false);
    }
  };

   const handleSubmit = async (values: ProductValues) => {
     setIsLoading(true);

     try {
       const productRef = doc(db, "products", product.id); // Firestore document reference
       await updateDoc(productRef, {
         ...values,
         updatedAt: new Date(), // Optional timestamp for tracking updates
       });
       setIsLoading(false);
       onClose(); // Close the modal on success
       window.location.reload(); // Refresh the page
     } catch (error) {
       console.error("Error updating product: ", error);
       setIsLoading(false);
     }
   };


  const formatCurrency = (value: any) => {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    return `₦ ${Number(numericValue).toLocaleString()}`; // Format as currency
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white relative rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6   ">
        {isloading && (
          <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <div className=" h-[500px] overflow-hidden overflow-y-auto scrollbar-hide">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className=" space-y-6">
                <div>
                  <label>Images</label>
                  <div className=" grid grid-cols-2 sm:grid-cols-5  gap-2 object-cover">
                    {/* Image 1 */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            handleImageUpload(
                              file,
                              setFieldValue,
                              "productImageURL1",
                              values.productImagePublicId1 // Pass the public ID of the old image
                            );
                        }}
                        className="hidden" // Hide the default file input
                        id="image-upload-1" // Set an id to reference the input
                      />

                      <label
                        htmlFor="image-upload-1"
                        className="h-[100px] w-full bg-bg_gray rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        {!values.productImageURL1 ? (
                          <span className="text-2xl text-gray-500">+</span> // Show plus sign if no image
                        ) : (
                          <div className="h-[100px] object-cover w-full bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={values.productImageURL1}
                              alt="Uploaded Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Image 2 */}

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            handleImageUpload(
                              file,
                              setFieldValue,
                              "productImageURL2",
                              values.productImagePublicId2 // Pass the public ID of the old image
                            );
                        }}
                        className="hidden" // Hide the default file input
                        id="image-upload-2" // Set an id to reference the input
                      />

                      <label
                        htmlFor="image-upload-2"
                        className="h-[100px] w-full bg-bg_gray rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        {!values.productImageURL2 ? (
                          <span className="text-2xl text-gray-500">+</span> // Show plus sign if no image
                        ) : (
                          <div className="h-[100px] object-cover w-full bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={values.productImageURL2}
                              alt="Uploaded Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Image 3 */}

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            handleImageUpload(
                              file,
                              setFieldValue,
                              "productImageURL3",
                              values.productImagePublicId3 // Pass the public ID of the old image
                            );
                        }}
                        className="hidden" // Hide the default file input
                        id="image-upload-3" // Set an id to reference the input
                      />

                      <label
                        htmlFor="image-upload-3"
                        className="h-[100px] w-full bg-bg_gray rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        {!values.productImageURL3 ? (
                          <span className="text-2xl text-gray-500">+</span> // Show plus sign if no image
                        ) : (
                          <div className="h-[100px] object-cover w-full bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={values.productImageURL3}
                              alt="Uploaded Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Image 4 */}

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            handleImageUpload(
                              file,
                              setFieldValue,
                              "productImageURL4",
                              values.productImagePublicId4 // Pass the public ID of the old image
                            );
                        }}
                        className="hidden" // Hide the default file input
                        id="image-upload-4" // Set an id to reference the input
                      />

                      <label
                        htmlFor="image-upload-4"
                        className="h-[100px] w-full bg-bg_gray rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        {!values.productImageURL4 ? (
                          <span className="text-2xl text-gray-500">+</span> // Show plus sign if no image
                        ) : (
                          <div className="h-[100px] object-cover w-full bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={values.productImageURL4}
                              alt="Uploaded Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Image 5 */}

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            handleImageUpload(
                              file,
                              setFieldValue,
                              "productImageURL5",
                              values.productImagePublicId5 // Pass the public ID of the old image
                            );
                        }}
                        className="hidden" // Hide the default file input
                        id="image-upload-5" // Set an id to reference the input
                      />

                      <label
                        htmlFor="image-upload-5"
                        className="h-[100px] w-full bg-bg_gray rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        {!values.productImageURL5 ? (
                          <span className="text-2xl text-gray-500">+</span> // Show plus sign if no image
                        ) : (
                          <div className="h-[100px] object-cover w-full bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={values.productImageURL5}
                              alt="Uploaded Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label>Name</label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter Product name"
                    className="w-full outline-none border-primary border p-2 rounded-lg my-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-[12px]"
                  />
                </div>
                <div className=" grid grid-cols-2 gap-2">
                  <div>
                    <label>Current Price</label>
                    <Field name="currentPrice">
                      {({ field, form }: FieldProps<string>) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Product Price"
                          value={formatCurrency(field.value || "")}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, ""); // Extract raw numeric value
                            form.setFieldValue("currentPrice", rawValue);
                          }}
                          className="w-full outline-none border-primary border p-2 rounded-lg my-2"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="currentPrice"
                      component="div"
                      className="text-red-500 text-[12px]"
                    />
                  </div>
                  <div>
                    <label>Old Price</label>
                    <Field name="oldPrice">
                      {({ field, form }: FieldProps<string>) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter Product Old Price"
                          value={formatCurrency(field.value || "")}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, ""); // Extract raw numeric value
                            form.setFieldValue("oldPrice", rawValue);
                          }}
                          className="w-full outline-none border-primary border p-2 rounded-lg my-2"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="oldPrice"
                      component="div"
                      className="text-red-500 text-[12px]"
                    />
                  </div>
                </div>

                <div>
                  <label>Available Quantity</label>
                  <Field
                    name="availableAmount"
                    type="text"
                    placeholder="Enter Product Available Quantity"
                    className="w-full outline-none border-primary border p-2 rounded-lg my-2"
                  />
                  <ErrorMessage
                    name="availableAmount"
                    component="div"
                    className="text-red-500 text-[12px]"
                  />
                </div>
                <div>
                  <label>Category</label>
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    <Field
                      as="select"
                      name="category"
                      className="w-full border border-primary p-2 rounded-lg my-2"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const selectedCategory = categories.find(
                          (cat) => cat.id === e.target.value
                        );
                        setFieldValue("category", e.target.value); // Set the category ID
                        setFieldValue(
                          "selectedCategory",
                          selectedCategory || {}
                        ); // Set the full category object
                      }}
                    >
                      <option value="" label="Select category" />
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                  )}
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-[12px]"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Enter Product Description"
                    className="w-full outline-none border-primary border p-2 rounded-lg my-2"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-[12px]"
                  />
                </div>
                <div className="flex items-center gap-2 my-2">
                  <Field type="checkbox" name="isFeatured" />
                  <label>Featured Product</label>
                </div>
                <div className="flex items-center gap-2 my-2">
                  <Field type="checkbox" name="isTrending" />
                  <label>Trending Product</label>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="mt-4 w-fit py-1 px-4 bg-bg_gray text-white rounded-md"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="mt-4 w-fit py-1 px-4 bg-primary text-white rounded-md"
                  >
                    Add Product
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
