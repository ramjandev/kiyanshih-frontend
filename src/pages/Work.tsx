import CommonWrapper from "@/common/space/CommonWrapper";
import Price from "@/components/home/Price";
import ReadyToHelp from "@/components/service/ReadyToHelp";
import CurveProvider from "@/components/Work/CurveProvider";
import Trust from "@/components/Work/Trust";
import WorkCard from "@/components/Work/WorkCard";
import WorkHeroSection from "@/components/Work/WorkHeroSection";
import WorkSteps from "@/components/Work/WorkSteps";
import Footer from "@/layout/Footer";

const Work = () => {
  return (
    <div>
      <WorkHeroSection />
      <WorkSteps />
      <WorkCard />
      <CurveProvider
        title="For Providers"
        subtitle="Getting help has never been easier"
      />
      <Trust />
      <Price />
      <CommonWrapper className="sm:py-20">
        <ReadyToHelp />
      </CommonWrapper>
      <Footer />
    </div>
  );
};

export default Work;
