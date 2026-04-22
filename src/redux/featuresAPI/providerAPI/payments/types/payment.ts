export type EarningsResponse = {
  success: boolean;
  earnings: {
    active_jobs: number;
    active_jobs_breakdown: {
      maintenance: number;
    };
    revenue_this_month: string;
    revenue_change_percentage: string;
    total_earnings: string;
    available_balance: string;
    pending_earnings: string;
    completed_jobs: number;
  };
};

type Payment = {
  id: number;
  job: string;
  client: string;
  client_to: string;
  project_completion: string; // e.g., "Completed: 2025-12-17"
  accepted_date: string; // e.g., "2025-12-17"
  amount: string; // e.g., "15000.00"
  status: string; // e.g., "Paid"
  booking_type: string; // e.g., "service"
};

type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

export type HistoryResponse = {
  success: boolean;
  pagination: Pagination;
  payments: Payment[];
};
