import { useGetSettingQuery } from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import React, { useState } from "react";
import Availability from "./Availability";
import Notification from "./Notification";
import Preferences from "./Preferences";
import Security from "./Security";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("preferences");

  const tabs = [
    { id: "preferences", label: "Preferences Settings" },

    { id: "notification", label: "Notification Settings" },
    { id: "security", label: "Security Setting" },
    { id: "availability", label: "Service Availability" },
  ];

  const { data: settingsData } = useGetSettingQuery();
  console.log("data", settingsData);
  const renderTabContent = () => {
    switch (activeTab) {
      case "preferences":
        return <Preferences />;

      case "notification":
        return <Notification />;

      case "security":
        return <Security />;

      case "availability":
        return <Availability />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="mb-8">
        <div className="rounded-sm border border-slate-300 bg-white flex items-center gap-2.5">
          <div className="flex overflow-x-scroll scrollbar-none lg:overflow-x-hidden scrollbar-hide-x-auto -mb-px ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? " bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={activeTab === tab.id}
                  readOnly
                  className="w-4 h-4 text-slate-700 rounded focus:ring-black border-gray-300"
                />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white border border-[#CBD5E1] rounded-lg p-6 lg:p-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
