import {
  ArrowRight,
  CheckCircle,
  Download,
  Home,
  Mail,
  Receipt,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PaymentDetails {
  transactionId: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  date: string;
  status: string;
  recipientName: string;
  recipientEmail: string;
  jobTitle: string;
  jobId: number;
}

const PaymentSuccessPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const paymentDetails: PaymentDetails = {
    transactionId: "TXN123456789ABC",
    amount: "200.00",
    currency: "USD",
    paymentMethod: "Visa ending in 4242",
    date: new Date().toISOString(),
    status: "completed",
    recipientName: "John Updated UP test",
    recipientEmail: "user@gmail.com",
    jobTitle: "Quaerat rerum repreh",
    jobId: 7,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadReceipt = () => {
    console.log("Downloading receipt...");
  };

  const handleEmailReceipt = () => {
    console.log("Emailing receipt...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 relative overflow-hidden">
      {/* Animated Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"][
                    Math.floor(Math.random() * 4)
                  ],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Success Icon and Message */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Your payment has been processed successfully
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-2xl shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-8 mb-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <Receipt className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-semibold text-gray-900">
                {paymentDetails.transactionId}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-bold text-2xl text-green-600">
                ${paymentDetails.amount} {paymentDetails.currency}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-900">
                {paymentDetails.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-900">
                {formatDate(paymentDetails.date)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {paymentDetails.status.charAt(0).toUpperCase() +
                  paymentDetails.status.slice(1)}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Job Title</span>
              <span className="font-semibold text-gray-900">
                {paymentDetails.jobTitle}
              </span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Job ID</span>
              <span className="font-semibold text-gray-900">
                #{paymentDetails.jobId}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-600">Recipient</span>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {paymentDetails.recipientName}
                </p>
                <p className="text-sm text-gray-500">
                  {paymentDetails.recipientEmail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)]"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>

          <button
            onClick={handleEmailReceipt}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] border border-gray-200"
          >
            <Mail className="w-5 h-5" />
            Email Receipt
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>
                A confirmation email has been sent to{" "}
                {paymentDetails.recipientEmail}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>
                The service provider will be notified about your payment
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>You can track your job progress in your dashboard</span>
            </li>
          </ul>
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
          Need help? Contact our support team at support@example.com
        </p>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
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
        
        .animate-fall {
          animation: fall linear forwards;
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

export default PaymentSuccessPage;
