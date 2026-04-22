// categories.types.ts

export interface CategoriesApiResponse {
  success: boolean;
  count: number;
  categories: Category[];
}

export interface Category {
  name: string;
  value: CategoryValue;
  icon: string;
  description: string;
  subcategories: (string | SingleSubcategory)[];
  provider_count: number;
}

export type CategoryValue =
  | "handyman"
  | "plumbing"
  | "electrical"
  | "carpentry"
  | "painting"
  | "cleaning"
  | "landscaping"
  | "roofing"
  | "hvac"
  | "moving"
  | "other";

// single category get response 

export interface SingleCategoryApiResponse {
  success: boolean;
  category: SingleCategory;
}

export interface SingleCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  is_active: boolean;
  
  display_order: number;
  provider_count: number;
  subcategories: SingleSubcategory[];
}

export interface SingleSubcategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  display_order: number;
  provider_count: number;
}

export interface SubcategoriesResponse {
  success: boolean;
  category: string;
  count: number;
  subcategories: SingleSubcategory[];
}
