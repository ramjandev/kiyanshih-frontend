import FixList from "./FixList";
import Briefcase from "@/assets/frame/briefcase-business.svg";
import User from "@/assets/frame/user-check.svg";
import CheckCircle from "@/assets/frame/badge-check.svg";
import line1 from "@/assets/frame/line1.png";
import line2 from "@/assets/frame/line2.png";

const steps = [
  {
    title: "Post Your Job",
    description:
      "Connect with verified professionals for home improvement, cleaning, maintenance, and more. Quality service providers in your neighborhood.",
    icon: Briefcase,
    bgColor:
      "bg-[#9672FF] shadow-[0_100px_80px_rgba(150,114,255,0.07),0_64.815px_46.852px_rgba(150,114,255,0.05),0_38.519px_25.481px_rgba(150,114,255,0.04),0_20px_13px_rgba(150,114,255,0.04),0_8.148px_6.519px_rgba(150,114,255,0.03),0_1.852px_3.148px_rgba(150,114,255,0.02)]",
  },
  {
    title: "Choose a Provider",
    description:
      "Compare profiles, reviews, and prices. All providers are background-checked and verified for your peace of mind.",
    icon: User,
    bgColor:
      "bg-[#4DDFFD] shadow-[0_100px_80px_rgba(77,223,253,0.07),0_64.815px_46.852px_rgba(77,223,253,0.05),0_38.519px_25.481px_rgba(77,223,253,0.04),0_20px_13px_rgba(77,223,253,0.04),0_8.148px_6.519px_rgba(77,223,253,0.03),0_1.852px_3.148px_rgba(77,223,253,0.02)]",
  },
  {
    title: "Get it Done",
    description:
      "Work gets completed to your satisfaction. Pay securely through our platform or arrange cash/e-transfer directly.",
    icon: CheckCircle,
    bgColor:
      "bg-[#F2B8EC] shadow-[0_100px_80px_0_rgba(242,184,236,0.07),0_64.815px_46.852px_0_rgba(242,184,236,0.05),0_38.519px_25.481px_0_rgba(242,184,236,0.04),0_20px_13px_0_rgba(242,184,236,0.04),0_8.148px_6.519px_0_rgba(242,184,236,0.03),0_1.852px_3.148px_0_rgba(242,184,236,0.02)]",
  },
];
const HomeSteps = () => {
  return (
    <div>
      <FixList
        className=" md:!py-40"
        title="How Fixlist works?"
        steps={steps}
        line1={line1}
        line2={line2}
      />
    </div>
  );
};

export default HomeSteps;
