import {
  useGetPaymentReviewForRefundQuery,
  usePaymentRefundMutation,
} from "@/redux/featuresAPI/adminApi/businessManagement";
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

// interface ServiceInfo {
//   serviceName: string;
//   milestone: string;
//   dateTime: string;
//   location: string;
//   user: string;
//   provider: string;
// }

// interface PaymentBreakdown {
//   providerAmount: number;
//   platformCommission: number;
//   platformCommissionPercent: number;
//   userPayoutPercent: number;
//   userPayout: number;
//   amountToRelease: number;
// }

interface Action {
  setIsPaymentRefund: React.Dispatch<React.SetStateAction<boolean>>;
  paymentId: number | null;
}
const CancelBookingsPayment: React.FC<Action> = ({
  setIsPaymentRefund,
  paymentId,
}) => {
  const [notes, setNotes] = useState<string>("");
  const { data } = useGetPaymentReviewForRefundQuery(paymentId || 0, {
    skip: !paymentId,
    refetchOnMountOrArgChange: true,
  });
  const serviceInfo = {
    serviceName: data?.data?.service_information?.service_name || "",
    milestone: data?.data?.service_information?.customer || "",
    dateTime: data?.data?.service_information?.time_slot || "",
    location: data?.data?.service_information?.location || "",
    user: data?.data?.service_information?.customer || "",
    provider: data?.data?.service_information?.provider || "",
  };

  const payment = {
    providerAmount: data?.data?.payment_breakdown?.amount_to_refund || 0,
    platformCommission:
      data?.data?.payment_breakdown?.platform_commission_amount || 0,
    platformCommissionPercent:
      data?.data?.payment_breakdown?.platform_commission_percentage || 0,
    userPayoutPercent:
      data?.data?.payment_breakdown?.user_refund_percentage || 0,
    userPayout: data?.data?.payment_breakdown?.user_refund_amount || 0,
    amountToRelease: data?.data?.payment_breakdown?.user_refund_amount || 0,
  };

  const totalAmount =
    data?.data?.payment_breakdown?.total_amount_paid_by_user || 0;

  const [paymentRefund, { isLoading: isLoadingRefund }] =
    usePaymentRefundMutation();
  const handleRefund = async () => {
    try {
      if (paymentId) {
        const res = await paymentRefund({
          id: paymentId || 0,
          data: { admin_notes: notes },
        }).unwrap();
        toast.success(res.message);
      }

      setIsPaymentRefund(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to refund payment");
    }
  };

  const handleCancel = () => {
    setIsPaymentRefund(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" bg-white p-6 md:p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Cancel Bookings payment
            </h1>
            <p className="text-gray-500 mt-1">
              Verify completion and release payment to contractor
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Service Information Card */}
        <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Service Information
            </h2>
            <div className="text-right">
              <span className="text-xl font-bold text-gray-900">
                Total: ${totalAmount}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Service Name</p>
              <p className="text-gray-900 font-semibold">
                {serviceInfo.serviceName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Milestone:</p>
              <p className="text-gray-900 font-semibold">
                {serviceInfo.milestone}
              </p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-1">Date & Time</p>
              <p className="text-gray-900">{serviceInfo.dateTime}</p>
            </div>
            <div>
              <p className="text-gray-900 font-semibold mb-1">Location</p>
              <p className="text-gray-900">{serviceInfo.location}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">User:</p>
              <p className="text-gray-900 font-semibold">{serviceInfo.user}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Provider:</p>
              <p className="text-gray-900 font-semibold">
                {serviceInfo.provider}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment Breakdown
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-900">Provider Amount:</span>
              <span className="text-gray-900 font-medium">
                ${payment.providerAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-900">
                Platform Commission ({payment.platformCommissionPercent}%):
              </span>
              <span className="text-gray-900 font-medium">
                -${payment.platformCommission}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-900">
                User Pay-out ({payment.userPayoutPercent}%):
              </span>
              <span className="text-gray-900 font-medium">
                ${payment.userPayout.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center py-4 pt-6">
              <span className="text-gray-900 font-bold text-lg">
                Amount to Release:
              </span>
              <span className="text-gray-900 font-bold text-lg">
                ${payment.amountToRelease.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Review Notes */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Admin Review Notes
          </h2>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter review notes or reasons for holding payment..."
            className="w-full bg-blue-50 border-none rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
          />
        </div>

        {/* Warning Message */}
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-600 text-sm">
            Payment has been in escrow for 2 days. Standard review period is 3-5
            business days.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            disabled={isLoadingRefund}
            onClick={handleRefund}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Refund Payment ${data?.data.payment_breakdown.user_refund_amount}
          </button>
          <button
            onClick={handleCancel}
            className="bg-white border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingsPayment;
