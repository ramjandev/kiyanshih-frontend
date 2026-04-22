import { User } from "lucide-react";
import type { UserProfile } from "@/redux/types/userTypes/userProfile.type";

interface ProfileCompletionProps {
    user: UserProfile | undefined;
}

const ProfileCompletion = ({ user }: ProfileCompletionProps) => {
    const calculateCompletion = () => {
        if (!user) return 0;

        const fields: (keyof UserProfile)[] = [
            'first_name', 'last_name', 'email', 'phone_number',
            'city', 'area', 'bio', 'profile_picture',
            'address_line1', 'postal_code', 'profession'
        ];

        const filledFields = fields.filter(field => !!user[field]);
        return Math.round((filledFields.length / fields.length) * 100);
    };

    const percentage = calculateCompletion();

    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Profile Completion</h3>
                </div>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{percentage}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProfileCompletion;
