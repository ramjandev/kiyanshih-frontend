import image from "@/assets/frame/p2.svg";
import InfoSection from "../InfoSection";
import { Calendar } from "lucide-react";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";

import type { TJobPostPayload } from "../../../pages/JobPost";

interface JobScheduleProps {
  formData: TJobPostPayload;
  updateFormData: (data: Partial<TJobPostPayload>) => void;
}

const JobSchedule: React.FC<JobScheduleProps> = ({ formData, updateFormData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Section Data:", {
    //   city: formData.city,
    //   streetAddress: formData.street_address,
    //   houseAddress: formData.house_address,
    //   date: formData.date,
    //   time: formData.preferred_time,
    // });
  };

  const inputClass = {
    input:
      "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition",
    label:
      "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",
  };
  return (
    <div>
      <InfoSection
        image={image}
        title="Location & Schedule"
        subtitle="Let us know where the work needs to be done and when you'd like it completed."
      />

      <form onSubmit={handleSubmit} className="">
        <div className=" space-y-5">
          <div className="">
            <label htmlFor="city" className={inputClass.label}>
              City <span className="text-destructive">*</span>
            </label>
            <input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                updateFormData({ city: e.target.value })
              }
              className={inputClass.input}
            />
          </div>

          <div className="">
            <label htmlFor="streetAddress" className={inputClass.label}>
              Street Address <span className="text-destructive">*</span>
            </label>
            <input
              id="streetAddress"
              placeholder="123 Main Street, Ontario"
              value={formData.street_address}
              onChange={(e) =>
                updateFormData({ street_address: e.target.value })
              }
              className={inputClass.input}
            />
          </div>

          <div className="">
            <label htmlFor="houseAddress" className={inputClass.label}>
              House Address
            </label>
            <input
              id="houseAddress"
              placeholder="123 Main Street"
              value={formData.house_address}
              onChange={(e) =>
                updateFormData({ house_address: e.target.value })
              }
              className={inputClass.input}
            />
          </div>
        </div>

        <div className=" space-y-5 pt-5">
          <CommonHeader className="!text-xl!text-[#2D2D2D] font-semibold">
            Preferred Date & Time
          </CommonHeader>
          <div className="">
            <label htmlFor="date" className={inputClass.label}>
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) =>
                  updateFormData({ date: e.target.value })
                }
                className={inputClass.input}
              />
              <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="">
            <label htmlFor="time" className={inputClass.label}>
              Preferred Time
            </label>

            <CommonSelect
              value={formData.preferred_time}
              onValueChange={(value) =>
                updateFormData({ preferred_time: value })
              }
              item={
                [
                  { label: "Anytime", value: "anytime" },
                  { label: "Morning (8AM - 12PM)", value: "morning" },
                  { label: "Afternoon (12PM - 5PM)", value: "afternoon" },
                  { label: "Evening (5PM - 8PM)", value: "evening" },
                ] as const
              }
              className={inputClass.input}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSchedule;
