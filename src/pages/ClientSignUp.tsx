/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import img from "../assets/images/login.png";
import logo from "../assets/images/logo.png";
import LargeTitle from "@/common/header/LargeTitle";
import CommonHeader from "@/common/header/CommonHeader";
import { LuUserRound } from "react-icons/lu";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterClientMutation } from "@/redux/featuresAPI/auth/auth.api";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

// Zod schema for validation
const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First Name must be required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().min(1, "Email must be required").email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    password: z
      .string()
      .min(1, "Password must be required")
      .min(8, "Password must be 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const ClientSignUp = () => {
  const [registerClient, { isLoading }] = useRegisterClientMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const payload = { ...data, role: "normal_user" }
    try {
      const result = await registerClient(payload).unwrap();
      console.log(result);
      if (result) {
        toast.success(result.message);
        reset();
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An unexpected error occurred during registration.");
    };
  };

  const inputClass = {
    input:
      "w-full bg-[#EFF6FF]/40 rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#EFF6FF] outline-none transition",
    label:
      "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[28px] block mb-2",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <CommonWrapper>
      <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-white w-full gap-10 lg:gap-20 py-6">
        {/* Left Section */}
        <div className="w-full flex flex-col gap-5 lg:w-1/2">
          <div className="flex justify-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-14" />
            </Link>
          </div>

          <div className="w-full flex justify-center lg:justify-start">
            <img
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full object-contain"
              src={img}
              alt="Illustration"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <LargeTitle className="mb-6">Client Registration</LargeTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CommonBorderWrapper className="!p-6 sm:!p-8 md:!p-10">
              <div>
                <CommonHeader className="font-medium mb-6 flex items-center gap-2 !text-lg sm:!text-xl">
                  <span>
                    <LuUserRound />
                  </span>
                  Personal Information
                </CommonHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* First Name */}
                  <div>
                    <label className={inputClass.label}>First name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      {...register("first_name")}
                      className={inputClass.input}
                    />
                    {errors.first_name && (
                      <p className={inputClass.error}>{errors.first_name.message}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className={inputClass.label}>Last name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      {...register("last_name")}
                      className={inputClass.input}
                    />
                    {errors.last_name && (
                      <p className={inputClass.error}>{errors.last_name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={inputClass.label}>Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      {...register("phone_number")}
                      className={inputClass.input}
                    />
                    {errors.phone_number && (
                      <p className={inputClass.error}>{errors.phone_number.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={inputClass.label}>Email Address</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      {...register("email")}
                      className={inputClass.input}
                    />
                    {errors.email && (
                      <p className={inputClass.error}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className={inputClass.label}>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city")}
                      className={inputClass.input}
                    />
                    {errors.city && (
                      <p className={inputClass.error}>{errors.city.message}</p>
                    )}
                  </div>

                  {/* Area */}
                  <div>
                    <label className={inputClass.label}>Area</label>
                    <input
                      type="text"
                      placeholder="Area"
                      {...register("area")}
                      className={inputClass.input}
                    />
                    {errors.area && (
                      <p className={inputClass.error}>{errors.area.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className={inputClass.label}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                        className={inputClass.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      >
                        {showPassword ? <Eye size={18} className="cursor-pointer text-gray-500" /> : <EyeOff size={18} className="cursor-pointer text-gray-500" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className={inputClass.error}>{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className={inputClass.label}>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        {...register("confirm_password")}
                        className={inputClass.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      >
                        {showConfirmPassword ? <Eye size={18} className="cursor-pointer text-gray-500" /> : <EyeOff size={18} className="cursor-pointer text-gray-500" />}
                      </button>
                    </div>
                    {errors.confirm_password && (
                      <p className={inputClass.error}>
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CommonBorderWrapper>

            {/* Submit Button */}
            <div className="pt-6">
              {/* <CommonButton
                type="submit"
                className="mb-5 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </CommonButton> */}

              <CommonButton
                type="submit"
                disabled={isLoading}
                className={` w-full
                  !px-8 !py-3.5
                  !bg-blue-600 !text-white
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  ${isLoading ? "opacity-70 blur-[0.3px] cursor-not-allowed" : ""}
                `}
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </CommonButton>

              <CommonHeader className="text-center text-sm text-gray-600 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </CommonHeader>
            </div>
          </form>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default ClientSignUp;
