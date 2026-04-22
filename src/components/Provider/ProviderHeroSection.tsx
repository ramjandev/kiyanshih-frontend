import Hero from "../home/Hero";
import heroImage from "@/assets/images/heroProvider.png";

const ProviderHeroSection = () => {
  return (
    <div>
      <Hero
        title="Grow Your Service
        Business"
        subtitle="Join Canada's fastest-growing marketplace for local services.
        Connect with customers who need your expertise and build a
        thriving business."
        primaryButtonText="Join Us Today"
        primaryButtonLink="/provider-signup"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/provider/learn-more"
        image={heroImage}
        subColor="!text-white"
      />
    </div>
  );
};

export default ProviderHeroSection;
