"use client";
import React from "react";

interface ChecklistItem {
  id: number;
  title: string;
  checked: boolean;
}

interface Step2Props {
  formData: {
    checklistItems: ChecklistItem[];
  };
  errors: { [key: string]: string };
  onFieldChange: (field: string, value: ChecklistItem[]) => void;
}

export default function Step2({ formData, errors, onFieldChange }: Step2Props) {
  const items = formData.checklistItems;

  const toggleCheck = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    onFieldChange("checklistItems", updatedItems);
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] sm:text-[28px] sm:leading-[32px] mb-3">
        Complete the Compliance Checklist
      </h3>
      <p className="text-white/60 font-regular text-[12px] sm:text-[16px] sm:leading-5 max-w-[573px]">
        Review and confirm that your property meets the required standards for
        certification.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mt-10">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <div
              className={`flex justify-between items-center rounded-lg p-3 transition-colors ${
                item.checked
                  ? "bg-[#1c1f14] border border-[#9ba44f]"
                  : "bg-gradient-to-b from-[#202020] to-[#101010]"
              }`}
            >
              <p className={` text-[14px] ${item.checked ? "" : ""}`}>
                {item.title}
              </p>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
                className="
                  appearance-none w-6 h-6      
                  bg-white/40 border border-white/40 rounded-sm 
                  checked:bg-[#EFFC76] checked:border-[#EFFC76] 
                  cursor-pointer 
                  relative 
                  checked:before:content-['✔'] 
                  checked:before:absolute 
                  checked:before:inset-0 
                  checked:before:flex 
                  checked:before:items-center 
                  checked:before:justify-center 
                  checked:before:text-black 
                  checked:before:text-[12px] 
                  checked:before:font-bold
                "
              />
            </div>
            
            {errors[`checklist_${item.id}`] && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors[`checklist_${item.id}`]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}