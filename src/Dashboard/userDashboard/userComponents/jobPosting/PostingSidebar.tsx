import type React from "react";
import { ClipboardList, Sliders, MapPin, DollarSign, Eye } from "lucide-react";
import type { FC } from "react";
import Paragraph from "@/common/header/Paragraph";
import CommonHeader from "@/common/header/CommonHeader";

interface Step {
  number: number;
  title: string;
  icon: React.ReactNode;
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const PostingSidebar: FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Jobs details",
      icon: <ClipboardList className="w-4.5 h-4.5" />,
    },
    {
      number: 2,
      title: "Select Category",
      icon: <Sliders className="w-4.5 h-4.5" />,
    },
    {
      number: 3,
      title: "Location & Schedule",
      icon: <MapPin className="w-4.5 h-4.5" />,
    },
    {
      number: 4,
      title: "Budget",
      icon: <DollarSign className="w-4.5 h-4.5" />,
    },
    { number: 5, title: "Preview", icon: <Eye className="w-4.5 h-4.5" /> },
  ];

  return (
    <div className="w-full bg-white rounded-[10px] p-7 border border-border">
      <div className="flex flex-col gap-2.5">
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full border-4 border-white" />
        </div>
        <Paragraph className="!text-black !text-[12px]">
          Complete the Step {currentStep} of {totalSteps}
        </Paragraph>
      </div>

      <div className="space-y-6 py-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            <div className="flex items-start gap-2">
              <div className="relative flex-shrink-0">
                <div
                  className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-colors ${step.number === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-white border-2 border-gray-900 text-gray-900"
                    }`}
                >
                  {step.icon}
                </div>
              </div>

              <div className="">
                <Paragraph className=" !text-[#475569] !text-[12px] mb-1">
                  Step {step.number}
                </Paragraph>
                <CommonHeader className="!text-[#09090B]">
                  {step.title}
                </CommonHeader>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-16 -translate-x-1/2 bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostingSidebar;
