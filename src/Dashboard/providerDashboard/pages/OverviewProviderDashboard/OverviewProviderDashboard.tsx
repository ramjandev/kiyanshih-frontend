import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import type { TProviderOverviewStats } from "@/redux/types/providerType/overviewStats.type";
import {
  AlertTriangle,
  Eye,
  FileText,
  MessageSquare,
  ShieldCheck,
  Star,
} from "lucide-react";
import { TbPaperBag } from "react-icons/tb";

import { Link, useLocation } from "react-router-dom";
interface overProps {
  data?: TProviderOverviewStats;
  isLoading: boolean;
}

const OverviewProviderDashboard: React.FC<overProps> = ({
  data,
  isLoading,
}) => {
  const { pathname } = useLocation();
  const loadingArray = new Array(5).fill(null);
  const applicationProgress =
    data && data.monthly_application_limit > 0
      ? (data.current_month_applications / data.monthly_application_limit) * 100
      : 0;

  return (
    <div className="py-6 md:py-8">
      <div className="mx-auto space-y-6">
        {/* Application Limit Alert */}
        {data?.limit_reached && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-orange-800 font-semibold mb-1">
                  Application Limit Reached
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  You've reached your monthly limit of{" "}
                  {data.monthly_application_limit} applications. Upgrade to
                  unlimited to receive more client inquiries.
                </p>
                <Link to="/provider-dashboard/upgrade-plan">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                    Upgrade to Unlimited-$99/month
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {(pathname === "/provider-dashboard/overview" ||
          pathname === "/provider-dashboard/overview/") && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-800 font-semibold mb-1">
                  Get Verified by Certn
                </h3>
                <p className="text-blue-700 text-sm">
                  Boost your credibility and get 3x more bookings with
                  professional background verification
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading
            ? loadingArray.map((_, index) => (
                <DashboardCardSkeleton key={index} />
              ))
            : data && (
                <>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {data?.current_month_applications ?? 0}/
                          {data?.monthly_application_limit ?? 0}
                        </div>
                        <div className="text-sm text-gray-600">
                          Applications This Month
                        </div>
                      </div>
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${applicationProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {data?.completed_service_bookings ?? 0}/
                          {data?.total_bookings ?? 0}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Bookings served
                        </div>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Eye className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${data?.total_earnings ?? 0}
                        </div>
                        <div className="text-sm text-gray-600">
                          Revenue This Month
                        </div>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg">
                        <TbPaperBag className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {data?.provider_rating ?? 0}{" "}
                          <span className="text-lg text-gray-500">
                            ({data?.total_reviews ?? 0} reviews)
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Good Rating</div>
                      </div>
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {data?.total_applications ?? 0}
                        </div>
                        <div className="text-sm text-gray-600">
                          Submitted Proposals
                        </div>
                      </div>
                      <div className="bg-cyan-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-cyan-500" />
                      </div>
                    </div>
                  </div>
                </>
              )}
        </div>
      </div>
    </div>
  );
};

export default OverviewProviderDashboard;
