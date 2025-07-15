import React, { useState } from "react";
import ContainerLayout from "../../Layouts/ContainerLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../assets/png/logo.png";
import Link from "next/link";
import TermsModal from "../TermsModal";

const Navbar = () => {
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div className="bg-[#08222B] fixed top-0 right-0 left-0 z-high h-[85px] items-center z-50 shadow hidden md:flex">
      <ContainerLayout>
        <div className="w-full flex justify-between items-center mt-4">
          <Link href="/" className="w-fit">
            <Image
              src={logo}
              width={logo.width}
              height={logo.height}
              alt="company logo"
            />
          </Link>
          <div className="flex items-center">
            <div className="w-fit space-x-[50px] flex">
              <Link
                href="/"
                className={`text-[#FFFFFF] text-[14px] cursor-pointer font-normal ${
                  router.pathname === "/"
                    ? "border-b-2 border-[#03B1FF] text-[#03B1FF]"
                    : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/aboutus"
                className={`text-[#FFFFFF] text-[14px] cursor-pointer font-normal ${
                  router.pathname === "/aboutus"
                    ? "border-b-2 border-[#03B1FF] text-[#03B1FF]"
                    : ""
                }`}
              >
                About us
              </Link>
              <Link
                href="/aiiPMarketplace"
                className={`text-[#FFFFFF] text-[14px] cursor-pointer font-normal ${
                  router.pathname === "/aiiPMarketplace"
                    ? "text-[#03B1FF] border-b-2 border-[#03B1FF]"
                    : ""
                }`}
              >
                AiiP Marketplace
              </Link>
            </div>

            <div className="flex items-center gap-4 ml-10">
              <button 
                onClick={() => setShowTermsModal(true)}
                className="w-[155px] h-[52px] bg-[#1FE2D6] text-[#00334B] font-medium flex items-center justify-center circular rounded-[12px] cursor-pointer hover:bg-[#1BC7BC] transition-all"
              >
                Join Presale
              </button>
              <p className="w-[220px] h-[52px] bg-[#1FE2D6] text-[#00334B] font-medium flex items-center justify-center circular rounded-[12px] cursor-pointer" onClick={() => {
                  window.open("https://forms.gle/Hckxj5r3pvokyqgZ7", "_blank");
                }}>
                Signup For ToolAi Beta
              </p>
            </div>
          </div>
        </div>
      </ContainerLayout>
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </div>
  );
};

export default Navbar;
