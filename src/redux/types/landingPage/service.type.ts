export interface ServicesResponse {
  success: boolean;
  pagination: Pagination;
  services: Service[];
  filters_applied: FiltersApplied;
}

export interface ServiceParams {
  current_page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  category_slug?: string;
  subcategory?: string;
  subcategory_slug?: string;
  min_price?: number;
  max_price?: number;
  service_area?: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface Service {
  id: number;
  provider_name: string;
  job_title: string;
  category: number;
  category_name: string;
  subcategory: number;
  subcategory_name: string;
  choose_category: string;
  base_price: string; // API sends as string
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

export interface ServiceImage {
  id: number;
  image: string;
  image_url: string;
  order: number;
}

export interface FiltersApplied {
  search: string | null;
  category_id: number | null;
  category_slug: string | null;
  subcategory_id: number | null;
  subcategory_slug: string | null;
  service_area: string | null;
  min_price: number | null;
  max_price: number | null;
}









// // Root API Response
// export interface ServicesResponse {
//   success: boolean;
//   pagination: Pagination;
//   services: Service[];
//   filters_applied: FiltersApplied;
// }

// // Pagination
// export interface Pagination {
//   current_page: number;
//   total_pages?: number;
//   total_items?: number;
//   page_size: number;
//   has_next?: boolean;
//   has_previous?: boolean;
// }

// // Service
// export interface Service {
//   id: number;
//   provider_name: string;
//   job_title: string;
//   category: number;
//   category_name: string;
//   subcategory: number;
//   subcategory_name: string;
//   choose_category: string;
//   base_price: string;
//   price_type: "fixed" | "hourly";
//   service_area: string;
//   images: ServiceImage[];
//   status: "active" | "inactive";
//   views_count: number;
//   availability_count: number;
//   average_rating: number;
//   total_reviews: number;
//   created_at: string;
// }

// // Service Image
// export interface ServiceImage {
//   id: number;
//   image: string;
//   image_url: string;
//   order: number;
// }

// // Filters Applied
// export interface FiltersApplied {
//   search: string | null;
//   category_id: number | null;
//   category_slug: string | null;
//   subcategory_id: number | null;
//   subcategory_slug: string | null;
//   service_area: string | null;
//   min_price: number | null;
//   max_price: number | null;
// }

