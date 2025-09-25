"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { allProperties } from "@/app/admin/data/info";

export default function ApplicationDetail() {
  const { id } = useParams();
  // Keep as string since IDs are strings like "TAQ-65432"
  const applicationId = Array.isArray(id) ? id[0] : id;
  const decodedId = applicationId ? decodeURIComponent(applicationId) : '';
  
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const [thumbnailsHeight, setThumbnailsHeight] = useState(0);

  // Find property by matching Application ID
  const application = allProperties.find((property) => property["Application ID"] === decodedId);

  const [currentStep, setCurrentStep] = useState(0);

  // Effect to sync heights
  useEffect(() => {
    const updateHeight = () => {
      if (thumbnailsContainerRef.current) {
        const height = thumbnailsContainerRef.current.offsetHeight;
        setThumbnailsHeight(height);
      }
    };

    // Initial measurement
    updateHeight();

    // Update on window resize
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, [application]); // Re-run when application changes

  // If application not found
  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center flex flex-col items-center justify-center">
          <Image src="/images/empty.png" alt='not found' width={220} height={220} />
          <h1 className="text-2xl mb-3 text-white font-medium leading-[28px]">Application Not Found</h1>
          <p className="text-white/60 mb-6 max-w-[504px] font-regular text-[18px] leading-[22px]">
            The application with ID &ldquo;{decodedId}&ldquo; could not be found. Please check the URL or return to applications list.
          </p>
          <Link
            href="/dashboard/applications"
            className="inline-block yellow-btn w-[200px] text-black px-6 py-3 rounded-lg hover:bg-[#e8f566] transition-colors"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const images = application.images || [];
  const totalSteps = images.length;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen text-white">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <div className="flex items-center text-[12px] sm:text-[16px] gap-3 font-regular leading-[20px] text-white/40 ">
          <Link href="/dashboard/applications" className="hover:text-[#EFFC76]">
            My Applications
          </Link>
          <Image src="/images/greater.svg" alt="linked" width={16} height={16} />
          <span className="text-white font-regular text-[12px] sm:text-[16px] leading-[20px] ">{application.title}</span>
        </div>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
        <h1 className=" text-[16px] sm:text-[24px] font-medium leading-[28px] ">
          {application.title}
        </h1>
        <button className="text-[#EFFC76] opacity-80 hover:text-[#e8f566] underline cursor-pointer font-medium text-[12px] sm:text-[18px] leading-[22px] ">
          Edit
        </button>
      </div>

      {/* Address */}
      <p className="text-white/80 font-medium leading-[20px] text-[12px] sm:text-[16px]  mb-[18px]">
        742 Evergreen Terrace, Springfield, Illinois, USA
      </p>

      {/* Status and ID Info */}
      <div className="flex items-center gap-4 mb-[18px]">
        <span className="text-white/60 text-sm">Application ID: {application["Application ID"]}</span>
        <span className={`px-2 py-1 rounded text-xs ${
          application.status === 'Verified' ? 'bg-green-500/20 text-green-400' :
          application.status === 'Expired' ? 'bg-red-500/20 text-red-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {application.status}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Main Image Container - Height synced with thumbnails */}
        <div className=" w-full flex flex-col">
          {/* Image with dynamic height matching thumbnails */}
          <div
            className={`
    relative w-full rounded-lg overflow-hidden bg-gray-900
    ${thumbnailsHeight ? "hidden sm:block" : ""} 
  `}
            style={{ height: thumbnailsHeight || "auto" }}
          >
            {/* Desktop/Tablet → Height synced */}
            <Image
              src={images[currentStep] || "/images/placeholder.jpg"}
              alt={`Property view ${currentStep + 1}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Mobile → Aspect ratio */}
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-gray-900 sm:hidden">
            <Image
              src={images[currentStep] || "/images/placeholder.jpg"}
              alt={`Property view ${currentStep + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Thumbnail Gallery - Reference for height measurement */}
        <div
          ref={thumbnailsContainerRef}
          className=" w-full max-w-[300px] sm:w-[145px] max-h-full flex  sm:flex-col justify-center items-center gap-3"
        >
          {images.map((image, index) => (
            <div key={index} className={`relative aspect-[16/10] w-full sm:max-w-[145px] cursor-pointer ${
              currentStep === index ? 'ring-2 ring-[#EFFC76]' : ''
            }`}>
              <Image
                onClick={() => setCurrentStep(index)}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 gap-3 sm:gap-[40px] w-full">
        {/* Left Arrow */}
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="w-8 h-8 p-2 cursor-pointer rounded border border-gray-600 flex items-center justify-center hover:border-[#EFFC76] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <Image src="/images/left.svg" alt="previous" width={24} height={24} />
        </button>

        {/* Progress Bar - Takes all remaining space */}
        <div className="flex items-center gap-3 sm:gap-10 flex-1 ">
          <span className=" text-white/60 leading-[20px] font-regular text-[16px]  flex-shrink-0">
            {String(currentStep + 1).padStart(2, "0")}
          </span>

          {/* Progress Bar - Full available width */}
          <div className="w-full h-[1px] bg-white/20 relative ">
            <div
              className="absolute top-0 left-0 h-full bg-[#EFFC76] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <span className="text-sm text-white/60 leading-[20px] font-regular text-[16px]  flex-shrink-0">
            {String(totalSteps).padStart(2, "0")}
          </span>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="w-8 h-8 rounded cursor-pointer p-2 border border-gray-600 flex items-center justify-center hover:border-[#EFFC76] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <Image src="/images/right.svg" alt="next" width={24} height={24} />
        </button>
      </div>

      {/* Description */}
      <div className="mt-[60px] max-w-[1134px]">
        <h2 className="text-white text-[20px] font-semibold mb-4">Property Details</h2>
        <p className="text-white/80 font-regular text-[16px] sm:text-[18px] tracking-[0%] leading-[22px] text-justify mb-6">
          {application.title} at 1234 Maplewood Avenue, Austin, Texas is a fully verified
          and certified property. Featuring 4 bedrooms, 3 bathrooms, and a modern kitchen,
          this home combines comfort with trust. With a landscaped garden, private patio,
          and verified legal documentation, it offers both luxury and peace of mind. Each
          listing comes with a digital badge and QR code for instant authenticity checks.
        </p>
        
        {/* Property Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium text-sm mb-2">Location</h3>
            <p className="text-white/60 text-sm">{application.location}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium text-sm mb-2">Author</h3>
            <p className="text-white/60 text-sm">{application.author}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium text-sm mb-2">Expiry Date</h3>
            <p className="text-white/60 text-sm">{application.expiry}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/dashboard/applications"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors text-center"
          >
            Back to Applications
          </Link>
          <button className="bg-[#EFFC76] hover:bg-[#e8f566] text-black font-semibold px-6 py-3 rounded-lg transition-colors">
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}