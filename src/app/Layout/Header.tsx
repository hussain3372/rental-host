"use client";

import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  
  

  return (
    <header className="bg-[#17181a] px-[20px] md:px-[98px]">
      <div className="bg-[#0A0C0B] rounded-lg relative z-50 w-full max-w-[1330px] mx-auto">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between py-[24px] px-10 sm:px-[20px]"
      >
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 ">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#FFFFFF99] lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <Link href="/" className="-m-1.5 p-1.5 block sm:hidden">
            <Image
              src="/images/logo.png"
              width={61}
              height={18}
              alt="logo"
            />
          </Link>
        </div>

        {/* Logo with text */}
        <div className="hidden sm:flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
            <Image
              src="/images/logo.png"
              width={181}
              height={35}
              alt="logo"
            />
            
          </Link>
        </div>


        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-8     px-5 py-3 items-center relative">

          {/* Work */}
          <Link
            href="/"
            className={`text-[14px] pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
              ${pathname === "/" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
              group-hover:text-[#FFFFFF]`}
          >
            Home
          </Link>

          <Link
            href="/Pricing"
            className={`text-[14px] pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
              ${pathname === "/industry" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
              group-hover:text-[#FFFFFF]`}
          >
            Pricing
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`text-[14px] pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
              ${pathname === "/about" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
              group-hover:text-[#FFFFFF]`}
          >
            How It Works
          </Link>

          {/* Careers */}
          <Link
            href="/career"
            className={`text-[14px] pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
              ${pathname === "/career" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
              group-hover:text-[#FFFFFF]`}
          >
            Our Hosts
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="text-[16px] font-medium leading-5 flex items-center transition-all duration-300
              bg-[#fff]
              rounded-[6px]
              h-[32px] pt-[8px] pb-[8px] pl-[12px] pr-[12px] gap-[4px]
              lg:h-[48px] lg:pt-[14px] lg:pb-[14px] lg:pl-[24px] lg:pr-[24px] lg:gap-[8px]
              text-black"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/footerlogo.png"
                width={80}
                height={40}
                alt="logo"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6 text-[#FFFFFF99]" />
            </button>
          </div>

          <div className="mt-6">
            <div className="space-y-4">
              {/* Services */}
              <button
                className="w-full flex justify-between items-center text-[#FFFFFF99] text-base font-medium px-3 py-2"
                onClick={() => setMobileMegaOpen(!mobileMegaOpen)}
              >
                Services
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${mobileMegaOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {mobileMegaOpen && (
                <div className="ml-4 space-y-3">
                  <Link
                    href="/service"
                    className="flex items-center gap-2 text-[#FFFFFF99] text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services Item
                  </Link>
                </div>
              )}

              {/* Other links */}
              <Link
                href="/work"
                className="block text-[#FFFFFF99] text-base px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/industry"
                className="block text-[#FFFFFF99] text-base px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link
                href="/about"
                className="block text-[#FFFFFF99] text-base px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/career"
                className="block text-[#FFFFFF99] text-base px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
