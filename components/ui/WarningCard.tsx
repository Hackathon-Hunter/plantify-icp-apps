interface WarningCardProps {
    title: string
    description: string[]
  }
  
  export default function WarningCard({ title, description }: WarningCardProps) {
    return (
      <div className="bg-orange-950 p-4 rounded-md">
        <span className="text-yellow-500 font-semibold block mb-2">{title}</span>
        <ul className="list-disc list-inside text-white space-y-1">
          {description.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }