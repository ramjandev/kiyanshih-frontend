// src/components/ProfileForm.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ✅ Zod schema with bio field
const profileSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number is required"),
    profession: z.string().min(2, "Profession is required"),
    bio: z.string().optional(),
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(5, "ZIP code must be at least 5 digits"),
});

// ✅ Infer type from schema
type ProfileFormData = z.infer<typeof profileSchema>;

// US States data
const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", 
];

const AddressInformation = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const onSubmit = (data: ProfileFormData) => {
        console.log("Profile Data:", data);
    };

    const handleReset = () => {
        reset();
    };

    const selectedState = watch("state");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto">
            {/* Profile Information */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <Input
                            {...register("fullName")}
                            placeholder="Enter your full name"
                            className="w-full"
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email address"
                            className="w-full"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <Input
                            type="tel"
                            {...register("phone")}
                            placeholder="Enter your phone number"
                            className="w-full"
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profession
                        </label>
                        <Input
                            {...register("profession")}
                            placeholder="Enter your profession"
                            className="w-full"
                        />
                        {errors.profession && (
                            <p className="text-xs text-red-600 mt-1">{errors.profession.message}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                    </label>
                    <Textarea
                        {...register("bio")}
                        placeholder="Tell us about yourself..."
                        className="w-full min-h-[100px] resize-none"
                    />
                    {errors.bio && (
                        <p className="text-xs text-red-600 mt-1">{errors.bio.message}</p>
                    )}
                </div>
            </div>

            {/* Address Information */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-6">Address Information</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                            {...register("street")}
                            placeholder="Enter your street address"
                            className="w-full"
                        />
                        {errors.street && (
                            <p className="text-xs text-red-600 mt-1">{errors.street.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City <span className="text-red-500">*</span>
                            </label>
                            <Input
                                {...register("city")}
                                placeholder="Enter your city"
                                className="w-full"
                            />
                            {errors.city && (
                                <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                State <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={selectedState}
                                onValueChange={(value) => setValue("state", value)}
                            >
                                <SelectTrigger className="w-full bg-white cursor-pointer">
                                    <SelectValue placeholder="Select your state" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {US_STATES.map((state) => (
                                        <SelectItem key={state} value={state} className="cursor-pointer">
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.state && (
                                <p className="text-xs text-red-600 mt-1">{errors.state.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <Input
                                {...register("zip")}
                                placeholder="Enter your ZIP code"
                                className="w-full"
                            />
                            {errors.zip && (
                                <p className="text-xs text-red-600 mt-1">{errors.zip.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                    Update Profile
                </Button>
                <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="px-6 py-2 border-gray-300 cursor-pointer"
                >
                    Reset
                </Button>
            </div>
        </form>
    );
};

export default AddressInformation;