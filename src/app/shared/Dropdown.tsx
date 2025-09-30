"use client";
import React, { useEffect, useRef } from "react";

interface DropdownProps {
  items: { label: string; onClick: () => void }[];
  isOpen?: boolean;
  onClose?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isOpen = true, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-0 right-14 mt-1 z-50 flex flex-col items-start  w-[150px] rounded-[10px] 
                 bg-[radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2"
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose?.(); // ✅ close after click
          }}
          className="w-full text-left px-3 py-2 rounded-md text-white/90 text-sm 
                     hover:text-white hover:bg-white/10 cursor-pointer active:scale-[0.98] 
                     transition-all duration-150 ease-out"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
