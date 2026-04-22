export interface ServiceImage {
  id: number;
  image: string;
  image_url: string;
  order: number;
}

export interface ServiceItem {
  id: number;
  provider_name: string;
  job_title: string;
  choose_category: string;
  base_price: string;
  price_type: string;
  service_area: string;
  images: ServiceImage[];
  status: string;
  views_count: number;
  availability_count: number;
  created_at: string; // ISO date string

  average_rating: number;
  total_reviews: number;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ServiceResponse {
  pagination: Pagination;
  results: ServiceItem[];
}

export interface JobProposal {
  job: number;
  cover_letter: string;
  proposed_budget: number;
  estimated_duration: string;
}
export interface BoostCheckoutResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
  boost_id: number;
}

export interface ServiceBoost {
  service_id: number;
  boost_type: "super_boost" | string;
  duration_days: number;
}
