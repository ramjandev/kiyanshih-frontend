import type { User } from "@/redux/featuresAPI/adminApi/types/user";
import { MapPin, X } from "lucide-react";
import React from "react";

interface UserProfileProps {
  user: User;
  onClose?: () => void;
}

const UserProfileModal: React.FC<UserProfileProps> = ({ user, onClose }) => {
  return (
    user && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Close Button */}
          <div className="flex justify-end p-6 pb-0">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="px-8 pb-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <img
                    src={user.profile_picture || "/default-profile.png"}
                    alt={user.user_name}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {user.user_name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-lg">
                        {user.contact_information.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="inline-block px-8 py-2.5 bg-green-600 text-white rounded-full font-semibold text-lg">
                    {user.status}
                  </span>
                </div>
              </div>

              {/* Contact Information Grid */}
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mt-8">
                <div className="flex gap-4">
                  <span className="text-gray-900 font-semibold text-lg">
                    Email :
                  </span>
                  <span className="text-gray-700 text-lg">
                    {user.contact_information.email}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-900 font-semibold text-lg">
                    Profession:
                  </span>
                  <span className="text-gray-700 text-lg">{user.sl}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-900 font-semibold text-lg">
                    Phone:
                  </span>
                  <span className="text-gray-700 text-lg">
                    {user.contact_information.phone}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-900 font-semibold text-lg">
                    Total Bookings :
                  </span>
                  <span className="text-gray-700 text-lg">
                    {user.total_bookings}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="px-8 pb-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Bio:</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {user.total_bookings}
              </p>
            </div>
          </div>

          {/* Address Information */}
          <div className="px-8 pb-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Address Information
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-3">
                    Street Address
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    {user.total_bookings}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-3">
                    City
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    {user.total_bookings}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-3">
                    State
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    {user.total_bookings}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-3">
                    ZIP Code
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    {user.total_bookings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfileModal;
