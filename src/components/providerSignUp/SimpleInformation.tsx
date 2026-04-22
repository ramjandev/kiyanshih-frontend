/* eslint-disable @typescript-eslint/no-explicit-any */
import PricingCard from "./PricingCard";
import PlanSelector from "@/common/custom/PlanSelector";
import type { FieldErrors, UseFormSetValue } from "react-hook-form";

interface SimpleInformationProps {
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  watch: any;
}

const SimpleInformation = ({
  setValue,
  errors,
  watch,
}: SimpleInformationProps) => {
  const selectedPlan = watch("plan");

  return (
    <main className="w-full">
      <div className="w-full space-y-8">
        {/* Plan Selector */}
        <PlanSelector
          value={selectedPlan}
          onChange={(val) =>
            setValue("plan", val, { shouldValidate: true })
          }
          options={[
            { label: "Basic", value: "basic" },
            { label: "Unlimited", value: "unlimited"},
          ]}
        />

        {errors.plan && (
          <p className="text-red-500 text-sm mt-2 text-center lg:text-left">
            {errors.plan.message as string}
          </p>
        )}

        {/* Pricing Cards */}
        <PricingCard
          title="Basic Plan"
          price={29}
          description="Best for professional freelancers and small teams."
          features={["cap 2 applications/mo", "1 active listing"]}
          badge={selectedPlan === "basic" ? "Selected" : undefined}
          highlighted={selectedPlan === "basic"}
        />

        <PricingCard
          title="Unlimited"
          price={99}
          description="Best for professional freelancers and small teams."
          features={["Unlimited applications & listings", "Priority placement"]}
          badge={selectedPlan === "unlimited" ? "Selected" : undefined}
          highlighted={selectedPlan === "unlimited"}
        />
      </div>
    </main>
  );
};

export default SimpleInformation;










// import { useState } from "react";
// import LargeTitle from "@/common/header/LargeTitle";
// import PricingCard from "./PricingCard";
// import PlanSelector from "@/common/custom/PlanSelector";

// const SimpleInformation = () => {
//   const [plan, setPlan] = useState<"basic" | "unlimited">("basic");

//   return (
//     <main className="w-full">
//       <div className="w-full space-y-8">
//         <div className="text-center lg:text-left">
//           <LargeTitle className="mb-6 text-left">
//             Simple and affordable pricing
//           </LargeTitle>
//         </div>

//         {/* <div className="flex items-center gap-6 justify-center lg:justify-start">
        
//           <div
//             onClick={() => setPlan("basic")}
//             className={`w-5 h-5 border-2 rounded-md flex items-center justify-center cursor-pointer transition
//               ${
//                 plan === "basic"
//                   ? "border-primary bg-primary/30"
//                   : "border-gray-300 bg-white"
//               }`}
//           >
//             {plan === "basic" && <FaCheck className="text-black w-2 h-2" />}
//           </div>
//           <span className="text-sm text-gray-600">Basic</span>

       
//           <div
//             onClick={() => setPlan("unlimited")}
//             className={`w-5 h-5 border-2 rounded-md flex items-center justify-center cursor-pointer transition
//               ${
//                 plan === "unlimited"
//                   ? "border-primary bg-primary/30"
//                   : "border-gray-300 bg-white"
//               }`}
//           >
//             {plan === "unlimited" && <FaCheck className="text-black w-2 h-2" />}
//           </div>
//           <span className="text-sm text-gray-600">Unlimited</span>
//         </div> */}

//         <PlanSelector
//           value={plan}
//           onChange={setPlan}
//           options={[
//             { label: "Basic", value: "basic" },
//             { label: "Unlimited", value: "unlimited" },
//           ]}
//         />

//         {/* Pricing Cards */}
//         <PricingCard
//           title="Basic Plan"
//           price={29}
//           description="Best for professional freelancers and small teams."
//           features={["cap 2 applications/mo", "1 active listing"]}
//           badge={plan === "basic" ? "Selected" : undefined}
//           highlighted={plan === "basic"}
//         />

//         <PricingCard
//           title="Unlimited"
//           price={99}
//           description="Best for professional freelancers and small teams."
//           features={["Unlimited applications & listings", "Priority placement"]}
//           badge={plan === "unlimited" ? "Selected" : undefined}
//           highlighted={plan === "unlimited"}
//         />
//       </div>
//     </main>
//   );
// };

// export default SimpleInformation;
