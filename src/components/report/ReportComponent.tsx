import { useGetAllProviderReportsQuery } from "@/redux/featuresAPI/providerAPI/report/providerReport.api";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  MessageSquareWarning,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  sl: string;
  transactionId: string;
  date: string;
  from: string;
  amount: string;
  status: string;
  paymentMethod: string;
  description: string;
  email: string;
  phone: string;
}

// Transaction Details Modal Component
const TransactionDetailsModal: React.FC<{
  transaction: Transaction;
  onClose: () => void;
}> = ({ transaction, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Transaction Details
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                ID: {transaction.transactionId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)] p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Transaction Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Transaction Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-gray-900">
                    {transaction.transactionId}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium text-gray-900">
                    {transaction.date}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                    {transaction.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-gray-900 text-lg">
                    {transaction.amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">
                    {transaction.from}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900 truncate ml-2">
                    {transaction.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">
                    {transaction.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">
                    {transaction.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium text-gray-900 text-right ml-2">
                    {transaction.description}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Download Receipt
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportComponent: React.FC = () => {
  const { data: allReports } = useGetAllProviderReportsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const itemsPerPage = 6;
  // console.log(allReports);

  // Mock data with more details
  const allTransactions: Transaction[] = [
    {
      id: "1",
      sl: "SL",
      transactionId: "704d55ec-fcec-4fee",
      date: "25-Aug-2025 11:30am",
      from: "Charlotte Davis",
      amount: "17,90.89$",
      status: "Completed",
      paymentMethod: "Credit Card (Visa ****4242)",
      description: "Service payment for carpentry work",
      email: "charlotte.davis@email.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      sl: "SL",
      transactionId: "805e66fd-gdgd-5gff",
      date: "24-Aug-2025 10:15am",
      from: "John Smith",
      amount: "25,50.00$",
      status: "Completed",
      paymentMethod: "Credit Card (Mastercard ****5678)",
      description: "Plumbing service payment",
      email: "john.smith@email.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      sl: "SL",
      transactionId: "906f77ge-hehe-6hgg",
      date: "23-Aug-2025 09:45am",
      from: "Sarah Johnson",
      amount: "33,75.25$",
      status: "Completed",
      paymentMethod: "PayPal",
      description: "Electrical work payment",
      email: "sarah.j@email.com",
      phone: "+1 (555) 345-6789",
    },
    {
      id: "4",
      sl: "SL",
      transactionId: "107g88hf-ifif-7ihh",
      date: "22-Aug-2025 08:30am",
      from: "Michael Brown",
      amount: "42,10.50$",
      status: "Completed",
      paymentMethod: "Credit Card (Visa ****1234)",
      description: "Painting service payment",
      email: "mbrown@email.com",
      phone: "+1 (555) 456-7890",
    },
    {
      id: "5",
      sl: "SL",
      transactionId: "208h99ig-jgjg-8jii",
      date: "21-Aug-2025 07:20am",
      from: "Emily Wilson",
      amount: "15,80.75$",
      status: "Completed",
      paymentMethod: "Cash",
      description: "Cleaning service payment",
      email: "emily.wilson@email.com",
      phone: "+1 (555) 567-8901",
    },
    {
      id: "6",
      sl: "SL",
      transactionId: "309i00jh-kkhk-9kjj",
      date: "20-Aug-2025 06:10am",
      from: "David Lee",
      amount: "28,95.00$",
      status: "Completed",
      paymentMethod: "Credit Card (Amex ****9012)",
      description: "Landscaping service payment",
      email: "david.lee@email.com",
      phone: "+1 (555) 678-9012",
    },
    {
      id: "7",
      sl: "SL",
      transactionId: "410j11ki-llil-0lkk",
      date: "19-Aug-2025 05:05am",
      from: "Lisa Anderson",
      amount: "37,60.35$",
      status: "Completed",
      paymentMethod: "Debit Card",
      description: "HVAC service payment",
      email: "lisa.a@email.com",
      phone: "+1 (555) 789-0123",
    },
    {
      id: "8",
      sl: "SL",
      transactionId: "511k22lj-mmjm-1mll",
      date: "18-Aug-2025 04:50am",
      from: "Robert Taylor",
      amount: "19,25.80$",
      status: "Completed",
      paymentMethod: "Credit Card (Visa ****3456)",
      description: "Appliance repair payment",
      email: "rtaylor@email.com",
      phone: "+1 (555) 890-1234",
    },
  ];

  // Filter transactions based on search
  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transactionId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="">
      <div className="w-full">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Balance Card */}
          <div className="p-4 sm:p-6 rounded-[8px] border border-[#CBD5E1] bg-[#FFF]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-4">
                  {allReports?.total_earnings} $
                </p>
                <p className="text-gray-500 text-xs sm:text-sm font-medium ">
                  Total Balance
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquareWarning className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Pending Balance Card */}
          <div className="p-4 sm:p-6 rounded-[8px] border border-[#CBD5E1] bg-[#FFF]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-4">
                  {allReports?.pending_earnings} $
                </p>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  Pending Balance
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CBD5E1] p-4 sm:p-6">
          {/* Search and Filter Section */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <Search className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by transaction id"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none text-gray-700 text-sm"
              />
            </div>

            {/* Date Range Button */}
            <button className="flex  items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3.5 border  border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-gray-700 font-medium text-sm">
                Date Range
              </span>
            </button>

            {/* Export Button */}
            <button className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Export in Excel</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50">
                      SL
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50">
                      Transaction ID
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 hidden sm:table-cell">
                      Transaction Date
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 hidden md:table-cell">
                      Transaction From
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      onClick={() => handleRowClick(transaction)}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-600 font-medium">
                        {transaction.id}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-900 font-medium">
                            {transaction.transactionId}
                          </p>
                          <div className="sm:hidden mt-1 space-y-1">
                            <p className="text-xs text-gray-500">
                              {transaction.date}
                            </p>
                            <p className="text-xs text-gray-600 md:hidden">
                              {transaction.from}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">
                        {transaction.date}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                        {transaction.from}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-gray-900">
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-1 mx-2 sm:mx-4">
              <button
                onClick={() => handlePageChange(1)}
                className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm rounded transition-colors ${
                  currentPage === 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                1
              </button>

              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(2)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm rounded transition-colors ${
                    currentPage === 2
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  2
                </button>
              )}

              {totalPages > 2 && (
                <button
                  onClick={() => handlePageChange(3)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm rounded transition-colors ${
                    currentPage === 3
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  3
                </button>
              )}

              {totalPages > 3 && (
                <>
                  <span className="px-1 sm:px-2 py-1 text-gray-400 text-xs sm:text-sm">
                    ...
                  </span>
                </>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
              Showing {currentTransactions.length} of{" "}
              {filteredTransactions.length} results for "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default ReportComponent;
