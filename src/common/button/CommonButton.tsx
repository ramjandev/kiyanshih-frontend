import { Loader2 } from "lucide-react";
import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
  isLoading?: boolean;
  loadingText?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "default",
  isLoading = false,
  loadingText,
  ...props
}) => {
  const isCurrentlyLoading = !!isLoading;

  const variantClasses = variant === "outline" || variant === "default"
    ? "bg-transparent border-border text-[#0F172A]" 
    : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";

  return (
    <button
      className={cn(
        "px-4 sm:px-6 py-2 border rounded-md font-medium transition !flex-shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses,
        className
      )}
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
