import React, { useState } from 'react'
import PricingCard from '@/app/shared/PlanCard'

export default function Step4a() {
    const [selectedCard, setSelectedCard] = useState<string>("Professional");

   const CardData = [
        {
            id: "Starter",
            title: "Starter",
            disc: "List your first property with ease.",
            price: "$12",
            background: "#121315",
            features: ["1 certified property listing", "Official digital certificate included", "Basic property details verification", "Easy submission process"]
        },
        {
            id: "Professional",
            title: "Professional",
            disc: "Get more listings and recognition.",
            price: "$24",
            background: "#121315",
            features: ["Up to 10 certified property listings", "Verified digital certificates", "Priority listing visibility", "Enhanced property details."]
        },
        {
            id: "Enterprise",
            title: "Enterprise",
            disc: "Certified property solutions.",
            price: "$200",
            background: "#121315",
            features: ["Unlimited property listing", "Bulk certificate management", "Advanced verification tools", "Premium placement."]
        },
    ]

    const handleCardSelect = (cardId: string) => {
        setSelectedCard(cardId);
    }

    return (
        <>
            <div>
                <h3 className='font-bold text-[20px] mb-3 sm:text-[28px] sm:leading-[32px] text-white'>Choose Plan & Payment</h3>
                <p className='max-w-[573px] font-regular text-[12px] sm:text-[16px] sm:leading-[20px] mb-10 text-white/60'>Choose the plan that suits your needs to continue with property certification.</p>
            </div>
            <div className='flex flex-col xl:flex-row gap-3 xl:gap-0 items-center justify-between'>
                {CardData.map((item) => {
                    const isSelected = selectedCard === item.id;
                    // const isProfessional = item.id === "Professional";
                    
                    const cardBackground = isSelected
                        ? "bg-gradient-to-b from-[#2a2e1a] to-[#121315]"
                        : "bg-[#121315]"

                    // FIX: Pass color values instead of border classes
                    const defaultBorderColor = isSelected ? "#c5d168" : "#373739"
                    const hoverBorderColor = "#c5d168" // Optional: customize hover color

                    return (
                        <div 
                            key={item.id} 
                            className="transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleCardSelect(item.id)}
                        >
                            <PricingCard
                                title={item.title}
                                description={item.disc}
                                price={item.price}
                                period="per month"
                                buttonText="Get Started"
                                isProfessionalPlan={false}
                                features={item.features}
                                
                                // FIX: Pass color values instead of border classes
                                defaultBorderColor={defaultBorderColor}
                                hoverBorderColor={hoverBorderColor}
                                
                                showBorder={true}                                
                                // Styling
                                bgColor={cardBackground}
                                textColor="text-white"
                                buttonBg="bg-[#2D2D2D]"
                                buttonTextColor="text-white"
                                isSelected={isSelected}
                                
                                // Other props
                                titleClass='text-[12px] leading-[16px] font-regular'
                                descriptionClass='font-regular text-[14px] leading-[18px]'
                                priceSize='font-semibold text-[40px] leading-[48px]'
                                periodSize='text-white/40 text-[12px] leading-4'
                                cardMaxWidth='max-w-[300px] ml-0 cursor-pointer'
                                featureSize='text-[12px] leading-[16px] font-regular'
                                dividerWidth='w-[204px]'
                                buttonClass='hidden'
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )
}