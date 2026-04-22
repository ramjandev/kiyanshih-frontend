import profileBanner from "@/assets/provider/providerBg.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import profileImage from "@/assets/provider/profileImg.png";
import verifiedIcon from "@/assets/provider/verified.svg";
import { MapPin, Star } from "lucide-react";

export default function ProfileHeading() {
  return (
    <div className="mb-10">
      <img src={profileBanner} alt="" />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6">
          <div className="col-span-1 bg-white shadow border-slate-300 rounded-[8px] p-4 md:p-6 -mt-10">
            <div className="text-center">
              <img src={profileImage} alt="" className="mx-auto" />
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
              <div className="text-center">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(null)
                    .map(() => (
                      <Star className="text-orange-500" fill="currentColor" />
                    ))}
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  4.8 ( 170 Reviews)
                </p>
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

          <div className="col-span-2 mt-5">
            <div className="bg-white border border-slate-300 py-6 px-5 rounded-[8px]">
              <h4 className="text-lg font-medium">
                About Mike Handyman Service
              </h4>
              <p className="text-slate-600 mt-4 mb-2">
                Building and repairing small structures, such as decks, sheds,
                or custom shelving. Designing and building unique tables,
                chairs, bookshelves. Building and repairing small structures,
                such as decks, sheds, or custom shelving. Designing and building
                unique tables, chairs, bookshelves.
              </p>
              <div>
                <p className="text-[#0F172A] font-semibold">Skills</p>
                <div className="flex flex-col md:flex-row items-start gap-2 mt-4">
                  <p className="text-[15px] text-[#032642] py-2.5 px-3.5 border border-[#F5E4DF] rounded">
                    Handyman
                  </p>
                  <p className="text-[15px] text-[#032642] py-2.5 px-3.5 border border-[#F5E4DF] rounded">
                    Gardening
                  </p>
                  <p className="text-[15px] text-[#032642] py-2.5 px-3.5 border border-[#F5E4DF] rounded">
                    Renovation
                  </p>
                  <p className="text-[15px] text-[#032642] py-2.5 px-3.5 border border-[#F5E4DF] rounded">
                    Renovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
