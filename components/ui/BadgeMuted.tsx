import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeMutedProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const BadgeMuted: React.FC<BadgeMutedProps> = ({
    text,
    icon,
    iconPosition = "left",
    className,
    ...props
}) => {
    return (
        <span
            className={cn(
                "bg-gray-700 text-white text-xs px-3 py-2 inline-flex items-center gap-1",
                className
            )}
            {...props}
        >
            {iconPosition === "left" && icon}
            <span>{text}</span>
            {iconPosition === "right" && icon}
        </span>
    );
};

export default BadgeMuted;
