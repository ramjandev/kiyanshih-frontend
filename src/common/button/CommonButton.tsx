import { Loader2 } from "lucide-react";
import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  isLoading = false,
  loadingText,
  ...props
}) => {
  const isCurrentlyLoading = !!isLoading;

  return (
    <button
      className={`px-4 sm:px-6 py-2 border border-border rounded-md font-medium transition !flex-shrink-0 text-[#0F172A] flex items-center justify-center gap-2 cursor-pointer ${className}  disabled:cursor-not-allowed`}
      {...props}
    >
      {isCurrentlyLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CommonButton;
