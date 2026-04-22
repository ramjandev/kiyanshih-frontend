import React from "react";

interface NotificationIconProps {
  icon: React.ReactNode; // icon element (e.g., <FaRegBell />)
  count?: number; // notification count
  color?: string; // badge background color
  size?: string; // icon size classes
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  icon,
  count = 0,
  color = "bg-blue-500",
  size = "text-2xl",
}) => {
  return (
    <div className="relative inline-flex items-center">
      <span className={size}>{icon}</span>
      {count > 0 && (
        <div
          className={`absolute -top-2 -right-2 ${color} w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium`}
        >
          {count > 99 ? "99+" : count}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
