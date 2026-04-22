import { z } from "zod";
export const jobProposalSchema = z.object({
  job: z.number().int().positive("Job ID must be a positive number"),
  cover_letter: z
    .string()
    .min(20, "Cover letter must be at least 20 characters"),
  proposed_budget: z.number().positive("Budget must be greater than 0"),
  estimated_duration: z.string().min(1, "Estimated duration is required"),
});

export type JobProposalFormValues = z.infer<typeof jobProposalSchema>;
