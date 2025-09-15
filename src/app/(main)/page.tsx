'use client'
import LandingPage from "./landing/LandingPage";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}