import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import {
  useGetPaymentAwaitingReleaseQuery,
  useGetPaymentReleaseQuery,
  useGetPaymentStatusQuery,
} from "@/redux/featuresAPI/adminApi/businessManagement";
import { CheckCircle, DollarSign, Settings, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import DashboardTopSection from "../../common/DashboardTopSection";
import CancelBookingsPayment from "../../components/payment/CancelBookingsPayment";
import PaymentRelease from "../../components/payment/PaymentRelease";
export const loadingList = new Array(4).fill(null);
const AdminPayment: React.FC = () => {
  const [page, setPage] = useState(1);
  const [current_page, setCurrentPage] = useState(1);
  type ViewMode = "release" | "awaiting" | "all";

  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const PAGE_SIZE = 5;
  const ALL_SIZE = 1000;

  const { data: paymentStatusData, isLoading } = useGetPaymentStatusQuery();
  const { data: paymentAwaitingData, isLoading: isLoadingAwaiting } =
    useGetPaymentAwaitingReleaseQuery({
      current_page: page,
      page_size: viewMode === "awaiting" ? ALL_SIZE : PAGE_SIZE,
    });
  const { data: paymentReleasedData, isLoading: isLoadingReleased } =
    useGetPaymentReleaseQuery({
      current_page: current_page,
      page_size: viewMode === "release" ? ALL_SIZE : PAGE_SIZE,
    });

  const pendingPayments = paymentAwaitingData?.data.payments || [];
  const stats = [
    {
      title: "In Escrow",
      amount: `$${paymentStatusData?.data.in_escrow.amount}` || "$0",
      subtitle: `${paymentStatusData?.data.in_escrow.count || 0} ${
        paymentStatusData?.data.in_escrow.label || ""
      }`,
      icon: <Settings className="w-5 h-5 text-gray-600" />,
    },
    {
      title: "Platform Revenue",
      amount: `$${paymentStatusData?.data.platform_revenue.amount}` || "$0",
      subtitle: `${paymentStatusData?.data.platform_revenue.label || ""}`,
      icon: <DollarSign className="w-5 h-5 text-gray-600" />,
    },
    {
      title: "To Be Released",
      amount: `$${paymentStatusData?.data.to_be_released.amount}` || "$0",
      subtitle: `${paymentStatusData?.data.to_be_released.label || ""}`,
      icon: <TrendingUp className="w-5 h-5 text-gray-600" />,
    },
    {
      title: "Released Today",
      amount: `$${paymentStatusData?.data.released_today.amount}` || "$0",
      subtitle: `${paymentStatusData?.data.released_today.label || ""}`,
      icon: <CheckCircle className="w-5 h-5 text-gray-600" />,
    },
  ];

  const handleViewAll = (mode: ViewMode) => {
    setViewMode(mode);
  };
  // refund and release payment
  const [isPaymentRefund, setIsPaymentRefund] = useState(false);
  const [isPaymentRelease, setIsPaymentRelease] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const handlePaymentModal = (status: string, paymentId: number) => {
    setPaymentId(paymentId);
    if (status === "cancel_booking") {
      setIsPaymentRefund(true);
      setIsPaymentRelease(false);
    } else {
      setIsPaymentRelease(true);
      setIsPaymentRefund(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <DashboardTopSection
          title="Payment Processing"
          description="Review and release contractor payments from escrow"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            loadingList.map((_, index) => <DashboardCardSkeleton key={index} />)
          ) : (
            <>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </span>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.amount}
                  </div>
                  <div className="text-xs text-gray-500">{stat.subtitle}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {
          <LoadingStatus
            isLoading={isLoadingAwaiting}
            items={pendingPayments}
            itemName="Pending Payments"
          />
        }

        {!isLoadingAwaiting && pendingPayments.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payments Awaiting Release & Refund
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Review milestones and release payments to contractors
                  </p>
                </div>
                <button
                  disabled={viewMode === "awaiting"}
                  onClick={() => handleViewAll("awaiting")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Provider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Payment Breakdown
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingPayments.map((payment) => (
                      <tr key={payment.booking_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.job_details.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {payment.job_details.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            Completed: {payment.status_display}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            From: {payment.provider.from}
                          </div>
                          <div className="text-sm text-gray-900">
                            To: {payment.provider.to}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Accepted: {payment.provider.accepted_date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            Total: ${payment.payment_breakdown.total}
                          </div>
                        </td>
                        <td className={`px-6 py-4 `}>
                          <p
                            className={`px-4 py-1 w-fit rounded-full text-xs font-medium ${
                              payment.booking_status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : payment.booking_status === "in_progress"
                                ? "bg-blue-100 text-blue-700"
                                : payment.booking_status === "review_request"
                                ? "bg-teal-100 text-teal-700"
                                : payment.booking_status === "cancel_booking"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {payment.status_display}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              handlePaymentModal(
                                payment.booking_status,
                                payment.booking_id
                              )
                            }
                            disabled={payment.booking_status === "in_progress"}
                            className={`bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed 
                            
                          `}
                          >
                            Review &
                            {payment.booking_status === "cancel_booking"
                              ? "Refund"
                              : "Release"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {viewMode !== "awaiting" && (
              <div className="pb-5">
                <Pagination
                  currentPage={page}
                  totalPages={
                    paymentAwaitingData?.data.pagination.total_pages || 1
                  }
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
              </div>
            )}
          </>
        )}
        {
          <LoadingStatus
            isLoading={isLoadingReleased}
            items={paymentReleasedData?.data.payments}
            itemName="Released Payments"
          />
        }

        {!isLoadingReleased &&
          paymentReleasedData &&
          paymentReleasedData?.data.payments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recently Released Payments
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Payment history and completed transactions
                  </p>
                </div>
                <button
                  disabled={viewMode === "release"}
                  onClick={() => setViewMode("release")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Job
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        User → Provider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Platform Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Provider Received
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentReleasedData?.data.payments.map((payment) => (
                      <tr key={payment.amount} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.job.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {payment.job.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            Completed: {payment.job.completed_date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            From: {payment.user_provider.from}
                          </div>
                          <div className="text-sm text-gray-900">
                            To: {payment.user_provider.to}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Accepted: {payment.user_provider.accepted_date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            ${payment.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-green-600">
                            ${payment.platform_fee}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-blue-600">
                            ${payment.provider_received}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-green-600">
                            Released
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        {viewMode !== "release" && (
          <div className="my-5">
            <Pagination
              currentPage={current_page}
              totalPages={paymentReleasedData?.data.pagination.total_pages || 1}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        )}
      </div>

      {isPaymentRefund && (
        <CancelBookingsPayment
          setIsPaymentRefund={setIsPaymentRefund}
          paymentId={paymentId}
        />
      )}
      {isPaymentRelease && (
        <PaymentRelease
          setIsPaymentRelease={setIsPaymentRelease}
          paymentId={paymentId}
        />
      )}
    </div>
  );
};

export default AdminPayment;
