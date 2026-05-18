import BookingServiceDashboard from "@/components/booking/BookingServiceDashboard";
import PaymentHistory from "@/components/payment/PaymentHistory";
import SettingsPage from "@/components/settings/SettingsPage";
import BookingServiceDetails from "@/Dashboard/Admin/components/booking/BookingServiceDetails";
import BookingManagement from "@/Dashboard/Admin/pages/BookingManagement";
import CategorySetUp from "@/Dashboard/Admin/pages/category/CategorySetUp";
import Dashboard from "@/Dashboard/Admin/pages/Dashboard";
import AdminPayment from "@/Dashboard/Admin/pages/payment/AdminPayment";
import BackgroundCheck from "@/Dashboard/Admin/pages/provider/BackgroundCheck";
import ProviderDetails from "@/Dashboard/Admin/pages/provider/ProviderDetails";
import ProviderList from "@/Dashboard/Admin/pages/provider/ProviderList";
import Subscription from "@/Dashboard/Admin/pages/subscription/Subscription";
import Transaction from "@/Dashboard/Admin/pages/transaction/Transaction";
import UserManagement from "@/Dashboard/Admin/pages/UserManagement";
import ProtectedRoute from "@/Dashboard/components/ProtectedRoute";
import AvailableJobs from "@/Dashboard/providerDashboard/pages/AvailableJobs/AvailableJobs";
import BoostService from "@/Dashboard/providerDashboard/pages/JobListing/BoostService";
import JobsListing from "@/Dashboard/providerDashboard/pages/JobListing/JobsListing";
import OverviewPage from "@/Dashboard/providerDashboard/pages/overviewPage";
import PaymentCancelPage from "@/Dashboard/providerDashboard/pages/payment/PaymentCancelPage";
import PaymentSuccessPage from "@/Dashboard/providerDashboard/pages/payment/PaymentSuccessPage";
import ProviderProfile from "@/Dashboard/providerDashboard/pages/ProviderProfile";
import ServicesPosting from "@/Dashboard/providerDashboard/pages/servicePosting/ServicesPosting";
import SubmitProposal from "@/Dashboard/providerDashboard/pages/SubmitProposal/SubmitProposal";
import UpgradePlans from "@/Dashboard/providerDashboard/pages/UpgradePlans";
import Verification from "@/Dashboard/providerDashboard/pages/verification/Verification";
import AllPopularServices from "@/Dashboard/userDashboard/pages/AllPopularServices";
import Bookings from "@/Dashboard/userDashboard/pages/Bookings";
import Job from "@/Dashboard/userDashboard/pages/Job";
import UserJobDetails from "@/Dashboard/userDashboard/pages/JobDetails";
import JobPost from "@/Dashboard/userDashboard/pages/JobPost";
import Overview from "@/Dashboard/userDashboard/pages/Overview";
import Payment from "@/Dashboard/userDashboard/pages/Payment";
import ProposalPaymentSuccess from "@/Dashboard/userDashboard/pages/ProposalPaymentSuccess";
import SingleOverview from "@/Dashboard/userDashboard/pages/SingleOverview";
import UserMessage from "@/Dashboard/userDashboard/pages/UserMessage";
import UserProfile from "@/Dashboard/userDashboard/pages/UserProfile";
import UserSettings from "@/Dashboard/userDashboard/pages/UserSettings";
import DashboardLayout from "@/layout/DashboardLayout";
import ProviderLayout from "@/layout/ProviderLayout";
import UserLayout from "@/layout/UserLayout";
import BookingSuccess from "@/pages/BookingSuccess";
import BookService from "@/pages/BookService";
import ClientSignUp from "@/pages/ClientSignUp";
import LearnMore from "@/pages/LearnMore";
import Login from "@/pages/Login";
import Provider from "@/pages/Provider";
import ProviderProfileSetting from "@/pages/ProviderProfileSetting";
import ProviderSignUp from "@/pages/ProviderSignUp";
import Service from "@/pages/Service";
import SingleProvider from "@/pages/SingleProvider";
import SingleService from "@/pages/SingleService";
import SuccessMessage from "@/pages/SuccessMessage";
import TransactionHistory from "@/pages/TransactionHistory";
import Work from "@/pages/Work";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/service", element: <Service /> },
      { path: "/service/:category", element: <SingleService /> },
      { path: "/provider", element: <Provider /> },
      { path: "/provider/learn-more", element: <LearnMore /> },
      { path: "/provider/:name/:id", element: <SingleProvider /> },
      { path: "/provider-profile/:name", element: <ProviderProfileSetting /> },
      { path: "/how-it-works", element: <Work /> },
      {
        element: <ProtectedRoute isPublicAuth={true} />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/client-signup", element: <ClientSignUp /> },
          { path: "/provider-signup", element: <ProviderSignUp /> },
        ],
      },

      // Admin Dashboard Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "admin-dashboard",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "booking", element: <BookingManagement /> },
              {
                path: "booking/:bookingId",
                element: <BookingServiceDetails />,
              },
              { path: "provider-list", element: <ProviderList /> },
              { path: "provider-list/:id", element: <ProviderDetails /> },
              { path: "background-check", element: <BackgroundCheck /> },
              { path: "category", element: <CategorySetUp /> },
              { path: "user", element: <UserManagement /> },
              { path: "subscription", element: <Subscription /> },
              { path: "payment", element: <AdminPayment /> },
              { path: "transaction", element: <Transaction /> },
            ],
          },
        ],
      },

      { path: "success", element: <SuccessMessage /> },
      { path: "booking/success", element: <BookingSuccess /> },
      { path: "payment/success", element: <ProposalPaymentSuccess /> },
    ],
  },

  // User Dashboard Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "user-dashboard",
        element: <UserLayout />,
        children: [
          { index: true, element: <Overview /> },
          { path: "settings", element: <UserSettings /> },
          { path: "overview", element: <Overview /> },
          { path: "popular-services", element: <AllPopularServices /> },
          { path: "overview/:id", element: <SingleOverview /> },
          { path: "message", element: <UserMessage /> },
          { path: "my-jobs", element: <Job /> },
          { path: "my-jobs/:id", element: <UserJobDetails /> },
          { path: "edit-job/:id", element: <JobPost /> },
          { path: "job-postings", element: <JobPost /> },
          { path: "payment-history", element: <Payment /> },
          { path: "bookings", element: <Bookings /> },
          { path: "book-service/:id", element: <BookService /> },
          { path: "profile", element: <UserProfile /> },
        ],
      },
    ],
  },

  // Provider Dashboard Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "provider-dashboard",
        element: <ProviderLayout />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "overview", element: <OverviewPage /> },
          { path: "messages", element: <UserMessage /> },
          { path: "job-listing", element: <JobsListing /> },
          { path: "boost-service/:id", element: <BoostService /> },
          { path: "available-job", element: <AvailableJobs /> },
          // { path: "available-job/:id", element: <ProviderJobDetails /> },
          { path: "submit-proposal/:id", element: <SubmitProposal /> },
          { path: "service-posting", element: <ServicesPosting /> },

          { path: "settings", element: <SettingsPage /> },

          { path: "bookings", element: <BookingServiceDashboard /> },
          { path: "payment", element: <PaymentHistory /> },
          { path: "transaction", element: <TransactionHistory /> },
          { path: "provider-profile", element: <ProviderProfile /> },
          { path: "upgrade-plan", element: <UpgradePlans /> },
          { path: "verification", element: <Verification /> },
          { path: "success", element: <PaymentSuccessPage /> },
          { path: "cancel", element: <PaymentCancelPage /> },
        ],
      },
    ],
  },
]);

export default routes;
