import { useUpdateNotificationSettingsMutation } from "@/redux/featuresAPI/userAPI/settings.api";
import { toast } from "react-toastify";
import type { Settings, NotificationSetting } from "@/redux/types/userTypes/userSettings.type";
import { useEffect, useState } from "react";

interface NotificationTabProps {
    settings: Settings
}

const NotificationTab: React.FC<NotificationTabProps> = ({ settings }) => {
    const [updateSettings, { isLoading: isUpdating }] = useUpdateNotificationSettingsMutation();
    const [localNotifications, setLocalNotifications] = useState<NotificationSetting>(settings.notification_setting);

    // Sync local state when settings prop changes
    useEffect(() => {
        setLocalNotifications(settings.notification_setting);
    }, [settings.notification_setting]);

    const handleToggle = async (key: keyof NotificationSetting) => {
        if (isUpdating) return;

        const previousState = { ...localNotifications };
        const newNotifications = {
            ...localNotifications,
            [key]: !localNotifications[key]
        };

        setLocalNotifications(newNotifications);

        try {
            await updateSettings({
                notification_setting: newNotifications
            }).unwrap();
            toast.success("Notification settings updated successfully!");
        } catch (error: any) {
            setLocalNotifications(previousState);
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
                            aria-checked={localNotifications.email_notifications}
                            onClick={() => handleToggle("email_notifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${localNotifications.email_notifications ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localNotifications.email_notifications ? 'translate-x-6' : 'translate-x-0.5'}`}
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
                            aria-checked={localNotifications.sms_notifications}
                            onClick={() => handleToggle("sms_notifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${localNotifications.sms_notifications ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localNotifications.sms_notifications ? 'translate-x-6' : 'translate-x-0.5'}`}
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
                            aria-checked={localNotifications.job_alerts}
                            onClick={() => handleToggle("job_alerts")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${localNotifications.job_alerts ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localNotifications.job_alerts ? 'translate-x-6' : 'translate-x-0.5'}`}
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
                            aria-checked={localNotifications.booking_reminders}
                            onClick={() => handleToggle("booking_reminders")}
                            className={`relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${localNotifications.booking_reminders ? 'bg-blue-600' : 'bg-gray-200'} ${isUpdating ? 'opacity-70 pointer-events-none' : ''}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${localNotifications.booking_reminders ? 'translate-x-6' : 'translate-x-0.5'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationTab;
