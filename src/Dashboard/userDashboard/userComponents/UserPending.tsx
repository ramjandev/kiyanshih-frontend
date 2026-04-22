import type { ServiceItem } from "@/lib/serviceCardData";
import React from "react";
import ServiceCard from "./reuseable/ServiceCard";

interface Props {
  services: ServiceItem[];
}

const UserPending: React.FC<Props> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {services.map((service) => (
        <ServiceCard
          id={service.id}
          key={service.id}
          imageSrc={service.imageSrc}
          name={service.name}
          verified={service.verified}
          locationText={service.location}
          startingPrice={service.startingPrice}
          rating={service.rating}
          reviewCount={service.reviewCount}
          statusLabel={service.statusLabel}
          onViewDetails={() => console.log("View Details", service.id)}
          onStatusClick={() => console.log("Status Clicked", service.id)}
        />
      ))}
    </div>
  );
};

export default UserPending;
