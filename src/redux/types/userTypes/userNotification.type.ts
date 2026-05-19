export interface Notification {
  id: number;
  event_type: string;
  event_display: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high';
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
  total: number;
  unread_count: number;
  read_count: number;
}

// unread notification 
export interface UnreadNotification {
  id: number;
  event_type: string;
  event_display: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high';
  is_read: boolean;
  read_at: string | null;
  action_url: string;
  created_at: string;
}

export interface UnreadNotificationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UnreadNotification[];
  total: number;
  unread_count: number;
  read_count: number;
}

// notification get stats 
export interface NotificationStats {
  id: number;
  event_type: string;
  event_display: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high';
  is_read: boolean;
  read_at: string | null;
  action_url: string;
  created_at: string;
}

export interface NotificationStatsResponse {
  total_notifications: number;
  unread_count: number;
  read_count: number;
  by_event_type: {
    user_registered?: number;
    job_created?: number;
    booking_created?: number;
    proposal_submitted?: number;
    [key: string]: number | undefined;
  };
  by_priority: {
    normal?: number;
    high?: number;
    low?: number;
    [key: string]: number | undefined;
  };
  recent_notifications: NotificationStats[];
}

// notification update 
export interface NotificationPreferencesUpdatePayload {
  email_enabled: boolean;
  dnd_enabled: boolean;
  dnd_start_time: string;
  dnd_end_time: string;
}