import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import LargeTitle from "@/common/header/LargeTitle";
import CommonHeader from "@/common/header/CommonHeader";
import home from "@/assets/images/m1.svg";
import provide from "@/assets/images/m2.svg";
import SubHeader from "@/Dashboard/Admin/common/SubHeader";
import { Link } from "react-router-dom";
interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinModal = ({ open, onOpenChange }: JoinModalProps) => {
  const [selectedOption, setSelectedOption] = useState<
    "normal_user" | "provider" | null
  >(null);

  if (!open) return null;

  const handleOptionClick = (option: "normal_user" | "provider") => {
    setSelectedOption(option);
    onOpenChange(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="sm:max-w-2xl w-full  bg-white border border-border rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <LargeTitle className="!text-[28px] font-semibold">
            Join Fixlist Today
          </LargeTitle>
          <span className=" text-3xl cursor-pointer">
            <RiCloseLargeLine
              onClick={() => onOpenChange(false)}
              className="text-[#334155] text-2xl cursor-pointer"
            />
          </span>
        </div>

        <CommonHeader className="pb-6 pt-1 text-[#475569] text-base">
          Choose how you want to get started
        </CommonHeader>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-7">
          <Link
            to="/client-signup"
            onClick={() => handleOptionClick("normal_user")}
            className={`cursor-pointer p-6 rounded-xl border transition-all duration-200 text-left hover:shadow-md ${
              selectedOption === "normal_user"
                ? "border-[#2563EB] "
                : "border-border "
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className=" w-15 h-15  bg-[#9672FF]/16 rounded-full flex items-center justify-center">
                <img className="w-7.5 h-7.5  " src={provide} alt="" />
              </div>
              <div>
                <CommonHeader className="!text-lg !text-black">
                  I need services
                </CommonHeader>
                <SubHeader className="!text-[#334155] !text-sm">
                  Find trusted professionals for your home and business needs
                </SubHeader>
              </div>
            </div>
          </Link>

          {/* Provider Option */}
          <Link
            to="/provider-signup"
            onClick={() => handleOptionClick("provider")}
            className={`cursor-pointer  p-6 rounded-xl border transition-all duration-200 text-left hover:shadow-md ${
              selectedOption === "provider"
                ? "border-[#2563EB] "
                : "border-border "
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className=" w-15 h-15  bg-[#F0FDFA]/50 rounded-full flex items-center justify-center">
                <img className="w-7.5 h-7.5  " src={home} alt="" />
              </div>
              <div>
                <CommonHeader className="!text-lg !text-black">
                  I provide services
                </CommonHeader>
                <SubHeader className="!text-[#334155] !text-sm">
                  Join our network of trusted professionals and grow business{" "}
                </SubHeader>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
