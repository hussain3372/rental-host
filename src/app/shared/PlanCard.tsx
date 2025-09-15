"use client";
import React from "react";
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
  return (
    <div
    style={{ borderTopColor: price === "$24" ? "#737852" : "#2f3030", borderRightColor: price === "$24" ? "#737852" : "#2f3030", borderLeftColor: price === "$24" ? "#737852" : "#2f3030", }}
      className={`rounded-2xl max-w-[320px]  md:max-w-[384px] shadow-lg p-[20px] sm:p-[36px] border-l-[1px] border-r-[1px] border-t-[2px]  ${price === "$24" ? "black" : "#2f3030"}  border-t ${bgColor} border-white ${textColor} flex flex-col justify-between`}
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm pt-1 text-white">{description}</p>
      </div>

      {/* Price */}
      <div className="mt-[32px]">
        <p className="text-[60px] leading-[68px]  font-bold text-[#EFFC76]">{price}</p>
        <span className="text-[16px] pt-1 font-medium">{period}</span>
      </div>

      {/* Button */}
      <button
        className={`mt-6 w-full py-2 cursor-pointer rounded-lg ${buttonBg} ${buttonTextColor} font-medium`}
      >
        {buttonText}
      </button>

      <div className="bg-gradient-to-r -ml-0 flex text-center my-[32px] w-[250px] sm:w-[312px] h-[1px] from-transparent via-white to-transparent"></div>

      {/* Features */}
      <ul className=" space-y-2 text-sm">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-[8px]">
           <Image width={18} height={13} src="/images/check.png" alt="check" />
           <span> {feature} </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
