import { useGetSingleProviderQuery } from "@/redux/featuresAPI/adminApi/providerApi";
import { CheckCircle, FileText, MapPin, X } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProviderDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetSingleProviderQuery(Number(id), {
    skip: !id,
  });

  const navigate = useNavigate();

  return (
    <div className=" bg-white rounded-2xl ">
      <div onClick={() => navigate(-1)} className="flex justify-end p-1 ">
        <button className="text-gray-400 hover:text-gray-600 cursor-pointer p-2">
          <X size={24} />
        </button>
      </div>
      <div className="space-y-6 p-6 ">
        <div className="">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={
                    data?.data.provider_profile.business_logo ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop"
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {data?.data.provider_profile.name ||
                      "Mike Handyman Service"}
                  </h1>
                  <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                    <CheckCircle size={16} className="text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">
                      {data?.data.provider_profile.verified
                        ? "Verified"
                        : "Unverified"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{data?.data.provider_profile.location}</span>
                </div>
              </div>
            </div>

            <span className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium self-start">
              {data?.data.provider_profile.status || "Active"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">
                {data?.data.provider_profile.email || "sarah.johnson@email.com"}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700">Profession:</span>
              <span className="text-gray-600">
                {data?.data.provider_profile.provider_id || "Handyman"}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-600">
                {data?.data.provider_profile.phone || "+1 234 567 8901"}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-gray-700">
                Total Bookings:
              </span>
              <span className="text-gray-600">
                {data?.data.provider_profile.services_provided || "20"}
              </span>
            </div>
          </div>
        </div>

        <div className=" border border-border rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About {data?.data.provider_profile.name} Service
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{data?.data.service_information.service_name}</p>
          </div>

          {/* Skills */}
          <div className="">
            <h3 className="text-lg font-bold text-gray-900">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {data?.data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className=" bg-blue-50 rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-900 ">
            Service Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>{data?.data.service_information.service_name}</p>
            <p>
              Licence number: {data?.data.service_information.license_number}
            </p>

            <p>
              Year of Experience:{" "}
              {data?.data.service_information.year_of_experience}
            </p>
            <p>
              Total Bookings Served:{" "}
              {data?.data.service_information.total_bookings_served}
            </p>
          </div>
        </div>

        <div className=" border border-border rounded-xl p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Provided Documents
          </h2>

          {!data?.data.provided_documents?.length ? (
            <p className="text-gray-500 text-sm">No documents provided</p>
          ) : (
            <div className="space-y-3">
              {data.data.provided_documents.map((doc, index) => (
                <React.Fragment key={index}>
                  <a
                    href={doc.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-blue-600" size={24} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">
                        {doc.document_type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doc.image_side}
                      </span>
                    </div>
                  </a>

                  {index !== data.data.provided_documents.length - 1 && (
                    <div className="w-full h-px bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
