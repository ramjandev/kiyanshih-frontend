// Location info
export interface JobLocation {
  city: string;
  state: string;
  street_address: string;
  house_address: string;
  full_address: string;
}

// Client info
export interface ClientInfo {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

// Your application (if applied)
export interface JobApplication {
  proposal_id: number;
  status: "pending" | "accepted" | "rejected";
  proposed_budget: string; // API returns string
  estimated_duration: string;
  cover_letter: string;
  approach: string | null;
  why_choose_me: string | null;
  questions_for_client: string | null;
  submitted_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// Main job details
export interface SingleJobDetails {
  id: number;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  location: JobLocation;
  budget: string;
  budget_type: "fixed" | "quote";
  budget_display: string;
  deadline: string; // YYYY-MM-DD
  status: "open" | "closed";
  image_url: string | null;
  created_at: string;
  updated_at: string;
  client_info: ClientInfo;
  has_applied: boolean;
  application_status: "pending" | "accepted" | "rejected" | null;
  your_application: JobApplication | null;
  total_applications: number;
  can_apply: boolean;
}
