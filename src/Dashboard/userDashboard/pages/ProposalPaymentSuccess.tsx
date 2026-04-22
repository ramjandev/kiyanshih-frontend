import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle2, ChevronRight } from "lucide-react";
import { useProposalsAcceptCheckoutVerifyMutation } from "@/redux/featuresAPI/userAPI/myJobs.api";

const ProposalPaymentSuccess = () => {
    const navigate = useNavigate();
    const [verifyPayment, { isLoading: isVerifying, data: verificationData, isError, error }] = useProposalsAcceptCheckoutVerifyMutation();
    const [isValidSession, setIsValidSession] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');
        const storedSessionId = localStorage.getItem('proposal_session_id');

        const effectiveSessionId = sessionId || storedSessionId;

        if (effectiveSessionId) {
            setIsValidSession(true);
            const handleVerify = async () => {
                try {
                    const res = await verifyPayment({ session_id: effectiveSessionId }).unwrap();
                    console.log(res);
                    localStorage.removeItem('proposal_session_id');
                } catch (err) {
                    console.error("Verification failed:", err);
                }
            };
            handleVerify();
        } else {
            setIsValidSession(false);
        }
    }, [verifyPayment]);

    const handleDashboardClick = () => {
        navigate('/user-dashboard/my-jobs');
    };

    if (isVerifying) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8FAFC]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-700 animate-pulse">
                    Verifying your payment...
                </p>
            </div>
        );
    }

    if (!isValidSession || isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-Geist">
                <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-red-100">
                    <button
                        onClick={() => navigate('/user-dashboard/my-jobs')}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="mx-auto mb-6 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                        <X className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                    <p className="text-slate-600 mb-8">
                        {isError ? (error as any)?.data?.message || "We couldn't verify your payment. Please check your transaction or contact support." : "Invalid or expired session. Please return to your jobs dashboard."}
                    </p>
                    <button
                        onClick={() => navigate('/user-dashboard/my-jobs')}
                        className="w-full sm:w-auto px-10 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all cursor-pointer"
                    >
                        Return to My Jobs
                    </button>
                </div>
            </div>
        );
    }

    const escrowData = verificationData?.escrow_payment;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-Geist">
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header Decoration */}
                <div className="h-2 bg-blue-600 w-full" />

                <div className="p-8 md:p-10">
                    {/* Close Button */}
                    <button
                        onClick={handleDashboardClick}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Success Icon */}
                    <div className="mx-auto mb-6 w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Payment Confirmed!
                        </h2>
                        <p className="text-slate-500">
                            Your payment has been successfully verified and is now held in escrow.
                        </p>
                    </div>

                    {/* Payment Details Card */}
                    {escrowData && (
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Transaction Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm md:text-base">
                                    <span className="text-slate-600">Provider</span>
                                    <span className="font-semibold text-slate-900">{escrowData.provider_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm md:text-base">
                                    <span className="text-slate-600">Amount Paid</span>
                                    <span className="font-bold text-blue-600">${escrowData.amount}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm md:text-base">
                                    <span className="text-slate-600">Platform Fee</span>
                                    <span className="text-slate-900">${escrowData.platform_fee} ({escrowData.platform_fee_percentage}%)</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm md:text-base">
                                    <span className="text-slate-600">Status</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                                        {escrowData.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!escrowData && (
                        <div className="text-center p-6 bg-slate-50 rounded-2xl mb-8">
                            <p className="text-slate-600">Verification complete. You can now return to your dashboard.</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleDashboardClick}
                            className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Go to My Jobs
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
                    <p className="text-xs text-center text-slate-400">
                        A confirmation email has been sent to your primary email address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProposalPaymentSuccess;
