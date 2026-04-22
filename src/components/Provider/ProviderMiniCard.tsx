import MiniCard from "../Work/MiniCard";
const featureCards = [
  {
    title: "Verified & Relevant",
    subItems: ["Smart Matching", "Time-Saving"],
    extraItems: ["Transparency"],
    bgColor: "bg-[#FFFAF0]",
  },
  {
    title: "Transparent Costs",
    subItems: [" Flexible Plans", "Honest & Reliable"],
    extraItems: ["Cost-Effective"],
    bgColor: "bg-[#FFFCF0]", // light yellowish
  },
  {
    title: "Verified Providers",
    subItems: ["Ratings & Reviews", " Safe Collaboration"],
    extraItems: ["Instant Support"],
    bgColor: "bg-[#F0FAF7]",
  },
];
const ProviderMiniCard = () => {
  return (
    <div>
      <MiniCard feature={featureCards} />
    </div>
  );
};

export default ProviderMiniCard;
