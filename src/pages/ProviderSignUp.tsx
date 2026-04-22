/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import LargeTitle from "@/common/header/LargeTitle";
import CommonWrapper from "@/common/space/CommonWrapper";
import BusinessInformation from "@/components/providerSignUp/BusinessInformation";
import LeftImage from "@/components/providerSignUp/LeftImage";
import LoginSubmit from "@/components/providerSignUp/LoginSubmit";
import PersonalInformation from "@/components/providerSignUp/PersonalInformation";
import SimpleInformation from "@/components/providerSignUp/SimpleInformation";

import { useRegisterProviderMutation } from "@/redux/featuresAPI/auth/auth.api";

// ================= ZOD SCHEMA =================
const providerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(8, "Confirm password is required"),

    service: z.string().min(1, "Service is required"),
    subCategory: z.string().min(1, "Sub category is required"),
    customService: z.string().optional(),
    customSubCategory: z.string().optional(),

    serviceLocation: z.string().min(1, "Service location is required"),
    yearsExperience: z.string().min(1, "Years of experience is required"),

    business_logo: z.any(),
    aboutService: z.string().min(1, "About service is required"),
    plan: z.string().min(1, "Plan is required"),

    hourlyRate: z
      .number({
        message: "Hourly rate is required",
      })
      .nonnegative(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ProviderFormData = z.infer<typeof providerSchema>;

// ================= COMPONENT =================
const ProviderSignUp = () => {
  const [steps, setSteps] = useState(1);
  const [registerProvider, { isLoading }] = useRegisterProviderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      area: "",
      password: "",
      confirmPassword: "",
      service: "",
      subCategory: "",
      customService: "",
      customSubCategory: "",
      serviceLocation: "",
      yearsExperience: "",
      business_logo: null,
      aboutService: "",
      plan: "",
      hourlyRate: 0,
    },
  });

  // const formData = watch();

  // ================= FINAL SUBMIT =================
  const handleFinalSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email: data.email,
        city: data.city,
        area: data.area,
        password: data.password,
        confirm_password: data.confirmPassword,
        business_name: data.customService || data.service,
        business_description: data.aboutService,
        service_category: data.service,
        sub_category: data.subCategory,
        about_service: data.aboutService,
        service_location: data.serviceLocation,
        years_of_experience: Number(data.yearsExperience),
        pricing_model: data.hourlyRate ? "hourly" : "fixed",
        hourly_rate: data.hourlyRate || undefined,
        plan_tier: data.plan,
        role: "provider",
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(payload));

      if (data.business_logo) {
        formDataToSend.append("business_logo", data.business_logo);
      }

      const res = await registerProvider(formDataToSend).unwrap();

      if (res?.success) {
        toast.success(res.messages);
      }

      localStorage.setItem("stripe_session_id", res.session_id);
      localStorage.setItem("user_email", data.email);
      localStorage.setItem("user_password", data.password);
      window.location.href = res.checkout_url;
    } catch (err: any) {
      if (err?.data && typeof err.data === "object") {
        const backendErrors = err.data;
        const fieldMapping: Record<string, keyof ProviderFormData> = {
          first_name: "firstName",
          last_name: "lastName",
          phone_number: "phone",
          email: "email",
          city: "city",
          area: "area",
          password: "password",
          confirm_password: "confirmPassword",
          service_category: "service",
          sub_category: "subCategory",
          service_location: "serviceLocation",
          years_of_experience: "yearsExperience",
          about_service: "aboutService",
          plan_tier: "plan",
          hourly_rate: "hourlyRate",
        };

        let firstErrorStep = steps;

        Object.keys(backendErrors).forEach((key) => {
          const frontendKey = fieldMapping[key];
          if (frontendKey) {
            const message = Array.isArray(backendErrors[key])
              ? backendErrors[key][0]
              : backendErrors[key];

            setError(frontendKey, { type: "manual", message });

            // Determine which step to jump to
            if (
              [
                "firstName",
                "lastName",
                "phone",
                "email",
                "city",
                "area",
                "password",
                "confirmPassword",
              ].includes(frontendKey)
            ) {
              firstErrorStep = Math.min(firstErrorStep, 1);
            } else if (
              [
                "service",
                "subCategory",
                "serviceLocation",
                "yearsExperience",
                "aboutService",
              ].includes(frontendKey)
            ) {
              firstErrorStep = Math.min(firstErrorStep, 2);
            } else if (["plan", "hourlyRate"].includes(frontendKey)) {
              firstErrorStep = Math.min(firstErrorStep, 3);
            }
          }
        });

        if (firstErrorStep !== steps) {
          setSteps(firstErrorStep);
        }

        toast.error("Please fix the registration errors.");
      } else {
        toast.error(err?.data?.messages || "Registration failed");
      }
    }
  });

  // ================= RENDER =================
  return (
    <CommonWrapper>
      <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-white w-full gap-10 lg:gap-20 py-6">
        <LeftImage />

        <div className="w-full lg:w-1/2">
          {steps === 3 && (
            <LargeTitle className="mb-6 text-left">
              Simple and affordable pricing
            </LargeTitle>
          )}

          {steps === 1 && (
            <PersonalInformation register={register} errors={errors} />
          )}

          {steps === 2 && (
            <BusinessInformation
              register={register}
              setValue={setValue}
              errors={errors}
            />
          )}

          {steps === 3 && (
            <SimpleInformation
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          )}

          <LoginSubmit
            step={steps}
            setSteps={setSteps}
            onFinalSubmit={handleFinalSubmit}
            trigger={trigger}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default ProviderSignUp;

// import CommonWrapper from "@/common/space/CommonWrapper";
// import LargeTitle from "@/common/header/LargeTitle";
// import PersonalInformation from "@/components/providerSignUp/PersonalInformation";
// import LeftImage from "@/components/providerSignUp/LeftImage";
// import LoginSubmit from "@/components/providerSignUp/LoginSubmit";
// import { useState } from "react";
// import BusinessInformation from "@/components/providerSignUp/BusinessInformation";
// import SimpleInformation from "@/components/providerSignUp/SimpleInformation";

// const ProviderSignUp = () => {
//   const [steps, setSteps] = useState(1);
//   return (
//     <CommonWrapper>
//       <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-white w-full gap-10 lg:gap-20 py-6 ">
//         <LeftImage />

//         <div className="w-full lg:w-1/2">
//           {steps == 3 && (
//             <LargeTitle className="mb-6 text-left">
//               Provider Registration
//             </LargeTitle>
//           )}

//           {steps === 1 && <PersonalInformation />}
//           {steps === 2 && <BusinessInformation />}
//           {steps === 3 && <SimpleInformation />}
//           <LoginSubmit step={steps} setSteps={setSteps} />
//         </div>
//       </div>
//     </CommonWrapper>
//   );
// };

// export default ProviderSignUp;
