import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "@/redux/featuresAPI/providerAPI/payments/paymentAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const inputClass = {
  input:
    "w-full  bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35 outline-none transition focus:border-blue-500",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

const Availability = () => {
  const { data } = useGetSettingQuery();
  const availability = data?.settings.availability;

  const [updateSetting, { isLoading }] = useUpdateSettingMutation();

  const [timeRange, setTimeRange] = useState({
    start: "",
    end: "",
  });

  const [selectedDays, setSelectedDays] = useState<{
    [key: string]: boolean;
  }>({
    Saturday: false,
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  });

  // Initialize state when API data loads
  useEffect(() => {
    if (availability) {
      setTimeRange({
        start: availability.start_time || "",
        end: availability.end_time || "",
      });

      // Convert selected_days array to object
      const daysObj: { [key: string]: boolean } = {
        Saturday: false,
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
      };

      availability.selected_days.forEach((day) => {
        daysObj[day] = true;
      });

      setSelectedDays(daysObj);
    }
  }, [availability]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSave = async () => {
    // Convert selectedDays object to array
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([day, _]) => day) as (
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday"
    )[];

    const updatedAvailability = {
      start_time: timeRange.start,
      end_time: timeRange.end,
      selected_days: selectedDaysArray,
      weekend_availability: availability?.weekend_availability ?? false,
    };

    try {
      const res: any = await updateSetting({
        availability: updatedAvailability,
      }).unwrap();
      toast.success(res?.message || "Availability updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update availability");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-3 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
          Service Provider Availability Schedules
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-6 sm:mb-8">
          Using the current time, the system allows your availability to
          customers in app & web, enabling them to make successful bookings.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 rounded-[10px] bg-[#F8F9FA] p-4 sm:p-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Service Providing Time */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                Service Providing Time
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Choose time range when you want to provide services.
              </p>
            </div>

            {/* Weekend */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 mt-6 sm:mt-10 text-sm sm:text-base">
                Weekend
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Select the systems you want to temporarily deactivate for
                maintenance.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3 sm:space-y-4">
            {/* Time Range Inputs */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Select Time Range *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="relative">
                  <input
                    type="time"
                    value={timeRange.start}
                    onChange={(e) =>
                      setTimeRange((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className={inputClass.input}
                  />
                </div>
                <div className="relative">
                  <input
                    type="time"
                    value={timeRange.end}
                    onChange={(e) =>
                      setTimeRange((prev) => ({
                        ...prev,
                        end: e.target.value,
                      }))
                    }
                    className={inputClass.input}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 mb-2">
                {[
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                ].map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm lg:text-base"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDays[day] || false}
                      onChange={() => toggleDay(day)}
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>

              <label className="flex items-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm lg:text-base">
                <input
                  type="checkbox"
                  checked={selectedDays.Friday || false}
                  onChange={() => toggleDay("Friday")}
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>Friday</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CommonButton
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="mb-5 bg-blue-600 text-white transition disabled:opacity-50"
        >
          {isLoading ? <ButtonWithLoading title="Saving..." /> : "Save Changes"}
        </CommonButton>
      </div>
    </div>
  );
};

export default Availability;
