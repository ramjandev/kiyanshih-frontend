import { User } from "lucide-react"

interface ProfileCompletionProps {
    percentage: number;
}

const ProfileCompletation = ({ percentage }: ProfileCompletionProps) => {
    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6 md:mb-10">
            <div className="flex items-center justify-between space-y-4">
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="text-sm font-semibold">Profile Completion</span>
                </div>
                <span className="text-sm text-slate-600 mb-4">{percentage}% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    )
}
export default ProfileCompletation;