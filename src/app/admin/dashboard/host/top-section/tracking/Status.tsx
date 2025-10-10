import Image from "next/image";
import React from "react";

export default function Status() {
 const Credentials = [
    {
      id:1,
      img:"/images/manager.svg",
      val:"3200",
      title:"Total Applications"
    },
    {
      id:2,
      img:"/images/pending.svg",
      val:"1200",
      title:"Pending Applications"
    },
    {
      id:3,
      img:"/images/actives.svg",
      val:"2000",
      title:"Active Certificates"
    },
    {
      id:4,
      img:"/images/revoke.svg",
      val:"1300",
      title:"Expired Certificates"
    },
  ]

  return (
    <div className=" flex flex-col xl:flex-row gap-[17px]">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full  lg:grid-cols-4 gap-3 pt-5  flex-wrap lg:flex-nowrap justify-between">
                   { Credentials.map((item)=>(
                     <div key={item.id} className="gap-3">
                       <div className="flex items-center bg-[#121315] rounded-xl gap-4 p-5">
                       <Image src={item.img} alt={item.title} width={48} height={48}   style={{ width: "auto", height: "auto" }}
/>
                       <div>
                       <h2 className="text-[20px] font-semibold leading-[24px] text-white">{item.val}</h2>
                       <p className="text-white/80 font-regular text-[14px] leading-[18px] pt-2">{item.title}</p>
                       </div>
                       </div>
                     </div>
                   )) }
                 </div>
    </div>
  );
}