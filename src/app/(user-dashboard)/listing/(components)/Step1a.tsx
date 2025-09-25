"use client";
import Image from "next/image";
import { useState } from "react";
// import { ChevronDown } from "lucide-react";

export default function Step1a() {
  const [propertyType, setPropertyType] = useState("");
  const [ownership, setOwnership] = useState("");

  return (
    <div className="flex flex-col !justify-center">
      <div>
        <h2 className="text-[28px] leading-[32px] flex font-bold  mb-3">Enter Your Property Information</h2>
        <p className="text-white/60 text-[16px] font-regular mb-10 max-w-[573px]">
          Provide basic details about your property to begin the certification process.
          Make sure the information matches your official records.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[14px] font-medium text-white">Property name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full mt-2 px-4 py-3  bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg  text-white placeholder:text-white/40 text-[14px] focus:outline-none"
            />
          </div>
          <div className="relative">
            <label className="block text-[14px] font-medium text-white">Property address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full mt-2 px-4 py-3  bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg  text-white placeholder:text-white/40 focus:outline-none"
            />
            <Image src="/images/location-icon.svg" alt="Location" width={20} height={20} className="absolute top-[43px] right-4"/>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-white">Property type</label>
            <div className="relative w-full mt-4 px-4 py-3 bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg text-[14px] focus:outline-none">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={`w-full appearance-none focus:outline-none ${
                  propertyType === "" ? "text-white/40" : "text-white"
                }`}
              >
                <option value="" disabled>Select type</option>
                <option value="Residential" className="text-black">Residential</option>
                <option value="Commercial" className="text-black">Commercial</option>
              </select>
              <Image src="/images/dropdown.svg" alt="dropdown" width={15} height={8} className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-white">Ownership</label>
            <div className="relative  w-full mt-4 px-4 py-3 bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg text-[14px] focus:outline-none">
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className={`w-full appearance-none focus:outline-none ${
                  ownership === "" ? "text-white/40" : "text-white"
                }`}
              >
                <option value="" disabled>Select ownership</option>
                <option value="Owned" className="text-black">Owner</option>
                <option value="Rented" className="text-black">Manager</option>
              </select>
              <Image src="/images/dropdown.svg" alt="dropdown" width={15} height={8} className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
