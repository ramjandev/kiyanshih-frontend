import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/help/useDebounce";
import {
  useGetStateForTransactionQuery,
  useGetTransactionForProviderQuery,
} from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { Calendar, Search } from "lucide-react";
import React, { useState } from "react";
import { TbMoneybag, TbPaperBag } from "react-icons/tb";
const list = new Array(2).fill(0);
const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const deBouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleApplyDateRange = () => {
    setShowDatePicker(false);
  };

  const handleClearDates = () => {
    setDateFrom("");
    setDateTo("");
    setShowDatePicker(false);
  };

  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetStateForTransactionQuery();
  const { data: transactionData, isLoading: isLoadingTransaction } =
    useGetTransactionForProviderQuery(
      {
        page,
        page_size: 10,
        date_from: dateFrom,
        date_to: dateTo,
        search: deBouncedSearchTerm,
      },

      { refetchOnMountOrArgChange: true },
    );

  return (
    <div className="">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">
                    {data?.breakdown.total_earnings}$
                  </div>
                  <div className="text-sm text-gray-500">Total Balance</div>
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <span>
                    <TbMoneybag className="w-5 h-5 text-orange-500" />
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">
                    {data?.breakdown.by_status.pending}
                  </div>
                  <div className="text-sm text-gray-500">Pending Balance</div>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <span>
                    <TbPaperBag className="w-5 h-5 text-green-500" />
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
          <input
            type="text"
            placeholder="Search by transaction Id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-gray-600 cursor-pointer" />
            <span className="text-gray-700">
              {dateFrom && dateTo ? `${dateFrom} - ${dateTo}` : "Date Range"}
            </span>
          </button>

          {showDatePicker && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDatePicker(false)}
              />
              <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[300px]">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      min={dateFrom}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleApplyDateRange}
                      disabled={!dateFrom || !dateTo}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      onClick={handleClearDates}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <LoadingStatus
        isLoading={isLoadingTransaction}
        items={transactionData?.transactions || []}
        itemName="transactions"
      />

      {!isLoadingTransaction &&
        transactionData &&
        transactionData?.transactions.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      SL
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      Transaction ID
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      Transaction Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      Transaction From
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData?.transactions.map((transaction) => (
                    <tr
                      key={transaction.sl}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {transaction.sl}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {transaction.transaction_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {transaction.transaction_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {transaction.transaction_from}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        $ {transaction.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-sm font-medium text-green-700">
                          {transaction.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {transactionData && transactionData?.transactions.length > 0 && (
        <div className="py-5">
          <Pagination
            currentPage={page}
            totalPages={transactionData?.pagination.total_pages || 1}
            onPageChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
