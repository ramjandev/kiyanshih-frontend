import React from "react";
import MediumHeader from "@/common/header/MediumHeader";
import CommonHeader from "@/common/header/CommonHeader";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  button?: string;
  buttonLink?: string;
  text?: string;
  onButtonClick?: () => void; // optional click for button
  onTextClick?: () => void; // optional click for text
}

const UserSectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  button,
  buttonLink,
  text,
  onButtonClick,
  onTextClick,
  className = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className={`${className} w-full flex items-center justify-between pb-6`}>
      {/* Title + Subtitle */}
      <div>
        <MediumHeader className="mb-2 !text-[#0F172A] !font-semibold">
          {title}
        </MediumHeader>
        {subtitle && (
          <CommonHeader className="!text-[#334155]">{subtitle}</CommonHeader>
        )}
      </div>

      {/* Button + Text */}
      <div className="flex items-center gap-4">
        {/* Button */}
        {button && (
          <button
            onClick={() => {
              if (onButtonClick) {
                onButtonClick();
              } else if (buttonLink) {
                navigate(buttonLink);
              }
            }}
            className="group relative bg-[#1D4ED8] text-white flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap flex-shrink-0 cursor-pointer overflow-hidden border border-transparent"
          >
            {/* Slide-up background */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

            {/* Content (Title and Icon) */}
            <div className="relative z-10 flex items-center gap-2 group-hover:text-[#1D4ED8] transition-colors duration-300">
              <Plus className="w-5 h-5 transition-colors duration-300" />
              {button}
            </div>
          </button>
        )}

        {/* Text */}
        {text && (
          <div
            onClick={onTextClick}
            className="cursor-pointer"
          >
            <MediumHeader className="!text-[#1D4ED8] hover:underline !font-medium">
              {text}
            </MediumHeader>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSectionHeader;
