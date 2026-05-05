import { useState } from "react";
import CommonSpace from "@/common/space/CommonSpace";
import UserSectionHeader from "../reuseable/UserSectionHeader";
import CurveSearch from "@/components/service/CurveSearch";

import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FeaturedCard from "@/components/service/FeaturedCard";
import { useGetAllServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";
import CommonLoader from "@/common/CommonLoader";

const PopularServices = () => {
  const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const services = servicesData?.results ?? [];

  const mappedServices = services
    .filter((service) => service.rating >= 4)
    .map((service) => ({
      id: String(service.id),
      category: service.choose_category,
      job_title: service.job_title,
      provider: service.provider_info.name,
      location: service.location,
      price: Number(service.base_price),
      rating: service.rating || 0,
      reviews: service.reviews_count || 0,
      image: service.service_image || "https://via.placeholder.com/400x300",
      verified: service.provider_info.is_verified,
    }));

  const CATEGORIES = [
    "All Categories",
    "Handyman service",
    "Cleaning service",
    "Tech service",
    "Renovation",
    "Remodelling service",
    "Automotive service",
  ];

  const filteredServices =
    selectedCategory === "All Categories"
      ? mappedServices
      : mappedServices.filter((s) => s.category?.trim() === selectedCategory.trim() || s.category?.includes(selectedCategory));

  const visibleServices = filteredServices.slice(0, 5);

  return (
    <>
      <CommonSpace>
        <div className="w-full">
          <UserSectionHeader
            className="!w-full"
            title="Browse Services"
            subtitle="Browse verified providers in your area. Free for clients, transparent pricing, and reviews from real customers."
            button="Post a Job"
            buttonLink="/user-dashboard/job-postings"
          />
        </div>
        <div className="w-full flex items-center gap-5">
          <CurveSearch className="w-full max-w-md" border="!border-border" />
          <div className="flex items-center gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-auto h-auto bg-white border border-border !py-4 !px-6 [&>svg]:hidden">
                <div className="flex items-center gap-2 text-black text-sm font-medium">
                  <IoFilterSharp className="text-lg" />
                  <SelectValue placeholder="Filter" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CommonSpace>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0F172A]">Popular Services</h2>
          <Link to="/user-dashboard/bookings" className="text-[#1D4ED8] hover:underline font-semibold text-lg cursor-pointer">
            See All
          </Link>
        </div>

        {isLoading ? (
          <CommonLoader />
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {visibleServices.map((service, index) => (
              <FeaturedCard key={index} feature={service} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PopularServices;
