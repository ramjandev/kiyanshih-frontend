import React, { type ReactNode } from "react";

interface CommonHeaderProps {
  children: ReactNode;
  className?: string;
}

const LandingTitle: React.FC<CommonHeaderProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-2xl sm:text-3xl md:text-4xl leading-[40px]  font-bricolage text-black font-bold ${className}`}
    >
      {children}
    </h2>
  );
};

export default LandingTitle;
