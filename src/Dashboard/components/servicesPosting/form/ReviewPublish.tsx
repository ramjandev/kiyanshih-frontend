import type { CombinedFormData } from "@/Dashboard/providerDashboard/pages/servicePosting/type";
import { usePostingJobsMutation } from "@/redux/featuresAPI/providerAPI/jobs/jobs.api";
import { Edit2 } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MultiStepAction from "./MultiStepAction";

interface ReviewPublishProps {
  setCurrentStep: (step: number) => void;
  formData: CombinedFormData;
  currentStep: number;
  totalSteps: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const ReviewPublish: React.FC<ReviewPublishProps> = ({
  setCurrentStep,
  formData,
  currentStep,
  totalSteps,
  handlePreviousStep,
}) => {
  const { basicInfo, availability, serviceDetails } = formData;

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  // Helper function to get enabled days
  const enabledDays = availability.availability.filter((day) => day.enabled);
  const [jobPosting, { isLoading }] = usePostingJobsMutation();
  const navigate = useNavigate();
  const handlePublish = async () => {
    const { images, ...serviceDetailsWithoutImages } = serviceDetails;

    const finalData = {
      ...basicInfo,
      ...availability,
      serviceDetails: serviceDetailsWithoutImages,
    };

    console.log("Final data to submit:", finalData);

    try {
      const formData = new FormData();

      // send JSON WITHOUT images
      formData.append("data", JSON.stringify(finalData));

      // send images separately (multiple)
      images.forEach((file) => {
        formData.append("image", file);
      });

      const response = await jobPosting(formData).unwrap();
      toast.success(response.message);

      navigate("/provider-dashboard/job-listing");
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  return (
    <div className="bg-white">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <FaRegCircleCheck className="w-full h-full text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Publish
        </h2>
        <p className="text-gray-600">
          Review all details before publishing your service
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-6 pt-8">
        {/* Job Details */}
        <div className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-gray-400">📋</span> Job Details
            </h3>
            <button
              onClick={() => handleEdit(1)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Job Title
              </div>
              <div className="text-gray-900">
                {basicInfo.job_title || "Not specified"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Category
              </div>
              <div className="text-gray-900">
                {basicInfo.choose_category || "Not specified"}
                {basicInfo.specific_services &&
                  ` - ${basicInfo.specific_services}`}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Description
              </div>
              <div className="text-gray-900">
                {basicInfo.service_description || "No description provided"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                What You Get
              </div>
              <div className="text-gray-900">
                {basicInfo.what_you_get || "Not specified"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Base Price
              </div>
              <div className="text-gray-900">
                ${basicInfo.base_price || "0"} ({basicInfo.price_type})
              </div>
            </div>
          </div>
        </div>

        {/* Availability & Location */}
        <div className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              Availability & Location
            </h3>
            <button
              onClick={() => handleEdit(2)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Service Area
              </div>
              <div className="text-gray-900">
                {availability.service_area || "Not specified"}
              </div>
            </div>
            {enabledDays.length > 0 ? (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Availability Schedule
                </div>
                <div className="space-y-2">
                  {enabledDays.map((day, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-900">{day.day}</span>
                      <span className="text-gray-600">{day.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic">No availability set</div>
            )}
          </div>
        </div>

        {/* Service Details */}
        <div className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Service Details</h3>
            <button
              onClick={() => handleEdit(3)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="p-6">
            {/* Service Inclusions */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                What's Included
              </div>
              <div className="space-y-2">
                {serviceDetails.service_inclusions.length > 0 ? (
                  serviceDetails.service_inclusions.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-900">{service}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">
                    No services specified
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">
                Uploaded Images ({serviceDetails.images.length})
              </div>
              {serviceDetails.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {serviceDetails.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Service image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">No images uploaded</div>
              )}
            </div>
          </div>
        </div>

        <MultiStepAction
          currentStep={currentStep}
          totalSteps={totalSteps}
          handlePreviousStep={handlePreviousStep}
          action={handlePublish}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
};

export default ReviewPublish;
