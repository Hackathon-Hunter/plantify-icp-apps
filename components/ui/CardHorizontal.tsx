import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
    iconPosition?: "left" | "right";
    reverse?: boolean;
    leftBadge?: React.ReactNode;
    rightBadge?: React.ReactNode;
}

export const CardHorizontal: React.FC<CardHorizontalProps> = ({
    imageUrl,
    title,
    description,
    buttonText,
    buttonIcon,
    iconPosition = "left",
    reverse = false,
    leftBadge,
    rightBadge,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex flex-col md:flex-row items-center overflow-hidden bg-neutral-900 text-white border border-neutral-800",
                reverse ? "md:flex-row-reverse" : "",
                className
            )}
            {...props}
        >
            {/* Optional Image */}
            {imageUrl && (
                <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
                    <Image
                        src={imageUrl}
                        alt={title || "Image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            )}

            {/* Content Section */}
            <div
                className={cn(
                    imageUrl ? "w-full md:w-1/2" : "w-full",
                    "p-6 flex flex-col justify-between"
                )}
            >
                {/* Badge Row */}
                {(leftBadge || rightBadge) && (
                    <div className="flex justify-between items-center mb-3">
                        {leftBadge ? <div>{leftBadge}</div> : <div />}
                        {rightBadge && <div>{rightBadge}</div>}
                    </div>
                )}

                {/* Title */}
                {title && (
                    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
                )}

                {/* Description */}
                {description && (
                    <p className="text-gray-300 mb-6">{description}</p>
                )}

                {/* Optional Button */}
                {buttonText && (
                    <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 text-sm w-max flex items-center gap-2">
                        {iconPosition === "left" && buttonIcon}
                        <span>{buttonText}</span>
                        {iconPosition === "right" && buttonIcon}
                    </button>
                )}
            </div>
        </div>
    );
};
