import profileBanner from "@/assets/provider/providerBg.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import profileImage from "@/assets/images/f3.png";
import verifiedIcon from "@/assets/provider/verified.svg";
import { MapPin } from "lucide-react";
import Paragraph from "@/common/header/Paragraph";
const skills = ["Handyman", "Gardening", "Renovation", "Renovation"];
import { GoDotFill } from "react-icons/go";
import RenderStars from "../RenderStars";

const ProfileTop = () => {
  return (
    <div className="mb-10">
      <img src={profileBanner} alt="" />
      <div>
        <div className="pl-8 flex  gap-3 ">
          <div className=" max-w-[392px] max-h-[412px] bg-white shadow border-slate-300 rounded-md p-4 md:p-6 -mt-20">
            <div className="text-center">
              <div className="-mt-25 relative">
                <img
                  src={profileImage}
                  alt=""
                  className=" w-35 h-35 rounded-full object-cover  mx-auto border border-white"
                />
                <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <Paragraph
                    className="!text-[#16A34A] bg-white rounded-full px-2 py-1 flex items-center gap-[2px] border-[.5px]
                   border-border"
                  >
                    <span>
                      <GoDotFill />
                    </span>
                    Available
                  </Paragraph>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-black mt-2">
                  Mike Handyman service
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <img src={verifiedIcon} alt="verified Icon" />
                  <p className="text-sm">Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 justify-center">
                <MapPin className="text-blue-700" />
                <p>Medical Student</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-blue-50 rounded-[6px] p-3 mt-8 mb-12">
              <div>
                <RenderStars rating={4.8} />
                <p className="text-sm text-slate-600"> 4.8 ( 170 Reviews)</p>
              </div>

              <div className="w-0.5 h-10 border border-slate-400"></div>
              <div className="text-center">
                <p className="text-sm text-slate-600">30</p>
                <p className="text-sm text-slate-600">Service Provided</p>
              </div>
            </div>

            <Link to={"/dashboard/edit-student-profile"}>
              <Button className="w-full bg-zinc-900 text-zinc-50 h-auto py-3 cursor-pointer mt-4">
                Send Massage
              </Button>
            </Link>
          </div>

          <div className="flex-1 self-end bg-white border border-border rounded-md p-5">
            <h4 className="text-lg font-medium">About Mike Handyman Service</h4>
            <p className="text-slate-600 mt-4 mb-2">
              Building and repairing small structures, such as decks, sheds, or
              custom shelving. Designing and building unique tables, chairs,
              bookshelves. Building and repairing small structures, such as
              decks, sheds, or custom shelving. Designing and building unique
              tables, chairs, bookshelves.
            </p>
            <div>
              <p className="text-[#0F172A] font-semibold">Skills</p>
              <div className="flex items-center gap-2 mt-4">
                {skills.map((skill, index) => (
                  <p
                    key={index}
                    className="text-[15px] text-[#032642] p-2 border border-[#F5E4DF] rounded"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
