import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import LandingTitle from "@/common/header/LandingTitle";
import { Link } from "react-router-dom";

const ReadyToHelp = () => {
  return (
    <div className="bg-[linear-gradient(145deg,#1D4ED8_31.69%,#560F72_95.28%)] rounded-[20px]">
      <div className=" max-w-xl mx-auto py-16 px-4 space-y-3 sm:space-y-6 flex justify-center flex-col">
        <LandingTitle className="!text-white text-center lg:!text-5xl">
          Ready to Get Help?
        </LandingTitle>
        <CommonHeader className="!text-white text-center">
          Post your job and connect with verified local professionals today
        </CommonHeader>
        <div className="flex justify-center pt-4">
          <CommonButton className="w-fit !bg-white text-[#1D4ED8]">
            <Link to="/user-dashboard/job-postings">
              Post Your Job at $5.99
            </Link>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ReadyToHelp;
