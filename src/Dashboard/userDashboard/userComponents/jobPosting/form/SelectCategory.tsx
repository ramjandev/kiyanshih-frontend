import {
  Settings2,
  Search,
  Pipette as Pipe,
  Brush,
  Package,
  Monitor,
  Car,
  GraduationCap,
  Dog
} from "lucide-react";
import type { TJobPostPayload } from "../../../pages/JobPost";

const categories = [
  { id: "handyman", label: "Handyman Service", icon: <Pipe className="w-8 h-8" />, color: "text-blue-500" },
  { id: "cleaning", label: "Cleaning Service", icon: <Brush className="w-8 h-8" />, color: "text-pink-500" },
  { id: "assembly", label: "Assembly Service", icon: <Package className="w-8 h-8" />, color: "text-orange-500" },
  { id: "tech", label: "Tech Service", icon: <Monitor className="w-8 h-8" />, color: "text-teal-500" },
  { id: "automotive", label: "Automotive Service", icon: <Car className="w-8 h-8" />, color: "text-red-500" },
  { id: "education", label: "Education & Training", icon: <GraduationCap className="w-8 h-8" />, color: "text-yellow-500" },
  { id: "pet", label: "Pet care Service", icon: <Dog className="w-8 h-8" />, color: "text-olive-500" },
];

const services = [
  "Plumbing",
  "Installation",
  "Carpentry",
  "Roofing",
  "Flooring",
  "Painting",
  "Others",
];

interface SelectCategoryProps {
  formData: TJobPostPayload;
  updateFormData: (data: Partial<TJobPostPayload>) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ formData, updateFormData }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* Header section */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
          <Settings2 className="w-8 h-8 text-pink-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">What type of service do you need?</h2>
          <p className="text-gray-500 mt-1 max-w-lg mx-auto">Select the category that best describes your project to get matched with the right professionals.</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="space-y-4">
        <label className="text-lg font-bold text-[#2C2C2C]">Choose a Category</label>
        <div className="relative flex items-center h-14 border border-border rounded-md overflow-hidden bg-white">
          <div className="flex items-center justify-center px-4 bg-white">
            <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </div>
            {/* Visual bubble/cloud effect from search input icon in image */}
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-blue-600 border-b-[10px] border-b-transparent -ml-1"></div>
          </div>
          <input
            type="text"
            placeholder="Search Job category"
            className="flex-1 px-4 outline-none text-gray-700 font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFormData({ category: cat.label })}
            className={`flex flex-col items-center justify-center p-6 border rounded-[10px] transition-all gap-4 min-h-[140px] cursor-pointer ${formData.category === cat.label
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-white border-border text-gray-900 hover:border-blue-200"
              }`}
          >
            <div className={`${formData.category === cat.label ? "text-white" : cat.color + " opacity-80"}`}>
              {cat.icon}
            </div>
            <span className="text-[13px] font-bold text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Sub-category selection */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-[#2C2C2C]">Choose Specific Service in {formData.category || "Selected Category"}</h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => updateFormData({ sub_category: service })}
              className={`px-6 sm:px-10 py-3 sm:py-3.5 rounded-md transition-all border text-sm sm:text-base font-medium cursor-pointer ${formData.sub_category === service
                  ? "border-blue-600 text-gray-900 bg-white"
                  : "border-border text-gray-700 bg-white hover:border-gray-400"
                }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
