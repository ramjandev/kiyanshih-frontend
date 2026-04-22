export type PaymentStatItem = {
  amount: number;
  count?: number;
  label: string;
};

export type PaymentStatisticsData = {
  in_escrow: PaymentStatItem;
  platform_revenue: Omit<PaymentStatItem, "count">;
  to_be_released: PaymentStatItem;
  released_today: PaymentStatItem;
};

export type PaymentStatisticsResponse = {
  success: boolean;
  message: string;
  data: PaymentStatisticsData;
};

// payment list response types

export interface PaymentAwaitingResponse {
  success: boolean;
  message: string;
  data: PaymentsData;
}

export interface PaymentsData {
  payments: Payment[];
  status_summary: StatusSummary;
  pagination: Pagination;
}

export interface Payment {
  booking_id: number;
  job_details: JobDetails;
  provider: ProviderInfo;
  payment_breakdown: PaymentBreakdown;
  booking_status:
    | "confirmed"
    | "in_progress"
    | "completed"
    | "review_request"
    | "ready_for_release"
    | "cancelled"
    | "cancel_booking"
    | "pending_payment";
  status_display: string;
  status_color: string;
  status_badge: "primary" | "info" | "danger" | "success" | string;
  days_in_escrow: number;
  actions: PaymentActions;
  user_notes: string;
  cancellation_reason: string;
}

export interface JobDetails {
  title: string;
  description: string;
  booking_date: string; // YYYY-MM-DD
  time_slot: string;
  completed_date: string | null;
}

export interface ProviderInfo {
  from: string;
  from_email: string;
  to: string;
  to_email: string;
  accepted_date: string; // YYYY-MM-DD
  confirmed_date: string | null;
}

export interface PaymentBreakdown {
  service_price: number;
  platform_fee: number;
  platform_fee_percentage: number;
  total: number;
  provider_amount: number;
}

export interface PaymentActions {
  can_cancel: boolean;
  can_release: boolean;
  can_refund: boolean;
  action_button: string;
}

export interface StatusSummary {
  total_payments_held: number;
  total_amount_in_escrow: number;
  by_status: {
    confirmed: number;
    in_progress: number;
    completed: number;
    review_request: number;
    ready_for_release: number;
    cancelled: number;
  };
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}
