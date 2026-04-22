import { useGetNotificationSettingsQuery, useUpdateNotificationSettingsMutation } from "@/redux/featuresAPI/userAPI/settings.api";
import Loader from "@/common/Loader";
import { toast } from "react-toastify";
import type { UserPreferences } from "@/redux/types/userTypes/userSettings.type";
import { useEffect, useState } from "react";

const NotificationTab = () => {
    const { data: response, isLoading, isError } = useGetNotificationSettingsQuery(undefined);
    const [updateSettings, { isLoading: isUpdating }] = useUpdateNotificationSettingsMutation();

    const settings = response?.settings;
    const [localPreferences, setLocalPreferences] = useState<UserPreferences | null>(null);

    // Sync local state when API data arrives
    useEffect(() => {
        if (settings?.preferences) {
            setLocalPreferences(settings.preferences);
        }
    }, [settings]);

    if (isLoading) return <div className="py-10"><Loader size={48} color="border-blue-600" /></div>;
    if (isError || !settings) return <div className="text-center py-10 text-red-500">Failed to load notification settings.</div>;

    // Use local state if available, otherwise fallback to API data
    const preferences = localPreferences || settings.preferences;

    const handleToggle = async (key: keyof UserPreferences) => {
        if (isUpdating) return;

        // Optimistic update
        const previousState = localPreferences ? { ...localPreferences } : { ...settings.preferences };
        const newPreferences = {
            ...(localPreferences || settings.preferences),
            [key]: !preferences[key]
        };

        setLocalPreferences(newPreferences);

        try {
            const res = await updateSettings({
                user_info: settings.user_info,
                preferences: newPreferences
            } as any).unwrap();

            toast.success(res?.message || "Settings updated successfully!");
        } catch (error: any) {
            setLocalPreferences(previousState);
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Notification</h2>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                            <div className="text-sm text-gray-500">Receive notifications via email</div>
                        </div>

                        <button
                            role="switch"
                            aria-checked={preferences.email_notifications}
                            onClick={() => handleToggle("email_notifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${preferences.email_notifications ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${preferences.email_notifications ? 'translate-x-6' : 'translate-x-0.5'}`}
                            />
                        </button>
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">SMS Notifications</div>
                            <div className="text-sm text-gray-500">Receive notifications via text message</div>
                        </div>

                        <button
                            role="switch"
                            aria-checked={preferences.sms_notifications}
                            onClick={() => handleToggle("sms_notifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${preferences.sms_notifications ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${preferences.sms_notifications ? 'translate-x-6' : 'translate-x-0.5'}`}
                            />
                        </button>
                    </div>

                    {/* Job Alerts */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Job Alerts</div>
                            <div className="text-sm text-gray-500">Get notified about new job opportunities</div>
                        </div>

                        <button
                            role="switch"
                            aria-checked={preferences.job_alerts}
                            onClick={() => handleToggle("job_alerts")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${preferences.job_alerts ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${preferences.job_alerts ? 'translate-x-6' : 'translate-x-0.5'}`}
                            />
                        </button>
                    </div>

                    {/* Booking Reminders */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Booking Reminders</div>
                            <div className="text-sm text-gray-500">Get reminded about upcoming bookings</div>
                        </div>

                        <button
                            role="switch"
                            aria-checked={preferences.booking_reminders}
                            onClick={() => handleToggle("booking_reminders")}
                            className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${preferences.booking_reminders ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${preferences.booking_reminders ? 'translate-x-6' : 'translate-x-0.5'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationTab;
