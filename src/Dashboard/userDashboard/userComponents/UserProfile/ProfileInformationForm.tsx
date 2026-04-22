import { User } from "lucide-react";

interface ProfileInformationFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileInformationForm = ({ formData, handleChange }: ProfileInformationFormProps) => {
    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <User className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Profile Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* First Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ""}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ""}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number || ""}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Profession */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Profession
                    </label>
                    <input
                        type="text"
                        name="profession"
                        value={formData.profession || ""}
                        onChange={handleChange}
                        placeholder="e.g. Doctor, Engineer"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Bio - Full Width */}
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-900 transition-all min-h-[120px] cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileInformationForm;
