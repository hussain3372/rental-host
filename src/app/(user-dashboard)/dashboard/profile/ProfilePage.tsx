'use client';
import React, { useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@gmail.com");
    const [isEditable, setIsEditable] = useState(false); 

    const handleEditClick = () => {
        setIsEditable(true); 
    };

    return (
        <div className="container-class text-white pt-[120px]">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/person.png"
                        alt="Profile"
                        width={72}
                        height={72}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <p className="text-gray-400">{email}</p>
                    </div>
                </div>
                <button className="flex justify-center items-center px-5 py-3 rounded-[8px] border border-[#EFFC76] hover:bg-[#EFFC76] hover:text-black transition">
                    Change Photo
                </button>
            </div>

            {/* Bottom Cards Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Left Card - Form */}
                <div className="flex-1 relative bg-[#1b1b1d] p-6 rounded-xl">
                    {/* Edit Link */}
                    <a
                        href="#"
                        className="absolute top-4 right-4 text-[#EFFC76] underline transition"
                        onClick={handleEditClick}
                    >
                        Edit
                    </a>

                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <form className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditable} // Disable input until edit
                                className={`w-full h-[52px] rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col justify-center items-start px-4 text-white ${!isEditable ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditable} // Disable input until edit
                                className={`w-full h-[52px] rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col justify-center items-start px-4 text-white ${!isEditable ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            />
                        </div>
                    </form>
                </div>

                {/* Right Card - Background Image */}
                <div className="relative rounded-[12px] border border-[rgba(0,0,0,0.04)] w-[435px] p-5 gap-2.5 overflow-hidden">
                    {/* Edit Link */}
                    <a
                        href="#"
                        className="absolute top-4 right-4 text-[#EFFC76] underline transition z-10"
                    >
                        Edit
                    </a>

                    {/* Card Background Image */}
                    <Image
                        src="/images/card-bg.png"
                        alt="Card Background"
                        fill
                        className="object-cover"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 p-4 text-white flex flex-col justify-between">
                        {/* Top Left: Name */}
                        <div className="flex flex-col items-start">
                            <h3 className="text-xl font-bold">John Doe</h3>

                            {/* Icon under Name */}
                            <Image
                                src="/images/card-chip.png"
                                alt="Card Icon"
                                width={55}
                                height={40}
                                className="object-contain mt-6"
                            />
                        </div>

                        {/* Bottom Left: Card Number in two lines */}
                        <div className="absolute bottom-4 left-4 flex flex-col items-start">
                            <p className="text-gray-300 text-sm">Card Number</p>
                            <p className="text-white font-bold">2341-****-0987</p>
                        </div>

                        {/* Bottom Right: CVC/CVV */}
                        <div className="absolute bottom-4 right-4 flex flex-col items-end">
                            <p className="text-gray-300 text-sm">CVC/CVV</p>
                            <p className="text-white font-bold">*************</p>
                        </div>
                    </div>
                </div>
            </div>

           
        <div className="flex flex-col bg-[#1b1b1d] p-4 rounded-xl cursor-pointer hover:bg-[#2a2a2c] transition"> {/* Top row: Logout text + arrow */} <div className="flex justify-between items-center mb-2"> <span>Logout</span> <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none"> <path d="M18.1296 7.98267L11.207 14.8001C11.077 14.9281 10.9007 15 10.7169 15C10.5331 15 10.3568 14.9281 10.2268 14.8001C10.0968 14.6721 10.0238 14.4984 10.0238 14.3174C10.0238 14.1364 10.0968 13.9627 10.2268 13.8347L15.9684 8.18174L1.02527 8.18174C0.841669 8.18174 0.66559 8.10991 0.535767 7.98206C0.405943 7.85421 0.333008 7.68081 0.333008 7.5C0.333008 7.31919 0.405943 7.14579 0.535767 7.01794C0.66559 6.89009 0.841669 6.81826 1.02527 6.81826L15.9684 6.81826L10.2268 1.16527C10.0968 1.03726 10.0238 0.863638 10.0238 0.682601C10.0238 0.501564 10.0968 0.327942 10.2268 0.199929C10.3568 0.0719168 10.5331 1.34883e-09 10.7169 0C10.9007 -1.34883e-09 11.077 0.0719168 11.207 0.199929L18.1296 7.01733C18.1941 7.08066 18.2452 7.15589 18.2801 7.23871C18.315 7.32154 18.333 7.41033 18.333 7.5C18.333 7.58967 18.315 7.67846 18.2801 7.76129C18.2452 7.84411 18.1941 7.91934 18.1296 7.98267Z" fill="white" fill-opacity="0.6" /> </svg> </div> {/* Bottom paragraph */} <p className="text-gray-400 text-sm"> End your current session securely. Logging out ensures your information stays private, especially on shared devices. </p> </div> </div>);
}