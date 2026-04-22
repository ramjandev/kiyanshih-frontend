export type UsersResponse = {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
  };
};

export type User = {
  sl: number;
  id: number;
  user_name: string;
  profile_picture: string | null;
  contact_information: ContactInformation;
  total_bookings: number;
  status: "Active" | "Inactive";
  action: UserAction;
};

export type ContactInformation = {
  phone: string;
  email: string;
};

export type UserAction = {
  view_url: string;
};

export type Pagination = {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
};
