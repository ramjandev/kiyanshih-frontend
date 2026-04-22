import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import { type FC } from "react";

interface MultiStepActionProps {
  currentStep: number;
  totalSteps: number;
  handlePreviousStep: () => void;
  action: () => Promise<void> | void;
  isSubmitting?: boolean;
}

const MultiStepAction: FC<MultiStepActionProps> = ({
  currentStep,
  totalSteps,
  handlePreviousStep,
  action,
  isSubmitting = false,
}) => {
  const handleAction = async () => {
    try {
      await action();
    } catch (error) {
      console.error("Submission error:", error);
      // Don't navigate on error
    } finally {
    }
  };

  const isLoading = isSubmitting;

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {currentStep !== 1 && (
            <CommonButton
              className="!bg-[#475569] !text-white"
              onClick={handlePreviousStep}
              disabled={isLoading}
            >
              Previous
            </CommonButton>
          )}

          <CommonButton
            type="button"
            className={`${
              currentStep === totalSteps ? "!bg-blue-600" : "!bg-[#0F172A]"
            } !text-white`}
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonWithLoading title="Publishing..." />
            ) : currentStep === totalSteps ? (
              "Publish Service"
            ) : (
              "Next Step"
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MultiStepAction;
