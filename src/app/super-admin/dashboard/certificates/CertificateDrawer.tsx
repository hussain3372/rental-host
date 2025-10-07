"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface DrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

interface DropdownProps {
  items: { label: string; onClick: () => void; disabled?: boolean }[];
  isOpen?: boolean;
  onClose?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  isOpen = true,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: { onClick: () => void; disabled?: boolean }) => {
    if (!item.disabled) {
      item.onClick();
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-1 flex flex-col items-start w-full rounded-[10px] 
                 bg-[radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 border border-gray-700 z-50
                 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] animate-in fade-in-0 zoom-in-95"
    >
      {items.map((item, index) => (
        <button
          key={index}
          disabled={item.disabled}
          onClick={() => handleItemClick(item)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${item.disabled
              ? "text-white/40 opacity-50 cursor-not-allowed"
              : "text-white/90 hover:text-white hover:bg-white/10 cursor-pointer active:scale-[0.98]"
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

Dropdown.displayName = "Dropdown";

const AddCertificateDrawer: React.FC<DrawerProps> = ({ onClose, isOpen }) => {
  const [certificateName, setCertificateName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [validity, setValidity] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Dropdown states
  const [propertyTypeDropdownOpen, setPropertyTypeDropdownOpen] = useState(false);
  const [validityDropdownOpen, setValidityDropdownOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Property type options
  const propertyTypeOptions = [
    { label: "Residential", onClick: () => setPropertyType("Residential") },
    { label: "Commercial", onClick: () => setPropertyType("Commercial") },
    { label: "Industrial", onClick: () => setPropertyType("Industrial") },
    { label: "Agricultural", onClick: () => setPropertyType("Agricultural") },
  ];

  // Validity options
  const validityOptions = [
    { label: "1 Year", onClick: () => setValidity("1 Year") },
    { label: "2 Years", onClick: () => setValidity("2 Years") },
    { label: "3 Years", onClick: () => setValidity("3 Years") },
    { label: "5 Years", onClick: () => setValidity("5 Years") },
    { label: "Permanent", onClick: () => setValidity("Permanent") },
  ];

  // Handle mount/unmount with smooth transitions
  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (!isOpen && isMounted) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove image
 

  // Handle form submission
  const handleAddCertificate = () => {
    const certificateData = {
      certificateName,
      propertyType,
      validity,
      images: images.map(file => file.name),
    };
    
    console.log("Adding certificate:", certificateData);
    alert("Certificate Added Successfully!");
    
    // Reset form
    setCertificateName("");
    setPropertyType("");
    setValidity("");
    setImages([]);
    setImagePreviews([]);
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Close drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }

    if (isMounted) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMounted, onClose]);

  // Close on Escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isMounted) {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }

    if (isMounted) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMounted, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMounted]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleOverlayClick}
      />
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 overflow-auto scrollbar-hide right-0 h-full bg-[#0A0C0B] border-l border-l-[#FFFFFF1F] text-white flex flex-col justify-between p-[28px] w-[90vw] sm:w-[608px] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Heading */}
        <div>
          <h2 className="text-[20px] font-medium mb-3 transition-all duration-300 ease-out">Add New Certificate</h2>
          <p className="text-[#FFFFFF99] text-[16px] mb-10 leading-5 transition-all duration-300 ease-out">
            Fill in the certificate details and compliance information to issue a new certification for a property.
          </p>

          {/* Certificate Name */}
          <div className="mb-5">
            <label className="block text-[14px] text-[#FFFFFF] font-medium mb-[10px] transition-all duration-300 ease-out">
              Certificate name
            </label>
            <input
              type="text"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Enter name"
              className="w-full h-[46px] bg-[#1a1a1a] text-white text-sm rounded-md px-3 border border-[#2b2b2b] 
                        focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gray-500
                        focus:border-[#f8f94d] focus:shadow-[0_0_0_2px_rgba(248,249,77,0.1)] placeholder:text-white/40"
            />
          </div>

          {/* Property Type */}
          <div className="mb-5 relative">
            <label className="block text-[14px] font-medium text-white mb-2 transition-all duration-300 ease-out">
              Property type
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setPropertyTypeDropdownOpen(!propertyTypeDropdownOpen);
                  setValidityDropdownOpen(false);
                }}
                className={`w-full h-[46px] bg-[#1a1a1a] text-sm rounded-md pl-3 pr-10 border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-left ${
                  propertyType ? "text-white border-[#2b2b2b]" : "text-white/40 border-[#2b2b2b]"
                } ${propertyTypeDropdownOpen ? "border-gray-500" : "hover:border-gray-500"}`}
              >
                {propertyType || "Select type"}
              </button>
              <Image
                src="/images/dropdown.svg"
                alt="dropdown"
                height={20}
                width={20}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  propertyTypeDropdownOpen ? "rotate-180" : ""
                }`}
              />
              <Dropdown
                items={propertyTypeOptions}
                isOpen={propertyTypeDropdownOpen}
                onClose={() => setPropertyTypeDropdownOpen(false)}
              />
            </div>
          </div>

          {/* Certificate Validity */}
          <div className="mb-5 relative">
            <label className="block text-[14px] font-medium text-white mb-2 transition-all duration-300 ease-out">
              Certificate validity
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setValidityDropdownOpen(!validityDropdownOpen);
                  setPropertyTypeDropdownOpen(false);
                }}
                className={`w-full h-[46px] bg-[#1a1a1a] text-sm rounded-md pl-3 pr-10 border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-left ${
                  validity ? "text-white border-[#2b2b2b]" : "text-white/40 border-[#2b2b2b]"
                } ${validityDropdownOpen ? "border-gray-500" : "hover:border-gray-500"}`}
              >
                {validity || "Select validity"}
              </button>
              <Image
                src="/images/dropdown.svg"
                alt="dropdown"
                height={20}
                width={20}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  validityDropdownOpen ? "rotate-180" : ""
                }`}
              />
              <Dropdown
                items={validityOptions}
                isOpen={validityDropdownOpen}
                onClose={() => setValidityDropdownOpen(false)}
              />
            </div>
          </div>

          {/* Upload Certificate Images */}
          <div className="mb-[50px] mt-10 transition-all duration-300 ease-out">
            {/* File Upload Area */}
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-[#EFFC76] rounded-md p-6 text-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer min-h-[200px] flex items-center justify-center hover:bg-[#EFFC76]/5 active:scale-[0.99]"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="certificate-upload"
              />
              
              {imagePreviews.length === 0 ? (
                // Default upload state
                <div className="flex flex-col items-center justify-center transition-all duration-300 ease-out">
                  <Image
                    src="/images/upload.png"
                    alt="upload"
                    width={40}
                    height={40}
                    className="mb-3 transition-all duration-300 ease-out"
                  />
                  <p className="text-white text-[16px] font-regular mb-2 transition-all duration-300 ease-out">
                    Upload Certificate Images
                  </p>
                  <p className="text-[#FFFFFF99] text-[12px] max-w-[242px] font-regular text-center transition-all duration-300 ease-out">
                   Attach the official certificate image for record and verification.
                  </p>
                </div>
              ) : (
                // Image previews grid
                <div className="w-full transition-all duration-300 ease-out">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-md  border border-[#2b2b2b] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gray-500 hover:scale-[1.02]"
                      >
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover transition-all duration-300 ease-out"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Certificate Button */}
        <div className="transition-all duration-300 ease-out">
          <button
            onClick={handleAddCertificate}
            className="w-full h-[52px] py-4 text-[18px] font-semibold rounded-md yellow-btn text-black text-sm 
                      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:scale-[1.02] active:scale-[0.98]"
          >
            Add Certificate
          </button>
        </div>
      </div>
    </>
  );
};

AddCertificateDrawer.displayName = "AddCertificateDrawer";

export default AddCertificateDrawer;