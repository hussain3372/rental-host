import React from 'react'
import PricingCard from '@/app/shared/PlanCard'
export default function Step4a() {
    const CardData = [
        {
            title : "Starter",
            disc : "List your first property with ease.",
            price:"$12",
            background:"#121315",
            features : ["1 certified property listing","Official digital certificate included","Basic property details verification","Easy submission process"]
        },
        {
            title : "Professional",
            disc : "Get more listings and recognition.",
            price:"$24",
            background:"bg-gradient-to-b from-[#2a2e1a] to-[#121315]",
            features : ["Up to 10 certified property listings","Verified digital certificates","Priority listing visibility","Enhanced property details."]
        },
        {
            title : "Enterprise",
            disc : "Certified property solutions.",
            price:"$200",
            background:"#121315",
            features : ["Unlimited property listing","Bulk certificate management","Advanced verification tools","Premium placement."]
        },
    ]
  return (
    <div className='flex flex-col xl:flex-row gap-3 xl:gap-0 items-center justify-between '>
        { CardData.map((item)=>(
            <div key={item.price} className="">
      <PricingCard
          key={item.title}
          title={item.title}
          description={item.disc}
          price={item.price}
          period="per month"
          buttonText="Get Started"
          features={item.features}
          titleClass='text-[12px] leading-[16px] font-regular'
          descriptionClass='font-regular text-[14px] leading-[18px]'
          priceSize='font-semibold text-[40px] leading-[48px]'
          periodSize='text-white/40 text-[12px] leading-4'
          cardMaxWidth='max-w-[300px] ml-0'
          featureSize='text-[12px] leading-[16px] font-regular'
          dividerWidth='w-[204px]'
          buttonClass='hidden'
          bgColor={item.background}
          textColor="text-white"
          buttonBg="bg-[#2D2D2D]"
          buttonTextColor="text-white"
        />
        </div>
        )) }
    </div>
  )
}
