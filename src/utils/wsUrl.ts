// utils/wsUrl.ts
export const getWebSocketBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return apiUrl
    .replace("https://", "wss://")
    .replace("http://", "ws://")
    .replace("/api", "");
};
