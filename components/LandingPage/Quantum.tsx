import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import QuatumImage from "../../assets/png/quantum.png";
import InnovativeImage from "../../assets/png/innovapp.png";
import Rectangle from "../../assets/svg/rectangle.svg";
import PotentialImage from "../../assets/photo3.jpg";
// import SecondWalletImage from "../../assets/png/2nd wallet logo.jpg";
import SecondWalletImage from "../../assets/photo4a.png";

function Quantum() {
  return (
    <div className="w-full h-auto bg-[#08222B] md:bg-transparent pt-40">
      <ContainerLayout>
        <p
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[38px] md:text-[48px] font-semibold text-center uppercase md:capitalize"
        >
          Quantum level data security
        </p>

        <p
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[20px] font-medium text-center mt-4"
        >
          ToolAi protects your data against future quantum threats
        </p>

        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center mt-10">
          <Image
            data-aos="zoom-out"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            src={QuatumImage}
            alt="quantum-image"
            className="w-full md:w-[40%] h-[447px] rounded-2xl"
          />
          <div className="w-full md:w-[55%] h-auto">
            <div className="w-full h-auto border border-[#AA14F015] rounded-[32px] p-4">
              <p
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[22px] md:text-[28px] font-semibold mt-4"
              >
                Understanding Post-Quantum Cryptography
              </p>

              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#D9D9D9] text-[16px] md:text-[18px] font-medium mt-4"
              >
                Learn about Post-Quantum Cryptography (PQC) and its role in
                securing data against quantum attacks.
              </p>
            </div>

            <div className="w-full h-auto border border-[#AA14F015] rounded-[32px] p-4 mt-4">
              <p
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[22px] md:text-[28px] font-semibold mt-4"
              >
                Examples of PQC Algorithms
              </p>

              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#D9D9D9] text-[16px] md:text-[18px] font-medium mt-4"
              >
                Explore various types of Post-Quantum Cryptography algorithms,
                including lattice-based, hash-based, code-based, and
                multivariate polynomial cryptography..
              </p>
            </div>

            <div className="w-full h-auto border border-[#AA14F015] rounded-[32px] p-4 mt-4">
              <p
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[22px] md:text-[28px] font-semibold mt-4"
              >
                Transition to PQC Algorithms
              </p>

              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#D9D9D9] text-[16px] md:text-[18px] font-medium mt-4"
              >
                Discover how ToolAi is transitioning to using PQC algorithms to
                protect against quantum threats in the future..
              </p>
            </div>
          </div>
        </div>

        <p
          data-aos="flip-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[34px] md:text-[48px] font-semibold mt-52 text-center"
        >
          ToolAI Development
        </p>

        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center pt-16">
          <div className="bg-[#00334B5C] w-full md:w-[48%] h-[500px] md:h-[430px] rounded-[16px] p-10">
            <Image
              data-aos="zoom-out"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              src={InnovativeImage}
              alt="innovative-image"
              className=" w-[100px] h-[100px]"
            />

            <div className="border border-[#AA14F015] rounded-lg">
              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#FFFFFF] text-[25px] font-semibold mt-6"
              >
                Innovative Approach
              </p>

              <div className="flex items-center mt-6">
                <Image
                  data-aos="fade-down"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  src={Rectangle}
                  alt="Rectangle-Image"
                  className="w-[12px] h-[12px] mr-6"
                />
                <p
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="text-[#D9D9D9] text-[18px] font-normal lato-regular"
                >
                  Blend of Speech Recognition, Computer Vision, Generative AI,
                  and Data Science.
                </p>
              </div>

              <div className="flex items-center mt-6">
                <Image
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  src={Rectangle}
                  alt="Rectangle-Image"
                  className="w-[12px] h-[12px] mr-6"
                />
                <p
                  data-aos="fade-down"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="text-[#D9D9D9] text-[18px] font-normal lato-regular"
                >
                  Utilization of Reactive Machines & Limited Memory AI.
                </p>
              </div>

              <div className="flex items-center mt-6">
                <Image
                  data-aos="fade-down"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  src={Rectangle}
                  alt="Rectangle-Image"
                  className="w-[12px] h-[12px] mr-6"
                />
                <p
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="text-[#D9D9D9] text-[18px] font-normal lato-regular"
                >
                  Iterative refinement process for training and data models.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#00334B5C] w-full md:w-[48%] h-[430px] rounded-[16px] p-10 mt-20 md:mt-0">
            <Image
             
              src={PotentialImage}
              alt="potential-image"
              className="w-[100px] h-[100px] rounded-full"
            />

            <div className="border border-[#AA14F015] rounded-lg pb-10">
              <p
                data-aos="fade-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                className="text-[#FFFFFF] text-[25px] font-semibold mt-6"
              >
                Unleashing Potential
              </p>

              <div className="flex items-center mt-6">
                <Image
                  data-aos="fade-down"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  src={Rectangle}
                  alt="Rectangle-Image"
                  className="w-[12px] h-[12px] mr-6"
                />
                <p
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="text-[#D9D9D9] text-[18px] font-normal lato-regular"
                >
                  Harnessing Artificial Narrow Intelligence (ANI).
                </p>
              </div>

              <div className="flex items-center mt-6">
                <Image
                  data-aos="fade-up"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  src={Rectangle}
                  alt="Rectangle-Image"
                  className="w-[12px] h-[12px] mr-6"
                />
                <p
                  data-aos="fade-down"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="text-[#D9D9D9] text-[18px] font-normal lato-regular"
                >
                  Pathway to practical applications in Artificial General
                  Intelligence (AGI).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#00334B5C] w-full h-auto mt-52 p-10 rounded-[40px] mx-auto">
          <Image
            src={SecondWalletImage}
            alt="second-wallet-image"
            className="w-[400px] md:w-[600px] h-auto mx-auto"
          />
          <p
           
            className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[32px] md:text-[48px] font-semibold text-center mt-10"
          >
            Web Immersion
          </p>

          <p
           
            className="w-full md:w-9/12 m-auto text-[#D9D9D9] text-[18px] font-normal text-center mt-3"
          >
            Experience the Web like never before by adding Web4 VR and AR
            Experiences to your Mobile and AR/VR Devices with ToolAi
          </p>

          <div
            onClick={() => window.open("http://2ndworld.io")}
           
            className="w-[155px] h-[52px] bg-[#1FE2D6] m-auto text-[#004868] text-[16px] font-normal flex items-center justify-center rounded-[12px] cursor-pointer mt-10"
          >
            Explore now
          </div>
        </div>

        <div className="w-full h-auto mt-52 ">
          <p
            
            className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[32px] md:text-[48px] font-semibold text-center"
          >
            Join the Revolution
          </p>

          <p
            
            className="w-full md:w-[60%] m-auto text-[#D9D9D9] text-[16px] md:text-[18px] font-normal lato-regular text-center mt-11"
          >
            Ready to explore the future with ToolAI? Learn more about our
            groundbreaking developments and how ToolAI can transform your life
            and your business!
          </p>
          <div
            onClick={() => window.open("https://t.me/ToolAi_Web4")}
           
            className="w-[155px] h-[52px] bg-[#1FE2D6] m-auto text-[#004868] text-[16px] font-normal flex items-center justify-center rounded-[12px] cursor-pointer my-20"
          >
            Explore ToolAI
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Quantum;
