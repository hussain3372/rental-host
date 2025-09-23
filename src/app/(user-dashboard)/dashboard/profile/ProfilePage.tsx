'use client';
import React, { useState, useRef } from "react";
import Image from "next/image";
import { LogoutModal } from "./LogoutModal";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@gmail.com");
    const [isEditable, setIsEditable] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); const [profileImage, setProfileImage] = useState("/images/person.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleEditClick = () => {
        setIsEditable(true);
    };
    const router = useRouter();

   const handleLogout = () => {
  localStorage.removeItem("token"); 
  router.push("/auth/login");
};
    const handleChangePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };
    return (
        <div className="container-class text-white pb-[190px]">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-18 h-18 rounded-full overflow-hidden relative">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-[24px] font-medium leading-[28px] mb-1">{name}</h2>
                        <p className="text-[#FFFFFF66] text-[18px] leading-[22px] font-normal">{email}</p>
                    </div>
                </div>
                <button className=" text-[16px] leading-[20px] font-semibold flex justify-center items-center px-5 py-3 rounded-[8px] text-[#EFFC76] border border-[#EFFC76] hover:bg-[#EFFC76] hover:text-black transition"
                    onClick={handleChangePhotoClick}
                >
                    Change Photo
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex-1 relative bg-[#1b1b1d] p-5 rounded-xl">
                    <a
                        href="#"
                        className="absolute top-4 right-4 text-[#EFFC76] underline transition text-[16px] leading-[20px] font-normal"
                        onClick={handleEditClick}
                    >
                        Edit
                    </a>

                    <h3 className="text-[18px] leading-[22px] font-medium mb-2">Personal Information</h3>
                    <p className="mb-4 text-4 leading-5 font-normal" >
                        Keep your personal information accurate and up to date.
                    </p>
                    <form className="flex flex-col gap-4">
                        <div>
                            <label className="block text-[14px] leading-[18px] font-medium  mb-[10px]">Name</label>
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
                            <label className="block text-[14px] leading-[18px] font-medium  mb-[10px]">Email</label>
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

                <div className="relative rounded-[12px] border border-[rgba(0,0,0,0.04)] w-[435px] h-[282px] overflow-hidden">
                    <a
                        href="#"
                        className="absolute top-4 right-4 text-[#EFFC76] underline transition text-[16px] leading-[20px] font-normal"

                    >
                        Edit
                    </a>

                    <Image
                        src="/images/card-bg.png"
                        alt="Card Background"
                        fill
                        className="object-cover rounded-[12px]"
                    />

                    <div className="relative rounded-[12px] border border-[rgba(0,0,0,0.04)] w-[435px] h-[282px] overflow-hidden">
                        <a
                            href="#"
                            className="absolute top-4 right-4 text-[#EFFC76] underline z-10"
                        >
                            Edit
                        </a>

                        {/* Card Background Image */}
                        <Image
                            src="/images/card-bg.png"
                            alt="Card Background"
                            fill
                            className="object-cover rounded-[12px]"
                        />

                        <div className="absolute inset-0 p-5 text-white">
                            <div className="flex flex-col items-start">
                                <h3 className="text-[24px] font-medium leading-[28px] mb-6">John Doe</h3>

                                <Image
                                    src="/images/card-chip.png"
                                    alt="Card Icon"
                                    width={55}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>

                            <div className="absolute bottom-5 left-4 flex flex-col items-start">
                                <p className="text-[14px] leading-[18px] font-normal text-[#FFFFFFCC] mb-2">Card Number</p>
                                <p className="text-white text-[18px] leading-[22px] font-medium">2341-****-0987</p>
                            </div>

                            <div className="absolute bottom-5 right-4 flex flex-col items-end">
                                <p className="text-[14px] leading-[18px] font-normal text-[#FFFFFFCC] mb-2">CVC/CVV</p>
                                <p className="text-white text-[18px] leading-[22px] font-medium">*************</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <div className="relative flex flex-col bg-[#1b1b1d] p-5 rounded-xl cursor-pointer hover:bg-[#2a2a2c] transition"
                onClick={() => setIsLogoutModalOpen(true)}
            >
                <div className="flex flex-col">
                    <span className="text-[18px] leading-[22px] font-medium mb-2">Logout</span>
                    <p className="text-[#FFFFFF99] text-[16px] leading-5 font-normal">
                        End your current session securely. Logging out ensures your information stays private, especially on shared devices.
                    </p>
                </div>

                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Image
                        src="/images/arrow-right.png"
                        alt="Arrow Right"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                </div>
            </div>
          <LogoutModal
  isOpen={isLogoutModalOpen}
  onClose={() => setIsLogoutModalOpen(false)}
  onConfirm={handleLogout} 
/>


        </div>
    );
}