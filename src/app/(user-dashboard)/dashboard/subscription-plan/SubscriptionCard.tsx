"use client";
import React, { useState } from "react";
import PricingCard from "@/app/shared/PlanCard";
import ApplyNowFilter from "./ApplyNowFilter";
import { SubscriptionModal } from "./SubscriptionModal";

export default function SubscriptionPlan() {
  const [isOn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null); // ✅ track subscription

  // Plans data
  const plans = [
    {
      key: "Starter",
      title: "Starter",
      description: "List your first property with ease.",
      price: isOn ? "$10" : "$12",
      features: [
        "1 certified property listing",
        "Official digital certificate included",
        "Basic property details verification",
        "Easy submission process",
      ],
    },
    {
      key: "Professional",
      title: "Professional",
      description: "Get more listings and recognition.",
      price: isOn ? "$20" : "$24",
      features: [
        "Up to 10 certified property listings",
        "Verified digital certificates",
        "Priority listing visibility",
        "Enhanced property details",
      ],
    },
    {
      key: "Enterprise",
      title: "Enterprise",
      description: "Certified property solutions at scale.",
      price: isOn ? "$190" : "$200",
      features: [
        "Unlimited property listing",
        "Bulk certificate management",
        "Advanced verification tools",
        "Premium placement",
      ],
    },
  ];

  // Click on Buy Now → open filter
  const handleBuyNow = (plan: string) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  // Inside filter → click Subscribe → open modal
  const handleSubscribe = () => {
    setShowModal(true);
  };

  // Modal confirm → close modal + update card state
  const handleModalConfirm = () => {
    if (selectedPlan) {
      setSubscribedPlan(selectedPlan);
    }
    setShowModal(false);
    setShowPayment(false);
  };

  return (
    <div className="container-class pt-[106px]">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[20px] leading-[24px] font-semibold text-white">
          Settings & Preferences
        </h1>
      </div>
      <p className="text-4 leading-5 text-[#FFFFFF99] font-normal mb-[40px] max-w-[573px] w-full">
        Manage your personal details, security, notifications, and billing all
        in one place. Customize your experience and keep your account up to date.
      </p>

      {/* Cards */}
     <div className="container-class flex flex-col xl:flex-row items-center justify-between gap-[20px]">
  {plans.map((plan) => (
    <PricingCard
      key={plan.key}
      title={plan.title}
      description={plan.description}
      price={plan.price}
      period="per month"
      buttonText={subscribedPlan === plan.key ? "Unsubscribe" : "Buy Now"} // ✅ dynamic
      onBuyNow={() => handleBuyNow(plan.key)}
      features={plan.features}
      bgColor={
        subscribedPlan === plan.key
          ? `
            rounded-[16px]
            bg-[radial-gradient(94.08%_110.06%_at_50%_5.92%,rgba(239,252,118,0.12)_0%,rgba(18,19,21,0.40)_100%)]
            shadow-[0_2px_4px_0_rgba(0,0,0,0.29),0_8px_8px_0_rgba(0,0,0,0.26),0_17px_10px_0_rgba(0,0,0,0.15),0_31px_12px_0_rgba(0,0,0,0.04),0_48px_13px_0_rgba(0,0,0,0.01),0_-3px_7px_0_rgba(0,0,0,0.20)_inset,1px_-14px_14px_0_rgba(0,0,0,0.17)_inset,3px_-30px_18px_0_rgba(0,0,0,0.10)_inset,5px_-54px_22px_0_rgba(0,0,0,0.03)_inset,0_1px_0_1px_rgba(255,255,255,0.15)_inset]
          `
          : "bg-[#121315]" // default inactive
      }
       textColor="text-white"
  buttonBg={subscribedPlan === plan.key ? "bg-[#EFFC76]" : "bg-[#2D2D2D]"} // ✅ dynamic button color
  buttonTextColor={subscribedPlan === plan.key ? "text-black" : "text-white"} // ✅ text adjusts
  padding="p-[20px]"
/>
  ))}
</div>


      {/* Filter Drawer */}
      {showPayment && (
        <div
          className="fixed inset-0 flex justify-end bg-black/70 z-[2000]"
          onClick={() => setShowPayment(false)}
        >
          <div
            className="relative w-full sm:w-[608px] max-h-screen bg-[#121315] shadow-lg overflow-y-auto z-[2010]"
            onClick={(e) => e.stopPropagation()}
          >
            <ApplyNowFilter
              selectedPlan={selectedPlan ?? ""}
              onClose={() => setShowPayment(false)}
              onSubscribe={handleSubscribe} // ✅ pass subscribe callback
            />
          </div>
        </div>
      )}

      {/* Modal */}
      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleModalConfirm} // ✅ confirm handler
      />
    </div>
  );
}
