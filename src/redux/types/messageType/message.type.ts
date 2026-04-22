// send message api request types
export interface TMessage {
  receiver_id: string;
  content: string;
}

// all threads get api response types

export interface ChatUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ChatLastMessage {
  id: number;
  content: string;
  timestamp: string; // ISO date string
  is_read: boolean;
  sender_id: number;
}

export interface Conversation {
  id: number;
  other_user: ChatUser;
  last_message: ChatLastMessage | null;
  unread_count: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface PaginatedConversationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Conversation[];
}

export interface TMessageResponse {
  id: number;
  content: string;
  timestamp: string; // ISO date string
  is_read: boolean;
  sender_id: number;
  thread_id: number;
}

export interface PaginatedMessagesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TMessageResponse[];
}
