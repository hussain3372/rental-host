"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Property } from "@/app/types";

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Property[];
};

export default function SearchDrawer({ isOpen, onClose, data }: SearchDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Property[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
  }, [searchQuery, data]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-[#121315CC] flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[608px] bg-[#0A0C0B] p-7 h-full overflow-y-auto rounded-[12px] border border-[#FFFFFF1F]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="relative mb-6">
          <Image
            src="/images/search.png"
            alt="Search"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full pl-10 pr-10 p-3 rounded-[8px] bg-[#1F1F1F] text-white outline-none "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#FFFFFF99]  cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

       <div>
  {searchQuery ? (
    results.length > 0 ? (
      <ul className="flex flex-col gap-3">
        {results.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-5 p-3 bg-[rgba(255,255,255,0.08)] rounded-[12px]"
          >
            {/* Card Image */}
            <div className="w-[60px] h-[60px] flex-shrink-0 rounded-[100px] overflow-hidden">
              <Image
                src={item.images[0] || "/images/search.png"}
                alt={item.title}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Card Content */}
            <div className="flex-1">
              <p className="text-white font-semibold text-lg">{item.title}</p>
              <p className="text-[#FFFFFF99] text-[14px] leading-[18px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
<p className="text-white">
  No results found for &quot;{searchQuery}&quot;
</p>
    )
  ) : (
    <p className="text-white">Enter a query to search the website</p>
  )}
</div>

      </div>
    </div>
  );
}