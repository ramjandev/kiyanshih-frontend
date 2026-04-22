import sub1 from "@/assets/images/sub1.svg";
import sub2 from "@/assets/images/sub2.svg";
import sub3 from "@/assets/images/sub3.svg";
import sub4 from "@/assets/images/sub4.svg";
import sub5 from "@/assets/images/sub5.svg";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import CommonSpace from "@/common/space/CommonSpace";
import type { FC } from "react";
import type { SingleSubcategory } from "@/redux/types/landingPage/category.type";
const defaultIcon = sub1;

const subCategoryInfoMap: Record<string, { icon: string; description: string }> = {
  "Renovation, Remodelling & Flooring": {
    icon: sub1,
    description: "Complete home renovation services to transform your space",
  },
  "Carpentry & Woodwork": {
    icon: sub2,
    description: "Custom woodwork and precision carpentry for your home",
  },
  "Roofing & Siding": {
    icon: sub3,
    description: "Professional roofing installation and repair services",
  },
  "Painting & Decorating": {
    icon: sub4,
    description: "Interior and exterior painting with quality finishes",
  },
  "Fencing & Gates": {
    icon: sub5,
    description: "Custom fencing solutions for privacy and security",
  },
};

interface SubCategorySectionProps {
  hide?: boolean;
  subCategories: (string | SingleSubcategory)[];
  selectedCategory?: string;
  onSelect?: (category: string) => void;
  mainCategoryName?: string;
}

const SubCategorySection: FC<SubCategorySectionProps> = ({
  hide,
  subCategories,
  selectedCategory,
  onSelect,
  mainCategoryName,
}) => {
  return (
    <CommonSpace>
      <SectionHeader
        className={`!text-start ${hide ? "hidden" : ""}`}
        title={`Popular ${mainCategoryName || ""} Services`}
        subtitle="Explore Services in Your Neighborhood"
      />

      <div className="w-full justify-center sm:justify-start flex flex-wrap gap-6 sm:gap-9 pt-7">
        {[
          {
            name: "All",
            slug: "",
            icon: defaultIcon,
            description: "Show all services",
          },
          ...subCategories
        ].map((item, index) => {
          const name = typeof item === "string" ? item : item.name;
          const slug = typeof item === "string" ? item : item.slug;
          const icon = typeof item === "string" ? null : item.icon;
          const info = subCategoryInfoMap[name] || {
            icon: icon || defaultIcon,
            description: "",
          };
          return (
            <div
              className="flex flex-col items-center gap-4 cursor-pointer group"
              key={index}
              onClick={() => onSelect?.(slug)}
            >
              <div
                className={`bg-white border transition-all rounded-md p-3.5 ${selectedCategory === slug
                  ? "border-[#1D4ED8] shadow-md ring-1 ring-[#1D4ED8]"
                  : "border-border group-hover:border-[#1D4ED8]/50"
                  }`}
              >
                <div className="w-18 h-18 rounded-md flex items-center justify-center">
                  <img className="w-12 h-12" src={info.icon} alt={name} />
                </div>
              </div>
              <CommonHeader
                className={`font-semibold transition-colors ${selectedCategory === slug ? "text-[#1D4ED8]" : "!text-[#1E293B]"
                  }`}
              >
                {name}
              </CommonHeader>
            </div>
          );
        })}
      </div>
    </CommonSpace>
  );
};

export default SubCategorySection;
