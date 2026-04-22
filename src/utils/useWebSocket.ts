// import { useEffect, useRef, useCallback, useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/redux/store";

// interface WebSocketMessage {
//   type: string;
//   message?: any;
//   thread_id?: number;
//   sender_id?: number;
//   content?: string;
//   timestamp?: string;
// }

// interface UseWebSocketProps {
//   onMessageReceived?: (message: WebSocketMessage) => void;
//   enabled?: boolean; // Add option to enable/disable WebSocket
// }

// export const useWebSocket = ({ 
//   onMessageReceived, 
//   enabled = false // DISABLED by default - change to true when backend supports WebSocket
// }: UseWebSocketProps = {}) => {
//   const ws = useRef<WebSocket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const token = useSelector((state: RootState) => state.auth.accessToken);
//   const hasAttemptedConnection = useRef(false);

//   const connect = useCallback(() => {
//     // Don't connect if WebSocket is disabled
//     if (!enabled) {
//       console.log("WebSocket is disabled. Using REST API only.");
//       return;
//     }

//     // Don't try to connect if no token
//     if (!token) {
//       console.log("No token available for WebSocket");
//       return;
//     }

//     // Only attempt connection once to avoid spam
//     if (hasAttemptedConnection.current) {
//       console.log("WebSocket connection already attempted");
//       return;
//     }

//     // Don't reconnect if already connected
//     if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//       console.log("WebSocket already connected");
//       return;
//     }

//     hasAttemptedConnection.current = true;

//     try {
//       // Close existing connection
//       if (ws.current) {
//         ws.current.close();
//       }

//       // Build WebSocket URL
//       const apiUrl = import.meta.env.VITE_API_URL || "";
//       const baseUrl = apiUrl.replace("https://", "").replace("http://", "").replace("/api", "");
//       const wsUrl = `wss://${baseUrl}/ws/chat/?token=${token}`;
      
//       console.log("Attempting WebSocket connection...");
      
//       ws.current = new WebSocket(wsUrl);

//       // Set a timeout to close connection if it doesn't open in 5 seconds
//       const connectionTimeout = setTimeout(() => {
//         if (ws.current && ws.current.readyState !== WebSocket.OPEN) {
//           console.log("WebSocket connection timeout - using REST API only");
//           ws.current.close();
//         }
//       }, 5000);

//       ws.current.onopen = () => {
//         clearTimeout(connectionTimeout);
//         console.log("WebSocket connected successfully!");
//         setIsConnected(true);
//       };

//       ws.current.onmessage = (event) => {
//         try {
//           const data: WebSocketMessage = JSON.parse(event.data);
//           console.log("Message received:", data);
          
//           if (onMessageReceived) {
//             onMessageReceived(data);
//           }
//         } catch (error) {
//           console.error(" Error parsing message:", error);
//         }
//       };

//       ws.current.onerror = () => {
//         clearTimeout(connectionTimeout);
//         console.log(" WebSocket not available - using REST API only");
//         setIsConnected(false);
//       };

//       ws.current.onclose = () => {
//         clearTimeout(connectionTimeout);
//         console.log(" WebSocket closed - using REST API only");
//         setIsConnected(false);
//         // Don't try to reconnect - just use REST API
//       };
//     } catch (error) {
//       console.log(" WebSocket not available - using REST API only");
//       setIsConnected(false);
//     }
//   }, [token, onMessageReceived, enabled]);

//   const disconnect = useCallback(() => {
//     if (ws.current) {
//       ws.current.close(1000, "User disconnected");
//       ws.current = null;
//     }
//     setIsConnected(false);
//     hasAttemptedConnection.current = false;
//   }, []);

//   const sendMessage = useCallback((message: any) => {
//     if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//       try {
//         ws.current.send(JSON.stringify(message));
//         console.log("Message sent via WebSocket:", message);
//         return true;
//       } catch (error) {
//         console.log("ℹWebSocket send failed - using REST API");
//         return false;
//       }
//     }
//     return false;
//   }, []);

//   // Connect on mount only if enabled
//   useEffect(() => {
//     if (enabled && token) {
//       connect();
//     }

//     return () => {
//       disconnect();
//     };
//   }, [enabled, token]); // Only reconnect if enabled changes or token changes

//   return {
//     isConnected,
//     sendMessage,
//     disconnect,
//     reconnect: connect,
//     enabled, // Return enabled state so components know if WebSocket is active
//   };
// };