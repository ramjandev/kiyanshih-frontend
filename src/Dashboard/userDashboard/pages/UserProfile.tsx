import { useState, useEffect } from "react";
import ProfileHeader from "../userComponents/UserProfile/ProfileHeader";
import ProfileCompletion from "../userComponents/UserProfile/ProfileCompletion";
import ProfileInformationForm from "../userComponents/UserProfile/ProfileInformationForm";
import AddressInformationForm from "../userComponents/UserProfile/AddressInformationForm";
import ProfileActions from "../userComponents/UserProfile/ProfileActions";
import CommonWrapper from "@/common/space/CommonWrapper";
import { useUserProfileGetQuery, useUserProfileUpdateMutation } from "@/redux/featuresAPI/userAPI/userProfile.api";
import Loader from "@/common/Loader";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { data: user, isLoading } = useUserProfileGetQuery(undefined);
    const [updateProfile, { isLoading: isUpdating }] = useUserProfileUpdateMutation();

    // Global form state
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleGlobalSave = async () => {
        if (!user) return;

        // Calculate delta (only changed fields)
        const changedData: any = {};

        // Define all valid keys to check
        const fields = [
            'first_name', 'last_name', 'email', 'phone_number',
            'city', 'area', 'bio', 'profile_picture',
            'address_line1', 'address_line2', 'postal_code',
            'facebook_url', 'twitter_url', 'linkedin_url', 'profession'
        ];

        fields.forEach(field => {
            if (formData[field] !== user[field as keyof typeof user]) {
                changedData[field] = formData[field];
            }
        });

        if (Object.keys(changedData).length === 0) {
            toast.info("No changes detected.");
            return;
        }

        try {
            await updateProfile({ body: changedData }).unwrap();
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile information.");
        }
    };

    if (isLoading) {
        return <Loader size={64} color="border-blue-600" />;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-6 sm:py-8 lg:py-10">
            <CommonWrapper>
                <div className="space-y-6">
                    <ProfileHeader
                        user={user}
                        updateProfile={updateProfile}
                        isUpdating={isUpdating}
                    />
                    <ProfileCompletion
                        user={user}
                    />
                    <ProfileInformationForm
                        formData={formData}
                        handleChange={handleChange}
                    />
                    <AddressInformationForm
                        formData={formData}
                        handleChange={handleChange}
                    />
                    <ProfileActions
                        onSave={handleGlobalSave}
                        isUpdating={isUpdating}
                    />
                </div>
            </CommonWrapper>
        </div>
    );
};

export default UserProfile;
