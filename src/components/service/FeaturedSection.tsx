import FeaturedCard from "./FeaturedCard";
import CommonSpace from "@/common/space/CommonSpace";
import SectionHeader from "@/common/header/SectionHeader";
import CommonLoader from "@/common/CommonLoader";
import { useFeaturedServicesGetQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { useState, type FC } from "react";

interface FeaturedSectionProps {
  searchQuery: string;
}

const FeaturedSection: FC<FeaturedSectionProps> = ({ searchQuery }) => {
  const [currentPage] = useState(1);
  const { data: servicesData, isLoading } = useFeaturedServicesGetQuery(
    { current_page: currentPage, page_size: 5 },
    { refetchOnMountOrArgChange: true }
  );

  const services = servicesData?.services ?? [];

  const filteredServices = services.filter((service) =>
    service.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mappedServices = filteredServices.map((service) => ({
    id: String(service.id),
    category: service.category_name,
    job_title: service.job_title,
    provider: service.provider_name,
    location: service.service_area,
    price: Number(service.base_price),
    rating: Number(service.average_rating) || 0,
    reviews: Number(service.total_reviews) || 0,
    image: service.images?.[0]?.image_url || "https://via.placeholder.com/400x300",
    verified: service.status === "active",
  }));

  if (isLoading) {
    return (
      <CommonSpace className="">
        <div className="max-w-3xl">
          <SectionHeader
            className="!text-start"
            title="Featured Provider"
            subtitle="Explore Services in Your Neighborhood"
          />
        </div>
        <div className="py-10">
          <CommonLoader />
        </div>
      </CommonSpace>
    );
  }

  return (
    <CommonSpace className="md:py-24">
      <div className="max-w-3xl">
        <SectionHeader
          className="!text-start"
          title="Featured Provider"
          subtitle="Explore Services in Your Neighborhood"
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-6">
        {mappedServices.map((service: any, index: number) => (
          <FeaturedCard key={index} feature={service} />
        ))}
      </div>
    </CommonSpace>
  );
};

export default FeaturedSection;
