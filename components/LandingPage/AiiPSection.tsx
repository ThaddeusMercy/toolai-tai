import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import Rectangle from "../../assets/svg/rectangle.svg";
import ContentImage from "../../assets/png/assesimmersive.png";
import ParticipateImage from "../../assets/png/connectlikemind.png";

function AiiPSection() {
  return (
    <ContainerLayout>
      <div className="w-11/12 md:w-11/12 h-auto m-auto flex flex-col-reverse md:flex-row justify-between items-center mt-[100px] md:mt-[200px] text-start">
        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="w-full md:w-[48%] bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] md:text-[36px] font-medium mt-10 md:mt-0"
        >
          Unlock Exclusive AR/VR Content
        </p>

        <div
          data-aos="zoom-out"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="relative w-full md:w-[48%] h-[327px] md:h-[280px] rounded-[32px] overflow-hidden hover:bg-[#DAA15D14] cursor-default"
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
              src={ContentImage}
              alt="Content-Image"
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
          <div className="absolute bottom-0 left-0 right-0 h-[202px] md:h-[150px] rounded-b-[32px] custom-gradient p-4 text-start">
            <div className="flex items-center">
              <Image
                src={Rectangle}
                alt="Rectangle-Image"
                className="w-[12px] h-[12px] mr-6"
              />
              <p className="text-[#D9D9D9] text-[16px] font-normal">
                Access immersive experiences in 2nd World using the AiiPs you
                create.
              </p>
            </div>

            <div className="flex items-center mt-6">
              <Image
                src={Rectangle}
                alt="Rectangle-Image"
                className="w-[12px] h-[12px] mr-6"
              />
              <p className="text-[#D9D9D9] text-[16px] font-normal">
                Dive into virtual and augmented reality experiences using your
                AiiP to create even more functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 md:w-11/12 h-auto m-auto flex flex-col md:flex-row justify-between items-center mt-[100px] md:mt-[200px] text-start">
        <div
          data-aos="zoom-in"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="relative w-full md:w-[48%] h-[315px] md:h-[275px] rounded-[32px] overflow-hidden hover:bg-[#DAA15D14] cursor-default"
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
              src={ParticipateImage}
              alt="Participate-Image"
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
          <div className="absolute bottom-0 left-0 right-0 h-[187px] md:h-[150px] rounded-b-[32px] custom-gradient p-4 text-start">
            <div className="flex items-center">
              <Image
                src={Rectangle}
                alt="Rectangle-Image"
                className="w-[12px] h-[12px] mr-6"
              />
              <p className="text-[#D9D9D9] text-[16px] font-normal">
                Connect and trade with other like-minded Ai driven individuals
                and companies.
              </p>
            </div>

            <div className="flex items-center mt-6">
              <Image
                src={Rectangle}
                alt="Rectangle-Image"
                className="w-[12px] h-[12px] mr-6"
              />
              <p className="text-[#D9D9D9] text-[16px] font-normal">
                Collaborate on training and projects fueled by AI innovation
              </p>
            </div>
          </div>
        </div>

        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="w-full md:w-[48%] bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[27px] md:text-[36px] font-medium mt-10 md:mt-0"
        >
          Participate in Innovative Collaborations
        </p>
      </div>

      <div className="w-full md:w-11/12 h-auto m-auto text-center mt-[100px] md:mt-[200px] flex flex-col justify-center items-center">
        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[24px] font-normal"
        >
          Dive Into a Vibrant Marketplace
        </p>

        <p
          data-aos="fade-up "
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#91D1E2] text-[20px] font-medium"
        >
          Ready to explore the endless possibilities of AiiPs? <br /> Join the
          2nd World AiiP Marketplace to buy and develop specialized and valuable
          time saving Ai Agents
        </p>

        <div
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSf6QuJwyDpQGMZ4rS7dGrZXIIBDOTcoRG-RNaZ5X4EuWoXcuA/viewform")}
          className="w-[245px] h-[56px] bg-[#0071A4] text-[#FFFFFF] flex items-center justify-center rounded-[16px] cursor-pointer my-[32px]"
        >
          Explore the Marketplace
        </div>
      </div>
    </ContainerLayout>
  );
}

export default AiiPSection;
