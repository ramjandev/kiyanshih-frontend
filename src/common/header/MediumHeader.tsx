import { type FC, type ReactNode } from "react";

interface LargeTitleProps {
  children: ReactNode;
  className?: string; // optional extra styles
}

const MediumHeader: FC<LargeTitleProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`text-lg md:text-xl font-semibold  text-[#0D151D]  md:leading-[28px] font-geist ${className}`}
    >
      {children}
    </div>
  );
};

export default MediumHeader;
