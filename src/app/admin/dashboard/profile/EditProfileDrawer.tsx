"use client";
import React, { useState } from "react";

type EditProfileDrawerProps = {
    initialName: string;
    initialEmail: string;
    onSave: (name: string, email: string) => void;
    onClose: () => void;
};

export default function EditProfileDrawer({
    initialName,
    initialEmail,
    onSave,
}: EditProfileDrawerProps) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);

    return (
        <div className="h-full flex flex-col justify-between text-white">
            {/* Top content */}
            <div className="space-y-5">
                <h2 className="text-[20px] leading-6 font-medium mb-3 ">Profile Information</h2>
                <p className="text-[16px] leading-5 font-normal mb-10 text-[#FFFFFF99]">
                    View and update your personal details to keep your account information accurate.
                </p>
                <div>
                    <label className="block text-[14px] leading-[18px] font-medium mb-[10px]">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                    />
                </div>

                <div>
                    <label className="block text-[14px] leading-[18px] font-medium mb-[10px]">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                    />
                </div>
            </div>

            {/* Bottom button */}
            <div className="mt-6">
                <button
                    onClick={() => onSave(name, email)}
                    className="w-full py-3 bg-[#EFFC76] text-[#121315] rounded-[8px] font-semibold cursor-pointer box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.29) inset, 0 -6px 6px 0 rgba(0, 0, 0, 0.26) inset, 0 -14px 8px 0 rgba(0, 0, 0, 0.15) inset, 0 -25px 10px 0 rgba(0, 0, 0, 0.04) inset, 0 -39px 11px 0 rgba(0, 0, 0, 0.01) inset;
"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
