"use client"; // Add this line
import React from "react";
import LandingPage from "./LandingPage";
import Header from "@/app/Layout/Header";
import Footer from "@/app/Layout/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default page;
