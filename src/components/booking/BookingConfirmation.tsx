import type { FC } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

interface BookingConfirmationProps {
    formData: any;
    isConfirmed?: boolean;
}

const BookingConfirmation: FC<BookingConfirmationProps> = ({ formData, isConfirmed = false }) => {
    return (
        <div className="space-y-8">

            <div className="flex flex-col items-center text-center space-y-4">
                {isConfirmed ? (
                    <>
                        <div className="text-green-500 text-6xl animate-in fade-in zoom-in duration-300">
                            <BsCheckCircleFill />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                            <p className="text-gray-500">Your booking has been successfully placed.</p>
                        </div>
                    </>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Confirm Your Booking</h2>
                        <p className="text-gray-500">Review your booking details before confirming</p>
                    </div>
                )}
            </div>

            <hr className="border-gray-100" />

            {/* Booking Summary Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Service Info */}
                <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                            src={formData.serviceImage || "https://placehold.co/100"}
                            alt="Service"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{formData.serviceName}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span>{formData.providerName}</span>
                            <span className="text-yellow-500 flex items-center">Verified</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Toronto, Canada</div>
                        <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
                            <span>★ 4.8</span>
                            <span className="text-gray-400">(170 Reviews)</span>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">

                    <div>
                        <p className="text-sm font-semibold text-gray-900">Service Name</p>
                        <p className="text-sm text-gray-500 mt-1">{formData.serviceName}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">Phone</p>
                        <p className="text-sm text-gray-500 mt-1">{formData.phone}</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">Date & Time</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {formData.bookingDate ? new Date(formData.bookingDate).toLocaleString() : 'Not selected'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">Service At</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {formData.locationType === 'my_location' ? 'My Location' : 'Provider Location'}
                        </p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-900">Location</p>
                        <p className="text-sm text-gray-500 mt-1">{formData.address}</p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-900">Payment method</p>
                        <p className="text-sm text-gray-500 mt-1">Mastercard</p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">Total</p>
                        <p className="text-sm text-gray-900 font-bold mt-1">{formData.price || "0.00"}$</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default BookingConfirmation;
