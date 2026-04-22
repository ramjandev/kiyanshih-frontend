import DashboardTopSection from "../../common/DashboardTopSection";
import SubscriptionTable from "../../components/subscription/SubscriptionTable";

const Subscription = () => {
  return (
    <div>
      <DashboardTopSection
        title="Current Plan in Use"
        description="Manage the current plan and track usage"
      />
      <SubscriptionTable />
    </div>
  );
};

export default Subscription;
