'use client'
import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar } from "./dashboard-layout/Sidebar";
import { Navbar } from "./dashboard-layout/Navbar";
import Image from "next/image";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapseChange = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  return (
    <div className="relative bg-[#111] h-[100vh]">
      {/* Sidebar */}
      <Sidebar onCollapseChange={handleSidebarCollapseChange} />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:ml-[70px]" : "lg:ml-[266px]"
        }`}
      >
        <Navbar isCollapsed={isSidebarCollapsed} />
        <main className="p-6">{children}</main>
      </div>

      {/* Background shape at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] opacity-30 pointer-events-none -z-10">
        <Image
          src="/images/shape.png"
          alt="gradient"
          width={1200}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
