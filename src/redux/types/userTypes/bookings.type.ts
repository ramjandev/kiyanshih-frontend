export type TServiceBookingPayload = {
  service: number;
  booking_date: string; // YYYY-MM-DD
  time_slot: string; // e.g. "10:00-12:00"
  user_notes?: string;
  user_phone: string;
  user_location: string;
  service_at: "my_location" | "provider_location";
};


// bookings services type 

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "in-progress"
  | "completed"
  | "confirmed"
  | "accepted_complete_request"
  | "in_progress";

export type PaymentStatus = "held" | "released";

export interface Booking {
  id: number;
  service_title: string;
  service_image: string;
  provider_name: string;
  booking_date: string; // ISO date string, e.g., "2026-02-15"
  time_slot: string;    // e.g., "10:00 AM"
  total_amount: string; // e.g., "2730.00"
  status: BookingStatus;
  payment_status: PaymentStatus;
  created_at: string;   // ISO datetime string
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface BookingResponse {
  pagination: Pagination;
  results: Booking[];
}
