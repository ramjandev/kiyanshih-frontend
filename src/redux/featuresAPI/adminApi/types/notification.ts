export interface NotificationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NotificationItem[];
}

export interface NotificationItem {
  id: number;
  recipient: number;
  recipient_email: string;
  recipient_name: string;

  event_type: string;
  event_display: string;

  title: string;
  message: string;

  priority: "low" | "normal" | "high" | "urgent";
  priority_display: string;

  channels: NotificationChannel[];

  is_read: boolean;
  read_at: string | null;

  booking_id: number | null;
  job_id: number | null;
  proposal_id: number | null;
  payment_id: number | null;
  service_id: number | null;
  user_id: number | null;

  metadata: Record<string, any>;

  action_url: string;

  created_at: string;
  updated_at: string;
}

export type NotificationChannel = "in_app" | "push" | "email";

export type NotificationParams = {
  recipient_id?: number;
};

// view log

export interface CreateNotificationPayload {
  recipient_ids: number[];

  event_type: string;

  title: string;
  message: string;

  priority: "low" | "normal" | "high" | "urgent";

  channels: NotificationChannel[];
}

// Individual notification
interface Notification {
  id: number;
  recipient: number;
  recipient_email: string;
  recipient_name: string;
  event_type: "booking_created" | "job_created" | "user_registered" | string;
  event_display: string;
  title: string;
  message: string;
  priority: "normal" | "high" | "low" | string;
  priority_display: string;
  channels: ("in_app" | "push" | "email" | string)[];
  is_read: boolean;
  read_at: string | null;
  booking_id: number | null;
  job_id: number | null;
  proposal_id: number | null;
  payment_id: number | null;
  service_id: number | null;
  user_id: number | null;
  metadata: Record<string, unknown>;
  action_url: string;
  created_at: string;
  updated_at: string;
}

// Paginated API response wrapper
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Final type
export type SingleNotification = PaginatedResponse<Notification>;

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  role: "admin" | "user" | string;
  latitude: number | null;
  longitude: number | null;
  profile_image_url: string;
  email_verified: boolean;
  phone_verified: boolean;
  date_joined: string; // ISO date string
  provider_profile: unknown | null;
  user_profile: unknown | null;
};
