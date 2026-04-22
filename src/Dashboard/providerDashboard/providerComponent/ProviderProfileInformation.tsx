

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Zod schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  profession: z.string().min(2, "Profession is required"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(2, "ZIP code is required"),
});

// ✅ Infer type from schema
type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProviderProfileInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      profession: "Profession",
      street: "123 Main Street",
      city: "Ontario",
      state: "Canada",
      zip: "123",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Information */}
      <div className="bg-white shadow border border-slate-300 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              {...register("fullName")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              {...register("email")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              {...register("phone")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Profession</label>
            <input
              {...register("profession")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.profession && (
              <p className="text-sm text-red-600">
                {errors.profession.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white shadow border border-slate-300 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Street Address</label>
            <input
              {...register("street")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.street && (
              <p className="text-sm text-red-600">{errors.street.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              {...register("city")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">State</label>
            <input
              {...register("state")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.state && (
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">ZIP Code</label>
            <input
              {...register("zip")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2"
            />
            {errors.zip && (
              <p className="text-sm text-red-600">{errors.zip.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          type="button"
          className="w-full md:w-36 px-4 py-4 h-auto bg-gray-900 text-white rounded-md"
        >
          <LogOut />
          Logout
        </Button>
        <button
          type="submit"
          className="w-full md:w-36 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </form>
  );
}
