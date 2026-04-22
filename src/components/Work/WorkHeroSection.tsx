import heroImage from "../../assets/images/navHero.png";
import Hero from "../home/Hero";
const WorkHeroSection = () => {
  return (
    <div>
      <Hero
        title="How Fixlist Works"
        subtitle="Connect with trusted local service providers in three simple steps. Whether you need
        help or want to offer services, we make it easy."
        image={heroImage}
        subColor="!text-white"
      />
    </div>
  );
};

export default WorkHeroSection;
