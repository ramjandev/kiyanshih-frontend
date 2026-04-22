export type JobDetails = {
  id: number;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  location: {
    city: string;
    state: string;
    street_address: string;
    house_address: string;
    full_address: string;
  };
  budget: string;
  budget_type: string;
  budget_display: string;
  deadline: string; // ISO date string
  status: string;
  image_url: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  client_info: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
  };
  has_applied: boolean;
  application_status: string;
  your_application: {
    proposal_id: number;
    status: string;
    proposed_budget: string;
    estimated_duration: string;
    cover_letter: string;
    approach: string | null;
    why_choose_me: string | null;
    questions_for_client: string | null;
    submitted_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
  total_applications: number;
  can_apply: boolean;
};
