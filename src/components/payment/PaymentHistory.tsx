import CommonButton from "@/common/button/CommonButton";
import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import {
  useGetEarningQuery,
  useGetHistoryQuery,
} from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import React, { useState } from "react";
import { TbMoneybag, TbPaperBag } from "react-icons/tb";
const list = new Array(2).fill(0);

const PaymentHistory: React.FC = () => {
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [isShowAll, setIsShowAll] = useState(false);
  const handleShowAll = () => {
    setLimit(history?.pagination.total_items || 0);
    setIsShowAll(true);
  };
  const { data: earningState, isLoading } = useGetEarningQuery();
  const { data: history, isLoading: isLoadingHistory } = useGetHistoryQuery(
    {
      page,
      page_size: limit,
    },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <div className="">
      <div className="">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Earnings Received
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Your earnings are now available in your balance.
            </p>
          </div>
          <CommonButton
            onClick={handleShowAll}
            className="!bg-blue-600 !text-white"
          >
            View All Payment
          </CommonButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {isLoading
            ? list.map((_, i) => <DashboardCardSkeleton key={i} />)
            : earningState && (
                <>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Active Jobs</span>
                      <TbPaperBag className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 mb-1">
                      {earningState?.earnings.active_jobs}
                    </div>
                    <div className="text-sm text-gray-500">
                      {earningState?.earnings.active_jobs_breakdown.maintenance}{" "}
                      maintenance
                    </div>
                  </div>

                  {/* Revenue Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        Revenue This Month
                      </span>
                      <TbMoneybag className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 mb-1">
                      ${earningState?.earnings.revenue_this_month}
                    </div>
                    <div className="text-sm text-green-600">
                      {earningState?.earnings.revenue_change_percentage} from
                      last month
                    </div>
                  </div>
                </>
              )}
        </div>

        {/* Payments History */}
        <div
          className={`bg-white rounded-lg border border-gray-200  ${
            isShowAll ? "mb-6" : ""
          }`}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Payments History
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Payment history and completed transactions
            </p>
          </div>

          <LoadingStatus
            isLoading={isLoadingHistory}
            items={history?.payments}
            itemName="payments"
          />
          {history?.payments &&
            history?.payments.length > 0 &&
            !isLoadingHistory && (
              <div className="">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                        Job
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                        Client
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                        Amount
                      </th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history?.payments.map((job) => (
                      <tr
                        key={job.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {job.booking_type}
                          </div>
                          <div className="text-sm text-gray-500">{job.job}</div>
                          <div className="text-sm text-gray-400">
                            Completed: {job.accepted_date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {job.client_to ? (
                              <>
                                <div className="text-gray-900">
                                  {job.client}
                                </div>
                                <div className="text-gray-900">
                                  {job.client_to}
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-900">{job.client}</div>
                            )}
                            <div className="text-gray-500">
                              Accepted: {job.project_completion}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            ${job.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded">
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>{" "}
      {history?.payments && history?.payments.length > 0 && !isShowAll && (
        <div className="py-5">
          <Pagination
            currentPage={page}
            totalPages={history?.pagination?.total_pages ?? 1}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
