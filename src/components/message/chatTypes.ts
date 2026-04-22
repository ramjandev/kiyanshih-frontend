// chatTypes.ts
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
  lastSeen: string;
  unread?: number;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

export const currentUserId = "current";
