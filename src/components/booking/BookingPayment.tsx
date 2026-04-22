import type { FC } from "react";
import { useEffect } from "react";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";

interface BookingPaymentProps {
    nextStep: () => void;
    prevStep: () => void;
}

const BookingPayment: FC<BookingPaymentProps> = ({ nextStep }) => {

    // Simulate Stripe Redirect
    useEffect(() => {
        const timer = setTimeout(() => {
            nextStep();
        }, 3000); // 3 seconds delay to simulate payment processing/redirect

        return () => clearTimeout(timer);
    }, [nextStep]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            <div>
                <CommonHeader className="!text-2xl mb-2">Redirecting to Payment Gateway...</CommonHeader>
                <Paragraph>Please wait while we securely transfer you to Stripe to complete your payment.</Paragraph>
            </div>
            <div className="text-sm text-gray-400">
                (Simulation: This will auto-advance to the next step in 3 seconds)
            </div>

        </div>
    );
};

export default BookingPayment;
