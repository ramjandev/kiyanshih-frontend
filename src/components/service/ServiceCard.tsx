import { PiDotBold } from "react-icons/pi";
import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";
import { type FC } from "react";
import type { Category } from "@/redux/types/landingPage/category.type";

interface serviceObject {
  name?: string;
  title: string;
  services: string[];
  providers: string;
  image: string;
}
interface ServiceCardProps {
  service: serviceObject | Category;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const isCategory = (service: any): service is Category => {
    return (service as Category).name !== undefined;
  };

  const title = isCategory(service) ? service.name : service.title;
  const image = isCategory(service) ? service.icon : service.image;
  const subItems = isCategory(service) ? service.subcategories : service.services;
  const providersCount = isCategory(service)
    ? `${service.provider_count} Providers`
    : service.providers;

  return (
    <div key={title} className="p-5 border border-border rounded-[20px]">
      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
        <img className="h-5 w-5 md:h-6 md:w-6" src={image} alt={title} />
      </div>
      <div className="pb-5">
        <BigTitle className=" !text-[#0A1A33] !text-2xl">{title}</BigTitle>
      </div>
      <div className="pb-7.5 space-y-3">
        {subItems?.map((item, index) => (
          <div className="flex items-start gap-1" key={index}>
            <span className=" xl:text-2xl text-[#334155]">
              <PiDotBold />
            </span>
            <CommonHeader className=" !text-[#334155] ">
              {typeof item === "string" ? item : (item as any).name}
            </CommonHeader>
          </div>
        ))}
      </div>

      <BigTitle className=" !text-[#1D4ED8] !text-lg">{providersCount}</BigTitle>
    </div>
  );
};

export default ServiceCard;
