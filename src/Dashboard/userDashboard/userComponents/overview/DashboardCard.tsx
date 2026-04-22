import React, { type FC } from "react";

import CommonHeader from "@/common/header/CommonHeader";
type MetricCard = {
  title: string;
  value: string | number | React.ReactNode;  // Use React.ReactNode for JSX
  color?: string;
  image?: string;
};



interface MetricCardProps {
  metrics: MetricCard[];
}

const DashboardCard: FC<MetricCardProps> = ({ metrics }) => {


  return (
    <>
      {metrics.map((metric, i) => (
        <div
          key={i}
          className="p-5 rounded-md border border-border flex items-center gap-5 "
        >
          <div
            className={`${metric.color} w-12 h-12 rounded-sm flex items-center justify-center p-2`}
          >
            <img
              className="w-6 h-6 p-  objet-cover"
              src={metric.image}
              alt=""
            />
          </div>
          <div className=" space-y-1">
            <CommonHeader className=" !text-[#1F2937]  !font-bold">
              {metric.value}
            </CommonHeader>
            <CommonHeader className="!text-lg !text-[#4B5563] ">
              {metric.title}
            </CommonHeader>
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardCard;
