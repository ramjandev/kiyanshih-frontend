import CommonHeader from "@/common/header/CommonHeader";
import LargeTitle from "@/common/header/LargeTitle";
import MediumHeader from "@/common/header/MediumHeader";
import SectionHeader from "@/common/header/SectionHeader";
import CommonWrapper from "@/common/space/CommonWrapper";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/per month",
    description: "Best for professional freelancers and small teams.",
    features: ["cap 2 applications/mo", "1 active listing"],
  },
  {
    name: "Unlimited",
    price: "$99",
    period: "/per month",
    description: "Best for professional freelancers and small teams.",
    features: ["Unlimited applications & listings", "priority placement"],
  },
  {
    name: "Get Verified by Certn",
    price: "$69",
    period: "/One Time",
    description:
      "Boost your credibility and earnings with professional background verification",
    features: ["Criminal background check", "Identity verification"],
  },
];
const PricingCards = () => {
  const [planIndex, setPlanIndex] = useState(0);

  return (
    <div className=" bg-[rgba(239,246,255,0.30)]">
      <CommonWrapper>
        <div className="max-w-7xl mx-auto py-10">
          <div className="text-center mb-20">
            <SectionHeader
              title=" Simple, Transparent Pricing"
              subtitle=" For clients: Pay per job post. For providers: Choose your plan."
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan, index) => (
              <div
                onClick={() => setPlanIndex(index)}
                className={`p-4 rounded-2xl bg-white border cursor-pointer ${
                  index === planIndex ? "border-[#60A5FA]" : "border-[#E1E1E2]"
                } flex flex-col gap-4 shadow-[0.5px_0.5px_1px_0_rgba(0,0,0,0.1)]`}
              >
                <MediumHeader className="!font-semibold !text-lg !text-[#1A1A1A]/70">
                  {plan.name}
                </MediumHeader>
                <div className=" flex gap-1 items-center">
                  <LargeTitle className="text-[##1A1A1A]">
                    {plan.price}
                  </LargeTitle>
                  <CommonHeader className="!text-[#1A1A1A]/70">
                    {plan.period}
                  </CommonHeader>
                </div>
                <CommonHeader className="!text-[#1A1A1A]/70">
                  {plan.description}
                </CommonHeader>
                <hr className="h-[1px] border-[#E1E1E2] border-dashed my-2" />

                <div className="flex flex-col gap-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2.5 items-center ">
                      <FaCheck className="text-[#149041]" />
                      <CommonHeader className="!text-[#1A1A1A]">
                        {feature}
                      </CommonHeader>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default PricingCards;
