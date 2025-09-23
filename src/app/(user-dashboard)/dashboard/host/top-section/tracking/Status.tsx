import Image from "next/image";
import React from "react";

export default function Status() {
  const application = [
    {
      id: 1,
      title: "Property Listing",
      number: "5",
      status: "+1",
      color: "#FFB52B",
      braces: "(1 Property listings left for this month)",
      img: "/images/card1.svg",
    },
    {
      id: 2,
      title: "Active Badges",
      number: "3",
      status: "+4%",
      color: "#28EB1D",
      braces: "(growth compared to last month)",
      img: "/images/card2.svg",
    },
    {
      id: 3,
      title: "Applications in Progress",
      number: "1",
      status: "-1",
      color: "#FF3F3F",
      braces: "(one fewer than last week)",
      img: "/images/card3.svg",
    },
    {
      id: 4,
      title: "Expired",
      number: "1",
      status: "-1",
      color: "#FF3F3F",
      braces: "(recently expired)",
      img: "/images/card4.svg",
    },
  ];

  return (
    <div className=" flex flex-col xl:flex-row gap-[24px]">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] flex-1">
        {application.map((item) => (
          <div
            key={item.id}
            className="bg-[#121315] rounded-[12px] py-[20px] pr-[20px] pl-[20px] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-[16px] leading-[20px] text-white">
                  {item.title}
                </p>
                <p className="font-bold text-[28px] leading-[32px] pt-[12px] text-white">
                  {item.number}
                </p>
              </div>
              <Image
                src={item.img}
                alt={item.title}
                height={44}
                width={44}
                className="object-contain"
              />
            </div>
            <div className="pt-[16px] flex gap-[6px] items-center">
              <span
                className="bg-[#252628] py-[2px] px-[8px] rounded-[4px] text-[14px] leading-[18px] font-medium"
                style={{ color: item.color }}
              >
                {item.status}
              </span>
              <p className="text-[14px] leading-[18px] overflow-hidden text-white opacity-80 ">
                {item.braces}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Yellow Section */}
      <div className="bg-[#EFFC76] lg:max-h-[299px] !z-0 w-full xl:max-w-[462px]  relative rounded-[24px] text-black flex flex-col justify-between overflow-hidden">
        <div className="p-[20px] flex flex-col justify-between !z-0 relative">
          <h3 className="font-medium text-[28px] leading-[32px] max-w-[391px]">
            Ready for your next property certification?
          </h3>
          <p className="max-w-[252px] font-medium text-[16px] pt-3 leading-[20px] opacity-60">
            Start your certification application today and keep your properties
            verified.
          </p>
          <button className="mt-[84px] cursor-pointer w-[130px] text-center flex items-center font-semibold text-[16px] leading-[20px] bg-black text-[#c4c4c4] px-[20px] py-[11px] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-200 hover:opacity-90">
            Apply Now
          </button>
        </div>

        <Image
          src="/images/design2.png"
          alt="design"
          width={193}
          height={193}
          className="absolute -bottom-3 right-0 w-[193px] h-[193px] z-[-3] object-contain"
        />
      </div>
    </div>
  );
}