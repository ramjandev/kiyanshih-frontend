export interface Proposal {
  client_id: number;
  chat_thread_id: number;
  proposal_title: string;
  cover_letter: string;
  proposed_budget: number;
  estimated_duration: string;
  custom_terms: string;
  approach: string;
  why_choose_me: string;
}

// get Proposal for provider

export interface ProposalForProvider {
  id: number;
  job: number | null;
  job_title: string;
  job_location: string | null;
  job_budget: number | null;
  job_budget_type: string | null;
  job_image: string | null;
  provider: number;
  provider_name: string;
  provider_email: string;
  client: number;
  client_name: string;
  proposal_type: "custom_proposal" | "job_application";
  proposal_title: string;
  cover_letter: string;
  proposed_budget: string;
  estimated_duration: string;
  custom_terms: string;
  approach: string;
  why_choose_me: string;
  questions_for_client: string | null;
  chat_thread_id: number;
  status: "pending" | "accepted" | "rejected";
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface ProposalStatistics {
  total_proposals: number;
  pending: number;
  accepted: number;
  rejected: number;
  custom_proposals: number;
  job_applications: number;
}

export interface ProposalResponseForProvider {
  count: number;
  results: ProposalForProvider[];
  statistics: ProposalStatistics;
}
