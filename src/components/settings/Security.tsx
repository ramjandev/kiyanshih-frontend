import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { useUpdatedPasswordMutation } from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { passwordSchema, type PasswordFormValues } from "./passwordSchema";
const verificationData = [
  {
    id: "background",
    title: "Background Check",
    subtitle: "Verified by Certn",
    validUntil: "15/01/2025",
    status: "verified",
  },
  {
    id: "identity",
    title: "Identity Verification",
    subtitle: "Verify Government ID",
    validUntil: "15/01/2025",
    status: "pending",
    actionLink: "/provider-dashboard/verification",
  },
];

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",

  error: "text-red-500 text-sm mt-1",
};
const Security = () => {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const [updatedPassword, { isLoading }] = useUpdatedPasswordMutation();
  const onSubmit = async (data: PasswordFormValues) => {
    // Backend payload (exact match)
    const payload = {
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    };
    const res = await updatedPassword(payload);
    toast.success(res?.data.message || "Password updated successfully");

    reset();
  };
  // delete account
  const [isDeleting, setIsDeleting] = useState(false);
  const handleClose = () => setIsDeleting(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Login & Security Setting
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Update Password</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Old Password */}
            <div>
              <label className={inputClass.label}>Your Old password</label>
              <div className="relative">
                <input
                  type={showPasswords.old ? "text" : "password"}
                  {...register("old_password")}
                  className={inputClass.input}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswords.old ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.old_password && (
                <p className={inputClass.error}>
                  {errors.old_password.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className={inputClass.label}>New password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  {...register("new_password")}
                  className={inputClass.input}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.new_password && (
                <p className={inputClass.error}>
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={inputClass.label}>Confirm password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  {...register("confirm_password")}
                  className={inputClass.input}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className={inputClass.error}>
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <CommonButton type="submit" className="!bg-blue-600 !text-white">
                {isLoading ? (
                  <ButtonWithLoading title="Updating..." />
                ) : (
                  "Update Password"
                )}
              </CommonButton>
              <CommonButton onClick={() => reset()}>Cancel</CommonButton>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Account Actions</h3>
          <CommonButton
            onClick={() => setIsDeleting(true)}
            className="!bg-red-600 !text-white"
          >
            Delete Account
          </CommonButton>
        </div>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 ">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-6">
          Verification
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          Enhance your credibility with verification
        </p>

        <div className="space-y-3 sm:space-y-4">
          {verificationData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.status === "verified"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {item.status === "verified" ? (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                    ) : (
                      <span className="text-gray-400 text-xs sm:text-sm">
                        ?
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">{item.subtitle}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Valid until {item.validUntil}
                    </p>
                  </div>
                </div>

                {item.status === "verified" ? (
                  <span className="self-start sm:self-auto px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[11px] sm:text-xs rounded whitespace-nowrap">
                    Verified
                  </span>
                ) : (
                  item.actionLink && (
                    <Link
                      to={item.actionLink}
                      className="self-start sm:self-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Verify now
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteModal open={isDeleting} onClose={handleClose} />
    </div>
  );
};

export default Security;
