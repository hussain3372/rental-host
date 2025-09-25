"use client";

import { useState } from "react";
import Image from "next/image";
import Step1a from "./Step1a";
import Step1b from "./Step1b";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4a from "./Step4a";
import Step4b from "./Step4b";
import Step5 from "./Step5";
import toast from "react-hot-toast";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Property Details",
      desc: "Enter Your Property Information",
      icon: "/images/property.svg",
      activeIcon: "/images/property.svg",
    },
    {
      id: 2,
      title: "Compliance Checklist",
      desc: "Complete the Compliance Checklist",
      icon: "/images/checklist.svg",
      activeIcon: "/images/checklist-complete.svg",
    },
    {
      id: 3,
      title: "Document Uploads",
      desc: "Upload Required Documents",
      icon: "/images/upload.svg",
      activeIcon: "/images/upload-active.svg",
    },
    {
      id: 4,
      title: "Choose Plan & Payment",
      desc: "Secure Your Certification Payment",
      icon: "/images/payment.svg",
      activeIcon: "/images/payment-active.svg",
    },
    {
      id: 5,
      title: "Submission & Confirmation",
      desc: "Review & Submit Your Application",
      icon: "/images/confirm.svg",
      activeIcon: "/images/confirm-active.svg",
    },
  ];

  const renderStepContent = () => {
    if (step === 1) {
      if (subStep === 1) return <Step1a />;
      if (subStep === 2) return <Step1b />;
    }

    if (step === 4) {
      if (subStep === 1) return <Step4a />;
      if (subStep === 2) return <Step4b />;
    }

    switch (step) {
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  };

  const handlePrev = () => {
    if (step === 2 && subStep === 1) {
      setStep(1);
      setSubStep(2);
    } else if (step === 1 && subStep === 2) {
      setSubStep(1);
    } else if (step === 4 && subStep > 1) {
      setSubStep((prev) => prev - 1);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
      setSubStep(1);
    }
  };

  const handleNext = () => {
    if (step === 1 && subStep === 1) {
      setSubStep(2);
    } else if (step === 4 && subStep < 2) {
      setSubStep((prev) => prev + 1);
    } else {
      setStep((prev) => (prev < 5 ? prev + 1 : prev));
      setSubStep(1);
    }
  };

  return (
    <div className="min-h-screen  bg-black text-white flex flex-col pl-4 md:pl-10 py-10">
      <div className="w-full flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        {/* Sidebar */}
        <div className="relative w-full lg:w-1/3 bg-[#121315] max-h-[748px] p-6 md:p-10 lg:p-20">
          <Image
            src="/images/shape1.png"
            alt="gradient"
            fill
            className="absolute bottom-0 left-0 object-cover"
          />

          {/* Horizontal for md/sm, Vertical for lg */}
          <div className="relative z-10 flex lg:flex-col flex-row items-start lg:items-stretch gap-8 lg:gap-12 overflow-x-auto lg:overflow-visible">
            {steps.map((s, idx) => {
              const isCompleted = step > s.id;
              const isActive = step === s.id;

              let iconSrc = s.icon;
              if (isCompleted) iconSrc = "/images/completed.svg";
              else if (isActive) iconSrc = s.activeIcon;

              return (
                <div
                  key={s.id}
                  className="flex lg:flex-row flex-col items-center lg:items-start gap-4 relative flex-shrink-0"
                >
                  {/* Icon wrapper */}
                  <div className="flex flex-col lg:flex-col items-center">
                    <div
                      className={`h-[56px] w-[56px] flex justify-center items-center rounded-full ${
                        isCompleted || isActive ? "bg-[#353825]" : ""
                      }`}
                    >
                      <div
                        className={`w-[44px] h-[44px] flex items-center justify-center rounded-full z-10 ${
                          isCompleted || isActive
                            ? "bg-[#EFFC76]"
                            : "bg-white/12"
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

                    {/* Vertical dashed line (lg only) */}
                    {idx !== steps.length - 1 && (
                      <div className="hidden lg:block absolute top-full z-[-3] w-px h-16 border-l-2 border-dashed border-gray-600"></div>
                    )}
                  </div>

                  {/* Text info */}
                  <div className="text-center lg:text-left min-w-[140px]">
                    <p
                      className={`font-regular text-[14px] leading-[18px] ${
                        isActive ? "text-[#EFFC76]" : "text-white"
                      }`}
                    >
                      STEP {s.id}
                    </p>
                    <p className="text-[16px] font-semibold leading-[20px] pt-[6px] text-white">
                      {s.title}
                    </p>
                    <p className="pt-[6px] text-[12px] text-white/80 font-regular leading-[16px]">
                      {s.desc}
                    </p>
                  </div>

                  {/* Horizontal dashed line (md/sm only) */}
                  {idx !== steps.length - 1 && (
                    <div className="lg:hidden absolute left-1/2 top-1/5 w-[120%] border-t-2 border-dashed border-gray-600"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:flex-1  p-4 md:pt-10 md:px-10 flex flex-col justify-end min-h-full">
          <div className="flex gap-2 items-center mb-5">
            <Image src="/images/step.svg" alt="steps" width={16} height={16} />
            <p className="text-[#EFFC76] font-semibold text-[14px]">
              STEP {step} OF 5
            </p>
          </div>

          <div className="flex-1">{renderStepContent()}</div>

          <div className=" flex flex-col pt-6 sm:flex-row gap-3">
            <button
              onClick={handlePrev}
              className="w-full sm:w-auto px-8 py-3 text-[16px] bg-gradient-to-b yellow-btn text-black font-semibold rounded-md shadow-lg hover:opacity-90"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (step === 5) {
                  toast.success("Form submitted successfully");
                } else {
                  handleNext();
                }
              }}
              className="w-full sm:w-auto px-8 py-3 text-[16px] bg-gradient-to-b yellow-btn text-black font-semibold rounded-md shadow-lg hover:opacity-90"
            >
              {step === 5 ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
