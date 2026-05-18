import { useState } from "react"
import CommonWrapper from "@/common/space/CommonWrapper"
import PreferencesTab from "../userComponents/settings/PreferencesTab"
import NotificationTab from "../userComponents/settings/NotificationTab"
import SecurityTab from "../userComponents/settings/SecurityTab"
import SettingsTabs from "../userComponents/settings/SettingsTabs"

import { useGetAllSettingsQuery } from "@/redux/featuresAPI/userAPI/settings.api"
import Loader from "@/common/Loader"

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("preferences")
  const { data: response, isLoading, isError } = useGetAllSettingsQuery(undefined)

  const settings = response?.settings

  if (isLoading) {
    return (
      <CommonWrapper>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader size={48} color="border-blue-600" />
        </div>
      </CommonWrapper>
    )
  }

  if (isError || !settings) {
    return (
      <CommonWrapper>
        <div className="text-center py-10 text-red-500">
          Failed to load settings. Please try again later.
        </div>
      </CommonWrapper>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "preferences":
        return <PreferencesTab settings={settings} />
      case "notification":
        return <NotificationTab settings={settings} />
      case "security":
        return <SecurityTab />
      default:
        return null
    }
  }

  return (
    <CommonWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </CommonWrapper>
  )
}

export default UserSettings;