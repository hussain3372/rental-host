import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='text-white border-b border-b-white/20'>
    <div className=' px-4 sm:px-10 py-[18px] flex justify-between items-center'>
     <Image src="/images/pricing-logo.png" alt='Logo' width={181} height={35} />
     <div className="flex gap-2 items-center">
        <Image src="/images/assistance.png" alt='Help' height={24} width={25} />
        <p className='text-white/40 font-semibold leading-[18px] text-[14px]'>Help Assistance</p>
     </div>
     </div>
    </nav>
  )
}
