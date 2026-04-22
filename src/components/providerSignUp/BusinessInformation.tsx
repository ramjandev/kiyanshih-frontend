/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BsFillBagDashFill } from "react-icons/bs";
import SubHeader from "@/Dashboard/Admin/common/SubHeader";
import CommonSelect from "@/common/custom/CommonSelect";
import image from "@/assets/images/miniUpload.svg";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface BusinessInformationProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const inputClass = {
  input:
    "w-full bg-[#EFF6FF]/40 rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#EFF6FF] outline-none transition resize-none",
  label:
    "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[28px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

const serviceOptions = [
  { label: "Handyman", value: "Handyman" },
  { label: "Electrician", value: "Electrician" },
  { label: "Painter", value: "Painter" },
  { label: "Carpenter", value: "Carpenter" },
  { label: "Plumber", value: "Plumber" },
  { label: "Cleaner", value: "Cleaner" },
  { label: "Others", value: "Others" },
] as const;

const subCategoryOptions = [
  { label: "Plumbing", value: "Plumbing" },
  { label: "Wiring", value: "Wiring" },
  { label: "Roof Repair", value: "Roof Repair" },
  { label: "Painting", value: "Painting" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Cleaning", value: "Cleaning" },
  { label: "Others", value: "Others" },
] as const;

const BusinessInformation = ({
  register,
  setValue,
  errors,
}: BusinessInformationProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  // ================= FILE UPLOAD =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setValue("business_logo", file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <BsFillBagDashFill /> Business Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service */}
        <div>
          <label className={inputClass.label}>Select Service</label>
          <CommonSelect
            value={selectedService}
            item={serviceOptions}
            onValueChange={(val) => {
              setSelectedService(val);
              setValue("service", val, { shouldValidate: true });
            }}
            className={inputClass.input}
            w={300}
          />
          {errors.service && (
            <p className={inputClass.error}>
              {errors.service.message as string}
            </p>
          )}

          {selectedService === "Others" && (
            <input
              type="text"
              placeholder="Type your service"
              {...register("customService")}
              className={`${inputClass.input} mt-2`}
            />
          )}
        </div>

        {/* Sub-Category */}
        <div>
          <label className={inputClass.label}>Sub-Category</label>
          <CommonSelect
            value={selectedSubCategory}
            item={subCategoryOptions}
            onValueChange={(val) => {
              setSelectedSubCategory(val);
              setValue("subCategory", val, { shouldValidate: true });
            }}
            className={inputClass.input}
            w={300}
          />
          {errors.subCategory && (
            <p className={inputClass.error}>
              {errors.subCategory.message as string}
            </p>
          )}

          {selectedSubCategory === "Others" && (
            <input
              type="text"
              placeholder="Type your sub-category"
              {...register("customSubCategory")}
              className={`${inputClass.input} mt-2`}
            />
          )}
        </div>

        {/* Location */}
        <div>
          <label className={inputClass.label}>Service Location</label>
          <input
            type="text"
            placeholder="Service Location"
            {...register("serviceLocation")}
            className={inputClass.input}
          />
          {errors.serviceLocation && (
            <p className={inputClass.error}>
              {errors.serviceLocation.message as string}
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className={inputClass.label}>Years of Experience</label>
          <input
            type="text"
            placeholder="Years of Experience"
            {...register("yearsExperience")}
            className={inputClass.input}
          />
          {errors.yearsExperience && (
            <p className={inputClass.error}>
              {errors.yearsExperience.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Business Logo */}
      <div>
        <label className="block font-medium mb-2">Business Logo</label>
        <SubHeader className="!text-xs text-gray-500">
          Upload JPG/PNG, max 10MB
        </SubHeader>

        <div className="border border-border rounded-lg p-4 flex items-start gap-4">
          <div className="w-25 h-25 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                className="w-full h-full p-2 px-3"
                src={image}
                alt="Upload"
              />
            )}
          </div>

          <div className="flex flex-col h-22 w-full justify-between">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-gray-100 px-4 py-2 rounded border hover:bg-gray-200 pb-2"
            >
              Choose File
            </label>
            <span className="ml-2 text-gray-600 hidden sm:inline">
              Logo selected
            </span>
          </div>
        </div>
      </div>

      {/* About Service */}
      <div>
        <label className={inputClass.label}>About Service</label>
        <textarea
          rows={4}
          placeholder="About Service..."
          {...register("aboutService")}
          className={inputClass.input}
        />
        {errors.aboutService && (
          <p className={inputClass.error}>
            {errors.aboutService.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default BusinessInformation;









// import CommonSelect from "@/common/custom/CommonSelect";
// import { useState } from "react";
// import { BsFillBagDashFill } from "react-icons/bs";
// import image from "@/assets/images/miniUpload.svg";
// import SubHeader from "@/Dashboard/Admin/common/SubHeader";

// const inputClass = {
//   input:
//     "w-full bg-[#EFF6FF]/40 rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#EFF6FF] outline-none transition",
//   label:
//     "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[28px] block mb-2",
// };

// // Extended service options with 'Others'
// const serviceOptions = [
//   { label: "Handyman", value: "Handyman" },
//   { label: "Electrician", value: "Electrician" },
//   { label: "Painter", value: "Painter" },
//   { label: "Carpenter", value: "Carpenter" },
//   { label: "Plumber", value: "Plumber" },
//   { label: "Cleaner", value: "Cleaner" },
//   { label: "Others", value: "Others" },
// ] as const;

// // Extended sub-category options with 'Others'
// const subCategoryOptions = [
//   { label: "Plumbing", value: "Plumbing" },
//   { label: "Wiring", value: "Wiring" },
//   { label: "Roof Repair", value: "Roof Repair" },
//   { label: "Painting", value: "Painting" },
//   { label: "Carpentry", value: "Carpentry" },
//   { label: "Cleaning", value: "Cleaning" },
//   { label: "Others", value: "Others" },
// ] as const;

// const BusinessInformation = () => {
//   const [service, setService] = useState("Handyman");
//   const [subCategory, setSubCategory] = useState("Plumbing");
//   const [customService, setCustomService] = useState("");
//   const [customSubCategory, setCustomSubCategory] = useState("");
//   const [logoPreview, setLogoPreview] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <form className="space-y-6">
//         {/* Business Information */}
//         <div>
//           <h3 className="font-medium mb-2 flex items-center gap-2">
//             <span>
//               <BsFillBagDashFill />
//             </span>
//             Business Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Service Category */}
//             <div>
//               <label className={inputClass.label}>Select Service</label>
//               <CommonSelect
//                 value={service}
//                 item={serviceOptions}
//                 onValueChange={(val) => setService(val)}
//                 className={inputClass.input}
//                 w={300}
//               />
//               {service === "Others" && (
//                 <input
//                   type="text"
//                   placeholder="Type your service"
//                   value={customService}
//                   onChange={(e) => setCustomService(e.target.value)}
//                   className={`${inputClass.input} mt-2`}
//                 />
//               )}
//             </div>

//             {/* Sub-Category */}
//             <div>
//               <label className={inputClass.label}>Sub-Category</label>
//               <CommonSelect
//                 value={subCategory}
//                 item={subCategoryOptions}
//                 onValueChange={(val) => setSubCategory(val)}
//                 className={inputClass.input}
//                 w={300}
//               />
//               {subCategory === "Others" && (
//                 <input
//                   type="text"
//                   placeholder="Type your sub-category"
//                   value={customSubCategory}
//                   onChange={(e) => setCustomSubCategory(e.target.value)}
//                   className={`${inputClass.input} mt-2`}
//                 />
//               )}
//             </div>

//             {/* Other inputs */}
//             <div>
//               <label className={inputClass.label}>Service Location</label>
//               <input
//                 type="text"
//                 placeholder="Service Location"
//                 defaultValue="Canada"
//                 className={inputClass.input}
//               />
//             </div>
//             <div>
//               <label className={inputClass.label}>Years of Experience</label>
//               <input
//                 type="text"
//                 placeholder="Years of Experience"
//                 defaultValue="02"
//                 className={inputClass.input}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Business Logo */}
//         <div>
//           <label className="block font-medium mb-2">Business logo</label>
//           <p className={inputClass.label}>
//             Upload a clear photo of your driver’s license, passport, or
//             provincial ID card
//           </p>
//           <div className="border border-border rounded-lg p-4 flex items-start gap-4">
//             <div className="w-25 h-25 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
//               {logoPreview ? (
//                 <img
//                   src={logoPreview}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <img
//                   className="w-full h-full p-2 px-3"
//                   src={image}
//                   alt="Upload"
//                 />
//               )}
//             </div>
//             <div className="flex flex-col h-22 w-full justify-between">
//               <SubHeader className="!text-xs text-gray-500 ">
//                 Please upload JPG, PNG up to 10MB, size less than 100KB
//               </SubHeader>
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   id="fileUpload"
//                   onChange={handleFileChange}
//                 />
//                 <label
//                   htmlFor="fileUpload"
//                   className="cursor-pointer bg-gray-100 px-4 py-2 rounded border hover:bg-gray-200 pb-2"
//                 >
//                   Choose File
//                 </label>
//                 <span className="ml-2 text-gray-600 hidden sm:inline">
//                   {logoPreview ? "File Selected" : "No File Chosen"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* About Service */}
//         <div>
//           <label className={inputClass.label}>About Service</label>
//           <textarea
//             rows={4}
//             className={inputClass.input}
//             defaultValue="I'm a homeowner who loves working with skilled professionals to improve my property. I value quality work and clear communication."
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BusinessInformation;
