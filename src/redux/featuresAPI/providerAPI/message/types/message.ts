// Root response type
export interface ConversationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Conversation[];
}

// Conversation
export interface Conversation {
  id: number;
  other_user: User;
  last_message: Message;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

// User
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  is_online: boolean;
}

// Message
export interface Message {
  id: number;
  content: string;
  timestamp: string;
  is_read: boolean;
  sender_id: number;
}

export type CountResponse = {
  unread_count: number;
};

export interface SendMessagePayload {
  receiver_id: number;
  content: string;
}

export interface StripeCheckoutResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
  amount: string;
  platform_fee: string;
  provider_payout: string;
}
