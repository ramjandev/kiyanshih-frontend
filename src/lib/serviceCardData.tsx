import imgSample from "@/assets/cardImages/work.jpg";

export type ServiceStatus = "Pending" | "Accepted" | "Rejected" | "In-progress" | "Completed";

export interface ServiceItem {
  id: number;
  imageSrc: string;
  name: string;
  verified: boolean;
  location: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  statusLabel: ServiceStatus;
}

// ✅ FIXED: Different statuses for each service
export const serviceCardData: ServiceItem[] = [
  {
    id: 1,
    imageSrc: imgSample,
    name: "Service One",
    verified: true,
    location: "New York, USA",
    startingPrice: 50,
    rating: 4.5,
    reviewCount: 12,
    statusLabel: "Pending", // ✅ Pending
  },
  {
    id: 2,
    imageSrc: imgSample,
    name: "Service Two",
    verified: false,
    location: "Los Angeles, USA",
    startingPrice: 30,
    rating: 3.8,
    reviewCount: 8,
    statusLabel: "Pending", // ✅ Pending
  },
  {
    id: 3,
    imageSrc: imgSample,
    name: "Service Three",
    verified: true,
    location: "Chicago, USA",
    startingPrice: 40,
    rating: 4.2,
    reviewCount: 10,
    statusLabel: "Accepted", // ✅ Accepted
  },
  {
    id: 4,
    imageSrc: imgSample,
    name: "Service Four",
    verified: false,
    location: "Houston, USA",
    startingPrice: 60,
    rating: 4.9,
    reviewCount: 20,
    statusLabel: "Accepted", // ✅ Accepted
  },
  {
    id: 5,
    imageSrc: imgSample,
    name: "Service Five",
    verified: true,
    location: "Miami, USA",
    startingPrice: 35,
    rating: 4.0,
    reviewCount: 15,
    statusLabel: "Rejected", // ✅ Rejected
  },
  {
    id: 6,
    imageSrc: imgSample,
    name: "Service Six",
    verified: false,
    location: "Seattle, USA",
    startingPrice: 25,
    rating: 3.5,
    reviewCount: 5,
    statusLabel: "In-progress", // ✅ In-progress
  },
  {
    id: 7,
    imageSrc: imgSample,
    name: "Service Seven",
    verified: true,
    location: "Boston, USA",
    startingPrice: 55,
    rating: 4.7,
    reviewCount: 18,
    statusLabel: "In-progress", // ✅ In-progress
  },
  {
    id: 8,
    imageSrc: imgSample,
    name: "Service Eight",
    verified: true,
    location: "Denver, USA",
    startingPrice: 45,
    rating: 4.4,
    reviewCount: 14,
    statusLabel: "Completed", // ✅ Completed
  },
  {
    id: 9,
    imageSrc: imgSample,
    name: "Service Nine",
    verified: false,
    location: "Atlanta, USA",
    startingPrice: 38,
    rating: 4.1,
    reviewCount: 11,
    statusLabel: "Completed", // ✅ Completed
  },
  {
    id: 10,
    imageSrc: imgSample,
    name: "Service Ten",
    verified: true,
    location: "Phoenix, USA",
    startingPrice: 42,
    rating: 4.6,
    reviewCount: 16,
    statusLabel: "Completed", // ✅ Completed
  },
];

// ✅ Helper function to get services by status
export const getServicesByStatus = (status: ServiceStatus): ServiceItem[] => {
  return serviceCardData.filter(item => item.statusLabel === status);
};

// ✅ Helper function to get count by status
export const getStatusCount = (status: ServiceStatus): number => {
  return serviceCardData.filter(item => item.statusLabel === status).length;
};