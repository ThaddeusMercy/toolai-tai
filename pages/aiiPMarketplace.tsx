import React from "react";
import Navbar from "../components/Navbar/DesktopNav";
import MobileNav from "../components/Navbar/MobileNav";
import AiiPMarketplaceHero from "../components/LandingPage/aiiPMarketplaceHero";
import Footer from "../components/Footer";
import AiiPSection from "../components/LandingPage/AiiPSection";

function aiiPMarketplace() {
  return (
    <div className="bg-[#08222B] w-full flex flex-col h-full min-h-screen overflow-x-hidden montserrat-regular">
      <Navbar />
      <MobileNav />
      <AiiPMarketplaceHero />
      <AiiPSection />
      <Footer />
    </div>
  );
}

export default aiiPMarketplace;
