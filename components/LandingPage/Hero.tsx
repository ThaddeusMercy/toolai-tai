import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ContainerLayout from "../../Layouts/ContainerLayout";
import google from "../../assets/svg/google-logo.svg";
import apple from "../../assets/svg/apple-logo.svg";
import comingSoonImage from "../../assets/png/coming-soon.png";
import TAIlogo from "../../assets/png/TaiLogo.png";
import TermsModal from "../TermsModal";

// import comingSoonImage from "../../assets/coming-soon.jpeg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero = () => {
  const router = useRouter();
  const initialDuration = useMemo(() => ({
    days: 90,
    hours: 59,
    minutes: 59,
    seconds: 59,
  }), []);

  const calculateEndTime = (duration: TimeLeft) => {
    const now = new Date();
    const endTime = new Date(now);
    endTime.setDate(now.getDate() + duration.days);
    endTime.setHours(now.getHours() + duration.hours);
    endTime.setMinutes(now.getMinutes() + duration.minutes);
    endTime.setSeconds(now.getSeconds() + duration.seconds);
    return endTime;
  };

  const getTimeLeft = (endTime: Date): TimeLeft => {
    const now = new Date();
    const difference = endTime.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialDuration);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedEndTime = localStorage.getItem("endTime");
      if (!savedEndTime) {
        const newEndTime = calculateEndTime(initialDuration);
        localStorage.setItem("endTime", newEndTime.toISOString());
        savedEndTime = newEndTime.toISOString();
      }
      const endTime = new Date(savedEndTime);
      setEndTime(endTime);
      setTimeLeft(getTimeLeft(endTime));
    }
  }, [initialDuration]);

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setTimeLeft(getTimeLeft(endTime));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [endTime]);

  return (
    <div className="bg-custom-background-image bg-cover bg-center pb-[80px] md:pb-[150px]">
      <ContainerLayout>
        <div className="w-full h-auto md:flex justify-between items-center mt-28 md:mt-[120px]">
          <div className="w-full md:w-[55%] h-auto">
            <p
              data-aos="zoom-in-up"
              data-aos-easing="linear"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] md:text-[48px] font-semibold capitalize"
            >
              Ai-DeFi economy empowering people and businesses to evolve
            </p>

            <p
              data-aos="zoom-in-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
              className="text-[#FFFFFF] text-[18px] md:text-[20px] font-normal"
            >
              Upgrade to the AI Web4 Browser Experience now
            </p>

            <div className="relative flex flex-row items-center space-x-4 my-10">
              <div className="relative flex flex-row items-center space-x-4">
                <Image
                  data-aos="zoom-out-down"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  src={apple}
                  width={apple.width}
                  height={apple.height}
                  alt="apple"
                  className="mb-0 cursor-pointer"
                />

                <Image
                  data-aos="zoom-out-down"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  src={google}
                  width={google.width}
                  height={google.height}
                  alt="google"
                />

                <div className=" w-20 h-10 absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-2/3 z-10 np ">
                  <Image
                    data-aos="zoom-out-up"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    src={comingSoonImage}
                    alt="Coming Soon"
                    width={100}
                    height={100}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1000"
            className="w-full md:w-[30%] min-h-[180px] md:min-h-[308px] bg-[#00334B5C] rounded-[32px] pt-[20px] pb-[40px] px-[24px] flex justify-center items-center flex-col mt-16 md:mt-0"
          >
            <video
              src="/toolaivid.mp4"
              width={180}
              height={140}
              className="opacity-90 rounded-full flex-shrink-0"
              autoPlay
              loop
              muted
            />
            <p className="text-[#FFFFFF] text-[18px] font-normal mb-6 mt-4 text-center">
              TAI+ Presale ends soon
            </p>
           
            <div className="bg-[#0071A4] bg-opacity-50 w-[197px] h-[45px] rounded-xl flex justify-center items-center text-center flex-shrink-0">
              <p
                 onClick={() => setShowTermsModal(true)}
                className="text-[#FFFFFF] text-[15px] font-normal cursor-pointer"
              >
                Click here to buy now
              </p>
            </div>
            
          </div>
        </div>
        <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)} 
      />
      </ContainerLayout>
    </div>
  );
};

export default Hero;
