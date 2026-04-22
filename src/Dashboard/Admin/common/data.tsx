export const languages = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "Simplified Chinese" },
];

export const languageItems = languages.map((lang) => ({
  label: `${lang.label} (${lang.code})`,
  onClick: () => {},
}));

export const timeAgo = (iso: string) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const iconMap: Record<
  string,
  { bg: string; text: string; emoji: string }
> = {
  booking: { bg: "bg-emerald-50", text: "text-emerald-700", emoji: "📋" },
  job: { bg: "bg-violet-50", text: "text-violet-700", emoji: "💼" },
  proposal: { bg: "bg-violet-50", text: "text-violet-700", emoji: "💼" },
  user: { bg: "bg-amber-50", text: "text-amber-700", emoji: "👤" },
  payment: { bg: "bg-red-50", text: "text-red-700", emoji: "💳" },
};

export const getIcon = (type: string) =>
  Object.entries(iconMap).find(([k]) => type.includes(k))?.[1] ?? {
    bg: "bg-gray-100",
    text: "text-gray-500",
    emoji: "🔔",
  };

export const priorityDot: Record<string, string> = {
  urgent: "bg-red-500",
  high: "bg-amber-500",
  low: "bg-teal-400",
  normal: "bg-gray-400",
};
