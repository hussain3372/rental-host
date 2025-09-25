"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReviewSubmission() {
  // ====== States for all fields ======
  const [propertyDetails, setPropertyDetails] = useState({
    name: "Lorem Ipsum",
    address: "Digital Marketing",
    type: "www.lorem.com",
    ownership: "Digital Marketing",
  });

  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
  );

  const [compliance, setCompliance] = useState([
    "Fire safety measures in place",
    "Building code compliance",
  ]);

  const [planDetails, setPlanDetails] = useState({
    name: "Professional",
    duration: "Monthly",
    startDate: "Aug 12, 2025",
    amount: "$24",
  });

  // Editing states
  const [editing, setEditing] = useState<string | null>(null);

  // ====== Handlers ======
  const handleSave = () => {
    setEditing(null);
  };

  return (
    <div className=" mx-auto text-white">
      <h2 className="text-[28px] leading-[32px] font-bold mb-3">Review Your Submission</h2>
      <p className="text-white/60 text-[16px] leading-[20px] mb-10 w-[573px]">
        Please review the details below before proceeding. You can go back and edit if needed.
      </p>

      {/* Property Details */}
      <div className=" border bg-[#121315] border-[#2e2f31] rounded-xl mb-6 p-5">
        <div className="flex justify-between items-center border-b border-b-[#2e2f31] pb-3  mb-[28px]">
          <h3 className="font-semibold">Property Details</h3>
          {editing === "property" ? (
            <button
              onClick={handleSave}
              className="text-[#EFFC76]  underline cursor-pointer text-sm font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing("property")}
              className="text-[#EFFC76]  underline cursor-pointer text-sm"
            >
              Edit
            </button>
          )}
        </div>

        {editing === "property" ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <input
              value={propertyDetails.name}
              onChange={(e) =>
                setPropertyDetails({ ...propertyDetails, name: e.target.value })
              }
              className="p-2 rounded  w-full"
            />
            <input
              value={propertyDetails.address}
              onChange={(e) =>
                setPropertyDetails({
                  ...propertyDetails,
                  address: e.target.value,
                })
              }
              className="p-2 rounded bg-[#121315] w-full"
            />
            <input
              value={propertyDetails.type}
              onChange={(e) =>
                setPropertyDetails({ ...propertyDetails, type: e.target.value })
              }
              className="p-2 rounded bg-[#121315] w-full"
            />
            <input
              value={propertyDetails.ownership}
              onChange={(e) =>
                setPropertyDetails({
                  ...propertyDetails,
                  ownership: e.target.value,
                })
              }
              className="p-2 rounded bg-[#121315] w-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-[28px] text-sm">
            <div className="">
              <p className="font-regular text-[12px] leading-4">Property name</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {propertyDetails.name} </p>
            </div>
            <div className="">
              <p className="font-regular text-[12px] leading-4">Property address</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {propertyDetails.address} </p>
            </div>
           <div className="">
              <p className="font-regular text-[12px] leading-4">Property type</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {propertyDetails.type} </p>
            </div>
            <div className="">
              <p className="font-regular text-[12px] leading-4">Ownership</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {propertyDetails.ownership} </p>
            </div>
          </div>
        )}
      </div>

      {/* Property Photos */}
      <div className="bg-[#121315] border border-[#2e2f31] rounded-xl p-5 mb-6">
        <div className="flex border-b border-b-[#2e2f31] pb-3 justify-between items-center mb-4">
          <h3 className="font-semibold">Property Photos</h3>
          {editing === "photos" ? (
            <button
              onClick={handleSave}
              className="text-[#EFFC76]  underline cursor-pointer text-sm font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing("photos")}
              className="text-[#EFFC76]  underline cursor-pointer text-sm"
            >
              Edit
            </button>
          )}
        </div>
        <p className="text-white font-regular text-[12px] leading-[16px] pt-[28px] pb-2">Description</p>

        {editing === "photos" ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full  p-3 rounded bg-[#121315] mb-3"
            rows={3}
          />
        ) : (
          <p className="text-white leading-[18px] text-sm mb-[28px] font-semibold">{description}</p>
        )}

        <div className="flex pt-[28px] gap-3">
          {[1, 2, 3, 4 , 5].map((i) => (
            <div
              key={i}
              className="relative w-28 h-20 rounded-md overflow-hidden"
            >
              <Image
                src="/images/rev1.png"
                alt={`Property ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-[#121315] border border-[#2e2f31] rounded-xl p-5 mb-6">
        <div className="flex border-b border-b-[#2e2f31] pb-3 justify-between items-center mb-4">
          <h3 className="font-semibold text-[16px] leading-5">Compliance Checklist</h3>
          {editing === "compliance" ? (
            <button
              onClick={handleSave}
              className="text-[#EFFC76]  underline cursor-pointer text-sm font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing("compliance")}
              className="text-[#EFFC76]  underline cursor-pointer text-sm"
            >
              Edit
            </button>
          )}
        </div>

        {editing === "compliance" ? (
          <div className="flex flex-col py-[28px] gap-2">
            {compliance.map((item, idx) => (
              <input
                key={idx}
                value={item}
                onChange={(e) => {
                  const updated = [...compliance];
                  updated[idx] = e.target.value;
                  setCompliance(updated);
                }}
                className="p-2 rounded bg-[#121315] w-full"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {compliance.map((item, idx) => (
              <span
                key={idx}
                className=" rounded-md bg-gradient-to-b from-[#202020] to-[#101010] p-[15px] border border-[#353535] md:min-w-[357px] text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Document Uploads */}
      <div className="bg-[#121315] border border-[#2e2f31] rounded-xl p-5 mb-6">
        <div className="flex justify-between border-b border-b-[#2e2f31] pb-3 items-center mb-[28px]">
          <h3 className="font-semibold">Document Uploads</h3>
          <button className="text-[#EFFC76]  underline cursor-pointer text-sm">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Government-issued ID", file: "/images/doc1.png" },
            { label: "Property Ownership Proof", file: "/images/doc2.png" },
            { label: "Safety Permits", file: "/images/doc3.png" },
            { label: "Insurance Certificate", file: "/images/doc4.png" },
          ].map((doc, idx) => (
            <div key={idx}>
              <p className="text-sm text-white/60 mb-1">{doc.label}</p>
              <div className="relative mt-2 w-full h-28 rounded-md overflow-hidden ">
                <Image
                  src={doc.file}
                  alt={doc.label}
                  width={80}
                  height={52}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-[#121315] border border-[#2e2f31] rounded-xl p-5 mb-6">
        <div className="flex justify-between border-b border-b-[#2e2f31] pb-3 items-center mb-[28px]">
          <h3 className="font-semibold">Plan Details</h3>
          {editing === "plan" ? (
            <button
              onClick={handleSave}
              className="text-[#EFFC76]  underline cursor-pointer text-sm font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing("plan")}
              className="text-[#EFFC76]  underline cursor-pointer text-sm"
            >
              Edit
            </button>
          )}
        </div>

        {editing === "plan" ? (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <input
              value={planDetails.name}
              onChange={(e) =>
                setPlanDetails({ ...planDetails, name: e.target.value })
              }
              className="p-2 rounded bg-black/40 w-full"
            />
            <input
              value={planDetails.duration}
              onChange={(e) =>
                setPlanDetails({ ...planDetails, duration: e.target.value })
              }
              className="p-2 rounded bg-black/40 w-full"
            />
            <input
              value={planDetails.startDate}
              onChange={(e) =>
                setPlanDetails({ ...planDetails, startDate: e.target.value })
              }
              className="p-2 rounded bg-black/40 w-full"
            />
            <input
              value={planDetails.amount}
              onChange={(e) =>
                setPlanDetails({ ...planDetails, amount: e.target.value })
              }
              className="p-2 rounded bg-black/40 w-full"
            />
          </div>
        ) : (
         <div className="grid grid-cols-2 gap-y-[28px] text-sm">
            <div className="">
              <p className="font-regular text-[12px] leading-4">Plan name</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {planDetails.name} </p>
            </div>
            <div className="">
              <p className="font-regular text-[12px] leading-4">Duration</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {planDetails.duration} </p>
            </div>
           <div className="">
              <p className="font-regular text-[12px] leading-4">Start Date</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {planDetails.startDate} </p>
            </div>
            <div className="">
              <p className="font-regular text-[12px] leading-4">Amount</p>{" "}
             <p className="text-[14px] font-semibold leading-[18px] pt-2"> {planDetails.amount} </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
