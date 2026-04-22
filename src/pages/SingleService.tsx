import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFeaturedServicesGetQuery, useGetCategorySubcategoriesQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { originalTitle } from "@/help/help";
import CommonWrapper from "@/common/space/CommonWrapper";
import Hero from "@/components/home/Hero";
import AllProvider from "@/components/service/SingleService.tsx/AllProvider";
import SubCategorySection from "@/components/service/SingleService.tsx/SubCategorySection";
import Footer from "@/layout/Footer";
import CommonLoader from "@/common/CommonLoader";
import heroImage from "@/assets/images/service1.png";

const SingleService = () => {
  const { category: slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  // Get category and subcategories
  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } = useGetCategorySubcategoriesQuery(slug || "");

  // Get the category name from the subcategories response
  const currentCategoryName = subcategoriesData?.category;

  // Reset subcategory selection when the main category changes
  useEffect(() => {
    setSelectedSubCategory("");
  }, [slug]);

  const subCategories = useMemo(() => {
    return subcategoriesData?.subcategories || [];
  }, [subcategoriesData]);

  const { data: servicesData, isLoading: isServicesLoading, isFetching } = useFeaturedServicesGetQuery(
    {
      current_page: currentPage,
      page_size: 15,
      category_slug: slug,
      subcategory_slug: selectedSubCategory || undefined,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !slug,
    }
  );

  console.log("all services provider", servicesData);

  const handleSubCategorySelect = (subCategoryName: string) => {
    if (subCategoryName === "") {
      setSelectedSubCategory("");
    } else if (selectedSubCategory === subCategoryName) {
      setSelectedSubCategory("");
    } else {
      setSelectedSubCategory(subCategoryName);
    }
    setCurrentPage(1);
  };

  if (isSubcategoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CommonLoader />
      </div>
    );
  }

  return (
    <div>
      <Hero
        title={currentCategoryName || `Professional ${originalTitle(slug ?? "")}, Just a Click Away.`}
        subtitle="We'll tackle your entire to-do list, big or small. Book your trusted local handyman today."
        image={heroImage} 
        subColor="!text-white"
      />
      <CommonWrapper>
        <SubCategorySection
          subCategories={subCategories}
          selectedCategory={selectedSubCategory}
          onSelect={handleSubCategorySelect}
          mainCategoryName={currentCategoryName}
        />
        <AllProvider
          servicesData={servicesData}
          isLoading={isServicesLoading}
          isFetching={isFetching}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          onSubCategorySelect={handleSubCategorySelect}
          mainCategoryName={currentCategoryName}
        />
      </CommonWrapper>
      <Footer />
    </div>
  );
};

export default SingleService;
