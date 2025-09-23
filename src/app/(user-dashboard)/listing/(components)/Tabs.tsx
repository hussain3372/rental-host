"use client";

import { useState } from "react";
import Image from "next/image";
import Step1a from "./Step1a";
// import Step1b from "./Step1b";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);

  const steps = [
    { id: 1, title: "Property Details",desc:"Enter Your Property Information", icon: "/images/property.svg", activeIcon: "/images/property.svg" },
    { id: 2, title: "Compliance Checklist",desc:"Complete the Compliance Checklist", icon: "/images/checklist.svg", activeIcon: "/images/checklist-complete.svg" },
    { id: 3, title: "Document Uploads",desc:"Upload Required Documents", icon: "/images/upload.svg", activeIcon: "/images/upload-active.svg"},
    { id: 4, title: "Choose Plan & Payment",desc:"Secure Your Certification Payment", icon: "/images/payment.svg", activeIcon: "/images/payment-active.svg"},
    { id: 5, title: "Submission & Confirmation",desc:"Review & Submit Your Application", icon: "/images/confirm.svg", activeIcon: "/images/confirm-active.svg"},
  ];

  const renderStepContent = () => {
    if (step === 1) {
      if (subStep === 1) return <Step1a />;
      if (subStep === 2) return <div className="h-full">Step 2 content here</div>;
    }

    switch (step) {
      case 2: return <div className="h-full">Step 2 content here</div>;
      case 3: return <div className="h-full">Step 3 content here</div>;
      case 4: return <div className="h-full">Step 4 content here</div>;
      case 5: return <div className="h-full">Step 5 content here</div>;
      default: return null;
    }
  };

  const handleNext = () => {
    if (step === 1 && subStep === 1) {
      setSubStep(2);
    } else if (step === 1 && subStep === 2) {
      setStep(2);
      setSubStep(1); // reset for next time
    } else {
      setStep((prev) => (prev < 5 ? prev + 1 : prev));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex px-10">
      <div className="w-full flex rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        
        {/* Sidebar */}
        <div className="relative w-1/3 bg-[#121315] flex items-center px-[56px]">
          <Image src="/images/shape1.png" alt="gradient" fill className="absolute bottom-0 left-0"/>


<div className="flex flex-col gap-12 relative z-10">
  {steps.map((s, idx) => {
    const isCompleted = step > s.id;
    const isActive = step === s.id;

    let iconSrc = s.icon;
    if (isCompleted) iconSrc = "/images/completed.svg";
    else if (isActive) iconSrc = s.activeIcon;

    return (
      <div key={s.id} className="flex items-center gap-4 relative">
        {/* Icon with connector line */}
        <div className=" flex flex-col items-center justify-center">
            <div className={`h-[56px] w-[56px] flex justify-center items-center rounded-full ${isCompleted || isActive ? "bg-[#353825]":""}`}>
          <div
            className={`w-[44px] h-[44px] flex items-center justify-center rounded-full z-10 ${
              isCompleted || isActive ? "bg-[#EFFC76]" : "bg-white/12"
            }`}
          >
            <Image
              src={iconSrc}
              alt={s.title}
              width={20}
              height={20}
              className="transition-all duration-300"
            />
          </div>
          </div>

          {/* Connector line - skip for last item */}
          {idx !== steps.length - 1 && (
            <div className="absolute top-full z-[-3] w-px h-16 border-l-2 border-dashed border-gray-600"></div>
          )}
        </div>

        {/* Step text */}
        <div className="pt-1">
          <p
            className={`font-regular text-[14px] leading-[18px] ${
              isActive  ? "text-[#EFFC76]" : "text-white"
            }`}
          >
            STEP {s.id}
          </p>
          <p className="text-[16px] font-semibold leading-[20px] pt-[6px]  text-white">{s.title}</p>
          <p className="pt-[6px] text-[12px] text-white/80 font-regular leading-[16px]">{s.desc}</p>
        </div>
      </div>
    );
  })}
</div>

        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#0d0d0d] p-10 flex flex-col min-h-full">
            <div className="flex gap-2 items-center">
            <Image src="/images/step.svg" alt="steps" width={16} height={16} />
          <p className="text-[#EFFC76] font-semibold">STEP {step} OF 5</p>
            </div>
          <div className="flex-1">{renderStepContent()}</div>

          {step <= 5 && (
            <div className="mt-10">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-b from-yellow-300 to-yellow-500 text-black font-semibold rounded-md shadow-lg hover:opacity-90"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
