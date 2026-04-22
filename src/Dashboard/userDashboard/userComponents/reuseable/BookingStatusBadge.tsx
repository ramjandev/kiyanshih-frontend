import React from "react";

interface BookingStatusBadgeProps {
  status: string;
  onClick?: () => void;
}

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, onClick }) => {
  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case "pending":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          hoverColor: "hover:bg-yellow-100",
          label: "Pending",
        };
      case "accepted":
      case "confirmed":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-500",
          borderColor: "border-green-200",
          hoverColor: "hover:bg-green-100",
          label: s.charAt(0).toUpperCase() + s.slice(1),
        };
      case "rejected":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-500",
          borderColor: "border-red-200",
          hoverColor: "hover:bg-red-100",
          label: "Rejected",
        };
      case "in-progress":
      case "in_progress":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-600",
          borderColor: "border-yellow-200",
          hoverColor: "hover:bg-yellow-100",
          label: "In Progress",
        };
      case "completed":
      case "accepted_complete_request":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-500",
          borderColor: "border-green-200",
          hoverColor: "hover:bg-green-100",
          label: s === "completed" ? "Completed" : "Accepted Complete Request",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
          hoverColor: "hover:bg-gray-100",
          label: status,
        };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <button
      onClick={onClick}
      className={`px-1 md:px-3 py-1 cursor-pointer rounded-full text-xs md:text-sm border ${styles.borderColor} ${styles.bgColor} ${styles.textColor} ${styles.hoverColor}`}
    >
      {styles.label}
    </button>
  );
};

export default BookingStatusBadge;