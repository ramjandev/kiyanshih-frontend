import { useState } from "react";
import profileBanner from "@/assets/images/userProfile.png";
import profileImage from "@/assets/images/userProfile.png";
import { MapPin, Camera } from "lucide-react";

const UserProfileTop = () => {
  const [coverPhoto, setCoverPhoto] = useState(profileBanner);
  const [profilePhoto, setProfilePhoto] = useState(profileImage);

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-10">
      {/* Cover Photo Section */}
      <div className="relative group">
        <img
          src={coverPhoto}
          alt="Profile banner"
          className="w-full h-[140px] md:h-[250px] object-cover"
        />

        {/* Cover Photo Upload Button */}
        <div className="absolute top-4 right-4">
          <label
            htmlFor="cover-upload"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-lg cursor-pointer shadow-md transition-all duration-200 backdrop-blur-sm"
          >
            <Camera className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Change Cover</span>
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 w-full">
          {/* Profile Card */}
          <div className="w-full md:w-[30%] max-h-[412px] sm:ml-10 z-50 bg-white shadow border border-slate-300 rounded-md p-4 md:p-6 lg:-mt-20 -mt-10">
            <div className="text-center">
              <div className="md:-mt-25 -mt-20 relative inline-block">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 md:w-35 md:h-35 rounded-full object-cover mx-auto border-4 border-white"
                />

                {/* Profile Photo Upload Button */}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 border-2 border-white"
                >
                  <Camera className="w-4 h-4 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-black mt-2">
                Charlotte Davis
              </h3>
              <div className="flex items-center gap-2 md:gap-3 mt-2 justify-center">
                <MapPin className="text-blue-700 w-4 h-4 md:w-5 md:h-5" />
                <p className="text-sm md:text-base">Medical Student</p>
              </div>
            </div>
            <div className="mx-auto w-fit text-left space-y-2 py-4 md:py-5 px-2">
              <p className="text-sm md:text-[16px] font-medium">
                Email: <span className="font-normal">demo@gmail.com</span>
              </p>
              <p className="text-sm md:text-[16px] font-medium">
                Phone: <span className="font-normal">+1 (555) 123-4567</span>
              </p>
              <p className="text-sm md:text-[16px] font-medium">
                Profession: <span className="font-normal">Doctor</span>
              </p>
            </div>

          </div>

          {/* Bio Card */}
          <div className="w-full lg:w-[70%] self-end bg-white border border-border rounded-md p-4 md:p-5">
            <h4 className="text-base md:text-lg font-medium">Bio:</h4>
            <p className="text-slate-600 mt-3 md:mt-4 mb-2 text-sm md:text-base">
              Building and repairing small structures, such as decks, sheds, or
              custom shelving. Designing and building unique tables, chairs,
              bookshelves. Building and repairing small structures, such as
              decks, sheds, or custom shelving. Designing and building unique
              tables, chairs, bookshelves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTop;

