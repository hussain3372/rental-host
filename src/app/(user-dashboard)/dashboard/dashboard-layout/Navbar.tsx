import Image from "next/image";
import React from "react";

interface NavbarProps {
  isCollapsed: boolean;
}

export function Navbar({ isCollapsed }: NavbarProps) {
  return (
    <>
      {/* Desktop Navbar (unchanged) */}
      <nav
        className={`bg-[#111] z-[100] fixed text-white hidden lg:block transition-all px-6 py-4 duration-300 ease-in-out`}
        style={{
          width: isCollapsed ? "calc(100vw - 70px)" : "calc(100vw - 266px)",
        }}
      >
        <div className="flex justify-between items-center  border-b border-b-[#3b3d3c]  ">
          {/* Left side */}
          <div className="">
            <h1 className="font-medium text-[24px]">Good Morning, Alex</h1>
            <p className="text-[16px] pb-5 leading-[20px] text-white/60 pt-1">
              It&apos;s Tuesday, 21 December 2024
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/person.png"
              alt="profile pic"
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-[14px] leading-[18px]">John Deo</p>
              <p className="text-[14px] leading-[18px] text-white/60">
                johndeo@gmail.com
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 w-full text-white bg-[#111] lg:hidden z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Left side */}
          <div className="">
            
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/person.png"
              alt="profile pic"
              height={32}
              width={32}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-[13px] font-medium">John Deo</p>
              <p className="text-[12px] text-white/60">johndeo@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
