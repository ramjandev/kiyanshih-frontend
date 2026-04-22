import {
  BriefcaseBusiness,
  Coins,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { MdOutlinePayment } from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import Tabs from "../reuseable/Tabs";

const ProviderTabs = () => {
  const tabOptions = [
    {
      title: "Overview",
      value: "overview",
      href: "/provider-dashboard/overview",
      icon: <LayoutDashboard />,
    },

    {
      title: "My Jobs Listing",
      value: "jobs",
      href: "/provider-dashboard/job-listing",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Available Job",
      value: "available-job",
      href: "/provider-dashboard/available-job",
      icon: <MessageSquare />,
    },
    {
      title: "Bookings",
      value: "bookings",
      href: "/provider-dashboard/bookings",
      icon: <Coins />,
    },
    {
      title: "Messages",
      value: "messages",
      href: "/provider-dashboard/messages",
      icon: <MessageSquare />,
    },

    {
      title: "Payment",
      value: "payment",
      href: "/provider-dashboard/payment",
      icon: <MdOutlinePayment />,
    },
    {
      title: "Transaction",
      value: "transaction",
      href: "/provider-dashboard/transaction",
      icon: <VscHistory />,
    },
    {
      title: "Settings",
      value: "settings",
      href: "/provider-dashboard/settings",
      icon: <Settings />,
    },
    // {
    //   title: "Profile",
    //   value: "profile",
    //   href: "/provider-dashboard/provider-profile",
    // },
  ];

  return (
    <div className="py-6">
      <Tabs tabs={tabOptions} />
    </div>
  );
};

export default ProviderTabs;
