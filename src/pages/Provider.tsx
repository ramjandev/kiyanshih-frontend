import CommonWrapper from "@/common/space/CommonWrapper";
import PricingCards from "@/components/Provider/PricingCards";
import ProviderHeroSection from "@/components/Provider/ProviderHeroSection";
import ProviderMiniCard from "@/components/Provider/ProviderMiniCard";
import ProviderStep from "@/components/Provider/ProviderStep";
import TestimonialCarousel from "@/components/Provider/TestimonialCarousel";
import ReadyToHelp from "@/components/service/ReadyToHelp";
import CurveProvider from "@/components/Work/CurveProvider";
import Footer from "@/layout/Footer";
const Provider = () => {
  return (
    <div>
      <ProviderHeroSection />
      <ProviderStep />
      <ProviderMiniCard />
      <CurveProvider
        title="How It Works"
        subtitle="Start Earnings I Just Few Steps"
      />
      <PricingCards />
      <CommonWrapper>
        <TestimonialCarousel />
        <ReadyToHelp />
      </CommonWrapper>

      <Footer />
    </div>
  );
};

export default Provider;
