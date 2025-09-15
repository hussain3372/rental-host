"use client";
import React from "react";
import Image from "next/image";

type ButtonProps = {
  text: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconWidth = 24,
  iconHeight = 24,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3
        w-[204px] h-[44px] 
        px-5 py-3
        rounded-[9px] 
        bg-[#EFFC76] text-[#121315] text-[16px] leading-[20px] font-normal
        transition duration-200 hover:opacity-90
        shadow-[0px_-39px_11px_0px_#00000003_inset,
                0px_-25px_10px_0px_#0000000A_inset,
                0px_-14px_8px_0px_#00000026_inset,
                0px_-6px_6px_0px_#00000042_inset,
                0px_-2px_3px_0px_#0000004A_inset]
        ${className}
      `}
    >
      {icon && (
        <Image
          src={icon}
          alt={text}
          width={iconWidth}
          height={iconHeight}
          className="object-contain"
        />
      )}
      <span className="text-[16px] leading-[26px] font-semibold">{text}</span>
    </button>
  );
};

export default Button;
