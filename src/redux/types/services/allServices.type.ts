export interface ServiceImage {
  id: number;
  image: string;
  image_url: string;
  order: number;
}
export interface ProviderInfo {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  city: string;
  area: string;
  is_verified: boolean;
  logo: string;
}

export interface ProviderService {
  id: number;
  job_title: string;
  provider_info: ProviderInfo;
  service_image: string;
  choose_category: string;
  specific_services: string;
  location: string;
  base_price: string;
  price_type: "hourly" | "fixed";
  price_display: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  created_at: string;
}
export interface PaginatedProviderServicesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProviderService[];
}


// serviceDetails.type.ts
export interface ServiceAvailability {
  day: string;
  time: string;
}
export type PriceType = "hourly" | "fixed";
export type ServiceStatus = "active" | "inactive" | "draft";

export interface ServiceDetails {
  id: number;
  provider: number;
  provider_name: string;
  provider_email: string;
  average_rating: number;
  total_reviews: number;

  job_title: string;
  choose_category: string;
  specific_services: string;
  service_description: string;
  what_you_get: string;

  base_price: string;
  price_type: PriceType;
  service_area: string;

  service_inclusions: string[];
  availability: ServiceAvailability[];
  images: ServiceImage[];

  status: ServiceStatus;
  views_count: number;
  is_featured: boolean;

  created_at: string;
  updated_at: string;
  verified: boolean;
}

export interface ServiceDetailsResponse {
  success: boolean;
  data: ServiceDetails;
}
