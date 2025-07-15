import Head from "next/head";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Navbar from "../components/Navbar/DesktopNav";
import MobileNav from "../components/Navbar/MobileNav";
import Hero from "../components/LandingPage/Hero";
import Capture from "../components/LandingPage/Capture";
import Share from "../components/LandingPage/Share";
import Worlds from "../components/LandingPage/Worlds";
import Benefits from "../components/LandingPage/Benefits";
import Project from "../components/LandingPage/Project";
import Feature from "../components/LandingPage/Feature";
import Quantum from "../components/LandingPage/Quantum";
import logo from "../../assets/png/logo.png";
import Footer from "../components/Footer";

export default function Home() {
  const [showSecure, setShowSecure] = useState(false);
  const [showUtility, setShowUtility] = useState(false);
  const [showMinting, setShowMinting] = useState(false);


  const keywords = `
  ToolAi, Ai-Defi, Defi Ai, Ai and Crypto, blockchain with Ai
  `;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" href="https://toolai.ai" hrefLang="en" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="ToolAi" content="Ai-defi economy empowering people and businesses to evolve" />
        <meta name="author" content="ToolAi Team" />
        <meta name='description' content='ToolAi' />
        <meta name='keywords' content={keywords} />

        <meta property="og:title" content="Tool Ai" />
        <meta property="og:description" content="Ai-defi economy empowering people and businesses to evolve" />
        <meta property="og:image" content="https://toolai.ai/favicon.png" />
        <meta property="og:url" content="https://toolai.ai" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="Tool Ai" />
        <meta name="twitter:title" content="Tool Ai" />
        <meta name="twitter:description" content="Ai-defi economy empowering people and businesses to evolve" />
        <meta name="twitter:image" content="https://toolai.ai/favicon.png" />
        <meta name="twitter:url" content="https://toolai.ai" />

        <title>Tool Ai</title>
      </Head>

      <div className="bg-[#08222B] w-full h-auto montserrat-regular relative">
        <Navbar />
        <MobileNav />
        <Hero />
        <Capture />
        <Share />
        <Worlds />
        <Benefits
          setShowSecure={setShowSecure}
          setShowUtility={setShowUtility}
          setShowMinting={setShowMinting}
        />
        <Project />
        <Feature />
        <Quantum />
        <Footer />

        {showSecure && (
          <div className="w-full md:w-[50rem] flex flex-col absolute top-[40%] md:top-[32%] bg-[#1FE2D6] md:left-[20%] z-50 shadow-lg border border-[#000A0F] rounded-xl p-4">
            <span
              onClick={() => setShowSecure(false)}
              className="w-full text-black flex justify-end items-end cursor-pointer"
            >
              <IoCloseCircleSharp />
            </span>
            <p className="text-[#00334B] text-[14px] font-semibold mt-4 mb-5">
              Within the ToolAi app, users can access a range of DeFi
              (Decentralized Finance) features designed to enhance financial
              freedom, security, and anonymity. Through decentralized platforms
              and protocols, users can participate in various financial
              activities, such as lending, borrowing, and trading, without the
              need for traditional intermediaries. One of the key advantages of
              DeFi is its emphasis on security and anonymity, achieved through
              blockchain technology and cryptographic techniques. Transactions
              are executed securely on the blockchain, ensuring tamper-proof
              records and protection against unauthorized access. Additionally,
              users maintain full control over their funds and personal
              information, with no central authority holding custody. This
              aligns seamlessly with the user-centric ethos of the ToolAi
              ecosystem, where individuals have sovereignty over their data and
              financial assets. Furthermore, DeFi protocols often incorporate
              privacy-enhancing features, such as zero-knowledge proofs and
              encrypted transactions, safeguarding users' identities and
              transaction details. By integrating DeFi features within the
              ToolAi ecosystem, users can leverage the benefits of decentralized
              finance while enjoying enhanced privacy, security, and control
              over their financial activities.
            </p>
          </div>
        )}

        {showUtility && (
          <div className="w-full md:w-[50rem] flex flex-col absolute top-[40%] md:top-[31.6%] bg-[#1FE2D6] md:left-[20%] z-50 shadow-lg border border-[#000A0F] rounded-xl p-4">
            <span
              onClick={() => setShowUtility(false)}
              className="w-full text-black flex justify-end items-end cursor-pointer"
            >
              <IoCloseCircleSharp />
            </span>
            <p className="text-[#00334B] text-[14px] font-semibold mt-4 mb-5">
              The integration of I-NFT minting and utility within the ToolAi
              ecosystem heralds a new era of interactive digital asset ownership
              and utilization. I-NFTs, or interactive non-fungible tokens,
              revolutionize the concept of digital ownership by linking tangible
              assets and experiences to blockchain technology. Through the
              process of minting I-NFTs, users can transform real, virtual, or
              augmented reality assets into securely tradeable tokens. These
              tokens are not only visually displayed on a variety of devices,
              including mobile, augmented reality goggles, or holographic
              displays, but they also grant users unique access and control
              privileges in various environments. Whether it's unlocking hotel
              room safes, accessing exclusive AR content at events, or
              controlling virtual assets in immersive experiences, I-NFTs
              provide unprecedented levels of interactivity and utility.
              Additionally, ToolAi's innovative development of 3D scanners and
              utilization of LIDAR systems enable users to digitize physical
              assets and mint them into I-NFTs seamlessly. This advancement not
              only expands the possibilities for asset tokenization but also
              paves the way for a vibrant marketplace where users can trade,
              interact, and assign properties to their I-NFTs securely. With the
              upcoming ToolAi/2nd World Apple Vision Pro App, users can expect
              even greater opportunities to engage with their I-NFTs and unlock
              new dimensions of digital ownership and interaction.
            </p>
          </div>
        )}

        {showMinting && (
          <div className="w-full md:w-[50rem] flex flex-col absolute top-[40%] md:top-[32%] bg-[#1FE2D6] md:left-[20%] z-50 shadow-lg border border-[#000A0F] rounded-xl p-4">
            <span
              onClick={() => setShowMinting(false)}
              className="w-full text-black flex justify-end items-end cursor-pointer"
            >
              <IoCloseCircleSharp />
            </span>
            <p className="text-[#00334B] text-[14px] font-semibold mt-4 mb-5">
            The introduction of AiiP (Pronounced APE) minting and trading within the ToolAi ecosystem heralds a groundbreaking paradigm shift in the valuation and utilization of intellectual property. AiiP, or Artificial Intelligence Intellectual Property, empower users to transform their expertise and business strategies into securely tradable assets on the blockchain. By training AiTools (Ai Bots) to understand and execute specific business or marketing strategies, users can encapsulate the intellectual essence of their operations into tangible tokenized form. This innovative approach allows individuals to collateralize their valuable knowledge and expertise, opening up new avenues for monetization and exchange. Moreover, the creation of a dedicated marketplace within the 2nd World ecosystem enables users to trade AiiPs seamlessly, thereby unlocking the true potential of artificial intelligence and intellectual property. With AiiPs, ToolAi not only revolutionizes the way intellectual property is valued but also fosters a vibrant economy where the knowledge and expertise of individuals are recognized and rewarded like never before.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
