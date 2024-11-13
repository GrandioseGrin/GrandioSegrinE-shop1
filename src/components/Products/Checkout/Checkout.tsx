import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
};

type CheckoutProps = {
  products: Product[];
  total: number;
  logoUrl: string;
};

const Checkout: React.FC<CheckoutProps> = ({ products, total, logoUrl }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [shippingMethod, setShippingMethod] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    country: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
  });

  const handleNext = (values: typeof shippingInfo) => {
    setShippingInfo(values);
    setActiveTab((prev) => prev + 1);
  };

  const handleBack = () => setActiveTab((prev) => prev - 1);

  return (
    <div className="  space-y-6 bg-white ">
      <div className="flex justify-around- items-center gap-2 border-b- pb-3">
        <button
          onClick={() => setActiveTab(0)}
          className={`text-sm  ${
            activeTab === 0 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Information
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>

        <button
          onClick={() => setActiveTab(1)}
          className={`text-sm ${
            activeTab === 1 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Payment
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        <button
          onClick={() => setActiveTab(2)}
          className={`text-sm  ${
            activeTab === 2 ? "text-primary font-semibold" : "text-gray-400"
          }`}
        >
          Receipt
        </button>
      </div>

      {/* Information Tab */}
      {activeTab === 0 && (
        <Formik
          initialValues={shippingInfo}
          validationSchema={validationSchema}
          onSubmit={(values) => handleNext(values)}
        >
          <Form className="space-y-4 min-h-screen">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <Field
                    name="phoneNumber"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <Field
                name="country"
                as="select"
                className="mt-1 block w-full p-2 border rounded-md"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Field
                  name="firstName"
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                name="address"
                className="mt-1 block w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Field
                name="city"
                className="mt-1 block w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Field
                  name="state"
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <Field
                  name="zipCode"
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Field type="checkbox" name="saveInfo" className="mr-2" />
              <label>Save this information for next time</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message/Note
              </label>
              <Field
                name="note"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Add a message or ask for product advice, or write a note for your friend if this is a gift..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-black "
            >
              Next
            </button>
          </Form>
        </Formik>
      )}

      {/* Payment Tab */}
      {activeTab === 1 && (
        <div className="space-y-4 ">
          <div className="border-b pb-3">
            <h3 className="font-semibold text-gray-700">
              Confirm Contact & Address
            </h3>
            <p className="text-gray-600">{shippingInfo.email}</p>
            <p className="text-gray-600">
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
              {shippingInfo.zipCode}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">
              Select Shipping Method
            </h3>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="Pickup"
                  checked={shippingMethod === "Pickup"}
                  onChange={() => setShippingMethod("Pickup")}
                  className="text-primary focus:ring-blue-500"
                />
                <span>Pickup</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="Standard"
                  checked={shippingMethod === "Standard"}
                  onChange={() => setShippingMethod("Standard")}
                  className="text-primary focus:ring-blue-500"
                />
                <span>Standard Shipping</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-black ml-4"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Receipt Tab */}
      {activeTab === 2 && (
        <div className="space-y-4 text-center min-h-screen">
          <img src={logoUrl} alt="Company Logo" className="mx-auto w-16 h-16" />
          <h3 className="font-semibold text-gray-700">Order Summary</h3>
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <p className="text-gray-700">{product.title}</p>
                <p className="text-gray-700 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 font-semibold text-gray-700">
            Total: ${Number(total).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
