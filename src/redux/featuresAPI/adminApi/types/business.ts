export type SubscriptionResponse = {
  success: boolean;
  message: string;
  data: {
    subscriptions: Subscription[];
    pagination: Pagination;
  };
};

export type Subscription = {
  sl: number;
  provider: Provider;
  contact_information: ContactInformation;
  active_plan: string;
  verification_plan: string;
  action: Action;
};

export type Provider = {
  id: number;
  name: string;
  service: string;
  profile_picture: string | null;
  rating: number;
};

export type ContactInformation = {
  phone: string;
  email: string;
};

export type Action = {
  view_url: string;
};

export type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

// Subscription Details Types
export type SubscriptionDetailsResponse = {
  success: boolean;
  message: string;
  data: SubscriptionDetails;
};

export type SubscriptionDetails = {
  provider_name: string;
  service: string;
  location: string;
  subscription_plan: string;
  subscription_buy_date: string; // formatted date string
  subscription_end_date: string; // formatted date string
};
// transaction types can be added here when needed

export type Transaction = {
  sl: number;
  booking_id: number;
  booking_date: string;
  booking_time: string;
  service_location: string;
  customer_info: {
    name: string;
    phone: string;
  };
  provider_info: {
    name: string;
    service: string;
    phone: string;
  };
  total_amount: number;
  status: string;
  status_color: string;
  transaction_date: string;
};

export type TransactionPagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

export type TransactionsResponse = {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: TransactionPagination;
  };
};
