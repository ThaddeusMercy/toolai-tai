import { Tab } from "@headlessui/react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import FourthTab from "./FourthTab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutusTabs() {
  return (
    <div className="w-full px-2 sm:px-0 m-auto bg-custom-background-image bg-cover bg-center">
      <Tab.Group>
        <Tab.List className="max-w-full md:max-w-xl m-auto flex rounded-[18px] bg-[#62CEFF1A] p-3">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-[12px] md:text-[16px] font-medium leading-5 mr-2",
                selected
                  ? "bg-[#1FE2D6] rounded-[16px] text-[#00334B]"
                  : "bg-transparent text-[#FFFFFF]"
              )
            }
          >
            ToolAi LLC
          </Tab>

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-[12px] md:text-[16px] font-medium leading-5 mr-2",
                selected
                  ? "bg-[#1FE2D6] rounded-[16px] text-[#00334B]"
                  : "bg-transparent text-[#FFFFFF]"
              )
            }
          >
            2nd World
          </Tab>

          {/* <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-[12px] md:text-[16px] font-medium leading-5 mr-2",
                selected
                  ? "bg-[#1FE2D6] rounded-[16px] text-[#00334B]"
                  : "bg-transparent text-[#FFFFFF]"
              )
            }
          >
            TAI +
          </Tab> */}

          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-[12px] md:text-[16px] font-medium leading-5 mr-2",
                selected
                  ? "bg-[#1FE2D6] rounded-[16px] text-[#00334B]"
                  : "bg-transparent text-[#FFFFFF]"
              )
            }
          >
            Our Team
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-10">
          <Tab.Panel className="w-full h-auto">
            <FirstTab />
          </Tab.Panel>

          <Tab.Panel className="w-full h-auto">
            <SecondTab />
          </Tab.Panel>

          {/* <Tab.Panel className="w-full h-auto">
            <ThirdTab />
          </Tab.Panel> */}

          <Tab.Panel className="w-full h-auto">
            <FourthTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
