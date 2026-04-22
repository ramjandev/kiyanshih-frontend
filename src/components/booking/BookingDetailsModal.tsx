import CommonButton from "@/common/button/CommonButton";
import type { BookingDetailsResponse } from "@/redux/featuresAPI/providerAPI/booking/types/booking";
import { MapPin, Phone, X } from "lucide-react";
import { useEffect } from "react";

interface Booking {
  data: BookingDetailsResponse;
  onClose: () => void;
  onAccept: (id: number) => void;
}
const BookingDetailsModal: React.FC<Booking> = ({
  data,
  onAccept,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getStatusBadge = () => {
    if (!bookingDetails) return null;

    const statusConfig: Record<string, { text: string; class: string }> = {
      pending: { text: "Pending", class: "bg-yellow-100 text-yellow-800" },
      accepted: { text: "Accepted", class: "bg-green-100 text-green-800" },
      rejected: { text: "Rejected", class: "bg-red-100 text-red-800" },
      "in-progress": {
        text: "In-Progress",
        class: "bg-blue-100 text-blue-800",
      },
      completed: { text: "Completed", class: "bg-teal-100 text-teal-800" },
    };

    const config = statusConfig[bookingDetails.status] || {
      text: bookingDetails.status,
      class: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-2 py-1 ${config.class} text-xs font-medium rounded`}>
        {config.text}
      </span>
    );
  };

  const bookingDetails = data?.booking;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Booking Details
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                <span className="text-xs sm:text-sm text-gray-600">
                  Booking # {bookingDetails?.id}
                </span>
                {getStatusBadge()}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Booking Placed: {bookingDetails?.booking_placed}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Payment & Booking Summary */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Payment Method */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-600">
                        Amount:
                        <span className="text-gray-900 font-medium">
                          {bookingDetails?.service_amount}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-600">
                        Schedule Date:{" "}
                        <span className="text-gray-900 font-medium">
                          {bookingDetails?.schedule.date}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Pay Via:{" "}
                        <span className="text-gray-900 font-medium">
                          {bookingDetails?.payment_method.payment_via}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                    Booking Summary
                  </h3>

                  {/* Desktop Table View */}
                  <div className="hidden sm:block space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Service
                        </p>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-sm font-medium text-gray-900">
                          Amount
                        </p>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      {bookingDetails?.booking_summary.map((item) => (
                        <>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              {item?.service}
                            </p>
                          </div>
                          <div className="w-24 text-right">
                            <p className="text-sm text-gray-900">
                              {item.amount}
                            </p>
                          </div>
                          <div className="w-24 text-right">
                            <p className="text-sm text-gray-900">
                              {item.total}
                            </p>
                          </div>
                        </>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <div className="flex-1"></div>
                      <div className="w-32 text-right">
                        <p className="text-sm text-gray-600">
                          Service amount (Vat Excluded)
                        </p>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-sm text-gray-900">
                          {bookingDetails?.platform_fee}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex-1"></div>
                      <div className="w-32 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          Grand Total
                        </p>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {bookingDetails?.grand_total}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-3">
                    {bookingDetails?.booking_summary.map((item) => (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          Service
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {item.service}
                        </p>
                        <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-600">Amount:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {item.amount}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-600">Total:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {item?.total}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-600">
                          Service amount (Vat Excluded):
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {bookingDetails?.platform_fee}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs font-semibold text-gray-900">
                          Grand Total:
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {bookingDetails?.grand_total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* pending ===confirmed */}

              <div className="space-y-4 sm:space-y-6">
                {/* Booking Setup */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
                    Booking Setup
                  </h3>

                  {bookingDetails?.status === "confirmed" && (
                    <div className="flex gap-2 mb-4">
                      <CommonButton
                        onClick={() => onAccept(bookingDetails?.id)}
                        className="!bg-blue-600 !text-white "
                      >
                        Accept
                      </CommonButton>
                    </div>
                  )}

                  {/* Service Location */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-3 text-center text-sm sm:text-base">
                      Service location
                    </h4>
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-2 sm:p-3 rounded">
                      <p className="text-xs sm:text-sm text-gray-800">
                        You need to go to the Customer Location to provide the
                        service
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Service Location:
                      </p>
                      <p className="text-xs sm:text-sm text-gray-900 font-medium break-words">
                        {bookingDetails?.service_location.address}
                      </p>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3 text-center text-sm sm:text-base">
                      Customer Information
                    </h4>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-700 font-semibold text-sm sm:text-base">
                          {bookingDetails?.customer.profile_image}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {bookingDetails?.customer.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span> {bookingDetails?.customer.phone}</span>
                        </div>
                        <div className="flex items-start gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                          <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words">
                            {bookingDetails?.customer.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
