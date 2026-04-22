import LargeTitle from "@/common/header/LargeTitle";
import SubHeader from "./SubHeader";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const DashboardTopSection = ({
  title,
  description,
  className,
}: ManagementHeaderProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-end justify-between  ${className} pb-6`}
    >
      <div className="space-y-2 ">
        {title && <LargeTitle>{title}</LargeTitle>}
        {description && (
          <div className="w-full ">
            <SubHeader className=" !text-base !text-[#334155] !leading-[28px]">
              {description}
            </SubHeader>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardTopSection;
