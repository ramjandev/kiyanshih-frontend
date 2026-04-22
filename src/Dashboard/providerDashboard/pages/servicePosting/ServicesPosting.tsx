import CommonWrapper from "@/common/space/CommonWrapper";
import Availability from "@/Dashboard/components/servicesPosting/form/Availability";
import BasicInformation from "@/Dashboard/components/servicesPosting/form/BasicInformation";
import ReviewPublish from "@/Dashboard/components/servicesPosting/form/ReviewPublish";
import type { JobFormData } from "@/Dashboard/components/servicesPosting/form/schema/JobFormSchema";
import ServiceDetails from "@/Dashboard/components/servicesPosting/form/ServiceDetails";
import ServiceSidebar from "@/Dashboard/components/servicesPosting/ServiceSidebar";
import UserSectionHeader from "@/Dashboard/userDashboard/userComponents/reuseable/UserSectionHeader";
import { useState } from "react";
import type { CombinedFormData } from "./type";
const ServicesPosting = () => {
  const [formData, setFormData] = useState<CombinedFormData>({
    basicInfo: {
      job_title: "",
      choose_category: "",
      specific_services: "",
      service_description: "",
      what_you_get: "",
      base_price: "",
      price_type: "fixed",
    },
    availability: {
      service_area: "",
      availability: [],
    },
    serviceDetails: {
      service_inclusions: [],
      images: [],
    },
  });

  // Update functions for each form
  const updateBasicInfo = (data: JobFormData) => {
    setFormData((prev) => ({ ...prev, basicInfo: data }));
  };

  const updateAvailability = (data: CombinedFormData["availability"]) => {
    setFormData((prev) => ({ ...prev, availability: data }));
  };

  const updateServiceDetails = (data: CombinedFormData["serviceDetails"]) => {
    setFormData((prev) => ({ ...prev, serviceDetails: data }));
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(4);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <CommonWrapper>
      <div className="pt-10">
        <UserSectionHeader
          title="Post a Job in Minutes"
          subtitle="Post a job, receive proposals, and hire the right professional with confidence."
        />
      </div>

      <div className="flex items-start gap-8 pb-10 pt-6">
        <div className=" w-[350px]">
          <ServiceSidebar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="w-full border border-border rounded-[10px] px-10 py-5">
          {currentStep === 1 && (
            <BasicInformation
              updateBasicInfo={updateBasicInfo}
              initialData={formData.basicInfo}
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}
          {currentStep === 2 && (
            <Availability
              updateAvailability={updateAvailability}
              initialData={formData.availability}
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}
          {currentStep === 3 && (
            <ServiceDetails
              updateServiceDetails={updateServiceDetails}
              initialData={formData.serviceDetails}
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}
          {currentStep === 4 && (
            <ReviewPublish
              setCurrentStep={setCurrentStep}
              formData={formData}
              currentStep={currentStep}
              totalSteps={totalSteps}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}
        </div>
      </div>
    </CommonWrapper>
  );
};

export default ServicesPosting;
