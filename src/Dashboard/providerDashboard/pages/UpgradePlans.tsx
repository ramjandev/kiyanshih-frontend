import CommonHeader from "@/common/header/CommonHeader";
import LargeTitle from "@/common/header/LargeTitle";
import MediumHeader from "@/common/header/MediumHeader";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

const plan = {
  name: "Unlimited",
  price: "$99",
  period: "/per month",
  description: "Best for professional freelancers and small teams.",
  features: [
    "Unlimited applications & listings",
    "priority placement",
    "priority placement",
    "priority placement",
    "priority placement",
  ],
};

export default function UpgradePlans() {
  return (
    <div>
      <div className=" py-6">
        <div className="mb-5">
          <h2 className="text-2xl text-slate-700 font-semibold mb-1">Upgrade your Plan</h2>
          <p className="text-lg text-slate-700">Unlock More with Our Premium Plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className={`col-span-2 p-4 rounded-2xl bg-white border border-gray-200 cursor-pointer flex flex-col gap-4 shadow-[0.5px_0.5px_1px_0_rgba(0,0,0,0.1)]`}
          >
            <MediumHeader className="!font-semibold !text-lg !text-[#1A1A1A]/70">
              {plan.name}
            </MediumHeader>
            <div className=" flex gap-1 items-center">
              <LargeTitle className="text-[##1A1A1A]">{plan.price}</LargeTitle>
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
          <div className="flex flex-col justify-between bg-white border border-slate-300 rounded-2xl p-7">
            <div>
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-6">
                Upgrade Plan
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-lg text-[#2E4A61]">Super Boost</p>
                <p className="text-sm text-[#111827]">99.00$</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-slate-300 mt-4 pb-5">
                <p className="text-lg text-[#2E4A61]">Duration</p>
                <p className="text-sm text-[#111827]">01 Month</p>
              </div>

              <div className="flex items-center justify-between mt-5">
                <p className="font-medium text-[#111827]">Total</p>
                <p className="text-sm text-[#111827] font-bold">99.0$</p>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <Button className="w-full bg-slate-800 text-white">
                Go To Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
