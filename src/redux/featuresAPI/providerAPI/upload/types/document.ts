export type BackgroundCheckPaymentType = {
  payment_amount: number;
  payment_completed: boolean;
  payment_date: string; // ISO date string
  description: string;
  benefits: string[];
  verification_process: string[];
  current_step: "review" | "pending" | "completed"; // extend if needed
  verification_status: "verified" | "unverified" | "rejected"; // extend if needed
};

export type CheckoutSessionResponse = {
  checkout_url: string;
  session_id: string;
  payment_amount: number;
  message: string;
};
