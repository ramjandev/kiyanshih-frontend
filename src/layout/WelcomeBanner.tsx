import React from "react";
import { Link } from "react-router-dom";

interface WelcomeBannerProps {
  name?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6 md:mt-12 mb-4 mx-auto my-auto w-full">
      {/* Greeting Section */}
      <div>
        <h2 className="text-xl font-semibold">{`Welcome back, ${name}`}</h2>
        <p className="text-gray-400">
          Manage your services and track your performance
        </p>
      </div>

      {/* Action Button */}
      <div>
        <Link to={"/provider-dashboard/verification"}>
          <button className="px-4 py-2 text-white hover:scale-105 transition-transform rounded-md border border-zinc-800 bg-zinc-950 cursor-pointer">
            Get Verified
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBanner;
