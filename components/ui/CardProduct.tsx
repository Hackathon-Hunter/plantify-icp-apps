import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProductProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
    iconPosition?: "left" | "right";
    leftBadge?: React.ReactNode;
    rightBadge?: React.ReactNode;
    raisedAmount?: number;
    goalAmount?: number;
    handleClick?: () => void;
}

export const CardProduct: React.FC<CardProductProps> = ({
    imageUrl,
    title,
    description,
    buttonText,
    buttonIcon,
    iconPosition = "left",
    className,
    leftBadge,
    rightBadge,
    raisedAmount = 0,
    goalAmount = 100000,
    handleClick,
    ...props
}) => {
    const percentage = Math.min(
        100,
        Math.round((raisedAmount / goalAmount) * 100)
    );

    return (
        <div
            className={cn(
                "bg-neutral-900 text-white border border-neutral-800 overflow-hidden",
                className
            )}
            {...props}
        >
            {imageUrl && (
                <div className="w-full h-48 relative">
                    <Image
                        src={imageUrl}
                        alt={title || "Startup image"}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            )}

            <div className="p-4 flex flex-col gap-3">
                {(leftBadge || rightBadge) && (
                    <div className="flex justify-between items-center">
                        <div>{leftBadge}</div>
                        <div>{rightBadge}</div>
                    </div>
                )}

                {title && <h3 className="text-xl font-semibold">{title}</h3>}
                {description && <p className="text-gray-400">{description}</p>}

                <div className="border-2 border-dashed border-neutral-800"></div>

                <div className="flex justify-between gap-1">
                    <span className="text-white">Raised</span>
                    <span className="font-semibold text-white">
                        ${raisedAmount.toLocaleString()} <span className="text-gray-600">({percentage}%)</span>
                    </span>
                </div>

                {buttonText && (
                    <button onClick={handleClick} className="mt-2 px-4 py-2 bg-white text-black text-sm rounded-md flex items-center gap-2 w-max hover:bg-gray-200">
                        {iconPosition === "left" && buttonIcon}
                        <span>{buttonText}</span>
                        {iconPosition === "right" && buttonIcon}
                    </button>
                )}
            </div>
        </div>
    );
};
