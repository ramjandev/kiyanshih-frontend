import CommonButton from "@/common/button/CommonButton";
import {
  usePostCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/featuresAPI/adminApi/categoryApi";
import type { Category } from "@/redux/featuresAPI/adminApi/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Image, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";

const categorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
  subcategory_name: z
    .array(z.string().min(1))
    .min(1, "At least one subcategory is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

/* ================= STYLES ================= */
const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35 outline-none transition",
  label:
    "text-sm lg:text-base text-[#666] font-Geist leading-[24px] block mb-2",
};

interface Subcategory {
  id: string;
  name: string;
}

interface CategoryFormProps {
  initialValues?: Category;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialValues?: React.Dispatch<React.SetStateAction<Category | null>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  setIsEditing,
  setInitialValues,
}) => {
  const [subcategoryInput, setSubcategoryInput] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postCategory, { isLoading: isPosting }] = usePostCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
      subcategory_name: [],
    },
  });

  useEffect(() => {
    if (!initialValues) {
      // Reset for create mode
      reset({
        category_name: "",
        subcategory_name: [],
      });
      setSubcategories([]);
      setImagePreview(null);
      setImageFile(null);
      setIsImageChanged(false);
      return;
    }

    // For edit mode
    const mapped = initialValues.subcategory_name.map((name, index) => ({
      id: `${index}`,
      name,
    }));

    setSubcategories(mapped);

    if (initialValues.image) {
      setImagePreview(initialValues.image);
    }

    // Set form values
    reset({
      category_name: initialValues.category_name,
      subcategory_name: initialValues.subcategory_name,
    });

    setIsImageChanged(false);
  }, [initialValues, reset]);

  const handleAddSubcategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && subcategoryInput.trim()) {
      e.preventDefault();
      const updated = [
        ...subcategories,
        { id: Date.now().toString(), name: subcategoryInput.trim() },
      ];
      setSubcategories(updated);
      setSubcategoryInput("");
      setValue(
        "subcategory_name",
        updated.map((s) => s.name),
        { shouldValidate: true }
      );
    }
  };

  const handleRemoveSubcategory = (id: string) => {
    const updated = subcategories.filter((s) => s.id !== id);
    setSubcategories(updated);
    setValue(
      "subcategory_name",
      updated.map((s) => s.name),
      { shouldValidate: true }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG images are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setImageFile(file);
    setIsImageChanged(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setIsImageChanged(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (values: CategoryFormValues) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (initialValues && !isImageChanged && imagePreview) {
      try {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        const file = new File([blob], "category-image.jpg", {
          type: blob.type,
        });
        formData.append("image", file);
      } catch (error) {
        console.error("Error fetching existing image:", error);
        toast.error("Failed to process existing image");
        return;
      }
    } else if (!initialValues) {
      toast.error("Image is required for new category");
      return;
    }

    // Append JSON data
    formData.append(
      "data",
      JSON.stringify({
        category_name: values.category_name,
        subcategory_name: values.subcategory_name,
      })
    );

    // Debug: Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      if (key === "image") {
        console.log(
          key,
          "File:",
          (value as File).name,
          "Size:",
          (value as File).size
        );
      } else {
        console.log(key, value);
      }
    }

    try {
      let res;

      if (initialValues) {
        // Update existing category
        res = await updateCategory({
          id: initialValues.sl,
          data: formData,
        }).unwrap();
        toast.success(res.message || "Category updated successfully!");
      } else {
        // Create new category
        res = await postCategory(formData).unwrap();
        toast.success(res.message || "Category created successfully!");
      }

      handleReset();

      if (initialValues) {
        handleClose();
      }
    } catch (error: any) {
      console.error("Failed to save category:", error);
      toast.error(error?.data?.message || "Failed to save category");
    }
  };

  const handleReset = () => {
    if (initialValues) {
      // Restore to initial values for edit mode
      reset({
        category_name: initialValues.category_name,
        subcategory_name: initialValues.subcategory_name,
      });
      const mapped = initialValues.subcategory_name.map((name, index) => ({
        id: `${index}`,
        name,
      }));
      setSubcategories(mapped);
      setImagePreview(initialValues.image);
      setImageFile(null);
      setIsImageChanged(false);
    } else {
      // Clear everything for create mode
      reset({
        category_name: "",
        subcategory_name: [],
      });
      setSubcategories([]);
      setImagePreview(null);
      setImageFile(null);
      setIsImageChanged(false);
    }
    setSubcategoryInput("");
  };

  const handleClose = () => {
    setIsEditing?.(false);
    setInitialValues?.(null);
  };

  return (
    <div className="bg-white p-10 rounded-lg relative max-h-[90vh] overflow-y-auto">
      {initialValues && (
        <IoClose
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-2xl hover:text-gray-700"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        {/* Category Name */}
        <div>
          <label className="block text-gray-900 font-medium mb-2">
            Category Name(Default)
          </label>
          <input {...register("category_name")} className={inputClass.input} />
          {errors.category_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_name.message}
            </p>
          )}
        </div>

        {/* Subcategory Name */}
        <div>
          <label className={inputClass.label}>Subcategory name</label>
          <input
            type="text"
            value={subcategoryInput}
            onChange={(e) => setSubcategoryInput(e.target.value)}
            onKeyDown={handleAddSubcategory}
            className={inputClass.input}
            placeholder="Enter subcategory name and press Enter"
          />

          {errors.subcategory_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subcategory_name.message}
            </p>
          )}

          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg"
                >
                  <span className="text-gray-900">{sub.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubcategory(sub.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-dashed border-gray-300 rounded-lg p-8">
          <div className="flex flex-col items-center">
            <label className="text-gray-900 font-medium mb-4">
              Upload image {initialValues && "(Optional to change)"}
            </label>

            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />

              <div className="cursor-pointer" onClick={handleEditImageClick}>
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Category"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Edit2 className="w-4 h-4 text-white" />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Edit2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!initialValues && !imagePreview && (
              <p className="text-red-500 text-sm mt-2">
                Image is required for new category
              </p>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Image format - jpg png jpeg
              </p>
              <p className="text-sm text-gray-500">
                Image Size - maximum size 2 MB Image Ratio - 1:1
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <CommonButton
            type="submit"
            className="!bg-blue !px-8 !text-white sm:w-[243px]"
            disabled={isPosting || isUpdating}
          >
            {isPosting || isUpdating
              ? "Submitting..."
              : initialValues
              ? "Update Category"
              : "Submit"}
          </CommonButton>

          <CommonButton
            type="button"
            onClick={handleReset}
            className="!px-8 sm:w-[243px]"
          >
            Reset
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
