'use client'

interface Tab {
    label: string;
    value: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (value: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="w-full overflow-x-auto">
            <div className="flex gap-2 flex-nowrap sm:flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.value
                                ? 'bg-neutral-800 text-white'
                                : 'text-white hover:bg-neutral-800'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
