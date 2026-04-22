export type TProviderProfile = {
  business_name: string;
  business_description: string;
  business_logo: string;
  profile_picture: string | null;

  service_category: string;
  sub_category: string;
  service_location: string;

  years_of_experience: number;

  pricing_model: "fixed" | "hourly";
  hourly_rate: number | null;
  fixed_price_range_min: number | null;
  fixed_price_range_max: number | null;

  monday_available: boolean;
  tuesday_available: boolean;
  wednesday_available: boolean;
  thursday_available: boolean;
  friday_available: boolean;
  saturday_available: boolean;
  sunday_available: boolean;

  start_time: string | null;
  end_time: string | null;
};
