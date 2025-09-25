'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchDrawer from "@/app/shared/SearchDrawer";
import HelpSupportDrawer from "@/app/(user-dashboard)/dashboard/help-support/HelpSupportDrawer";
import SearchDrawerShortcut from "@/app/shared/SearchDrawerShortcut"; 
import { allProperties } from "@/app/(main)/search-page/data/properties";
interface SidebarProps {
  onCollapseChange: (isCollapsed: boolean) => void;
}

export function Sidebar({ onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      <div className="lg:hidden flex items-center z-[100] justify-between px-4 py-6  fixed w-full ">
        <button onClick={toggleMobileMenu} className="text-white">
          <Menu size={28} />
        </button>
      </div>

      <div className="flex max-h-[100vh] bg-[#121315] relative">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={` pt-[24px] z-[100] bg-[#121315] mt-0  sm:mt-0 px-[20px] ${isCollapsed ? 'flex items-center w-[100px]' : 'w-[266px]'
            } border-r h-[100vh] overflow-y-auto overflow-x-hidden border-r-[#222325] fixed flex flex-col
          transition-all duration-300 ease-in-out z-30
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
        >
          {/* Header */}
          <Link onClick={() => { setIsMobileOpen(false) }} href="/dashboard" className="justify-between items-center mb-[48px] flex">
            <Image
              src="/images/auth-logo.png"
              alt="Logo"
              width={53}
              height={31}
              className="cursor-pointer hover:scale-110 h-auto w-auto transition-transform duration-200"
            />
          </Link>

          {/* Search & Notifications */}
          <div className="border-b border-b-[#3f4041] pb-[32px] mb-[32px] ml-[-14px]">
            {/* Search */}
            {/* Search */}
           <div
  className={`flex justify-between items-center cursor-pointer mb-[20px]`}
>
  <button
    onClick={() => setIsSearchOpen(true)}
    className={`flex justify-between items-center w-full px-[12px] py-[8px] rounded-[6px] 
      transition-all duration-200 group 
      ${
        // isActive('/search') ? 'bg-[#4a5439]' : 
        // 'hover:bg-[#4a5439]'
        ''
      }`}
  >
    <div className="flex gap-[8px] items-center">
      <div className="relative w-[20px] h-[20px]">
        <Image
          src="/images/search.png"
          alt="Search"
          width={isCollapsed ? 28 : 16}
          height={isCollapsed ? 28 : 16}
          className={`opacity-80 
            ${
              // 'group-hover:opacity-0'
              // isActive('/search') ? 'opacity-0' : 
              ''
            } absolute transition-opacity`}
        />
        <Image
          src="/images/search.png"
          alt="Search"
          width={isCollapsed ? 28 : 16}
          height={isCollapsed ? 28 : 16}
          className={`opacity-0 
            ${
              // 'group-hover:opacity-100'
              // isActive('/search') ? 'opacity-100' : 
              ''
            } absolute transition-opacity`}
        />
      </div>
      <p
        className={`font-normal text-[16px] leading-[20px] text-[#ffffff] transition-colors 
          ${isCollapsed ? 'hidden' : 'block'} 
          ${
            // 'group-hover:text-[#eefb75]'
            // isActive('/search') ? 'text-[#eefb75]' : 
            ''
          }`}
      >
        Search
      </p>
    </div>

    <div className={`flex gap-[4px] ${isCollapsed ? 'hidden' : 'block'}`}>
      <div className="w-[20px] h-[20px] bg-[#3f4041] rounded-[3px] border-b border-b-white flex items-center justify-center">
        <span className="text-[#ffffff] text-[10px] font-normal">K</span>
      </div>
    </div>
  </button>
</div>



            {/* Notifications */}
            <Link onClick={() => { setIsMobileOpen(false) }}
              href="/admin/dashboard/notifications"
              className={`flex justify-between items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 ${isActive('/dashboard/notifications') ? 'bg-[#4a5439]' : 'hover:bg-[#4a5439]'
                }`}
            >
              <div className="flex gap-[8px] items-center">
                <div className="relative w-[20px] h-[20px]">
                  <Image
                    src="/images/notification.png"
                    alt="Notifications"
                    width={isCollapsed ? 28 : 16}
                    height={isCollapsed ? 28 : 16}
                    className={`opacity-80 group-hover:opacity-0 absolute transition-opacity ${isActive('/dashboard/notifications') ? 'opacity-0' : ''
                      }`}
                  />
                  <Image
                    src="/images/notification-yellow.svg"
                    alt="Notifications"
                    width={isCollapsed ? 28 : 14}
                    height={isCollapsed ? 28 : 14}
                    className={`opacity-0 ml-[1px] mt-[1px] group-hover:opacity-100 absolute transition-opacity ${isActive('/dashboard/notifications') ? 'opacity-100' : ''
                      }`}
                  />
                </div>
                <p
                  className={`font-normal text-[16px] leading-[20px] ${isActive('/admin/dashboard/notifications')
                    ? 'text-[#eefb75]'
                    : 'text-[#ffffff] group-hover:text-[#eefb75]'
                    } ${isCollapsed ? 'hidden' : 'block'}`}
                >
                  Notifications
                </p>
              </div>
              <div
                className={`w-[20px] h-[20px] bg-[#D84725] rounded-[4px] border-b border-b-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isCollapsed ? 'hidden' : 'flex'
                  }`}
              >
                <span className="text-[#ffffff] text-[10px] font-medium">8</span>
              </div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 ml-[-14px]">
            {/* Home */}
            <Link onClick={() => { setIsMobileOpen(false) }}
              href="/dashboard"
              className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard')
                ? 'bg-[#4a5439]'
                : 'hover:bg-[#4a5439]'
                }`}
            >
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src="/images/home-simple.png"
                  alt="Home"
                  width={isCollapsed ? 28 : 16}
                  height={isCollapsed ? 28 : 16}
                  className={`opacity-100 group-hover:opacity-0 ml-[2px] mt-[2px] absolute transition-opacity ${isActive('/dashboard') ? 'hidden' : ''
                    }`}
                />
                <Image
                  src="/images/home.png"
                  alt="Home"
                  width={isCollapsed ? 28 : 21}
                  height={isCollapsed ? 28 : 21}
                  className={`opacity-0 group-hover:opacity-100 absolute transition-opacity ${isActive('/dashboard') ? 'opacity-100' : ''
                    }`}
                />
              </div>
              <p
                className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard')
                  ? 'text-[#eefb75]'
                  : 'text-[#ffffff] group-hover:text-[#eefb75]'
                  } ${isCollapsed ? 'hidden' : 'block'}`}
              >
                Home
              </p>
            </Link>

            {/* Applications */}
            <Link onClick={() => { setIsMobileOpen(false) }}
              href="/dashboard/application"
              className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/application') || isActive('/dashboard/application/detail/[id]')
                  ? 'bg-[#4a5439] text-[#EFFC76]'
                  : 'hover:bg-[#4a5439]'
                }`}
            >
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src="/images/applications.png"
                  alt="Applications"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-100 group-hover:opacity-0 absolute transition-opacity ${isActive('/dashboard/application') ? 'opacity-0' : ''
                    }`}
                />
                <Image
                  src="/images/application-yellow.png"
                  alt="Applications"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-0 group-hover:opacity-100 absolute transition-opacity ${isActive('/dashboard/application') ? 'opacity-100' : ''
                    }`}
                />
              </div>
              <p
                className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/application')
                  ? 'text-[#eefb75]'
                  : 'text-[#ffffff] group-hover:text-[#eefb75]'
                  } ${isCollapsed ? 'hidden' : 'block'}`}
              >
                My Applications
              </p>
            </Link>

            {/* Certificates */}
            <Link onClick={() => { setIsMobileOpen(false) }}
              href="/dashboard/certificates"
              className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/certificates')
                  ? 'bg-[#4a5439]'
                  : 'hover:bg-[#4a5439]'
                }`}
            >
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src="/images/certificates.png"
                  alt="Certificates"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-100 group-hover:opacity-0 absolute transition-opacity ${isActive('/dashboard/certificates') ? 'opacity-0' : ''
                    }`}
                />
                <Image
                  src="/images/certificates-yellow.png"
                  alt="Certificates"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-0 group-hover:opacity-100 absolute transition-opacity ${isActive('/dashboard/certificates') ? 'opacity-100' : ''
                    }`}
                />
              </div>
              <p
                className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/certificates')
                  ? 'text-[#eefb75]'
                  : 'text-[#ffffff] group-hover:text-[#eefb75]'
                  } ${isCollapsed ? 'hidden' : 'block'}`}
              >
                My Certificates
              </p>
            </Link>
          </div>

          {/* Bottom Section */}
          <div className="pb-[24px] ml-[-14px]">
            {/* Settings */}
            <Link onClick={() => { setIsMobileOpen(false) }}
              href="/dashboard/subscription-plan"
              className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 mb-[16px] ${isActive('/dashboard/settings')
                ? 'bg-[#4a5439]'
                : 'hover:bg-[#4a5439]'
                }`}
            >
              <Image
                src={
                  isActive('/dashboard/settings')
                    ? '/images/settings-yellow.svg'
                    : '/images/settings.png'
                }
                alt="Settings"
                width={20}
                height={20}
                className="opacity-100 group-hover:hidden"
              />
              <Image
                src="/images/settings-yellow.svg"
                alt="Settings"
                width={20}
                height={20}
                className="opacity-100 hidden group-hover:block"
              />
              <p
                className={`font-normal text-[16px] leading-[20px] ${isActive('/dashboard/settings')
                  ? 'text-[#eefb75]'
                  : 'text-[#ffffff] group-hover:text-[#eefb75]'
                  } ${isCollapsed ? 'hidden' : 'block'}`}
              >
                Setting
              </p>
            </Link>

            {/* Help */}

            <div
              onClick={() => setIsDrawerOpen(true)}
              className={`flex gap-[8px] items-center px-[12px] py-[8px] rounded-[6px] cursor-pointer group transition-all duration-200 ${isActive("/dashboard/help")
                ? "bg-[#4a5439]"
                : "hover:bg-[#4a5439]"
                }`}
            >
              <div className="relative w-[20px] h-[20px]">
                <Image
                  src="/images/help.png"
                  alt="Help"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-100 group-hover:opacity-0 absolute transition-opacity ${isActive("/dashboard/help") ? "opacity-0" : ""
                    }`}
                />
                <Image
                  src="/images/help-yellow.png"
                  alt="Help"
                  width={isCollapsed ? 28 : 20}
                  height={isCollapsed ? 28 : 20}
                  className={`opacity-0 group-hover:opacity-100 absolute transition-opacity ${isActive("/dashboard/help") ? "opacity-100" : ""
                    }`}
                />
              </div>
              <p
                className={`font-normal text-[16px] leading-[20px] ${isActive("/dashboard/help")
                  ? "text-[#eefb75]"
                  : "text-[#ffffff] group-hover:text-[#eefb75]"
                  } ${isCollapsed ? "hidden" : "block"}`}
              >
                Help & support
              </p>
            </div>
          </div>
        </div>

        {/* Collapse button outside scroll area - Now visible on mobile when sidebar is open */}
        <Image
          onClick={toggleCollapse}
          src="/images/narrow.png"
          alt="Collapse"
          width={28}
          height={32}
          className={`cursor-pointer hover:scale-110 h-auto w-auto z-[10000] transition-transform duration-500 top-[26px] fixed
          ${isCollapsed ? 'left-[88px] rotate-180' : 'left-[224px]'}
          ${isMobileOpen ? 'lg:block block' : 'lg:block hidden'}`}
        />

        {/* Spacer */}
        <div
          className={`${isCollapsed ? 'w-[100px]' : 'w-[266px]'
            } transition-all duration-300 ease-in-out hidden lg:block`}
        ></div>
      </div>
            <SearchDrawerShortcut setIsSearchOpen={setIsSearchOpen} />

      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={allProperties} // your JSON array
      />
      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[2000] bg-[#121315CC] flex justify-end transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`w-full lg:max-w-[608px] md:max-w-[500px]  max-w-[280px] p-5 sm:p-7 bg-[#0A0C0B]  h-full overflow-y-auto rounded-[12px] border border-[#FFFFFF1F] transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <HelpSupportDrawer onClose={() => setIsDrawerOpen(false)} />
        </div>
      </div>
    </>

  );
}