import image1 from "@/assets/images/t1.png";
import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SubscriptionProvider } from "@/redux/featuresAPI/adminApi/types/booking";

interface EarningSectionProps {
  subscriptionProviders: SubscriptionProvider[];
}
const SubscriptionProviders: React.FC<EarningSectionProps> = ({
  subscriptionProviders,
}) => {
  return (
    <CommonBorderWrapper>
      <div className="flex flex-row items-center justify-between">
        <CommonHeader className="pb-5">Subscription Providers</CommonHeader>
        <Button variant="link" className="text-blue cursor-pointer p-0">
          View all
        </Button>
      </div>
      <div>
        <div className="space-y-4">
          {subscriptionProviders.map((provider, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12.5 w-12.5 !rounded-md">
                  <AvatarImage src={image1 || "/placeholder.svg"} />
                  <AvatarFallback>
                    {provider.provider_name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CommonHeader className="!leading-[20px] !text-sm !text-[#18181A]">
                    {provider.provider_name}
                  </CommonHeader>
                  <CommonHeader className="text-[#4B5864] !leading-[20px] !text-sm">
                    {provider.provider_name}
                  </CommonHeader>
                </div>
              </div>
              <div className="text-right">
                <CommonHeader className="!text-[#4B5864]">
                  {provider.bookings_completed}
                </CommonHeader>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default SubscriptionProviders;
