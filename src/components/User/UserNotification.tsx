import {
  useUserNotificationGetQuery,
  useUserUnreadNotificationGetQuery,
  useUserNotificationStatsGetQuery,
  useUserNotificationCreateMutation,
} from "@/redux/featuresAPI/userAPI/userNotification.api";
import type { Notification } from "@/redux/types/userTypes/userNotification.type";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Search, 
  RefreshCw, 
  X, 
  Calendar, 
  FileText, 
  Inbox, 
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────
type TabKey = "all" | "unread" | "booking" | "proposal";

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const getEventIconMeta = (eventType: string) => {
  switch (eventType) {
    case "booking_created":
      return { 
        icon: Calendar, 
        gradient: "from-blue-500 to-indigo-500", 
        bg: "bg-blue-50", 
        text: "text-blue-600" 
      };
    case "proposal_accepted":
      return { 
        icon: Check, 
        gradient: "from-emerald-500 to-teal-500", 
        bg: "bg-emerald-50", 
        text: "text-emerald-600" 
      };
    case "proposal_submitted":
      return { 
        icon: FileText, 
        gradient: "from-amber-500 to-orange-500", 
        bg: "bg-amber-50", 
        text: "text-amber-600" 
      };
    case "proposal_rejected":
      return { 
        icon: X, 
        gradient: "from-rose-500 to-red-600", 
        bg: "bg-rose-50", 
        text: "text-rose-600" 
      };
    default:
      return { 
        icon: Bell, 
        gradient: "from-purple-500 to-pink-500", 
        bg: "bg-purple-50", 
        text: "text-purple-600" 
      };
  }
};

const resolveActionUrl = (actionUrl: string | undefined, eventType: string): string | null => {
  if (!actionUrl) return null;

  if (actionUrl.startsWith("http://") || actionUrl.startsWith("https://")) {
    return actionUrl;
  }

  const url = actionUrl.toLowerCase();
  
  if (url.includes("booking")) {
    return "/user-dashboard/bookings";
  }
  if (url.includes("proposal") || url.includes("job")) {
    return "/user-dashboard/my-jobs";
  }
  if (url.includes("message")) {
    return "/user-dashboard/message";
  }
  if (url.includes("profile")) {
    return "/user-dashboard/profile";
  }
  if (url.includes("setting")) {
    return "/user-dashboard/settings";
  }

  switch (eventType) {
    case "booking_created":
      return "/user-dashboard/bookings";
    case "proposal_accepted":
    case "proposal_submitted":
    case "proposal_rejected":
      return "/user-dashboard/my-jobs";
    default:
      if (actionUrl.startsWith("/user-dashboard")) {
        return actionUrl;
      }
      return "/user-dashboard/overview";
  }
};

