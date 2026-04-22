import { z } from "zod";

export const proposalSchema = z.object({
  client_id: z.number(),
  chat_thread_id: z.number(),
  proposal_title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  cover_letter: z
    .string()
    .min(10, { message: "Cover letter must be at least 10 characters" }),
  proposed_budget: z
    .number()
    .min(1, { message: "Budget must be greater than 0" }),
  estimated_duration: z
    .string()
    .min(1, { message: "Estimated duration is required" }),
  custom_terms: z.string().min(1, { message: "Custom terms are required" }),
  approach: z.string().min(1, { message: "Approach is required" }),
  why_choose_me: z.string().min(1, { message: "Why choose me is required" }),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
