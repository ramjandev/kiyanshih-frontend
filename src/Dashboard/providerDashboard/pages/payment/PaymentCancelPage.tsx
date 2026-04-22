import {
  ArrowLeft,
  CreditCard,
  HelpCircle,
  Home,
  RefreshCw,
  XCircle,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface JobDetails {
  jobId: number;
  jobTitle: string;
  amount: string;
  currency: string;
  recipientName: string;
}

const PaymentCancelPage: React.FC = () => {
  const jobDetails: JobDetails = {
    jobId: 7,
    jobTitle: "Quaerat rerum repreh",
    amount: "200.00",
    currency: "USD",
    recipientName: "John Updated UP test",
  };

  const cancelledAt = new Date().toISOString();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRetryPayment = () => {
    console.log("Retrying payment...");
  };

  const handleBackToJob = () => {
    console.log("Navigating back to job...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="w-full">
        {/* Cancel Icon and Message */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Payment Cancelled
          </h1>
          <p className="text-xl text-gray-600">
            Your payment was not completed
          </p>
        </div>

        {/* Cancellation Details Card */}
        <div className="bg-white rounded-2xl shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-8 mb-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Transaction Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className="px-4 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Cancelled
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Cancelled At</span>
              <span className="font-semibold text-gray-900">
                {formatDate(cancelledAt)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-2xl text-gray-900">
                ${jobDetails.amount} {jobDetails.currency}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Job Title</span>
              <span className="font-semibold text-gray-900">
                {jobDetails.jobTitle}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Job ID</span>
              <span className="font-semibold text-gray-900">
                #{jobDetails.jobId}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-600">Recipient</span>
              <span className="font-semibold text-gray-900">
                {jobDetails.recipientName}
              </span>
            </div>
          </div>
        </div>

        {/* Why Payment Failed */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">
                Why was my payment cancelled?
              </h3>
              <p className="text-orange-800 mb-3">
                Your payment may have been cancelled for several reasons:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>You chose to cancel the transaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Your payment session timed out</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>There was an issue with your payment method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Browser or network connectivity issues</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleRetryPayment}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)]"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Payment
          </button>

          <button
            onClick={handleBackToJob}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Job
          </button>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            No charges were made
          </h3>
          <p className="text-blue-800">
            Since your payment was cancelled, no charges have been applied to
            your payment method. You can retry the payment at any time or
            contact support if you need assistance.
          </p>
        </div>

        {/* Navigation Button */}
        <div className="text-center">
          <Link
            to="/provider-dashboard"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Having trouble? Contact our support team at support@example.com
        </p>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
};

export default PaymentCancelPage;
