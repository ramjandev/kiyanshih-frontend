import CommonButton from "@/common/button/CommonButton";
import BigTitle from "@/common/header/BigTitle";
import type { Provider } from "@/redux/featuresAPI/adminApi/types/provider";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface Document {
  type: "pdf" | "image";
  name: string;
}

interface ProfileCardProps {
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
}
const ProfileCard: React.FC<ProfileCardProps> = ({
  selectedProvider,
  setSelectedProvider,
}) => {
  const documents: Document[] = [
    { type: "pdf", name: "Topic Name.PDF" },
    { type: "image", name: "Topic Name.Image" },
  ];

  return (
    <>
      <div className="bg-white rounded-lg px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Left Card */}
          <div className="bg-[#EFF6FF] p-6 rounded-lg flex items-center space-x-6">
            <img
              src={selectedProvider?.provider_name}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover "
            />
            <div>
              <BigTitle className="!text-xl !text-black/81">
                {selectedProvider?.provider_name}
              </BigTitle>
              <div className="mt-2 space-y-1 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />
                  {selectedProvider?.contact_phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  {selectedProvider?.contact_email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" /> Toronto, Canada
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-[#EFF6FF] p-6 rounded-lg col-span-2">
            <BigTitle className="!text-xl !text-black/81 pb-2">
              Service Information
            </BigTitle>
            <p className="text-gray-700">Commercial Space Shifting</p>
            <p className="text-gray-700">
              Licence number : {selectedProvider?.service_name}
            </p>
            <p className="text-gray-700">Year of Experience : 02</p>
          </div>
        </div>

        {/* Provided Documents */}
        <div>
          <BigTitle className="!text-xl !text-black/81  pt-8 pb-2">
            Provided Documents
          </BigTitle>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-[rgba(0,0,0,0.12)] pb-2 text-gray-700"
              >
                {doc.type === "pdf" ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                    alt="PDF"
                    className="w-8 h-8"
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/337/337940.png"
                    alt="Image"
                    className="w-8 h-8"
                  />
                )}
                <span>{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-10">
        <CommonButton className=" !bg-blue !px-8 !text-white w-[243px]">
          Approve
        </CommonButton>
        <CommonButton
          onClick={() => setSelectedProvider(null)}
          className="!px-8  w-[243px]"
        >
          Reject
        </CommonButton>
      </div>
    </>
  );
};

export default ProfileCard;
