// Booking status union (adjust if backend adds more)
export type BookingStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "In-Progress"
  | "Completed"
  | "Cancelled"
  | string;

// Common user info (customer & provider)
export type UserInfo = {
  name: string;
  phone: string;
  email: string;
};

// Provider info extends base user info
export type ProviderInfo = UserInfo & {
  service: string;
};

// Single booking item
export type Booking = {
  sl: number;
  booking_id: string;
  booking_date: string;
  service_location: string;
  customer_info: UserInfo;
  provider_info: ProviderInfo;
  total_amount: string;
  status: BookingStatus;
};

// Booking counts summary
export type BookingCounts = {
  all_bookings: number;
  pending: number;
  accepted: number;
  rejected: number;
  in_progress: number;
  completed: number;
  cancelled: number;
};

// Pagination info
export type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

// Full API response
export type BookingListResponse = {
  success: boolean;
  message: string;
  counts: BookingCounts;
  pagination: Pagination;
  data: Booking[];
};

export type BookingParams = {
  status?: BookingStatus;
};

export interface BusinessAnalytics {
  total_earning: string;
  platform_revenue: string;
  total_subscription: number;
  total_provider: number;
}

export interface EarningYearly {
  month: string;
  amount: string;
}

export interface EarningMonthly {
  month: string;
  amount: string;
}

export interface EarningWeekly {
  week: string;
  amount: string;
}

export interface EarningStatistics {
  yearly: EarningYearly[];
  monthly: EarningMonthly[];
  weekly: EarningWeekly[];
}

export interface RecentBooking {
  booking_id: string;
  service_name: string;
  customer_name: string;
  booking_date: string;
  status: string;
}
export interface RecentTransaction {
  transaction_id: string;
  booking_id: string;
  amount: string;
  status: string;
  created_at: string;
}

export interface SubscriptionProvider {
  provider_name: string;
  business_logo: string | null;
  services_count: number;
  bookings_completed: number;
  plan_tier: string;
  rating: number;
}

export interface DashboardData {
  business_analytics: BusinessAnalytics;
  earning_statistics: EarningStatistics;
  recent_transactions: RecentTransaction[];
  subscription_providers: SubscriptionProvider[];
  recent_bookings: RecentBooking[];
}
