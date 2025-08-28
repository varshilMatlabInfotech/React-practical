export const Tabs = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="flex items-center justify-center mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onChange(tab.value)}
                    className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300
            ${activeTab === tab.value
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
