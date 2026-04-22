import MiniCard from "./MiniCard";

const featureCards = [
  {
    title: "Detailed job descriptions",
    subItems: ["Photo uploads", "Budget setting"],
    extraItems: ["Timeline preferences"],
    bgColor: "bg-[#FFFAF0]",
  },
  {
    title: "Background-checked providers",
    subItems: ["Customer reviews & ratings", "Portfolio galleries"],
    extraItems: ["Transparent pricing"],
    bgColor: "bg-[#FFFCF0]", // light yellowish
  },
  {
    title: "Direct communication",
    subItems: ["Progress tracking", "Secure payments"],
    extraItems: ["Satisfaction guarantee"],
    bgColor: "bg-[#F0FAF7]",
  },
];
const WorkCard = () => {
  return (
    <div>
      <MiniCard feature={featureCards} />
    </div>
  );
};

export default WorkCard;
