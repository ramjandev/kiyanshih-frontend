import image from "@/assets/frame/p3.svg";
import InfoSection from "../InfoSection";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";
import image2 from "@/assets/images/f2.png";
import { FaRegEdit } from "react-icons/fa";
import CommonButton from "@/common/button/CommonButton";
import type { TJobPostPayload } from "../../../pages/JobPost";

interface PreviewProps {
  formData: TJobPostPayload;
  onPostJob: () => void;
  isPosting: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const benefits = [
  "Your job will be posted and visible to qualified professionals",
  "You'll receive quotes and proposals",
  "Review provider profiles, ratings, and proposals",
];

const Preview: React.FC<PreviewProps> = ({ formData, onPostJob, isPosting, setCurrentStep }) => {
  const handlePostJob = () => {
    onPostJob();
  };

  const jobDetails = [
    { label: "City name:", value: formData.city || "N/A" },
    { label: "Street Address:", value: formData.street_address || "N/A" },
    {
      label: "House Address:",
      value: formData.house_address || "N/A",
    },
    { label: "Date & Time:", value: `${formData.date || "N/A"}, ${formData.preferred_time || "N/A"}` },
  ];
  return (
    <div>
      <InfoSection
        image={image}
        title="Review Your Job Post"
        subtitle="Please review all details before posting your job. You can edit any section if needed."
      />

      <div className=" space-y-4">
        <div className=" rounded-[10px] border border-border p-5 space-y-4">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#2D2D2D]" />
              <CommonHeader className="!text-lg font-semibold !text-[#2D2D2D] ">
                Job Details
              </CommonHeader>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentStep(1)}
            >
              <FaRegEdit className="h-4 w-4" />
              <span className="sr-only">Edit job details</span>
            </Button>
          </div>

          <div>
            <MediumHeader className=" !mb-2 !text-[#2D2D2D] !font-medium">
              image
            </MediumHeader>

            <img src={formData.previewUrl || image2} className="object-cover h-32 w-32 rounded-md border border-border" />
          </div>

          <div className=" border-b border-border py-4">
            <MediumHeader className=" !text-[#2D2D2D] !font-medium">
              Job Title
            </MediumHeader>
            <CommonHeader className=" !text-[#2D2D2D] ">
              {formData.title || "N/A"}
            </CommonHeader>
          </div>

          <div>
            <MediumHeader className=" !text-[#2D2D2D] !font-medium">
              Description
            </MediumHeader>
            <CommonHeader className=" !font-normal !text-[#2D2D2D]">
              {formData.description || "N/A"}
            </CommonHeader>
          </div>
        </div>

        {/* Service Category Section */}
        <div className=" rounded-[10px] border border-border p-5 space-y-4">
          <div className="flex flex-row items-center justify-between ">
            <MediumHeader className=" !text-[#2D2D2D] !font-medium">
              Service Category
            </MediumHeader>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentStep(2)}
            >
              <FaRegEdit className="h-4 w-4" />
              <span className="sr-only">Edit service category</span>
            </Button>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {formData.sub_category && formData.sub_category.length > 0 ? (
                formData.sub_category.map((cat, index) => (
                  <CommonButton key={index}>{cat}</CommonButton>
                ))
              ) : (
                <span className="text-gray-400">No Services Selected</span>
              )}
            </div>
          </div>
        </div>

        {/* Location & Schedule Section */}
        <div className=" rounded-[10px] border border-border p-5 space-y-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <MediumHeader className=" !text-[#2D2D2D] !font-medium">
              Location & Schedule
            </MediumHeader>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentStep(3)}
            >
              <FaRegEdit className="h-4 w-4" />
              <span className="sr-only">Edit location and schedule</span>
            </Button>
          </div>
          <div className="space-y-3">
            {jobDetails.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[120px_1fr] gap-2">
                <CommonHeader className="!text-[#475569] !font-medium">
                  {item.label}
                </CommonHeader>
                <CommonHeader className="!text-[#09090B] !font-medium">
                  {item.value}
                </CommonHeader>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Section */}
        <div className=" rounded-[10px] border border-border p-5 space-y-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-4">
            <MediumHeader className=" !text-[#2D2D2D] !font-medium">
              Budget
            </MediumHeader>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentStep(4)}
            >
              <FaRegEdit className="h-4 w-4" />
              <span className="sr-only">Edit budget</span>
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              {formData.budget_type === "quote" ? "Get quotes From Professional" : "Fixed Budget"}
            </p>
            <CommonButton className="">{formData.budget_type === "quote" ? "Hourly Rate" : "Fixed Budget"}</CommonButton>
            <p className="text-sm text-muted-foreground">
              {formData.budget_type === "quote" ? `Maximum : $${formData.budget}/hour` : `Total Budget : $${formData.budget}`}
            </p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className=" rounded-[10px] border border-border p-5 bg-[#F6FAFF]">
          <div className="">
            <MediumHeader className=" !text-[#1D4ED8] !font-medium mb-2">
              What happens next?
            </MediumHeader>
            <ul className="space-y-2 text-sm text-foreground">
              {benefits.map((text, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <CommonHeader className="!text-[#2d2d2d] !font-medium">
                    {text}
                  </CommonHeader>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className=" py-10">
          <CommonButton
            onClick={handlePostJob}
            disabled={isPosting}
            className={`!bg-[#1D4ED8] w-[243px] !text-white flex items-center justify-center gap-2 ${isPosting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isPosting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Posting...
              </>
            ) : (
              "Post Job"
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Preview;
