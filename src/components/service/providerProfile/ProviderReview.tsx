import CommonSpace from "@/common/space/CommonSpace";
import Tablist from "@/Dashboard/Admin/components/booking/Tablist";
import UserSectionHeader from "@/Dashboard/userDashboard/userComponents/reuseable/UserSectionHeader";
import { useState } from "react";
import SingleProviderReview from "../SingleProvider/SingleProviderReview";
import Availability from "./Availability";
export type providerStatus = "Review" | "Availability";

const JobsTabs: providerStatus[] = ["Review", "Availability"];
const ProviderReview = () => {
  const [tab, setTab] = useState<providerStatus>("Review");

  return (
    <CommonSpace>
      <div>
        <UserSectionHeader title="Review & Availability" />

        <div>
          <Tablist<providerStatus>
            tabs={JobsTabs}
            activeTab={tab}
            setTab={setTab}
          />
        </div>

        <div>
          {tab === "Review" && <SingleProviderReview className="!hidden" />}
          {tab === "Availability" && <Availability />}
        </div>
      </div>
    </CommonSpace>
  );
};

export default ProviderReview;
