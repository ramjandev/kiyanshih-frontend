export interface TProviderOverviewStats {
  total_applications: number;
  total_applications_this_month: number;
  pending_applications: number;
  submitted_proposals: number;
  total_bookings: number;
  total_service_bookings: number;
  service_bookings_this_month: number;
  active_service_bookings: number;
  completed_service_bookings: number;
  provider_rating: number;
  total_reviews: number;
  total_job_reviews: number;
  total_service_reviews: number;
  total_earnings: number;
  monthly_revenue: number;
  pending_payments: number;
  monthly_application_limit: number;
  current_month_applications: number;
  limit_reached: boolean;
  is_verified: boolean;
  verification_status: string;
  active_services: ActiveService[];
  recent_service_bookings: RecentServiceBooking[];
  available_jobs: AvailableJob[];
}

export interface ActiveService {
  id: number;
  job_title: string;
  image: string | null;
  location: string;
  budget: string;
  budget_type: string;
  status: string;
  views: number;
  applications: number;
  bookings: number;
  rating: number;
}

export interface RecentServiceBooking {
  id: number;
  service_title: string;
  user_name: string;
  booking_date: string;
  time_slot: string;
  amount: string;
  status: string;
  payment_status: string;
  created_at: string;
  service_image: string;
}

export interface AvailableJob {
  id: number;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  city: string;
  state: string;
  budget: string;
  budget_type: string;
  status: string;
  deadline: string; // ISO date string
  created_at: string; // ISO date string
  client_name: string;
  client_email: string;
  has_applied: boolean;
  image_url: string;
  application_status: string | null;
}
