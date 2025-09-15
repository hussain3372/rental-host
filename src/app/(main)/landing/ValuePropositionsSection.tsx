"use client";

import React from "react";
import Image from "next/image";
import PropositionsCard from "../../shared/PropositionsCard";
import BlackButton from "../../shared/BlackButton";

const ValuePropositionsSection = () => {
  return (
    <div className="bg-[#121315] max-w-[1440px] mx-auto text-white py-20 px-[10px] md:px-[23px] lg:px-[120px]">
      <div className=" text-center">
        {/* Top Badge */}
        <div className="flex items-center justify-center">
          <BlackButton
            text="Value Prepositions"
            iconSrc="/images/value.png"
            iconWidth={32}
            iconHeight={32}
          />
        </div>

        {/* Main Heading with Icons */}
        <div className=" py-[60px]">
          <h2 className="text-[20px] md:text-[30px] lg:text-[40px] sm:leading-[25px] md:leading-[30px] font-medium lg:leading-[48px] w-full max-w-[1008px] mx-auto text-center">
            Standout as a trusted host{" "}
            <span className="inline-flex items-center align-middle">
              <Image
                src="/images/value-p1.png"
                alt="Star icon"
                width={52}
                height={52}
                className=""
              />
            </span>{" "}
            with our certifications that helps you earn guests confidence,
            increase your visibility and simplify the{" "}
            <span className="inline-flex items-center align-middle">
              <Image
                src="/images/value-p2.png"
                alt="Legal icon"
                width={60}
                height={40}
                className=""
              />
            </span>{" "}
            legal side of hosting.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]  mb-8">
          <div className="flex items-center w-full">
            <PropositionsCard
              text="Earn guests trust instantly"
              iconSrc="/images/react.png"
              iconWidth={56}
              iconHeight={56}
            />
          </div>

          <div className="flex items-center w-full">
            <PropositionsCard
              text="Boost your bookings"
              iconSrc="/images/react.png"
              iconWidth={56}
              iconHeight={56}
              className="w-fll"
            />
          </div>

          <div className="flex items-center w-full">
            <PropositionsCard
              text="Get verified certifications"
              iconSrc="/images/react.png"
              iconWidth={56}
              iconHeight={56}
              className=" "
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-3">
            <PropositionsCard
              text="Stay compliant with ease"
              iconSrc="/images/react.png"
              iconWidth={56}
              iconHeight={56}
            />
          </div>

          <div className="flex items-center space-x-3">
            <PropositionsCard
              text="Certified badges and renewals"
              iconSrc="/images/react.png"
              iconWidth={56}
              iconHeight={56}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuePropositionsSection;
