import React from "react";
import MediumHeader from "@/common/header/MediumHeader";
import CommonHeader from "@/common/header/CommonHeader";
import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
          <>
            {onButtonClick ? (
              <button onClick={onButtonClick}>
                <ButtonWithIcon icon={Plus}>{button}</ButtonWithIcon>
              </button>
            ) : (
              <Link to={buttonLink ?? "#"}>
                <ButtonWithIcon icon={Plus}>{button}</ButtonWithIcon>
              </Link>
            )}
          </>
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
