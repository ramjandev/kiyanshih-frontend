import CommonSpace from "@/common/space/CommonSpace";
import CommonWrapper from "@/common/space/CommonWrapper";
import ProfileTop from "@/components/service/providerProfile/ProfileTop";
import ProviderReview from "@/components/service/providerProfile/ProviderReview";
import ServicesList from "@/components/service/providerProfile/ServicesList";

const ProviderProfileSetting = () => {
  return (
    <div>
      <CommonWrapper>
        <CommonSpace>
          <ProfileTop />
        </CommonSpace>
        <ServicesList />
        <ProviderReview />
      </CommonWrapper>
    </div>
  );
};

export default ProviderProfileSetting;
