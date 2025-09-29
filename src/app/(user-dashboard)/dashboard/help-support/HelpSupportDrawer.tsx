"use client";
import React, { useState } from "react";
import Image from "next/image";
type HelpSupportDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HelpSupportDrawer({ onClose }: HelpSupportDrawerProps) {

    const [issueType, setIssueType] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="h-full flex flex-col text-white">
            {/* Top content */}
            <div className="space-y-5">
                <h2 className="text-[20px] leading-6 font-medium mb-3">
                    Help & Support
                </h2>
                <p className="text-[16px] leading-5 font-normal mb-10 text-[#FFFFFF99]">
                    View and update your personal details to keep your account information accurate.
                </p>

                <div>
                    <label className="text-white text-sm font-medium mb-3 block">
                        Issue Type
                    </label>
                    <div className="relative">
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                        >
                            <option className="text-black bg-[#121315] text-white" value="">
                                Select type
                            </option>
                            <option className="text-black bg-[#121315] text-white" value="account">
                                Account Issue
                            </option>
                            <option className="text-black bg-[#121315] text-white" value="payment">
                                Payment Problem
                            </option>
                            <option className="text-black bg-[#121315] text-white" value="bug">
                                Report a Bug
                            </option>
                            <option className="text-black bg-[#121315] text-white" value="other">
                                Other
                            </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-[14px] leading-[18px] font-medium mb-[10px]">Subject</label>
                    <input
                        placeholder="Enter subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                    />
                </div>

                {/* Description */}
                <div className="mb-10">
                    <label className="block text-[14px] leading-[18px] font-medium mb-[10px]">Description</label>
                    <textarea
                        placeholder="Describe your problem..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-gradient-to-b from-[#202020] to-[#101010] border rounded-xl text-white/40 px-4 py-3 text-sm border-[#404040] focus:border-[#EFFC76] focus:outline-none appearance-none"
                        rows={4}
                    />
                </div>
                <div>
                    <label
                        className="flex flex-col justify-center items-center text-center  rounded-[10px] border border-dashed border-[#EFFC76] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                        style={{ height: "180px", padding: "12px", cursor: "pointer" }}
                    >
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {image ? (
                            <div className="mt-3 w-full flex justify-center">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    width={200}
                                    height={100}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        ) : (
                            <>
                                {/* Upload Icon */}
                                <Image
                                    src="/images/image-upload.png"
                                    alt="Upload"
                                    width={40}
                                    height={40}
                                    className="mb-5 object-cover"
                                />
                                <h3 className="text-[#FFFFFF] text-[16px] leading-5 font-normal mb-2">
                                    Upload File
                                </h3>
                                <p className="text-[#FFFFFF99] text-[12px] leading-[16px] font-normal max-w-[346px] w-full">
                                    Please upload a clear and readable file in PDF, JPG, or PNG format.
                                    The maximum file size allowed is 10MB.
                                </p>
                            </>
                        )}

                    </label>
                </div>
            </div>
            <div className="mt-5 pb-5">
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-[#EFFC76] text-[#121315] rounded-[8px] text-[18px] leading-[22px] font-semibold cursor-pointer"
                >
                    Report Issue
                </button>
            </div>
        </div>

    );
}
