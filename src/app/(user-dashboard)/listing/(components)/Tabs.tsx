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

interface ChecklistItem {
  id: number;
  title: string;
  checked: boolean;
}

interface FormData {
  propertyName: string;
  propertyAddress: string;
  propertyType: string;
  ownership: string;
  description: string;
  images: File[];
  checklistItems: ChecklistItem[];
  photos: File[];
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    propertyAddress: "",
    propertyType: "",
    ownership: "",
    description: "",
    images: [],
    photos: [],
    checklistItems: [
      { id: 1, title: "Fire safety measures in place", checked: false },
      { id: 2, title: "Earthquake-resistant structure", checked: false },
      { id: 3, title: "Emergency exits available", checked: false },
      { id: 4, title: "CCTV surveillance active", checked: false },
    ],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (
    field: string,
    value: string | File | File[] | ChecklistItem[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && subStep === 1) {
      if (!formData.propertyName.trim()) {
        newErrors.propertyName = "Property name is required";
      }
      if (!formData.propertyAddress.trim()) {
        newErrors.propertyAddress = "Property address is required";
      }
      if (!formData.propertyType) {
        newErrors.propertyType = "Property type is required";
      }
      if (!formData.ownership) {
        newErrors.ownership = "Ownership is required";
      }
    }

    if (step === 1 && subStep === 2) {
      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      }
      if (formData.images.length < 3) {
        newErrors.images = "At least 3 images are required";
      }
    }

    if (step === 2) {
      formData.checklistItems.forEach((item) => {
        if (!item.checked) {
          newErrors[`checklist_${item.id}`] = "This item must be checked";
        }
      });
    }

    if (step === 3) {
      if (formData.photos.length < 4) {
        newErrors.photos = "All 4 documents are required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (step === 5) {
      toast.success("Form submitted successfully");
      window.location.href = "/dashboard/application"
    } else {
      handleNext();
    }
  };

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
      if (subStep === 1)
        return (
          <Step1a
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
      if (subStep === 2)
        return (
          <Step1b
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
    }

    if (step === 4) {
      if (subStep === 1) return <Step4a />;
      if (subStep === 2) return <Step4b />;
    }

    switch (step) {
      case 2:
        return (
          <Step2
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
          />
        );
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
<div className="min-h-screen bg-black text-white flex flex-col lg:flex-row px-4 md:pl-10 py-10 w-full h-auto">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 bg-[#121315] p-6 md:p-10 lg:p-20 relative 
                lg:sticky lg:top-0 lg:h-screen lg:max-h-[748px] self-start">
        <Image
          src="/images/shape1.png"
          alt="gradient"
          fill
          className="absolute bottom-0 left-0 object-cover"
        />

        <div className="relative flex lg:flex-col flex-row items-start lg:items-stretch gap-8 lg:gap-12 overflow-x-auto prevent-scroller lg:overflow-visible">
          {steps.map((s, idx) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;

            let iconSrc = s.icon;
            if (isCompleted) iconSrc = "/images/completed.svg";
            else if (isActive) iconSrc = s.activeIcon;

            return (
              <div
                key={s.id}
                className="flex lg:flex-row z-10 flex-col items-center lg:items-start gap-4 relative flex-shrink-0"
              >
                <div className="flex flex-col lg:flex-col items-center">
                  <div
                    className={` flex justify-center items-center rounded-full  ${isCompleted || isActive ? "bg-[#353825] h-[56px] w-[56px]" : " h-[56px] lg:h-[30px] w-[56px]"
                      }`}
                  >
                    <div
                      className={`w-[44px] h-[44px] flex items-center justify-center rounded-full  ${isCompleted || isActive
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

                  {idx !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[62%] w-px h-16 border-l-2 z-[-60] border-dashed border-gray-600"></div>
                  )}
                </div>

                <div className="text-center lg:text-left min-w-[140px]">
                  <p
                    className={`font-regular text-[14px] leading-[18px] ${isActive ? "text-[#EFFC76]" : "text-white"
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

                {idx !== steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-1/5 w-[120%] border-t-2 z-[-60] border-dashed border-gray-600"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content */}
<div className={`w-full lg:flex-1 md:pt-10 md:px-10 flex flex-col lg:ml-1/3 ${step === 5 ? "" : "min-h-screen lg:max-h-[748px] justify-between"}`}>
  <div className="flex-1">
    <div className="flex gap-2 items-center mb-5 mt-5 sm:mt-0">
      <Image src="/images/step.svg" alt="steps" width={16} height={16} />
      <p className="text-[#EFFC76] font-semibold text-[14px]">
        STEP {step} OF 5
      </p>
    </div>

    <div className="pb-6">{renderStepContent()}</div>
  </div>

  <div className="flex flex-col sm:flex-row justify-between sm:items-end mt-auto">
    <div className="flex flex-col pt-6 sm:flex-row gap-3">
      <button
        onClick={handlePrev}
        className={`w-full sm:w-auto px-8 py-3 black-btn text-[16px] bg-gradient-to-b text-#101010 font-semibold rounded-md shadow-lg ${
          step === 1 && subStep === 1 ? "hidden" : "block"
        }`}
      >
        Back
      </button>
      <button
        onClick={handleNextClick}
        className="w-full sm:w-auto px-8 py-3 text-[16px] bg-gradient-to-b yellow-btn text-black font-semibold rounded-md shadow-lg hover:opacity-90"
      >
        {step === 5 ? "Submit" : "Continue"}
      </button>
    </div>

    <button 
      onClick={() => { toast.success("Your data drafted successfully") }} 
      className="font-medium text-[16px] pt-3 sm:pt-0 leading-5 text-[#EFFC76] cursor-pointer"
    >
      Save as Draft
    </button>
  </div>
</div>
    </div>
  );
}
