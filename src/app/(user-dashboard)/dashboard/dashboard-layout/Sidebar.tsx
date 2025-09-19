'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  onCollapseChange: (isCollapsed: boolean) => void;
}

export function Sidebar({ onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleCollapse = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    } else {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      onCollapseChange(newCollapsedState);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen]);

  const isActive = (route: string) => pathname === route;

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center z-[100] justify-between px-4 py-3 border-b fixed w-full">
        <button onClick={toggleMobileMenu} className="text-white">
          <Menu size={28} />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`pt-[24px] mt-[40px] sm:mt-0 !overflow-y-auto px-[20px] ${
            isCollapsed ? 'w-[70px]' : 'w-[266px]'
          } border-r h-[100vh] overflow-y-auto border-r-[#222325] fixed flex flex-col
          transition-all duration-300 ease-in-out z-30
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
        >
          {/* Header */}
          <div className="justify-between items-center mb-[48px] flex">
            {!isCollapsed && (
              <Image
                onClick={toggleCollapse}
                src="/images/auth-logo.png"
                alt="Logo"
                width={53}
                height={31}
                className="cursor-pointer hover:scale-110 h-auto w-auto transition-transform duration-200"
              />
            )}
            <Image
              onClick={toggleCollapse}
              src="/images/narrow.png"
              alt="Collapse"
              width={28}
              height={32}
              className="cursor-pointer hover:scale-110 h-auto w-auto transition-transform duration-200"
            />
          </div>

          {/* Search & Notifications */}
          <div className="border-b border-b-[#3f4041] pb-[32px] mb-[32px]">
            <div className="flex justify-between items-center group cursor-pointer mb-[20px]">
              <Link href="/search" className="flex gap-[8px] items-center">
                <Image
                  src="/images/search.png"
                  alt="Search"
                  width={16}
                  height={16}
                  className="opacity-80 group-hover:opacity-100 h-auto w-auto transition-opacity"
                />
                <p className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${isCollapsed ? 'hidden' : 'block'}`}>
                  Search
                </p>
              </Link>
              <div className={`flex gap-[4px] ${isCollapsed ? 'hidden' : 'block'}`}>
                <div className="w-[20px] h-[20px] bg-[#3f4041] rounded-[3px] border-b border-b-white flex items-center justify-center">
                  <span className="text-[#ffffff] text-[10px] font-normal">⌘</span>
                </div>
                <div className="w-[20px] h-[20px] bg-[#3f4041] rounded-[3px] border-b border-b-white flex items-center justify-center">
                  <span className="text-[#ffffff] text-[10px] font-normal">K</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center group cursor-pointer">
              <Link href="/dashboard/notification" className="flex gap-[8px] items-center">
                <Image
                  src="/images/notification.png"
                  alt="Notifications"
                  width={16}
                  height={16}
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <p className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors group-hover:text-[#eefb75] ${isCollapsed ? 'hidden' : 'block'}`}>
                  Notifications
                </p>
              </Link>
              <div className={`w-[20px] h-[20px] bg-[#D84725] rounded-[4px] border-b border-b-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isCollapsed ? 'hidden' : 'flex'}`}>
                <span className="text-[#ffffff] text-[10px] font-medium">8</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 ml-[-14px]">
            {/* Home */}
            <Link href="/dashboard/host" className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/host') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'}`}>
              <Image
                src={isActive('/dashboard/host') ? "/images/home.png" : "/images/home-simple.png"}
                alt="Home"
                width={20}
                height={20}
                className="opacity-100"
              />
              <p className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/host') ? 'text-[#eefb75]' : 'text-[#ffffff] group-hover:text-[#eefb75]'} ${isCollapsed ? 'hidden' : 'block'}`}>
                Home
              </p>
            </Link>

            {/* Applications */}
            <Link href="/dashboard/coming-soon" className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/applications') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'}`}>
              <Image
                src={isActive('/dashboard/applications') ? "/images/application-yellow.png" : "/images/applications.png"}
                alt="Applications"
                width={20}
                height={20}
                className="opacity-100 group-hover:hidden"
              />
              <Image
                src="/images/application-yellow.png"
                alt="Applications"
                width={20}
                height={20}
                className="opacity-100 hidden group-hover:block"
              />
              <p className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/applications') ? 'text-[#eefb75]' : 'text-[#ffffff] group-hover:text-[#eefb75]'} ${isCollapsed ? 'hidden' : 'block'}`}>
                My Applications
              </p>
            </Link>

            {/* Certificates */}
            <Link href="/dashboard/coming-soon" className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/certificates') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'}`}>
              <Image
                src={isActive('/dashboard/certificates') ? "/images/certificates-yellow.png" : "/images/certificates.png"}
                alt="Certificates"
                width={20}
                height={20}
                className="opacity-100 group-hover:hidden"
              />
              <Image
                src="/images/certificates-yellow.png"
                alt="Certificates"
                width={20}
                height={20}
                className="opacity-100 hidden group-hover:block"
              />
              <p className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/certificates') ? 'text-[#eefb75]' : 'text-[#ffffff] group-hover:text-[#eefb75]'} ${isCollapsed ? 'hidden' : 'block'}`}>
                My Certificates
              </p>
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="pb-[24px]">
            {/* Settings */}
            <Link href="/dashboard/coming-soon" className={`flex gap-[8px] items-center py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/settings') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'}`}>
              <Image
                src={isActive('/dashboard/settings') ? "/images/settings-yellow.png" : "/images/settings.png"}
                alt="Settings"
                width={20}
                height={20}
                className="opacity-100 group-hover:hidden"
              />
              <Image
                src="/images/settings-yellow.png"
                alt="Settings"
                width={20}
                height={20}
                className="opacity-100 hidden group-hover:block"
              />
              <p className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/settings') ? 'text-[#eefb75]' : 'text-[#ffffff] group-hover:text-[#eefb75]'} ${isCollapsed ? 'hidden' : 'block'}`}>
                Setting
              </p>
            </Link>

            {/* Help */}
            <Link href="/dashboard/coming-soon" className={`flex gap-[8px] items-center py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 ${isActive('/dashboard/help') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'}`}>
              <Image
                src={isActive('/dashboard/help') ? "/images/help-yellow.png" : "/images/help.png"}
                alt="Help"
                width={20}
                height={20}
                className="opacity-100 group-hover:hidden"
              />
              <Image
                src="/images/help-yellow.png"
                alt="Help"
                width={20}
                height={20}
                className="opacity-100 hidden group-hover:block"
              />
              <p className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/help') ? 'text-[#eefb75]' : 'text-[#ffffff] group-hover:text-[#eefb75]'} ${isCollapsed ? 'hidden' : 'block'}`}>
                Help & support
              </p>
            </Link>
          </div>
        </div>

        {/* Spacer */}
        <div className={`${isCollapsed ? 'w-[70px]' : 'w-[266px]'} transition-all duration-300 ease-in-out hidden lg:block`}></div>
      </div>
    </>
  );
}