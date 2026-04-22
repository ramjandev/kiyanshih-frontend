// ProviderList.tsx
import ProviderTable from "@/Dashboard/Admin/components/provider/providerList/ProviderTable";
import DashboardTopSection from "../../common/DashboardTopSection";

const ProviderList = () => {
  return (
    <div>
      <DashboardTopSection
        title="Provider list"
        description="View and manage all registered providers"
      />

      <ProviderTable />
    </div>
  );
};

export default ProviderList;
