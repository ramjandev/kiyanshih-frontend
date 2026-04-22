/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { LuUserRound } from "react-icons/lu";
import { LuEye, LuEyeOff } from "react-icons/lu";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface PersonalInformationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const PersonalInformation = ({
  register,
  errors,
}: PersonalInformationProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass = {
    input:
      "w-full bg-[#EFF6FF]/40 rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#EFF6FF] outline-none transition pr-10",
    label:
      "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[28px] block mb-2",
    error: "text-red-500 text-sm mt-1",
    eyeIcon:
      "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer",
  };

  return (
    <div className="space-y-6">
      <CommonBorderWrapper className="!p-6 sm:!p-8 md:!p-10">
        <div>
          <CommonHeader className="font-medium mb-6 flex items-center gap-2 !text-lg sm:!text-xl">
            <LuUserRound />
            Personal Information
          </CommonHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* First Name */}
            <div>
              <label className={inputClass.label}>First name</label>
              <input
                type="text"
                placeholder="Your first name"
                {...register("firstName")}
                className={inputClass.input}
              />
              {errors.firstName && (
                <p className={inputClass.error}>
                  {errors.firstName.message as string}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className={inputClass.label}>Last name</label>
              <input
                type="text"
                placeholder="Your last name"
                {...register("lastName")}
                className={inputClass.input}
              />
              {errors.lastName && (
                <p className={inputClass.error}>
                  {errors.lastName.message as string}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={inputClass.label}>Phone</label>
              <input
                type="tel"
                placeholder="Your phone number"
                {...register("phone")}
                className={inputClass.input}
              />
              {errors.phone && (
                <p className={inputClass.error}>
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={inputClass.label}>Email Address</label>
              <input
                type="email"
                placeholder="Your email address"
                {...register("email")}
                className={inputClass.input}
              />
              {errors.email && (
                <p className={inputClass.error}>
                  {errors.email.message as string}
                </p>
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
                <p className={inputClass.error}>
                  {errors.city.message as string}
                </p>
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
                <p className={inputClass.error}>
                  {errors.area.message as string}
                </p>
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
                <span
                  className={inputClass.eyeIcon}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
              {errors.password && (
                <p className={inputClass.error}>
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={inputClass.label}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className={inputClass.input}
                />
                <span
                  className={inputClass.eyeIcon}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className={inputClass.error}>
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default PersonalInformation;







// import CommonHeader from "@/common/header/CommonHeader";
// import { LuUserRound } from "react-icons/lu";
// import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";

// const PersonalInformation = () => {
//   const inputClass = {
//     input:
//       "w-full bg-[#EFF6FF]/40 rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#EFF6FF] outline-none transition bg-[#EFF6FF]/40",
//     label:
//       "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[28px] block mb-2",
//   };

//   return (
//     <form className="space-y-6">
//       <CommonBorderWrapper className="!p-6 sm:!p-8 md:!p-10">
//         <div>
//           <CommonHeader className="font-medium mb-6 flex items-center gap-2 !text-lg sm:!text-xl">
//             <span>
//               <LuUserRound />
//             </span>
//             Personal Information
//           </CommonHeader>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//             {/* First Name */}
//             <div>
//               <label className={inputClass.label}>First name</label>
//               <input
//                 type="text"
//                 placeholder="First name"
//                 defaultValue="Sarah"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Last Name */}
//             <div>
//               <label className={inputClass.label}>Last name</label>
//               <input
//                 type="text"
//                 placeholder="Last name"
//                 defaultValue="Johnson"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className={inputClass.label}>Phone</label>
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 defaultValue="+1 (555) 123-4567"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className={inputClass.label}>Email Address</label>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 defaultValue="sarah.johnson@email.com"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* City */}
//             <div>
//               <label className={inputClass.label}>City</label>
//               <input
//                 type="text"
//                 placeholder="City"
//                 defaultValue="Canada"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Area */}
//             <div>
//               <label className={inputClass.label}>Area</label>
//               <input
//                 type="text"
//                 placeholder="Area"
//                 defaultValue="Trento"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className={inputClass.label}>Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className={inputClass.input}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className={inputClass.label}>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className={inputClass.input}
//               />
//             </div>
//           </div>
//         </div>
//       </CommonBorderWrapper>
//     </form>
//   );
// };

// export default PersonalInformation;
