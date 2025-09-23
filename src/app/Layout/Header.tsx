"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#17181a] px-[0px] md:px-[89px] shadow-md">
        <div className="bg-[#0A0C0B] rounded-lg relative w-full max-w-[1304px] mx-auto">
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
                <Image src="/images/logo.png" width={61} height={18} alt="logo" />
              </Link>
            </div>

            {/* Logo with text */}
            <div className="hidden sm:flex lg:flex-1">
              <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={181}
                  height={35}
                  className="w-[181px] h-auto"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:gap-x-8 px-5 py-3 items-center relative">
              <Link
                href="/"
                className={`text-[20px] cursor-pointer pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
                ${pathname === "/" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
                group-hover:text-[#FFFFFF]`}
              >
                Home
              </Link>
              <Link
                href="/landing"
                className={`text-[20px] cursor-pointer pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
                ${pathname === "/industry" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
                group-hover:text-[#FFFFFF]`}
              >
                Pricing
              </Link>
              <Link
                href="/property-detail"
                className={`text-[20px] cursor-pointer pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
                ${pathname === "/about" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
                group-hover:text-[#FFFFFF]`}
              >
                How It Works
              </Link>
              <Link
                href="/coming-soon"
                className={`text-[20px] cursor-pointer pro-medium leading-5 hover:text-[#FFFFFF] relative group transition-colors duration-300
                ${pathname === "/coming-soon" ? "text-[#FFFFFF]" : "text-[#FFFFFF99]"}
                group-hover:text-[#FFFFFF]`}
              >
                Our Hosts
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex lg:flex-1 lg:justify-end">
              <Link
                href="/auth/signup"
                className="text-[16px] font-medium leading-5 flex items-center transition-all duration-300
                bg-[#fff] rounded-[8px] h-[30px] pt-[6px] pb-[6px] pl-[12px] pr-[12px] gap-[4px]
                lg:h-[36px] lg:pt-[8px] lg:pb-[8px] lg:pl-[24px] lg:pr-[24px] lg:gap-[8px]
                text-black"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <Image src="/images/logo.png" width={80} height={40} alt="logo" />
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
                  <button
                    className="w-full flex justify-between items-center text-[#FFFFFF99] text-base font-medium px-3 py-2"
                    onClick={() => setMobileMegaOpen(!mobileMegaOpen)}
                  >
                    Home
                  </button>

                  <Link
                    href="/coming-soon"
                    className="block text-[#FFFFFF99] text-base px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/coming-soon"
                    className="block text-[#FFFFFF99] text-base px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link
                    href="/coming-soon"
                    className="block text-[#FFFFFF99] text-base px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Hosts
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="h-[112px] lg:h-[112px]"></div>
    </>
  );
}
