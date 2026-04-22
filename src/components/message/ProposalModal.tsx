import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { useCreteCustomProposalMutation } from "@/redux/featuresAPI/providerAPI/message/messageApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type ProposalFormData, proposalSchema } from "./proposalSchema";

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35 outline-none transition",
  label:
    "text-sm lg:text-base text-[#666] font-Geist leading-[24px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  chatThreadId: number;
}

const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  clientId,
  chatThreadId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      client_id: clientId,
      chat_thread_id: chatThreadId,
      proposal_title: "",
      cover_letter: "",
      proposed_budget: 0,
      estimated_duration: "",
      custom_terms: "",
      approach: "",
      why_choose_me: "",
    },
  });

  const [createCustomProposal, { isLoading }] =
    useCreteCustomProposalMutation();

  const onSubmit = async (data: ProposalFormData) => {
    try {
      const res = await createCustomProposal(data);

      // RTK Query returns { error } on failure instead of throwing
      if ("error" in res) {
        const errMsg =
          (res.error as { data?: { message?: string } })?.data?.message ||
          "Failed to send proposal. Please try again.";
        toast.error(errMsg);
        return; // keep modal open on failure
      }

      toast.success(res.data?.message || "Proposal created successfully");
      onClose(); // only close on success
    } catch (err) {
      console.error("Proposal submission error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Custom Proposal</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={inputClass.label}>Proposal Title</label>
            <input
              {...register("proposal_title")}
              className={inputClass.input}
              placeholder="Website Redesign Project"
            />
            {errors.proposal_title && (
              <p className={inputClass.error}>
                {errors.proposal_title.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Cover Letter</label>
            <textarea
              {...register("cover_letter")}
              className={inputClass.input}
              placeholder="Write your cover letter..."
            />
            {errors.cover_letter && (
              <p className={inputClass.error}>{errors.cover_letter.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Proposed Budget ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("proposed_budget", { valueAsNumber: true })}
              className={inputClass.input}
              placeholder="700"
            />
            {errors.proposed_budget && (
              <p className={inputClass.error}>
                {errors.proposed_budget.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Estimated Duration</label>
            <input
              {...register("estimated_duration")}
              className={inputClass.input}
              placeholder="2 weeks"
            />
            {errors.estimated_duration && (
              <p className={inputClass.error}>
                {errors.estimated_duration.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Custom Terms</label>
            <textarea
              {...register("custom_terms")}
              className={inputClass.input}
              placeholder="50% upfront payment, 50% on completion..."
            />
          </div>

          <div>
            <label className={inputClass.label}>Approach</label>
            <textarea
              {...register("approach")}
              className={inputClass.input}
              placeholder="React, Tailwind CSS, Django REST Framework..."
            />
          </div>

          <div>
            <label className={inputClass.label}>Why Choose Me</label>
            <textarea
              {...register("why_choose_me")}
              className={inputClass.input}
              placeholder="5 years experience in full-stack development..."
            />
          </div>

          <CommonButton
            disabled={isLoading}
            type="submit"
            className="bg-black text-white"
          >
            {isLoading ? (
              <ButtonWithLoading title="Submitting..." />
            ) : (
              "Submit Proposal"
            )}
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default ProposalModal;
