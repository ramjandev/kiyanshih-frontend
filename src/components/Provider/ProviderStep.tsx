import FixList from "../home/FixList";

import Briefcase from "@/assets/frame/target.svg";
import CheckCircle from "@/assets/frame/badge-check.svg";
import eye from "@/assets/frame/scan-eye.svg";
import line1 from "@/assets/frame/yellowLine.png";
import line2 from "@/assets/frame/yellow2.png";

const steps = [
  {
    title: "Quality Leads",
    description:
      "Share your requirements, set preferences, and outline your goals. Our system connects you with verified providers who deliver quality leads.",
    icon: Briefcase,
    bgColor:
      "bg-[#EA580C] shadow-[0_100px_80px_rgba(150,114,255,0.07),0_64.815px_46.852px_rgba(150,114,255,0.05),0_38.519px_25.481px_rgba(150,114,255,0.04),0_20px_13px_rgba(150,114,255,0.04),0_8.148px_6.519px_rgba(150,114,255,0.03),0_1.852px_3.148px_rgba(150,114,255,0.02)]",
  },
  {
    title: "Fair Pricing",
    description:
      "Choose your plan, compare options, and see clear costs upfront. Our transparent system ensures you always get fair pricing",
    icon: eye,
    bgColor:
      "bg-[#EAB308]  shadow-[0_100px_80px_rgba(77,223,253,0.07),0_64.815px_46.852px_rgba(77,223,253,0.05),0_38.519px_25.481px_rgba(77,223,253,0.04),0_20px_13px_rgba(77,223,253,0.04),0_8.148px_6.519px_rgba(77,223,253,0.03),0_1.852px_3.148px_rgba(77,223,253,0.02)]",
  },
  {
    title: "Trust & Safety",
    description:
      "Verify providers, review profiles, and check ratings before you book. Our platform ensures trust and safety at every step",
    icon: CheckCircle,
    bgColor:
      "bg-[#15803D] shadow-[0_100px_80px_0_rgba(242,184,236,0.07),0_64.815px_46.852px_0_rgba(242,184,236,0.05),0_38.519px_25.481px_0_rgba(242,184,236,0.04),0_20px_13px_0_rgba(242,184,236,0.04),0_8.148px_6.519px_0_rgba(242,184,236,0.03),0_1.852px_3.148px_0_rgba(242,184,236,0.02)]",
  },
];
const ProviderStep = () => {
  return (
    <div>
      <FixList
        className="py-10"
        title="Why Choose Fixlist?"
        subtitle="Everything you need to grow your service business"
        line1={line1}
        line2={line2}
        steps={steps}
      />
    </div>
  );
};

export default ProviderStep;
