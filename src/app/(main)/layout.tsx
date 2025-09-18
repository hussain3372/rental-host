import type { ReactNode } from "react";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Header";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
