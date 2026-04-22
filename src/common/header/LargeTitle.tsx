import { type FC, type ReactNode } from "react";

interface LargeTitleProps {
  children: ReactNode;
  className?: string; // optional extra styles
}

const LargeTitle: FC<LargeTitleProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`text-xl md:text-3xl font-semibold text-black leading-normal md:leading-[40px] font-geist ${className}`}
    >
      {children}
    </div>
  );
};

export default LargeTitle;
