export type TUserSettings = {
  id: number;

  language: string;
  timezone: string;
  currency: string;

  show_email: boolean;
  show_phone: boolean;
  make_profile_public: boolean;

  email_notifications: boolean;
  sms_notifications: boolean;
  job_update_notifications: boolean;
  message_notifications: boolean;
  booking_notifications: boolean;
  payment_notifications: boolean;
  promotional_emails: boolean;

  two_factor_enabled: boolean;
  login_alerts: boolean;

  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
}

export type DeleteAccountPayload = {
  password: string;
}

export type DeleteAccountResponse = {
  success: boolean;
  message: string;
}

// notification get type 
// User basic info
export interface UserInfo {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  role: "normal_user" | "provider" | "admin";
}

// User preferences
export interface UserPreferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  job_alerts: boolean;
  booking_reminders: boolean;
}

// Settings wrapper
export interface UserSettings {
  user_info: UserInfo;
  preferences: UserPreferences;
}

// Full API response
export interface UserSettingsResponse {
  success: boolean;
  settings: UserSettings;
  message?: string;
}

export interface Transaction {
  id: number;
  transaction_id: string;
  created_at: string;
  provider_name: string;
  job_title: string;
  amount: string;
  status: string;
}

export interface TransactionListResponse {
  success: boolean;
  message: string;
  results: Transaction[];
}
