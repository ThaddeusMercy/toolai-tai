import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import CaptureImage from "../../assets/png/capture-image.png";

function Capture() {
  return (
    <div className="bg-[#00334B5C] w-full h-auto">
      <ContainerLayout>
        <div className="w-full h-auto bg-custom-background-image bg-cover bg-center">
          <p
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="w-full md:w-8/12 m-auto bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[30px] md:text-[48px] font-extrabold text-center capitalize mt-10"
          >
            Build Ai Tools for Every Aspect of Your Business.
          </p>
          <p
            data-aos="flip-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="text-[#FFFFFF] text-[20px] font-medium text-center mt-4"
          >
            Home, Family, Life... and Sell them
          </p>
        </div>
        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center mt-10">
          <Image
            data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            src={CaptureImage}
            alt="Capture-Image"
            className="w-full md:w-[408px] h-[400px] my-10 md:my-0"
          />

          <div className="w-full md:w-[55%]">
            <p
              data-aos="fade-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[24px] md:text-[36px] font-semibold"
            >
              Capture your Ai-iP
            </p>

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="text-[#D9D9D9] text-[16px] md:text-[20px] font-medium mt-4"
            >
              Create, use, buy, and sell AiTools that make your business run
              smoother, your home happier, and your life easier. Capitalize on
              your knowledge and experience by minting your valuable AiTool into
              an AiiP. <a href="#">Create Your AiiP Now!</a>
            </p>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Capture;
