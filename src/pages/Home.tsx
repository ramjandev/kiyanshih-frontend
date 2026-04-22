import HeroSection from "@/components/home/HeroSection";
import HomeSteps from "@/components/home/HomeSteps";
import Price from "@/components/home/Price";
import Service from "@/components/home/Service";
import Footer from "@/layout/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Service />
      <HomeSteps />

      <Price />
      <Footer />
    </div>
  );
};

export default Home;
