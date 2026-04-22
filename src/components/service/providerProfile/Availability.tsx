import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";

const Availability = () => {
  const scheduleData = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const notes = [
    "Available for emergency calls outside regular hours",
    "Weekend appointments may have additional fees",
    "Response time may vary based on current workload",
  ];

  return (
    <div className="p-5 bg-white rounded-md border border-border">
      {/* Header */}
      <CommonHeader className=" !text-[#0A0A0A] ">Weekly Schedule</CommonHeader>

      {/* Schedule Table */}
      <div className="py-5 border-b border-border space-y-2">
        {scheduleData.map((item, index) => (
          <div
            key={item.day}
            className={`flex justify-between items-center    `}
          >
            <Paragraph className={`!text-[#0A0A0A] `}>{item.day}</Paragraph>
            <CommonHeader
              key={index}
              className={
                index === scheduleData.length - 1
                  ? "!text-[#717182]"
                  : "!text-[#0A0A0A]"
              }
            >
              {item.hours}
            </CommonHeader>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="pt-5">
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <Paragraph key={index} className="flex items-start text-[#717182]">
              <span className=" mr-2">•</span>
              {note}
            </Paragraph>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Availability;
