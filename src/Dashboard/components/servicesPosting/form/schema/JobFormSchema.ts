import { z } from "zod";
export const JobFormSchema = z.object({
  job_title: z
    .string()
    .min(1, "Job title is required")
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),

  choose_category: z.string().min(1, "Category is required"),

  specific_services: z.string().optional(),

  service_description: z
    .string()
    .max(1000, "Service description must be less than 1000 characters")
    .optional(),

  what_you_get: z
    .string()
    .max(500, "What you get must be less than 500 characters")
    .optional(),

  base_price: z
    .string()
    .min(1, "Base price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Base price must be a valid positive number"
    )
    .refine(
      (val) => Number(val) <= 1000000,
      "Base price must be less than $1,000,000"
    ),

  price_type: z.enum(["hourly", "fixed"]),
});

// Infer TypeScript type from Zod schema
export type JobFormData = z.infer<typeof JobFormSchema>;
