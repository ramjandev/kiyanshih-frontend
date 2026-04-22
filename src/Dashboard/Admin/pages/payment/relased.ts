export interface ReleasedPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    pagination: Pagination;
  };
}

export interface Payment {
  job: Job;
  user_provider: UserProvider;
  amount: number;
  platform_fee: number;
  provider_received: number;
  status: "Released" | string; // you can extend with other statuses if needed
}

export interface Job {
  title: string;
  description: string;
  completed_date: string | null; // can be null if not completed
}

export interface UserProvider {
  from: string;
  to: string;
  accepted_date: string | null;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}
