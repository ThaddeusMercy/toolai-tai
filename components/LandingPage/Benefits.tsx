import React, { useState } from "react";
import Image from "next/image";
import { IoCloseCircleSharp } from "react-icons/io5";
import ContainerLayout from "../../Layouts/ContainerLayout";
import LockImage from "../../assets/png/securedatamon.png";
import MintImage from "../../assets/png/inftmint.png";
import TradeImage from "../../assets/png/aiimt.png";

function Benefits({ setShowSecure, setShowUtility, setShowMinting }) {
  return (
    <div className="w-full h-auto bg-[#000A0F]">
      <ContainerLayout>
        <div className="w-full h-auto mt-32 md:mt-[120px] mb-10">
          <p
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="text-[#FFFFFF] text-[34px] md:text-[36px] font-semibold md:font-bold capitalize text-center mb-16"
          >
            Benefits of the ToolAi Ecosystem
          </p>

          <div className="w-full md:w-11/12 h-auto flex flex-col md:flex-row justify-between items-center mb-40 m-auto">
            <div
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="w-full md:w-[30%] h-auto custom-gradient rounded-[32px] p-6 hover:bg-[#DAA15D14] cursor-default flex flex-col justify-center items-center text-center"
            >
              <Image
                src={LockImage}
                alt="lock-Image"
                className="w-[80px] h-[80px] mb-4"
              />

              <p className="text-[#FFFFFF] text-[28px] font-semibold">
                Secure Data Monetization
              </p>

              <button
                onClick={() => setShowSecure(true)}
                className="text-[#FFFFFF] text-[14px] font-normal"
              >
                Learn more
              </button>
            </div>

            <div
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="w-full md:w-[30%] h-auto custom-gradient rounded-[32px] p-6 hover:bg-[#DAA15D14] cursor-default flex flex-col justify-center items-center text-center my-10 md:my-0"
            >
              <Image
                src={MintImage}
                alt="mint-Image"
                className="w-[80px] h-[80px] mb-4"
              />

              <p className="text-[#FFFFFF] text-[28px] font-semibold">
                I-NFT Minting and Utility
              </p>

              <button
                onClick={() => setShowUtility(true)}
                className="text-[#FFFFFF] text-[14px] font-normal"
              >
                Learn more
              </button>

              {/* {showUtility && (
                <p className="text-[#FFFFFF] text-[13px] font-normal text-center mt-4">
                  The integration of I-NFT minting and utility within the ToolAi
                  ecosystem heralds a new era of interactive digital asset
                  ownership and utilization. I-NFTs, or interactive non-fungible
                  tokens, revolutionize the concept of digital ownership by
                  linking tangible assets and experiences to blockchain
                  technology. Through the process of minting I-NFTs, users can
                  transform real, virtual, or augmented reality assets into
                  securely tradeable tokens. These tokens are not only visually
                  displayed on a variety of devices, including mobile, augmented
                  reality goggles, or holographic displays, but they also grant
                  users unique access and control privileges in various
                  environments. Whether it's unlocking hotel room safes,
                  accessing exclusive AR content at events, or controlling
                  virtual assets in immersive experiences, I-NFTs provide
                  unprecedented levels of interactivity and utility.
                  Additionally, ToolAi's innovative development of 3D scanners
                  and utilization of LIDAR systems enable users to digitize
                  physical assets and mint them into I-NFTs seamlessly. This
                  advancement not only expands the possibilities for asset
                  tokenization but also paves the way for a vibrant marketplace
                  where users can trade, interact, and assign properties to
                  their I-NFTs securely. With the upcoming ToolAi/2nd World
                  Apple Vision Pro App, users can expect even greater
                  opportunities to engage with their I-NFTs and unlock new
                  dimensions of digital ownership and interaction.
                </p>
              )} */}
            </div>

            <div
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="w-full md:w-[30%] h-auto custom-gradient rounded-[32px] p-6 hover:bg-[#DAA15D14] cursor-default flex flex-col justify-center items-center text-center"
            >
              <Image
                src={TradeImage}
                alt="trade-Image"
                className="w-[80px] h-[80px] mb-4"
              />

              <p className="text-[#FFFFFF] text-[28px] font-semibold">
                AiiP Minting and Trading
              </p>

              <button
                onClick={() => setShowMinting(true)}
                className="text-[#FFFFFF] text-[14px] font-normal"
              >
                Learn more
              </button>

              {/* {showMinting && (
                <p className="text-[#FFFFFF] text-[13px] font-normal text-center mt-4">
                  The introduction of AiiP-NFT (Pronounced APE-NFT) minting and
                  trading within the ToolAi ecosystem heralds a groundbreaking
                  paradigm shift in the valuation and utilization of
                  intellectual property. AiiP-NFTs, or Artificial Intelligence
                  Intellectual Property Non-Fungible Tokens, empower users to
                  transform their expertise and business strategies into
                  securely tradable assets on the blockchain. By training
                  AiTools (Ai Bots) to understand and execute specific business
                  or marketing strategies, users can encapsulate the
                  intellectual essence of their operations into tangible NFT
                  form. This innovative approach allows individuals to
                  collateralize their valuable knowledge and expertise, opening
                  up new avenues for monetization and exchange. Moreover, the
                  creation of a dedicated marketplace within the 2nd World
                  ecosystem enables users to trade AiiP-NFTs seamlessly, thereby
                  unlocking the true potential of artificial intelligence and
                  intellectual property. With AiiP-NFTs, ToolAi not only
                  revolutionizes the way intellectual property is valued but
                  also fosters a vibrant economy where the knowledge and
                  expertise of individuals are recognized and rewarded
                  like never before.
                </p>
              )} */}
            </div>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Benefits;
