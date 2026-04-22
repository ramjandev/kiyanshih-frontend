// ===== Common =====
export type Participant = {
  id: number;
  email: string;
  name: string;
  profile_image: string;
  is_active: boolean;
};

export type Thread = {
  id: number;
  participants: Participant[];
};

// ===== Text Message =====
export type TextMessage = {
  id: number;
  message_id: number;
  thread_id: number;
  sender_id: number;
  receiver_id: number;
  message_type: "text";
  content: string;
  timestamp: string; // ISO string
  is_read: boolean;
};

// ===== Proposal Actions =====
export type ProposalActions = {
  accept_url: string;
  reject_url: string;
  payment_url: string;
  verify_payment_url: string;
  provider_confirm_url: string;
  client_confirm_url: string;
  admin_release_url: string;
};

// ===== Provider Info =====
export type ProviderInfo = {
  id: number;
  name: string;
  email: string;
  profile_image: string;
};

// ===== Custom Proposal Message =====
export type CustomProposalMessage = {
  id: number;
  proposal_id: number;
  thread_id: number;
  sender_id: number;
  receiver_id: number;
  message_type: "custom_proposal";

  proposal_title: string;
  cover_letter: string;
  proposed_budget: string;
  estimated_duration: string;
  custom_terms: string;
  approach: string;
  why_choose_me: string;
  questions_for_client: string | null;

  status: "pending" | "accepted" | "rejected";
  timestamp: string;
  is_read: boolean;

  actions: ProposalActions;
  can_accept: boolean;
  can_reject: boolean;

  provider_info: ProviderInfo;
};

// ===== Union Message Type =====
export type Message = TextMessage | CustomProposalMessage;

// ===== API Response =====
export type MessageListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  thread: Thread;
  results: Message[];
};
