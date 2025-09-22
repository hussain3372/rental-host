"use client";
import React, { useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/app/shared/toggles";

interface PreferenceItemProps {
  title: string;
  description: string;
  hasToggle?: boolean;
  hasArrow?: boolean;
  toggleState?: boolean;
  onToggleChange?: () => void;

  trackWidth?: string;
  trackHeight?: string;
  thumbSize?: string;
  iconSize?: string;
  thumbTranslate?: string;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({
  title,
  description,
  hasToggle = false,
  hasArrow = false,
  toggleState,
  onToggleChange,
  trackWidth,
  trackHeight,
  thumbSize,
  iconSize,
  thumbTranslate,
}) => (
  <div className="flex items-center justify-between ">
    <div className="flex-1">
      <h4 className="text-white text-[16px] leading-[20px] font-medium mb-2 pt-3">{title}</h4>
      <p className="text-[#FFFFFF99] text-[16px] leading-5 font-normal pb-5">{description}</p>
    </div>
    <div className="ml-4 flex-shrink-0">
      {hasToggle && toggleState !== undefined && onToggleChange && (
        <ToggleSwitch
          isOn={toggleState}
          onToggle={onToggleChange}
          trackWidth={trackWidth}
          trackHeight={trackHeight}
          thumbSize={thumbSize}
          iconSize={iconSize}
          thumbTranslate={thumbTranslate}  
        />

      )}
      {hasArrow && (
        <Image
          src="/images/arrow-right.png"
          alt="arrow right"
          width={20}
          height={20}
          className="text-[#FFFFFF99]"
        />
      )}
    </div>
  </div>
);


const NotificationPreferences: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <div className="container-class space-y-5 py-5">
      {/* Notification Preferences Card */}
      <div className="bg-[#121315] rounded-[12px] p-5">
        <h3 className="text-white text-[18px] leading-[22px] font-medium mb-5">
          Notification Preferences
        </h3>
        <div className="h-px bg-gray-700 mb-3"></div> 

        <div className="space-y-0">
          <PreferenceItem
            title="Email Notifications"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            hasToggle
            toggleState={emailNotifications}
            onToggleChange={() => setEmailNotifications(!emailNotifications)}
            trackWidth="w-[32px]"
            trackHeight="h-[18px]"
            thumbSize="w-4 h-4"
            iconSize="w-3 h-3"
            thumbTranslate="translate-x-2.5" />

          <PreferenceItem
            title="Push Notifications"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            hasToggle
            toggleState={pushNotifications}
            onToggleChange={() => setPushNotifications(!pushNotifications)}
            trackWidth="w-[32px]"
            trackHeight="h-[18px]"
            thumbSize="w-4 h-4"
            iconSize="w-3 h-3"
            thumbTranslate="translate-x-2.5" />

        </div>
      </div>

      {/* Security Preferences Card */}
      <div className="bg-[#121315] rounded-[12px] p-5">
        <h3 className="text-white text-[18px] leading-[22px] font-medium mb-5">
          Security Preferences
        </h3>
        <div className="h-px bg-gray-700"></div> {/* ✅ keep only heading bottom line */}

        <div className="space-y-0">
          <PreferenceItem
            title="Change Password"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            hasArrow
          />

          <PreferenceItem
            title="2 - Factor Authentication"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            hasToggle
            toggleState={twoFactorAuth}
            onToggleChange={() => setTwoFactorAuth(!twoFactorAuth)}
            trackWidth="w-[32px]"
            trackHeight="h-[18px]"
            thumbSize="w-4 h-4"
            iconSize="w-3 h-3"
            thumbTranslate="translate-x-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
