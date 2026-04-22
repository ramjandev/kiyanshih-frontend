import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { useCompletedWorkMutation } from "@/redux/featuresAPI/providerAPI/booking/bookingApi";
import type { BookingListItemForProvider } from "@/redux/featuresAPI/providerAPI/booking/types/booking";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ProviderBookingCardProps {
  activeTab: string;
  allBookings: BookingListItemForProvider[];
  setSelectedBookingId: React.Dispatch<React.SetStateAction<number | null>>;
  onAccept: (id: number) => void;
  isLoadingStartWork: boolean;
}
const ProviderBookingCard: React.FC<ProviderBookingCardProps> = ({
  activeTab,
  allBookings,
  setSelectedBookingId,
  onAccept,

  isLoadingStartWork,
}) => {
  const [completedWork, { isLoading: isLoadingCompletedWork }] =
    useCompletedWorkMutation();

  const handleCompletedWork = async (selectedBookingId: number) => {
    if (selectedBookingId) {
      const res = await completedWork(selectedBookingId).unwrap();
      toast.success(res?.message || "Work  completed successfully");
    }
  };
  return (
    <div className="space-y-3 sm:space-y-4 pt-6 ">
      {allBookings.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          No bookings in this category
        </div>
      ) : (
        allBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-3 sm:p-4 md:p-6 hover:shadow-md transition-all cursor-pointer rounded-2xl border border-slate-300 bg-white"
          >
            {activeTab === "completed" && (
              <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Confirm job completion</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              {/* Left side (service info) */}
              <div className="flex gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={booking.service_image}
                    alt={booking.service_name}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">
                    {booking.service_name}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600">
                    <span>{booking.payment_status}</span>
                    <span>Budget: {booking.provider_amount}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    Booking id: {booking.booking_id}
                  </div>
                </div>
              </div>

              {/* Right side (client info) */}
              <div className="lg:text-right">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                  Client: {booking.client_name}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Payment: {booking.payment_method}
                </div>
                <div className="flex flex-wrap lg:justify-end gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{booking.booking_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{booking.time_slot}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate max-w-[150px]">
                      {booking.client_location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t-2 border-[#DBDBDB]">
              <div className="flex flex-wrap gap-2">
                {booking.status === "confirmed" && (
                  <>
                    <CommonButton
                      disabled={isLoadingStartWork}
                      onClick={() => onAccept(booking.id)}
                      className="!bg-blue-600 !text-white "
                    >
                      {isLoadingStartWork ? (
                        <ButtonWithLoading title="Starting Work..." />
                      ) : (
                        "Accept"
                      )}
                    </CommonButton>
                    <CommonButton className="!bg-red-600 !text-white ">
                      Reject
                    </CommonButton>
                  </>
                )}
                {booking.status === "review_request" && (
                  <>
                    <CommonButton className="!bg-yellow-600 !text-white !cursor-not-allowed ">
                      Review Request
                    </CommonButton>
                  </>
                )}

                {booking.status === "in_progress" && (
                  <>
                    <CommonButton className="!bg-yellow-600 !text-white cursor-not-allowed ">
                      In-Progress
                    </CommonButton>
                    <CommonButton
                      onClick={() => handleCompletedWork(booking.id)}
                      className="!bg-blue-600 !text-white "
                    >
                      {isLoadingCompletedWork ? (
                        <ButtonWithLoading title="Completing Work..." />
                      ) : (
                        "Complete"
                      )}
                    </CommonButton>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                {booking.status === "confirmed" && (
                  <Link
                    to="/provider-dashboard/messages"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700  cursor-pointer"
                  >
                    Message
                  </Link>
                )}
                <button
                  onClick={() => setSelectedBookingId(booking.id)}
                  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderBookingCard;
