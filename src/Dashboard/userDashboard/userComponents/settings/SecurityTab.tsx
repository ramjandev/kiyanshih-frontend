import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDeleteAccountMutation, usePasswordUpdateMutation } from "@/redux/featuresAPI/userAPI/settings.api"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "@/redux/featuresAPI/auth/auth.slice"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// ✅ Zod validation schema (using camelCase for form fields as per user's recent change)
const passwordUpdateSchema = z
    .object({
        old_password: z.string().min(1, "Old password is required"),
        new_password: z.string().min(8, "New password must be at least 8 characters"),
        confirm_password: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
    })

type PasswordUpdateForm = z.infer<typeof passwordUpdateSchema>

const SecurityTab = () => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordUpdate, { isLoading: isUpdating }] = usePasswordUpdateMutation();
    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

    const [deletePassword, setDeletePassword] = useState("");
    const [showDeletePassword, setShowDeletePassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PasswordUpdateForm>({
        resolver: zodResolver(passwordUpdateSchema),
    })

    const onSubmit = async (data: PasswordUpdateForm) => {
        try {
            // Map camelCase form fields to underscored strings expected by API
            const payload = {
                old_password: data.old_password,
                new_password: data.new_password,
                confirm_password: data.confirm_password,
            }
            const res = await passwordUpdate(payload).unwrap();
            if (res.success) {
                toast.success(res.message || "Password updated successfully");
                reset();
                dispatch(logout());
                navigate("/login");
            } else {
                toast.error(res.message || "Failed to update password");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong while updating password");
        }
    }

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            toast.error("Please enter your password to confirm");
            return;
        }

        try {
            const res = await deleteAccount({ password: deletePassword }).unwrap();
            if (res.success) {
                toast.success(res.message || "Account deleted successfully");
                dispatch(logout());
                navigate("/login");
            } else {
                toast.error(res.message || "Failed to delete account");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete account. Please check your password.");
        }
    }

    const handleCancel = () => {
        reset()
    }

    return (
        <div className="space-y-8">
            {/* Password Update Card */}
            <Card className="border-gray-300">
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <Label htmlFor="old-password">Your Old Password</Label>
                            <div className="relative">
                                <Input
                                    id="old-password"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="Enter your old password"
                                    {...register("old_password")}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showOldPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.old_password && (
                                <p className="text-sm text-red-600">{errors.old_password.message}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    {...register("new_password")}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showNewPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.new_password && (
                                <p className="text-sm text-red-600">{errors.new_password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your new password"
                                    {...register("confirm_password")}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showConfirmPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirm_password && (
                                <p className="text-sm text-red-600">{errors.confirm_password.message}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            >
                                {isUpdating ? "Updating..." : "Update Password"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 cursor-pointer"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border-gray-300">
                <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={isDeleting}
                                className="w-full bg-red-600 hover:bg-red-700 cursor-pointer"
                            >
                                {isDeleting ? "Deleting..." : "Delete Account"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="delete-password">Confirm your password</Label>
                                    <div className="relative">
                                        <Input
                                            id="delete-password"
                                            type={showDeletePassword ? "text" : "password"}
                                            placeholder="Enter your password to confirm"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowDeletePassword(!showDeletePassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showDeletePassword ? (
                                                <Eye className="h-5 w-5" />
                                            ) : (
                                                <EyeOff className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeletePassword("")}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    disabled={!deletePassword || isDeleting}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {isDeleting ? "Deleting..." : "Delete Account"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}

export default SecurityTab;
