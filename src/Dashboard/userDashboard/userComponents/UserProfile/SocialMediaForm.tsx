import { Share2 } from "lucide-react";

interface SocialMediaFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaForm = ({ formData, handleChange }: SocialMediaFormProps) => {
    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Share2 className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Social Media Profiles</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Facebook */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Facebook URL
                    </label>
                    <input
                        type="url"
                        name="facebook_url"
                        value={formData.facebook_url || ""}
                        onChange={handleChange}
                        placeholder="https://facebook.com/username"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* Twitter */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Twitter URL
                    </label>
                    <input
                        type="url"
                        name="twitter_url"
                        value={formData.twitter_url || ""}
                        onChange={handleChange}
                        placeholder="https://twitter.com/username"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        name="linkedin_url"
                        value={formData.linkedin_url || ""}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default SocialMediaForm;
