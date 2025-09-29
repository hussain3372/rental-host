"use client";
import React from "react";
import Image from "next/image";


type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; 
};

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#121315CC] flex items-center justify-center z-[2020] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0A0C0B] rounded-[12px] p-5 max-w-[554px] w-full mx-4 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          ✕
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 relative">
              <Image src="/images/logout-image.png" alt="House" width={140} height={117} />
            </div>
          </div>
          <h2 className="text-white text-[18px] leading-[22px] font-semibold mb-2">
            Are you sure you want to log out?
          </h2>
          <div className="flex justify-center">
            <p className="text-[#FFFFFF99] text-[16px] mb-10 leading-5 font-normal max-w-[358px] w-full text-center">
              You’ll be signed out of your account. Make sure to save any changes before leaving.
            </p>
          </div>
          <button
            onClick={handleConfirm} 
            className="w-full mt-8 py-4 rounded-[8px] bg-[#EFFC76] text-[#121315] text-[18px]box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.29) inset, 0 -6px 6px 0 rgba(0, 0, 0, 0.26) inset, 0 -14px 8px 0 rgba(0, 0, 0, 0.15) inset, 0 -25px 10px 0 rgba(0, 0, 0, 0.04) inset, 0 -39px 11px 0 rgba(0, 0, 0, 0.01) inset;

 leading-[22px] font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
