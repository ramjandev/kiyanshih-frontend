import { zodResolver } from "@hookform/resolvers/zod";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SlLocationPin } from "react-icons/sl";
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

// Define Availability type
const availabilitySchema = z.object({
  day: z.string(),
  enabled: z.boolean(),
  time: z
    .string()
    .regex(
      /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/,
      "Invalid time format (HH:MM-HH:MM)"
    ),
});

// Main form schema
const availabilityFormSchema = z.object({
  service_area: z
    .string()
    .min(1, "Service area is required")
    .min(2, "Service area must be at least 2 characters")
    .max(100, "Service area must be less than 100 characters"),

  availability: z
    .array(availabilitySchema)
    .min(1, "At least one day must be enabled"),
});

// Infer TypeScript types
type AvailabilityFormData = z.infer<typeof availabilityFormSchema>;

// Days of week
const daysOfWeek = [
  { day: "Monday", initialTime: "9:00-17:00" },
  { day: "Tuesday", initialTime: "9:00-17:00" },
  { day: "Wednesday", initialTime: "9:00-17:00" },
  { day: "Thursday", initialTime: "9:00-17:00" },
  { day: "Friday", initialTime: "9:00-17:00" },
  { day: "Saturday", initialTime: "10:00-14:00" },
  { day: "Sunday", initialTime: "10:00-14:00" },
];

// Initial availability data
const initialAvailability = daysOfWeek.map((day) => ({
  day: day.day,
  enabled: false,
  time: day.initialTime,
}));

interface AvailabilityProps {
  updateAvailability: (data: AvailabilityFormData) => void;
  initialData?: AvailabilityFormData;
  currentStep: number;
  totalSteps: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}
const Availability: React.FC<AvailabilityProps> = ({
  updateAvailability,
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
    reset,
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: initialData || {
      service_area: "",
      availability: initialAvailability,
    },
    mode: "onChange",
  });

  const availability = watch("availability");

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Ensure availability array is always populated
  useEffect(() => {
    if (!availability || availability.length === 0) {
      setValue("availability", initialAvailability, {
        shouldValidate: true,
      });
    }
  }, [availability, setValue]);

  const handleDayToggle = (index: number) => {
    // Ensure availability[index] exists
    if (!availability || !availability[index]) {
      const updatedAvailability = [...initialAvailability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        enabled: !updatedAvailability[index].enabled,
      };
      setValue("availability", updatedAvailability, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const newEnabled = !availability[index].enabled;
    setValue(`availability.${index}.enabled`, newEnabled, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleTimeChange = (index: number, newTime: string) => {
    // Ensure availability[index] exists
    if (!availability || !availability[index]) {
      const updatedAvailability = [...initialAvailability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        time: newTime,
      };
      setValue("availability", updatedAvailability, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    setValue(`availability.${index}.time`, newTime, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: AvailabilityFormData) => {
    console.log("Availability data:", data);

    try {
      await updateAvailability(data);
      if (currentStep < totalSteps) {
        handleNextStep();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Helper to check if any day is enabled
  const hasEnabledDays = availability?.some((day) => day?.enabled) || false;

  // Safe getter for availability item
  const getAvailabilityItem = (index: number) => {
    return (
      availability?.[index] ||
      initialAvailability[index] || { enabled: false, time: "9:00-17:00" }
    );
  };

  return (
    <div>
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
          <SlLocationPin className="w-full h-full text-pink-600" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Availability & Location
        </h2>
        <p className="text-gray-600">
          The more details you add, the better your service will attract the
          right clients
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Service Area */}
        <div>
          <label className={inputClass.label}>
            Service Area <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. New York, NY"
            {...register("service_area")}
            className={`${inputClass.input} ${
              errors.service_area ? inputClass.inputError : ""
            }`}
          />
          {errors.service_area && (
            <p className={inputClass.error}>{errors.service_area.message}</p>
          )}
        </div>
        {/* Availability */}
        <div>
          <label className={inputClass.label}>
            Availability <span className="text-red-500">*</span>
          </label>

          {!hasEnabledDays && errors.availability && (
            <p className={inputClass.error}>{errors.availability.message}</p>
          )}

          <div className="space-y-3">
            {daysOfWeek.map((dayObj, index) => {
              const item = getAvailabilityItem(index);
              return (
                <div
                  key={dayObj.day}
                  className={`flex items-center justify-between p-3 border rounded-md transition ${
                    item.enabled
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={dayObj.day}
                      checked={item.enabled}
                      onChange={() => handleDayToggle(index)}
                      className={`w-4 h-4 rounded focus:ring-blue-500 ${
                        item.enabled
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-300 border-gray-300"
                      }`}
                    />
                    <label
                      htmlFor={dayObj.day}
                      className={`text-sm font-medium ${
                        item.enabled ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {dayObj.day}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock
                      className={`w-4 h-4 ${
                        item.enabled ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    {item.enabled ? (
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) =>
                          handleTimeChange(index, e.target.value)
                        }
                        placeholder="HH:MM-HH:MM"
                        className={`text-sm px-2 py-1 border rounded ${
                          errors.availability?.[index]?.time
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        Not available
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
  );
};

export default Availability;
