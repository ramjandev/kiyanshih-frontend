import CommonWrapper from "@/common/space/CommonWrapper";

import MediumHeader from "@/common/header/MediumHeader";
import SubHeader from "@/Dashboard/Admin/common/SubHeader";
import SectionHeader from "@/common/header/SectionHeader";

interface StepProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}
interface FixListProps {
  title: string;
  subtitle?: string;
  line1: string;
  line2: string;
  className?: string;
  steps?: StepProps[];
}

const FixList: React.FC<FixListProps> = ({
  title,
  subtitle,
  line1,
  line2,
  className,
  steps,
}) => {
  return (
    <CommonWrapper>
      <section className={`bg-white pb-10  ${className}`}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-16">
            <SectionHeader title={title} subtitle={subtitle} />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-18">
            {steps?.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center flex flex-col items-center">
                  <div
                    className={` w-22.5 h-22.5 mb-10 rounded-[20px] flex items-center justify-center ${step.bgColor}`}
                  >
                    <img
                      className="w-7.5 h-7.5"
                      src={step.icon}
                      alt={step.title}
                    />
                  </div>

                  <MediumHeader className="!text-[22px] mb-4">
                    {step.title}
                  </MediumHeader>

                  <SubHeader className="!text-[#333] max-w-sm mx-auto">
                    {step.description}
                  </SubHeader>
                </div>

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={`hidden md:block absolute top-[40px] translate-x-[60%] px-4 `}
                  >
                    {index === 0 ? (
                      <img src={line1} alt="" />
                    ) : (
                      <img src={line2} alt="" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </CommonWrapper>
  );
};

export default FixList;
