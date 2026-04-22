import type {
  RecentBooking,
  SubscriptionProvider,
} from "@/redux/featuresAPI/adminApi/types/booking";
import RecentBookings from "./RecentBookings";
import SubscriptionProviders from "./SubscriptionProviders";

interface EarningSectionProps {
  recentBookings: RecentBooking[];
  subscriptionProviders: SubscriptionProvider[];
}
const SubscriberSection: React.FC<EarningSectionProps> = ({
  recentBookings,
  subscriptionProviders,
}) => {
  return (
    <div className="w-full flex-col lg:flex-row flex gap-7.5">
      <SubscriptionProviders subscriptionProviders={subscriptionProviders} />
      <RecentBookings recentBookings={recentBookings} />
    </div>
  );
};

export default SubscriberSection;
