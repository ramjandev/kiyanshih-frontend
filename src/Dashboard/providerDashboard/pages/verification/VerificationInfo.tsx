import CommonButton from "@/common/button/CommonButton";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Zod schema
export const profileSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  date_of_birth: z.string().min(2, "Date of birth is required"),
  street_address: z.string().min(3, "street address address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  phone_number: z.string().min(7, "phone_number number is required"),
  email: z.string().email("Invalid email address"),

  business_name: z.string().min(2, "Business name is required"),
  licence_number: z.string().min(2, "Licence number is required"),
  insurance_provider: z.string().min(2, "Insurance provider is required"),
  years_of_experience: z.number().min(0, "Years of experience is required"),
  about_service: z
    .string()
    .min(10, "Please provide details about your service"),

  background_check_consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to background checks",
  }),
  terms_of_service_agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

// ---------- Type ----------

export type ProfileFormData = z.infer<typeof profileSchema>;

interface Props {
  onNext: () => void;
  onPrev: () => void;
  setPersonalData: React.Dispatch<React.SetStateAction<ProfileFormData | null>>;
}

const VerificationInfo: React.FC<Props> = ({
  onNext,
  onPrev,
  setPersonalData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "Sarah",
      last_name: "Johnson",
      date_of_birth: "1990-05-15",
      street_address: "123 Main street_address",
      city: "Toronto",
      province: "Ontario",
      phone_number: "+16465368652",
      email: "sarah.johnson@example.com",

      business_name: "Sarah's Professional Services",
      licence_number: "LIC-2024-12345",
      insurance_provider: "ABC Insurance Company Ltd",
      years_of_experience: 5,
      about_service:
        "I am a professional service provider with over 5 years of experience in the industry. I specialize in providing high-quality services with a focus on customer satisfaction and attention to detail. My work is backed by proper licensing and comprehensive insurance coverage.",

      background_check_consent: true,
      terms_of_service_agreed: true,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setPersonalData(data);
    onNext();
  };

  const background_check_consent = watch("background_check_consent");
  const terms_of_service_agreed = watch("terms_of_service_agreed");

  const isNextDisabled = !background_check_consent || !terms_of_service_agreed;
  return (
    <div className="mb-10">
      <div className="mb-5">
        <h2 className="text-2xl text-slate-700 font-semibold">
          Verification Information
        </h2>
        <p className="text-lg text-slate-700">
          Provide your personal and business details for verification
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white shadow border border-slate-300 rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/** First Name */}
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                {...register("first_name")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.first_name && (
                <p className="text-sm text-red-600">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/** Last Name */}
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                {...register("last_name")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.last_name && (
                <p className="text-sm text-red-600">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/** Date of Birth */}
            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("date_of_birth")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.date_of_birth && (
                <p className="text-sm text-red-600">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            {/** street_address Address */}
            <div>
              <label className="text-sm font-medium">
                street_address Address
              </label>
              <input
                {...register("street_address")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.street_address && (
                <p className="text-sm text-red-600">
                  {errors.street_address.message}
                </p>
              )}
            </div>

            {/** City */}
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                {...register("city")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/** Province */}
            <div>
              <label className="text-sm font-medium">Province</label>
              <input
                {...register("province")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.province && (
                <p className="text-sm text-red-600">
                  {errors.province.message}
                </p>
              )}
            </div>

            {/** phone_number */}
            <div>
              <label className="text-sm font-medium">phone_number Number</label>
              <input
                {...register("phone_number")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.phone_number && (
                <p className="text-sm text-red-600">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/** Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                {...register("email")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white shadow border border-slate-300 rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Business Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business Name</label>
              <input
                {...register("business_name")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.business_name && (
                <p className="text-sm text-red-600">
                  {errors.business_name.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Licence Number</label>
              <input
                {...register("licence_number")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.licence_number && (
                <p className="text-sm text-red-600">
                  {errors.licence_number.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Insurance Provider</label>
              <input
                {...register("insurance_provider")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.insurance_provider && (
                <p className="text-sm text-red-600">
                  {errors.insurance_provider.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Years of Experience</label>
              <input
                type="number"
                {...register("years_of_experience")}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.years_of_experience && (
                <p className="text-sm text-red-600">
                  {errors.years_of_experience.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">About Service</label>
              <textarea
                {...register("about_service")}
                rows={4}
                className="mt-1 w-full rounded-md border border-blue-50 bg-[#EFF6FF66] px-3 py-2"
              />
              {errors.about_service && (
                <p className="text-sm text-red-600">
                  {errors.about_service.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="bg-white shadow border border-slate-300 rounded-lg p-5 space-y-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("background_check_consent")}
              className="mt-1 h-4 w-4 cursor-pointer"
            />
            <label className="text-sm text-gray-700">
              I consent to background checks and verification of the information
              provided
            </label>
          </div>
          {errors.background_check_consent && (
            <p className="text-sm text-red-600">
              {errors.background_check_consent.message}
            </p>
          )}

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("terms_of_service_agreed")}
              className="mt-1 h-4 w-4 cursor-pointer"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer">
                Certn Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.terms_of_service_agreed && (
            <p className="text-sm text-red-600">
              {errors.terms_of_service_agreed.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <CommonButton onClick={onPrev}>Back</CommonButton>
          <CommonButton
            disabled={isNextDisabled}
            type="submit"
            className="bg-black !text-white"
          >
            Next Step
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default VerificationInfo;
