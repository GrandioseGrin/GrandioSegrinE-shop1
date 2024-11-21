import React, { useState, useRef, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "@/lib/firebase"; // Import Firestore database
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Firestore functions
import { sendEmail } from "@/lib/serverActions"; // Import server action
import useCartStore from "@/stores/cartStore";
import useUserInfoStore from "@/stores/userInfoStore"; // Import the user info store
import html2canvas from "html2canvas";

type Product = {
  id: number;
  productImageURL1: string;
  name: string;
  price: number;
  quantity: number;
  currentPrice: number;
};

interface State {
  id: string;
  name: string;
  shippingFee: number;
}

interface Country {
  code: string;
  name: string;
  shippingFee: number;
  states: State[];
}
type CheckoutProps = {
  products: any;
  total: number;
  logoUrl: string;
  onShippingFeeChange: (fee: number) => void; // Callback for shipping fee
  onTotalBillChange: (totalBill: number) => void;
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
});

const Checkout: React.FC<CheckoutProps> = ({
  products,
  total,
  logoUrl,
  onShippingFeeChange,
  onTotalBillChange,
}) => {
  const {
    email,
    phoneNumber,
    country,
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    saveInfo,
    setUserInfo,
  } = useUserInfoStore();
  const [activeTab, setActiveTab] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    email: email || "",
    phoneNumber: phoneNumber || "",
    country: "",
    firstName: firstName || "",
    lastName: lastName || "",
    address: address || "",
    city: city || "",
    state: "",
    zipCode: zipCode || "",
    saveInfo: saveInfo || true,
    note: "",
  });

  const [shippingMethod, setShippingMethod] = useState("");
  const clearCart = useCartStore((state) => state.clearCart);
  const [isloading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [states, setStates] = useState<State[]>([]);

  const [totalShippingFee, setTotalShippingFee] = useState<number>(0);

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "shippingFees"));
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

       const formattedCountries = fetchedData.map((country) => ({
         code: (country as any).countryCode,
         name: (country as any).countryName,
         shippingFee: (country as any).shippingFee || 0,
         states: (country as any).states || [],
       }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching shipping data:", error);
      }
    };

    fetchShippingData();
  }, []);

  const handleCountryChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setSelectedCountryCode(value);

    const country = countries.find((c) => c.code === value);
    if (country) {
      setStates(country.states || []);
      setFieldValue("state", "");
      calculateTotalShippingFee(country.shippingFee, null);
    } else {
      setStates([]);
      calculateTotalShippingFee(0, null);
    }

    setFieldValue("country", value);
  };

  const handleStateChange = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const state = states.find((s) => s.name === value);
    const country = countries.find((c) => c.code === selectedCountryCode);

    if (state && country) {
      calculateTotalShippingFee(country.shippingFee, state.shippingFee);
    } else if (country) {
      calculateTotalShippingFee(country.shippingFee, null);
    }

    setFieldValue("state", value);
  };

  const calculateTotalShippingFee = (
    countryFee: number,
    stateFee: number | null
  ) => {
    setTotalShippingFee(countryFee + (stateFee || 0));
  };

  const handleNext = (values: typeof shippingInfo) => {
    setShippingInfo(values);
    setActiveTab((prev) => prev + 1);
  };

  const handleBack = () => setActiveTab((prev) => prev - 1);

  const handleSaveInfo = (values: any, save: boolean) => {
    if (save) {
      setUserInfo({
        ...values,
        saveInfo: true,
      });
    }
  };

  const totalBill = total + totalShippingFee;

 const sanitizeProduct = (product: any) => {
   if (
     !product.id ||
     !product.name ||
     product.productImageURL1 === undefined ||
     product.quantity === undefined ||
     product.currentPrice === undefined
   ) {
     throw new Error(`Invalid product data: ${JSON.stringify(product)}`);
   }

   return {
     id: product.id,
     name: product.name,
     quantity: product.quantity,
     productImageURL1: product.productImageURL1,
     price: parseFloat(product.currentPrice), // Ensure numeric type
     totalPrice: product.quantity * parseFloat(product.currentPrice),
   };
 };

 const submitOrderToFirestore = async (values: any) => {
   setIsLoading(true);

   try {
     // Sanitize and format the products array
     const sanitizedProducts = products.map(sanitizeProduct);

     // Add the order document to Firestore
     const docRef = await addDoc(collection(db, "Orders"), {
       ...values,
       timestamp: new Date(),
       viewed: false,
       shipped: false,
       shippingFee: totalShippingFee,
       totalPaid: totalBill,
       products: sanitizedProducts, // Use sanitized products
     });

     console.log("Document written with ID: ", docRef.id);

     // Update the available quantity for each product
     const updateProductPromises = products.map(async (product: any) => {
       const productRef = doc(db, "products", product.id);

       // Fetch the current availableAmount
       const productSnapshot = await getDoc(productRef);
       if (!productSnapshot.exists()) {
         throw new Error(`Product with ID ${product.id} does not exist.`);
       }

       const productData = productSnapshot.data();
       const availableAmount = parseInt(productData.availableAmount, 10); // Ensure numeric
       const newAvailableAmount = availableAmount - product.quantity;

       // Check if the quantity is sufficient
       if (newAvailableAmount < 0) {
         throw new Error(
           `Not enough stock for product ${product.name}. Only ${availableAmount} available.`
         );
       }

       // Update the availableAmount in Firestore
       await updateDoc(productRef, { availableAmount: newAvailableAmount });
     });

     // Wait for all updates to complete
     await Promise.all(updateProductPromises);

     // Send email notification
     await sendEmail();

     setIsLoading(false); // Mark loading as complete
     console.log("Order and product quantities updated successfully.");
   } catch (error) {
     console.error("Error processing order: ", error);
     setIsLoading(false); // Mark loading as complete in case of error
   }
 };


  const handleDownloadReceipt = async () => {
    const receiptDiv = document.getElementById("receipt");

    if (receiptDiv) {
      // Ensure images are loaded
      const images = receiptDiv.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) resolve(true);
            else img.onload = img.onerror = () => resolve(true);
          });
        })
      );

      // Capture the receipt div
      const canvas = await html2canvas(receiptDiv, {
        useCORS: true,
        height: 1122,
        scale: 2,
      });

      // Convert to image and download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "receipt-a4.png";
      link.click();
    }

    // Clear the cart
    clearCart();
  };

  useEffect(() => {
    onShippingFeeChange(totalShippingFee); // Notify the parent about the shipping fee
    const totalBill = total + totalShippingFee;
    onTotalBillChange(totalBill); // Notify the parent about the total bill
  }, [totalShippingFee, total, onShippingFeeChange, onTotalBillChange]);

  return (
    <div className="  space-y-6 bg-white sm:p-4 p-0 relative rounded-lg">
      {isloading && (
        <div className=" absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
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
          onSubmit={(values) => {
            handleNext(values);
            handleSaveInfo(values, values.saveInfo);
          }}
        >
          {({ setFieldValue }) => (
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
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCountryChange(e.target.value, setFieldValue)
                  }
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
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
                    as="select"
                    className="mt-1 block w-full p-2 border rounded-md"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleStateChange(e.target.value, setFieldValue)
                    }
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </Field>
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
              <div className="flex items-center text-[12px]">
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
          )}
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
          <div className="min-h-[500px]">
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
              onClick={() => {
                submitOrderToFirestore(shippingInfo); // Pass the required values
                setActiveTab(2);
              }}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-black ml-4"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Receipt Tab */}
      {activeTab === 2 && (
        <div>
          <div
            id="receipt"
            className="space-y-4 p-4 max-w-[793px]  min-h-screen relative"
          >
            <img src={logoUrl} alt="Company Logo" className="mx-auto w- h-16" />

            <div className=" pt-8 flex items-center w-full gap-2">
              <div className=" whitespace-nowrap ">Custumer Name:</div>
              <div className=" px-2 py-1 border-b rounded-lg- w-full">
                {firstName} {lastName}
              </div>
            </div>
            <div className=" pb-8 flex items-center w-full gap-2">
              <div className=" whitespace-nowrap ">Custumer email:</div>
              <div className=" px-2 py-1 border-b rounded-lg- w-full">
                {email}
              </div>
            </div>
            <h3 className="font-semibold text-gray-700">Order Summary</h3>
            <div className="space-y-2">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="grid grid-cols-5 items-center border-b "
                >
                  <div className=" col-span-2 flex items-center gap-2">
                    <img
                      src={product.productImageURL1}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <p className="text-gray-700">{product.name}</p>
                  </div>
                  <p className="text-gray-700">
                    {" "}
                    {`₦ ${new Intl.NumberFormat("en-US").format(
                      Number(product.currentPrice)
                    )}`}
                  </p>

                  <p className="text-gray-700">Qt: {product.quantity}</p>
                  <p className="text-gray-700 font-semibold text-end">
                    {`₦ ${new Intl.NumberFormat("en-US").format(
                      Number(product.currentPrice * product.quantity)
                    )}`}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 font-semibold flex justify-between text-gray-700">
              <p>Shipping fee</p>
              <p>{`₦ ${new Intl.NumberFormat("en-US").format(
                Number(totalShippingFee)
              )}`}</p>
            </div>
            <div className=" font-semibold flex justify-between text-gray-700">
              <p>Total</p>
              <p>{`₦ ${new Intl.NumberFormat("en-US").format(
                Number(totalBill)
              )}`}</p>
            </div>
          </div>
          <button
            onClick={handleDownloadReceipt}
            className=" text-center px-6 w-full  bg-primary text-white py-2 rounded-md hover:bg-black "
          >
            Download Receipt
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