// ── Component ────────────────────────────────────────────────────
const UserNotification = () => {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data: allData, isLoading: isAllLoading } = useUserNotificationGetQuery();
  const { data: unreadData, isLoading: isUnreadLoading } = useUserUnreadNotificationGetQuery();
  const { data: statsData } = useUserNotificationStatsGetQuery();
  
  const [markAsRead] = useUserNotificationCreateMutation();

  const allNotifications: Notification[] = allData?.results ?? [];
  const unreadNotifications: Notification[] = (unreadData?.results as Notification[]) ?? [];

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

  // Tab-based and search-based filtering
  const filtered = useMemo(() => {
    const sourceNotifications = tab === "unread" ? unreadNotifications : allNotifications;

    return sourceNotifications.filter((n) => {
      if (tab === "booking" && !n.event_type.includes("booking")) return false;
      if (tab === "proposal" && !n.event_type.includes("proposal")) return false;

      const q = search.toLowerCase();
      if (
        q &&
        !n.title.toLowerCase().includes(q) &&
        !n.message.toLowerCase().includes(q)
      )
        return false;

      return true;
    });
  }, [allNotifications, unreadNotifications, tab, search]);

  const unreadCount = statsData?.unread_count ?? allNotifications.filter((n) => !n.is_read).length;
  const totalCount = statsData?.total_notifications ?? allData?.total ?? allNotifications.length;

  const notificationsToSearch = tab === "unread" ? unreadNotifications : allNotifications;
  const selected = notificationsToSearch.find((n) => n.id === selectedId) ?? null;

  const handleMarkRead = async (n: Notification) => {
    const targetUrl = resolveActionUrl(n.action_url, n.event_type);

    if (n.is_read) {
      if (targetUrl) {
        if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
          window.open(targetUrl, "_blank");
        } else {
          navigate(targetUrl);
        }
      }
      setOpen(false);
      return;
    }
    
    setLoadingId(n.id);
    try {
      await markAsRead({ notification_ids: [n.id] }).unwrap();
      if (targetUrl) {
        if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
          window.open(targetUrl, "_blank");
        } else {
          navigate(targetUrl);
        }
      }
      setOpen(false);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleMarkAllRead = async () => {
    const unreadIds = unreadNotifications.map((n) => n.id);
    if (unreadIds.length === 0) return;
    await markAsRead({ notification_ids: unreadIds });
  };

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    setSearch("");
    setSelectedId(null);
  };

  const isLoading = isAllLoading || (tab === "unread" && isUnreadLoading);

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2.5 rounded-2xl bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer group"
      >
        <Bell className={`w-[22px] h-[22px] text-blue-600 group-hover:text-blue-700 transition-colors ${unreadCount > 0 ? 'animate-[swing_1.5s_ease-in-out_infinite]' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-gradient-to-tr from-rose-500 to-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md shadow-red-500/20 border-2 border-white animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel with ultra smooth scale & opacity entry and exit */}
      <div 
        className={`absolute right-0 top-14 w-[420px] max-h-[600px] bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col z-50 overflow-hidden transition-all duration-350 origin-top-right
          ${open 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-50/50">
          <div>
            <p className="text-sm font-extrabold text-slate-800 tracking-tight">
              Notifications
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} unread · ${totalCount} total`
                : `${totalCount} total`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1 bg-blue-50/80 px-2.5 py-1.5 rounded-xl transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100/80 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all duration-300 hover:rotate-90 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab bar - Sliding pill capsules */}
        <div className="flex px-4 py-2 text-xs gap-1.5 bg-slate-50/30">
          {(["all", "unread", "booking", "proposal"] as TabKey[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`px-3.5 py-1.5 rounded-full capitalize font-semibold transition-all cursor-pointer whitespace-nowrap text-xs
                ${tab === t
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="px-4 py-3 bg-white relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-7 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notifications by title or message…"
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-3 bg-slate-50/20 max-h-[360px]">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3.5 p-3.5 rounded-2xl bg-white animate-pulse shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0 animate-pulse" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-3.5 bg-slate-100 rounded w-2/5" />
                    <div className="h-3 bg-slate-100 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 px-6 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-sm font-bold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto leading-normal">
                You don't have any notifications in this tab right now.
              </p>
            </div>
          ) : (
            filtered.map((n) => {
              const meta = getEventIconMeta(n.event_type);
              const IconComponent = meta.icon;
              const isSelected = selectedId === n.id;
              
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedId(isSelected ? null : n.id)}
                  className={`relative mx-4 mb-2.5 p-3.5 rounded-2xl transition-all duration-300 group cursor-pointer
                    ${!n.is_read 
                      ? "bg-gradient-to-r from-blue-50/40 via-blue-50/10 to-white shadow-[0_2px_12px_rgba(59,130,246,0.05)]" 
                      : "bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]"
                    }
                    ${isSelected ? "ring-2 ring-blue-500/15" : ""}
                  `}
                >
                  <div className="flex gap-3.5">
                    {/* Left icon with glowing gradient */}
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${meta.gradient} shadow-md shadow-blue-500/10`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      {/* Pulse dot for unread */}
                      {!n.is_read && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className={`text-xs font-bold truncate leading-tight ${!n.is_read ? "text-slate-900" : "text-slate-700"}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium whitespace-nowrap mt-0.5">
                          {timeAgo(n.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mt-1">
                        {n.message}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                          ${n.priority === "high" 
                            ? "bg-rose-50 text-rose-600" 
                            : n.priority === "normal"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-600"
                          }
                        `}>
                          {n.priority}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons (hover) */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
                      {!n.is_read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(n);
                          }}
                          disabled={loadingId === n.id}
                          title="Mark as read & view"
                          className="w-7 h-7 rounded-xl bg-slate-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all shadow-sm hover:shadow-blue-500/20 flex items-center justify-center cursor-pointer active:scale-95"
                        >
                          {loadingId === n.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Overlay Card */}
        {selected && (
          <div className="absolute inset-x-0 bottom-0 bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.1)] p-5 z-20 rounded-t-3xl transform transition-transform duration-300">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
            
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr ${getEventIconMeta(selected.event_type).gradient}`}>
                  {(() => {
                    const Icon = getEventIconMeta(selected.event_type).icon;
                    return <Icon className="w-4 h-4" />;
                  })()}
                </div>
                <p className="text-xs font-extrabold text-slate-800">
                  {selected.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all duration-300 hover:rotate-90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 mb-4">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {selected.message}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/50 rounded-2xl p-3 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Event</p>
                <p className="font-bold text-slate-700 mt-0.5 capitalize">
                  {selected.event_display || selected.event_type.replace(/_/g, ' ')}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Priority</p>
                <p className="font-bold text-slate-700 mt-0.5 capitalize">
                  {selected.priority}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Status</p>
                <p className={`font-bold mt-0.5 capitalize ${selected.is_read ? "text-emerald-600" : "text-amber-500"}`}>
                  {selected.is_read ? "Read" : "Unread"}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Time</p>
                <p className="font-bold text-slate-700 mt-0.5">
                  {timeAgo(selected.created_at)}
                </p>
              </div>
            </div>

            {!selected.is_read && (
              <button
                onClick={() => handleMarkRead(selected)}
                disabled={loadingId === selected.id}
                className="w-full text-xs py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loadingId === selected.id ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4.5 h-4.5" />
                )}
                Mark as Read & Open Link
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Dynamic Keyframe Swing Animation */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

export default UserNotification;
