import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import discover1 from "../../assets/png/aiiptext.png";
// import discover1 from "../../assets/png/discover1.png";
import ExploreImage from "../../assets/png/diversemeticu.png";
import Rectangle from "../../assets/svg/rectangle.svg";

function aiiPMarketplaceHero() {
  return (
    <div className="w-full h-auto bg-custom-background-image bg-cover bg-center">
      <ContainerLayout>
        <div className="w-full h-auto text-center mt-32 md:mt-[120px]">
          <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center px-2 md:px-20">
            <div className="w-full md:w-[45%] h-auto">
              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] md:text-[36px] font-medium text-center md:text-start"
              >
                Discover the 2nd World <br /> AiiP Marketplace
              </p>

              <p
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#91D1E2] text-[16px] md:text-[20px] font-medium text-center md:text-start my-5 md:my-0"
              >
                Comprehensively train, develop and trade Ai Agents securely on
                L2 blockchain.
              </p>
            </div>
            <Image
              data-aos="fade-right"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              src={discover1}
              alt="discover1"
              className="w-full md:w-[45%] h-auto mt-10 md:mt-0"
            />
          </div>

          <div className="w-11/12 md:w-11/12 h-auto m-auto flex flex-col md:flex-row justify-between items-center mt-[100px] md:mt-[200px] text-start">
            <div
              data-aos="fade-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="relative w-full md:w-[48%] h-[305px] md:h-[253px] rounded-[32px] overflow-hidden hover:bg-[#DAA15D14] cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-[128px] bg-[#00334B5C] rounded-t-[32px]">
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <Image
                  src={ExploreImage}
                  alt="Explore-Image"
                  className="absolute w-[80px] h-[80px] top-5 left-[42%] z-50"
                />
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
                <div className="w-full h-[2.46px] bg-[#0A1419] mb-1"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[177px] md:h-[125px] rounded-b-[32px] custom-gradient p-4 text-start">
                <div className="flex items-center">
                  <Image
                    src={Rectangle}
                    alt="Rectangle-Image"
                    className="w-[12px] h-[12px] mr-6"
                  />
                  <p className="text-[#D9D9D9] text-[16px] font-normal">
                  Diverse array of meticulously crafted AiiPs.
                  </p>
                </div>

                <div className="flex items-center mt-6">
                  <Image
                    src={Rectangle}
                    alt="Rectangle-Image"
                    className="w-[12px] h-[12px] mr-6"
                  />
                  <p className="text-[#D9D9D9] text-[16px] font-normal">
                    Tokenization of invaluable expertise and business strategies
                    into tradable AiiPs
                  </p>
                </div>
              </div>
            </div>

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="w-full md:w-[48%] bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] md:text-[36px] font-medium mt-10 md:mt-0"
            >
              Explore Al-Enabled Intellectual Property Non-Fungible Tokens
              (AiiPs)
            </p>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default aiiPMarketplaceHero;
