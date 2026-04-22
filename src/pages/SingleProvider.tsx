import CommonWrapper from "@/common/space/CommonWrapper";
import Hero from "@/components/home/Hero";
// import SingleProviderImage from "@/components/service/SingleProvider/SingleProviderImage";
import SingleProviderInformation from "@/components/service/SingleProvider/SingleProviderInformation";
import SingleProviderRelatedServices from "@/components/service/SingleProvider/SingleProviderRelatedServices";
import SingleProviderReview from "@/components/service/SingleProvider/SingleProviderReview";
import { originalTitle } from "@/help/help";
import Footer from "@/layout/Footer";
import { useParams } from "react-router-dom";
import heroImage from "@/assets/images/service2.png";
import { useGetSingleServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";
import { useFeaturedServicesSingleGetQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/featuresAPI/auth/auth.slice";
import { skipToken } from "@reduxjs/toolkit/query";

const SingleProvider = () => {
  const { name } = useParams();
  const { id } = useParams<{ id: string }>();
  const serviceId = Number(id);
  const token = useAppSelector(selectToken);

  // Use protected API if logged in, else use public API
  const { data: serviceDetail } = useGetSingleServicesQuery(token ? serviceId : skipToken);
  const { data: featuredServiceDetail } = useFeaturedServicesSingleGetQuery(!token ? serviceId : skipToken);
  console.log("serviceDetail", serviceDetail);
  console.log("featuredServiceDetail", featuredServiceDetail);
  

  // Normalize category from whichever API returned data
  const category = token
    ? serviceDetail?.data?.choose_category
    : (featuredServiceDetail as any)?.service?.category_display;

  return (
    <div>
      <Hero
        title={`Professional ${originalTitle(name ?? "")}, Just a Click Away.`}
        subtitle="We'll tackle your entire to-do list, big or small. Book your trusted local handyman today."
        image={heroImage}
        subColor="!text-white"
      />

      <CommonWrapper>
        {/* <SingleProviderImage /> */}
        <SingleProviderInformation id={serviceId} />
        <SingleProviderReview />
        <SingleProviderRelatedServices category={category} currentId={serviceId} />
      </CommonWrapper>
      <Footer />
    </div>
  );
};

export default SingleProvider;
