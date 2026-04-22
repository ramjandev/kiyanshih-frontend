import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";
import Paragraph from "@/common/header/Paragraph";
import SectionHeader from "@/common/header/SectionHeader";
import CommonSpace from "@/common/space/CommonSpace";
import CommonWrapper from "@/common/space/CommonWrapper";
import LearnHero from "@/components/Provider/learnore/LearnHero";
import ReadyToHelp from "@/components/service/ReadyToHelp";
import Footer from "@/layout/Footer";
import { BsFillInfoCircleFill } from "react-icons/bs";

// Features array
const features = [
  {
    title: "Fast Implementation",
    desc: "Get up and running quickly with our streamlined onboarding process and expert support team.",
    icon: <BsFillInfoCircleFill className="text-3xl text-[#2B7FFF]" />,
  },
  {
    title: "Secure & Reliable",
    desc: "Enterprise-grade security and 99.9% uptime guarantee to keep your business running smoothly.",
    icon: <BsFillInfoCircleFill className="text-3xl text-[#2B7FFF]" />,
  },
  {
    title: "Scalable Growth",
    desc: "Solutions that grow with your business, from start-up to enterprise scale operations.",
    icon: <BsFillInfoCircleFill className="text-3xl text-[#2B7FFF]" />,
  },
];
const services = [
  {
    question: "How do I book a service?",
    answer:
      "Simply select the service you need, choose a professional, and schedule a convenient time.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We currently operate in multiple regions. Enter your location to see availability.",
  },
  {
    question: "Can I request a custom service?",
    answer:
      "Yes! Use the 'Others' option when selecting a service and describe your custom request.",
  },
];
const LearnMore = () => {
  return (
    <div className="">
      <LearnHero />

      <CommonWrapper className="pt-10">
        <SectionHeader
          title="Why Join with us"
          subtitle="Explore our offerings, understand how we work, and see how we can help you
        improve your property with professional services."
        />
        <CommonSpace>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="border border-border p-5 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <MediumHeader className="!font-semibold !text-lg !text-black mb-2 !font-Inter">
                  {feature.title}
                </MediumHeader>
                <Paragraph className="!text-[#4A5565] !font-Inter">
                  {feature.desc}
                </Paragraph>
              </div>
            ))}
          </section>
        </CommonSpace>
        {/* FAQ Section */}
        <section className="space-y-4">
          <BigTitle className="!text-2xl font-semibold !text-[#1F2937] !font-Inter">
            Frequently Asked Questions
          </BigTitle>
          <div className="space-y-2">
            {services.map((faq, idx) => (
              <div
                key={idx}
                className="border border-border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <CommonHeader className=" !font-Inter!font-medium !text-[#1E2939]">
                  {faq.question}
                </CommonHeader>
                <Paragraph className="!text-[#4A5565] !font-Inter">
                  {faq.answer}
                </Paragraph>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-10 md:pt-30">
          <ReadyToHelp />
        </div>
      </CommonWrapper>
      <Footer />
    </div>
  );
};

export default LearnMore;
