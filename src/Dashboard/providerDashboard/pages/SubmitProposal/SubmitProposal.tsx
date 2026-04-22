import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import {
  useGetSingleJobsQuery,
  useSubmitProposalMutation,
} from "@/redux/featuresAPI/providerAPI/jobs/jobs.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  jobProposalSchema,
  type JobProposalFormValues,
} from "./jobProposalSchema";

const SubmitProposal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetSingleJobsQuery(Number(id), {
    skip: !id,
  });

  const [submitProposal, { isLoading }] = useSubmitProposalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobProposalFormValues>({
    resolver: zodResolver(jobProposalSchema),
    defaultValues: {
      job: id ? Number(id) : undefined,
      cover_letter: "",
      proposed_budget: 0,
      estimated_duration: "",
    },
  });

  const onSubmit = async (values: JobProposalFormValues) => {
    try {
      await submitProposal({ id: Number(id), data: values }).unwrap();
      toast.success("Proposal submitted successfully");
      navigate(-1);
    } catch (error) {
      console.error("Failed to submit proposal", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="my-5">
      {/* Page Title */}
      <div className="mb-6">
        <div onClick={handleCancel} className="flex cursor-pointer">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Submit Proposal
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Create a compelling proposal for this job
        </p>
      </div>

      {/* Service Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Service Details
        </h2>
        <div className="flex gap-4">
          <img
            src={
              data?.image_url ||
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
            }
            alt="Service"
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{data?.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {data?.location?.full_address}
            </p>
            <p className="text-sm text-gray-600">
              Posted by : {data?.client_info?.name}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Budget:</span> $
            {data?.budget_display}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Timeline:</span> Any day this week
            works
          </p>
        </div>
      </div>

      {/* Pricing & Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          Pricing & Timeline
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Pay by the hour with an agreed hourly rate
        </p>

        {/* Budget */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Budget <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              {...register("proposed_budget", { valueAsNumber: true })}
              className="w-full pl-8 pr-20 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              /hour
            </span>
          </div>
          {errors.proposed_budget && (
            <p className="text-red-500 text-xs mt-1">
              {errors.proposed_budget.message}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Timeline
          </label>
          <input
            type="text"
            {...register("estimated_duration")}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="4 Hours"
          />
        </div>
      </div>

      {/* About Service */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">
          About Service
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Introduce yourself and explain why you're the right fit
        </p>
        <textarea
          {...register("cover_letter")}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          rows={5}
          placeholder="Write your proposal here"
        />
        {errors.cover_letter && (
          <p className="text-red-500 text-xs mt-1">
            {errors.cover_letter.message}
          </p>
        )}
      </div>

      {/* Optional UI Sections (UI only) */}
      {["Your Approach", "Why Choose Me?", "Questions for Client"].map(
        (title) => (
          <div
            key={title}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-4"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              {title} (Optional)
            </h2>
            <textarea
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={5}
              placeholder="Optional"
            />
          </div>
        ),
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <CommonButton onClick={handleCancel}> Cancel</CommonButton>
        <CommonButton
          className="!bg-blue !text-white"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ButtonWithLoading title="Submitting..." />
          ) : (
            "Submit Proposal"
          )}
        </CommonButton>
      </div>
    </div>
  );
};

export default SubmitProposal;
