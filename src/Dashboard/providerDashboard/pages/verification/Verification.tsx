import DashboardCardSkeleton from "@/common/custom/DashboardCardSkeleton";
import { useGetVerificationDataQuery } from "@/redux/featuresAPI/providerAPI/upload/uploadDocumentsApi";
import { useState } from "react";
import BackgroundCheckPayment from "./BackgroundCheckPayment";
import UploadDocuments from "./UploadDocuments";
import VerificationFirstStep from "./VerificationFirstStep";
import VerificationInfo, { type ProfileFormData } from "./VerificationInfo";

const Verification = () => {
  const [step, setStep] = useState(1);
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const { data, isLoading } = useGetVerificationDataQuery();
  const [personalData, setPersonalData] = useState<ProfileFormData | null>(
    null,
  );

  return (
    <div>
      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        step === 1 &&
        data && <VerificationFirstStep onNext={handleNext} data={data} />
      )}
      {step === 2 && (
        <VerificationInfo
          onNext={handleNext}
          onPrev={handlePrev}
          setPersonalData={setPersonalData}
        />
      )}
      {step === 3 && (
        <UploadDocuments
          onNext={handleNext}
          onPrev={handlePrev}
          personalData={personalData}
        />
      )}
      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        step === 4 && data && <BackgroundCheckPayment data={data} />
      )}
    </div>
  );
};

export default Verification;
