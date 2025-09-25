"use client";
import Image from "next/image";
// import { useState, useEffect } from "react";

interface Step1aProps {
  formData: {
    propertyName: string;
    propertyAddress: string;
    propertyType: string;
    ownership: string;
  };
  errors: { [key: string]: string };
    onFieldChange: (field: string, value: string) => void;
}

export default function Step1a({ formData, errors, onFieldChange }: Step1aProps) {
  return (
    <div className="flex flex-col !justify-center">
      <div>
        <h2 className="text-[28px] leading-[32px] flex font-bold  mb-3">Enter Your Property Information</h2>
        <p className="text-white/60 text-[16px] font-regular mb-10 max-w-[573px]">
          Provide basic details about your property to begin the certification process.
          Make sure the information matches your official records.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Property Name */}
          <div>
            <label className="block text-[14px] font-medium text-white">Property name</label>
            <input
              type="text"
              value={formData.propertyName}
              onChange={(e) => onFieldChange("propertyName", e.target.value)}
              placeholder="Enter name"
              className="w-full mt-2 px-4 py-3 bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg text-white placeholder:text-white/40 text-[14px] focus:outline-none"
            />
            {errors.propertyName && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>
            )}
          </div>
          
          {/* Property Address */}
          <div className="relative">
            <label className="block text-[14px] font-medium text-white">Property address</label>
            <input
              type="text"
              value={formData.propertyAddress}
              onChange={(e) => onFieldChange("propertyAddress", e.target.value)}
              placeholder="Enter address"
              className="w-full mt-2 px-4 py-3 bg-gradient-to-b from-[#202020] to-[#101010] border border-[#464646] rounded-lg text-white placeholder:text-white/40 focus:outline-none"
            />
            <Image src="/images/location-icon.svg" alt="Location" width={20} height={20} className="absolute top-[43px] right-4"/>
            {errors.propertyAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>
            )}
          </div>
          
          {/* Property Type */}
          <div>
            <label className="block text-[14px] font-medium text-white">Property type</label>
            <div className="relative w-full mt-4">
              <select
                value={formData.propertyType}
                onChange={(e) => onFieldChange("propertyType", e.target.value)}
                className={`
                  w-full px-4 py-3 pr-10 rounded-lg border border-[#464646] 
                  bg-gradient-to-b from-[#202020] focus:outline-none to-[#101010] 
                  text-[14px] font-medium
                  appearance-none
                  transition duration-200 ease-in-out
                  ${formData.propertyType === "" ? "text-white/40" : "text-white"}
                  cursor-pointer
                `}
              >
                <option value="" disabled>Select type</option>
                <option value="Residential" className="text-black">Residential</option>
                <option value="Commercial" className="text-black">Commercial</option>
              </select>
              <Image
                src="/images/dropdown.svg"
                alt="dropdown"
                width={15}
                height={8}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
            {errors.propertyType && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
            )}
          </div>
          
          {/* Ownership */}
          <div>
            <label className="block text-[14px] font-medium text-white">Ownership</label>
            <div className="relative w-full mt-4">
              <select
                value={formData.ownership}
                onChange={(e) => onFieldChange("ownership", e.target.value)}
                className={`
                  w-full px-4 py-3 pr-10 rounded-lg border border-[#464646] 
                  bg-gradient-to-b from-[#202020] to-[#101010] 
                  text-[14px] font-medium focus:outline-none
                  appearance-none
                  transition duration-200 ease-in-out
                  ${formData.ownership === "" ? "text-white/40" : "text-white"}
                  cursor-pointer
                `}
              >
                <option value="" disabled>Select ownership</option>
                <option value="Owned" className="text-black">Owner</option>
                <option value="Rented" className="text-black">Manager</option>
              </select>
              <Image
                src="/images/dropdown.svg"
                alt="dropdown"
                width={15}
                height={8}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
            {errors.ownership && (
              <p className="text-red-500 text-sm mt-1">{errors.ownership}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}