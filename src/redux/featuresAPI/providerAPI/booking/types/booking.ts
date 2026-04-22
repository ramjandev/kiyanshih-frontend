export type BookingStatsResponse = {
  success: boolean;
  statistics: {
    pending_requests: number;
    confirmed_bookings: number;
    completed_services: number;
    total_revenue: string;
  };
  counts_by_status: {
    pending: number;
    accepted: number;
    rejected: number;
    in_progress: number;
    completed: number;
  };
};

export type BookingDetailsResponse = {
  success: boolean;
  booking: Booking;
};

type Booking = {
  id: number;
  booking_number: string;
  status: string;
  status_display: string;
  booking_placed: string; // date-time string
  payment_method: PaymentMethod;
  schedule: Schedule;
  booking_summary: BookingSummaryItem[];
  service_amount: string;
  platform_fee: string;
  grand_total: string;
  provider_will_receive: string;
  service_location: ServiceLocation;
  customer: Customer;
  user_notes: string;
  payment_status: string;
  payment_status_display: string;
  booking_setup: BookingSetup;
};

type PaymentMethod = {
  amount: string;
  payment_via: string;
};

type Schedule = {
  date: string;
  time_slot: string;
};

type BookingSummaryItem = {
  service: string;
  amount: string;
  total: string;
};

type ServiceLocation = {
  address: string;
  note: string;
};

type Customer = {
  name: string;
  phone: string;
  location: string;
  email: string;
  profile_image: string | null;
};

type BookingSetup = {
  can_accept: boolean;
  can_reject: boolean;
  can_start: boolean;
  can_complete: boolean;
  can_cancel: boolean;
};

/// all booking

export type AllBookingListResponse = {
  success: boolean;
  count: number;
  total_pending: number;
  bookings: BookingListItemForProvider[];
};

export type BookingListItemForProvider = {
  id: number;
  booking_id: string;
  service_name: string;
  service_image: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_location: string;
  booking_date: string; // YYYY-MM-DD
  time_slot: string;
  total_amount: string;
  service_price: string;
  platform_fee: string;
  provider_amount: string;
  payment_method: string;
  payment_status: string;
  user_notes: string;
  status: string;
  status_display: string;
  created_at: string; // datetime string
  can_accept: boolean;
  can_reject: boolean;
};
