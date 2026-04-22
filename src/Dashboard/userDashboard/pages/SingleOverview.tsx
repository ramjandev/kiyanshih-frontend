import { useParams, useLocation } from "react-router-dom";
import SingleProviderInformation from "@/components/service/SingleProvider/SingleProviderInformation";
import SingleProviderRelatedServices from "@/components/service/SingleProvider/SingleProviderRelatedServices";
import SingleProviderReview from "@/components/service/SingleProvider/SingleProviderReview";
import { useGetSingleServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";

const SingleOverview = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const serviceId = Number(id);
  const { data: serviceDetail } = useGetSingleServicesQuery(serviceId);
  const category = serviceDetail?.data?.choose_category;
  console.log("this is category", serviceDetail);

  // Check if pathname ends with the main overview route
  const hideReview = location.pathname.endsWith(`/overview/${id}/`);

  return (
    <div>
      <SingleProviderInformation id={serviceId} />
      {!hideReview && <SingleProviderReview />}
      <SingleProviderRelatedServices category={category} currentId={serviceId} />
    </div>
  );
};

export default SingleOverview;








// import SingleProviderInformation from "@/components/service/SingleProvider/SingleProviderInformation";
// import SingleProviderRelatedServices from "@/components/service/SingleProvider/SingleProviderRelatedServices";
// import SingleProviderReview from "@/components/service/SingleProvider/SingleProviderReview";
// import { useParams } from "react-router-dom";

// const SingleOverview = () => {
//   const { id } = useParams<{ id: string }>();

//   const serviceId = Number(id);

//   return (
//     <div>
//       <SingleProviderInformation id={serviceId} />
//       <SingleProviderReview />
//       <SingleProviderRelatedServices />
//     </div>
//   );
// };

// export default SingleOverview;
