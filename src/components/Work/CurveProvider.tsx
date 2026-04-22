import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";
import LargeTitle from "@/common/header/LargeTitle";
import CommonSpace from "@/common/space/CommonSpace";
import CommonWrapper from "@/common/space/CommonWrapper";
import React from "react";
import line from "@/assets/frame/bakaLine.svg";
import olta from "@/assets/frame/olta.svg";
import SectionHeader from "@/common/header/SectionHeader";
const steps = [
  {
    number: "01",
    title: "Post Your Job",
    gradient: "bg-gradient-to-b from-[#742BFA] to-[#9A47E9]",
    des: "Build your professional profile with photos,certifications, and service areas.",
  },
  {
    number: "02",
    title: "Choose a Provider",
    gradient: "bg-gradient-to-b from-[#FF8113] to-[#E9A547]",
    des: `Complete background check and
    verification process to build trust with
    clients.`,
  },
  {
    number: "03",
    title: "Get it Done",
    des: `Browse relevant jobs and submit
    competitive proposals to win work.
    `,
    gradient: "bg-gradient-to-b from-[#09C5AF] to-[#5DE5DA]",
  },
  {
    number: "04",
    title: "Complete & Pay",
    gradient: "bg-gradient-to-b from-[#1D4ED8] to-[#445DA6]",
    des: `Complete quality work, earn reviews, and
    build a thriving business.`,
  },
];

interface CurveProviderProps {
  title: string;
  subtitle: string;
}
const CurveProvider: React.FC<CurveProviderProps> = ({ title, subtitle }) => {
  return (
    <CommonWrapper>
      <CommonSpace className=" py-10 sm:!py-40">
        {/* Steps */}
        <SectionHeader title={title} subtitle={subtitle} />
        <div className=" flex flex-col md:flex-row gap-10 pt-20">
          {steps.map((step, index) => (
            <div key={index} className={`relative flex flex-col items-center `}>
              <div
                className={`w-25 h-25 flex items-center justify-center rounded-t-[30px] rounded-br-[30px] ${step.gradient}  ${step.gradient}`}
              >
                <LargeTitle className="!text-white">{step.number}</LargeTitle>
              </div>

              <BigTitle className="mt-4 !text-lg !font-medium !text-black">
                {step.title}
              </BigTitle>
              <CommonHeader className="!text-black !font-normal text-center">
                Complete quality work, earn reviews, and build a thriving
                business.
              </CommonHeader>
              {(index === 0 || index === 2) && (
                <div
                  className={`hidden md:block   absolute top-0 -left-5 md:-left-8 xl:-left-12  md:translate-x-[60%] xl:translate-x-full z-50`}
                >
                  <img src={line} alt="" />
                </div>
              )}
              {index === 1 && (
                <div
                  className={` hidden md:block  absolute top-12 -left-5 md:-left-8 xl:-left-12  md:translate-x-[60%] xl:translate-x-full z-50`}
                >
                  <img src={olta} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CommonSpace>
    </CommonWrapper>
  );
};

export default CurveProvider;
