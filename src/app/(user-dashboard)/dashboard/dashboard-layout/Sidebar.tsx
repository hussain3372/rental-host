'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex'>
      <div
        className={`pt-[24px] px-[20px] ${
          isCollapsed ? 'w-[70px]' : 'w-[266px]'
        } h-[100vh] border-r border-r-[#222325] fixed flex flex-col
        transition-all duration-300 ease-in-out bg-[#1a1a1a]`}
      >
        {/* Logo + Collapse */}
        <div className="flex justify-between items-center mb-[48px]">
          <Image
            src="/images/auth-logo.png"
            alt="logo"
            width={53}
            height={31}
            className={`transition-opacity h-auto w-auto duration-300 ${
              isCollapsed ? 'opacity-0 hidden' : 'opacity-100 block'
            }`}
          />
          <Image
            onClick={() => setIsCollapsed((prev) => !prev)}
            src="/images/narrow.png"
            alt="Collapse sidebar"
            width={28}
            height={32}
            className="cursor-pointer hover:scale-110 h-auto w-auto transition-transform duration-200"
          />
        </div>

        {/* Search & Notifications Section */}
        <div className="border-b border-b-[#3f4041] pb-[32px] mb-[32px]">
          {/* Search */}
          <div className="flex justify-between items-center group cursor-pointer mb-[20px]">
            <Link href="/search" className="flex gap-[8px] items-center">
              <Image
                src="/images/search.png"
                alt="/dashboard/Search"
                width={16}
                height={16}
                className="opacity-80 group-hover:opacity-100 h-auto w-auto transition-opacity"
              />
              <p
                className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                  isCollapsed ? 'hidden' : 'block'
                }`}
              >
                Search
              </p>
            </Link>
            <div
              className={`flex gap-[4px] transition-opacity ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              <div className="w-[20px] h-[20px] bg-[#3f4041] rounded-[3px] border-b border-b-white flex items-center justify-center">
                <span className="text-[#ffffff]  text-[10px] font-normal">⌘</span>
              </div>
              <div className="w-[20px] h-[20px] bg-[#3f4041] rounded-[3px] border-b border-b-white flex items-center justify-center">
                <span className="text-[#ffffff] text-[10px] font-normal">K</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex justify-between items-center group cursor-pointer">
            <Link href="/dashboard/notification" className="flex gap-[8px] items-center">
              <Image
                src="/images/notification.png"
                alt="Notifications"
                width={16}
                height={16}
                className="opacity-80 group-hover:opacity-100 h-auto w-auto transition-opacity"
              />
              <p
                className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                  isCollapsed ? 'hidden' : 'block'
                }`}
              >
                Notifications
              </p>
            </Link>
            <div
              className={`w-[20px] h-[20px] bg-[#D84725] rounded-[4px]  border-b border-b-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                isCollapsed ? 'hidden' : 'flex'
              }`}
            >
              <span className="text-[#ffffff] text-[10px] font-medium">8</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Section */}
        <div className="flex-1 ml-[-14px]">
          {/* Home - Active State */}
          <Link href="/dashboard/home" className="flex gap-[8px] items-center px-[12px] py-[8px] bg-[#4a5439] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-[#5a6449] mb-[16px]">
            <Image
              src="/images/home.png"
              alt="Home"
              width={20}
              height={20}
              className="opacity-100"
            />
            <p
              className={`font-normal text-[16px] leading-[20px] text-[#eefb75] ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              Home
            </p>
          </Link>

          {/* My Applications */}
          <Link href="/dashboard/applications" className="flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-[#4a5439] mb-[16px]">
            <Image
              src="/images/applications.png"
              alt="My Applications"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <p
              className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              My Applications
            </p>
          </Link>

          {/* My Certificates */}
          <Link href="certificates" className="flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-[#4a5439] mb-[16px]">
            <Image
              src="/images/certificates.png"
              alt="My Certificates"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <p
              className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              My Certificates
            </p>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="pb-[24px]">
          {/* Settings */}
          <Link href="Settings" className="flex gap-[8px] items-center  py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-[#4a5439] mb-[16px]">
            <Image
              src="/images/settings.png"
              alt="Settings"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <p
              className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              Setting
            </p>
          </Link>

          {/* Help & Support */}
          <Link href="/dashboard/help" className="flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 hover:bg-[#4a5439]">
            <Image
              src="/images/help.png"
              alt="Help & Support"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <p
              className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              Help & support
            </p>
          </Link>
        </div>
      </div>
      <div className={`${isCollapsed ? "w-[70px]":"w-[270px]"}`}></div>
    </div>
  );
}