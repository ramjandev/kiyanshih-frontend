import ca1 from "@/assets/images/man.png";
import ca2 from "@/assets/images/w1.png";
import ca3 from "@/assets/images/w2.png";
import ca4 from "@/assets/images/w3.png";
import ca5 from "@/assets/images/t1.png";
import ca6 from "@/assets/images/t2.png";
import ca7 from "@/assets/images/t3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LargeTitle from "@/common/header/LargeTitle";
import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";

const testimonials = [
  {
    name: "Hellen Jummy",
    role: "Toronto, Canada",
    company: "Fixlist",
    feedback:
      "An unforgettable experience that blends the thrill of sports with world-class entertainment.",
    image: ca1,
  },
  {
    name: "Michael Carter",
    role: "Marketing Head",
    company: "BrightTech",
    feedback:
      "The team went above and beyond to deliver excellent results. Highly recommended!",
    image: ca2,
  },
  {
    name: "Sophia Lee",
    role: "Product Designer",
    company: "DesignHub",
    feedback:
      "A seamless and creative journey from start to finish. Truly inspiring work.",
    image: ca3,
  },
  {
    name: "Daniel Johnson",
    role: "Software Engineer",
    company: "CodeWorks",
    feedback:
      "Professional, efficient, and always delivering on time. Couldn’t ask for better service.",
    image: ca4,
  },
  {
    name: "Emily Roberts",
    role: "Business Consultant",
    company: "GrowthX",
    feedback:
      "They helped us scale our business with practical solutions and great insights.",
    image: ca5,
  },
  {
    name: "James Smith",
    role: "Operations Manager",
    company: "BuildIt",
    feedback:
      "A reliable partner who always comes through. Fantastic experience overall.",
    image: ca6,
  },
  {
    name: "Olivia Brown",
    role: "Event Coordinator",
    company: "NextGen Events",
    feedback:
      "The attention to detail and creativity exceeded our expectations. Simply amazing!",
    image: ca7,
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-10 relative">
      <div className="relative">
        {/* Yellow background */}
        <div className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 bg-[#FDE68A] rounded-xl z-0"></div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative z-10"
        >
          <div className="flex justify-between !items-center pb-10">
            <LargeTitle className="lg:!text-5xl !font-bold font-Public lg:!leading-[64px] !text-[#0F172A] mb-8">
              What Clients about us
            </LargeTitle>
            <div className="flex gap-2 text-[#0BB8AF]">
              <CarouselPrevious className="static rounded-full cursor-pointer" />
              <CarouselNext className="static rounded-full cursor-pointer" />
            </div>
          </div>

          <div className="w-[95%] mx-auto relative z-10">
            <CarouselContent className="-ml-4 z-20">
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 mb-6"
                >
                  <div className="bg-white p-4 sm:p-8 rounded-xl border border-border h-full">
                    <div className="space-y-4">
                      <BigTitle className="!font-bold !font-Roboto !text-[#475569] md:!text-2xl">
                        {item.company}
                      </BigTitle>
                      <BigTitle className="!font-Roboto !text-[#000] md:!text-xl !font-normal">
                        {item.feedback}
                      </BigTitle>

                      <div className="flex items-center gap-3 pt-2 sm:pt-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <CommonHeader className="!font-Public !text-black">
                            {item.name}
                          </CommonHeader>
                          <Paragraph className="!font-Public !text-[#475569]">
                            {item.role}
                          </Paragraph>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
