"use client";
import React, { useState } from "react";
import Image from "next/image";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  buttonText: string;
  features: string[];
  bgColor?: string;
  textColor?: string;
  buttonBg?: string;
  buttonTextColor?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period,
  buttonText,
  features,
  bgColor = "bg-black",
  textColor = "text-white",
  buttonBg = "bg-gray-700",
  buttonTextColor = "text-white",
}) => {
  // Check if this is the Professional plan (middle card)
  const isProfessionalPlan = title === "Professional";
  const [isHovered, setIsHovered] = useState(false);

  const professionalBorderColor = isHovered ? "#EFFC76" : "#737852";
  const defaultBorderColor = isHovered ? "#EFFC76" : "#2f3030";

  return (
    <div
      style={{
        borderTopColor: isProfessionalPlan ? professionalBorderColor : defaultBorderColor,
        borderRightColor: isProfessionalPlan ? professionalBorderColor : defaultBorderColor,
        borderLeftColor: isProfessionalPlan ? professionalBorderColor : defaultBorderColor,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
      className={`rounded-2xl max-w-[320px] md:max-w-[384px] shadow-lg p-[20px] sm:p-[36px] border-l-[1px] border-r-[1px] border-t-[2px] border-t ${bgColor} border-white ${textColor} flex flex-col justify-between relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover effect overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFFC76]/10 to-transparent opacity-30 z-0"></div>
      )}

      {/* Glow effect for professional plan */}
      {isProfessionalPlan && isHovered && (
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_25px_rgba(239,252,118,0.3)] z-0"></div>
      )}

      {/* Header */}
      <div className="relative z-10">
        <h3 className="text-[24px] leading-[28px] font-semibold">{title}</h3>
        <p className="text-[16px] leading-[20px] font-medium pt-1 text-[#FFFFFFCC]">{description}</p>
      </div>

      {/* Price */}
      <div className="mt-[32px] relative z-10">
        <p className="text-[60px] leading-[68px] font-semibold text-[#EFFC76]">{price}</p>
        <span className="text-[16px] leading-[20px] pt-1 font-medium text-[#FFFFFFCC]">{period}</span>
      </div>

      {/* Button */}
      <button
        className={`mt-6 w-full py-[10px] px-[20px] cursor-pointer rounded-[10px] font-medium relative z-10 transition-all duration-300 ${isHovered
            ? "bg-[#EFFC76] text-black shadow-[inset_5px_-54px_22px_0px_#00000008,inset_3px_-30px_18px_0px_#0000001A,inset_1px_-14px_14px_0px_#0000002B]"
            : `${buttonBg} ${buttonTextColor} shadow-[inset_5px_-54px_22px_0px_#00000008,inset_3px_-30px_18px_0px_#0000001A,inset_1px_-14px_14px_0px_#0000002B]`
          }`}
      >
        {buttonText}
      </button>


      <div className={`bg-gradient-to-r -ml-0 flex text-center my-[32px] w-[250px] sm:w-[312px] h-[1px] from-transparent via-white to-transparent relative z-10 ${isHovered ? "opacity-80" : "opacity-100"
        }`}></div>

      {/* Features */}
      <ul className="space-y-2 text-sm relative z-10 max-w-[312px]">
        {features.map((feature, idx) => (
         <li
  key={idx}
  className="flex items-start text-[15px] leading-[20px] font-medium space-x-[8px] transition-transform duration-300 hover:translate-x-1"
>
  <Image width={18} height={13} src="/images/check.png" alt="check" className="mt-1" />
  <span className="flex-1"> {feature} </span>
</li>

        ))}
      </ul>
    </div>
  );
};

export default PricingCard;