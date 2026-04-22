import type { CombinedFormData } from "@/Dashboard/providerDashboard/pages/servicePosting/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCalendarDays } from "react-icons/lu";
import { z } from "zod";
import MultiStepAction from "./MultiStepAction";

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35 outline-none transition",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",
  error: "text-red-500 text-sm mt-1",
  inputError: "border-red-500",
};

// Define Zod schema - Fix the conflicting max values
const serviceFormSchema = z.object({
  service_inclusions: z
    .array(z.string().min(1, "Service inclusion cannot be empty"))
    .min(1, "At least one service inclusion is required")
    .max(10, "Maximum 10 service inclusions allowed"),

  images: z
    .array(z.instanceof(File))
    .min(3, "At least three images are required")
    .max(10, "Maximum 10 images allowed"),
});

// Infer TypeScript type from Zod schema
type ServiceFormData = z.infer<typeof serviceFormSchema>;

interface ServiceDetailsProps {
  updateServiceDetails: (data: CombinedFormData["serviceDetails"]) => void;
  initialData: CombinedFormData["serviceDetails"];

  currentStep: number;
  totalSteps: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  updateServiceDetails,
  initialData,

  currentStep,
  totalSteps,
  handleNextStep,
  handlePreviousStep,
}) => {
  const [serviceInputs, setServiceInputs] = useState<string[]>(
    initialData.service_inclusions || [
      "Basic cleaning service",
      "Basic cleaning service",
    ]
  );

  const [images, setImages] = useState<File[]>(initialData.images || []);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      service_inclusions: initialData.service_inclusions || [
        "Basic cleaning service",
        "Basic cleaning service",
      ],
      images: initialData.images || [],
    },
    mode: "onChange",
  });

  // Sync serviceInputs with form
  useEffect(() => {
    setValue("service_inclusions", serviceInputs, {
      shouldValidate: true,
    });
  }, [serviceInputs, setValue]);

  // Sync images with form
  useEffect(() => {
    setValue("images", images, {
      shouldValidate: true,
    });
  }, [images, setValue]);

  // Handle service input change
  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...serviceInputs];
    newServices[index] = value;
    setServiceInputs(newServices);
  };

  // Add new service
  const addService = () => {
    if (serviceInputs.length < 10) {
      const newServices = [...serviceInputs, ""];
      setServiceInputs(newServices);
    }
  };

  // Remove service
  const removeService = (index: number) => {
    if (serviceInputs.length > 1) {
      const newServices = serviceInputs.filter((_, i) => i !== index);
      setServiceInputs(newServices);
    }
  };

  // Handle multiple image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const totalImages = images.length + files.length;
    if (totalImages > 10) {
      alert("Maximum 10 images allowed. Please select fewer images.");
      return;
    }

    // Add new images
    const newImages = [...images, ...files];
    setImages(newImages);
  };

  // Remove single image
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Clear all images
  const clearAllImages = () => {
    setImages([]);
  };

  const onSubmit = async (data: ServiceFormData) => {
    console.log("Service details data:", data);

    try {
      const serviceDetailsData: CombinedFormData["serviceDetails"] = {
        service_inclusions: data.service_inclusions,
        images: data.images,
      };
      await updateServiceDetails(serviceDetailsData);
      if (currentStep < totalSteps) {
        handleNextStep();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <LuCalendarDays className="w-16 h-16 text-pink-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Service Details
        </h1>
        <p className="text-gray-600">
          The more details you add, the better your service will attract the
          right clients
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* What include in your service */}
        <div className="mb-8">
          <label className={inputClass.label}>
            What include in your service <span className="text-red-500">*</span>
          </label>

          {errors.service_inclusions && (
            <p className={inputClass.error}>
              {errors.service_inclusions.message}
            </p>
          )}

          <div className="space-y-3">
            {serviceInputs.map((service, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  className={`${inputClass.input} ${
                    errors.service_inclusions?.[index]
                      ? inputClass.inputError
                      : ""
                  }`}
                  placeholder="Enter service detail"
                />
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={serviceInputs.length === 1}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              disabled={serviceInputs.length >= 10}
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              Add Service
            </button>
            <p className="text-xs text-gray-500 mt-1">
              {serviceInputs.length} of 10 services added
            </p>
          </div>
        </div>

        {/* Upload Multiple Images */}
        <div className="mb-8">
          <label className={inputClass.label}>
            Upload Images <span className="text-red-500">*</span>
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Min 3, Max 10)
            </span>
          </label>

          {errors.images && (
            <p className={inputClass.error}>{errors.images.message}</p>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {images.length > 0 ? (
              <div>
                {/* Image Previews Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                      <div className="mt-2 text-xs text-gray-500 truncate">
                        {file.name} ({(file.size / 1024).toFixed(1)}KB)
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions for existing images */}
                <div className="flex gap-3 justify-center">
                  <label className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    Add More Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={images.length >= 10}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={clearAllImages}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <p
                  className={`mt-4 text-sm ${
                    images.length < 3 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {images.length} of 10 images selected{" "}
                  {images.length < 3 && `(Need ${3 - images.length} more)`}
                </p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please upload at least 3 images (Max 10)
                </p>
                <div className="flex gap-3 justify-center">
                  <label className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    Choose Files
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="px-6 py-2 text-gray-500">
                    No Files Chosen
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <MultiStepAction
          currentStep={currentStep}
          totalSteps={totalSteps}
          handlePreviousStep={handlePreviousStep}
          action={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ServiceDetails;
