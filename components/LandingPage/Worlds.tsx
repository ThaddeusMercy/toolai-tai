import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import Phone1 from "../../assets/png/phone1.png";
import Phone2 from "../../assets/png/phone2.png";
import Phone3 from "../../assets/png/phone3.png";
import Phone4 from "../../assets/png/phone4.png";
import Phone5 from "../../assets/png/phone5.png";

function Worlds() {
  const phoneImages = [Phone1, Phone2, Phone3, Phone4, Phone5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % phoneImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [phoneImages.length]);

  // Determine if animation class should be applied
  const animateClass = currentImageIndex + 1 ? "animate-left" : "animate-left";

  return (
    <ContainerLayout>
      <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center mt-20 md:mt-[120px] md:space-x-6 pb-10">
        <div className="w-full md:w-auto h-auto phone-style flex justify-center items-center p-8">
          <Image
            src={phoneImages[currentImageIndex]}
            alt="Phone-Image"
            width={360}
            height={572}
            className={`object-cover ${animateClass}`}
          />
        </div>

        <div className="w-full md:w-[50%] h-auto mt-20 md:mt-0">
          <p
            data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="text-[#FFFFFF] text-[38px] md:text-[48px] font-semibold md:font-bold capitalize"
          >
            The Worlds Info Intelligently into one page
          </p>
          <p
            data-aos="fade-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            className="text-[#FFFFFF] text-[20px] font-medium mt-4"
          >
            Unlocking the potential of Web4 with Tool Ai’s revolutionary
            browsing experience.
          </p>
        </div>
      </div>
    </ContainerLayout>
  );
}

export default Worlds;
