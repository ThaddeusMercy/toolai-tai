import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import TransakLogo from "../../assets/svg/transak-seeklogo.svg";
import MoonPayLogo from "../../assets/svg/moonpay-logo.svg";
import BitMartLogo from "../../assets/svg/BiT-Mart-Logo.svg";
import AwrsLogo from "../../assets/svg/aws-logo.svg";
import SafeHarbor from "../../assets/svg/safe-harbor.svg";
import apple from "../../assets/svg/apple-logo.svg";
import google from "../../assets/svg/google-logo.svg";
import Instagram from "../../assets/svg/Instagram.svg";
import Twitter from "../../assets/svg/Twitter.svg";
import { FaLinkedin, FaTelegram, FaFacebook, FaDiscord, FaGithub } from "react-icons/fa";
import comingSoonImage from "../../assets/png/coming-soon.png";

const Footer = () => {
  return (
    <div className="w-full h-auto bg-[#000A0F] rounded-t-[32px]">
      <ContainerLayout>
        <p className="text-[#FFFFFF] text-[36px] font-bold capitalize mt-10 md:mt-20">
          Our Strategic Partners
        </p>

        <p className="text-[#D9D9D9] text-[18px] font-normal mt-4">
          We are elated to have a diverse range of partners who share our vision
          and are crucial to achieving this groundbreaking innovation. Our
          partnerships span across various crypto and blockchain sectors and
          industries, and we are glad for their collaboration and support in
          helping us bring this unprecedented innovation to life.
        </p>

        <p className="text-[#D9D9D9] text-[18px] font-normal mt-4">
          Our partnerships span across various crypto and blockchain sectors and
          industries, and we are glad for their collaboration and support in
          helping us bring this unprecedented innovation to life.
        </p>

        <p className="text-[#D9D9D9] text-[32px] font-bold mt-10 text-center">
          To be announced
        </p>

      

        <div className="bg-[#0071A4] w-full h-[2px] my-[76px]"></div>

        <div className="w-full h-[296px] custom-gradient rounded-[40px] mb-10 flex flex-col md:flex-row justify-between items-center p-5 md:p-10">
          <div className="w-full md:w-[48%] h-auto">
            <p className="text-[#FFFFFF] text-[28px] md:text-[36px] font-bold uppercase mb-10">
              ToolAi LLC.
            </p>

            <p className="text-[#D9D9D9] text-[18px] font-normal mb-4">
              Get the App
            </p>

            {/* <div className="flex items-center">
              <Image
                src={apple}
                alt="apple"
                className="w-[135px] h-[40px] mr-4"
              />
              <Image src={google} alt="google" className="w-[135px] h-[40px]" />
            </div> */}
            <div className="relative flex flex-col md:flex-row md:items-center md:space-x-4 my-10">
              <div className="relative flex flex-col md:flex-row md:items-center md:space-x-4">
                <Image
                  data-aos="zoom-out-down"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  src={apple}
                  width={apple.width}
                  height={apple.height}
                  alt="apple"
                  className="mb-4 md:mb-0 cursor-pointer z-0"
                />

                <Image
                  data-aos="zoom-out-down"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  src={google}
                  width={google.width}
                  height={google.height}
                  alt="google"
                  className="z-0"
                />

                <div className=" w-20 h-10 absolute top-[60%] md:top-[40%] left-[18%] md:left-[45%] -translate-x-1/2 -translate-y-2/3 z-50 ">
                  <Image
                    data-aos="zoom-out-up"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    src={comingSoonImage}
                    alt="Coming Soon"
                    className=" "
                  />
                </div>
              </div>
            </div>

            <p className="text-[#D9D9D9] text-[16px] font-normal mt-6">
              All rights reserved
            </p>
          </div>

          <div className="w-full md:w-[48%] h-auto rounded-[24px] p-10 mt-10 md:mt-0">
            <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center">
              <div className="w-full md:w-[48%] h-auto">
                <p className="text-[#D9D9D9] text-[16px] font-normal">
                  Send us an email
                </p>
                <p className="text-[#FFFFFF] text-[18px] font-semibold mt-2">
                  {/* info@2ndworld.io */}
                  support@toolai.ai
                </p>
              </div>
            </div>

            <div className="bg-[#0071A4] w-full h-[2px] my-6"></div>

            <div className="w-full flex items-center">
              <a href="https://www.instagram.com/toolaiofficial?igsh=MW96NjMzMjZ0NGR5cQ==" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Image src={Instagram} alt="Instagram" />
              </a>
              <a href="https://x.com/toolaiofficial?s=11" target="_blank" rel="noopener noreferrer" className="ml-4 cursor-pointer">
                <Image src={Twitter} alt="Twitter" />
              </a>
              <a href="https://www.linkedin.com/company/toolai?trk=public_post_feed-actor-image" target="_blank" rel="noopener noreferrer" className="ml-4 w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all">
                <FaLinkedin size={16} className="text-white"/>
              </a>
              <a href="https://t.me/toolaiofficial" target="_blank" rel="noopener noreferrer" className="ml-4 w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all">
                <FaTelegram size={16} className="text-white"/>
              </a>
              <a href="https://www.facebook.com/toolaiofficial" target="_blank" rel="noopener noreferrer" className="ml-4 w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all">
                <FaFacebook size={16} className="text-white"/>
              </a>
              <a href="https://discord.gg/GPYvQw6g" target="_blank" rel="noopener noreferrer" className="ml-4 w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all">
                <FaDiscord size={16} className="text-white"/>
              </a>
              <a href="https://github.com/ToolAi-ai/toolai-web" target="_blank" rel="noopener noreferrer" className="ml-4 w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-all">
                <FaGithub size={16} className="text-white"/>
              </a>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
};

export default Footer;
