// Type for a single transaction
type Transaction = {
  sl: number;
  transaction_id: string;
  transaction_date: string;
  transaction_from: string;
  amount: string;
  action: string;
};

// Type for pagination info
type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

// Type for the full API response
export type TransactionsResponse = {
  success: boolean;
  pagination: Pagination;
  transactions: Transaction[];
};

export type TransactionParams = {
  page?: number;
  page_size?: number;
  date_from?: string;
  date_to?: string;
  search?: string;
};

// Breakdown of earnings by booking type and status
type EarningsBreakdown = {
  total_earnings: string;
  by_booking_type: {
    jobs: string;
    services: string;
  };
  by_status: {
    completed: string;
    pending: string;
  };
};

// Full API response type
export type TransactionsEarningsResponse = {
  success: boolean;
  period: string;
  breakdown: EarningsBreakdown;
};
