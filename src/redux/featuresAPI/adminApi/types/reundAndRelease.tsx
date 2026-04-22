// Root API Response
export interface PaymentReleaseBeforeResponse {
  success: boolean;
  message: string;
  data: PaymentReleaseData;
}

// Main Data Object
export interface PaymentReleaseData {
  booking_id: number;
  type: "release" | string;
  service_information: ServiceInformation;
  payment_breakdown: PaymentBreakdown;
  booking_status: BookingStatus;
  action_buttons: ActionButtons;
}

// Service Information
export interface ServiceInformation {
  service_name: string;
  booking_date: string;
  time_slot: string;
  location: string;
  customer: string;
  customer_email: string;
  customer_phone: string;
  provider: string;
  provider_email: string;
  provider_phone: string;
}

// Payment Breakdown
export interface PaymentBreakdown {
  total_amount_paid_by_user: number;
  platform_fee: number;
  provider_payout: number;
  provider_payout_percentage: number;
  amount_to_release: number;
  currency: string;
}

// Booking Status
export interface BookingStatus {
  current_status: string;
  payment_status: string;
  days_in_escrow: number;
  created_at: string;
  completed_at: string;
}

// Action Buttons
export interface ActionButtons {
  can_release: boolean;
  can_refund: boolean;
  button_disabled_reason: string;
  release_endpoint: string;
  release_method: "POST" | "GET" | "PUT" | "DELETE";
}

// refund before release

export interface PaymentDetailsResponse {
  success: boolean;
  message: string;
  data: PaymentReviewRefund;
}

export interface PaymentReviewRefund {
  booking_id: number;
  type: "refund" | "release";

  service_information: ServiceInformationRefund;

  payment_breakdown: PaymentBreakdownRefund;

  booking_status: BookingStatusRefund;

  action_buttons: ActionButtonsRefund;
}

export interface ServiceInformationRefund {
  service_name: string;
  booking_date: string;
  time_slot: string;
  location: string;

  customer: string;
  customer_email: string;
  customer_phone: string;

  provider: string;
  provider_email: string;
  provider_phone: string;
}

export interface PaymentBreakdownRefund {
  total_amount_paid_by_user: number;
  platform_commission_percentage: number;
  platform_commission_amount: number;

  user_refund_percentage: number;
  user_refund_amount: number;

  amount_to_refund: number;
  currency: string;
}

export interface BookingStatusRefund {
  current_status: string;
  payment_status: "held" | "released" | "refunded";
  days_in_escrow: number;

  cancellation_reason: string;
  cancelled_by: string | null;

  created_at: string;
}

export interface ActionButtonsRefund {
  can_release: boolean;
  can_refund: boolean;

  button_disabled_reason: string;

  refund_endpoint: string;
  refund_method: "POST" | "GET" | "PUT" | "DELETE";
}
