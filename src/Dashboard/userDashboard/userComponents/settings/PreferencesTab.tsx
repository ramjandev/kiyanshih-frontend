import { useState, useEffect } from "react"
import { useUpdateNotificationSettingsMutation } from "@/redux/featuresAPI/userAPI/settings.api"
import { toast } from "react-toastify"
import type { Settings } from "@/redux/types/userTypes/userSettings.type"

interface PreferencesTabProps {
    settings: Settings
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ settings }) => {
    const [updateSettings, { isLoading: isUpdating }] = useUpdateNotificationSettingsMutation();
    const [localPreferences, setLocalPreferences] = useState(settings.preferences_setting);

    // Sync with props if they change
    useEffect(() => {
        setLocalPreferences(settings.preferences_setting);
    }, [settings.preferences_setting]);

    const handleToggle = async (key: keyof typeof settings.preferences_setting) => {
        if (isUpdating) return;

        const newPreferences = {
            ...localPreferences,
            [key]: !localPreferences[key]
        };

        // Optimistic update
        setLocalPreferences(newPreferences);

        try {
            await updateSettings({
                preferences_setting: newPreferences
            }).unwrap();
            toast.success("Preferences updated successfully");
        } catch (error: any) {
            // Revert on error
            setLocalPreferences(localPreferences);
            toast.error(error?.data?.message || "Failed to update preferences");
        }
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                    <p className="text-sm text-gray-500 mt-1">Customize your experience</p>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Show contact info to providers */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Show contact info to providers</div>
                            <div className="text-sm text-gray-500">Allow providers to see your contact details</div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            role="switch"
                            aria-checked={localPreferences.contact_info_show}
                            onClick={() => handleToggle("contact_info_show")}
                            disabled={isUpdating}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${localPreferences.contact_info_show ? 'bg-blue-600' : 'bg-gray-200'
                                } ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localPreferences.contact_info_show ? 'translate-x-6' : 'translate-x-0.5'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Public profile */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Public profile</div>
                            <div className="text-sm text-gray-500">Make your profile visible to providers</div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            role="switch"
                            aria-checked={localPreferences.public_profile_visible}
                            onClick={() => handleToggle("public_profile_visible")}
                            disabled={isUpdating}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${localPreferences.public_profile_visible ? 'bg-blue-600' : 'bg-gray-200'
                                } ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localPreferences.public_profile_visible ? 'translate-x-6' : 'translate-x-0.5'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferencesTab;