import { useState } from "react";
import CommonSpace from "@/common/space/CommonSpace";
import UserSectionHeader from "../userComponents/reuseable/UserSectionHeader";
import FeaturedCard from "@/components/service/FeaturedCard";
import { useGetAllServicesQuery } from "@/redux/featuresAPI/servicesAPI/services.api";
import Pagination from "@/common/custom/Pagination";
import CurveSearch from "@/components/service/CurveSearch";
import { IoFilterSharp } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CommonWrapper from "@/common/space/CommonWrapper";


const AllPopularServices = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const { data: servicesData, isLoading } = useGetAllServicesQuery({ page: currentPage });

    const services = servicesData?.results ?? [];

    const CATEGORIES = [
        "All Categories",
        "Handyman service",
        "Cleaning service",
        "Tech service",
        "Renovation",
        "Remodelling service",
        "Automotive service",
    ];

    const mappedServices = services.map((service) => ({
        id: String(service.id),
        category: service.choose_category,
        job_title: service.job_title,
        provider: service.provider_info.name,
        location: service.location,
        price: Number(service.base_price),
        rating: service.rating || 0,
        reviews: service.reviews_count || 0,
        image: service.service_image || "https://via.placeholder.com/400x300",
        verified: service.provider_info.is_verified,
    }));

    const filteredServices =
        selectedCategory === "All Categories"
            ? mappedServices
            : mappedServices.filter((s) => s.category?.trim() === selectedCategory.trim() || s.category?.includes(selectedCategory));

    // If filtered result is empty but we have services, maybe pagination is hiding it?
    // Ideally filtering should happen on backend. 
    // Given constraints, this is best effort.

    const totalPages = Math.ceil((servicesData?.count ?? 0) / 10);

    return (
        <CommonSpace className="!pb-20">
            <CommonWrapper>
                <div className="w-full space-y-6">
                    <div className="w-full">
                        <UserSectionHeader
                            className="!w-full"
                            title="Browse Services"
                            subtitle="Browse verified providers in your area. Free for clients, transparent pricing, and reviews from real customers."
                        />
                    </div>
                    {/* Filter and Search Bar */}
                    <div className="flex flex-col md:flex-row gap-5 items-center w-full pt-4">
                        <CurveSearch className="w-full md:max-w-md" border="!border-border" />

                        <div className="flex items-center gap-3">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-auto h-auto bg-white border border-border !py-4 !px-6 [&>svg]:hidden">
                                    <div className="flex items-center gap-2 text-black text-sm font-medium">
                                        <IoFilterSharp className="text-lg" />
                                        <SelectValue placeholder="Filter" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full">
                        <h4 className="text-lg font-semibold">Popular Services</h4>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="h-40 flex items-center justify-center text-muted">Loading...</div>
                    ) : (
                        <>
                            {filteredServices.length > 0 ? (
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                    {filteredServices.map((service, index) => (
                                        <FeaturedCard key={index} feature={service} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center text-muted-foreground">
                                    No services found.
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="mt-10 flex justify-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages || 1}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </CommonWrapper>
        </CommonSpace>
    );
};

export default AllPopularServices;
