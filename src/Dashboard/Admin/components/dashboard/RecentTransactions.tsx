import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import type { RecentTransaction } from "@/redux/featuresAPI/adminApi/types/booking";

interface Transaction {
  recentTransactions: RecentTransaction[];
}
const RecentTransactions: React.FC<Transaction> = ({ recentTransactions }) => {
  console.log("recentTransactions:", recentTransactions);
  return (
    <CommonBorderWrapper className="w-full h-full">
      <div>
        {/* Header */}
        <div>
          <CommonHeader className="pb-2">Recent Transactions</CommonHeader>
          <CommonHeader className="text-[#4B5864]">
            05 Transactions this month
          </CommonHeader>
        </div>

        {/* Timeline */}
        <div className="relative mt-6">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-6">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.booking_id}
                className="relative flex items-start gap-3"
              >
                {/* Timeline Circle */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue rounded-full bg-white"></div>
                </div>

                {/* Transaction details */}
                <div className="flex-1 min-w-0">
                  <CommonHeader className="!text-sm !leading-[20px]">
                    {transaction.amount}
                  </CommonHeader>
                  <p className="text-xs text-muted-foreground">
                    {transaction.created_at}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default RecentTransactions;
