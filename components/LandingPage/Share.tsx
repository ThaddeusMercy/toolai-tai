import React from "react";
import Image from "next/image";
import ContainerLayout from "../../Layouts/ContainerLayout";
import DataImage from "../../assets/jpg/data.jpeg";
import ControlImage from "../../assets/photo2.jpg";
import MakeImage from "../../assets/svg/make.svg";

function Share() {
  return (
    <div className="w-full h-auto bg-[#000A0F] md:pb-20">
      <ContainerLayout>
        <p
          data-aos="flip-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#FFFFFF] text-[28px] md:text-[48px] font-extrabold text-center capitalize mt-40 "
        >
          Share Data, make Bread
        </p>
        <p
          data-aos="flip-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-[#D9D9D9] text-[18px] md:text-[20px] font-semibold text-center mt-3 mb-10"
        >
          L2 Data Monetization
        </p>

        <div className="w-11/12 m-auto h-auto flex flex-col md:flex-row justify-between items-center mb-20">
          <div className="w-full md:w-[30%] h-[384px] custom-gradient rounded-[32px] p-6 my-12 group relative">
            <Image
              data-aos="zoom-out"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              src={DataImage}
              alt="data-image"
              className="w-full h-[240px] rounded-2xl"
            />

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] font-semibold text-center mt-7"
            >
              Own your data
            </p>

            <p className="text-[#FFFFFF] text-[13px] font-normal text-center hover:inline-block hidden group-hover:block absolute top-0 left-0 right-0 p-6 bg-black bg-opacity-100 rounded-[32px] cursor-pointer">
              Owning Your Own Data in the ToolAi ecosystem, users have full
              ownership and control over their personal data. Utilizing
              encrypted algorithms, data is stored securely on the user's device
              rather than on a centralized server. This decentralized approach
              not only ensures the privacy and security of the user's
              information but also empowers individuals to take charge of their
              digital footprint. By storing data locally, users can access and
              manage their information directly, without the need for
              intermediaries or third-party entities. This shift towards
              user-centric data management marks a fundamental paradigm shift in
              the way data is handled in the digital age, putting the power back
              into the hands of the individual.
            </p>
          </div>

          <div className="w-full md:w-[30%] h-[384px] custom-gradient rounded-[32px] p-6 my-12 group relative">
            <Image
              data-aos="zoom-in"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              src={ControlImage}
              alt="control-image"
              className="w-full h-[240px] rounded-2xl"
            />

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] font-semibold text-center mt-7"
            >
              Control who sees what
            </p>

            <p className="text-[#FFFFFF] text-[13px] font-normal text-center hover:inline-block hidden group-hover:block absolute top-0 left-0 right-0 p-6 bg-black bg-opacity-100 rounded-[32px] cursor-pointer">
              Controlling Data Access within the ToolAi ecosystem, users have
              granular control over who can access their data and what
              information they can view. Through robust privacy settings and
              permission controls, individuals can define precisely which
              parties are granted access to their data and under what
              circumstances. Whether it's sharing specific datasets with trusted
              collaborators or limiting access to certain types of information,
              users have the flexibility to tailor their data-sharing
              preferences according to their unique needs and preferences. This
              level of control not only enhances privacy and security but also
              fosters trust and transparency within the ecosystem, fostering a
              culture of responsible data stewardship.
            </p>
          </div>

          {/* <div className="w-full md:w-[30%] h-[384px] custom-gradient rounded-[32px] p-6"> */}
          <div className="w-full md:w-[30%] h-[384px] custom-gradient rounded-[32px] p-6 my-12 group relative">
            <Image
              data-aos="zoom-in"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              src={MakeImage}
              alt="make-image"
              className="w-full h-[240px] rounded-2xl"
            />

            <p
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              className="bg-gradient-to-r from-[#FFFFFF] to-[#9EFFFF] text-transparent bg-clip-text text-[28px] font-semibold text-center mt-7"
            >
              Earn Bread, Make TAI+
            </p>

            <p className="text-[#FFFFFF] text-[13px] font-normal text-center hover:inline-block hidden group-hover:block absolute top-0 left-0 right-0 p-6 bg-black bg-opacity-100 rounded-[32px] cursor-pointer">
              Earning BREAD Tokens as users engage with the ToolAi ecosystem and
              choose to share their data, they have the opportunity to earn
              BREAD tokens as a reward. The more data a user shares, the more
              BREAD tokens they accumulate. These tokens serve as a form of
              incentivization, encouraging active participation and contribution
              to the ecosystem. Furthermore, BREAD tokens can be exchanged for
              TAI+ tokens, unlocking additional benefits and functionalities
              within the ecosystem. This token-based economy not only rewards
              users for their data contributions but also creates a sustainable
              ecosystem where value is distributed equitably among participants.
              By harnessing the power of blockchain technology and tokenomics,
              ToolAi empowers users to monetize their data in a fair and
              transparent manner, driving innovation and fostering economic
              empowerment.
            </p>
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Share;
