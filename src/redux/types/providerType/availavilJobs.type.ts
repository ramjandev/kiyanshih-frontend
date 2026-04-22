// available jobs type
// Pagination info
export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface MyJob {
  id: number;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  city: string;
  state: string;
  budget: string;
  budget_type: "fixed" | "hourly" | string;
  status: "open" | "closed";
  deadline: string;
  image_url: string | null;
  created_at: string;
  client_name: string;
  client_email: string;
  has_applied: boolean;
  application_status: string | null | "pending" | "accepted" | "rejected";
}

// Counts summary
export interface JobCounts {
  all: number;
  pending: number;
  accepted: number;
  rejected: number;
}

// Full API response
export interface AvailableJobsResponse {
  pagination: Pagination;
  results: MyJob[];
  counts: JobCounts;
}

export interface AvailableJobParams {
  page?: number;
  page_size?: number;
}

// my jobs type
export interface Job {
  id: number;
  job_title: string;
  location: string;
  job_budget: string;
  job_status: "open" | "closed" | "in_progress";
  status: "pending" | "approved" | "rejected" | "accepted" | "in_progress";
  created_at: string;
  image?: string;
  city?: string;
  state?: string;
  budget_type?: string;
  budget?: string;
  client_name?: string;
}

export interface JobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
}
