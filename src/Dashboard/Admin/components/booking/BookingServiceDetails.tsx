import { Edit2, FileText } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardTopSection from "../../common/DashboardTopSection";

const BookingServiceDetails: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className=" w-full">
        <DashboardTopSection
          title="Bookings"
          description="Stay updated on customer bookings and provider responses."
        />

        {/* Service Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Service Details
              </h2>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          {/* Service Title */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Service Title
            </h3>
            <p className="text-gray-700">Kitchen Cabinet Installation</p>
          </div>

          {/* Service Category */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Service Category
            </h3>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm">
                Home improvement
              </span>
              <span className="text-gray-700">• Installation</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Upgrade your kitchen with professional cabinet installation
              tailored to your space and style. Our skilled experts handle
              everything from assembling and mounting cabinets to ensuring
              perfect alignment, secure fittings, and a polished finish.
            </p>
          </div>

          {/* Base Price */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Base price
            </h3>
            <p className="text-gray-700 mb-3">Maximum : $200/hour</p>
            <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm inline-block">
              Hourly Rate
            </span>
          </div>
        </div>

        {/* Availability & Location Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Availability & Location
            </h2>
            <button className="text-gray-600 hover:text-gray-900">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-900">Service Area:</span>{" "}
              <span className="text-gray-700">California</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Monday:</span>{" "}
              <span className="text-gray-700">09-19:00</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Tuesday:</span>{" "}
              <span className="text-gray-700">09-19:00</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Wednesday:</span>{" "}
              <span className="text-gray-700">09-19:00</span>
            </div>
          </div>
        </div>

        {/* Image and Additional Service Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">image</h3>
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop"
              alt="Kitchen cabinet installation"
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Include in your service
              </h3>
              <p className="text-gray-600 text-sm">Basic cleaning service</p>
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingServiceDetails;
