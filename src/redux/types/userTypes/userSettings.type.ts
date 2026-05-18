export type UserInfo = {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  city: string
  area: string
  role: "normal_user" | "provider" | "admin" | string
}

export type PreferencesSetting = {
  contact_info_show: boolean
  public_profile_visible: boolean
}

export type NotificationSetting = {
  email_notifications: boolean
  sms_notifications: boolean
  job_alerts: boolean
  booking_reminders: boolean
}

export type Settings = {
  user_info: UserInfo
  preferences_setting: PreferencesSetting
  notification_setting: NotificationSetting
}

export type UserSettingsResponse = {
  success: boolean
  settings: Settings
  message?: string
}

// Keep TUserSettings as an alias for UserSettingsResponse if it's widely used, 
// or update it to match the Settings object itself. 
// Given the API query build.query<TUserSettings, void>, TUserSettings should likely be the full response or the settings object.
// I'll make it the full response to match build.query behavior.
export type TUserSettings = UserSettingsResponse;

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