"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type EditProfileDrawerProps = {
  onSave: (currentPassword: string, newPassword: string) => void;
  onClose: () => void;
};

export default function EditProfileDrawer({  onClose }: EditProfileDrawerProps) {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="h-full flex flex-col justify-between text-white">
      {/* Top content */}
      <div className="space-y-5">
        <h2 className="text-[20px] leading-6 font-medium mb-3">
          Manage Your Password
        </h2>
        <p className="text-[16px] leading-5 font-normal mb-10 text-[#FFFFFF99]">
          Update your password anytime for better security, or reset it if
          you’ve forgotten the current one.
        </p>

        {/* Current Password */}
        <div className="relative">
          <label className="block text-[14px] font-medium mb-[10px]">
            Current password
          </label>
          <input
            placeholder="Enter password"
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[46px] text-gray-400"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="absolute right-0 -bottom-6 text-sm text-[#fff] cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-[14px] font-medium mb-[10px]">
            New password
          </label>
          <input
            placeholder="Enter new password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[46px] text-gray-400"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-[14px] font-medium mb-[10px]">
            Confirm new password
          </label>
          <input
            placeholder="Enter confirm new password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-[10px] bg-[radial-gradient(75%_81%_at_50%_18.4%,_#202020_0%,_#101010_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[46px] text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Bottom button */}
      <div className="mt-6">
        <button
          onClick={() => {
            toast.success("Your password changed successfully");
            setTimeout(() => {
              onClose(); // ✅ works now
            }, 800);
          }}
          className="w-full py-3 bg-[#EFFC76] text-[#121315] rounded-lg font-semibold cursor-pointer"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
