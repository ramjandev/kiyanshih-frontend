import { Loader2 } from "lucide-react";

interface ProfileActionsProps {
    onSave: () => void;
    isUpdating: boolean;
}

const ProfileActions = ({ onSave, isUpdating }: ProfileActionsProps) => {
    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-10">
            <button
                onClick={onSave}
                disabled={isUpdating}
                className="px-8 py-3 bg-blue-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
            >
                {isUpdating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Updating...</span>
                    </>
                ) : (
                    "Update Profile"
                )}
            </button>
            <button
                onClick={handleReset}
                className="px-8 cursor-pointer py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-95"
            >
                Reset
            </button>
        </div>
    );
};

export default ProfileActions;
