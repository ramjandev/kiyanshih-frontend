import { User } from "lucide-react";
import type { UserProfile, UserProfileNested } from "@/redux/types/userTypes/userProfile.type";

interface ProfileCompletionProps {
    user: UserProfile | undefined;
}

const ProfileCompletion = ({ user }: ProfileCompletionProps) => {
    const calculateCompletion = () => {
        if (!user) return 0;

        const rootFields: (keyof UserProfile)[] = [
            'first_name', 'last_name', 'email', 'phone_number', 'city', 'area'
        ];

        const nestedFields: (keyof UserProfileNested)[] = [
            'bio', 'profile_picture', 'address_line1', 'postal_code'
        ];

        let totalFields = rootFields.length + nestedFields.length;
        let filledCount = 0;

        rootFields.forEach(field => {
            if (user[field]) {
                filledCount++;
            }
        });

        if (user.user_profile) {
            nestedFields.forEach(field => {
                if (user.user_profile?.[field]) {
                    filledCount++;
                }
            });
        }

        return Math.round((filledCount / totalFields) * 100);
    };

    const percentage = calculateCompletion();

    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Profile Completion</h3>
                </div>
                <span className="font-semibold text-blue-600 text-sm sm:text-base">{percentage}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProfileCompletion;

