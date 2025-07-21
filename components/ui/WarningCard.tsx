interface WarningCardProps {
    title: string;
    description: string;
}

export default function WarningCard({ title, description }: WarningCardProps) {
    return (
        <div className="bg-orange-950 p-4">
            <span className="text-yellow-500 font-semibold">{title}</span>
            <p className="text-white">{description}</p>
        </div>
    );
}