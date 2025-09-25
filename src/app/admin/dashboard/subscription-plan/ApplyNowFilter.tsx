"use client";
import { useState } from "react";
import { forwardRef } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type PaymentOptionsProps = {
    selectedPlan?: string;
    onClose?: () => void;
    onSubscribe: () => void;
};

export default function PaymentOptions({ onSubscribe }: PaymentOptionsProps) {
    const [selected, setSelected] = useState<"card" | "bank">("card");
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);



    const options = [
        {
            id: "card",
            title: "Credit / Debit Card",
            description: "Pay instantly using Visa, MasterCard, or other major cards.",
            icon: "/images/buyplan1.png",
        },
        {
            id: "bank",
            title: "Bank Transfer",
            description: "Transfer from your bank. Confirmation may take 1–2 days.",
            icon: "/images/atm-card.png",
        },
    ];
    type CustomDateInputProps = {
        value?: string;
        onClick?: () => void;
        placeholder?: string;
    };

    const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
        ({ value, onClick, placeholder }, ref) => (
            <div className="relative w-full">
                <input
                    ref={ref}
                    value={value}
                    onClick={onClick}
                    placeholder={placeholder}
                    readOnly
                    className="w-full p-3 pr-10 rounded-[10px] focus:outline-none focus:border-yellow-300 
          [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] text-white placeholder-gray-400"
                />
                <Image
                    src="/images/calender.svg"
                    alt="calendar"
                    width={20}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
            </div>
        )
    );
    CustomDateInput.displayName = "CustomDateInput";




    return (
        <>
            <div
                className="mx-auto p-7 text-white rounded-[12px] 
    border border-[#FFFFFF1F] 
    bg-[#0A0C0B] 
    shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-in-out"
            >
                <h2 className="text-[20px] leading-6 font-medium mb-3">
                    Complete Your Purchase
                </h2>
                <p className="text-[16px] leading-[20px] text-[#FFFFFF99] font-normal sm:mb-10 mb-6">
                    Enter your details to activate your subscription plan and start listing
                    your property with confidence.
                </p>

                {/* Options */}
                <div className="space-y-5">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => setSelected(option.id as "card" | "bank")}
                            className={`flex flex-col sm:flex-row items-center sm:justify-between p-3 cursor-pointer transition-all
        ${selected === option.id
                                    ? "rounded-lg border border-[rgba(239,252,118,0.60)] bg-[rgba(239,252,118,0.08)]"
                                    : "rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]"
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-[64px] h-[64px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.12)] mb-3 sm:mb-0">
                                <Image
                                    src={option.icon}
                                    alt={option.title}
                                    width={48}
                                    height={32}
                                />
                            </div>

                            {/* Title & Description */}
                            <div className="flex-1 px-0 sm:px-4 text-center sm:text-left mb-3 sm:mb-0">
                                <h3 className="text-[16px] font-normal leading-5 text-white">
                                    {option.title}
                                </h3>
                                <p className="text-[12px] text-[#FFFFFF99] leading-4 font-normal">
                                    {option.description}
                                </p>
                            </div>

                            {/* Radio Circle */}
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
          ${selected === option.id ? "border-[#EFFC76]" : "border-gray-500"}`}
                            >
                                {selected === option.id && (
                                    <div className="w-2.5 h-2.5 bg-[#EFFC76] rounded-full"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


                {/* Conditional fields */}
                {selected === "card" && (
                    <>
                        <span className="block mt-[40px] text-[18px] font-medium leading-[22px] text-white">
                            Add Your Card Details
                        </span>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Account holder name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Card number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter number"
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Expiry date
                                </label>
                                <DatePicker
                                    selected={expiryDate}
                                    onChange={(date: Date | null) => setExpiryDate(date)}
                                    customInput={<CustomDateInput />}
                                    dateFormat="MMM d, yyyy"
                                    placeholderText="Select date"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />

                            </div>


                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    CVC/CVV
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter CVC/CVV"
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </>
                )}

                {selected === "bank" && (
                    <>
                        <span className="block mt-[40px] text-[18px] font-medium leading-[22px] text-white">
                            Add Your Bank Details
                        </span>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Account holder name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Bank name
                                </label>
                                <select
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                >
                                    <option className="bg-[#202020]" value="">Select bank</option>
                                    <option className="bg-[#0A0C0B] text-white">Standard Chartered</option>
                                    <option className="bg-[#0A0C0B] text-white">Bank Alfalah</option>
                                    <option className="bg-[#0A0C0B] text-white">Meezan Bank</option>
                                    <option className="bg-[#0A0C0B] text-white">Faysal Bank</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    Account number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter number"
                                    className="w-full p-3 rounded-[10px] focus:outline-none focus:border-yellow-300 [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] text-white placeholder-gray-400 [color-scheme:dark]"
                                />
                            </div>

                            <div>
                                <label className="block text-[14px] leading-[18px] font-medium text-[#FFFFFF] mb-[10px]">
                                    BIC
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter BIC"
                                    className="w-full p-3 rounded-[10px] 
                   focus:outline-none focus:border-yellow-300
                   [background:radial-gradient(75%_81%_at_50%_18.4%,#202020_0%,#101010_100%)] 
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] 
                   text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={onSubscribe} className="  w-full mt-8 py-[16px] px-10 rounded-[8px]  bg-[#EFFC76] text-[#121315] 
    text-[18px] leading-[22px] font-semibold cursor-pointer
box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.29) inset, 0 -6px 6px 0 rgba(0, 0, 0, 0.26) inset, 0 -14px 8px 0 rgba(0, 0, 0, 0.15) inset, 0 -25px 10px 0 rgba(0, 0, 0, 0.04) inset, 0 -39px 11px 0 rgba(0, 0, 0, 0.01) inset;
   
   "
                >
                    Subscribe
                </button>
            </div>

        </>

    );
}
