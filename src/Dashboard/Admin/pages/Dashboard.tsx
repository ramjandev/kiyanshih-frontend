import Spinner from "@/common/custom/Spinner";
import { useGetAnalyticsQuery } from "@/redux/featuresAPI/adminApi/bookingApi";
import DashboardCardSection from "../components/dashboard/DashboardCardSection";
import EarningSection from "../components/dashboard/EarningSection";
import SubscriberSection from "../components/dashboard/SubscriberSection";

const Dashboard = () => {
  const { data, isLoading } = useGetAnalyticsQuery();

  const analyticsData = data?.business_analytics || {
    total_earning: "0",
    platform_revenue: "0",
    total_subscription: 0,
    total_provider: 0,
  };
  const earningStatistics = data?.earning_statistics;
  const recentTransactions = data?.recent_transactions ?? [];
  const recentBookings = data?.recent_bookings ?? [];
  const subscriptionProviders = data?.subscription_providers ?? [];

  return (
    <div>
      <DashboardCardSection
        isLoading={isLoading}
        analyticsData={analyticsData}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        earningStatistics && (
          <EarningSection
            earningStatistics={earningStatistics}
            recentTransactions={recentTransactions}
          />
        )
      )}
      <SubscriberSection
        recentBookings={recentBookings}
        subscriptionProviders={subscriptionProviders}
      />
    </div>
  );
};

export default Dashboard;
