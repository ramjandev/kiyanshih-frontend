import {
  useGetAllNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} from "@/redux/featuresAPI/providerAPI/notification/notificationAPI";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";

// ── Types ────────────────────────────────────────────────────────
type EventType =
  | "booking_created"
  | "proposal_accepted"
  | "proposal_submitted"
  | "proposal_rejected";

interface Notification {
  id: number;
  event_type: EventType;
  event_display: string;
  title: string;
  message: string;
  priority: "high" | "normal";
  is_read: boolean;
  read_at: string | null;
  action_url: string;
  created_at: string;
}

// ── Helpers ──────────────────────────────────────────────────────
type TabKey = "all" | "unread" | "booking" | "proposal";

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const getEventMeta = (eventType: EventType) => {
  switch (eventType) {
    case "booking_created":
      return { emoji: "📅", bg: "bg-blue-50", text: "text-blue-600" };
    case "proposal_accepted":
      return { emoji: "✅", bg: "bg-green-50", text: "text-green-600" };
    case "proposal_submitted":
      return { emoji: "📨", bg: "bg-yellow-50", text: "text-yellow-600" };
    case "proposal_rejected":
      return { emoji: "❌", bg: "bg-red-50", text: "text-red-600" };
    default:
      return { emoji: "🔔", bg: "bg-gray-50", text: "text-gray-600" };
  }
};

const priorityDot: Record<string, string> = {
  high: "bg-red-500",
  normal: "bg-blue-400",
};

// ── Component ────────────────────────────────────────────────────
const NotificationProvider = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useGetAllNotificationsQuery({});

  const [markAsRead] = useMarkNotificationsAsReadMutation();

  const notifications: Notification[] = data?.results ?? [];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (tab === "unread" && n.is_read) return false;
      if (tab === "booking" && !n.event_type.includes("booking")) return false;
      if (tab === "proposal" && !n.event_type.includes("proposal"))
        return false;

      const q = search.toLowerCase();
      if (
        q &&
        !n.title.toLowerCase().includes(q) &&
        !n.message.toLowerCase().includes(q)
      )
        return false;

      return true;
    });
  }, [notifications, tab, search]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const selected = notifications.find((n) => n.id === selectedId) ?? null;

  const handleMarkRead = async (n: Notification) => {
    if (n.is_read) return;
    await markAsRead({ notification_ids: [n.id] });
  };

  const handleMarkAllRead = async () => {
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    await markAsRead({ notification_ids: unreadIds });
  };

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    setSearch("");
    setSelectedId(null);
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-full hover:bg-blue-100 transition cursor-pointer"
      >
        <FaRegBell className="text-blue-700 w-[28px] h-[30px]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute right-0 top-12 w-[400px] max-h-[580px] bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#EFF6FF]">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Notifications
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} unread · ${notifications.length} total`
                  : `${notifications.length} total`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => refetch()}
                className="text-xs text-gray-400 hover:text-gray-700 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer"
                title="Refresh"
              >
                ↻
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-700 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-3 text-xs gap-1 border-b border-gray-100 bg-white">
            {(["all", "unread", "booking", "proposal"] as TabKey[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`px-3 py-2.5 capitalize border-b-2 -mb-px whitespace-nowrap transition-colors cursor-pointer ${
                  tab === t
                    ? "border-blue-600 text-blue-600 font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-gray-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications…"
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 transition"
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-3/5" />
                      <div className="h-3 bg-gray-100 rounded w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-sm text-gray-400">
                <div className="text-3xl mb-2">🔕</div>
                <p>No notifications found</p>
              </div>
            ) : (
              filtered.map((n) => {
                const meta = getEventMeta(n.event_type);
                const isSelected = selectedId === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedId(isSelected ? null : n.id)}
                    className={`flex gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors group
                      ${!n.is_read ? "bg-blue-50/50" : "bg-white"}
                      ${isSelected ? "bg-blue-100/70 border-l-2 border-l-blue-600" : "hover:bg-gray-50"}`}
                  >
                    {/* Priority dot */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2 ${
                        priorityDot[n.priority] ?? "bg-gray-300"
                      }`}
                    />
                    {/* Icon */}
                    <div
                      className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-base ${meta.bg} ${meta.text}`}
                    >
                      {meta.emoji}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0F172A] truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400">
                          {timeAgo(n.created_at)}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            n.priority === "high"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {n.priority}
                        </span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {!n.is_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(n);
                          }}
                          title="Mark as read"
                          className="w-6 h-6 rounded border border-gray-200 bg-white text-[10px] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition flex items-center justify-center cursor-pointer"
                        >
                          ✓
                        </button>
                      )}
                    </div>
                    {/* Unread dot */}
                    {!n.is_read && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Detail drawer */}
          {selected && (
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 shrink-0">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-semibold text-[#0F172A] pr-2">
                  {selected.title}
                </p>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-gray-400 hover:text-gray-700 text-xs shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                {selected.message}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  ["Event", selected.event_display || selected.event_type],
                  ["Priority", selected.priority],
                  ["Status", selected.is_read ? "Read" : "Unread"],
                  ["Time", timeAgo(selected.created_at)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400">{label}</p>
                    <p className="text-xs font-medium text-gray-800 capitalize">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {!selected.is_read && (
                  <button
                    onClick={() => handleMarkRead(selected)}
                    className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    ✓ Mark as read
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationProvider;
