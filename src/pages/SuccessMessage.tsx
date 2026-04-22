import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyProviderPaymentMutation } from "@/redux/featuresAPI/auth/auth.api";
import { PartyPopper, X } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/featuresAPI/auth/auth.slice";

const SuccessMessage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [verifyPayment] = useVerifyProviderPaymentMutation();
    const sessionId = searchParams.get("session_id");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const email = localStorage.getItem("user_email");
        const password = localStorage.getItem("user_password");

        // If missing required params, redirect back
        if (!sessionId || !email || !password) {
            navigate("/provider-signup");
            return;
        }

        const verify = async () => {
            try {
                await verifyPayment({ session_id: sessionId, email, password }).unwrap();

                // Clear temp storage
                localStorage.removeItem("stripe_session_id");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_password");

                // Auto logout to ensure fresh login
                dispatch(logout());

                setIsVerified(true);
            } catch (err) {
                console.error("Payment verification failed", err);
                navigate("/provider-signup");
            } finally {
                setIsLoading(false);
            }
        };

        verify();
    }, [sessionId, verifyPayment, navigate, dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8FAFC]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-700 animate-pulse">
                    Verifying payment...
                </p>
            </div>
        );
    }

    if (!isVerified) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-Geist">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                {/* Close Button */}
                <button
                    onClick={() => navigate("/login")}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Confetti Icon Circle */}
                <div className="mx-auto mb-8 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                    <PartyPopper className="w-12 h-12 text-yellow-400" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Congratulations ! Account Setup Complete!
                </h2>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                    Your payment for the Service Provider subscription has been successfully processed. You now have full access to the marketplace , Log in to your Dashboard now.
                </p>

                {/* Login Button */}
                <button
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-200 text-lg cursor-pointer"
                >
                    Log In to Dashboard
                </button>
            </div>
        </div>
    );
};

export default SuccessMessage;
