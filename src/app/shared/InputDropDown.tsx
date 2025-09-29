"use client";
import React from "react";

interface DropdownProps {
  items: { label: string; onClick: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div
      className="flex flex-col items-start gap-1.5 w-full rounded-xl 
                 border border-white/5 
                 bg-[radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.4)]
                 p-2 backdrop-blur-sm transition-all duration-200"
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
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
