import type { FC } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface BookingDetailsProps {
    formData: any;
    setFormData: (data: any) => void;
    nextStep: () => void;
}

const BookingDetails: FC<BookingDetailsProps> = ({
    formData,
    setFormData,
    // nextStep,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     nextStep();
    // };

    return (
        <div className="space-y-6">
            {/* Service Name (Read Only) */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Service name</label>
                <input
                    type="text"
                    value={formData?.serviceName || ""}
                    disabled
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Preferable Date
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal h-14 rounded-xl border-gray-200 bg-white",
                                !formData.bookingDate && "text-muted-foreground"
                            )}
                        >
                            {formData.bookingDate ? (
                                format(new Date(formData.bookingDate), "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={formData.bookingDate ? new Date(formData.bookingDate) : undefined}
                            onSelect={(date) => setFormData({ ...formData, bookingDate: date })}
                            disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Phone
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-blue-50"
                    placeholder="+12505550199"
                />
            </div>

            {/* Getting Service At */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Getting Service at
                </label>
                <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="locationType"
                            value="my_location"
                            checked={formData.locationType === 'my_location'}
                            onChange={() => handleRadioChange('locationType', 'my_location')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 font-medium">My Location</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="locationType"
                            value="provider_location"
                            checked={formData.locationType === 'provider_location'}
                            onChange={() => handleRadioChange('locationType', 'provider_location')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-500 font-normal">Provider Location</span>
                    </label>
                </div>
            </div>

            {/* Location Details */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Location details
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="123 Main Street, Ontario"
                    />
                    {/* Edit Icon Mock */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* User Notes */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Additional Notes
                </label>
                <textarea
                    name="user_notes"
                    value={formData.user_notes || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, user_notes: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Please bring necessary tools..."
                />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" defaultChecked />
                <p className="text-xs text-slate-500">By clicking "Go to checkout", you agree to our <span className="text-green-500 underline cursor-pointer">Terms of Service</span></p>
            </div>

            <div className="flex justify-end pt-4">
                {/* Note: In the design, this is part of the summary card on the right usually, but for mobile/flow it might be here. 
              However, the parent component will handle the main layout "Go To Checkout" button if it's in the summary card. 
              Based on the user request, the "Go to Checkout" button is what triggers the next step.
              We will let the parent `BookService` handle the main "Next" action via the Summary Card, 
              but typically a form might have its own submit. 
              Looking at the design, the "Go To Checkout" is in the right sidebar. 
              Multi-step wizard forms often have navigation at the bottom too. 
              I will add a hidden submit button or rely on the parent to trigger validation if needed, 
              but for simplicity I'll assume the Next button in the Summary Card handles it.
           */}
            </div>
        </div>
    );
};

export default BookingDetails;
