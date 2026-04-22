// services/chatSocket.ts
import { getWebSocketBaseUrl } from "@/utils/wsUrl";

let socket: WebSocket | null = null;

export const connectChatSocket = (threadId: number, token: string) => {
  const wsBase = getWebSocketBaseUrl();
  socket = new WebSocket(`${wsBase}/ws/chat/${threadId}/?token=${token}`);

  socket.onopen = () => console.log("WebSocket connected");
  socket.onclose = () => console.log("WebSocket disconnected");
  socket.onerror = (err) => console.error("WebSocket error", err);
};

export const sendChatMessage = (content: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ content }));
  }
};

export const disconnectChatSocket = () => {
  socket?.close();
  socket = null;
};

