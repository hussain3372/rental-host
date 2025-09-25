import type { ReactNode } from "react";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";

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
