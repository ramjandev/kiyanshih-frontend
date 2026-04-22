import { useMemo, type FC } from "react";
import CommonSpace from "@/common/space/CommonSpace";
import CurveSearch from "./CurveSearch";
import SectionHeader from "@/common/header/SectionHeader";
import { useGetAllCatergoryQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";

interface ServiceTopSectionProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
}

const ServiceTopSection: FC<ServiceTopSectionProps> = ({ searchValue, onSearchChange }) => {
  const { data: categoriesData, isLoading } = useGetAllCatergoryQuery();

  const suggestions = useMemo(() => {
    return categoriesData?.categories?.map((cat) => cat.name) || [];
  }, [categoriesData]);

  const handleSuggestionSelect = (suggestion: string) => {
    onSearchChange(suggestion);
    console.log("Selected suggestion:", suggestion);
  };

  return (
    <CommonSpace className="">
      <div className="max-w-3xl">
        <SectionHeader
          className=" !text-start"
          title="Find Local Services"
          subtitle="  Browse verified providers in your area. Free for clients, transparent
          pricing, and reviews from real customers."
        />
      </div>
      <div className=" max-w-2xl pt-4 pb-2">
        <CurveSearch
          value={searchValue}
          onChange={onSearchChange}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionSelect}
          placeholder={isLoading ? "Loading services..." : "What Service Do you Need?"}
        />
      </div>

      {/* Dynamic integration of popular services is currently disabled by user */}
      {/* {!isLoading && suggestions.length > 0 && (
        <div className="max-w-2xl  bg-white border border-border px-10 pb-10 pt-5 rounded-2xl">
          <div className=" flex gap-1">
            <span><GoGraph /></span>
            <CommonHeader className=" mb-8 !text-black">Popular Services</CommonHeader>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((service, index) => (
              <button
                key={index}
                onClick={() => onSearchChange(service)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <CommonHeader className=" border border-border px-4 py-2 !rounded-full">{service}</CommonHeader>
              </button>
            ))}
          </div>
        </div>
      )} */}
    </CommonSpace>
  );
};

export default ServiceTopSection;



