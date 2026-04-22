import { DollarSign, Eye, MessageSquareWarning, Star } from "lucide-react";
interface BookingStateForProviderProps {
  pending: number;
  confirmed: number;
  completed: number;
  revenue: string;
}
const BookingStateForProvider: React.FC<BookingStateForProviderProps> = ({
  pending,
  confirmed,
  completed,
  revenue,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 shadow-sm rounded-lg border border-slate-300 bg-white ">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {pending}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Pending Requests
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <MessageSquareWarning className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 shadow-sm rounded-lg border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {confirmed}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Confirmed Bookings
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 shadow-sm rounded-lg border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {completed}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Completed Services
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 shadow-sm rounded-lg border border-slate-300 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                ${revenue}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Total Revenue
              </div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStateForProvider;
