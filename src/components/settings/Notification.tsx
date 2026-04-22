import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";

const Notification = () => {
  const { data } = useGetSettingQuery();
  const notifications = data?.settings.notifications;

  const [settings, setSettings] = useState({
    emailNotifications: notifications?.email_notifications ?? false,
    smsNotifications: notifications?.sms_notifications ?? false,
    bookingReminders: notifications?.booking_reminders ?? false,
  });

  const [updateSetting] = useUpdateSettingMutation();

  useEffect(() => {
    if (notifications) {
      setSettings({
        emailNotifications: notifications.email_notifications,
        smsNotifications: notifications.sms_notifications,
        bookingReminders: notifications.booking_reminders,
      });
    }
  }, [notifications]);

  const allNotifications =
    settings.emailNotifications ||
    settings.smsNotifications ||
    settings.bookingReminders;

  useEffect(() => {
    if (!notifications) return;

    const hasChanged =
      settings.emailNotifications !== notifications.email_notifications ||
      settings.smsNotifications !== notifications.sms_notifications ||
      settings.bookingReminders !== notifications.booking_reminders;

    if (!hasChanged) return;

    const handler = setTimeout(() => {
      const allEnabled =
        settings.emailNotifications ||
        settings.smsNotifications ||
        settings.bookingReminders;

      const updatedNotifications = {
        all_notifications_enabled: allEnabled,
        email_notifications: settings.emailNotifications,
        sms_notifications: settings.smsNotifications,
        booking_reminders: settings.bookingReminders,
        job_alerts: notifications.job_alerts,
      };

      updateSetting({ notifications: updatedNotifications })
        .unwrap()
        .then((res: any) => {
          toast.success(res?.message || "Notifications updated successfully");
        })
        .catch((err: any) => {
          toast.error(err?.data?.message || "Failed to update notifications");
        });
    }, 500);

    return () => clearTimeout(handler);
  }, [settings, notifications, updateSetting]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAllNotifications = () => {
    const newValue = !allNotifications;
    setSettings({
      emailNotifications: newValue,
      smsNotifications: newValue,
      bookingReminders: newValue,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
          Notification
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                All Notification
              </h3>
            </div>
            <ToggleSwitch
              checked={allNotifications}
              onToggle={toggleAllNotifications}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                Email Notifications
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Receive notifications via email
              </p>
            </div>
            <ToggleSwitch
              checked={settings.emailNotifications}
              onToggle={() => toggleSetting("emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                SMS Notifications
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Receive notifications via text message
              </p>
            </div>

            <ToggleSwitch
              checked={settings.smsNotifications}
              onToggle={() => toggleSetting("smsNotifications")}
            />
          </div>

          {/* Booking Reminders */}
          <div className="flex items-center justify-between py-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                Booking Reminders
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Get reminded about upcoming bookings
              </p>
            </div>
            <ToggleSwitch
              checked={settings.bookingReminders}
              onToggle={() => toggleSetting("bookingReminders")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
