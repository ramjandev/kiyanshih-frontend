export type SettingsResponse = {
  success: boolean;
  settings: SettingsForProvider;
};

export type SettingsForProvider = {
  preferences: Preferences;
  notifications: Notifications;
  availability: Availability;
};

type Preferences = {
  show_contact_info: boolean;
  make_profile_public: boolean;
  allow_messages: boolean;
};

type Notifications = {
  email_notifications: boolean;
  sms_notifications: boolean;
  booking_reminders: boolean;
  job_alerts: boolean;
  all_notifications_enabled: boolean;
};

type Availability = {
  start_time: string; // "HH:mm" format
  end_time: string; // "HH:mm" format
  selected_days: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  weekend_availability: boolean;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};
export type DeleteAccountPayload = {
  password: string;
  confirm_text: "DELETE";
};
