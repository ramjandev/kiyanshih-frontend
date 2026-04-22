import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Camera, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import type { UserProfile } from "@/redux/types/userTypes/userProfile.type";

interface ProfileHeaderProps {
    user: UserProfile | undefined;
    updateProfile: any;
    isUpdating: boolean;
}

const ProfileHeader = ({ user, updateProfile, isUpdating }: ProfileHeaderProps) => {
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(fieldName, file);

        try {
            await updateProfile({ body: formData }).unwrap();
            toast.success(`${fieldName === 'profile_picture' ? 'Profile picture' : 'Banner image'} updated successfully!`);
        } catch (error) {
            console.error("Failed to upload image:", error);
            toast.error(`Failed to update ${fieldName === 'profile_picture' ? 'profile picture' : 'banner image'}.`);
        }
    };

    return (
        <div className="bg-transparent overflow-hidden px-1 sm:px-0">
            {/* Hidden File Inputs */}
            <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile_picture")}
            />
            <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "banner_image")}
            />

            {/* Banner Image Section */}
            <div className="relative h-48 md:h-[250px] rounded-2xl overflow-hidden border border-slate-200 group">
                <img
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070"
                    alt="Profile Banner"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Banner Camera Upload Icon */}
                <button
                    onClick={() => bannerInputRef.current?.click()}
                    disabled={isUpdating}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-full shadow-lg hover:bg-white transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                >
                    {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5 text-gray-700" />}
                </button>
            </div>

            {/* Profile Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-0 md:-mt-10 items-end px-4 md:px-0 md:ml-8">
                {/* Left Column - User Info Card */}
                <div className="lg:col-span-4 z-20">
                    <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
                        {/* Avatar Section - Perfectly centered on the boundary */}
                        <div className="flex flex-col items-center -mt-16 sm:-mt-24 mb-6">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-2xl relative">
                                    <AvatarImage
                                        src={user?.profile_picture || undefined}
                                        alt={user?.first_name || "User"}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-4xl font-bold">
                                        {user?.first_name ? user.first_name[0].toUpperCase() : "U"}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Avatar Camera Upload Icon */}
                                <button
                                    onClick={() => avatarInputRef.current?.click()}
                                    disabled={isUpdating}
                                    className="absolute bottom-2 right-2 bg-white p-2.5 cursor-pointer rounded-full shadow-xl hover:bg-gray-50 transition-all border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                >
                                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Camera className="w-4 h-4 text-gray-700" />}
                                </button>
                            </div>

                            {/* User Name and Location */}
                            <div className="text-center mt-6">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                                    {user?.first_name} {user?.last_name}
                                </h1>
                                <p className="text-sm md:text-base text-gray-500 font-semibold flex items-center justify-center gap-2 mt-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    {user?.city || user?.area || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Contact Information List */}
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-24">Email</span>
                                <span className="text-sm font-semibold text-gray-700 truncate">{user?.email || "N/A"}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-24">Phone</span>
                                <span className="text-sm font-semibold text-gray-700">{user?.phone_number || "N/A"}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-24">Profession</span>
                                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block w-fit">{user?.profession || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Bio Card */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg min-h-[160px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                        <h3 className="font-extrabold text-gray-900 mb-4 text-lg sm:text-xl flex items-center gap-2">
                            Bio
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-loose font-medium whitespace-pre-line">
                            {user?.bio || "No bio information provided."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

