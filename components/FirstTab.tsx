import React from "react";
import ContainerLayout from "../Layouts/ContainerLayout";
import Image from "next/image";
import TAIlOGO from '../assets/png/TAI_Logo.png'
function FirstTab() {
  return (
    <ContainerLayout>
      <div className="w-full h-auto">
      <Image
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          src={TAIlOGO}
          alt="Tool AI logo"
          className=" w-[7rem]"
        />

        <p
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          A New Frontier in Digital Currency Evolution.TAl+ cryptocurrency
          represents a strategic collaboration between 2nd World and ToolAi, marking a significant milestone in the digital currency
          ecosystem. Operated independently by TAl+ LLC, TAl+ benefits from the
          expertise and resources of both entities, combining ToolAi's
          innovative technologies with TAl+'s focused approach to digital
          currency use case and data management.
        </p>

        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          As a separate entity, TAl+ LLC provides a dedicated platform for the
          development and promotion of TAI+, ensuring a clear focus on its
          growth and sustainability. This partnership offers users and token
          holders the assurance of a World robust and well-supported digital
          currency ecosystem, backed by the combined strengths of ToolAi and
          TAl+ LLC. TAl+ will be available for trading on both decentralized
          (DEX) and centralized (CEX) public exchanges, providing liquidity and
          accessibility to a wide range of users. This dual listing strategy
          reflects TAl+'s commitment to fostering inclusivity and democratizing
          access to digital currency markets.
        </p>

        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[16px] md:text-[18px] font-normal text-start mt-4"
        >
          With a focus on security, transparency, and user empowerment, TAl+
          aims to redefine the digital currency experience, offering innovative
          features and value-added services to its users. By leveraging the
          partnership between ToolAi and TAI+ LLC, TAI+ is poised to carve out a
          unique position in the digital currency landscape, driving innovation
          and advancing the adoption of digital assets and their use cases
          worldwide.
        </p>

        <p
          data-aos="fade-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#FFFFFF] text-[16px] md:text-[20px] font-medium text-start mt-4"
        >
          To learn more about TAl+ and the partnership with ToolAi.
        </p>

        <div
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          onClick={() => window.open("https://t.me/toolaiofficial")}
          className="w-[155px] h-[52px] bg-[#0071A4] text-[#FFFFFF] flex items-center justify-center rounded-[12px] cursor-pointer my-[20px] md:my-[82px]"
        >
          Learn more
        </div>
      </div>
    </ContainerLayout>
  );
}

export default FirstTab;
