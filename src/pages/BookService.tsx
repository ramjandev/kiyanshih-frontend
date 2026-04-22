/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Clock, Pencil, Check, MapPin, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import CommonWrapper from "@/common/space/CommonWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import { useCreateBookingMutation } from "@/redux/featuresAPI/userAPI/bookings.api";
import { useFeaturedServicesSingleGetQuery } from "@/redux/featuresAPI/landingPageApi/landingPage.api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";



type FormValues = {
    bookingDate: Date | undefined;
    bookingTime: string; // HH:MM-HH:MM format
    phone: string;
    locationType: "my_location" | "provider_location" | undefined;
    addressLabel: "Home" | "Office" | "Others";
    address: string;
    house: string;
    floor: string;
    zipCode: string;
    street: string;
    user_notes?: string;
    termsAccepted: boolean;
};

// Generate time slots (1-hour or 2-hour intervals)
const TIME_SLOTS = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-22:00",
];

const BookService = () => {
    const { id } = useParams();
    const [createBooking, { isLoading }] = useCreateBookingMutation();
    const location = useLocation();

    // Fetch data if state is missing
    const { data: fetchedServiceData, isLoading: isServiceLoading } = useFeaturedServicesSingleGetQuery(Number(id), {
        skip: !!location.state?.service,
    });

    // Normalize data from either state or API
    const serviceState = location.state?.service;

    // Extract raw service from API response (handling potential structure mismatch)
    // Based on SingleProviderInformation.tsx, public API returns { service: { title, ... } }
    const apiService = (fetchedServiceData as any)?.service;

    // Helper to normalize API response or State object
    const serviceData = serviceState || (apiService ? {
        id: String(apiService.id),
        job_title: apiService.job_title || apiService.title, // Handle both
        provider_name: apiService.provider_name || apiService.provider?.business_name,
        provider: apiService.provider_name || apiService.provider?.business_name,
        base_price: apiService.base_price || apiService.price_min,
        average_rating: apiService.average_rating || Number(apiService.provider?.rating) || 0,
        total_reviews: apiService.total_reviews || Number(apiService.provider?.total_reviews) || 0,
        service_area: apiService.service_area || apiService.provider?.area || "N/A",
        images: apiService.images || [],
        image_url: apiService.images?.[0]?.image_url // for backup image access
    } : null);

    // console.log("DEBUG: Params ID:", id);
    // console.log("DEBUG: Location State:", location.state);
    // console.log("DEBUG: Service Data (State):", serviceState);
    // console.log("DEBUG: Fetched Data (API):", fetchedServiceData);
    // console.log("DEBUG: Final Service Data:", serviceData);

    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            bookingDate: undefined,
            bookingTime: "",
            phone: "",
            locationType: undefined,
            addressLabel: "Home",
            address: "",
            house: "",
            floor: "",
            zipCode: "",
            street: "",
            user_notes: "",
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        if (!data.bookingDate) {
            toast("Please select a date");
            return;
        }

        const dateStr = format(data.bookingDate, "yyyy-MM-dd");

        const payload = {
            service: Number(serviceData?.id),
            booking_date: dateStr,
            time_slot: data.bookingTime,
            user_notes: data.user_notes || "",
            user_phone: data.phone,
            user_location: [
                data.addressLabel,
                data.address,
                data.house ? `House: ${data.house}` : "",
                data.floor ? `Floor: ${data.floor}` : "",
                data.zipCode ? `Zip: ${data.zipCode}` : "",
                data.street ? `Street: ${data.street}` : ""
            ].filter(Boolean).join(", "),
            service_at: (data.locationType || "my_location") as "my_location" | "provider_location",
        };

        try {
            const res = await createBooking(payload).unwrap();
            console.log("Booking response:", res);
            if (res.success && res.data?.payment_details?.session_id && res.data?.checkout_url) {
                localStorage.setItem('booking_session_id', res.data.payment_details.session_id);
                window.location.href = res.data.checkout_url;
            }
        } catch (error: any) {
            console.error("Booking failed:", error);
            toast.error(error?.data?.message || "Failed to create booking. Please try again.");
        }
    };

    return (
        <div className="pb-10">
            <CommonWrapper>
                <div className="pb-8 pt-6">
                    <CommonHeader className="!text-3xl font-bold text-slate-900">
                        Book Service
                    </CommonHeader>
                    <p className="text-slate-500 mt-2">
                        Book Your Service in Just a Few Clicks
                    </p>
                </div>

                {isServiceLoading ? (
                    <div className="py-20 flex justify-center">
                        {/* Simplified loader or import CommonLoader if available */}
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                                        <h3 className="font-bold text-xl text-slate-900 border-b pb-4">Booking Details</h3>

                                        {/* Service Name */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold text-gray-900">Service name</label>
                                            <Input
                                                value={serviceData?.job_title || ""}
                                                disabled
                                                className="bg-gray-50 text-slate-900 font-medium border-gray-200 h-14 rounded-xl"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Date Picker */}
                                            {/* Date Selection with Popover */}
                                            <FormField
                                                control={form.control}
                                                name="bookingDate"
                                                rules={{ required: "Date is required" }}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="text-sm font-semibold text-gray-900 font-Geist">Preferable Date</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full pl-3 text-left font-normal h-14 rounded-xl border-gray-200 bg-white font-Geist cursor-pointer",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-5 w-5 opacity-50 text-gray-400" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) =>
                                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Time Selection */}
                                            <FormField
                                                control={form.control}
                                                name="bookingTime"
                                                rules={{ required: "Time is required" }}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-semibold text-gray-900">Preferable Time</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="h-14 rounded-xl border-gray-200 bg-white px-4">
                                                                    <SelectValue placeholder="Select a time slot" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-white">
                                                                {TIME_SLOTS.map((slot) => (
                                                                    <SelectItem key={slot} value={slot}>
                                                                        <div className="flex items-center gap-2">
                                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                                            {slot}
                                                                        </div>
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            rules={{ required: "Phone number is required" }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-semibold text-gray-900">Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 250 555 0199" {...field} className="h-14 rounded-xl border-gray-200 bg-white px-4" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Getting Service At */}
                                        <FormField
                                            control={form.control}
                                            name="locationType"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel className="text-sm font-semibold text-gray-900">Getting Service at</FormLabel>
                                                    <FormControl>
                                                        <div className="flex items-center gap-6 p-4 border border-gray-200 rounded-xl h-14 bg-white">
                                                            <div
                                                                className="flex items-center gap-3 cursor-pointer group"
                                                                onClick={() => field.onChange("my_location")}
                                                            >
                                                                <div className={cn(
                                                                    "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                                                                    field.value === "my_location" ? "bg-[#0F172A] border-[#0F172A]" : "border-gray-300"
                                                                )}>
                                                                    {field.value === "my_location" && <Check className="w-3.5 h-3.5 text-white" />}
                                                                </div>
                                                                <span className={cn("text-sm", field.value === "my_location" ? "font-bold text-slate-900" : "font-medium text-slate-600")}>My Location</span>
                                                            </div>

                                                            <div
                                                                className="flex items-center gap-3 cursor-pointer group"
                                                                onClick={() => field.onChange("provider_location")}
                                                            >
                                                                <div className={cn(
                                                                    "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                                                                    field.value === "provider_location" ? "bg-[#0F172A] border-[#0F172A]" : "border-gray-300"
                                                                )}>
                                                                    {field.value === "provider_location" && <Check className="w-3.5 h-3.5 text-white" />}
                                                                </div>
                                                                <span className={cn("text-sm", field.value === "provider_location" ? "font-bold text-slate-900" : "font-medium text-slate-600")}>Provider Location</span>
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Location details trigger */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-900">Location details</label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors">
                                                    <MapPin className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <Input
                                                    placeholder="123 Main Street, Ontario"
                                                    className="h-14 rounded-xl border-gray-200 bg-white pl-12 pr-12 text-slate-900 cursor-pointer overflow-hidden text-ellipsis"
                                                    onClick={() => setIsLocationModalOpen(true)}
                                                    value={form.watch("address") ? `${form.watch("addressLabel")}: ${form.watch("address")}, H: ${form.watch("house")}, Fl: ${form.watch("floor")}, Zip: ${form.watch("zipCode")}, St: ${form.watch("street")}` : ""}
                                                    readOnly
                                                />
                                                <div
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-slate-900 transition-all p-1 hover:bg-gray-100 rounded-md"
                                                    onClick={() => setIsLocationModalOpen(true)}
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Modal */}
                                        <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
                                            <DialogContent className="sm:max-w-xl p-0 bg-white rounded-3xl overflow-hidden shadow-2xl border-none">
                                                <DialogHeader className="p-8 bg-gray-50 border-b relative">
                                                    <DialogTitle className="text-2xl font-bold text-slate-900">Location Details</DialogTitle>
                                                    <p className="text-sm text-gray-500 mt-1">Please provide the complete service address</p>
                                                </DialogHeader>

                                                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                                    <div className="space-y-4">
                                                        <label className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-60">Label As</label>
                                                        <div className="flex items-center gap-4 p-2 bg-gray-100/50 rounded-2xl w-fit">
                                                            {["Home", "Office", "Others"].map((label) => (
                                                                <button
                                                                    key={label}
                                                                    type="button"
                                                                    className={cn(
                                                                        "px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-bold text-sm cursor-pointer",
                                                                        form.watch("addressLabel") === label
                                                                            ? "bg-[#0F172A] text-white shadow-md shadow-slate-200"
                                                                            : "bg-white text-slate-500 hover:bg-gray-50"
                                                                    )}
                                                                    onClick={() => form.setValue("addressLabel", label as "Home" | "Office" | "Others")}
                                                                >
                                                                    <div className={cn(
                                                                        "w-4 h-4 rounded-full flex items-center justify-center border",
                                                                        form.watch("addressLabel") === label ? "bg-white border-white" : "border-gray-300"
                                                                    )}>
                                                                        {form.watch("addressLabel") === label && <Check className="w-2.5 h-2.5 text-slate-900 cursor-pointer" />}
                                                                    </div>
                                                                    {label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-900">Service Address</label>
                                                        <Input
                                                            placeholder="e.g. 123 Main Street, Ontario"
                                                            {...form.register("address")}
                                                            className="h-14 border-gray-200 rounded-xl px-4"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-900">House</label>
                                                            <Input placeholder="12/2" {...form.register("house")} className="h-14 border-gray-200 rounded-xl px-4" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-900">Floor</label>
                                                            <Input placeholder="N/A" {...form.register("floor")} className="h-14 border-gray-200 rounded-xl px-4" />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-900">Zip Code</label>
                                                            <Input placeholder="2250" {...form.register("zipCode")} className="h-14 border-gray-200 rounded-xl px-4" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-slate-900">Street</label>
                                                            <Input placeholder="12 Main Street" {...form.register("street")} className="h-14 border-gray-200 rounded-xl px-4" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-gray-50 border-t flex flex-col gap-3">
                                                    <Button
                                                        type="button"
                                                        className="w-full bg-[#0F172A] text-white h-14 rounded-2xl font-bold text-lg cursor-pointer"
                                                        onClick={() => setIsLocationModalOpen(false)}
                                                    >
                                                        Save Location
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Terms */}
                                        <FormField
                                            control={form.control}
                                            name="termsAccepted"
                                            rules={{
                                                validate: (value) => value === true || "Agreement required"
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div
                                                        className="flex items-center gap-3 mt-6 cursor-pointer select-none group"
                                                        onClick={() => field.onChange(!field.value)}
                                                    >
                                                        <div className={cn(
                                                            "w-6 h-6 rounded-full flex items-center justify-center transition-all border",
                                                            field.value ? "bg-[#0F172A] border-[#0F172A]" : "border-gray-300"
                                                        )}>
                                                            {field.value && <Check className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                        <p className="text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                                                            By clicking "Go to checkout", you agree to our
                                                            <button type="button" className="text-[#2DD4BF] font-bold hover:underline ml-1 cursor-pointer">Terms of Service</button>
                                                        </p>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Sidebar Summary */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-8 space-y-8">
                                        <h3 className="font-bold text-xl text-slate-900 border-b pb-4">Booking Summary</h3>
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ">
                                                <img
                                                    src={
                                                        serviceData?.images?.[0]?.image_url ||
                                                        serviceData?.images?.[0]?.image ||
                                                        serviceData?.service_image ||
                                                        serviceData?.image
                                                    }
                                                    alt={serviceData?.job_title || "Service"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-base text-slate-900 leading-tight">{serviceData?.job_title}</h4>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-bold text-slate-600">{serviceData?.provider_name || serviceData?.provider}</span>
                                                    <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                                        <Check className="w-2.5 h-2.5 text-white" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-orange-400">Verified</span>
                                                </div>
                                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{serviceData?.service_area || "N/A"}</p>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <span key={s} className={cn("text-xs", s <= (serviceData?.average_rating || 0) ? "text-orange-400" : "text-gray-300")}>★</span>
                                                    ))}
                                                    <span className="text-[10px] font-bold text-gray-400 ml-1">
                                                        {serviceData?.average_rating || 0} ({serviceData?.total_reviews || 0} Reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-5 bg-gray-50/50 p-6 rounded-2xl">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-semibold tracking-wide uppercase text-[11px]">Starting At</span>
                                                <span className="font-bold text-slate-900 text-lg">{serviceData?.base_price || serviceData?.price}$</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-semibold tracking-wide uppercase text-[11px]">Duration</span>
                                                <span className="font-bold text-slate-900">2 Hours</span>
                                            </div>
                                            <div className="h-px bg-gray-200"></div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-slate-900 font-extrabold text-base">Total Charge</span>
                                                <span className="text-slate-900 font-black text-2xl">{serviceData?.base_price || serviceData?.price}$</span>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-16 bg-[#0F172A] hover:bg-slate-800 text-white cursor-pointer rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    <span>Processing...</span>
                                                </div>
                                            ) : "Go To Checkout"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                )}
            </CommonWrapper>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E1;
                }
            `}</style>
        </div>
    );
};

export default BookService;
