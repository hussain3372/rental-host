"use client";
import { ChevronDown } from "lucide-react";

export default function Step1a() {
  return (
    <>
      <h2 className="text-2xl flex font-bold mt-2 mb-4">Enter Your Property Information</h2>
      <p className="text-gray-400 mb-8">
        Provide basic details about your property to begin the certification process.
        Make sure the information matches your official records.
      </p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400">Property name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full mt-2 px-4 py-3 bg-[#1a1a1a] rounded-md text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Property address</label>
          <input
            type="text"
            placeholder="Enter address"
            className="w-full mt-2 px-4 py-3 bg-[#1a1a1a] rounded-md text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Property type</label>
          <div className="relative mt-2">
            <select className="w-full appearance-none px-4 py-3 bg-[#1a1a1a] rounded-md text-white focus:outline-none">
              <option>Select type</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400">Ownership</label>
          <div className="relative mt-2">
            <select className="w-full appearance-none px-4 py-3 bg-[#1a1a1a] rounded-md text-white focus:outline-none">
              <option>Select ownership</option>
              <option>Owned</option>
              <option>Rented</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
}
