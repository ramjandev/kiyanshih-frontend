import CommonButton from "@/common/button/CommonButton";
import Spinner from "@/common/custom/Spinner";
import { useJobDetailsQuery } from "@/redux/featuresAPI/providerAPI/jobs/jobs.api";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const JobDetails: React.FC = () => {
  const { id } = useParams();

  const { data: jobData, isLoading } = useJobDetailsQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });

  // const jobData: JobData = {
  //   id: 7,
  //   title: "Quaerat rerum repreh",
  //   description: "Qui inventore aliqui",
  //   category: "Home Improvement",
  //   sub_category: "Roofing",
  //   location: {
  //     city: "Blanditiis qui elit",
  //     state: "NY",
  //     street_address: "Eu do similique dict",
  //     house_address: "Est itaque quo modi",
  //     full_address: "Blanditiis qui elit, NY",
  //   },
  //   budget: "200.00",
  //   budget_type: "fixed",
  //   budget_display: "$200.00/fixed",
  //   deadline: "1983-11-06",
  //   status: "open",
  //   image_url: null,
  //   created_at: "2026-01-05T03:30:57.013818Z",
  //   updated_at: "2026-01-05T03:30:57.013832Z",
  //   client_info: {
  //     id: 62,
  //     name: "John Updated UP test",
  //     email: "user@gmail.com",
  //     phone_number: "+17204587636",
  //   },
  //   has_applied: true,
  //   application_status: "pending",
  //   your_application: {
  //     proposal_id: 5,
  //     status: "pending",
  //     proposed_budget: "140.00",
  //     estimated_duration: "2 hours",
  //     cover_letter:
  //       "I have 10 years of experience in plumbing. I can complete this job within 2 hours with guaranteed quality work.",
  //     approach: null,
  //     why_choose_me: null,
  //     questions_for_client: null,
  //     submitted_at: "2026-01-11T02:36:38.464321Z",
  //     updated_at: "2026-01-11T02:36:38.464339Z",
  //   },
  //   total_applications: 1,
  //   can_apply: false,
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        jobData && (
          <div className="">
            <div className="">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {jobData.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {jobData.category}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {jobData.sub_category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          jobData.status,
                        )}`}
                      >
                        {jobData.status.charAt(0).toUpperCase() +
                          jobData.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{jobData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-semibold text-gray-900">
                        {jobData.budget_display}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(jobData.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">
                        {jobData.location.full_address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Applications</p>
                      <p className="font-semibold text-gray-900">
                        {jobData.total_applications}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {jobData.image_url && (
                <div className="mb-6">
                  <img
                    src={jobData.image_url}
                    alt={jobData.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className=" space-y-6">
                {jobData.has_applied && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold text-yellow-900">
                          Application Status
                        </h3>
                        <p className="text-sm text-yellow-700">
                          Your application is currently{" "}
                          {jobData.application_status}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {jobData.has_applied && jobData.your_application && (
                  <div className="bg-white rounded-lg shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Your Application
                    </h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Proposed Budget
                          </p>
                          <p className="font-semibold text-gray-900">
                            ${jobData.your_application.proposed_budget}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Estimated Duration
                          </p>
                          <p className="font-semibold text-gray-900">
                            {jobData.your_application.estimated_duration}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Cover Letter
                        </p>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                          {jobData.your_application.cover_letter}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          Submitted on{" "}
                          {formatDate(jobData.your_application.submitted_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Location Details
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Street:</span>{" "}
                      {jobData.location.street_address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">House:</span>{" "}
                      {jobData.location.house_address}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">City:</span>{" "}
                      {jobData.location.city}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">State:</span>{" "}
                      {jobData.location.state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 py-6">
                {/* Client Information */}
                <div className="bg-white rounded-lg shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Client Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold text-gray-900">
                          {jobData.client_info.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900 break-all">
                          {jobData.client_info.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">
                          {jobData.client_info.phone_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Metadata */}
                <div className="bg-white rounded-lg shadow-[0px_2px_4px_1px_rgba(0,0,0,0.1)] p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Job Details
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Job ID</p>
                      <p className="font-semibold text-gray-900">
                        #{jobData.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(jobData.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(jobData.updated_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Can Apply</p>
                      <p className="font-semibold text-gray-900">
                        {jobData.can_apply ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 flex  gap-3">
              <CommonButton className=" bg-blue-600! text-white!">
                <Link to={`/provider-dashboard/submit-proposal/${id}`}>
                  Apply Now
                </Link>
              </CommonButton>
              <CommonButton onClick={() => navigate(-1)}>Cancel</CommonButton>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default JobDetails;
