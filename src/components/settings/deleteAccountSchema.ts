import { z } from "zod";

export const deleteAccountSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),

  confirm_text: z.literal("DELETE", {
    message: 'You must type "DELETE"',
  }),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
