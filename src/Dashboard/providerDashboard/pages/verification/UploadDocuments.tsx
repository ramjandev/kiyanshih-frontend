import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import { useGetCategoryQuery } from "@/redux/featuresAPI/adminApi/categoryApi";
import { usePostPersonalDataMutation } from "@/redux/featuresAPI/providerAPI/upload/uploadDocumentsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiImageSquareBold } from "react-icons/pi";
import { toast } from "react-toastify";
import { z } from "zod";
import type { ProfileFormData } from "./VerificationInfo";

// ---------- Validation Schema ----------
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileSchema = z
  .custom<File>((val) => val instanceof File, { message: "File is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, "File must be under 10MB")
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Only PDF, JPG, PNG are allowed",
  );

const uploadSchema = z.object({
  service_category: z.string().min(1, "Service category is required"),
  govtId: fileSchema,
  businessLicence: fileSchema,
  insuranceCertificate: fileSchema,

  additionalCertificate: z
    .custom<File | undefined>()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File must be under 10MB",
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF, JPG, PNG are allowed",
    ),
});

type UploadFormData = z.infer<typeof uploadSchema>;

// ---------- File Upload Component ----------
interface FileUploadProps {
  label: string;
  description: string;
  required?: boolean;
  onChange: (file?: File) => void;
  error?: string;
  preview?: File | undefined;
}

function FileUploadField({
  label,
  description,
  required,
  onChange,
  error,
  preview,
}: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    preview ? URL.createObjectURL(preview) : null,
  );

  const handleFileChange = (file?: File) => {
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
    onChange(file);
  };

  return (
    <div className="space-y-2 flex items-center gap-6 h-full border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[120px] ">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="preview"
          className="max-h-32 object-contain rounded-md"
        />
      ) : (
        <div className="bg-[#E2E6EC] p-6 rounded-md">
          <PiImageSquareBold size={80} className="text-[#B2B9C4]" />
        </div>
      )}

      <div className=" flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col mb-5">
          <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <p className="text-xs text-gray-500 leading-snug break-words">
            {description}
          </p>
        </div>
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
          className="text-sm w-full file:mr-3 file:rounded-md file:border file:border-gray-300 
                     file:bg-white file:px-3 file:py-1.5 file:text-sm 
                     file:font-medium file:text-gray-700 hover:file:bg-gray-50 cursor-pointer"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// ---------- Main Form ----------
interface Props {
  onNext: () => void;
  onPrev: () => void;
  personalData: ProfileFormData | null;
}

const UploadDocuments: React.FC<Props> = ({ onNext, onPrev, personalData }) => {
  const [postPersonalData, { isLoading }] = usePostPersonalDataMutation();
  const { data: category } = useGetCategoryQuery({});

  const serviceCategoryOptions =
    category?.data?.categories?.map((cat) => ({
      label: cat.category_name,
      value: cat.category_name, // or slug/id if backend provides
    })) ?? [];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const watchedFields = watch();

  const onSubmit = async (data: UploadFormData) => {
    const { service_category } = data;
    const formData = new FormData();
    // Append required files
    [data.govtId, data.businessLicence, data.insuranceCertificate].forEach(
      (file) => {
        formData.append("documents", file); // safe, always defined
      },
    );

    // Optional file
    if (data.additionalCertificate) {
      formData.append("documents", data.additionalCertificate);
    }

    // Append personalData as JSON
    if (personalData) {
      const personalDataWithCategory = { ...personalData, service_category };
      formData.append("data", JSON.stringify(personalDataWithCategory));
    }

    try {
      const response = await postPersonalData(formData).unwrap();
      console.log("Uploaded successfully:", response);
      toast.success(response.message || "Documents uploaded successfully");
      onNext();
    } catch (error: any) {
      onNext();
      toast.error(
        error?.data?.error || "Verification already submitted and under review",
      );
    }
  };

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-slate-700">
            Upload Documents & Licenses
          </h2>
          <p className="text-lg text-gray-700">
            Upload your professional documents to complete verification. These
            help build trust with clients.
          </p>
        </div>

        <div className="border border-slate-300 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          All documents are securely stored and only used for verification
          purposes. You can upload additional certifications to showcase your
          expertise.
        </div>

        {/* Service Category */}
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium text-gray-700">
            Provide Services Category
          </label>

          <Controller
            name="service_category"
            control={control}
            render={({ field }) => (
              <CommonSelect
                value={field.value}
                onValueChange={field.onChange}
                item={serviceCategoryOptions}
                w={320}
                className="mt-1 w-full"
              />
            )}
          />

          {errors.service_category && (
            <p className="text-sm text-red-600">
              {errors.service_category.message}
            </p>
          )}
        </div>

        <h3 className="text-md font-semibold text-gray-700">
          Required Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <Controller
            control={control}
            name="govtId"
            render={({ field }) => (
              <FileUploadField
                label="Govt issue ID"
                description="Upload a clear photo of your driver’s license, passport, or ID card"
                required
                onChange={field.onChange}
                error={errors.govtId?.message}
                preview={watchedFields.govtId}
              />
            )}
          />
          <Controller
            control={control}
            name="businessLicence"
            render={({ field }) => (
              <FileUploadField
                label="Business licence"
                description="Municipal business license or registration"
                required
                onChange={field.onChange}
                error={errors.businessLicence?.message}
                preview={watchedFields.businessLicence}
              />
            )}
          />
          <Controller
            control={control}
            name="insuranceCertificate"
            render={({ field }) => (
              <FileUploadField
                label="Insurance Certificate"
                description="Liability insurance or bonding certificate"
                required
                onChange={field.onChange}
                error={errors.insuranceCertificate?.message}
                preview={watchedFields.insuranceCertificate}
              />
            )}
          />
          <Controller
            control={control}
            name="additionalCertificate"
            render={({ field }) => (
              <FileUploadField
                label="Additional Certificate (Optional)"
                description="Upload any additional certificates, awards, or credentials"
                onChange={field.onChange}
                error={errors.additionalCertificate?.message}
                preview={watchedFields.additionalCertificate}
              />
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <CommonButton onClick={onPrev}>Back</CommonButton>
          <CommonButton
            type="submit"
            className="bg-black !text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonWithLoading title="Uploading..." />
            ) : (
              "Continue to Payment"
            )}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default UploadDocuments;
