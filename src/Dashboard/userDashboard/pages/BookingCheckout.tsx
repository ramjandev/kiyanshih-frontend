import { useState } from "react";
import { Clock, MapPin, Edit2 } from "lucide-react";
import CommonWrapper from "@/common/space/CommonWrapper";
import img from "@/assets/cardImages/working.jpg";

const BookingCheckout = () => {
  const [locationType, setLocationType] = useState<"my" | "provider" | null>(null);


  return (
    <CommonWrapper>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Book Service
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Book Your Service in Just a Few Clicks
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between sm:justify-center min-w-[320px] sm:min-w-0">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="mt-2 text-xs sm:text-sm font-medium text-gray-900">
                  Boking details
                </span>
              </div>
            </div>

            {/* Line 1 */}
            <div className="w-20 sm:w-38 h-px bg-gray-300 mx-2 sm:mx-4 mb-6"></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                <span className="mt-2 text-xs sm:text-sm text-gray-500">
                  Payment
                </span>
              </div>
            </div>

            {/* Line 2 */}
            <div className="w-20 sm:w-38 h-px bg-gray-300 mx-2 sm:mx-4 mb-6"></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                <span className="mt-2 text-xs sm:text-sm text-gray-500">
                  Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Service name
              </label>
              <input
                type="text"
                value="Carpentry & Woodwork"
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
              />
            </div>

            {/* Preferable Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Preferable Date & Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="09 Dec 2022 || 10:00 Am"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 pr-12 text-sm sm:text-base"
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value="+12505550199"
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
              />
            </div>

            {/* Getting Service at */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Getting Service at
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 px-4 py-3 border border-gray-300 rounded-lg bg-white">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="location"
                    checked={locationType === "my"}
                    onChange={() => setLocationType("my")}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-900">My Location</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="location"
                    checked={locationType === "provider"}
                    onChange={() => setLocationType("provider")}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-900">Provider Location</span>
                </label>

              </div>
            </div>

            {/* Location Details */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location details
              </label>
              <div className="relative">
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-900 flex-1 text-sm sm:text-base">
                    123 Main Street, Ontario
                  </span>
                  <Edit2 className="w-5 h-5 text-gray-400 cursor-pointer flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 text-blue-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                By clicking "Go to checkout", you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </label>
            </div>
          </div>

          {/* Right Booking Summary */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 sticky top-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
              </h2>

              {/* Service Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <img
                  src={img}
                  alt="Carpentry service"
                  className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Carpentry & Woodwork
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                    <span>Mike Handyman service</span>
                    <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">– Toronto, Canada</p>
                  <div className="flex items-center flex-wrap gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-orange-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-900 ml-1">
                      4.8 (170 Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starting At</span>
                  <span className="text-gray-900">450.0$</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">2 Hours</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">450.0$</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer text-sm sm:text-base">
                Go To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default BookingCheckout;
