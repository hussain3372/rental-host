"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { X } from "lucide-react";

export default function Step1b() {
  const [images, setImages] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 10)); // max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="font-bold text-[20px] sm:text-[28px] leading-[32px] mb-3">
        Upload Property Images
      </h2>
      <p className="max-w-[573px] text-white/60 font-regular text-[12px] sm:text-[16px] leading-5 mb-10">
        Add clear photos of your property to complete the verification process.
        Make sure images are well-lit and capture all required angles.
      </p>

      {/* Description */}
      <div>
        <p className="font-medium text-[14px] leading-[18px] mb-[10px]">
          Description
        </p>
        <input
          placeholder="Describe your property"
          type="text"
          className="w-full text-[14px] leading-[18px] font-regular py-[17px] px-3 bg-gradient-to-b from-[#202020] to-[#101010] rounded-lg border border-[#474747] focus:outline-none"
        />
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-b from-[#202020] to-[#101010] h-[180px] mt-5 rounded-lg border-3 border-dashed border-[#EFFC76] flex flex-col items-center justify-center cursor-pointer relative">
        <input
          type="file"
          accept="image/* , image/*jpg , image/*png"
          multiple
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <Image
          src="/images/upload.png" // replace with your upload icon
          alt="Upload"
          width={40}
          height={40}
        />
        <p className="text-white mt-5  text-[16px] font-regular leading-5">
          Upload Images
        </p>
        <p className="text-[12px] text-white/60 mt-2 max-w-[346px] leading-[16px] font-regular text-center">
         Please upload a clear and readable file in PDF, JPG, or PNG format. The maximum file size allowed is 10MB.
        </p>
      </div>
      { images.length < 3 &&
      <div className="mt-4">
            <div className="flex items-center gap-2">
                <Image src="/images/warning.svg" alt="Warning" height={20} width={20}/>
          <p className="text-[14px] text-[#FFB52B]">
             Upload at least 3 images  for faster approval.
          </p>
          </div>
       
      </div>
}

      {/* Images Preview */}
      {images.length > 0 && (
        <div className="flex gap-4 mt-5 flex-wrap">
          {images.map((file, index) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={index} className="relative w-[120px] h-[90px] rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt="Preview"
                  width={120}
                  height={90}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <Image src="/images/delete.svg" alt="remove image" height={24} width={24}/>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Error / Continue */}
      
    </div>
  );
}
