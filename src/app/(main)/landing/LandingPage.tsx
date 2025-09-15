'use client'
import React from "react";
import HeroSection from "./HeroSection";
import CardSection from "./CardSection";
import ValuePropositionsSection from "./ValuePropositionsSection";
import CertifiedProperties from "./CertifiedProperties";
import Testimonial from "./Testimonial";
import FaqSection from "./FaqSection";
import Plans from "./Plans";
import Unlock from "./Unlock";


const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <CardSection />
      <ValuePropositionsSection/>
      <CertifiedProperties/>
      <Testimonial/>
      <Plans/>
      <FaqSection/>
      <Unlock/>
    </div>
  );
};

export default LandingPage;
