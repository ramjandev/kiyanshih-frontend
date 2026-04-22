import FixList from "../home/FixList";
import Briefcase from "@/assets/frame/target.svg";
import CheckCircle from "@/assets/frame/badge-check.svg";
import eye from "@/assets/frame/scan-eye.svg";
import line1 from "@/assets/frame/yellowLine.png";
import line2 from "@/assets/frame/yellow2.png";
const steps = [
  {
    title: "Post Your Job",
    description:
      "Connect with verified professionals for home improvement, cleaning, maintenance, and more. Quality service providers in your neighborhood.",
    icon: Briefcase,
    bgColor:
      "bg-[#EA580C] shadow-[0_100px_80px_rgba(234,88,12,0.07),0_64.815px_46.852px_rgba(234,88,12,0.05),0_38.519px_25.481px_rgba(234,88,12,0.04),0_20px_13px_rgba(234,88,12,0.04),0_8.148px_6.519px_rgba(234,88,12,0.03),0_1.852px_3.148px_rgba(234,88,12,0.02)]",
  },
  {
    title: "Choose a Provider",
    description:
      "Compare profiles, reviews, and prices. All providers are background-checked and verified for your peace of mind.",
    icon: eye,
    bgColor:
      "bg-[#EAB308] shadow-[0_100px_80px_rgba(234,179,8,0.07),0_64.815px_46.852px_rgba(234,179,8,0.05),0_38.519px_25.481px_rgba(234,179,8,0.04),0_20px_13px_rgba(234,179,8,0.04),0_8.148px_6.519px_rgba(234,179,8,0.03),0_1.852px_3.148px_rgba(234,179,8,0.02)]",
  },
  {
    title: "Get it Done",
    description:
      "Work gets completed to your satisfaction. Pay securely through our platform or arrange cash/e-transfer directly.",
    icon: CheckCircle,
    bgColor:
      "bg-[#15803D] shadow-[0_100px_80px_0_rgba(21,128,61,0.07),0_64.815px_46.852px_0_rgba(21,128,61,0.05),0_38.519px_25.481px_0_rgba(21,128,61,0.04),0_20px_13px_0_rgba(21,128,61,0.04),0_8.148px_6.519px_0_rgba(21,128,61,0.03),0_1.852px_3.148px_0_rgba(21,128,61,0.02)]",
  },
];
const WorkSteps = () => {
  return (
    <div>
      <FixList
        className="pt-10"
        title="For Clients"
        subtitle="Getting help has never been easier"
        steps={steps}
        line1={line1}
        line2={line2}
      />
    </div>
  );
};

export default WorkSteps;
