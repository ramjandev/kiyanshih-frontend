import React, { type ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-sm text-[#0F172A] font-geist leading-[18px]  ${className}`}
    >
      {children}
    </h2>
  );
};

export default Paragraph;
