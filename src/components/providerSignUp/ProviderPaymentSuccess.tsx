// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useVerifyProviderPaymentMutation } from "@/redux/featuresAPI/auth/auth.api";
// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProviderPaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const session_id = searchParams.get("session_id");

//   const [verifyPayment] = useVerifyProviderPaymentMutation();

//   useEffect(() => {
//     if (!session_id) {
//       toast.error("Invalid payment session");
//       return;
//     }

//     const verify = async () => {
//       try {
//         await verifyPayment({ session_id }).unwrap();
//         toast.success("Payment successful! Account activated.");
//         navigate("/login", { replace: true });
//       } catch (error: any) {
//         toast.error(error?.data?.message || "Payment verification failed");
//       }
//     };

//     verify();
//   }, [session_id]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-gray-600 text-lg">Verifying payment, please wait...</p>
//     </div>
//   );
// };

// export default ProviderPaymentSuccess;
