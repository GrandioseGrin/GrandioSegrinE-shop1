"use client";

import {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Paragraph1,
  Paragraph2,
  ParagraphLink1,
  ParagraphLink2,
} from "@/components/Text";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Firestore setup
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import AOS from "aos";
import SearchBar from "../navBar/SearchBar";
import SummaryBlocks from "./SummaryBlocks";

type Submission = {
  id: string;
  initials: string;
  name: string;
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  eventDate: string;
  location: string;
  eventdetail: string;
  aboutushow: string;
  contact_methods: string[];
  services_needed: string[];
  budget: string;
  viewed: boolean;
  timestamp: string;
};

function NewOrders() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(
    []
  );

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "formSubmissions"));

        type Submission = {
          id: string;
          initials: string;
          name: string;
          firstName: string;
          secondName: string;
          email: string;
          phoneNumber: string;
          eventDate: string;
          location: string;
          eventdetail: string;
          aboutushow: string;
          contact_methods: string[];
          services_needed: string[];
          budget: string;
          viewed: boolean;
          timestamp: string;
        };

        const submissionData: Submission[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          initials: doc.data().firstName[0] + doc.data().lastName[0], // Assuming you have firstName and lastName in your form
          name: `${doc.data().firstName} ${doc.data().lastName}`,
          firstName: doc.data().firstName,
          secondName: doc.data().lastName,
          email: doc.data().email,
          phoneNumber: doc.data().phoneNumber,
          eventDate: doc.data().eventDate,
          location: doc.data().location,
          eventdetail: doc.data().eventdetail,
          aboutushow: doc.data().aboutushow,
          contact_methods: doc.data().contact_methods,
          services_needed: doc.data().services_needed,
          budget: doc.data().budget,
          viewed: doc.data().viewed || false, // Retrieve 'viewed' field, defaulting to false
          timestamp: doc.data().timestamp
            ? doc.data().timestamp.toDate()
            : null,
        }));

        // Update total submissions and unread submissions count
        setTotalSubmissions(submissionData.length);
        setUnreadCount(submissionData.filter((s) => !s.viewed).length);

        // Sort submissions by timestamp, handling nulls
        submissionData.sort((a, b) => {
          // @ts-ignore
          const timeA = a.timestamp ? a.timestamp.getTime() : 0;
          // @ts-ignore
          const timeB = b.timestamp ? b.timestamp.getTime() : 0;
          return timeB - timeA;
        });

        setSubmissions(submissionData);
        setFilteredSubmissions(submissionData); // Initialize filtered submissions
      } catch (error) {
        console.error("Error fetching submissions: ", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchSubmissions();
  }, []);

  // Filter unread submissions
  const showUnreadSubmissions = () => {
    const unread = submissions.filter((submission) => !submission.viewed);
    setFilteredSubmissions(unread);
  };

  function showAllSubmissions() {
    setFilteredSubmissions(submissions); // Show all submissions
  }

  const handleClick = async (submission: Submission) => {
    // Update the viewed status in Firestore
    const submissionDocRef = doc(
      db,
      "formSubmissions",
      submission.id.toString()
    ); // Assuming id is the Firestore document ID

    try {
      await updateDoc(submissionDocRef, { viewed: true }); // Update the viewed field
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    // Set the submission as viewed
    const updatedSubmissions = submissions.map((sub) =>
      sub.id === submission.id ? { ...sub, viewed: true } : sub
    );
    setSubmissions(updatedSubmissions); // Update state with viewed submission
    setSelectedSubmission(submission);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedSubmission(null);
  };

  // Predefined list of colors to cycle through
  const bgColors = ["bg-red-500", "bg-green-500", "bg-blue-600"];

  console.log(selectedSubmission); // Check if the object is populated

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const formatTimestamp = (timestamp: Date | null): string => {
    if (!timestamp) return "N/A";

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const formattedTime = timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedDate = timestamp.toLocaleDateString("en-US", options);

    // Extract day from formattedDate to append "th", "st", "nd", or "rd"
    const day = timestamp.getDate();
    const daySuffix = (day: any) => {
      if (day > 3 && day < 21) return "th"; // We only need to worry about 11-13 for suffix
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return ` ${formattedDate}`;
  };

  const products = [
    {
      title: "Moisturizing Cream",
      price: 29.99,
      description:
        "A luxurious cream that provides deep hydration for all skin types.",
      image: "/images/testProduct.jpg",
      quantity: 3,
    },
    {
      title: "Anti-Aging Serum",
      price: 59.99,
      description:
        "An advanced serum formulated to reduce signs of aging and boost radiance.",
      image: "/images/testProduct.jpg",
      quantity: 2,
    },
    {
      title: "Brightening Toner",
      price: 19.99,
      description:
        "A toner that evens out skin tone and leaves a radiant, glowing complexion.",
      image: "/images/testProduct.jpg",
      quantity: 5,
    },
    {
      title: "Soothing Eye Cream",
      price: 39.99,
      description: "Gentle eye cream that reduces puffiness and dark circles.",
      image: "/images/testProduct.jpg",
      quantity: 1,
    },
    {
      title: "Nourishing Lip Balm",
      price: 9.99,
      description:
        "A lip balm that hydrates and protects your lips, keeping them soft and supple.",
      image: "/images/testProduct.jpg",
      quantity: 6,
    },
  ];

  return (
    <div>
      {" "}
      <div className="mx-4- xl:mx-0 ">
        <div className="  bg-white py-[35px]  rounded-lg shadow-md">
          <div className="px-2  xl:px-4">
            {selectedSubmission ? (
              // Render the detailed view if a submission is selected
              <div data-aos="zoom-in" className="">
                <div className=" flex  border-b pb-2 w-full  gap-4 items-center">
                  <button
                    onClick={handleBack}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <img
                      src="/icons/back1.svg"
                      alt=""
                      className=" w-[50px]- h-[25px] sm:h-[50px]"
                    />
                  </button>

                  <div className=" flex w-full-">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-[50px] h-[50px] flex items-center justify-center text-white rounded-full bg-primary -${
                          bgColors[
                            selectedSubmission.id.length % bgColors.length
                          ]
                        }`}
                      >
                        <span className="text-lg font-bold">
                          {selectedSubmission.initials}
                        </span>
                      </div>
                      <div>
                        <Header5 className="text-[23px] ">
                          {selectedSubmission.name}
                        </Header5>
                        <Paragraph2 className="text-sm sm:-mt-2 font-semibold-">
                          {selectedSubmission.email}
                        </Paragraph2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-[40px] space-y-[40px]">
                  <div className=" px-4 sm:px-[30px] py-[39px] bg-bg_gray rounded-[15px] space-y-[40px]">
                    <div className=" flex justify-between items-center">
                      <Paragraph2 className="text-sm text-gray-500  underline-">
                        {formatTimestamp(
                          typeof selectedSubmission.timestamp === "string"
                            ? new Date(selectedSubmission.timestamp) // Convert string to Date
                            : selectedSubmission.timestamp // Use as is if it's already a Date object
                        )}{" "}
                        {/* Use the custom formatting function */}
                      </Paragraph2>
                      <Paragraph2 className="text-sm text-gray-500  underline-">
                        pending
                      </Paragraph2>
                    </div>

                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="flex- grid grid-cols-6 relative justify-between items-center bg-white p-2 px-3  rounded-lg"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <ParagraphLink2 className="font-bold col-span-2 ">
                          {product.title}
                        </ParagraphLink2>
                        <Paragraph1 className="text-gray-500 ">
                          $ {product.price.toFixed(2)}
                        </Paragraph1>
                        <Paragraph1 className="text-gray-500 ">
                          Qt: {product.quantity}
                        </Paragraph1>
                        <div>
                          <Paragraph1 className="font-bold">
                            ${(product.price * product.quantity).toFixed(2)}
                          </Paragraph1>
                        </div>
                      </div>
                    ))}
                    <div className=" grid grid-cols-1 xl:grid-cols-2 items-center gap-4 sm:gap-[40px] ">
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Shipping Fee
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">$ 3,500</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Total Paid
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px] border-b-4 border-secondary">
                          <ParagraphLink1 className=" font-extrabold ">
                            $ 50,000.00
                          </ParagraphLink1>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          First Name
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.firstName}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Last Name
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.secondName}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          E-mail address{" "}
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.email}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Phone Number{" "}
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.phoneNumber}</p>
                        </div>
                      </div>

                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Country{" "}
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.eventDate}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          State{" "}
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">{selectedSubmission.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" px-[30px] py-[39px] bg-bg_gray rounded-[15px] space-y-[40px]">
                    <div>
                      <ParagraphLink1 className="  text-cente font-bold ">
                        Address{" "}
                      </ParagraphLink1>
                      <div className=" p-6 bg-white rounded-[12px]">
                        <p className=" ">{selectedSubmission.eventdetail}</p>
                      </div>
                    </div>
                    <div className=" grid grid-cols-2  gap-4 sm:gap-[40px] ">
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          City
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">$ {selectedSubmission.budget}</p>
                        </div>
                      </div>
                      <div>
                        <ParagraphLink1 className="  text-cente font-bold ">
                          Zip Code
                        </ParagraphLink1>
                        <div className=" p-6 bg-white rounded-[12px]">
                          <p className=" ">$ {selectedSubmission.budget}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <ParagraphLink1 className="  text-cente font-bold ">
                        Message/Note{" "}
                      </ParagraphLink1>
                      <div className=" p-6 bg-white rounded-[12px]">
                        <p className=" ">{selectedSubmission.aboutushow}</p>
                      </div>
                    </div>
                                  </div>
                                  <div className=" flex justify-center">
                                      <button className=" px-4 py-1 font-bold rounded-lg text-white bg-primary text-[14px] hover:bg-black" >Done</button>
                                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              // Render the list of submissions if none is selected
              <div className="space-y-2 scrollable-div- overflow-y-auto- max-h-screen- ">
                <div className=" flex items-center justify-between gap-4">
                  <SearchBar
                    submissions={submissions}
                    // @ts-ignore
                    onSearchResults={setFilteredSubmissions}
                  />
                  <div className="relative">
                    <button onClick={toggleFilter}>
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
                          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                        />
                      </svg>
                    </button>

                    {isFilterOpen && (
                      <div className="absolute space-y- z-10 -bottom-[120px] right-0 bg-white px-4 py-2 rounded-lg shadow-md">
                        <button onClick={() => showAllSubmissions()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            All submissions
                          </Paragraph2>
                        </button>

                        <button onClick={() => showUnreadSubmissions()}>
                          <Paragraph2 className="text-sm whitespace-nowrap">
                            All unread orders
                          </Paragraph2>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" h-screen space-y-4 overflow-y-auto scrollable-div px-2 ">
                  <Header5 className="pt-3">New Orders</Header5>

                  {filteredSubmissions.map((submission, index) => (
                    <div
                      key={submission.id}
                      className={`flex items-center border px-2  space-x-4 py-2 bg-white rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 ${
                        submission.viewed ? "text-gray-400" : "" // Change text color for viewed submissions
                      }`}
                      onClick={() => handleClick(submission)}
                    >
                      <div
                        className={`w-[10%] h-full flex items-center justify-center  text- rounded-lg  `}
                      >
                        {/* <img src="/images/testProduct.jpg" alt="" /> */}
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
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </div>
                      <Paragraph1 className="text-lg font-semibold w-[20%] whitespace-nowrap truncate overflow-hidden">
                        {submission.name}
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] whitespace-nowrap truncate overflow-hidden ">
                        Qt: 100
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] whitespace-nowrap truncate overflow-hidden ">
                        Lagos
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] whitespace-nowrap truncate overflow-hidden ">
                        Nigeria
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] whitespace-nowrap truncate overflow-hidden ">
                        11/30/2024
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] whitespace-nowrap font-bold truncate overflow-hidden ">
                        $100
                      </Paragraph1>
                      <Paragraph1 className="w-[10%] text-[#e6c533] text-primary- whitespace-nowrap truncate overflow-hidden ">
                        pending
                      </Paragraph1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrders;
