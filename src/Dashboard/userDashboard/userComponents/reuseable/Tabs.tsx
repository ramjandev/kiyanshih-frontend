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

      <div className="hidden md:flex items-center gap-4 flex-wrap">
        {tabs.map((tab) => {
          const active = isTabActive(tab);

          return (
            <Link
              key={tab.value}
              to={tab.href}
              className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm md:text-[18px] font-semibold border transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 shadow-sm hover:shadow-md
                ${
                  active
                    ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                    : "text-black bg-transparent border-[#CBD5E1] hover:border-[#1D4ED8]"
                }`}
            >
              {/* Slide-up background animation */}
              {active ? (
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              ) : (
                <div className="absolute inset-0 bg-[#1D4ED8] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              )}

              {/* Dynamic Content Wrapper */}
              <div
                className={`relative z-10 flex items-center gap-2 transition-colors duration-300
                  ${active ? "group-hover:text-[#1D4ED8]" : "group-hover:text-white"}`}
              >
                {tab.icon && (
                  <span
                    className={`flex items-center justify-center w-4 h-4 md:w-5 md:h-5 transition-colors duration-300
                      ${active ? "text-white group-hover:text-[#1D4ED8]" : "text-black group-hover:text-white"}`}
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
