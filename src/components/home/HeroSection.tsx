import Hero from "./Hero";
import heroImage from "../../assets/images/navhero2.png";
const HeroSection = () => {
  return (
    <div>
      <Hero
        title="Find the Right Expert, Right Away"
        subtitle="Hire skilled professionals near you."
        primaryButtonText="Browse Service"
        primaryButtonLink="/service"
        secondaryButtonText="Become a Provider"
        secondaryButtonLink="/provider-signup"
        image={heroImage}
      />
    </div>
  );
};

export default HeroSection;
