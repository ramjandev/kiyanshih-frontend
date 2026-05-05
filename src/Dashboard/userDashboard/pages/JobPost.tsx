/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import CommonWrapper from "@/common/space/CommonWrapper";
import CommonButton from "@/common/button/CommonButton";

import UserSectionHeader from "../userComponents/reuseable/UserSectionHeader";
import PostingSidebar from "../userComponents/jobPosting/PostingSidebar";
import JobDetails from "../userComponents/jobPosting/form/JobDetails";
import SelectCategory from "../userComponents/jobPosting/form/SelectCategory";
import JobSchedule from "../userComponents/jobPosting/form/JobSchedule";
import Budget from "../userComponents/jobPosting/form/Budget";
import Preview from "../userComponents/jobPosting/form/Preview";

import { useCreateJobPostMutation, useGetMyJobPostByIdQuery, useUpdateJobPostMutation } from "@/redux/featuresAPI/userAPI/myJobs.api";

export type TJobPostPayload = {
  title: string;
  description: string;
  category: string;
  sub_category: string[];
  city: string;
  street_address: string;
  house_address: string;
  date: string;
  preferred_time: string;
  budget: number;
  image_url: File | null;
  budget_type: "fixed" | "quote";
  previewUrl?: string;
};

const JobPost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const { id } = useParams();
  const [createJobPost, { isLoading: isCreating }] =
    useCreateJobPostMutation();
  const [updateJobPost, { isLoading: isUpdating }] =
    useUpdateJobPostMutation();

  const isPosting = isCreating || isUpdating;

  const { data: jobData, isLoading: isJobLoading } = useGetMyJobPostByIdQuery(id, {
    skip: !id,
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState<TJobPostPayload>({
    title: "",
    description: "",
    image_url: null,
    previewUrl: "",
    category: "Home Improvement",
    sub_category: [],
    city: "",
    street_address: "",
    house_address: "",
    date: "",
    preferred_time: "",
    budget: 200,
    budget_type: "fixed",
  });

  useEffect(() => {
    if (jobData) {
      setFormData({
        title: jobData.title || "",
        description: jobData.description || "",
        image_url: null, // Don't set file from URL
        previewUrl: jobData.image_url || "",
        category: jobData.category || "Home Improvement",
        sub_category: jobData.sub_category ? jobData.sub_category.split(", ") : [],
        city: jobData.city || "",
        street_address: jobData.street_address || "",
        house_address: jobData.house_address || "",
        date: jobData.deadline ? new Date(jobData.deadline).toISOString().split("T")[0] : "",
        preferred_time: jobData.preferred_time || "",
        budget: Number(jobData.budget) || 0,
        budget_type: jobData.budget_type || "fixed",
      });
    }
  }, [jobData]);

  const updateFormData = (data: Partial<TJobPostPayload>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  /* ---------- POST JOB ---------- */
  const handlePostJob = async () => {
    try {
      const formDataToSend = new FormData();

      // Append image file if exists
      if (formData.image_url instanceof File) {
        formDataToSend.append("image", formData.image_url);
      }

      // Format date for backend (MM/DD/YYYY)
      let formattedDate = formData.date;
      if (formData.date && formData.date.includes("-")) {
        const [year, month, day] = formData.date.split("-");
        formattedDate = `${month}/${day}/${year}`;
      }

      const jsonData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        sub_category: formData.sub_category.join(", "),
        service_category: [formData.category, ...formData.sub_category],
        city: formData.city,
        street_address: formData.street_address,
        house_address: formData.house_address,
        date: formattedDate,
        preferred_time: formData.preferred_time,
        budget: Number(formData.budget) || 0,
        budget_type: formData.budget_type,
      };

      formDataToSend.append("data", JSON.stringify(jsonData));

      let res;
      if (id) {
        res = await updateJobPost({ id, data: formDataToSend }).unwrap();
      } else {
        res = await createJobPost({ data: formDataToSend }).unwrap();
      }
      console.log("job post response data", res);

      toast.success(res?.message || (id ? "Job updated successfully!" : "Job posted successfully!"));
      navigate("/user-dashboard/my-jobs");
    } catch (error: any) {
      console.error("Post Job Error:", error);
      
      const errorData = error?.data;
      if (errorData && typeof errorData === "object") {
        // If it's a validation error object (e.g. { image: ["..."], title: ["..."] })
        Object.entries(errorData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((msg: string) => toast.error(`${key}: ${msg}`));
          } else if (typeof value === "string") {
            toast.error(value);
          }
        });
      } else {
        toast.error(errorData?.message || errorData?.error || "Failed to post job");
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((p) => p + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1);
  };

  if (isJobLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="h-12 w-12 rounded-full border-4 border-[#1D4ED8] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <CommonWrapper>
      <div className="pt-10">
        <UserSectionHeader
          title={id ? "Edit Your Job Post" : "Post a Job in Minutes"}
          subtitle={id ? "Review and update your job details to find the best professional." : "Post a job, receive proposals, and hire the right professional with confidence."}
        />
      </div>

      <div className="flex items-start gap-8 pb-10 pt-6">
        <div className="w-[300px]">
          <PostingSidebar
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>

        <div className="w-full border border-border rounded-[10px] px-10 py-5">
          {currentStep === 1 && (
            <JobDetails
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 2 && (
            <SelectCategory
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 3 && (
            <JobSchedule
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 4 && (
            <Budget
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 5 && (
            <Preview
              formData={formData}
              onPostJob={handlePostJob}
              isPosting={isPosting}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep !== totalSteps && (
            <div className="py-10 flex gap-5">
              {currentStep !== 1 && (
                <CommonButton
                  className="!bg-[#475569] !text-white"
                  onClick={handlePreviousStep}
                >
                  Previous
                </CommonButton>
              )}

              <CommonButton
                className="!bg-[#0F172A] !text-white"
                onClick={handleNextStep} 
              >
                Next Step
              </CommonButton>
            </div>
          )}
        </div>
      </div>
    </CommonWrapper>
  );
};
 
export default JobPost;
