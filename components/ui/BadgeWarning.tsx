import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeWarningProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const BadgeWarning: React.FC<BadgeWarningProps> = ({
    text,
    icon,
    iconPosition = "left",
    className,
    ...props
}) => {
    return (
        <span
            className={cn(
                "bg-orange-950 text-yellow-300 text-xs px-3 py-2 inline-flex items-center gap-1",
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

export default BadgeWarning;
