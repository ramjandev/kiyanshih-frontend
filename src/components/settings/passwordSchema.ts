import { z } from "zod";

export const passwordSchema = z
  .object({
    old_password: z.string().min(6, "Old password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
