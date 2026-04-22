import { MapPin } from "lucide-react";

interface AddressInformationFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressInformationForm = ({ formData, handleChange }: AddressInformationFormProps) => {
    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <MapPin className="w-5 h-5 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Address Information</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Address Line 1 */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        name="address_line1"
                        value={formData.address_line1 || ""}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                    />
                </div>

                {/* City and Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city || ""}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Area
                        </label>
                        <input
                            type="text"
                            name="area"
                            value={formData.area || ""}
                            onChange={handleChange}
                            placeholder="Area"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                        />
                    </div>
                </div>

                {/* Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postal_code"
                            value={formData.postal_code || ""}
                            onChange={handleChange}
                            placeholder="12345"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressInformationForm;
