import React from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import CommonButton from "@/common/button/CommonButton";
import BigTitle from "@/common/header/BigTitle";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  image: string;
  bgColor?: string;
  subColor?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  image,
  bgColor = "#93C5FD",
  subColor,
}) => {
  return (
    <div className="relative" style={{ backgroundColor: bgColor }}>
      <div className="absolute inset-0 bg-black/10"></div>

      <CommonWrapper>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-24">
          {/* Left Content */}
          <div className="w-full lg:max-w-[555px] text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug sm:leading-tight md:leading-[72px] font-bricolage   ">
              {title}
            </h1>

            <BigTitle
              className={` ${subColor} !text-base sm:!text-lg md:!text-xl !text-[#1E293B] mt-4`}
            >
              {subtitle}
            </BigTitle>

            {(primaryButtonText || secondaryButtonText) && (
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-6 sm:mt-8">
                {primaryButtonText && primaryButtonLink && (
                  <CommonButton className="!bg-blue !text-white !border-0 w-full sm:w-auto">
                    <Link to={primaryButtonLink}>{primaryButtonText}</Link>
                  </CommonButton>
                )}
                {secondaryButtonText && secondaryButtonLink && (
                  <CommonButton className="!bg-transparent !border-2 border-white !text-white w-full sm:w-auto">
                    <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                  </CommonButton>
                )}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
            <img
              src={image}
              alt="Hero"
              className="w-full max-w-lg sm:max-w-xl md:max-w-2xl h-auto object-contain"
            />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Hero;
