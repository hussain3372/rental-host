"use client";
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

const AddPropertyDrawer: React.FC<DrawerProps> = ({ onClose, isOpen }) => {
  const [certificateName, setCertificateName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [validity, setValidity] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Handle form submission
  const handleAddCertificate = () => {
    const certificateData = {
      certificateName,
      propertyType,
      validity,
    };
    
    console.log("Adding certificate:", certificateData);
    alert("Property Added Successfully!");
    
    // Reset form
    setCertificateName("");
    setPropertyType("");
    setValidity("");
    setIsVisible(false);
    setTimeout(onClose, 300);
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

  const rules = [
    "Fire safety equipment (extinguishers, alarms, exit plan)",
    "Waste disposal system compliance",
    "Maintenance/inspection report",
    "Utility bills (electricity/water matching address)"
  ];

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
        className={`fixed top-0 right-0 h-full bg-[#0A0C0B] border-l border-l-[#FFFFFF1F] text-white flex flex-col justify-between p-[28px] w-[90vw] sm:w-[608px] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Heading */}
        <div>
          <h2 className="text-[20px] font-medium mb-3 transition-all duration-300 ease-out">Add New Property Type</h2>
          <p className="text-[#FFFFFF99] text-[16px] mb-10 leading-5 transition-all duration-300 ease-out">
            Define a property category and set up rules for its certification.
          </p>

          {/* Certificate Name */}
          <div className="mb-5">
            <label className="block text-[14px] text-[#FFFFFF] font-medium mb-[10px] transition-all duration-300 ease-out">
             Property type name
            </label>
            <input
              type="text"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Enter name"
              className="w-full h-[52px] bg-[#1a1a1a] text-white text-sm rounded-md px-3 border border-[#2b2b2b] 
                        focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gray-500
                        focus:border-[#f8f94d] focus:shadow-[0_0_0_2px_rgba(248,249,77,0.1)] placeholder:text-white/40"
            />
            
            <div className="pt-5 pb-3 flex items-center justify-between transition-all duration-300 ease-out">
              <p className="text-[14px] font-medium leading-[18px]">Add compliance rule</p> 
              <p className="text-[16px] font-regular leading-5 cursor-pointer text-[#EFFC76] underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-80 active:scale-95">
                Add Rule
              </p>
            </div>
            
            <div className="flex flex-col gap-[10px] transition-all duration-300 ease-out">
              {rules.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-b from-[#202020] to-[#101010] py-[17px] px-3 border border-[#FFFFFF1F] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-white/30"
                >
                  <p className="font-regular leading-[18px] text-[14px] text-[#FFFFFF]">{item}</p> 
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transition-all duration-300 ease-out">
          <button
            onClick={handleAddCertificate}
            className="w-full h-[52px] py-4 text-[18px] font-semibold rounded-md yellow-btn text-black text-sm 
                      transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:scale-[1.02] active:scale-[0.98]"
          >
            Add Property Type
          </button>
        </div>
      </div>
    </>
  );
};

AddPropertyDrawer.displayName = "AddPropertyDrawer";

export default AddPropertyDrawer;