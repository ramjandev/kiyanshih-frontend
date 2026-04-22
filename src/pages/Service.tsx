import { useState } from "react";
import CommonWrapper from "@/common/space/CommonWrapper";
import FeaturedSection from "@/components/service/FeaturedSection";
import ReadyToHelp from "@/components/service/ReadyToHelp";
import ServiceCardSection from "@/components/service/ServiceCardSection";
import ServiceTopSection from "@/components/service/ServiceTopSection";
import Footer from "@/layout/Footer";

const Service = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="">
      <CommonWrapper>
        <ServiceTopSection searchValue={searchQuery} onSearchChange={setSearchQuery} />
        <ServiceCardSection searchQuery={searchQuery} />
        <FeaturedSection searchQuery={searchQuery} />
        <ReadyToHelp />
      </CommonWrapper>
      <Footer />
    </div>
  );
};

export default Service;

