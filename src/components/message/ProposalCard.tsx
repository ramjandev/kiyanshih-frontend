import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import {
  useAcceptCustomProposalMutation,
  usePostPaymentCustomProposalMutation,
  useRejectCustomProposalMutation,
  useVerifyPaymentCustomProposalMutation,
} from "@/redux/featuresAPI/providerAPI/message/messageApi";
import type { CustomProposalMessage } from "@/redux/featuresAPI/providerAPI/message/types/singleUser";
import React from "react";
import { toast } from "react-toastify";
interface ProposalCardProps {
  proposal: CustomProposalMessage;
  isProvider: boolean;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  isProvider,
}) => {
  // accept proposal or reject and  payment

  const [acceptProposal, { isLoading: isAcceptLoading }] =
    useAcceptCustomProposalMutation();
  const [rejectProposal, { isLoading: isRejectLoading }] =
    useRejectCustomProposalMutation();
  const [postPayment, { isLoading: isPaymentLoading }] =
    usePostPaymentCustomProposalMutation();
  const [verifyPayment, { isLoading: isVerifyLoading }] =
    useVerifyPaymentCustomProposalMutation();
  const handleAcceptProposal = async (proposalId: number) => {
    try {
      // Accept the proposal
      await acceptProposal(proposalId);

      // Post payment
      const res = await postPayment(proposalId);

      toast.success(res?.data?.success || "Proposal accepted successfully");

      // If payment session exists, verify and redirect
      if (res?.data?.session_id) {
        await verifyPayment({ session_id: res.data.session_id });
        window.location.href = res.data.checkout_url;
      }
    } catch (error: any) {
      console.error("Error accepting proposal:", error);
      toast.error(error?.data?.message || "Failed to accept proposal");
    }
  };

  const handleRejectProposal = async (proposalId: number) => {
    try {
      await rejectProposal(proposalId);
      toast.success("Proposal rejected successfully");
    } catch (error: any) {
      console.error("Error rejecting proposal:", error);
      toast.error(error?.data?.message || "Failed to reject proposal");
    }
  };
  return (
    <div
      className={`bg-white shadow-md rounded-xl p-4 w-60 lg:w-md ${isProvider && "ml-auto"}  border border-gray-200 `}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
        <div>
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
            {proposal?.proposal_title}
          </h3>
          <p className="text-sm text-gray-500">
            by {proposal?.provider_info?.name}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            proposal.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : proposal.status === "accepted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {proposal?.status}
        </span>
      </div>

      <p className="text-gray-700 mb-2 text-wrap">{proposal?.cover_letter}</p>

      <div className="flex flex-col md:flex-row justify-between text-sm text-gray-600 mt-2">
        <span>💰 ${proposal?.proposed_budget}</span>
        <span>⏱ {proposal?.estimated_duration}</span>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Sent on {new Date(proposal?.timestamp).toLocaleDateString()}
      </p>
      {!isProvider && (
        <div className=" flex gap-2 pt-2 ">
          <CommonButton
            disabled={isAcceptLoading || isPaymentLoading || isVerifyLoading}
            onClick={() => handleAcceptProposal(proposal?.proposal_id)}
            className="!bg-blue !text-white"
          >
            {isAcceptLoading || isPaymentLoading || isVerifyLoading ? (
              <ButtonWithLoading title={"Accepting..."} />
            ) : (
              "Accept"
            )}
          </CommonButton>
          <CommonButton
            disabled={isRejectLoading}
            onClick={() => handleRejectProposal(proposal?.proposal_id)}
            className="bg-red-500 text-white"
          >
            {isRejectLoading ? (
              <ButtonWithLoading title={"Rejecting..."} />
            ) : (
              "Reject"
            )}
          </CommonButton>
        </div>
      )}
    </div>
  );
};

export default ProposalCard;
