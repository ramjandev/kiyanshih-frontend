import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import BackgroundTable from "@/Dashboard/Admin/components/provider/background/BackgroundTable";
import ProfileCard from "@/Dashboard/Admin/components/provider/background/ProfileCard";
import { useGetAllProvidersQuery } from "@/redux/featuresAPI/adminApi/providerApi";
import type { Provider } from "@/redux/featuresAPI/adminApi/types/provider";
import { useState } from "react";
import DashboardTopSection from "../../common/DashboardTopSection";
const BackgroundCheck = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllProvidersQuery(
    { current_page: currentPage, page_size: limit },
    { refetchOnMountOrArgChange: true }
  );
  const providers = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div>
      <DashboardTopSection
        title="Certain Background check"
        description="Check the identification for authentic providers"
      />

      {selectedProvider ? (
        <ProfileCard
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />
      ) : (
        <>
          <LoadingStatus
            isLoading={isLoading}
            items={providers}
            itemName="providers"
          />
          {!isLoading && providers.length > 0 && (
            <>
              <BackgroundTable
                providers={providers}
                setSelectedProvider={setSelectedProvider}
              />
              <div className="w-full  flex items-center justify-center lg:justify-end pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination?.total_pages || 1}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BackgroundCheck;
