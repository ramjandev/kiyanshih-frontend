export interface GetJobPost {
  id: string;
  count?: number;
  title: string;
  description?: string;
  category?: string;
  sub_category?: string;
  city: string;
  state: string;
  location: string;
  budget: number;
  budget_type: "fixed" | "hourly" | string;
  status: "open" | "closed" | "in_progress" | "cancelled" | string;
  applications_count?: number;
  bookings_count?: number;
  created_at: string;
  updated_at: string;
  image?: string;
  postedTime?: string;
  proposalCount?: number;
}

export interface GetAllJobs {
  count: number;
  next: string | null;
  previous: string | null;
  results: GetJobPost[];
}


export type Job = {
  id: string;
  title: string;
  location: string;
  budget: number;
  postedTime: string;
  status: string;
  city?: string;
  proposalCount: number;
  image: string;
  state?: string;
  budget_type?: string;
  created_at?: string;
  updated_at?: string;

};

export type TJob = {
  id: number;
  title: string;
  description: string;
  category: string;
  sub_category?: string;
  location: string;
  budget: string;
  budget_display?: string;
  budget_type: "fixed" | "hourly" | "quote" | string;
  status: "open" | "completed" | "in_progress" | "cancelled" | string;
  status_display?: string;
  applications_count: number;
  proposals_count?: string;
  deadline: string;
  image_url?: string;
  created_at: string;
  time_posted?: string;
};

export type TJobListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TJob[];
};


// job proposals type 
export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

// Job proposal item
export interface JobProposal {
  id: number;
  job: number;
  job_title: string;
  job_image: string;
  provider: number;
  provider_name: string;
  provider_email: string;
  provider_phone: string;
  provider_rating: number;
  cover_letter: string;
  proposed_budget: string; // API sends as string
  estimated_duration: string; // API sends as string
  approach: string;
  why_choose_me: string;
  questions_for_client: string;
  status: "pending" | "approved" | "rejected";
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  // provider_location: string;
}

// Full API response
export interface JobProposalResponse {
  pagination: Pagination;
  results: JobProposal[];
}

// Payment type 
export interface StripeCheckoutResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
  amount: number;
  platform_fee: number;
  provider_payout: number;
}

// Payment verified type 
export interface EscrowPayment {
  id: number;
  application_id: number;
  booking_id: number;
  client_name: string;
  provider_name: string;
  amount: string;
  platform_fee: string;
  platform_fee_percentage: string;
  provider_payout: string;
  status: 'held' | 'released' | 'refunded';
  payment_method: 'stripe';
  stripe_payment_intent_id: string;
  provider_completion_confirmed: boolean;
  user_completion_confirmed: boolean;
  user_rating: number | null;
  user_review: string | null;
  payment_received_at: string;
  held_at: string;
  provider_confirmed_at: string | null;
  user_confirmed_at: string | null;
  released_at: string | null;
  created_at: string;
}

export interface PaymentVerifiedResponse {
  success: boolean;
  message: string;
  escrow_payment: EscrowPayment;
}
