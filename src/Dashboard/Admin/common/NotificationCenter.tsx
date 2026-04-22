import {
  useGetAllNotificationsQuery,
  useGetSingleNotificationsQuery,
  useMarkAsReadMutation,
} from "@/redux/featuresAPI/adminApi/notificationApi";
import type { NotificationItem } from "@/redux/featuresAPI/adminApi/types/notification";
import { useMemo, useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { getIcon, priorityDot, timeAgo } from "./data";

// ── Tab / filter state ──────────────────────────────────────────
type TabKey = "all" | "unread" | "booking" | "job" | "user";
type Priority = "all" | "low" | "normal" | "high" | "urgent";

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("all");
  const [priority, setPriority] = useState<Priority>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [recipientId, setRecipientId] = useState<number | null>(null);

  const {
    data: allNotifications,
    isLoading,
    refetch,
  } = useGetAllNotificationsQuery();

  const { data: singleRecipientNotification } = useGetSingleNotificationsQuery(
    { recipient_id: recipientId! },
    { skip: !recipientId },
  );

  const [markAsRead] = useMarkAsReadMutation();

  const source = recipientId
    ? (singleRecipientNotification?.results ?? [])
    : (allNotifications?.results ?? []);

  const filtered = useMemo(() => {
    return source.filter((n) => {
      // tab filter
      if (tab === "unread" && n.is_read) return false;
      if (tab === "booking" && !n.event_type.includes("booking")) return false;
      if (
        tab === "job" &&
        !n.event_type.includes("job") &&
        !n.event_type.includes("proposal")
      )
        return false;
      if (
        tab === "user" &&
        !n.event_type.includes("user") &&
        !n.event_type.includes("register")
      )
        return false;

      // priority filter — skip when tab is "all" or "unread"
      if (priority !== "all" && n.priority !== priority) return false;

      // search filter
      const q = search.toLowerCase();
      if (
        q &&
        !n.title.toLowerCase().includes(q) &&
        !n.message.toLowerCase().includes(q)
      )
        return false;

      return true;
    });
  }, [source, tab, priority, search]);

  const unreadCount = source.filter((n) => !n.is_read).length;
  const selected = source.find((n) => n.id === selectedId) ?? null;

  const handleMarkRead = async (notif: NotificationItem) => {
    if (notif.is_read) return;
    await markAsRead({
      recipient_ids: [notif.recipient],
      event_type: notif.event_type,
      title: notif.title,
      message: notif.message,
      priority: notif.priority,
      channels: notif.channels,
    });
  };

  const handleMarkAllRead = async () => {
    const unread = source.filter((n) => !n.is_read);
    await Promise.all(unread.map(handleMarkRead));
  };

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    setSearch(""); // clear search on tab switch
    setPriority("all"); // reset priority on tab switch
    setSelectedId(null); // close detail drawer
  };
  return (
    <div className="relative">
      {/* Bell trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <FaRegBell className="text-xl text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#4153B3] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute right-0 top-12 w-[420px] max-h-[600px] bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Notifications</p>
              <p className="text-xs text-gray-400">
                {unreadCount} unread · {source.length} total
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-[#4153B3] hover:underline cursor-pointer"
              >
                Mark all read
              </button>
              <button
                onClick={() => refetch()}
                className="text-xs text-gray-400 hover:text-gray-700"
              >
                ↻
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-700 ml-1"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex px-3 text-xs gap-2 border-b border-gray-100">
            {(["all", "unread", "booking", "job", "user"] as TabKey[]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => handleTabChange(t)}
                  className={`px-3 py-2 capitalize border-b-2 -mb-px whitespace-nowrap transition-colors cursor-pointer ${
                    tab === t
                      ? "border-[#4153B3] text-[#4153B3] font-medium"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ),
            )}
          </div>

          <div className="flex gap-2 px-3 py-2 border-b border-gray-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="flex-1 text-xs px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-[#4153B3]"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 outline-none"
            >
              {["all", "low", "normal", "high", "urgent"].map((p) => (
                <option key={p} value={p}>
                  {p === "all" ? "All priorities" : p}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient filter pill */}
          {recipientId && (
            <div className="px-3 py-1.5 bg-blue-50 flex items-center justify-between text-xs border-b border-blue-100">
              <span className="text-blue-700">
                Filtered by recipient #{recipientId}
              </span>
              <button
                onClick={() => setRecipientId(null)}
                className="text-blue-400 hover:text-blue-700"
              >
                clear ✕
              </button>
            </div>
          )}

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
            ) : !filtered.length ? (
              <div className="py-12 text-center text-sm text-gray-400">
                <div className="text-2xl mb-2">🔕</div>
                No notifications
              </div>
            ) : (
              filtered.map((n) => {
                const ic = getIcon(n.event_type);
                return (
                  <div
                    key={n.id}
                    onClick={() =>
                      setSelectedId(selectedId === n.id ? null : n.id)
                    }
                    className={`flex gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors group
                      ${!n.is_read ? "bg-blue-50/40" : ""}
                      ${selectedId === n.id ? "bg-blue-100/60 border-l-2 border-l-[#4153B3]" : "hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${priorityDot[n.priority] ?? "bg-gray-400"}`}
                    />
                    <div
                      className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-base ${ic.bg} ${ic.text}`}
                    >
                      {ic.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] text-gray-400">
                          {timeAgo(n.created_at)}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {n.recipient_name}
                        </span>
                        {n.channels.map((ch) => (
                          <span
                            key={ch}
                            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                              ch === "email"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : ch === "push"
                                  ? "bg-violet-50 text-violet-700 border-violet-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.is_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(n);
                          }}
                          className="w-6 h-6 rounded border border-gray-200 bg-white text-[10px] hover:bg-[#4153B3] hover:text-white hover:border-[#4153B3] transition flex items-center justify-center"
                          title="Mark read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecipientId(
                            recipientId === n.recipient ? null : n.recipient,
                          );
                        }}
                        className="w-6 h-6 rounded border border-gray-200 bg-white text-[10px] hover:bg-gray-100 transition flex items-center justify-center"
                        title="Filter by recipient"
                      >
                        👤
                      </button>
                    </div>
                    {!n.is_read && (
                      <div className="w-2 h-2 rounded-full bg-[#4153B3] shrink-0 mt-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Detail drawer */}
          {selected && (
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-medium text-gray-900">
                  {selected.title}
                </p>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-gray-400 hover:text-gray-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                {selected.message}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  ["Recipient", selected.recipient_name],
                  ["Email", selected.recipient_email],
                  ["Priority", selected.priority],
                  ["Status", selected.is_read ? "Read" : "Unread"],
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
                    className="text-xs px-3 py-1.5 bg-[#4153B3] text-white rounded-lg hover:bg-[#3344a0] transition cursor-pointer"
                  >
                    ✓ Mark as read
                  </button>
                )}
                {selected.action_url && (
                  <a
                    href={selected.action_url}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition"
                  >
                    View details →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
