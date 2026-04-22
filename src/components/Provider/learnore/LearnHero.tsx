import Hero from "@/components/home/Hero";
import heroImage from "../../../assets/images/learn.png";
const LearnHero = () => {
  return (
    <div>
      <Hero
        title="Professional Service Solutions for Your Business"
        subtitle="Discover comprehensive service provider solutions designed to streamline your operations, enhance customer satisfaction, and drive business growth."
        image={heroImage}
        subColor="!text-white"
      />
    </div>
  );
};

export default LearnHero;
