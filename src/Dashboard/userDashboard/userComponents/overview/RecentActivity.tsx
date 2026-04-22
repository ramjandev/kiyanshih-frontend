import UserSectionHeader from "../reuseable/UserSectionHeader";
import { GoDotFill } from "react-icons/go";
import { useGetAllMyJobsQuery, useLazyGetMyJobPostProposalsByIdQuery } from "@/redux/featuresAPI/userAPI/myJobs.api";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import type { JobProposal } from "@/redux/types/jobsType/jobsPost.type";
import CommonLoader from "@/common/CommonLoader";

const RecentActivity = () => {
  const { data: jobsResponse, isLoading: jobsLoading } = useGetAllMyJobsQuery(undefined);
  const [getProposals] = useLazyGetMyJobPostProposalsByIdQuery();
  const [allProposals, setAllProposals] = useState<JobProposal[]>([]);
  const [loadingProposals, setLoadingProposals] = useState(false);

  // This is a bit heavy, but since there's no global "all proposals" endpoint, 
  // we fetch proposals for each job to show "Recent Activity" accurately.
  useEffect(() => {
    const fetchAllProposals = async () => {
      if (!jobsResponse?.results || jobsResponse.results.length === 0) return;

      setLoadingProposals(true);
      try {
        // In a real app, you'd want a specific "recent activity" endpoint
        // For now, we'll just show activity from the most recent jobs
        const recentJobs = jobsResponse.results.slice(0, 5);
        const proposalsPromises = recentJobs.map(job => getProposals(job.id));

        const results = await Promise.all(proposalsPromises);
        const flattenedProposals: JobProposal[] = [];

        results.forEach(result => {
          if (result.data?.results) {
            // Filter strictly for pending/active proposals
            const activeProposals = result.data.results.filter(p => p.status === "pending");
            flattenedProposals.push(...activeProposals);
          }
        });

        // Sort by created_at descending
        const sorted = flattenedProposals.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setAllProposals(sorted.slice(0, 5));
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setLoadingProposals(false);
      }
    };

    fetchAllProposals();
  }, [jobsResponse, getProposals]);

  return (
    <div className="mb-10">
      <UserSectionHeader
        title="Recent Activity"
        subtitle="View your recent activity"
      />

      <div className="space-y-3">
        {jobsLoading || loadingProposals ? (
          <div className="py-10">
          <CommonLoader />
        </div>
        ) : allProposals.length > 0 ? (
          allProposals.map((proposal) => (
            <div key={proposal.id} className="w-full flex flex-col gap-1 border border-border rounded-md p-4 bg-white">
              <div className="flex items-center gap-2 font-medium text-sm text-gray-900">
                <span className="text-[#15803D]">
                  <GoDotFill />
                </span>
                New Proposal Received: "{proposal.job_title}"
              </div>
              <div className="text-[10px] text-gray-500 ml-5">
                From: {proposal.provider_name} • {formatDistanceToNow(new Date(proposal.created_at), { addSuffix: true })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md bg-gray-50">
            <p className="text-sm text-gray-500">No recent proposal activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
