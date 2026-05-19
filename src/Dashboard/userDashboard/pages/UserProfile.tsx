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

// import SocialMediaForm from "../userComponents/UserProfile/SocialMediaForm";

const UserProfile = () => {
    const { data: user, isLoading } = useUserProfileGetQuery(undefined);
    const [updateProfile, { isLoading: isUpdating }] = useUserProfileUpdateMutation();

    // Global form state
    const [formData, setFormData] = useState<any>({});
    const [imageFiles, setImageFiles] = useState<{ [key: string]: File }>({});

    useEffect(() => {
        if (user) {
            // Flatten the nested user_profile for the form state
            const { user_profile, ...rest } = user as any;
            setFormData({
                ...rest,
                ...user_profile,
                // profile_picture is the avatar
                // profile_cover_image is the cover banner
                profile_image: user_profile?.profile_picture,
                profile_cover_image: user_profile?.profile_cover_image,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (file: File, fieldName: string) => {
        setImageFiles((prev) => ({ ...prev, [fieldName]: file }));
        // Create a local preview URL for the UI
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev: any) => ({ ...prev, [fieldName]: previewUrl }));
    };

    const handleGlobalSave = async () => {
        if (!user) return;

        const formDataPayload = new FormData();
        let hasChanges = false;

        // Root level fields in the API
        const rootFields = ['first_name', 'last_name', 'phone_number', 'city', 'area'];
        
        // Nested user_profile fields in the API
        const profileFields = [
            'bio', 'date_of_birth', 'alternate_phone', 'address_line1', 
            'postal_code', 'facebook_url', 'twitter_url', 'linkedin_url'
        ];

        const userProfileData: any = {};
        let hasProfileChanges = false;

        // Check root fields against the original user object
        rootFields.forEach(field => {
            if (formData[field] !== (user as any)[field]) {
                formDataPayload.append(field, formData[field]);
                hasChanges = true;
            }
        });

        // Check profile fields against the original user.user_profile object
        profileFields.forEach(field => {
            const originalValue = (user as any).user_profile?.[field];
            if (formData[field] !== originalValue) {
                userProfileData[field] = formData[field];
                hasProfileChanges = true;
                hasChanges = true;
            }
        });

        if (hasProfileChanges) {
            formDataPayload.append('user_profile', JSON.stringify(userProfileData));
        }

        // Add buffered image files
        Object.entries(imageFiles).forEach(([key, file]) => {
            // Map to correct API keys: profile_image -> profile_picture, profile_cover_image -> profile_cover_image
            let apiKey = key;
            if (key === 'profile_image') apiKey = 'profile_picture';
            if (key === 'profile_cover_image') apiKey = 'profile_cover_image';
            
            formDataPayload.append(apiKey, file);
            hasChanges = true;
        });

        if (!hasChanges) {
            toast.info("No changes detected.");
            return;
        }

        try {
            await updateProfile(formDataPayload).unwrap();
            toast.success("Profile updated successfully!");
            setImageFiles({});
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
                        formData={formData}
                        handleImageChange={handleImageChange}
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
                    {/* <SocialMediaForm
                        formData={formData}
                        handleChange={handleChange}
                    /> */}
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
