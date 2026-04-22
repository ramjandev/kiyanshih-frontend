import SubHeader from "@/Dashboard/Admin/common/SubHeader";

interface TablistProps<T extends string> {
  setTab: (tab: T) => void;
  activeTab: T;
  counts?: Record<T, number>;
  tabs: T[];
}

const Tablist = <T extends string>({
  setTab,
  activeTab,
  counts,
  tabs,
}: TablistProps<T>) => {
  // Capitalize first letter
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex flex-wrap gap-4">
        {tabs.map((status) => (
          <SubHeader
            key={status}
            className={`relative px-4 py-2 mb-2 rounded cursor-pointer transition-colors whitespace-nowrap
              ${
                activeTab === status
                  ? "bg-[#E2E8F0] font-medium"
                  : "text-gray-800"
              }
            `}
            onClick={() => setTab(status)}
          >
            {capitalize(status)}
            {counts && counts[status] !== undefined && (
              <span className="ml-1">
                ({counts[status].toString().padStart(2, "0")})
              </span>
            )}
            {activeTab === status && (
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#007BFF] rounded-full" />
            )}
          </SubHeader>
        ))}
      </div>
    </div>
  );
};

export default Tablist;
