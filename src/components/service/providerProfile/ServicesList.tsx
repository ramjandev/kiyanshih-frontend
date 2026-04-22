import Tablist from "@/Dashboard/Admin/components/booking/Tablist";
import UserSectionHeader from "@/Dashboard/userDashboard/userComponents/reuseable/UserSectionHeader";
import { useState } from "react";
import ProviderCard from "./ProviderCard";

import f1 from "@/assets/images/f1.png";
import f2 from "@/assets/images/f2.png";
import f3 from "@/assets/images/f3.png";
import f4 from "@/assets/images/f4.png";
import f5 from "@/assets/images/f5.png";
const services = [
  {
    category: "Carpentry & Woodwork",
    provider: "Mike Handyman service",
    location: "Toronto, Canada",
    rating: 4.8,
    reviews: 170,
    price: 450.0,
    image: f1,
  },
  {
    category: "Maintenance",
    provider: "Mike Handyman service",
    location: "Toronto, Canada",
    rating: 5,
    reviews: 170,
    price: 450.0,
    image: f2,
  },
  {
    category: "Painting and Finishing",
    provider: "Mike Handyman service",
    location: "Toronto, Canada",
    rating: 4.8,
    reviews: 170,
    price: 450.0,
    image: f3,
  },
  {
    category: "Installations",
    provider: "Mike Handyman service",
    location: "Toronto, Canada",
    rating: 3.8,
    reviews: 170,
    price: 450.0,
    image: f4,
  },
  {
    category: "Education & Training",
    provider: "Mike Gym Trainer service",
    location: "Toronto, Canada",
    rating: 4.8,
    reviews: 170,
    price: 450.0,
    image: f5,
  },
];

export type providerStatus =
  | "Carpentry & Woodwork"
  | "Maintenance"
  | "Painting and Finishing";

const counts = {
  "Carpentry & Woodwork": 10,
  Maintenance: 2,
  "Painting and Finishing": 0,
};
const JobsTabs: providerStatus[] = [
  "Carpentry & Woodwork",
  "Maintenance",
  "Painting and Finishing",
];
const ServicesList = () => {
  const [tab, setTab] = useState<providerStatus>("Carpentry & Woodwork");

  return (
    <div>
      <div>
        <UserSectionHeader
          title="Provide services"
          subtitle="Professional solutions tailored to your needs."
        />
        <div>
          <Tablist<providerStatus>
            tabs={JobsTabs}
            activeTab={tab}
            setTab={setTab}
            counts={counts}
          />
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ProviderCard provider={service} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
