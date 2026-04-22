import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: "preferences", label: "Preferences Settings" },
  { id: "notification", label: "Notification Setting" },
  { id: "security", label: "Login & Security Setting" },
]

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
      {tabs.map((tab) => (
        <div key={tab.id} className="flex items-center gap-2">
          <Checkbox
            id={tab.id}
            checked={activeTab === tab.id}
            onCheckedChange={() => onTabChange(tab.id)}
            className={activeTab === tab.id ? "bg-black text-white cursor-pointer" : "cursor-pointer"}
          />
          <Label
            htmlFor={tab.id}
            className="cursor-pointer text-sm font-normal text-foreground"
          >
            {tab.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default SettingsTabs;
