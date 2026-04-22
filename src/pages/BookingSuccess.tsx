import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper, X } from "lucide-react";

const BookingSuccess = () => {
    const navigate = useNavigate();
    const [isValidSession, setIsValidSession] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');
        const storedSessionId = localStorage.getItem('booking_session_id');

        if (sessionId && storedSessionId && sessionId === storedSessionId) {
            setIsValidSession(true);
            localStorage.removeItem('booking_session_id');
        }
        setIsLoading(false);
    }, []);

    const handleHomeClick = () => {
        navigate('/user-dashboard/overview');
    };

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

    if (!isValidSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-Geist">
                <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                    <button
                        onClick={() => navigate('/user-dashboard/overview')}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <p className="text-red-500 font-medium mb-6 text-lg">Invalid or expired session.</p>
                    <button
                        onClick={() => navigate('/user-dashboard/overview')}
                        className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-200 text-lg cursor-pointer"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-Geist">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                {/* Close Button */}
                <button
                    onClick={handleHomeClick}
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
                    Booking Successful!
                </h2>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                    Your service has been booked successfully. We will contact you shortly.
                </p>

                {/* Dashboard Button */}
                <button
                    onClick={handleHomeClick}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-200 text-lg cursor-pointer"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;
