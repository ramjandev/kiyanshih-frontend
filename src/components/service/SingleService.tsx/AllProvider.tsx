import BigTitle from "@/common/header/BigTitle";
import FeaturedCard from "../FeaturedCard";
import Pagination from "@/common/custom/Pagination";
// import ButtonWithIcon from "@/common/button/ButtonWithIcon";
// import { IoFilterSharp } from "react-icons/io5";
// import CommonDropdown from "@/common/custom/CommonDropdown";
import CommonLoader from "@/common/CommonLoader";
import type { ServicesResponse } from "@/redux/types/landingPage/service.type";
import type { SingleSubcategory } from "@/redux/types/landingPage/category.type";
import type { FC } from "react";

interface AllProviderProps {
  servicesData: ServicesResponse | undefined;
  isLoading: boolean;
  isFetching?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  subCategories?: SingleSubcategory[];
  selectedSubCategory?: string;
  onSubCategorySelect?: (subCategorySlug: string) => void;
  mainCategoryName?: string;
}

const AllProvider: FC<AllProviderProps> = ({
  servicesData,
  isLoading,
  isFetching,
  currentPage,
  onPageChange,
  // subCategories = [],
  // selectedSubCategory,
  // onSubCategorySelect,
  // mainCategoryName,
}) => {
  const services = servicesData?.services ?? [];
  console.log("servicesData", servicesData);

  // Build dynamic dropdown items from subcategories
  // const dropdownItems = [
  //   {
  //     label: mainCategoryName ? `All ${mainCategoryName}` : "All Categories",
  //     onClick: () => onSubCategorySelect?.(""),
  //   },
  //   ...subCategories.map((subCat) => ({
  //     label: subCat.name,
  //     onClick: () => onSubCategorySelect?.(subCat.slug),
  //   })),
  // ];

  // Get display name for selected subcategory
  // const selectedDisplayName = subCategories.find(s => s.slug === selectedSubCategory)?.name || "";

  // Map services to FeaturedCard props
  const mappedServices = services.map((service) => ({
    id: String(service.id),
    category: service.category_name,
    job_title: service.job_title,
    provider: service.provider_name,
    location: service.service_area,
    price: Number(service.base_price),
    rating: service.average_rating || 0,
    reviews: service.total_reviews || 0,
    image: service.images?.[0]?.image_url || "https://via.placeholder.com/400x300",
    verified: service.status === "active",
  }));

  if (isLoading) {
    return (
      <div className="py-10">
        <CommonLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <BigTitle className="!text-[#000] !text-lg">All Providers</BigTitle>

        {/* <CommonDropdown
          items={dropdownItems}
          trigger={
            <ButtonWithIcon
              icon={IoFilterSharp}
              className="bg-[#18181B] text-white"
            >
              {selectedDisplayName || "Filter"}
            </ButtonWithIcon>
          }
        /> */}
      </div>

      <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-6 pb-10 sm:pb-20 transition-opacity duration-300 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        {mappedServices.length > 0 ? (
          mappedServices.map((service, index) => (
            <FeaturedCard key={index} feature={service} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No providers found for the selected category.
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={servicesData?.pagination.total_pages || 1}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllProvider;
