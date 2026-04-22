import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { slugify } from "@/help/help";
import SectionHeader from "@/common/header/SectionHeader";
import { useGetAllCatergoryQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import type { FC } from "react";
import CommonLoader from "@/common/CommonLoader";

interface ServiceCardSectionProps {
  searchQuery: string;
}

const ServiceCardSection: FC<ServiceCardSectionProps> = ({ searchQuery }) => {
  const { data: services, isLoading } = useGetAllCatergoryQuery(undefined);

  const filteredCategories = services?.categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <>
      <SectionHeader
        className="!text-start pb-10"
        title="Browse Service By category"
        subtitle="Explore Services in Your Neighborhood"
      />
      {isLoading ? (
        <CommonLoader />
      ) : (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((service, index) => (
            <Link to={`/service/${slugify(service.name)}`} key={index}>
              <ServiceCard service={service} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ServiceCardSection;

