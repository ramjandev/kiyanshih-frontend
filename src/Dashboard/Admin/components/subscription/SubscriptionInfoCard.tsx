import { useGetSubscriptionDetailsQuery } from "@/redux/featuresAPI/adminApi/businessManagement";
import { skipToken } from "@reduxjs/toolkit/query";
import { MapPin, X } from "lucide-react";
import React from "react";

interface SubscriptionInfoProps {
  selectedSubscriptionId: number | null;
  onClose?: () => void;
}

const SubscriptionInfoCard: React.FC<SubscriptionInfoProps> = ({
  selectedSubscriptionId,
  onClose,
}) => {
  const { data } = useGetSubscriptionDetailsQuery(
    selectedSubscriptionId ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-8 md:p-12 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 cursor-pointer right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {data?.data.provider_name || "Loading..."}
          </h1>
          <p className="text-gray-500 text-xl mb-4">{data?.data.service}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-lg">{data?.data.location}</span>
          </div>
        </div>

        {/* Subscription Badge */}
        <div className="mb-10">
          <span className="inline-block px-8 py-3.5 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full font-semibold text-lg shadow-lg">
            {data?.data.subscription_plan}
          </span>
        </div>

        {/* Subscription Details */}
        <div className="space-y-6">
          <div className="flex items-baseline gap-3">
            <span className="text-gray-900 font-semibold text-xl">
              Subscription buy date:
            </span>
            <span className="text-gray-700 text-xl">
              {data?.data.subscription_buy_date}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-gray-900 font-semibold text-xl">
              Subscription End date:
            </span>
            <span className="text-gray-700 text-xl">
              {data?.data.subscription_end_date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfoCard;
