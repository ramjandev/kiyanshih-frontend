import MediumHeader from "@/common/header/MediumHeader";

import Settings from "@/assets/frame/settings.svg";
import Home from "@/assets/frame/layers-3.svg";
import Sparkles from "@/assets/frame/fan.svg";
import TreePine from "@/assets/frame/land-plot.svg";
import CommonHeader from "@/common/header/CommonHeader";
import { IoArrowForward } from "react-icons/io5";
import SectionHeader from "@/common/header/SectionHeader";
import CommonSpace from "@/common/space/CommonSpace";

const categories = [
  {
    title: "Handyman Service",
    description:
      "Reliable and versatile handyman solutions for homes and businesses, delivering dependable repairs, practical upgrades, and everyday convenience",
    icon: Settings,
    bgColor: "#FEFCE8",
  },
  {
    title: "Home Improvement",
    description:
      "High-quality and durable roofing solutions for residential and commercial properties, long-lasting protection, and aesthetic appeal.",
    icon: Home,
    bgColor: "#EFF6FF",
  },
  {
    title: "Cleaning Service",
    description:
      "Reliable lawn cleaning solutions that remove debris, enhance curb appeal, and maintain a tidy outdoor space year-round.",
    icon: Sparkles,
    bgColor: "#ECFEFF",
  },
  {
    title: "Yard & Garden",
    description:
      "Trusted and compassionate pet care services for dogs, cats, and more",
    icon: TreePine,
    bgColor: "#FDF2F8",
  },
];

const Card = ({
  category,
  maskId,
}: {
  category: (typeof categories)[0];
  maskId: string;
}) => {
  return (
    <div className="relative w-[343px] h-[430px] m-4">
      <svg
        width="343"
        height="430"
        viewBox="0 0 343 430"
        className="absolute top-0 left-0 w-full h-full"
      >
        <defs>
          <mask id={maskId}>
            {/* White = visible, Black = transparent */}
            <rect width="343" height="430" rx="20" fill="white" />
            {/* Bottom-left curve */}
            <path d="M0 430 C0 410 20 410 20 430 Z" fill="black" />
            {/* Other notches / cutouts */}
            <path
              d="M0 366H34C50.5685 366 64 379.431 64 396V430H0V340C0 354.359 11.6405 366 26 366H0Z"
              fill="black"
            />
            <path
              d="M63 430V404C63 418.359 74.6405 430 89 430H63Z"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="343"
          height="430"
          rx="20"
          fill={category.bgColor}
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Content overlay */}
      <div className="absolute top-0 left-0 w-full h-full p-7.5 ">
        <div className="w-16 h-16 mb-6">
          <img
            src={category.icon}
            alt={category.title}
            className="w-full h-full object-contain"
          />
        </div>
        <MediumHeader className=" mb-10">{category.title}</MediumHeader>
        <CommonHeader className=" !text-lg text-[#515355] ">
          {category.description}
        </CommonHeader>
      </div>

      <div
        className={`rounded-full   absolute bottom-0 left-0 flex items-center gap-2  `}
        style={{ backgroundColor: category.bgColor }}
      >
        <span className={` text-2xl p-4 `}>
          <IoArrowForward />
        </span>
      </div>
    </div>
  );
};

const Service = () => {
  return (
    <CommonSpace>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 md:mb-12">
          <SectionHeader
            title="Popular Service category"
            subtitle="Explore Services in Your Neighborhood"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-4">
        {categories.map((category, index) => (
          <Card key={index} category={category} maskId={`cutoutMask${index}`} />
        ))}
      </div>
    </CommonSpace>
  );
};

export default Service;
