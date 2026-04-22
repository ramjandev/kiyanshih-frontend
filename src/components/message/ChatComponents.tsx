import CommonButton from "@/common/button/CommonButton";
import Spinner from "@/common/custom/Spinner";
import {
  useGetAllUserForChatQuery,
  useGetSingleUserForChatQuery,
  useSendMessageToUserMutation,
} from "@/redux/featuresAPI/providerAPI/message/messageApi";
import type { Message } from "@/redux/featuresAPI/providerAPI/message/types/singleUser";
import type { RootState } from "@/redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { Paperclip, Send, User } from "lucide-react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatSidebar from "./ChatSidebar";
import { formatMessageTime } from "./date";
import ProposalCard from "./ProposalCard";
import ProposalModal from "./ProposalModal";

// ─── Firebase (Firestore) ─────────────────────────────────────────────────────
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  query as fsQuery,
  getFirestore,
  onSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";

const PROJECT_ID =
  (import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined) ||
  "kiyanshi-5fd80";

const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string | undefined) || "",
  authDomain:
    (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined) ||
    `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket:
    (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined) ||
    `${PROJECT_ID}.appspot.com`,
  messagingSenderId:
    (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined) ||
    "",
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string | undefined) || "",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// ─── Firestore collection — matches backend save_message_to_firestore() ───────
const FIRESTORE_COLLECTION = "chat_messages";

// ─── Helper: convert any Firestore timestamp shape to ISO string ──────────────
const toISO = (ts: unknown): string => {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  if (typeof ts === "string") return ts;
  if (typeof ts === "number") return new Date(ts).toISOString();
  if (typeof ts === "object" && ts !== null && "seconds" in ts)
    return new Date((ts as { seconds: number }).seconds * 1000).toISOString();
  return new Date().toISOString();
};

// ─── Component ────────────────────────────────────────────────────────────────
const ChatComponents = () => {
  const { data: allUsers, isLoading } = useGetAllUserForChatQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectId, setSelectId] = useState<number | null>(null);

  const { data: singleUser } = useGetSingleUserForChatQuery(
    selectId ?? skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const [sendMessage] = useSendMessageToUserMutation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // seenIds tracks both DB numeric ids and Firestore doc string ids
  const seenIdsRef = useRef<Set<string>>(new Set());

  // ── Auto-scroll on new messages ──────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Reset state when switching threads ───────────────────────────────────
  useEffect(() => {
    if (!selectId) return;
    seenIdsRef.current = new Set();
    setMessages([]);
  }, [selectId]);

  // ── Seed REST history once loaded ────────────────────────────────────────
  useEffect(() => {
    if (!singleUser?.results?.length) return;
    const sorted = [...singleUser.results].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
    sorted.forEach((m) => seenIdsRef.current.add(String(m.id)));
    setMessages(sorted);
  }, [singleUser?.results]);

  // ── Build a normalized Message from a raw Firestore document ─────────────
  // Spreads ALL raw fields first so proposal_title, proposed_budget, status,
  // actions etc. land directly on the object — ProposalCard needs them.
  const buildMsgFromRaw = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (raw: Record<string, any>, docId: string): Message => {
      return {
        // spread every raw field first (captures proposal_title, proposed_budget,
        // status, actions, can_accept, can_reject, etc.)
        ...raw,
        // then override / normalise the fields we care about
        id: (raw.id as number) ?? docId,
        message_id: (raw.message_id as number) ?? docId,
        thread_id: (raw.thread_id as number) ?? selectId,
        sender_id: raw.sender_id as number,
        receiver_id: raw.receiver_id as number,
        message_type: (raw.message_type ?? "text") as
          | "text"
          | "custom_proposal",
        content: raw.content as string,
        timestamp: toISO(raw.timestamp),
        is_read: (raw.is_read as boolean) ?? false,
      } as Message;
    },
    [selectId],
  );

  // ── Firestore real-time listener ──────────────────────────────────────────
  useEffect(() => {
    if (!selectId) return;

    const q = fsQuery(
      collection(firestore, FIRESTORE_COLLECTION),
      where("thread_id", "==", selectId),
    );

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: false },
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "removed") return;

          const raw = change.doc.data();
          const msg = buildMsgFromRaw(raw, change.doc.id);
          const dbKey = String(raw.id ?? change.doc.id);
          const fsKey = change.doc.id;

          if (change.type === "added") {
            if (seenIdsRef.current.has(dbKey)) {
              // Already seeded from REST — update it so proposal fields merge in
              seenIdsRef.current.add(fsKey);
              setMessages((prev) =>
                prev.map((m) => (String(m.id) === dbKey ? msg : m)),
              );
            } else {
              // Brand-new message (arrived via Firestore before REST refetch)
              seenIdsRef.current.add(dbKey);
              seenIdsRef.current.add(fsKey);
              setMessages((prev) => [...prev, msg]);
            }
          } else if (change.type === "modified") {
            setMessages((prev) =>
              prev.map((m) => (String(m.id) === dbKey ? msg : m)),
            );
          }
        });
      },
      (error) => {
        console.error("[Firestore] listener error:", error.code, error.message);
      },
    );

    return () => unsubscribe();
  }, [selectId, buildMsgFromRaw]);

  // ── Sort for render ───────────────────────────────────────────────────────
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleUserSelect = (userId: number) => {
    setSelectId(userId);
    setShowSidebar(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessageInput(e.target.value);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void handleSendMessage();
  };

  const receiver_id = singleUser?.thread.participants.find(
    (p) => p.id !== user?.id,
  )?.id;

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectId || !receiver_id || !user) return;

    const trimmed = messageInput.trim();
    setMessageInput("");

    try {
      await sendMessage({ receiver_id, content: trimmed });
    } catch (err) {
      console.error("Send message failed:", err);
      setMessageInput(trimmed);
    }
  };

  const isProvider = user?.role === "provider";

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-1 gap-x-4">
          {allUsers && (
            <ChatSidebar
              handleUserSelect={handleUserSelect}
              showSidebar={showSidebar}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              allUsers={allUsers}
              selectId={selectId}
            />
          )}

          <div
            className={`${
              !showSidebar || selectId ? "flex" : "hidden"
            } md:flex flex-1 flex-col border border-gray-200 rounded-lg bg-white`}
          >
            {selectId ? (
              <>
                {/* Header */}
                <div className="w-full bg-white border-b border-gray-200">
                  <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            singleUser?.thread.participants[0].profile_image ||
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                          }
                          alt="Profile"
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-4 h-4 ${
                            singleUser?.thread.participants[0].is_active
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } rounded-full border-2 border-white`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-gray-900">
                          {singleUser?.thread.participants[0].name}
                        </h1>
                        {singleUser?.thread.participants[0].is_active && (
                          <span className="text-sm font-medium text-green-600">
                            Active Now
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  {sortedMessages.map((message) => {
                    const isSent = message.sender_id === user?.id;
                    const senderAvatar = isSent
                      ? singleUser?.thread.participants[0].profile_image
                      : singleUser?.thread.participants[1]?.profile_image;
                    const senderName = isSent
                      ? singleUser?.thread.participants[0].name
                      : singleUser?.thread.participants[1]?.name;

                    return (
                      <div
                        key={String(message.id)}
                        className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-end gap-2 max-w-[75%] ${
                            isSent ? "flex-row-reverse" : ""
                          }`}
                        >
                          <img
                            src={
                              senderAvatar ||
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                            }
                            alt={senderName}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                          <div className="flex flex-col">
                            {message.message_type === "text" && (
                              <div
                                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                  isSent
                                    ? "bg-blue-600 text-white rounded-br-sm"
                                    : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                                }`}
                              >
                                {message.content}
                              </div>
                            )}
                            {message.message_type === "custom_proposal" && (
                              <ProposalCard
                                proposal={message}
                                isProvider={isProvider}
                              />
                            )}
                            <p
                              className={`text-xs text-gray-500 mt-1 ${
                                isSent ? "text-right" : "text-left"
                              }`}
                            >
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="bg-white border-t border-gray-200 p-4 rounded-b-[16px]">
                  <div className="flex items-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 mb-1">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                        value={messageInput}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button
                      onClick={() => void handleSendMessage()}
                      className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-1 cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                    </button>

                    {isProvider && (
                      <CommonButton
                        onClick={() => setOpenCustomModal(true)}
                        className="bg-black text-white"
                      >
                        Create Proposal
                      </CommonButton>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm mt-2">
                    Choose a contact to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {openCustomModal && singleUser && receiver_id && (
        <ProposalModal
          isOpen={openCustomModal}
          onClose={() => setOpenCustomModal(false)}
          clientId={receiver_id}
          chatThreadId={singleUser.thread.id}
        />
      )}
    </>
  );
};

export default ChatComponents;
