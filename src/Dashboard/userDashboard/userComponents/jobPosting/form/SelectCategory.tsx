import React, { useState, useMemo } from "react";
import {
  Settings2,
  Search,
  Pipette as Pipe,
  Brush,
  Package,
  Monitor,
  Car,
  GraduationCap,
  Dog,
  Loader2,
  AlertCircle
} from "lucide-react";
import type { TJobPostPayload } from "../../../pages/JobPost";
import { useGetCategoryQuery } from "@/redux/featuresAPI/adminApi/categoryApi";

interface SelectCategoryProps {
  formData: TJobPostPayload;
  updateFormData: (data: Partial<TJobPostPayload>) => void;
}

// Helper to map category names to icons and colors for consistent UI
const getCategoryAssets = (label: string) => {
  const labelLower = label.toLowerCase();
  if (labelLower.includes("handyman") || labelLower.includes("home update") || labelLower.includes("home repair")) {
    return { icon: <Pipe className="w-8 h-8" />, color: "text-blue-500" };
  }
  if (labelLower.includes("cleaning")) {
    return { icon: <Brush className="w-8 h-8" />, color: "text-pink-500" };
  }
  if (labelLower.includes("assembly") || labelLower.includes("organization")) {
    return { icon: <Package className="w-8 h-8" />, color: "text-orange-500" };
  }
  if (labelLower.includes("tech")) {
    return { icon: <Monitor className="w-8 h-8" />, color: "text-teal-500" };
  }
  if (labelLower.includes("auto") || labelLower.includes("car")) {
    return { icon: <Car className="w-8 h-8" />, color: "text-red-500" };
  }
  if (labelLower.includes("education") || labelLower.includes("training") || labelLower.includes("meal")) {
    return { icon: <GraduationCap className="w-8 h-8" />, color: "text-yellow-500" };
  }
  if (labelLower.includes("pet") || labelLower.includes("gardening") || labelLower.includes("lawn")) {
    return { icon: <Dog className="w-8 h-8" />, color: "text-[#808000]" };
  }
  return { icon: <Settings2 className="w-8 h-8" />, color: "text-gray-500" };
};

