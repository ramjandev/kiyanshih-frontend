import CommonSpace from "@/common/space/CommonSpace";
import type {
  EarningStatistics,
  RecentTransaction,
} from "@/redux/featuresAPI/adminApi/types/booking";
import EarningsChart from "./EarningsChart";
import RecentTransactions from "./RecentTransactions";

interface EarningSectionProps {
  earningStatistics: EarningStatistics;
  recentTransactions: RecentTransaction[];
}
const EarningSection: React.FC<EarningSectionProps> = ({
  earningStatistics,
  recentTransactions,
}) => {
  return (
    <CommonSpace>
      <div className=" w-full flex flex-col lg:flex-row items-stretch  gap-7.5">
        <div className="w-full">
          <EarningsChart earningStatistics={earningStatistics} />
        </div>
        <div className="w-full xl:w-[440px]">
          <RecentTransactions recentTransactions={recentTransactions} />
        </div>
      </div>
    </CommonSpace>
  );
};

export default EarningSection;
