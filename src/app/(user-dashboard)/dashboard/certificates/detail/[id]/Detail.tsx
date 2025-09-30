"use client";
import Link from "next/link"; 
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { allProperties } from "@/app/(main)/search-page/data/properties";
// import StatusPill from "@/app/shared/StatusPills";
export default function Detail() {
  const { id } = useParams();
  const propertyId = Number(id);

  // Get property by ID
  const property = allProperties.find((p) => p.id === propertyId);

  const [currentStep, setCurrentStep] = useState(0);

  // If property not found
  if (!property) {
    return (
      <div className="pt-[150px] text-center text-white">
        <h1>Property Not Found</h1>
      </div>
    );
  }

  const handleDownload = (filePath: string, fileName?: string) => {
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName || filePath.split('/').pop() || 'download';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const images = property.images || [property.images]; // fallback if only one image
const totalSteps = images.length;


  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  // const getVariantFromStatus = (
  //   status: string
  // ): "success" | "error" | "warning" | "info" | "default" => {
  //   switch (status) {
  //     case "Verified":
  //       return "success";
  //     case "Expired":
  //       return "error";
  //     case "Near Expiry":
  //       return "warning";
  //     default:
  //       return "default";
  //   }
  // };
  return (
    <div className="">
      <nav
        className="flex py-3 mb-5 text-gray-200 rounded-lg bg-transparent"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/dashboard/certificates"
              className=" text-[16px]  font-regular leading-5  text-white/60  hover:text-[#EFFC76] md:ms-2"
            >
              My Certificates
            </Link>
          </li>

          

          <li aria-current="page">
            <div className="flex items-center">
              {/* Arrow */}
              <svg
                className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <p className="text-[16px] leading-5 font-regular text-white">
                {property.title}
              </p>
            </div>
          </li>
        </ol>
      </nav>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 items-start sm:items-center">
        <h1 className=" text-[24px]  font-medium leading-[28px] text-white">
          {property.title}
        </h1>
<button 
  onClick={() => handleDownload('/docs/certificates.pdf')} 
  className="yellow-btn text-black py-3 px-5 font-semibold text-[16px] leading-[20px]"
>
  Download Certificate
</button>
      </div>

      <p className="text-white/60 text-[16px]  pt-[8px] leading-5 font-regular">
        {/* You can add dynamic address field later */}
        742 Evergreen Terrace, Springfield, Illinois, USA
      </p>

      {/* Image Slider */}
      {/* Image Slider with Thumbnails */}
<div className="mt-8 sm:mt-[38px] flex flex-col sm:flex-row gap-4">
  {/* Left Large Image */}
  <div className="flex-1  h-[500px] overflow-hidden bg-gray-800 rounded-xl">
    <Image
      src={images[currentStep]}
      alt={`Property view ${currentStep + 1}`}
      width={1200}
      height={500}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Thumbnails */}
  <div className="sm:w-[145px]  flex sm:flex-col gap-2">
    {images.map((img, index) => (
      <button
        key={index}
        onClick={() => setCurrentStep(index)}
        className={`relative flex-1 rounded-lg overflow-hidden  transition-all `}
      >
        <Image
          src={img}
          alt={`Thumbnail ${index + 1}`}
          width={120}
          height={100}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
</div>


      {/* Progress Navigation */}
      <div className="mt-8 pb-[40px] sm:pb-[60px]">
        <div className="flex items-center gap-[20px] sm:gap-[40px] w-full">
          {/* Left Arrow */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-10 h-10 rounded border border-gray-600 flex items-center justify-center hover:border-[#EFFC76] cursor-pointer"
          >
            <Image
              src="/images/left.png"
              alt="Previous"
              width={11}
              height={13}
              
            />
          </button>

          {/* Progress Line */}
          <div className="flex-1 flex items-center gap-[20px] sm:gap-[40px]">
            <div className="text-white opacity-60 text-lg font-medium">
              {String(currentStep + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 relative h-[2px] bg-gray-600 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-[#EFFC76] transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="text-white opacity-60 text-lg font-medium">
              {String(totalSteps).padStart(2, "0")}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="w-10 h-10 rounded border border-gray-600 flex items-center justify-center hover:border-[#EFFC76] cursor-pointer" 
          >
            <Image src="/images/right.png" alt="Next" width={11} height={13} />
          </button>
        </div>
      </div>

      {/* Property Description */}
      <p className="text-[#FFFFFFCC] text-[18px] font-regular leading-[22px] ">
        {property.title} at {property.expiry} is a fully verified and certified property. Featuring 4 bedrooms, 3 bathrooms, and a modern kitchen, this home combines comfort with trust. With a landscaped garden, private patio, and verified legal documentation, it offers both luxury and peace of mind. Each listing comes with a digital badge and QR code for instant authenticity checks.
      </p>
    </div>
  );
}
