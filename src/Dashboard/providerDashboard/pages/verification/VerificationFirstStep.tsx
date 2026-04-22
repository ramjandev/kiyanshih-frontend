import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import type { BackgroundCheckPaymentType } from "@/redux/featuresAPI/providerAPI/upload/types/document";
import { Shield, ShieldCheck, Star, Zap } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  onNext: () => void;
  data: BackgroundCheckPaymentType;
}

const VerificationFirstStep: React.FC<Props> = ({ onNext, data }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    onNext();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="py-6">
      <div className="mb-5">
        <h2 className="flex items-center gap-3 text-2xl text-slate-700 font-semibold mb-1">
          <ShieldCheck className="text-green-800" />
          Get Verified by Certn
        </h2>
        <p className="text-lg text-slate-700">{data.description}</p>
      </div>

      <div className="border border-slate-300 rounded-[12px] p-7">
        {/* BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-between pb-10 border-b border-dotted border-[#1A1A1A2E]">
          {data.benefits.map((benefit, index) => (
            <div key={index} className="max-w-[330px]">
              <div className="flex items-center gap-3 mb-3">
                {index === 0 && <Star className="text-yellow-500 w-6 h-6" />}
                {index === 1 && <Zap className="text-green-700 w-6 h-6" />}
                {index === 2 && <Shield className="text-pink-700 w-6 h-6" />}
                <h3 className="text-lg text-slate-900 font-semibold">
                  {benefit.split(" - ")[0]}
                </h3>
              </div>
              <p className="text-[#1A1A1AB2]">
                {benefit.split(" - ")[1] ?? benefit}
              </p>
            </div>
          ))}
        </div>

        {/* VERIFICATION PROCESS */}
        <div>
          <h2 className="text-lg font-semibold my-4">Verification Process</h2>
          <div className="space-y-3">
            {data.verification_process.map((step, index) => (
              <div key={index} className="flex gap-2.5 items-center">
                <FaCheck className="text-[#149041]" />
                <CommonHeader className="!text-[#1A1A1A]">{step}</CommonHeader>
              </div>
            ))}
          </div>
        </div>

        {/* PRICING */}
        <div className="bg-blue-50 border-slate-300 p-5 rounded mt-12 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div>
              <p className="text-lg text-zinc-950 font-semibold">
                Professional Verification
              </p>
              <p className="text-sm text-slate-700 mt-1">
                Powered by Certn - Canada's leading background check provider
              </p>
            </div>
            <div>
              <p className="text-3xl text-[#1A1A1A] font-semibold">
                ${data.payment_amount}
              </p>
              <p className="text-sm text-slate-700 mt-1">One-time fee</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row justify-start gap-3 w-full">
          <CommonButton
            onClick={handleNext}
            className="bg-blue-700 text-white flex-1"
          >
            {data.verification_status === "verified"
              ? "Verification Completed"
              : "Start With Verification Process"}
          </CommonButton>

          <CommonButton onClick={handleCancel}>Maybe Later</CommonButton>
        </div>
      </div>
    </div>
  );
};

export default VerificationFirstStep;
