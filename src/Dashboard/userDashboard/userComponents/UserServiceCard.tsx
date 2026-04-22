import total from "@/assets/cardImages/total.svg"
import bagred from "@/assets/cardImages/bagred.svg"
import bggreen from "@/assets/cardImages/baggreen.svg"
import target from "@/assets/cardImages/target.svg"

interface UserServiceCardProps {
  icon: string
  count: string
  label: string
  bgColor: string
}

const UserServiceCard: React.FC<UserServiceCardProps> = ({ icon, count, label, bgColor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`${bgColor} p-2.5 sm:p-3 rounded-xl flex items-center justify-center`}>
          <img src={icon} alt={label} className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-[18px] font-semibold sm:font-medium text-gray-900 leading-none">
            {count}
          </h3>
          <p className="text-sm sm:text-[16px] text-[#4B5563] mt-1 sm:mt-1.5">{label}</p>
        </div>
      </div>
    </div>
  )
}

interface UserServiceDashboardProps {
  stats?: any; // You can replace 'any' with a more specific type based on your API response
}

const UserServiceDashboard: React.FC<UserServiceDashboardProps> = ({ stats }) => {
  const serviceData = [
    {
      id: 1,
      icon: total,
      count: stats?.total_services?.toString() || "0",
      label: "Total Services",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      icon: bagred,
      count: stats?.confirmed_services?.toString() || "0",
      label: "Confirm Services",
      bgColor: "bg-amber-50",
    },
    {
      id: 3,
      icon: bggreen,
      count: stats?.completed_services?.toString() || "0",
      label: "Completed Services",
      bgColor: "bg-emerald-50",
    },
    {
      id: 4,
      icon: target,
      count: stats?.cancelled_services?.toString() || "0",
      label: "Cancel Services",
      bgColor: "bg-cyan-100",
    },
  ]

  return (
    <div className="pb-4 md:pb-8 md:pt-3">
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {serviceData.map((service) => (
            <UserServiceCard
              key={service.id}
              icon={service.icon}
              count={service.count}
              label={service.label}
              bgColor={service.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserServiceDashboard;
