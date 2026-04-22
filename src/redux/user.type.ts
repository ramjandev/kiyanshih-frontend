// types.ts

export type UserRole = "normal_user" | "provider" | "admin";

export type TUser = {
  password: string;
  confirm_password: string;

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  area: string;
  role: UserRole;

  latitude?: number;
  longitude?: number;

  business_name?: string;
  business_description?: string;

  service_category?: string;
  sub_category?: string;
  about_service?: string;
  service_location?: string;

  years_of_experience?: number;

  pricing_model?: "hourly" | "fixed";
  hourly_rate?: number;
  logo?: File;
  business_logo?: File | null;

  plan_tier?: "basic" | "standard" | "premium" | "unlimited" | string;
};

export type ProviderPayment = {
  session_id: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  session_id: string;
  checkout_url: string;
  messages: string;
  success: boolean;
};

// login related types

export interface IUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
  user: IUser;
}
