import type { JobFormData } from "@/Dashboard/components/servicesPosting/form/schema/JobFormSchema";

export interface CombinedFormData {
  basicInfo: JobFormData;
  availability: {
    service_area: string;
    availability: Array<{
      day: string;
      enabled: boolean;
      time: string;
    }>;
  };
  serviceDetails: {
    service_inclusions: string[];
    images: File[];
  };
}
