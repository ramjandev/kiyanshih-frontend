import {
  useGetPaymentReviewForReleaseQuery,
  usePaymentReleaseMutation,
} from "@/redux/featuresAPI/adminApi/businessManagement";
import { X } from "lucide-react";

import { useState } from "react";
import { toast } from "react-toastify";
interface PaymentReleaseProps {
  setIsPaymentRelease: React.Dispatch<React.SetStateAction<boolean>>;
  paymentId: number | null;
}

const PaymentRelease: React.FC<PaymentReleaseProps> = ({
  setIsPaymentRelease,
  paymentId,
}) => {
  const [notes, setNotes] = useState("");

  const handleCancel = () => {
    setIsPaymentRelease(false);
  };
  const { data: paymentData } = useGetPaymentReviewForReleaseQuery(
    paymentId || 0,
    { skip: !paymentId, refetchOnMountOrArgChange: true }
  );
  const [paymentRelease, { isLoading: isReleasing }] =
    usePaymentReleaseMutation();
  console.log("paymentData", paymentData);

  const handleRelease = async () => {
    try {
      if (!paymentId) return;

      const res = await paymentRelease({
        id: paymentId,
        data: { admin_notes: notes },
      }).unwrap();

      toast.success(res?.message || "Payment released successfully");
      setIsPaymentRelease(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to release payment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Review Payment Release
            </h1>
            <p className="text-gray-600 mt-1">
              Verify completion and release payment to contractor
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Job Information Card */}
        <div className="bg-gray-50 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Job Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Job:</p>
              <p className="text-gray-900 font-semibold">
                {paymentData?.data?.service_information?.service_name}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Milestone:</p>
              <p className="text-gray-900 font-semibold">
                {paymentData?.data?.service_information?.provider_email}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">User:</p>
              <p className="text-gray-900 font-semibold">
                From: {paymentData?.data?.service_information?.customer}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Provider:</p>
              <p className="text-gray-900 font-semibold">
                {paymentData?.data?.service_information.provider}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment Breakdown
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-900">Provider Amount:</span>
              <span className="text-gray-900 font-semibold">
                $
                {paymentData?.data?.payment_breakdown.total_amount_paid_by_user}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-900">Platform Commission:</span>
              <span className="text-gray-900 font-semibold">
                $
                {
                  paymentData?.data?.payment_breakdown
                    .provider_payout_percentage
                }
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-900">Provider Pay-out :</span>
              <span className="text-gray-900 font-semibold">
                ${paymentData?.data?.payment_breakdown.amount_to_release}
              </span>
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold">
                  Amount to Release:
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  ${paymentData?.data?.payment_breakdown.amount_to_release}
                </span>
              </div>
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
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none"
          />
        </div>

        {/* Warning Message */}
        <div className="mt-4 bg-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700 text-sm">
            Payment has been in escrow for 2 days. Standard review period is 3-5
            business days.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            disabled={!notes || isReleasing}
            onClick={handleRelease}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors  cursor-pointer disabled:opacity-50"
          >
            Release Payment $
            {paymentData?.data?.payment_breakdown.amount_to_release}
          </button>
          <button
            onClick={handleCancel}
            className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentRelease;
