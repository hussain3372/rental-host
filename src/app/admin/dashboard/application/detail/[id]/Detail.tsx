"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { allProperties } from "@/app/admin/data/Info";
import TicketDrawer from "../../Drawer";
import Checklist from "./Checklist";

export default function ApplicationDetail() {
  const Credentials = [
    {
      id:1,
      img:"/images/apartment.svg",
      val:"Apartment",
      title:"Property Type"
    },
    {
      id:2,
      img:"/images/manager.svg",
      val:"Manager",
      title:"Ownership"
    },
    {
      id:3,
      img:"/images/date.svg",
      val:"Sep 12, 2024",
      title:"Submitted On"
    },
    {
      id:4,
      img:"/images/pending.svg",
      val:"Pending",
      title:"Status"
    },
  ]

  const { id } = useParams();
  const applicationId = Number(id);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [thumbnailsHeight, setThumbnailsHeight] = useState(0);
  const [notes, setNotes] = useState<string[]>([]); // Add state for notes

  const handleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  }

  // Handle note submission
  const handleNoteSubmit = (note: string) => {
    setNotes(prevNotes => [...prevNotes, note]);
  }

  // Get property by ID
  const application = allProperties.find((property) => property.id === applicationId);

  const [currentStep, setCurrentStep] = useState(0);

  // Effect to sync heights
  useEffect(() => {
    const updateHeight = () => {
      if (thumbnailsContainerRef.current) {
        const height = thumbnailsContainerRef.current.offsetHeight;
        setThumbnailsHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, [application]);

  // If application not found
  if (!application) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center">
          <Image src="/images/empty.png" alt='not found' width={220} height={220} />
          <h1 className="text-2xl mb-3 text-white font-medium leading-[28px]">No Applications Yet</h1>
          <p className="text-white/60 mb-6 max-w-[504px] font-regular text-[18px] leading-[22px]">Start your first application today to begin the process of certifying your property and tracking progress here.</p>
          <Link
            href="/dashboard/application"
            className="inline-block yellow-btn w-[150px] text-black px-6 py-3 rounded-lg hover:bg-[#e8f566] transition-colors"
          >
            Apply Now
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
    <div className="text-white relative">
      {isDrawerOpen && (
        <TicketDrawer onNoteSubmit={handleNoteSubmit} onClose={() => setIsDrawerOpen(false)} />
      )}

      {/* Breadcrumb */}
      <nav className="mb-4">
        <div className="flex items-center text-[12px] sm:text-[16px] gap-3 font-regular leading-[20px] text-white/60 ">
          <Link href="/admin/dashboard/application" className="hover:text-[#EFFC76]">
           Applications
          </Link>
          <Image src="/images/greater.svg" alt="linked" width={16} height={16} />
          <span className="text-white font-regular text-[12px] sm:text-[16px] leading-[20px] ">{application["Application Id"]}</span>
        </div>
      </nav>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
        <h1 className=" text-[16px] sm:text-[24px] font-medium leading-[28px] ">
          Coastal Hillside Estate with Panoramic City
        </h1>
        <button onClick={handleDrawer} className="text-[#EFFC76] opacity-80 hover:text-[#e8f566] underline cursor-pointer font-medium text-[12px] sm:text-[18px] leading-[22px] ">
          Add Note
        </button>
      </div>

      {/* Address */}
      <p className="text-white/80 font-medium leading-[20px] text-[12px] sm:text-[16px]  mb-[18px]">
        742 Evergreen Terrace, Springfield, Illinois, USA
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3 pt-5 pb-10 flex-wrap lg:flex-nowrap justify-between">
        { Credentials.map((item)=>(
          <div key={item.id} className="gap-3">
            <div className="flex items-center bg-[#121315] rounded-xl gap-4 p-5">
            <Image src={item.img} alt={item.title} width={48} height={48} />
            <div>
            <h2 className="font-medium text-[18px] leading-[22px] text-white">{item.val}</h2>
            <p className="text-white/80 font-regular text-[14px] leading-[18px] pt-2">{item.title}</p>
            </div>
            </div>
          </div>
        )) }
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Main Image Container - Height synced with thumbnails */}
        <div className=" w-full flex flex-col">
          <div
            className={`
    relative w-full rounded-lg overflow-hidden bg-gray-900
    ${thumbnailsHeight ? "hidden sm:block" : ""} 
  `}
            style={{ height: thumbnailsHeight || "auto" }}
          >
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

        {/* Thumbnail Gallery */}
        <div
          ref={thumbnailsContainerRef}
          className="  w-full  sm:w-[145px] max-h-full flex flex-nowrap  gap-3 sm:flex-col justify-center items-center"
        >
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[16/10] w-full sm:max-w-[145px]">
              <Image
                onClick={() => setCurrentStep(index)}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 gap-3 sm:gap-[40px] w-full">
        {/* Left Arrow */}
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="w-8 h-8 p-2 cursor-pointer rounded border border-gray-600 flex items-center justify-center hover:border-[#EFFC76] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <Image src="/images/left.svg" alt="back" width={24} height={24} />
        </button>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 sm:gap-10 flex-1 ">
          <span className=" text-white/60 leading-[20px] font-regular text-[16px]  flex-shrink-0">
            {String(currentStep + 1).padStart(2, "0")}
          </span>

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
          <Image src="/images/right.svg" alt="back" width={24} height={24} />
        </button>
      </div>
      
      {/* Description */}
      <div className="mt-[60px] ">
        <p className="text-white/80 font-normal text-[16px] sm:text-[18px] tracking-[0%] leading-[22px] text-justify">
          {application.title} at 1234 Maplewood Avenue, Austin, Texas is a fully verified and certified property. Featuring 4 bedrooms, 3 bathrooms, and a modern kitchen, this home combines comfort with trust. With a landscaped garden, private patio, and verified legal documentation, it offers both luxury and peace of mind. Each listing comes with a digital badge and QR code for instant authenticity checks.
        </p>
      </div>

      {/* Render Checklist component and pass notes as prop */}
      <Checklist notes={notes} />
    </div>
  );
}