import CommonSelect from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import type { EarningStatistics } from "@/redux/featuresAPI/adminApi/types/booking";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// --- Options ---
const periodOptions = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
] as const;

// --- Types ---
type Period = (typeof periodOptions)[number]["value"];

interface EarningSectionProps {
  earningStatistics: EarningStatistics;
}

const EarningsChart: React.FC<EarningSectionProps> = ({
  earningStatistics,
}) => {
  const [period, setPeriod] = useState<Period>("yearly");

  // Compute chart data dynamically from backend
  const chartData = useMemo(() => {
    switch (period) {
      case "monthly":
        return earningStatistics.monthly.map((item) => ({
          day: item.month,
          value: Number(item.amount),
        }));
      case "weekly":
        return earningStatistics.weekly.map((item) => ({
          day: item.week,
          value: Number(item.amount),
        }));
      default:
        return earningStatistics.yearly.map((item) => ({
          month: item.month,
          value: Number(item.amount),
        }));
    }
  }, [period, earningStatistics]);

  return (
    <CommonBorderWrapper className="w-full">
      {/* Header with Period Select */}
      <div className="flex flex-col lg:flex-row items-center justify-between pb-6 gap-2">
        <CommonHeader>Earning Statistics</CommonHeader>
        <div className="flex items-center gap-2">
          <CommonSelect<Period>
            value={period}
            item={periodOptions}
            onValueChange={setPeriod}
            w={130}
            className="h-10"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey={period === "yearly" ? "month" : "day"}
              axisLine={false}
              tickLine={false}
              className="text-gray-500"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, "dataMax + 50"]}
              className="text-gray-500"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#D96B3B"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CommonBorderWrapper>
  );
};

export default EarningsChart;
