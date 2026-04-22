import CommonHeader from "@/common/header/CommonHeader";
import CommonWrapper from "@/common/space/CommonWrapper";
import SubHeader from "@/Dashboard/Admin/common/SubHeader";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { Link } from "react-router-dom";
import PersonalForm from "./PersonalForm";
import uFrame from "@/assets/frame/u.png";
export default function ClipPathSection() {
  return (
    <div className="relative mt-10">
      {/* SVG mask */}
      <svg className=" hidden sm:block" width="0" height="0">
        <defs>
          <clipPath id="sectionClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.4 0.8,0.4 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <section
        className="relative text-white py-20 sm:py-30 overflow-hidden"
        style={{
          clipPath: "url(#sectionClip)",
          WebkitClipPath: "url(#sectionClip)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full -z-10"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect width="100%" height="100%" fill="#3B82F6" />
        </svg>

        <CommonWrapper>
          <div className="relative sm:py-20 w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold !leading-[40px] lg:!leading-[72px] !text-white">
              Give us a call for more <br className="hidden md:block" />{" "}
              information
            </h2>
            <CommonHeader className="my-4 !text-white  w-full sm:max-w-md">
              Register now and take advantage of our services — connect with
              trusted providers and make daily life easier
            </CommonHeader>
            <div className="flex gap-6 ">
              <Link
                to="/"
                className=" text-[#0A142F] text-2xl bg-white p-3 rounded-full"
              >
                <RiFacebookFill />
              </Link>
              <Link
                to="/"
                className=" text-[#0A142F] text-2xl bg-white p-3 rounded-full"
              >
                <FaInstagramSquare />
              </Link>
              <Link
                to="/"
                className=" text-[#0A142F] text-2xl bg-white p-3 rounded-full"
              >
                <IoLogoTwitter />
              </Link>
            </div>
          </div>
        </CommonWrapper>
        <div className="hidden lg:block absolute top:[40%] lg:top-[13%] right-[10%] transform translate-x-[10%]">
          <img src={uFrame} alt="" />
        </div>

        <div className=" sm:hidden pt-10 px-4 ">
          <PersonalForm />
        </div>

        <SubHeader className="!bg-black !text-white absolute bottom-0 w-full py-3 text-center">
          © 2025 Fixlist. All rights reserved. For inquiries, contact us at +255
          88520.
        </SubHeader>
      </section>

      <div className=" xl:min-w-[560px] sm:absolute top-16 lg:top-20  right-5 lg:right-40  hidden sm:block ">
        <PersonalForm />
      </div>
    </div>
  );
}
