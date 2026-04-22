type EventType =
  | "booking_created"
  | "proposal_accepted"
  | "proposal_submitted"
  | "proposal_rejected";

interface Notification {
  id: number;
  event_type: EventType;
  event_display: string;
  title: string;
  message: string;
  priority: "high" | "normal";
  is_read: boolean;
  read_at: string | null;
  action_url: string;
  created_at: string;
}

export interface NotificationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
}

export interface NotificationParams {
  is_read?: boolean;
  event_type?: EventType;
}

export interface MarkNotificationsReadRequest {
  notification_ids: number[];
}
