import d1 from "@/assets/images/dash1.svg";
import d2 from "@/assets/images/dash2.svg";
import d3 from "@/assets/images/dash3.svg";
import d4 from "@/assets/images/dash4.svg";
import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import CurveCard from "@/Dashboard/Admin/common/CurveCard";
import type { BusinessAnalytics } from "@/redux/featuresAPI/adminApi/types/booking";
export const loadingList = new Array(4).fill(null);

interface DashboardCardSectionProps {
  analyticsData: BusinessAnalytics;
  isLoading: boolean;
}
const DashboardCardSection: React.FC<DashboardCardSectionProps> = ({
  analyticsData,
  isLoading,
}) => {
  const data = [
    {
      title: "Total earning",
      value: `${analyticsData.total_earning}$`,
      icon: d1,
      opacity: "opacity-20",
      bgColor: "!bg-[#ECFEFF]",
      curveColor: "bg-[#A5F3FC]",
      textColor: "text-[#0891B2]",
    },
    {
      title: "Total Platform Revenue",
      value: `${analyticsData.platform_revenue}$`,
      icon: d2,
      opacity: "opacity-5",
      bgColor: "!bg-[#FDF2F8]",
      curveColor: "bg-[#F9A8D4]",
      textColor: "!text-[#9D174D]",
    },
    {
      title: "Total subscription",
      value: `${analyticsData.total_subscription}`,
      icon: d4,
      opacity: "opacity-100",
      bgColor: "!bg-[#F0FDF4]",
      curveColor: "bg-[#DCFCE7]",
      textColor: "text-[#14532D]",
    },

    {
      title: "Total Provider",
      value: analyticsData.total_provider,
      icon: d3,
      opacity: "opacity-5",
      bgColor: "!bg-[#FFF7ED]",
      curveColor: "!bg-[#FDBA74]",
      textColor: "text-[#EA580C]",
    },
  ];
  return (
    <div className="bg-white p-5 rounded-[10px] border border-border">
      <CommonHeader className="pb-3">Business Analytics</CommonHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {isLoading
          ? loadingList.map((_, index) => <DashboardCardSkeleton key={index} />)
          : data.map((item, index) => (
              <CurveCard
                key={index}
                {...item}
                value={item.value}
                title={item.title}
                icon={item.icon}
                bgColor={item.bgColor}
                textColor={item.textColor}
                curveColor={item.curveColor}
              />
            ))}
      </div>
    </div>
  );
};

export default DashboardCardSection;
