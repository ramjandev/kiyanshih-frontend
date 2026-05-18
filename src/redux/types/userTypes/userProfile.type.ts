export type UserProfileNested = {
  id: number;
  bio: string | null;
  profile_picture: string | null;
  profile_cover_image: string | null;
  date_of_birth: string | null;
  alternate_phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  postal_code: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  role: string;
  latitude: string | null;
  longitude: string | null;
  profile_image_url: string | null;
  email_verified: boolean;
  phone_verified: boolean;
  date_joined: string;
  provider_profile: any | null;
  user_profile: UserProfileNested | null;
  
  // Flattened from user_profile (optional/helper fields for form/UI state compatibility)
  bio?: string | null;
  profile_picture?: string | null;
  date_of_birth?: string | null;
  alternate_phone?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  postal_code?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  profile_completion?: string;
  // UI Specific (Flattened/Mapped)
  profile_image?: string | null;
  profile_cover_image?: string | null;
};

export type UserProfileResponse = {
  success: boolean;
  message: string;
  profile: UserProfile;
};

