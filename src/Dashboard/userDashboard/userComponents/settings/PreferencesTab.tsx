import { useState } from "react"

const PreferencesTab = () => {
    const [showContactInfo, setShowContactInfo] = useState(true)
    const [publicProfile, setPublicProfile] = useState(true)

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                    <p className="text-sm text-gray-500 mt-1">Customize your experience</p>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Show contact info to providers */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Show contact info to providers</div>
                            <div className="text-sm text-gray-500">Allow providers to see your contact details</div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            role="switch"
                            aria-checked={showContactInfo}
                            onClick={() => setShowContactInfo(!showContactInfo)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showContactInfo ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${showContactInfo ? 'translate-x-6' : 'translate-x-0.5'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Public profile */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">Public profile</div>
                            <div className="text-sm text-gray-500">Make your profile visible to providers</div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            role="switch"
                            aria-checked={publicProfile}
                            onClick={() => setPublicProfile(!publicProfile)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${publicProfile ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${publicProfile ? 'translate-x-6' : 'translate-x-0.5'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferencesTab;