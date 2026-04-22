// Category action URLs
export interface CategoryAction {
  edit_url: string;
  delete_url: string;
}

// Single category item
export interface Category {
  sl: number;
  category_name: string;
  subcategory_name: string[];
  image: string;
}

// Pagination info
export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

// Data wrapper
export interface CategoriesData {
  categories: Category[];
  pagination: Pagination;
}

// Full API response
export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: CategoriesData;
}

export type SubCategoryResponse = {
  success: boolean;
  message: string;
  data: {
    category_name: string;
    subcategory_name: string[];
    image: string;
  };
};
