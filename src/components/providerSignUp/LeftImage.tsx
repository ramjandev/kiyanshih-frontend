import img from "@/assets/images/provider.png";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
const LeftImage = () => {
  return (
    <div className="w-full flex flex-col gap-5 lg:w-1/2">
      <div className="flex justify-start">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-14" />
        </Link>
      </div>

      <div className="w-full flex justify-center lg:justify-start">
        <img
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full object-contain"
          src={img}
          alt="Illustration"
        />
      </div>
    </div>
  );
};

export default LeftImage;
