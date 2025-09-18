import type { ReactNode } from "react";
import Sidebar from "./dashboard-layout/Sidebar";
import Navbar from "./dashboard-layout/Navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-content flex">
      <Sidebar/>
      <div>
      <Navbar/>
      {children}
      </div>
    </div>
  );


  
}