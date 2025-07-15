import React from "react";
import ContainerLayout from "../Layouts/ContainerLayout";
import Image from "next/image";
import wordLogo from '../assets/png/2ndWorld.png'

function SecondTab() {
  return (
    <ContainerLayout>
      <div className="w-full h-auto">
        <Image
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          src={wordLogo}
          alt="2nd World Logo"
          className=" w-[14rem]"
        />

        <p
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          2nd World LLC: Advancing Augmented Reality and Virtual Reality
          Technology through Collaboration with ToolAi.2nd World LLC announces
          its partnership with ToolAi, focusing on the development of Al-enabled
          AR/VR content, storefronts, events, and the expansion of AR/VR/XR
          capabilities within the ToolAi App. This collaboration represents a
          strategic effort to enhance the digital experience for ToolAi users by
          integrating cutting-edge AR/VR/XR technology seamlessly into the
          ecosystem.
        </p>

        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          As an independent entity, 2nd World LLC operates with a clear focus on
          delivering World innovative AR/VR experiences that complement and
          enrich the ToolAi platform. By leveraging its expertise in immersive
          technology, 2nd World aims to contribute to the growth and evolution
          of the ToolAi ecosystem. Central to the partnership is the development
          of an AiiP & I-NFT Marketplace, providing a platform for trading NFTs,
          I-NFTs, and AiiPs within the ToolAi community.
        </p>

        <p
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          This marketplace will facilitate digital asset exchange and
          collaboration, empowering users to engage with and benefit from the
          diverse range of digital content available within the ecosystem.
          Through the collaboration between ToolAi and 2nd World LLC, users can
          anticipate a seamless integration of AR/VR/XR technology, offering new
          opportunities for interaction and engagement. By combining forces,
          ToolAi and 2nd World are positioned to drive innovation in the
          AR/VR/XR space and shape the future of digital experiences.
        </p>

        <p
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#FFFFFF] text-[16px] md:text-[20px] font-medium text-start mt-4 mb-[20px] md:mb-[82px]"
        >
          To learn more about 2nd World and the partnership with ToolAi{" "}
          <a
            className="text-[#1FE2D6] text-[16px] md:text-[20px] font-medium italic underline"
            href="https://t.me/Ai2ndWorld"
          >
            Click here
          </a>
        </p>
      </div>
    </ContainerLayout>
  );
}

export default SecondTab;
