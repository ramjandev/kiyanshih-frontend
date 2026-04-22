import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { RecentBooking } from "@/redux/featuresAPI/adminApi/types/booking";

interface EarningSectionProps {
  recentBookings: RecentBooking[];
}
const RecentBookings: React.FC<EarningSectionProps> = ({ recentBookings }) => {
  return (
    <CommonBorderWrapper>
      <div className="flex flex-row items-center justify-between">
        <CommonHeader className="pb-5">Recent Bookings</CommonHeader>
        <Button variant="link" className="text-blue cursor-pointer p-0">
          View all
        </Button>
      </div>
      <div>
        <div className="space-y-4">
          {recentBookings.map((booking, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b border-border pb-3 last:border-0"
            >
              <Avatar className="h-12.5 w-12.5 !rounded-md">
                <AvatarImage
                  src={booking.customer_name || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {booking.customer_name || "/placeholder.svg"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <CommonHeader className="!leading-[20px] !text-sm !text-[#18181A]">
                  {booking.booking_id}
                </CommonHeader>
                <CommonHeader className="text-[#334155] !leading-[20px] !text-sm">
                  {booking.booking_date}
                </CommonHeader>
                <CommonHeader className="!text-xs text-[#64748B]">
                  Booked by {booking.customer_name}
                </CommonHeader>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonBorderWrapper>
  );
};
export default RecentBookings;
