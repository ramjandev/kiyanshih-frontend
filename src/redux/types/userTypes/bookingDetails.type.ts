export interface IServiceResponse {
    success: boolean;
    data: IService;
}

export interface IService {
    id: number;
    provider: number;
    provider_name: string;
    provider_email: string;

    job_title: string;
    choose_category: string;
    specific_services: string;
    service_description: string;
    what_you_get: string;

    base_price: string;
    price_type: "quote" | "fixed" | "hourly";

    service_area: string;

    service_inclusions: string[];

    availability: IServiceAvailability[];

    images: IServiceImage[];

    reviews: IServiceReview[];

    status: "active" | "inactive" | "pending";

    views_count: number;
    is_featured: boolean;

    average_rating: number;
    total_reviews: number;

    created_at: string;
    updated_at: string;
}

export interface IServiceAvailability {
    day: string;
    time: string;
}

export interface IServiceImage {
    id: number;
    image: string;
    image_url: string;
    order: number;
}

export interface IServiceReview {
    id?: number;
    user?: number;
    rating?: number;
    comment?: string;
    created_at?: string;
}
