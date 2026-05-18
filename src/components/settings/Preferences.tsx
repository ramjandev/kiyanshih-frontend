import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";

const Preferences = () => {
  const { data } = useGetSettingQuery();
  const preferences = data?.settings.preferences;

  const [settings, setSettings] = useState({
    showContactInfo: preferences?.show_contact_info ?? false,
    publicProfile: preferences?.make_profile_public ?? false,
  });

  const [updateSetting] = useUpdateSettingMutation();

  // Update local state when API data loads
  useEffect(() => {
    if (preferences) {
      setSettings({
        showContactInfo: preferences.show_contact_info,
        publicProfile: preferences.make_profile_public,
      });
    }
  }, [preferences]);

  const handleToggle = async (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    if (!preferences) return;

    const updatedPreferences = {
      show_contact_info:
        key === "showContactInfo"
          ? !preferences.show_contact_info
          : preferences.show_contact_info,
      make_profile_public:
        key === "publicProfile"
          ? !preferences.make_profile_public
          : preferences.make_profile_public,
      allow_messages: preferences.allow_messages,
    };

    try {
      const res = await updateSetting({
        preferences: updatedPreferences,
      }).unwrap();

      toast.success(res?.message || "Preferences updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update preferences");
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Preferences
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Customize your experience
          </p>

          <div className="space-y-6">
            {/* Show contact info */}
            <div
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => handleToggle("showContactInfo")}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  Show contact info to User
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Allow providers to see your contact details
                </p>
              </div>
              <ToggleSwitch
                checked={settings.showContactInfo}
                onToggle={() => handleToggle("showContactInfo")}
              />
            </div>

            {/* Public profile */}
            <div
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => handleToggle("publicProfile")}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  Public profile
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Make your profile visible to providers
                </p>
              </div>
              <ToggleSwitch
                checked={settings.publicProfile}
                onToggle={() => handleToggle("publicProfile")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
