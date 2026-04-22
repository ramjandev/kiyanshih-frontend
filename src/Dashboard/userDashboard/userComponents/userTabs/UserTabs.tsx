import CommonWrapper from "@/common/space/CommonWrapper";
import Tabs from "../reuseable/Tabs";
import { BriefcaseBusiness, LayoutDashboard, MessageSquare, Settings, TicketCheck } from "lucide-react";
// import jobs from "@/assets/icon/tabIcons/briefcase-business.svg";
// import messages from "@/assets/icon/tabIcons/message-square.svg";
// import bookings from "@/assets/icon/tabIcons/coins.svg";
// import payments from "@/assets/icon/tabIcons/message-square.svg";
// import settings from "@/assets/icon/tabIcons/settings.svg";

const UserTabs = () => {
  const tabOptions = [
    {
      title: "Overview",
      value: "overview",
      href: "/user-dashboard/overview",
      icon: <LayoutDashboard />,
    },
    {
      title: "My Jobs",
      value: "jobs",
      href: "/user-dashboard/my-jobs",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Messages",
      value: "messages",
      href: "/user-dashboard/message",
      icon: <MessageSquare />,
    },
    {
      title: "Bookings",
      value: "bookings",
      href: "/user-dashboard/bookings",
      icon: <TicketCheck />,
    },
    {
      title: "Payment History",
      value: "payments",
      href: "/user-dashboard/payment-history",
      icon: <MessageSquare />,
    },
    {
      title: "Settings",
      value: "settings",
      href: "/user-dashboard/settings",
      icon: <Settings />,
    },
  ];

  return (
    <CommonWrapper>
      <div className="py-6 md:py-10">
        <Tabs tabs={tabOptions} basePath="/user-dashboard" />
      </div>
    </CommonWrapper>
  );
};

export default UserTabs;
