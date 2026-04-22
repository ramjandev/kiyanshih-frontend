// Image type
export interface ServiceImage {
  id: number;
  image: string;
  image_url: string;
  order: number;
}

// Service item
export interface Service {
  id: number;
  provider_name: string;
  job_title: string;
  category: string | null;
  subcategory: string | null;
  choose_category: string;
  base_price: string; // keep string because API sends it as string
  price_type: "fixed" | "hourly";
  service_area: string;
  images: ServiceImage[];
  status: "active" | "inactive";
  views_count: number;
  availability_count: number;
  average_rating: number;
  total_reviews: number;
  created_at: string; // ISO date string
}

// Filters
export interface ServiceFilters {
  category_id: number | null;
  category_slug: string | null;
  subcategory_id: number | null;
  subcategory_slug: string | null;
  search: string;
  min_price: number | null;
  max_price: number | null;
  service_area: string;
}

// Main API response
export interface AllServicesResponse {
  success: boolean;
  count: number;
  services: Service[];
  filters: ServiceFilters;
}
