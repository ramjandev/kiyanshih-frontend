import CommonHeader from "@/common/header/CommonHeader";
import CommonWrapper from "@/common/space/CommonWrapper";
import type { FC } from "react";
import { BsDot } from "react-icons/bs";

interface FeatureList {
  title: string;
  subItems: string[];
  extraItems: string[];
  bgColor: string;
}
interface MiniCardProps {
  feature: FeatureList[];
}
const MiniCard: FC<MiniCardProps> = ({ feature }) => {
  return (
    <CommonWrapper>
      <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between gap-6">
        {feature.map((card, index) => (
          <div
            key={index}
            className={`p-5 sm:min-w-[364px] flex-1 ${card.bgColor} rounded-xl`}
          >
            <CommonHeader className="!text-black flex items-center">
              <span>
                <BsDot />
              </span>
              {card.title}
            </CommonHeader>
            <div className="ml-4">
              {card.subItems?.map((item, i) => (
                <CommonHeader className="!text-black flex items-center" key={i}>
                  <span>
                    <BsDot />
                  </span>
                  {item}
                </CommonHeader>
              ))}
            </div>
            <div className="ml-2 flex items-center">
              <span>
                <BsDot />
              </span>
              {card.extraItems}
            </div>
          </div>
        ))}
      </div>
    </CommonWrapper>
  );
};

export default MiniCard;
