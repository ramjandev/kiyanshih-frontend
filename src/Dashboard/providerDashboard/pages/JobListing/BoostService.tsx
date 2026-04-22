import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import Spinner from "@/common/custom/Spinner";
import { timeAgo } from "@/help/dateConversion";
import {
  useJobDetailsQuery,
  useServiceBoastMutation,
} from "@/redux/featuresAPI/providerAPI/jobs/jobs.api";
import { Crown, MapPin, Zap } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface BoostOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

interface BoostHistory {
  jobTitle: string;
  location: string;
  budget: string;
  postedTime: string;
  image: string;
  boostType: string;
  boostCost: string;
  duration: string;
}

const BoostService = () => {
  const [selectedBoost, setSelectedBoost] = useState<string>("boost");
  const { id } = useParams();

  const { data: jobData, isLoading } = useJobDetailsQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });
  const [serviceBoast, { isLoading: isLoadingBoast }] =
    useServiceBoastMutation();

  const handleBoost = async () => {
    if (!id) return;

    try {
      const payload = {
        service_id: Number(id),
        boost_type: selectedBoost,
        duration_days: 7,
      };

      const res = await serviceBoast(payload);
      const checkoutUrl = res?.data?.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("Checkout URL not found");
      }
    } catch (error) {
      console.error("Error boosting service:", error);
    }
  };

  const boostOptions: BoostOption[] = [
    {
      id: "boost",
      name: "Boost",
      price: 9.0,
      duration: "7 days",
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      description:
        "Get more visibility and attract more clients to your listing.",
      features: [
        "2x more visibility in search results",
        "Highlighted in category listings",
        "Priority in client recommendations",
      ],
    },
    {
      id: "super_boost",
      name: "super_boost",
      price: 29.0,
      duration: "7 days",
      icon: <Crown className="w-5 h-5 text-purple-600" />,
      description:
        "Maximum exposure with exclusive platement and 5x more visibility in search results",
      features: [
        "5x more visibility in search results",
        "Top Position in category listings",
        "Priority in client recommendations",
      ],
    },
  ];

  const boostHistory: BoostHistory = {
    jobTitle: jobData?.title || "",
    location: jobData?.location.full_address || "",
    budget: jobData?.budget_display || "",
    postedTime: timeAgo(jobData?.created_at as string),
    image: jobData?.image_url || "",
    boostType: jobData?.budget_type || "Super Boost",
    boostCost: "29.00$",
    duration: "07 Days",
  };

  const selectedOption = boostOptions.find((opt) => opt.id === selectedBoost);
  const totalCost = selectedOption ? selectedOption.price.toFixed(2) : "0.00";
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Boost Service
          </h1>
          <p className="text-gray-600">
            Boost Your Service in Just a Few Clicks
          </p>
        </div>

        <div className="grid lg:grid-cols-3  gap-6 items-stretch">
          {/* Left Section - Boost Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Boost Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {boostOptions.map((option) => (
                <div
                  key={option.id}
                  className={`bg-white border-2 rounded-xl p-6 transition-all cursor-pointer ${
                    selectedBoost === option.id
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedBoost(option.id)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          option.id === "boost"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {option.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {option.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        $ {option.price.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">
                        / {option.duration}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {option.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Choose Duration */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Duration
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    checked={selectedBoost === "boost"}
                    onChange={() => setSelectedBoost("boost")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">Boost($ 9.0 /7 days)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    checked={selectedBoost === "super_boost"}
                    onChange={() => setSelectedBoost("super_boost")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">
                    Super Boost($ 29.0 /7 days) Card
                  </span>
                </label>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="lg:col-span-1 h-full">
              <div className="bg-white border border-gray-200 rounded-xl p-6 h-full ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Boost History
                </h3>

                {/* Job Card */}
                <div className="mb-6">
                  <div className="flex gap-3 mb-4">
                    <img
                      src={boostHistory.image}
                      alt={boostHistory.jobTitle}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {boostHistory.jobTitle}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3" />
                        {boostHistory.location}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Budget:{" "}
                        <span className="font-normal">
                          {boostHistory.budget}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        {boostHistory.postedTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {boostHistory.boostType}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {boostHistory.boostCost}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {boostHistory.duration}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {totalCost}$
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-10">
                  <CommonButton onClick={handleCancel}>Cancel</CommonButton>
                  <CommonButton
                    onClick={handleBoost}
                    className="!bg-gray-900 !text-white"
                  >
                    {isLoadingBoast ? (
                      <ButtonWithLoading title="Processing..." />
                    ) : (
                      "Boost Now"
                    )}
                  </CommonButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoostService;
