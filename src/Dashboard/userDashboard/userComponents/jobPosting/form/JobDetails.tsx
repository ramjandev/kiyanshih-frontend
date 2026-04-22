import image from "@/assets/frame/p3.svg";
import InfoSection from "../InfoSection";
import { ImageIcon } from "lucide-react";
import Paragraph from "@/common/header/Paragraph";

interface JobDetailsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ formData, updateFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateFormData({
        image_url: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const inputClass = {
    input:
      "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition",
    label:
      "text-sm lg:text-base text-[#2D2D2D] font-medium font-Geist leading-[24px] block mb-2",
  };

  return (
    <div>
      <InfoSection
        image={image}
        title="What type of service do you need?"
        subtitle="Select the category that best describes your project to get matched With the right professionals."
        className="w-full"
      />

      <div className="w-full ">
        <div className="space-y-8">
          <div>
            <label htmlFor="jobTitle" className={inputClass.label}>
              Job Title<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              placeholder="e.g. Kitchen cabinet installation"
              className={inputClass.input}
            />
          </div>

          {/* Job Description Field */}
          <div>
            <label htmlFor="jobDescription" className={inputClass.label}>
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Kitchen cabinet installation"
              rows={8}
              className={inputClass.input}
            />
          </div>

          {/* Upload Image Field */}
          <div>
            <label className={inputClass.label}>Upload an image</label>
            <div className="border border-gray-300 rounded-lg p-6">
              <div className="flex items-start gap-6">
                {/* Image Placeholder */}
                <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {formData.previewUrl ? (
                    <img
                      src={formData.previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <Paragraph className="text-base text-black">
                    Please upload square image, size less than 100KB
                  </Paragraph>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="fileUpload"
                      className="px-6 py-2.5 border-2 border-gray-900 rounded-lg text-base font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="text-base text-gray-600">
                      {formData.image ? formData.image.name : "No File Chosen"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
