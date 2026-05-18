import Tabs from "@/Dashboard/userDashboard/userComponents/reuseable/Tabs";
import {
  LayoutDashboard,
  Settings,
  Calendar,
  MessageCircle,
  Briefcase,
  FileText,
  ListChecks,
} from "lucide-react";

const ProviderNavbar = () => {
  const providerTabs = [
    {
      title: "Overview",
      value: "overview",
      href: "/provider-dashboard/overview",
      icon: <LayoutDashboard />,
    },
    {
      title: "My Jobs Listing",
      value: "job-listing",
      href: "/provider-dashboard/job-listing",
      icon: <Briefcase />,
    },
    {
      title: "Available Jobs",
      value: "available-job",
      href: "/provider-dashboard/available-job",
      icon: <ListChecks />,
    },
    {
      title: "Bookings",
      value: "bookings",
      href: "/provider-dashboard/bookings",
      icon: <Calendar />,
    },
    {
      title: "Message",
      value: "message",
      href: "/provider-dashboard/message",
      icon: <MessageCircle />,
    },
    {
      title: "Report",
      value: "report",
      href: "/provider-dashboard/report",
      icon: <FileText />,
    },
    {
      title: "Settings",
      value: "settings",
      href: "/provider-dashboard/settings",
      icon: <Settings />,
    },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              Welcome back, Mike Johnson
            </h1>
            <p className="text-sm text-gray-600">
              Manage your services and track your performance
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Get Verified
          </button>
        </div>

        {/* ✅ Tabs with Icons */}
        <Tabs
          tabs={providerTabs}
          basePath="/provider-dashboard"
        />
      </div>
    </nav>
  );
};

export default ProviderNavbar;
