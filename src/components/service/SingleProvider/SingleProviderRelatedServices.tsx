import { useState } from "react";
import FeaturedCard from "../FeaturedCard";
import SectionHeader from "@/common/header/SectionHeader";
import Pagination from "@/common/custom/Pagination";
import CommonWrapper from "@/common/space/CommonWrapper";
import { useGetAllServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";
import { useFeaturedServicesGetQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/featuresAPI/auth/auth.slice";
import CommonLoader from "@/common/CommonLoader";

interface RelatedServicesProps {
  category?: string;
  currentId: number;
}

const SingleProviderRelatedServices = ({
  category,
  currentId,
}: RelatedServicesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAppSelector(selectToken);

  // Fetch from public API if NOT logged in, else from private API
  const { data: authData, isLoading: authLoading } = useGetAllServicesQuery(
    token ? { page: currentPage, page_size: 100 } : skipToken
  );

  const { data: publicData, isLoading: publicLoading } = useFeaturedServicesGetQuery(
    !token ? { current_page: currentPage, page_size: 100 } : skipToken
  );

  const isLoading = token ? authLoading : publicLoading;

  // Normalize the data source
  const allServices = token
    ? (authData as any)?.results ?? []
    : (publicData as any)?.services ?? [];

  const totalCount = token
    ? (authData as any)?.count ?? 0
    : (publicData as any)?.count ?? 0;

  // Filter by category client-side to be safe, AND exclude current service
  const filteredServices = allServices.filter((s: any) => {
    const sCategory = token ? s.choose_category : (s.category_display || s.category);

    const matchesCategory = category
      ? sCategory?.trim().toLowerCase() ===
      category.trim().toLowerCase() ||
      sCategory?.toLowerCase().includes(category.toLowerCase())
      : true;
    const isNotCurrent = Number(s.id) !== currentId;
    return matchesCategory && isNotCurrent;
  });

  const mappedServices = filteredServices.map((s: any) => {
    if (!token) {
      // Mapping from Public Landing Page API (Service type)
      return {
        id: String(s.id),
        category: s.category_display,
        job_title: s.title,
        provider: s.provider?.business_name,
        location: s.provider?.area,
        price: Number(s.price_min),
        rating: Number(s.provider?.rating) || 5,
        reviews: Number(s.provider?.total_reviews) || 0,
        image: s.image || "https://via.placeholder.com/400x300",
        verified: s.provider?.verification_status === "verified",
      };
    } else {
      // Mapping from Private Dashboard API (ProviderService type)
      return {
        id: String(s.id),
        category: s.choose_category,
        job_title: s.job_title,
        provider: s.provider_name,
        location: s.service_area,
        price: Number(s.base_price),
        rating: Number(s.rating) || 5,
        reviews: Number(s.views_count) || 0,
        image: s.images?.[0]?.image_url || "https://via.placeholder.com/400x300",
        verified: s.verified,
      };
    }
  });

  return (
    <div className="py-6 md:py-10">
      <CommonWrapper>
        <SectionHeader className=" !text-start" title="Related Services" />

        {isLoading ? (
          <div className="py-10">
            <CommonLoader text="Loading related services..." />
          </div>
        ) : (
          <>
            {mappedServices.length > 0 ? (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6 pt-6 pb-10 sm:pb-20">
                  {mappedServices.map((service: any, index: number) => (
                    <FeaturedCard key={index} feature={service} />
                  ))}
                </div>
                {/* We only show pagination if the total count from API suggests there's more */}
                {totalCount > 10 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalCount / 10)}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">
                  No related services found in this category.
                </p>
                {category && (
                  <p className="text-xs text-gray-400 mt-2">
                    Category: {category}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </CommonWrapper>
    </div>
  );
};

export default SingleProviderRelatedServices;
