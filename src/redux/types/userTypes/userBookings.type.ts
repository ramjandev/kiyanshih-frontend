// ServiceBooking.types.ts

export type ServiceBookingResponse = {
  dashboard: {
    total_services: number;
    confirm_services: number;
    completed_services: number;
    cancel_services: number;
  };

  status_counts: {
    all: number;
    pending: number;
    confirmed: number;
    accepted: number;
    in_progress: number;
    completed: number;
    rejected: number;
    cancelled: number;
  };

  count: number;

  results: ServiceBooking[];
};

export type ServiceBooking = {
  booking_id: number;

  service_title: string;
  service_image: string;
  service_budget: string;
  service_area: string;

  service_rating: number;
  service_reviews_count: number;

  service_status: string;
  service_status_display: string;

  payment_status: string;

  booking_date: string;
  time_slot: string;

  total_amount: string;

  provider: Provider;

  created_at: string;
};

export type Provider = {
  id: number;
  name: string;
  email: string;
  profile_image: string;
  provider_profile_verification: "verified" | "unverified" | string;
};

export type SingleBookingDetail = {
  id: number;
  service_name: string;
  service_category: string | null;
  service: number;
  provider_name: string;
  provider_phone: string;
  provider_profile_picture: string | null;
  booking_date: string;
  time_slot: string;
  service_price: string;
  platform_fee: string;
  total_amount: string;
  provider_amount: string;
  status: string;
  status_display: string;
  payment_status: string;
  payment_status_display: string;
  user_notes: string;
  confirmed_by_user: boolean;
  confirmed_by_user_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SingleBookingDetailResponse = {
  success: boolean;
  booking: SingleBookingDetail;
};
