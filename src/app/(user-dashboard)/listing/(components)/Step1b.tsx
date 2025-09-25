"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Step1bProps {
  formData: {
    description: string;
    images: File[]; // Changed to array to support multiple images
  };
  errors: { [key: string]: string };
  onFieldChange: (field: string, value: string | File[]) => void;
}

export default function Step1b({ formData, errors, onFieldChange }: Step1bProps) {
  const [images, setImages] = useState<File[]>(formData.images || []);

 const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const newFiles = Array.from(e.target.files);

    // Merge with existing images
    const updatedFiles = [...images, ...newFiles];

    if (updatedFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages(updatedFiles);
    onFieldChange("images", updatedFiles);
  }
};


  const removeImage = (index: number) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    onFieldChange("images", newFiles);
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
      <div className="mb-6">
        <p className="font-medium text-[14px] leading-[18px] mb-[10px]">
          Description
        </p>
        <input
          placeholder="Describe your property"
          value={formData.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          type="text"
          className="w-full text-[14px] leading-[18px] font-regular py-[17px] px-3 bg-gradient-to-b from-[#202020] to-[#101010] rounded-lg border border-[#474747] focus:outline-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-b from-[#202020] to-[#101010] h-[180px] rounded-lg border-2 border-dashed border-[#EFFC76] flex flex-col items-center justify-center cursor-pointer relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <Image
          src="/images/upload.png"
          alt="Upload"
          width={40}
          height={40}
        />
        <p className="text-white mt-5 text-[16px] font-regular leading-5">
          Upload Images
        </p>
        <p className="text-[12px] text-white/60 mt-2 max-w-[346px] leading-[16px] font-regular text-center">
          Please upload a clear and readable file in JPG, or PNG format. The maximum file size allowed is 10MB.
        </p>
      </div>
      
      {errors.images && (
        <p className="text-red-500 text-sm mt-2">{errors.images}</p>
      )}

      {/* Image Count Status */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Image src="/images/warning.svg" 
                 alt="Status" height={20} width={20} />
          <p className={`text-[14px] text-[#FFB52B] font-regular leading-[18px]`}>
               Upload at least 3 images for faster approval.
            
          </p>
        </div>
      </div>

      {/* Images Preview */}
      {images.length > 0 && (
        <div className="mt-6">
          
          <div className="flex gap-4 flex-wrap">
            {images.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={index} className="relative w-[120px] h-[90px] rounded-lg overflow-hidden group">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-full h-full"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 cursor-pointer "
                  >
                    <Image src="/images/delete.svg" alt="remove image" height={30} width={30} />
                  </button>
                  
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}