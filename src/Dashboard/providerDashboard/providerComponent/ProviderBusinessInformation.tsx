"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";

// ✅ Zod schema
const businessInfoSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  licenseNumber: z.string().min(2, "License number is required"),
  insuranceProvider: z.string().min(2, "Insurance provider is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  aboutService: z.string().min(10, "Please write at least 10 characters"),
});

type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;

export default function ProviderBusinessInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "Sarah Johnson",
      licenseNumber: "123456",
      insuranceProvider: "ABC Insurance",
      yearsOfExperience: "5",
      aboutService:
        "I'm a homeowner who loves working with skilled professionals to improve my property. I value quality work and clear communication.",
    },
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    console.log("✅ Submitted Data:", data);
  };

  return (
    <Card className="w-full p-6 shadow-sm border border-slate-300">
      <CardContent className="space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📋 Business Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="space-y-1">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                {...register("businessName")}
                className="border border-slate-300 mt-5 mb-5"
              />
              {errors.businessName && (
                <p className="text-sm text-red-500">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            {/* License Number */}
            <div className="space-y-1">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                {...register("licenseNumber")}
                className="border border-slate-300 mt-5 mb-5"
              />
              {errors.licenseNumber && (
                <p className="text-sm text-red-500">
                  {errors.licenseNumber.message}
                </p>
              )}
            </div>

            {/* Insurance Provider */}
            <div className="space-y-1">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                {...register("insuranceProvider")}
                className="border border-slate-300 mt-5 mb-5"
              />
              {errors.insuranceProvider && (
                <p className="text-sm text-red-500">
                  {errors.insuranceProvider.message}
                </p>
              )}
            </div>

            {/* Years of Experience */}
            <div className="space-y-1">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                {...register("yearsOfExperience")}
                className="border border-slate-300 mt-5 mb-5"
              />
              {errors.yearsOfExperience && (
                <p className="text-sm text-red-500">
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>
          </div>

          {/* About Service (textarea) */}
          <div className="space-y-1">
            <Label htmlFor="aboutService">About Service</Label>
            <Textarea
              id="aboutService"
              rows={4}
              {...register("aboutService")}
              placeholder="Write something about your service..."
              className="border border-slate-300 mt-5 mb-5"
            />
            {errors.aboutService && (
              <p className="text-sm text-red-500">
                {errors.aboutService.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full md:w-36 border border-slate-300 px-8 py-3 h-auto cursor-pointer text-white bg-black hover:bg-white hover:text-black"
            >
              <LogOut />
              Logout
            </Button>
            <Button
              type="submit"
              className="w-full md:w-36 border border-slate-300 px-8 py-3 h-auto cursor-pointer hover:bg-black hover:text-white"
            >
              Edit Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
