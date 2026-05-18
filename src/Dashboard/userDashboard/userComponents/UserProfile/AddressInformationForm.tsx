interface AddressInformationFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressInformationForm = ({ formData, handleChange }: AddressInformationFormProps) => {
    return (
        <div className="bg-white rounded-lg border border-border p-4 sm:p-6 mb-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-6">Address Information</h3>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Street Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Street Address *
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

                {/* City */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        City *
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

                {/* State & ZIP Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* State */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            State *
                        </label>
                        <div className="relative">
                            <select
                                name="area"
                                value={formData.area || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer appearance-none bg-white"
                            >
                                <option value="" disabled hidden>State</option>
                                <option value="Manhattan">Manhattan</option>
                                <option value="New York">New York</option>
                                <option value="California">California</option>
                                <option value="Texas">Texas</option>
                                <option value="Florida">Florida</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            ZIP Code *
                        </label>
                        <input
                            type="text"
                            name="postal_code"
                            value={formData.postal_code || ""}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 transition-all cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressInformationForm;
