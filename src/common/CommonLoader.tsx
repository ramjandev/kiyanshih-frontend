import { Loader2 } from "lucide-react";

interface CommonLoaderProps {
    className?: string;
    text?: string;
    size?: number;
    color?: string;
}

const CommonLoader = ({ className = "", text = "Loading...", size = 24, color = "text-blue-600" }: CommonLoaderProps) => {
    return (
        <div className={`w-full flex justify-center items-center gap-2 ${className}`}>
            <Loader2 className={`animate-spin ${color}`} size={size} />
            <span className="text-gray-500 font-medium">{text}</span>
        </div>
    );
};

export default CommonLoader;
