import { useState, type FC } from "react";
import { Loader2 } from "lucide-react";
import type { TJob, JobProposal } from "@/redux/types/jobsType/jobsPost.type";
import { useGetMyJobPostProposalsByIdQuery, useProposalsAcceptCheckoutMutation, useProposalsAcceptMutation, useProposalsRejectMutation } from "@/redux/featuresAPI/userAPI/myJobs.api";
import CommonButton from "@/common/button/CommonButton";
import { toast } from "react-toastify";

interface JobProposalsProps {
  job: TJob;
  setViewProposals: React.Dispatch<React.SetStateAction<boolean>>;
  showActions?: boolean;
}

const JobProposals: FC<JobProposalsProps> = ({ job, showActions = true }) => {
  const { data: proposalsResponse, isLoading, isError } = useGetMyJobPostProposalsByIdQuery(job.id);
  const [acceptProposal, { isLoading: isAccepting, originalArgs: acceptArgs }] = useProposalsAcceptMutation();
  const [acceptProposalCheckout] = useProposalsAcceptCheckoutMutation();
  const [rejectProposal, { isLoading: isRejecting, originalArgs: rejectVars }] = useProposalsRejectMutation();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleAccept = async (id: number) => {
    setIsProcessingCheckout(true);
    try {
      // Step 1: Accept the proposal
      await acceptProposal({ id }).unwrap();

      // Step 2: Call checkout API to get payment URL
      const checkoutRes = await acceptProposalCheckout({ id }).unwrap();
      const checkoutData = checkoutRes?.data || checkoutRes;
      const sessionId = checkoutData?.session_id;
      const checkoutUrl = checkoutData?.checkout_url;

      if (sessionId && checkoutUrl) {
        // Store session_id for verification on return
        localStorage.setItem('proposal_session_id', sessionId);
        // Redirect to Stripe checkout
        window.location.href = checkoutUrl;
      } else {
        setIsProcessingCheckout(false);
        toast.info("Proposal accepted. Payment setup may be pending.");
        console.warn("Missing checkout info:", { checkoutRes, sessionId, checkoutUrl });
      }
    } catch (error: any) {
      setIsProcessingCheckout(false);
      // Determine if it was the accept step or checkout step that failed
      // Simple heuristic: if we are here, something failed. 
      // If acceptProposal failed, it throws. If acceptProposalCheckout failed, it throws.
      toast.error(error?.data?.message || error?.data?.detail || "Failed to process proposal. Please try again.");
      console.error("Process error:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await rejectProposal({ id }).unwrap();
      toast.success(res?.message || res?.detail || "Proposal declined successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.data?.detail || "Failed to decline proposal. Please try again.");
      console.error("Reject error:", error);
    }
  };


  // Render main content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p>Loading proposals...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-10 text-red-500">
          <p>Error loading proposals. Please try again later.</p>
        </div>
      );
    }

    const proposals = (proposalsResponse?.results || []).filter(
      (proposal: JobProposal) => proposal.status === "pending"
    );

    if (proposals.length === 0) {
      return (
        <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg">
          <p>No pending proposals for this job.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {proposals.map((proposal: JobProposal) => (
          <div key={proposal.id} className="bg-white border-t border-gray-100 pt-6 first:border-0 first:pt-0">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Avatar */}
              <img
                src={proposal.job_image || "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&q=80"}
                alt={proposal.provider_name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />

              <div className="flex-1 w-full">
                {/* Header Info */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-900">{proposal.provider_name}</h4>
                    <div className="flex items-center text-xs md:text-sm text-slate-500 gap-2 mt-1">
                    </div>
                  </div>
                </div>

                {/* Quote details */}
                <div className="flex items-center gap-4 text-sm mt-3 mb-4">
                  <div className="flex items-center text-sm md:text-base">
                    <span className="text-[#EA580C]">${proposal.proposed_budget}</span>
                  </div>
                  <div className="text-black text-sm md:text-base bg-gray-50 px-2 py-0.5 rounded">
                    {/* Check if duration already has a unit, otherwise default to Hours */}
                    {/\d+\s+[a-zA-Z]+/.test(proposal.estimated_duration || "")
                      ? proposal.estimated_duration
                      : `${proposal.estimated_duration} Hours`}
                  </div>
                  <div className="text-xs text-slate-400 ml-auto">
                    {/* Add proposal date */}
                    {proposal.created_at && (
                      <span>
                        {new Date(proposal.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* About */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-black mb-1">About Service</h5>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {proposal.cover_letter}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                  <div className="flex gap-3 w-full sm:w-auto">
                    {showActions ? (
                      <>
                        <CommonButton
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 h-auto text-sm cursor-pointer"
                          onClick={() => handleAccept(proposal.id)}
                          isLoading={isAccepting && (acceptArgs as any)?.id === proposal.id}
                          disabled={isAccepting || isRejecting || isProcessingCheckout}
                        >
                          Accept
                        </CommonButton>
                        <CommonButton
                          className="bg-[#B91C1C] hover:bg-red-800 text-white rounded-md px-6 py-2 h-auto text-sm cursor-pointer"
                          onClick={() => handleReject(proposal.id)}
                          isLoading={isRejecting && (rejectVars as any)?.id === proposal.id}
                          disabled={isAccepting || isRejecting || isProcessingCheckout}
                        >
                          Decline
                        </CommonButton>
                      </>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-6 text-sm font-medium">
                    <span className="text-slate-500 hover:text-blue-600 cursor-pointer underline decoration-transparent hover:decoration-blue-600 transition-all">
                      Message
                    </span>
                    <span className="text-slate-500 hover:text-blue-600 cursor-pointer underline decoration-transparent hover:decoration-blue-600 transition-all">
                      Profile
                    </span>
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      {/* Full Page Loader Overlay */}
      {isProcessingCheckout && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h3>
            <p className="text-slate-500 text-center">Please wait while we redirect you to the secure payment page.</p>
          </div>
        </div>
      )}

      {/* Render Content */}
      {renderContent()}
    </div>
  );
};

export default JobProposals;
