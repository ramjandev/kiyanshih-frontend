import CommonSelect from "@/common/custom/CommonSelect";
import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/featuresAPI/adminApi/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MultiStepAction from "./MultiStepAction";
import { JobFormSchema, type JobFormData } from "./schema/JobFormSchema";

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",
  error: "text-red-500 text-sm mt-1",
  inputError: "border-red-500",
};

const priceType = [
  { label: "Fixed", value: "fixed" },
  { label: "Hourly", value: "hourly" },
] as const;

// Infer TypeScript type from Zod schema

interface JobFormDataProps {
  updateBasicInfo: (data: JobFormData) => void;
  initialData: JobFormData;
  currentStep: number;
  totalSteps: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}
const BasicInformation: React.FC<JobFormDataProps> = ({
  updateBasicInfo,
  initialData,
  currentStep,
  totalSteps,
  handleNextStep,
  handlePreviousStep,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const formValues = watch();

  const onSubmit = async (data: JobFormData) => {
    await updateBasicInfo(data);

    if (currentStep < totalSteps) {
      handleNextStep();
    }

    try {
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Handle CommonSelect changes
  const handleSelectChange = (field: keyof JobFormData, value: string) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const { data } = useGetCategoryQuery({});
  const categoryData = data?.data.categories || [];
  const categoryOptions = categoryData.map((category) => ({
    label: category.category_name,
    value: category.category_name.toLowerCase().replace(/\s+/g, "_"),
    id: category.sl,
  }));

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: subCategory } = useGetSingleCategoryQuery(selectedId!, {
    skip: !selectedId,
  });

  const subCategoryData = subCategory?.data.subcategory_name || [];
  const specificServiceOptions = subCategoryData?.map((specificService) => ({
    label: specificService,
    value: specificService.toLowerCase().replace(/\s+/g, "_"),
  }));

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FileText className="w-full h-full text-[#DB2777]" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Post Your Job Details
            </h2>
            <p className="text-gray-600">
              The more details you add, the better your service will attract the
              right clients
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className={inputClass.label}>
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Kitchen cabinet installation"
                {...register("job_title")}
                className={`${inputClass.input} ${
                  errors.job_title ? inputClass.inputError : ""
                }`}
              />
              {errors.job_title && (
                <p className={inputClass.error}>{errors.job_title.message}</p>
              )}
            </div>

            {/* Choose Category */}
            <div>
              <label className={inputClass.label}>
                Choose Category <span className="text-red-500">*</span>
              </label>
              <CommonSelect
                value={formValues.choose_category}
                item={categoryOptions}
                onValueChange={(val) => {
                  handleSelectChange("choose_category", val);

                  const selectedCategory = categoryOptions.find(
                    (item) => item.value === val,
                  );

                  setSelectedId(selectedCategory?.id || null);
                }}
                className="w-full"
              />
              {errors.choose_category && (
                <p className={inputClass.error}>
                  {errors.choose_category.message}
                </p>
              )}
            </div>

            {/* Specific Service */}
            <div>
              <label className={inputClass.label}>Specific Service</label>
              <CommonSelect
                value={formValues.specific_services || ""}
                item={specificServiceOptions}
                onValueChange={(val) =>
                  handleSelectChange("specific_services", val)
                }
                className="w-full"
              />
              {errors.specific_services && (
                <p className={inputClass.error}>
                  {errors.specific_services.message}
                </p>
              )}
            </div>

            {/* Service Description */}
            <div>
              <label className={inputClass.label}>Service Description</label>
              <textarea
                placeholder="Kitchen cabinet installation"
                rows={4}
                {...register("service_description")}
                className={`${inputClass.input} ${
                  errors.service_description ? inputClass.inputError : ""
                }`}
              />
              {errors.service_description && (
                <p className={inputClass.error}>
                  {errors.service_description.message}
                </p>
              )}
            </div>

            {/* What you get */}
            <div>
              <label className={inputClass.label}>What you get ?</label>
              <textarea
                placeholder="Kitchen cabinet installation"
                rows={3}
                {...register("what_you_get")}
                className={`${inputClass.input} ${
                  errors.what_you_get ? inputClass.inputError : ""
                }`}
              />
              {errors.what_you_get && (
                <p className={inputClass.error}>
                  {errors.what_you_get.message}
                </p>
              )}
            </div>

            {/* Base Price */}
            <div>
              <label className={inputClass.label}>
                Base Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("base_price")}
                  className={`${inputClass.input} pl-8 ${
                    errors.base_price ? inputClass.inputError : ""
                  }`}
                />
              </div>
              {errors.base_price && (
                <p className={inputClass.error}>{errors.base_price.message}</p>
              )}
            </div>

            {/* Price Type */}
            <div>
              <label className={inputClass.label}>Price Type</label>
              <CommonSelect
                value={formValues.price_type}
                item={priceType}
                w={200}
                onValueChange={(val) => handleSelectChange("price_type", val)}
                className="w-full"
              />
              {errors.price_type && (
                <p className={inputClass.error}>{errors.price_type.message}</p>
              )}
            </div>

            <MultiStepAction
              currentStep={currentStep}
              totalSteps={totalSteps}
              handlePreviousStep={handlePreviousStep}
              action={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
