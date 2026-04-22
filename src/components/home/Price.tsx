import CommonButton from "@/common/button/CommonButton";
import MediumHeader from "@/common/header/MediumHeader";
import CommonWrapper from "@/common/space/CommonWrapper";
import SubHeader from "@/Dashboard/Admin/common/SubHeader";
import briefcase from "@/assets/frame/briefcase-business (1).svg";
import zap from "@/assets/frame/zap.svg";
import party from "@/assets/frame/party-popper.svg";
import gem from "@/assets/frame/gem.svg";
import SectionHeader from "@/common/header/SectionHeader";
const plansData = [
  {
    title: "For Clients",
    subtitle: "Post jobs and find the right provider",
    fee: "Service fee: 2.9% (max $10 CAD) on card payments only",
    items: [
      {
        name: "Job Post (30 days)",
        price: "$5.99 CAD",
        icon: briefcase,
        iconBg: "bg-[#9672FF]",
      },
      {
        name: "Boost (7 days)",
        price: "$2.99 CAD",
        icon: zap,
        iconBg: "bg-[#14B8A6]",
      },
    ],
  },
  {
    title: "For Provider",
    subtitle: "Post jobs and find the right provider",
    fee: "Platform fee: 2.9% (min $1 CAD) on card payments only",
    items: [
      {
        name: "Basic Plan",
        price: "$29.00 CAD",
        icon: party,
        iconBg: "bg-[#9672FF]",
      },
      {
        name: "Unlimited Plan",
        price: "$99.00 CAD",
        icon: gem,
        iconBg: "bg-[#14B8A6]",
      },
    ],
  },
];
const Price = () => {
  return (
    <div className="bg-[rgba(239,246,255,0.30)]">
      <CommonWrapper>
        <section className="py-10  ">
          <div className="max-w-6xl mx-auto ">
            <div className="text-center mb-20">
              <SectionHeader
                title=" Simple, Transparent Pricing"
                subtitle=" For clients: Pay per job post. For providers: Choose your plan."
              />
            </div>

            <div className="w-full flex flex-col md:flex-row  justify-between gap-12 ">
              {plansData.map((plan, idx) => (
                <div
                  key={idx}
                  className="border border-black rounded-2xl  w-full px-12 pb-12  "
                >
                  <div className=" w-full flex justify-center -mt-6">
                    <CommonButton className=" !bg-black !text-white  !border-0 !rounded-full     ">
                      {plan.title}
                    </CommonButton>
                  </div>

                  <div className=" py-10">
                    <MediumHeader className=" !font-medium  ">
                      {plan.subtitle}
                    </MediumHeader>
                  </div>

                  <div className="space-y-6 ">
                    {plan.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between "
                      >
                        <div className="flex items-center gap-3">
                          <div className={`${item.iconBg} p-2  rounded-full`}>
                            <img src={item.icon} alt="" />
                          </div>
                          <SubHeader className="text-[#2563EB]">
                            {item.name}
                          </SubHeader>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <SubHeader className="text-sm text-blue-600 pt-8">
                    {plan.fee}
                  </SubHeader>
                </div>
              ))}
            </div>
          </div>
        </section>
      </CommonWrapper>
    </div>
  );
};

export default Price;
