import React, { useState } from "react";
import logo from "../../assets/png/logo.png";
import Image from "next/image";
import Link from "next/link";
import bars from "../../assets/svg/bars.svg";
import close from "../../assets/svg/close.svg";
import TermsModal from "../TermsModal";

const styles = {
  active: "",
  nonactive: "",
};
const MobileNav = ({ present }: any) => {
  const [show, setShow] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <div>
      <div className="w-full bg-[#08222B] pt-4 fixed top-0 z-50 shadow left-0 right-0 flex flex-col md:hidden overflow-x-hidden">
        <div className="w-full flex items-center justify-between px-4 h-[65px]">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>

          <div className="w-fit" onClick={() => setShow(!show)}>
            <Image src={show ? close : bars} alt="bars" className="w-[24px]" />
          </div>
        </div>

        {show && (
          <div className="bg-[#08222B] w-full flex flex-col items-center z-50 transition-all duration-1000 delay-1000 h-[90vh] ">
            <div className="flex flex-col w-full px-4 mt-[45px]">
              <div
                className="w-full py-6 border-b border-b-[#ABB3BF]"
                onClick={() => setShow(false)}
              >
                <Link href="/" className="text-[#FFFFFF] text-base font-[500]">
                  Home
                </Link>
              </div>
              <div
                className="w-full py-6 border-b border-b-[#ABB3BF]"
                onClick={() => setShow(false)}
              >
                <Link
                  href="/aboutus"
                  className="text-[#FFFFFF] text-base font-[500]"
                >
                  About us
                </Link>
              </div>
              <div
                className="w-full py-6 border-b border-b-[#ABB3BF]"
                onClick={() => setShow(false)}
              >
                <Link
                  href="/aiiPMarketplace"
                  className="text-[#FFFFFF] text-base font-[500]"
                >
                  AiiP Marketplace
                </Link>
              </div>
              
              <div className="w-full py-6 border-b border-b-[#ABB3BF]">
                <button 
                  onClick={() => {
                    setShow(false);
                    setShowTermsModal(true);
                  }}
                  className="w-full h-[52px] rounded-[10px] bg-[#1FE2D6] text-[#00334B] font-medium"
                >
                  Join Presale
                </button>
              </div>
              
              <button className="w-full flex justify-center items-center h-[52px] font-medium rounded-[10px] bg-[#1FE2D6] text-[#00334B] mt-[80px] " onClick={() => {
                  window.open("https://forms.gle/Hckxj5r3pvokyqgZ7", "_blank");
                }}>
                Signup For ToolAi Beta
              </button>
            </div>
          </div>
        )}
      </div>
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
    </div>
  );
};

export default MobileNav;
