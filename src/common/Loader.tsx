// src/components/common/Loader.tsx
import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 16, color = "border-blue-600" }) => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div
        className={`animate-spin rounded-full border-b-4 ${color}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  );
};

export default Loader;
