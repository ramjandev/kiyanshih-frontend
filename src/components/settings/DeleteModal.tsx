import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { logout } from "@/redux/featuresAPI/auth/auth.slice";
import { useDeleteAccountMutation } from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  deleteAccountSchema,
  type DeleteAccountFormData,
} from "./deleteAccountSchema";

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",

  error: "text-red-500 text-sm mt-1",
};
interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteAccountModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
  });
  const dispatch = useAppDispatch();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const handleLogout = () => {
    dispatch(logout());
  };

  const onSubmit = async (data: DeleteAccountFormData) => {
    try {
      const res = await deleteAccount(data);
      toast.success(res.data.message);
      onClose();
      handleLogout;
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>

        <p className="mt-2 text-sm text-gray-600">
          This action is permanent. Please confirm to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* Password */}
          <div>
            <label className={inputClass.label}>Password</label>
            <input
              type="password"
              {...register("password")}
              className={inputClass.input}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={inputClass.error}>{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Text */}
          <div>
            <label className={inputClass.label}>
              Type <span className="font-semibold">DELETE</span> to confirm
            </label>
            <input
              type="text"
              {...register("confirm_text")}
              className={inputClass.input}
              placeholder="DELETE"
            />
            {errors.confirm_text && (
              <p className={inputClass.error}>{errors.confirm_text.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton
              disabled={isDeleting}
              type="submit"
              className="!text-white !bg-red-600"
            >
              {isDeleting ? (
                <ButtonWithLoading title="Deleting..." />
              ) : (
                "Delete Account"
              )}
            </CommonButton>
            <CommonButton onClick={onClose}>Cancel</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
