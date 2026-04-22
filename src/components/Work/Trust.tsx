import SectionHeader from "@/common/header/SectionHeader";
import CommonWrapper from "@/common/space/CommonWrapper";

import m1 from "@/assets/frame/badge-green.svg";
import m2 from "@/assets/frame/star.png";
import m3 from "@/assets/frame/coins.svg";
import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";
const cards = [
  {
    id: 1,
    title: "Background Verification",
    description:
      "All service providers undergo comprehensive background checks through Certn, including criminal record checks and identity verification.",
    icon: m1,
    color: "bg-[#0D9488]",
    clip: `[clip-path:polygon(0_20%,100%_0%,100%_80%,0%_100%)]`,
  },
  {
    id: 2,
    title: "Verified Reviews",
    description:
      "Only verified clients who have completed bookings can leave reviews. All reviews are moderated to ensure authenticity and fairness.",
    icon: m2,
    color: "bg-[#EA580C]",
    clip: `[clip-path:polygon(0_20%,100%_0%,100%_80%,0%_100%)]`,
  },
  {
    id: 3,
    title: "Secure Payments",
    description:
      "Choose secure card payments through Stripe or traditional cash/e-transfer arrangements. All transactions are recorded for your protection.",
    icon: m3,
    color: "bg-[#1D4ED8]",
    clip: `[clip-path:polygon(0_20%,100%_0%,100%_80%,0%_100%)]`,
  },
];
const Trust = () => {
  return (
    <div className="bg-[#F8FAFC] ">
      <CommonWrapper className="py-10">
        <SectionHeader
          title="Trust & Safety First"
          subtitle="Your safety and satisfaction are our top priorities"
        />

        <div className="flex flex-wrap justify-center gap-10 sm:gap-20 py-10 sm:py-20">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-72 max-w-sm min-h-[410px] px-4 ${card.clip}   flex flex-col items-center justify-center gap-4 ${card.color}`}
            >
              <div className=" bg-white rounded-full w-16 h-16 flex items-center justify-center ">
                <img className="w-10 h-10" src={card.icon} alt="" />
              </div>
              <BigTitle className="!text-xl !text-white font-semibold ">
                {card.title}
              </BigTitle>
              <CommonHeader className="!text-[#F4F4F5] text-center">
                {card.description}
              </CommonHeader>
            </div>
          ))}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Trust;
