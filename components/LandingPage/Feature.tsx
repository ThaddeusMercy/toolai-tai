import React, { useState } from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import AiFeature from "../../assets/png/ai-feature.png";
import DefiFeature from "../../assets/png/defi-feature.png";
import Web4Feature from "../../assets/png/web4-feature.png";

function Feature() {
  const [aiFeaturesDropDown, setAiFeaturesDropDown] = useState(false);
  const [defiFeaturesDropDown, setDefiFeaturesDropDown] = useState(false);
  const [web4FeaturesDropDown, setWeb4FeaturesDropDown] = useState(false);

  return (
    <div className="w-full h-auto bg-[#000A0F] md:pb-40">
      <ContainerLayout>
        <div className="w-full md:w-11/12 m-auto h-auto mt-14 md:mt-[260px] items-center flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[35%]">
            <p
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[26px] md:text-[48px] font-semibold uppercase md:capitalize"
            >
              ToolAi Features
            </p>

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="text-[#D9D9D9] text-[16px] md:text-[20px] font-medium mt-3"
            >
              ToolAi is a cutting-edge AI-driven Web4 browser prioritizing user
              experience, streamlining internet usage, and enhancing content
              interaction.
            </p>
          </div>

          <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-between items-center">
            <div
              onClick={() => setAiFeaturesDropDown(!aiFeaturesDropDown)}
              data-aos="fade-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className={`w-full md:w-[38%] md:h-[245px] flex md:flex-col items-center custom-gradient rounded-[16px] p-6 hover:bg-[#DAA15D14] ${
                aiFeaturesDropDown ? "custom-light-gradient" : ""
              } cursor-pointer my-10 md:my-0`}
            >
              <Image
                src={AiFeature}
                alt="Ai-Feature"
                className="w-[64px] md:w-[80px] h-[64px] md:h-[80px] mr-6"
              />
              <p className="text-[#FFFFFF] text-[28px] font-semibold">
                AI Features
              </p>
            </div>

            <div className="w-full md:w-[58%] h-auto">
              <div
                onClick={() => setDefiFeaturesDropDown(!defiFeaturesDropDown)}
                data-aos="fade-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className={`w-full h-auto flex items-center custom-gradient rounded-[16px] p-6 hover:bg-[#DAA15D14] cursor-pointer mb-10 md:mb-0 ${
                  defiFeaturesDropDown ? "custom-light-gradient" : ""
                }`}
              >
                <Image
                  src={DefiFeature}
                  alt="Defi-Feature"
                  className="w-[64px] h-[64px]"
                />
                <p className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] font-semibold">
                  DeFi Features
                </p>
              </div>

              <div
                onClick={() => setWeb4FeaturesDropDown(!web4FeaturesDropDown)}
                data-aos="fade-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className={`w-full h-auto flex items-center custom-gradient rounded-[16px] mt-6 p-6 hover:bg-[#DAA15D14] cursor-pointer mb-10 md:mb-0 ${
                  web4FeaturesDropDown ? "custom-light-gradient" : ""
                }`}
              >
                <Image
                  src={Web4Feature}
                  alt="Web4-Feature"
                  className="w-[64px] h-[64px]"
                />
                <p className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] font-semibold">
                  Web4 Features
                </p>
              </div>
            </div>
          </div>
        </div>

        {aiFeaturesDropDown && (
          <div className="w-full md:w-11/12 m-auto h-auto mt-6 custom-gradient p-10 hover:bg-[#DAA15D14] rounded-[16px] cursor-default">
            <p
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="text-[#D9D9D9] text-[16px] md:text-[20px] font-medium"
            >
              The integrated ToolAi Chat bot serves as a versatile virtual
              assistant, available throughout the ecosystem to provide instant
              support, answer inquiries, and assist users with navigation and
              tasks. Develop and Create AiTools: Users have the ability to
              design and develop AiTools customized for specific tasks,
              empowering them to automate processes and optimize workflows with
              tailored AI solutions. Mint AiTools into AiiPs: Through ToolAi,
              users can mint their AiTools into AiiPs (Artificial Intelligence
              Intellectual Property Nonfungible Tokens), facilitating the
              trading of intellectual property in a novel DeFi economy. AI Web
              Search: ToolAi's AI web search feature revolutionizes information
              gathering by meticulously researching, analyzing, and condensing
              vast amounts of web content into comprehensive, digestible
              summaries, saving users valuable time and effort in their online
              research endeavors.
            </p>
          </div>
        )}

        {defiFeaturesDropDown && (
          <div className="w-full md:w-11/12 m-auto h-auto mt-6 custom-gradient p-10 hover:bg-[#DAA15D14] rounded-[16px] cursor-default">
            <p
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="text-[#D9D9D9] text-[16px] md:text-[20px] font-medium"
            >
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

        {web4FeaturesDropDown && (
          <div className="w-full md:w-11/12 m-auto h-auto mt-6 custom-gradient p-10 hover:bg-[#DAA15D14] rounded-[16px] cursor-default">
            <p
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="text-[#D9D9D9] text-[16px] md:text-[20px] font-medium"
            >
              Experience the future of digital interaction with ToolAi's
              cutting-edge Web4 features, powered by 2nd World. Seamlessly
              integrated into your web browser search results, AR/VR storefronts
              transport you into immersive shopping experiences like never
              before. Attend virtual concerts and events in stunning detail,
              bringing the excitement of live performances directly to your
              screen. With I-NFT Integration, users can create and utilize
              I-NFTs in virtual and augmented reality environments, unlocking
              new dimensions of ownership and interaction. Elevate your digital
              presence with AiiP Avatar Creation, allowing you to personalize
              avatars for your AiiP AiTools and engage with them in AR/VR
              environments. Transform your workspace with AR/VR office
              environments, fostering collaboration and productivity in virtual
              settings. Stay connected with AR/VR messaging and video calls,
              enhancing communication with friends, colleagues, and clients in
              immersive environments. Embrace the future of digital interaction
              with ToolAi's Web4 features, where the boundaries between virtual
              and reality blur seamlessly.
            </p>
          </div>
        )}
      </ContainerLayout>
    </div>
  );
}

export default Feature;
