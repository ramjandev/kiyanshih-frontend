import CommonSelect from "@/common/custom/CommonSelect";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Tab {
  title: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  basePath?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, basePath }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Hide tabs on book-service route
  if (pathname.includes("book-service")) {
    return null;
  }

  const isTabActive = (tab: Tab) => {
    if (tab.exact) return pathname === tab.href;

    if (pathname === tab.href || pathname.startsWith(tab.href + "/")) {
      return true;
    }

    if (basePath && pathname === basePath && tab.value === "overview") {
      return true;
    }

    return false;
  };

  const activeTab = tabs.find((tab) => isTabActive(tab));

  const selectOptions = tabs.map((tab) => ({
    label: tab.title,
    value: tab.href,
  }));

  return (
    <>
      <div className="flex md:hidden w-full">
        <CommonSelect
          value={activeTab?.href ?? tabs[0]?.href}
          item={selectOptions}
          w={280}
          onValueChange={(val) => navigate(val)}
        />
      </div>

      <div className="hidden md:flex items-center gap-4  flex-wrap">
        {tabs.map((tab) => {
          const active = isTabActive(tab);

          return (
            <Link
              key={tab.value}
              to={tab.href}
              className={`group inline-flex items-center  gap-2 px-4 py-2 rounded-md text-sm md:text-[18px] font-medium border transition-all
                ${
                  active
                    ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                    : "text-black border-[#CBD5E1] hover:bg-[#1D4ED8] hover:text-white"
                }`}
            >
              {tab.icon && (
                <span
                  className={`flex items-center justify-center w-4 h-4 md:w-5 md:h-5
                    ${active ? "text-white" : "text-black group-hover:text-white"}`}
                >
                  {tab.icon}
                </span>
              )}
              <span>{tab.title}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
