import { useState } from "react"
import CommonWrapper from "@/common/space/CommonWrapper"
import PreferencesTab from "../userComponents/settings/PreferencesTab"
import NotificationTab from "../userComponents/settings/NotificationTab"
import SecurityTab from "../userComponents/settings/SecurityTab"
import SettingsTabs from "../userComponents/settings/SettingsTabs"

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("preferences")

  const renderTabContent = () => {
    switch (activeTab) {
      case "preferences":
        return <PreferencesTab />
      case "notification":
        return <NotificationTab />
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