const SelectCategory: React.FC<SelectCategoryProps> = ({ formData, updateFormData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery({
    current_page: 1,
    page_size: 100 // Get all for selection
  });

  const categories = categoryData?.data?.categories || [];

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Find subcategories for the currently selected category
  const activeSubcategories = useMemo(() => {
    if (!formData.category) return [];
    const selectedCat = categories.find(cat => cat.category_name === formData.category);
    return selectedCat?.subcategory_name || [];
  }, [categories, formData.category]);

  const handleCategoryClick = (categoryName: string) => {
    updateFormData({ 
      category: categoryName,
      sub_category: [] // Reset sub-category array when main category changes
    });
  };

  const handleSubcategoryToggle = (service: string) => {
    const currentSubcategories = formData.sub_category || [];
    let newSubcategories: string[];

    if (currentSubcategories.includes(service)) {
      // Remove if already selected
      newSubcategories = currentSubcategories.filter(s => s !== service);
    } else {
      // Add if not selected
      newSubcategories = [...currentSubcategories, service];
    }

    updateFormData({ sub_category: newSubcategories });
  };

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
        <div className="relative flex items-center h-14 border border-border rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <div className="flex items-center justify-center px-4 bg-white">
            <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </div>
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-blue-600 border-b-[10px] border-b-transparent -ml-1"></div>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Job category"
            className="flex-1 px-4 outline-none text-gray-700 font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">Loading categories...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-10 bg-red-50 rounded-xl border border-red-100 gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <p className="text-red-600 font-semibold">Failed to load categories</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm bg-white px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const assets = getCategoryAssets(cat.category_name);
                const isSelected = formData.category === cat.category_name;
                return (
                  <button
                    key={cat.sl}
                    onClick={() => handleCategoryClick(cat.category_name)}
                    className={`relative flex flex-col items-center justify-center border rounded-[10px] transition-all min-h-[140px] cursor-pointer group overflow-hidden ${
                      isSelected
                        ? "border-blue-600 ring-2 ring-blue-600 shadow-xl"
                        : "border-border hover:border-blue-300 shadow-sm"
                    }`}
                  >
                    {/* Background Image or Fallback Icon */}
                    {cat.image ? (
                      <>
                        <img 
                          src={cat.image} 
                          alt={cat.category_name} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected 
                            ? "bg-blue-600/80" 
                            : "bg-black/40 group-hover:bg-black/20"
                        }`} />
                      </>
                    ) : (
                      <div className={`flex flex-col items-center justify-center p-6 w-full h-full gap-4 ${
                        isSelected ? "bg-blue-600" : "bg-white"
                      }`}>
                        <div className={`${isSelected ? "text-white" : assets.color + " opacity-80"} transition-all duration-300 transform group-hover:scale-110`}>
                          {assets.icon}
                        </div>
                      </div>
                    )}

                    {/* Category Label */}
                    <span className={`relative z-10 text-[14px] font-bold text-center leading-tight px-3 transition-colors ${
                      isSelected || cat.image ? "text-white" : "text-gray-900"
                    } ${cat.image ? "drop-shadow-md" : ""}`}>
                      {cat.category_name}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full py-10 text-center border border-dashed border-gray-300 rounded-xl bg-gray-50">
                <p className="text-gray-500">No categories found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sub-category selection */}
      {formData.category && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-lg font-bold text-[#2C2C2C]">
            Choose Specific Service in <span className="text-blue-600">{formData.category}</span>
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {activeSubcategories.length > 0 ? (
              activeSubcategories.map((service, index) => {
                const isSelected = formData.sub_category?.includes(service);
                return (
                  <button
                    key={index}
                    onClick={() => handleSubcategoryToggle(service)}
                    className={`px-6 sm:px-10 py-3 sm:py-3.5 rounded-md transition-all border text-sm sm:text-base font-medium cursor-pointer ${
                      isSelected
                        ? "border-blue-600 text-white bg-blue-600 shadow-md"
                        : "border-border text-gray-700 bg-white hover:border-gray-400 hover:shadow-sm"
                    }`}
                  >
                    {service}
                  </button>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 italic">No specific services listed for this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCategory;




// import React, { useState, useMemo } from "react";
// import {
//   Settings2,
//   Search,
//   Pipette as Pipe,
//   Brush,
//   Package,
//   Monitor,
//   Car,
//   GraduationCap,
//   Dog,
//   Loader2,
//   AlertCircle
// } from "lucide-react";
// import type { TJobPostPayload } from "../../../pages/JobPost";
// import { useGetCategoryQuery } from "@/redux/featuresAPI/adminApi/categoryApi";

// interface SelectCategoryProps {
//   formData: TJobPostPayload;
//   updateFormData: (data: Partial<TJobPostPayload>) => void;
// }

// // Helper to map category names to icons and colors for consistent UI
// const getCategoryAssets = (label: string) => {
//   const labelLower = label.toLowerCase();
//   if (labelLower.includes("handyman") || labelLower.includes("home update") || labelLower.includes("home repair")) {
//     return { icon: <Pipe className="w-8 h-8" />, color: "text-blue-500" };
//   }
//   if (labelLower.includes("cleaning")) {
//     return { icon: <Brush className="w-8 h-8" />, color: "text-pink-500" };
//   }
//   if (labelLower.includes("assembly") || labelLower.includes("organization")) {
//     return { icon: <Package className="w-8 h-8" />, color: "text-orange-500" };
//   }
//   if (labelLower.includes("tech")) {
//     return { icon: <Monitor className="w-8 h-8" />, color: "text-teal-500" };
//   }
//   if (labelLower.includes("auto") || labelLower.includes("car")) {
//     return { icon: <Car className="w-8 h-8" />, color: "text-red-500" };
//   }
//   if (labelLower.includes("education") || labelLower.includes("training") || labelLower.includes("meal")) {
//     return { icon: <GraduationCap className="w-8 h-8" />, color: "text-yellow-500" };
//   }
//   if (labelLower.includes("pet") || labelLower.includes("gardening") || labelLower.includes("lawn")) {
//     return { icon: <Dog className="w-8 h-8" />, color: "text-[#808000]" };
//   }
//   return { icon: <Settings2 className="w-8 h-8" />, color: "text-gray-500" };
// };

// const SelectCategory: React.FC<SelectCategoryProps> = ({ formData, updateFormData }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data: categoryData, isLoading, isError } = useGetCategoryQuery({
//     current_page: 1,
//     page_size: 100 // Get all for selection
//   });

//   const categories = categoryData?.data?.categories || [];

//   // Filter categories based on search
//   const filteredCategories = useMemo(() => {
//     return categories.filter(cat => 
//       cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [categories, searchTerm]);

//   // Find subcategories for the currently selected category
//   const activeSubcategories = useMemo(() => {
//     if (!formData.category) return [];
//     const selectedCat = categories.find(cat => cat.category_name === formData.category);
//     return selectedCat?.subcategory_name || [];
//   }, [categories, formData.category]);

//   const handleCategoryClick = (categoryName: string) => {
//     updateFormData({ 
//       category: categoryName,
//       sub_category: [] // Reset sub-category array when main category changes
//     });
//   };

//   const handleSubcategoryToggle = (service: string) => {
//     const currentSubcategories = formData.sub_category || [];
//     let newSubcategories: string[];

//     if (currentSubcategories.includes(service)) {
//       // Remove if already selected
//       newSubcategories = currentSubcategories.filter(s => s !== service);
//     } else {
//       // Add if not selected
//       newSubcategories = [...currentSubcategories, service];
//     }

//     updateFormData({ sub_category: newSubcategories });
//   };

//   return (
//     <div className="flex flex-col gap-10">
//       {/* Header section */}
//       <div className="flex flex-col items-center text-center gap-4">
//         <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
//           <Settings2 className="w-8 h-8 text-pink-500" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 leading-tight">What type of service do you need?</h2>
//           <p className="text-gray-500 mt-1 max-w-lg mx-auto">Select the category that best describes your project to get matched with the right professionals.</p>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="space-y-4">
//         <label className="text-lg font-bold text-[#2C2C2C]">Choose a Category</label>
//         <div className="relative flex items-center h-14 border border-border rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
//           <div className="flex items-center justify-center px-4 bg-white">
//             <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
//               <Search className="text-white w-5 h-5" />
//             </div>
//             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-blue-600 border-b-[10px] border-b-transparent -ml-1"></div>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search Job category"
//             className="flex-1 px-4 outline-none text-gray-700 font-medium placeholder:text-gray-400"
//           />
//         </div>
//       </div>

//       {/* Category Grid */}
//       <div className="space-y-4">
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-20 gap-4">
//             <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//             <p className="text-gray-500 font-medium animate-pulse">Loading categories...</p>
//           </div>
//         ) : isError ? (
//           <div className="flex flex-col items-center justify-center py-10 bg-red-50 rounded-xl border border-red-100 gap-3">
//             <AlertCircle className="w-8 h-8 text-red-500" />
//             <p className="text-red-600 font-semibold">Failed to load categories</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="text-sm bg-white px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
//             {filteredCategories.length > 0 ? (
//               filteredCategories.map((cat) => {
//                 const assets = getCategoryAssets(cat.category_name);
//                 const isSelected = formData.category === cat.category_name;
//                 return (
//                   <button
//                     key={cat.sl}
//                     onClick={() => handleCategoryClick(cat.category_name)}
//                     className={`flex flex-col items-center justify-center p-6 border rounded-[10px] transition-all gap-4 min-h-[140px] cursor-pointer group ${
//                       isSelected
//                         ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-200"
//                         : "bg-white border-border hover:border-blue-200 hover:shadow-md"
//                     }`}
//                   >
//                     <div className={`${isSelected ? "text-white" : assets.color + " opacity-80 group-hover:opacity-100"} transition-all duration-300 transform group-hover:scale-110`}>
//                       {assets.icon}
//                     </div>
//                     <span className={`text-[13px] font-bold text-center leading-tight transition-colors ${
//                       isSelected ? "text-white" : "text-gray-900"
//                     }`}>
//                       {cat.category_name}
//                     </span>
//                   </button>
//                 );
//               })
//             ) : (
//               <div className="col-span-full py-10 text-center border border-dashed border-gray-300 rounded-xl bg-gray-50">
//                 <p className="text-gray-500">No categories found matching "{searchTerm}"</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Sub-category selection */}
//       {formData.category && (
//         <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
//           <h3 className="text-lg font-bold text-[#2C2C2C]">
//             Choose Specific Service in <span className="text-blue-600">{formData.category}</span>
//           </h3>
//           <div className="flex flex-wrap gap-3 sm:gap-4">
//             {activeSubcategories.length > 0 ? (
//               activeSubcategories.map((service, index) => {
//                 const isSelected = formData.sub_category?.includes(service);
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleSubcategoryToggle(service)}
//                     className={`px-6 sm:px-10 py-3 sm:py-3.5 rounded-md transition-all border text-sm sm:text-base font-medium cursor-pointer ${
//                       isSelected
//                         ? "border-blue-600 text-white bg-blue-600 shadow-md"
//                         : "border-border text-gray-700 bg-white hover:border-gray-400 hover:shadow-sm"
//                     }`}
//                   >
//                     {service}
//                   </button>
//                 );
//               })
//             ) : (
//               <p className="text-sm text-gray-500 italic">No specific services listed for this category.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectCategory;

