import Image from 'next/image'
import React from 'react'

export default function Checklist() {
  

  const checklist = [
    "Fire safety measures in place","Fire safety measures in place","Fire safety measures in place","Fire safety measures in place","Fire safety measures in place","Fire safety measures in place"
  ]
  const identity =[
    {
      id:1,
      img:"/images/id.png",
      title:"Government-issued ID",
      size:"12.3kb",
    },
    {
      id:2,
      img:"/images/id.png",
      title:"Government-issued ID",
      size:"12.3kb",
    },
    {
      id:3,
      img:"/images/id.png",
      title:"Government-issued ID",
      size:"12.3kb",
    },
    {
      id:4,
      img:"/images/id.png",
      title:"Government-issued ID",
      size:"12.3kb",
    },
  ]

  // const handleDownload = (url: string) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = url.split("/").pop() || "file.png"; // file name
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className='pb-5'>
      <h3 className='font-semibold text-[16px] leading-[20px] tracking-normal'>Compliance Checklist</h3>
      <div className='pt-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {
          checklist.map((items,index)=>(
            <p key={index} className='font-regular text-[14px] leading-[18px] tracking-normal py-[15px] pl-[12px]  sm:w-[391px] text-white bg-gradient-to-b from-[#202020] to-[#101010] border border-[#323232] rounded-lg'>{items}</p>
          ))
        }
        
      </div>
      <div className="flex flex-col md:flex-row pt-[60px] gap-5">
  <div className='w-full'>
    <div className='rounded-lg w-full grid grid-cols-1 sm:grid-cols-2 gap-3'> {/* Change to 1 column */}
      {identity.map((items) => (
        <div key={items.id} className='flex p-3 bg-[#121315] w-full items-center gap-5'>
          <Image src={items.img} alt='ID' width={100} height={60} />
          <div>
            <h3 className='font-medium text-[12px] sm:text-[18px] leading-[16px] sm:leading-[22px] text-white xl:w-[353px]'>
              {items.title}
            </h3>
            <h4 className='text-white/60 font-medium text-[16px] leading-[20px] pt-2'>{items.size}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      <div className="pt-15 flex w-full justify-end gap-3">
      <button className='hollow-btn font-semibold text-[16px] leading-5 py-3 px-[27px] rounded-lg'>
      Reject
      </button>
      <button className='yellow-btn text-[#101010]  font-semibold text-[16px] leading-5 py-3 px-[27px] rounded-lg'>
      Approve
      </button>
      </div>
    </div>
  )
}
