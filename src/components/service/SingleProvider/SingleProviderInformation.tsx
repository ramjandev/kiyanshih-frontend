import { useState } from "react";
import w1 from "@/assets/images/w1.png";
import calender from "@/assets/images/clock.svg";

import w2 from "@/assets/images/w2.png";
import w3 from "@/assets/images/w3.png";

import { RiVerifiedBadgeLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import BigTitle from "@/common/header/BigTitle";
import CommonButton from "@/common/button/CommonButton";

// import RenderStars from "../RenderStars";
import { useGetSingleServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";
import { useFeaturedServicesSingleGetQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { skipToken } from "@reduxjs/toolkit/query";
import RenderStars from "../RenderStars";
import CommonWrapper from "@/common/space/CommonWrapper";
import CommonLoader from "@/common/CommonLoader";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/featuresAPI/auth/auth.slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert, X } from "lucide-react";

const SingleProviderInformation = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const { data: authData, isLoading: authLoading, isError: authError } = useGetSingleServicesQuery(token ? id : skipToken);
  const { data: publicData, isLoading: publicLoading, isError: publicError } = useFeaturedServicesSingleGetQuery(!token ? id : skipToken);

  const isLoading = token ? authLoading : publicLoading;
  const isError = token ? authError : publicError;

  const rawService = token ? authData?.data : (publicData as any)?.service;

  // Unified normalization logic
  const service = rawService ? {
    id: rawService.id,
    job_title: token ? rawService.job_title : rawService.title,
    service_description: token ? rawService.service_description : rawService.description,
    choose_category: token ? rawService.choose_category : rawService.category_display,
    base_price: token ? rawService.base_price : rawService.price_min,
    price_type: token ? rawService.price_type : "Starting",
    service_area: token ? rawService.service_area : (rawService.provider ? `${rawService.provider.city}, ${rawService.provider.area}` : "N/A"),
    average_rating: token ? (rawService.average_rating ?? 0) : (Number(rawService.provider?.rating) || 0),
    total_reviews: token ? (rawService.total_reviews ?? 0) : (rawService.provider?.total_reviews || 0),
    verified: token ? rawService.verified : (rawService.provider?.verification_status === "verified"),
    images: rawService.images ?? [],
    service_inclusions: rawService.service_inclusions ?? [],
    availability: rawService.availability ?? [],
    specific_services: rawService.specific_services ?? "",
    what_you_get: token ? rawService.what_you_get : "",
    provider_name: token ? rawService.provider_name : rawService.provider?.business_name,
  } : null;

  /* ================= HANDLERS ================= */
  const handleMessage = () => {
    if (token) {
      navigate(`/user-dashboard/message`);
    } else {
      setShowAuthAlert(true);
    }
  };

  const handleBookNow = () => {
    if (token) {
      if (service) {
        navigate(`/user-dashboard/book-service/${service.id}`, {
          state: { service: service },
        });
      }
    } else {
      setShowAuthAlert(true);
    }
  };

  /* ================= SAFE FALLBACKS ================= */
  // ... rest of component logic ...
  // (I'll use a larger block replacement to be safe with line matches)

  const images = service?.images ?? [];
  const serviceInclusions = service?.service_inclusions ?? [];
  const availability = service?.availability ?? [];
  const specificServices =
    service?.specific_services?.split(",") ?? [];

  /* ================= STATES ================= */
  if (isLoading) {
    return <CommonLoader />;
  }

  if (isError || !service) {
    return <p className="text-center py-20">Service not found</p>;
  }

  return (
    <CommonWrapper>
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 py-10">
        {/* Left big image */}
        <div className="lg:flex-[1.5] flex-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)] overflow-hidden rounded-3xl">
          <img
            className="rounded-3xl w-full h-full object-cover max-h-[576px]"
            src={images[0]?.image_url || w1}
            alt="service"
          />
        </div>

        {/* Right two stacked images */}
        <div className="lg:flex-1 flex flex-col gap-6">
          <img
            className="w-full h-full max-h-[273px] rounded-3xl object-cover bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
            src={images[1]?.image_url || w2}
            alt="service"
          />

          <img
            className="w-full h-full max-h-[273px] rounded-3xl object-cover bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
            src={images[2]?.image_url || w3}
            alt="service"
          />
        </div>
      </div>

      <div className="text-white flex flex-col lg:flex-row justify-center items-start gap-8">
        {/* ================= LEFT CONTENT ================= */}

        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <img
                src={images[0]?.image_url || w1}
                className="w-16 h-16 rounded-full object-cover"
                alt="service"
              />

              <div>
                <CommonHeader className="!text-lg !leading-[28px]">
                  {service.job_title}
                </CommonHeader>

                <CommonHeader className="!text-lg !font-normal !leading-[28px] text-[#2E4A61]">
                  Service Provider
                </CommonHeader>

                <div className="flex items-center gap-1">
                  <span className="text-[#1D4ED8]">
                    <HiOutlineLocationMarker />
                  </span>
                  <Paragraph className="!text-black/81">
                    {service.service_area}
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <RenderStars rating={service?.average_rating ?? 0} />
              <p>{service?.average_rating ?? 0}</p>
              <Paragraph className="!text-[#475569]">
                ({service?.total_reviews ?? 0} Reviews)
              </Paragraph>
            </div>

            {/* Verified */}
            {service.verified && (
              <div className="flex items-center gap-1">
                <span className="text-[#FFC100] text-xl">
                  <RiVerifiedBadgeLine />
                </span>
                <Paragraph className="!text-[#000]">Verified</Paragraph>
              </div>
            )}
          </div>

          <hr className="my-4.5 border border-[#F5E4DF]" />

          {/* Service Details */}
          <BigTitle className="text-[#212529] !text-2xl pb-5 mt-10">
            Service Details
          </BigTitle>

          <CommonHeader className="!text-lg !font-normal !leading-[28px] text-[#2E4A61]">
            {service.service_description}
          </CommonHeader>

          {/* What You Will Get */}
          <BigTitle className="text-[#212529] !text-xl mt-6">
            What You will Get:
          </BigTitle>

          <CommonHeader className="!text-lg !font-normal !leading-[28px] text-[#2E4A61] pt-2">
            {service.what_you_get}
          </CommonHeader>

          <div className="space-y-2 mt-5">
            {serviceInclusions.map((text: string, index: number) => (
              <CommonHeader
                key={index}
                className="!text-lg !font-normal !leading-[28px] text-[#032642] flex items-center gap-2"
              >
                <IoIosCheckmarkCircle className="text-[#FACC15]" />
                {text}
              </CommonHeader>
            ))}
          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}
        <div className="w-full lg:w-[464px] bg-white border border-border rounded-[20px] p-6">
          <div className="flex justify-between items-start">
            <CommonHeader className="!text-lg !leading-[28px]">
              {service.choose_category}
            </CommonHeader>

            <div className="flex items-center gap-1">
              <Paragraph className="!text-[#475569]">Start From</Paragraph>
              <CommonHeader className="!text-[#1D4ED8]">
                ${service.base_price}/{service.price_type}
              </CommonHeader>
            </div>
          </div>

          {/* Availability */}
          <div className="py-2">
            <Paragraph className="!text-[#212529] !font-medium">
              Availability
            </Paragraph>

            {availability.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 pt-2">
                <img src={calender} alt="clock" />
                <Paragraph className="!text-[#212529] !font-sans !text-lg">
                  {item.day} : {item.time}
                </Paragraph>
              </div>
            ))}
          </div>

          {/* Skills */}
          <Paragraph className="!font-medium !text-[#212529] mt-6">
            Skills and Services
          </Paragraph>

          <div className="flex flex-wrap gap-2 mt-6">
            {specificServices.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm border border-border rounded-lg text-gray-600"
              >
                {skill.trim()}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <CommonButton onClick={handleMessage} className="w-full !text-black">
              Message
            </CommonButton>
            <CommonButton
              onClick={handleBookNow}
              className="w-full !bg-[#1D4ED8] !text-white"
            >
              Book Service
            </CommonButton>
          </div>
        </div>
      </div>

      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent className="max-w-[500px] p-6 rounded-[24px] gap-0 border-none shadow-lg">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowAuthAlert(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <AlertDialogHeader className="flex flex-row items-start gap-4 space-y-0 text-left">
            <div className="flex-shrink-0 w-16 h-16 bg-rose-50 rounded-xl flex items-center justify-center">
              <TriangleAlert className="w-8 h-8 text-rose-500" />
            </div>
            <div className="flex flex-col gap-3">
              <AlertDialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                Registration Alert !
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[16px] text-gray-500 font-normal leading-relaxed">
                Messaging is available for registered users. Create your free account to start chatting.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 flex gap-3 sm:justify-end">
            <AlertDialogCancel className="h-12 px-8 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 bg-white !cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate("/client-signup")}
              className="h-12 px-8 rounded-xl bg-[#111827] text-white font-medium hover:bg-gray-800 border-none !cursor-pointer"
            >
              Register
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CommonWrapper>
  );
};

export default SingleProviderInformation;
