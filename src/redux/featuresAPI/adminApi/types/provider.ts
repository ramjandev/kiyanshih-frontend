export type Provider = {
  sl: number;
  provider_id: number;
  provider_name: string;
  service_name: string;
  rating: number;
  total_reviews: number;
  contact_phone: string;
  contact_email: string;
  total_bookings_served: number;
  service_availability: boolean;
  status: string;
  verification_status: string;
};

export type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};

export type ProvidersResponse = {
  success: boolean;
  message: string;
  pagination: Pagination;
  data: Provider[];
};
export type ProviderParams = {
  current_page?: number;
  page_size?: number;
};

// single provider

export type ProviderProfile = {
  provider_id: number;
  profile_picture: string | null;
  business_logo: string;
  name: string;
  service_name: string;
  rating: string; // e.g., "0.0 (0 Reviews)"
  services_provided: string; // e.g., "0 Services Provided"
  status: string; // e.g., "Basic user"
  verified: boolean;
  available: boolean;
  location: string;
  phone: string;
  email: string;
};

export type MikeHandymanContact = {
  phone: string;
  email: string;
  location: string;
};

export type ServiceInformation = {
  service_name: string;
  license_number: string;
  year_of_experience: string; // e.g., "02"
  total_bookings_served: number;
};

export type ProvidedDocument = {
  id: number;
  document_type: string;
  image_side: string; // e.g., "front" or "back"
  name: string;
  type: string; // e.g., "image"
  url: string;
  download_url: string;
};

export type ProviderData = {
  provider_profile: ProviderProfile;
  about: string;
  skills: string[];
  mike_handyman_contact: MikeHandymanContact;
  service_information: ServiceInformation;
  provided_documents: ProvidedDocument[];
  download_all_url: string;
};

export type ProviderDetailsResponse = {
  success: boolean;
  message: string;
  data: ProviderData;
};

export type AdminActionPayload = {
  action: "approve" | "reject";
  admin_notes: "verified" | "Unverified";
};

export type AdminActionResponse = {
  success: boolean;
  message: string;
};
