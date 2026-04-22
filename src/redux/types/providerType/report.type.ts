export type TProviderReportStats = {
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
  total_applications: number;
  accepted_applications: number;
  start_date: string | null;
  end_date: string | null;
  pending_earnings?: number;
};
