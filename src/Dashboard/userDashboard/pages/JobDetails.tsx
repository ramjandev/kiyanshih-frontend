import { useParams, useNavigate } from "react-router-dom";
import { FileText, Pencil, ArrowLeft } from "lucide-react";
import CommonWrapper from "@/common/space/CommonWrapper";
import CommonButton from "@/common/button/CommonButton";
import { useGetMyJobPostByIdQuery } from "@/redux/featuresAPI/userAPI/myJobs.api";
import Loader from "@/common/Loader";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetMyJobPostByIdQuery(id);
    console.log("data", data);


    const job = data as any;

    if (isLoading) return <Loader size={64} color="border-blue-600" />;
    if (!job) return <div className="text-center py-20">Job not found</div>;

    const isEditable = job.status === "open" || job.status === "active";

    return (
        <CommonWrapper className="py-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto overflow-hidden relative font-Geist">

                {/* Header / Config */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer flex items-center gap-2 text-slate-600 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                        <span>Back</span>
                    </button>

                    <div className="flex-1 text-center pr-12"> {/* pr-12 to offset the back button for centering title */}
                        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mx-auto mb-2 text-pink-500">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">View Your Job</h1>
                    </div>

                    {/* <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button> */}
                </div>

                <div className="p-8 space-y-8">
                    {/* Job Details Section */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                            <FileText className="w-5 h-5" />
                            Job Details
                        </div>
                        {job.status === "open" ? (
                            <span className="bg-[#FFF7ED] text-[#EA580C] px-4 py-1.5 rounded-full text-sm font-medium border border-[#FED7AA]">
                                Open
                            </span>
                        ) : (
                            <span className="bg-[#F0FDF4] text-[#16A34A] px-4 py-1.5 rounded-full text-sm font-medium border border-[#BBF7D0]">
                                {job.status_display || job.status}
                            </span>
                        )}
                    </div>

                    {/* Image */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">Image</h3>
                        <div className="w-32 h-32 rounded-xl overflow-hidden">
                            <img
                                src={job.image_url || "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=300&q=80"}
                                alt="Job"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2 border-b border-gray-100 pb-8">
                        <h3 className="text-lg font-bold text-slate-900">Job Title</h3>
                        <p className="text-slate-600">{job.title}</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 border-b border-gray-100 pb-8">
                        <h3 className="text-lg font-bold text-slate-900">Description</h3>
                        <p className="text-slate-600 leading-relaxed max-w-3xl">
                            {job.description}
                        </p>
                    </div>

                    {/* Service Category */}
                    <div className="space-y-4 border-b border-gray-100 pb-8">
                        <h3 className="text-lg font-bold text-slate-900">Service Category</h3>
                        <div className="flex gap-8">
                            <div className="border border-gray-200 rounded-lg px-4 py-3 min-w-[200px] text-slate-700">
                                {job.category}
                            </div>
                            {job.sub_category && (
                                <div className="flex items-center gap-2 text-slate-700">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                    {job.sub_category}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location & Schedule */}
                    <div className="space-y-4 border-b border-gray-100 pb-8">
                        <h3 className="text-lg font-bold text-slate-900">Location & Schedule</h3>
                        <div className="space-y-3 pl-1">
                            <div className="flex gap-2 text-slate-700">
                                <span className="font-medium text-blue-700 min-w-[100px]">City name:</span>
                                {job.city || "N/A"}
                            </div>
                            <div className="flex gap-2 text-slate-700">
                                <span className="font-medium text-blue-700 min-w-[100px]">Street Address:</span>
                                {job.location}
                            </div>
                            <div className="flex gap-2 text-slate-700">
                                <span className="font-medium text-blue-700 min-w-[100px]">Date & Time:</span>
                                {job.deadline ? new Date(job.deadline).toLocaleDateString() : "Any Time"}
                            </div>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-4 border-b border-gray-100 pb-8">
                        <h3 className="text-lg font-bold text-slate-900">Budget</h3>
                        <p className="text-sm font-semibold text-slate-800">Get quotes From Professional</p>

                        <div className="border border-gray-200 rounded-lg px-4 py-2 w-fit text-slate-700 mt-2">
                            {job.budget_type === "hourly" ? "Hourly Rate" : "Fixed Price"}
                        </div>

                        <p className="text-slate-700 mt-3">
                            Maximum : {job.budget_display || `$${Number(job.budget).toFixed(2)}`}{job.budget_type === "hourly" ? "/hour" : ""}
                        </p>
                    </div>

                    {/* Edit Button */}
                    {isEditable && (
                        <div className="pt-4">
                            <CommonButton
                                onClick={() => navigate(`/user-dashboard/edit-job/${job.id}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium"
                            >
                                <Pencil className="w-4 h-4" />
                                Edit your Job
                            </CommonButton>
                        </div>
                    )}

                </div>
            </div>
        </CommonWrapper>
    );
};

export default JobDetails;
