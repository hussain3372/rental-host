"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

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

  // ==== Image Preview States ====
  const propertyImages = [
    "/images/rev1.png",
    "/images/rev2.png",
    "/images/rev3.png",
    "/images/rev4.png",
    "/images/rev5.png",
  ];

  const documentImages = [
    "/images/doc1.png",
    "/images/doc2.png",
    "/images/doc3.png",
    "/images/doc4.png",
  ];

  // const [isOpen, setIsOpen] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // ==== Image Preview States for Property Photos ====
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [propertyIndex, setPropertyIndex] = useState(0);

  // ==== Image Preview States for Document Uploads ====
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [docIndex, setDocIndex] = useState(0);
  // Property modal handlers
  const openPropertyPreview = (i: number) => {
    setPropertyIndex(i);
    setIsPropertyOpen(true);
  };
  const closePropertyPreview = () => setIsPropertyOpen(false);
  const prevProperty = () =>
    setPropertyIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
  const nextProperty = () =>
    setPropertyIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));

  // Document modal handlers
  const openDocPreview = (i: number) => {
    setDocIndex(i);
    setIsDocOpen(true);
  };
  const closeDocPreview = () => setIsDocOpen(false);
  const prevDoc = () =>
    setDocIndex((prev) => (prev === 0 ? documentImages.length - 1 : prev - 1));
  const nextDoc = () =>
    setDocIndex((prev) => (prev === documentImages.length - 1 ? 0 : prev + 1));


  // ====== Handlers ======
  const handleSave = () => {
    setEditing(null);
  };

  return (
    <div className="mx-auto text-white">
      <h2 className="text-[28px] leading-[32px] font-bold mb-3">Review Your Submission</h2>
      <p className="text-white/60 text-[16px] leading-[20px] mb-10 max-w-[573px] w-full">
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
        <div className="flex border-b border-b-[#2e2f31] pb-3 justify-between items-center ">
          <h3 className="font-semibold">Property Photos</h3>
          {editing === "photos" ? (
            <button
              onClick={handleSave}
              className="text-[#EFFC76] underline cursor-pointer text-sm font-medium"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing("photos")}
              className="text-[#EFFC76] underline cursor-pointer text-sm"
            >
              Edit
            </button>
          )}
        </div>

        <p className="text-white font-regular text-[12px] leading-[16px] pt-[28px] pb-2">
          Description
        </p>

        {editing === "photos" ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-[#121315] mb-3"
            rows={3}
          />
        ) : (
          <p className="text-white leading-[18px] text-sm font-semibold">{description}</p>
        )}

        {/* Thumbnails with Preview */}
        <div className="flex pt-[28px] gap-3">
          {propertyImages.map((src, i) => (
            <div key={i} className="relative cursor-pointer group">
              <Image src={src} alt={`Property ${i}`} height={120} width={120} className="rounded-lg object-cover" />
              <div
                onClick={() => openPropertyPreview(i)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                 flex items-center justify-center transition-opacity"
              >
                <Eye className="text-white w-8 h-8" />
              </div>
            </div>
          ))}

        </div>
      </div>

     {isPropertyOpen && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-0"
    onClick={closePropertyPreview}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        closePropertyPreview();
      }}
      className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
    >
      <X size={20} className="sm:w-7 sm:h-7" />
    </button>

    {/* Prev Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        prevProperty();
      }}
      className="absolute left-4 sm:left-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
    >
      <ChevronLeft size={20} className="sm:w-10 sm:h-10" />
    </button>

    {/* Current Image - Using same classes as document modal */}
    <div
      className="w-full max-w-4xl max-h-[80vh] flex items-center justify-center p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={propertyImages[propertyIndex]}
        alt={`Property ${propertyIndex + 1}`}
        width={600}
        height={500}
        className="w-auto h-auto max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
      />
    </div>

    {/* Next Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        nextProperty();
      }}
      className="absolute right-4 sm:right-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
    >
      <ChevronRight size={20} className="sm:w-10 sm:h-10" />
    </button>

    {/* Image Counter */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
      {propertyIndex + 1} / {propertyImages.length}
    </div>
  </div>
)}

      {/*  Document Uploads Modal */}
      {isDocOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-0"
          onClick={closeDocPreview}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeDocPreview();
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
          >
            <X size={20} className="sm:w-7 sm:h-7" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevDoc();
            }}
            className="absolute left-4 sm:left-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
          >
            <ChevronLeft size={20} className="sm:w-10 sm:h-10" />
          </button>

          {/* Current Document */}
          <div
            className="w-full max-w-4xl max-h-[80vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={documentImages[docIndex]}
              alt={`Document ${docIndex + 1}`}
              width={600}
              height={500}
              className="w-auto h-auto max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextDoc();
            }}
            className="absolute right-4 sm:right-5 text-white p-2 cursor-pointer z-10 bg-black/50 rounded-full"
          >
            <ChevronRight size={20} className="sm:w-10 sm:h-10" />
          </button>

          {/* Document Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            {docIndex + 1} / {documentImages.length}
          </div>
        </div>
      )}
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
      {/* Document Uploads */}
      <div className="bg-[#121315] border border-[#2e2f31] rounded-xl p-5 mb-6">
        <div className="flex justify-between border-b border-b-[#2e2f31] pb-3 items-center mb-[28px]">
          <h3 className="font-semibold">Document Uploads</h3>
          <button className="text-[#EFFC76] underline cursor-pointer text-sm">Edit</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Government-issued ID", file: "/images/doc1.png" },
            { label: "Property Ownership Proof", file: "/images/doc2.png" },
            { label: "Safety Permits", file: "/images/doc3.png" },
            { label: "Insurance Certificate", file: "/images/doc4.png" },
          ].map((doc, i) => (
            <div key={i} className="flex flex-col">
              {/* Label with fixed height */}
              <div className="min-h-[40px] flex items-start mb-1">
                <p className="text-sm text-white/60 line-clamp-2">{doc.label}</p>
              </div>

              {/* Image container with fixed height */}
              <div
                className="relative w-full h-40 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => openDocPreview(i)}
              >
                <Image
                  src={doc.file}
                  alt={doc.label}
                  fill
                  className="object-cover"
                />

                {/* Hover Preview Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                    flex items-center justify-center transition-opacity">
                  <Eye className="text-white w-8 h-8" />
                </div>
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
