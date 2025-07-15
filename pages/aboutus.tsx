import React from "react";
import Navbar from "../components/Navbar/DesktopNav";
import MobileNav from "../components/Navbar/MobileNav";
import Footer from "../components/Footer";
import ToolAiLLC from "../components/LandingPage/ToolAiLLC";

function aboutus() {
  return (
    <div className="bg-[#08222B] w-full flex flex-col h-full min-h-screen overflow-x-hidden montserrat-regular">
      <Navbar />
      <MobileNav />
      <ToolAiLLC />
      <Footer />
    </div>
  );
}

export default aboutus;
